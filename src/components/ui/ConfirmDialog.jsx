
export default function ConfirmDialog({
    isOpen,
    title,
    message,
    confirmText = "تأكيد",
    cancelText = "إلغاء",
    onConfirm,
    onCancel,
}) {
    if (!isOpen) return null;

    return (
        <div className="
            fixed inset-0 z-[100]
            flex items-center justify-center
            bg-black/50
            p-4
        ">
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
                className="
                    w-full max-w-md
                    rounded-2xl
                    bg-[var(--bg-card)]
                    p-6
                    shadow-2xl
                "
            >
                <h2
                    id="dialog-title"
                    className="text-xl font-bold text-[var(--text-primary)]"
                >
                    {title}
                </h2>

                <p
                    id="dialog-description"
                    className="mt-3 text-sm text-[var(--text-secondary)]"
                >
                    {message}
                </p>

                <div className="mt-6 flex gap-3">
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="
                            flex-1 rounded-xl
                            bg-red-600 px-4 py-3
                            font-bold text-white
                            hover:bg-red-700
                        "
                    >
                        {confirmText}
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="
                            flex-1 rounded-xl
                            border border-[var(--border)]
                            px-4 py-3
                            font-bold text-[var(--text-primary)]
                        "
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
}
