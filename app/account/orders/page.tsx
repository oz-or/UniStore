"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/contexts/SessionContext/SessionContext";
import toast from "react-hot-toast";
import { cancelOrder, getUserOrders } from "@/app/(auth)/login/actions";
import { useRouter } from "next/navigation";
import PageLoadingSpinner from "@/components/ui/PageLoadingSpinner";
import ConfirmModal from "@/components/ui/ConfirmModal";

const OrdersPage = () => {
  const router = useRouter();
  const { session } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingOrderId, setCancellingOrderId] = useState<number | null>(
    null
  );
  const [openOrderId, setOpenOrderId] = useState<number | null>(null);
  const [confirmCancelOrderId, setConfirmCancelOrderId] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (!session) return;
    const getOrders = async () => {
      try {
        const data = await getUserOrders(session.user.id);
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch the orders", error);
      } finally {
        setLoading(false); // <-- Set loading to false after fetching
      }
    };
    getOrders();
  }, [session]);

  const handleCancel = (orderId: number) => {
    setConfirmCancelOrderId(orderId);
  };

  const confirmCancel = async () => {
    if (!session || confirmCancelOrderId === null) {
      setConfirmCancelOrderId(null);
      toast.error("You must be logged in to cancel an order.");
      return;
    }
    setCancellingOrderId(confirmCancelOrderId);
    try {
      const result = await cancelOrder(confirmCancelOrderId, session.user.id);
      if (result && result.length > 0) {
        setOrders((prev) => prev.filter((o) => o.id !== confirmCancelOrderId));
        toast.success("Order cancelled.");
      } else {
        toast.error(
          "Order could not be cancelled (not found or already cancelled)."
        );
      }
    } catch {
      toast.error("Failed to cancel order.");
    } finally {
      setCancellingOrderId(null);
      setConfirmCancelOrderId(null);
    }
  };

  const handleDownloadInvoice = async (orderId: string) => {
    const params = new URLSearchParams({
      email: session?.user.email || "",
      first_name: session?.user.user_metadata?.first_name || "",
      last_name: session?.user.user_metadata?.last_name || "",
    });
    window.open(`/api/invoice/${orderId}?${params.toString()}`, "_blank");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <PageLoadingSpinner />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <main className="ml-[52px] mt-2.5 750:ml-[70px] 750:mr-5 px-2 1024:pb-20 1024:mx-8 1440:mr-0">
        <section className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-full max-w-full 500:max-w-[500px] 750:max-w-[750px] 1024:max-w-[1024px] 1200:max-w-[1200px] 1440:max-w-[1440px] mx-auto px-4 py-8 500:mb-12 1200:mb-20 pb-16 ">
            <h1 className="font-semibold 500:text-base 750:text-lg 1200:text-2xl 1200:mb-6 1440:text-[26px]">
              Order History
            </h1>
            <div className="flex flex-col items-center justify-center mt-12 750:mt-16 1024:mt-20">
              <h2 className="font-bold mb-4 text-xl 500:text-2xl 750:text-3xl 1440:text-4xl ">
                You have no orders yet
              </h2>
              <p className="text-gray-500 mb-6 text-[13px] 500:text-base 750:text-lg 1440:text-xl ">
                Looks like you haven&apos;t placed any orders yet.
              </p>
              <button
                onClick={() => router.push("/")}
                className="bg-secondary-2 text-white px-6 py-2 rounded hover:bg-secondary-3 transition-colors duration-200 text-base 500:text-lg 750:text-xl 500:px-8 750:px-10 500:py-3 750:py-4 1440:px-12 1440:py-5"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="ml-[52px] mt-2.5 750:ml-[70px] 750:mr-5 px-2  1024:pb-20 1024:mx-8 1440:mr-0">
      <section className="grid gap-y-4 500:gap-y-7 ">
        <div className="translate-y-[4px] 500:translate-y-4 1440:translate-y-6 ml-2 flex flex-col gap-y-2">
          <h1 className="font-semibold 500:text-base 750:text-lg 1200:text-2xl 1200:mb-6 1440:text-[26px] ">
            Order History
          </h1>
          <span className="opacity-60 text-[10px] 750:text-xs 1440:text-sm 1440:mb-3">
            {orders.length} orders
          </span>
        </div>

        {orders.map((order) => {
          const isCancelling = cancellingOrderId === order.id;
          const showDetails = openOrderId === order.id;
          const firstItem = order.items?.[0];

          return (
            <div
              key={order.id}
              className={`shadow-account-rectangle bg-white p-3 rounded 500:p-4 1200:p-6 1440:p-8 transition-opacity duration-200 ${
                isCancelling ? "opacity-60 pointer-events-none" : ""
              }`}
            >
              <div className="flex justify-between">
                {/* Show only the first item as a summary */}
                {firstItem && (
                  <div className="flex gap-x-3 items-center">
                    <div className="aspect-square w-12 500:w-16 750:w-20 1200:w-24 1440:w-28 flex-shrink-0 rounded bg-gray-100 overflow-hidden">
                      <img
                        src={firstItem.img || "/products/placeholder.png"}
                        alt={firstItem.name}
                        className="w-full scale-75 h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <span className="font-semibold text-[13px] 500:text-base 750:text-lg 1200:text-xl 1440:text-2xl">
                        {firstItem.name}
                        {order.items.length > 1 && (
                          <span className="ml-2 text-xs 1200:text-sm 1440:text-base text-gray-500">
                            +{order.items.length - 1} more
                          </span>
                        )}
                      </span>
                      <div className="flex items-center gap-x-2 mt-1">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-gray-200 text-xs font-medium text-gray-700">
                          Qty: {firstItem.quantity}
                        </span>
                        <span className="font-bold text-green-600 text-sm 500:text-base 1200:text-lg ml-2">
                          ${Number(firstItem.price).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex flex-col justify-center px-3.5 border-l ml-3.5 500:pl-6 500:ml-6 750:pl-12 750:ml-10 750:pr-10 750:gap-y-1">
                  <span className="text-[9px] opacity-75 500:text-xs 750:text-sm 1200:text-base">
                    Status
                  </span>
                  <span
                    className={
                      order.status === "Cancelled"
                        ? "text-red-500 ..."
                        : "text-success-400 ..."
                    }
                  >
                    {order.status}
                  </span>
                </div>
              </div>
              <div
                className={`flex gap-x-2 mt-3 ${
                  order.items.length === 1 ? "" : "flex-wrap"
                }`}
              >
                {order.items.length > 1 && (
                  <button
                    onClick={() =>
                      setOpenOrderId(showDetails ? null : order.id)
                    }
                    className="flex-1 px-2 py-0.5 text-[10px] 500:px-3 500:text-[11px] 750:text-sm 500:py-1 750:py-1.5 1200:text-base 1200:py-2.5 rounded border border-neutral-300 bg-transparent text-neutral-800 font-semibold hover:bg-neutral-900 hover:text-white transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-neutral-400"
                  >
                    {showDetails ? "Hide order details" : "Show order details"}
                  </button>
                )}
                <button
                  onClick={() => handleDownloadInvoice(order.id)}
                  className="flex-1 px-2 py-0.5 text-[10px] 500:px-3 500:text-[11px] 750:text-sm 500:py-1 750:py-1.5 1200:text-base 1200:py-2.5 rounded border border-neutral-300 bg-transparent text-neutral-800 font-semibold hover:bg-neutral-900 hover:text-white transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-neutral-400"
                >
                  Show invoice
                </button>
                <button
                  onClick={() => handleCancel(order.id)}
                  disabled={isCancelling}
                  className="flex-1 px-2 py-0.5 text-[10px] 500:px-3 500:text-[11px] 750:text-sm 500:py-1 750:py-1.5 1200:text-base 1200:py-2.5 rounded border border-secondary-2 bg-transparent text-secondary-2 font-semibold hover:bg-secondary-2 hover:text-white transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-secondary-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isCancelling ? "Cancelling..." : "Cancel Order"}
                </button>
              </div>
              {/* Collapsible order details */}
              {showDetails && order.items.length > 1 && (
                <div className="mt-4 border-t pt-4 bg-gray-50 rounded-lg px-2 py-3">
                  {order.items.map((item: any, i: number) => (
                    <div
                      key={item.id || i}
                      className="flex items-center gap-x-3 mb-3 last:mb-0"
                    >
                      <div className="aspect-square w-12 500:w-16 750:w-20 1200:w-24 1440:w-28 flex-shrink-0 rounded bg-gray-100 overflow-hidden">
                        <img
                          src={item.img || "/products/placeholder.png"}
                          alt={item.name}
                          className="w-full scale-75 h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-y-1 flex-1">
                        <span className="font-semibold text-[12px] 500:text-base 1200:text-lg">
                          {item.name}
                        </span>
                        <div className="flex items-center gap-x-2">
                          <span className="inline-block px-2 py-0.5 rounded-full bg-gray-200 text-xs font-medium text-gray-700">
                            Qty: {item.quantity}
                          </span>
                          <span className="font-bold text-green-600 text-sm 500:text-base ml-2">
                            ${Number(item.price).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end mt-4">
                    <span className="font-bold text-base 1200:text-lg text-gray-800">
                      Total:&nbsp;
                      <span className="text-green-700">
                        ${Number(order.total).toFixed(2)}
                      </span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Simple confirmation modal */}
      <ConfirmModal
        open={confirmCancelOrderId !== null}
        onConfirm={confirmCancel}
        onCancel={() => setConfirmCancelOrderId(null)}
        loading={cancellingOrderId === confirmCancelOrderId}
      />
    </main>
  );
};

export default OrdersPage;
