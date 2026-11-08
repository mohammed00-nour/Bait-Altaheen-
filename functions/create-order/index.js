
import {
  Client,
  TablesDB,
  ID,
  Permission,
  Role
} from "node-appwrite";

const DATABASE_ID = process.env.DATABASE_ID;
const PRODUCTS_TABLE_ID = process.env.PRODUCTS_TABLE_ID;
const ORDERS_TABLE_ID = process.env.ORDERS_TABLE_ID;
const ORDER_ITEMS_TABLE_ID = process.env.ORDER_ITEMS_TABLE_ID;

export default async ({ req, res, log, error }) => {
  let tablesDB;
  let createdOrderId = null;

  try {
    // التحقق من تسجيل الدخول
    const userId = req.headers["x-appwrite-user-id"];
    const apiKey = req.headers["x-appwrite-key"];

    if (!userId || !apiKey) {
      return res.json(
        { message: "يجب تسجيل الدخول أولاً" },
        401
      );
    }

    // التحقق من إعدادات قاعدة البيانات
    if (
      !DATABASE_ID ||
      !PRODUCTS_TABLE_ID ||
      !ORDERS_TABLE_ID ||
      !ORDER_ITEMS_TABLE_ID
    ) {
      throw new Error("إعدادات قاعدة البيانات غير مكتملة");
    }

    if (
      !process.env.APPWRITE_FUNCTION_API_ENDPOINT ||
      !process.env.APPWRITE_FUNCTION_PROJECT_ID
    ) {
      throw new Error("إعدادات اتصال Appwrite غير مكتملة");
    }

    if (req.method !== "POST") {
      return res.json(
        { message: "Method not allowed" },
        405
      );
    }

    const body = req.bodyJson || {};

    const {
      customerName,
      phone,
      orderType,
      address,
      notes,
      items
    } = body;

    log(
      `DEBUG orderType: ${JSON.stringify(orderType)} | type: ${typeof orderType}`
    );

    // التحقق من الاسم ورقم الهاتف
    if (
      typeof customerName !== "string" ||
      !customerName.trim() ||
      customerName.trim().length > 150 ||
      typeof phone !== "string" ||
      !phone.trim() ||
      phone.trim().length > 30
    ) {
      return res.json(
        { message: "الاسم ورقم الهاتف مطلوبان أو غير صالحين" },
        400
      );
    }

    // تطبيع نوع الطلب والتحقق منه
    const normalizedOrderType =
      typeof orderType === "string"
        ? orderType.trim().toLowerCase()
        : "";

    if (!["delivery", "pickup"].includes(normalizedOrderType)) {
      return res.json(
        { message: "نوع الطلب غير صحيح" },
        400
      );
    }

    // التحقق من عنوان التوصيل
    if (
      normalizedOrderType === "delivery" &&
      (typeof address !== "string" || !address.trim())
    ) {
      return res.json(
        { message: "عنوان التوصيل مطلوب" },
        400
      );
    }

    // التحقق من المنتجات
    if (!Array.isArray(items) || items.length === 0) {
      return res.json(
        { message: "السلة فارغة" },
        400
      );
    }

    if (items.length > 50) {
      return res.json(
        { message: "عدد المنتجات أكبر من المسموح" },
        400
      );
    }

    // الاتصال بـ Appwrite
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(apiKey);

    tablesDB = new TablesDB(client);

    const orderItems = [];
    let total = 0;
    let currencyCode = null;

    // جلب الأسعار الحقيقية من قاعدة البيانات
    for (const item of items) {
      if (!item || typeof item !== "object") {
        return res.json(
          { message: "بيانات أحد المنتجات غير صحيحة" },
          400
        );
      }

      const productId = item.productId;
      const quantity = Number(item.quantity);

      if (
        typeof productId !== "string" ||
        !productId.trim() ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 100
      ) {
        return res.json(
          { message: "بيانات المنتج أو الكمية غير صحيحة" },
          400
        );
      }

      const product = await tablesDB.getRow({
        databaseId: DATABASE_ID,
        tableId: PRODUCTS_TABLE_ID,
        rowId: productId.trim()
      });

      if (product.isAvailable !== true) {
        return res.json(
          { message: `المنتج غير متوفر: ${product.name}` },
          400
        );
      }

      if (
        typeof product.price !== "number" ||
        !Number.isFinite(product.price) ||
        product.price < 0
      ) {
        throw new Error("سعر أحد المنتجات غير صالح");
      }

      if (
        typeof product.currencyCode !== "string" ||
        !product.currencyCode.trim()
      ) {
        throw new Error("عملة أحد المنتجات غير محددة");
      }

      if (
        currencyCode &&
        currencyCode !== product.currencyCode
      ) {
        return res.json(
          { message: "لا يمكن جمع منتجات بعملات مختلفة" },
          400
        );
      }

      currencyCode = product.currencyCode;

      const lineTotal = Number(
        (product.price * quantity).toFixed(2)
      );

      total += lineTotal;

      orderItems.push({
        productId: productId.trim(),
        productName: product.name,
        unitPrice: product.price,
        quantity,
        lineTotal
      });
    }

    total = Number(total.toFixed(2));

    // تجهيز بيانات الطلب الرئيسي
    const orderId = ID.unique();

    const orderData = {
      userId,
      customerName: customerName.trim(),
      phone: phone.trim(),
      orderTypeTest: normalizedOrderType,
      statusTest: "pending",
      address:
        normalizedOrderType === "delivery"
          ? address.trim()
          : "",
      notes: typeof notes === "string" ? notes.trim() : "",
      total,
      currencyCode
    };

    log(
      `DEBUG order payload: ${JSON.stringify(orderData)}`
    );

    // إنشاء الطلب الرئيسي
    const createdOrder = await tablesDB.createRow({
      databaseId: DATABASE_ID,
      tableId: ORDERS_TABLE_ID,
      rowId: orderId,
      data: orderData,
      permissions: [
        Permission.read(Role.user(userId))
      ]
    });

    // لا نحدد المعرّف إلا بعد نجاح الإنشاء
    createdOrderId = createdOrder.$id;

    log(`DEBUG created order: ${createdOrder.$id}`);

    // إنشاء تفاصيل الطلب
    for (const item of orderItems) {
      await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: ORDER_ITEMS_TABLE_ID,
        rowId: ID.unique(),
        data: {
          order: createdOrder.$id,
          ...item
        },
        permissions: [
          Permission.read(Role.user(userId))
        ]
      });
    }

    log(`Order created successfully: ${createdOrder.$id}`);

    return res.json(
      {
        message: "تم إنشاء الطلب بنجاح",
        orderId: createdOrder.$id,
        total,
        currencyCode
      },
      201
    );

  } catch (err) {
    error(`Create order failed: ${err.message}`);
    error(`DEBUG error type: ${err.type || "unknown"}`);
    error(`DEBUG error code: ${err.code || "unknown"}`);
    error(
      `DEBUG error response: ${JSON.stringify(err.response || {})}`
    );

    // حذف الطلب فقط إذا تم إنشاؤه فعلياً
    if (createdOrderId && tablesDB) {
      try {
        await tablesDB.deleteRow({
          databaseId: DATABASE_ID,
          tableId: ORDERS_TABLE_ID,
          rowId: createdOrderId
        });

        log("Incomplete order cleanup completed");

      } catch (cleanupError) {
        error(
          `Order cleanup failed: ${cleanupError.message}`
        );
      }
    }

    return res.json(
      {
        message: "حدث خطأ أثناء إنشاء الطلب"
      },
      500
    );
  }
};
