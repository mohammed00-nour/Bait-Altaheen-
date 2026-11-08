
import { Query } from "appwrite";
import {
  account,
  tablesDB,
  functions,
  CREATE_ORDER_FUNCTION_ID,
  DATABASE_ID,
} from "../lib/appwrite.js";

const ORDERS_TABLE_ID = "orders";
const ORDER_ITEMS_TABLE_ID = "order_items";

export async function createOrder(orderData) {
  const execution = await functions.createExecution({
    functionId: CREATE_ORDER_FUNCTION_ID,
    body: JSON.stringify(orderData),
    async: false,
  });

  let result;

  try {
    result = JSON.parse(execution.responseBody || "{}");
  } catch {
    throw new Error("تعذّر قراءة استجابة الخادم.");
  }

  if (execution.statusCode < 200 || execution.statusCode >= 300) {
    throw new Error(result.message || "فشل إنشاء الطلب.");
  }

  return result;
}

export async function getMyOrders() {
  const user = await account.get();

  // جلب طلبات المستخدم
  const response = await tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId: ORDERS_TABLE_ID,
    queries: [
      Query.equal("userId", user.$id),
      Query.orderDesc("$createdAt"),
      Query.limit(100),
    ],
  });

  // جلب تفاصيل المنتجات لكل طلب
  const ordersWithItems = await Promise.all(
    response.rows.map(async (order) => {
      const itemsResponse = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: ORDER_ITEMS_TABLE_ID,
        queries: [
          Query.equal("order", order.$id),
          Query.limit(100),
        ],
      });

      const items = itemsResponse.rows;

      return {
        ...order,
        items,
        productCount: items.reduce(
          (total, item) => total + Number(item.quantity || 0),
          0
        ),
      };
    })
  );

  return ordersWithItems;
}
