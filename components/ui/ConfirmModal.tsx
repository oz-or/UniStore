import React from "react";

interface ConfirmModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onConfirm,
  onCancel,
  loading,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px]">
        <h2 className="font-bold text-lg mb-2">Cancel Order</h2>
        <p>Are you sure you want to cancel this order?</p>
        <div className="flex gap-3 mt-6 justify-end">
          <button
            className="px-4 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={onCancel}
            disabled={loading}
          >
            No
          </button>
          <button
            className="px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Cancelling..." : "Yes, cancel"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
