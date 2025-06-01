"use client";

import {
  getUserCartItems,
  validateCoupon,
  saveBillingDetailsToProfile,
} from "@/app/(auth)/login/actions";

import NavigationHeading from "@/components/NavigationHeading";
import { useSession } from "@/contexts/SessionContext/SessionContext";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import TransferInAdvance from "@/components/checkout/TransferInAdvance";
import PlaceOrderBtn from "@/components/checkout/PlaceOrderBtn";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext/CartContext";
import Spinner from "@/components/ui/Spinner";
import PageLoadingSpinner from "@/components/ui/PageLoadingSpinner";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CheckoutPage = () => {
  const router = useRouter();
  const { cartItemCount } = useCart();
  const { session, loading } = useSession();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [discount, setDiscount] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    apartment: "",
  });
  const [stripePaid, setStripePaid] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [inputErrors, setInputErrors] = useState<{ [key: string]: string }>({});
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (cartItemCount === 0) {
      router.replace("/cart");
    }
  }, [cartItemCount, router]);

  useEffect(() => {
    if (!loading && session) {
      // Fetch cart items
      getUserCartItems(session.user.id).then((cartItems) => {
        if (cartItems) {
          setCartItems(cartItems);
        }
      });
    }
  }, [loading, session]);

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/login"); // or your login route
    }
  }, [session, loading, router]);

  if (!session || cartItemCount === 0) {
    // Optionally, you can return null or a spinner
    return null;
  }

  const handleApplyCoupon = async () => {
    setIsApplyingCoupon(true);
    setCouponError("");

    try {
      const result = await validateCoupon(couponCode, subtotal);

      if (!result.valid) {
        setCouponError(result.error || "");
      } else {
        setDiscount((subtotal * result.discount) / 100); // Apply the discount
        setCouponApplied(true);
        setCouponCode(""); // Clear the input field
      }
    } catch (err) {
      console.error("Error applying coupon:", err);
      setCouponError("An error occurred while applying the coupon.");
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateShipping = (subtotal: number): string => {
    if (subtotal > 100) {
      return "Free"; // Free shipping for orders above $100
    } else if (subtotal >= 50) {
      return `$${5}`; // Flat rate for orders between $50 and $100
    } else {
      return `$${10}`; // Higher rate for orders below $50
    }
  };

  const validateInputs = () => {
    const errors: { [key: string]: string } = {};
    if (!billingInfo.firstName.trim())
      errors.firstName = "First name is required.";
    if (!billingInfo.lastName.trim())
      errors.lastName = "Last name is required.";
    if (
      !billingInfo.email.trim() ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(billingInfo.email)
    )
      errors.email = "Valid email is required.";
    if (!billingInfo.phone.trim()) errors.phone = "Phone number is required.";
    if (!billingInfo.city.trim()) errors.city = "City is required.";
    if (!billingInfo.address.trim()) errors.address = "Address is required.";
    // Apartment is optional
    return errors;
  };

  const subtotal = calculateSubtotal();
  const shipping = calculateShipping(subtotal);
  const total =
    subtotal +
    (shipping === "Free" ? 0 : parseFloat(shipping.slice(1))) -
    discount;

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPayment(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedBillingInfo = { ...billingInfo, [name]: value };
    setBillingInfo(updatedBillingInfo);
  };

  const handleOrderPlaced = (orderId: string) => {
    setRedirecting(true);
    saveBillingDetailsToProfile(session?.user?.id || "", billingInfo);
    router.push(`/checkout/success?orderId=${orderId}`);
  };

  if (redirecting) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <PageLoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto px-4 py-8 500:max-w-[500px] 750:max-w-[750px] 1024:max-w-[1024px] 1200:max-w-[1200px] 1440:max-w-[1440px] 500:mb-12 1200:mb-20">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner />
        </div>
      ) : (
        <div>
          <div className="1440:pl-8">
            <NavigationHeading pageName1="Checkout" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Billing Details</h1>
          <div className="grid 1024:grid-cols-2 gap-8">
            {/* Billing Form */}
            <div className="space-y-4">
              <div>
                <input
                  className="w-full p-2 border rounded focus:border-secondary-2 focus:ring-secondary-2 focus:outline-none"
                  type="text"
                  name="firstName"
                  placeholder="First Name*"
                  value={billingInfo.firstName}
                  onChange={handleInputChange}
                />
                {inputErrors.firstName && (
                  <div className="text-red-500 text-sm mt-1">
                    {inputErrors.firstName}
                  </div>
                )}
              </div>
              <div>
                <input
                  className="w-full p-2 border rounded focus:border-secondary-2 focus:ring-secondary-2 focus:outline-none"
                  type="text"
                  name="lastName"
                  placeholder="Last Name*"
                  value={billingInfo.lastName}
                  onChange={handleInputChange}
                />
                {inputErrors.lastName && (
                  <div className="text-red-500 text-sm mt-1">
                    {inputErrors.lastName}
                  </div>
                )}
              </div>
              <div>
                <input
                  className="w-full p-2 border rounded focus:border-secondary-2 focus:ring-secondary-2 focus:outline-none"
                  type="email"
                  name="email"
                  placeholder="Email Address*"
                  value={billingInfo.email}
                  onChange={handleInputChange}
                />
                {inputErrors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {inputErrors.email}
                  </div>
                )}
              </div>
              <div>
                <input
                  className="w-full p-2 border rounded focus:border-secondary-2 focus:ring-secondary-2 focus:outline-none"
                  type="text"
                  name="phone"
                  placeholder="Phone Number*"
                  value={billingInfo.phone}
                  onChange={handleInputChange}
                />
                {inputErrors.phone && (
                  <div className="text-red-500 text-sm mt-1">
                    {inputErrors.phone}
                  </div>
                )}
              </div>
              <div>
                <input
                  className="w-full p-2 border rounded focus:border-secondary-2 focus:ring-secondary-2 focus:outline-none"
                  type="text"
                  name="city"
                  placeholder="Town/City*"
                  value={billingInfo.city}
                  onChange={handleInputChange}
                />
                {inputErrors.city && (
                  <div className="text-red-500 text-sm mt-1">
                    {inputErrors.city}
                  </div>
                )}
              </div>
              <div>
                <input
                  className="w-full p-2 border rounded focus:border-secondary-2 focus:ring-secondary-2 focus:outline-none"
                  type="text"
                  name="address"
                  placeholder="Street Address*"
                  value={billingInfo.address}
                  onChange={handleInputChange}
                />
                {inputErrors.address && (
                  <div className="text-red-500 text-sm mt-1">
                    {inputErrors.address}
                  </div>
                )}
              </div>
              <div>
                <input
                  className="w-full p-2 border rounded focus:border-secondary-2 focus:ring-secondary-2 focus:outline-none"
                  type="text"
                  name="apartment"
                  placeholder="Apartment, floor, etc. (optional)"
                  value={billingInfo.apartment}
                  onChange={handleInputChange}
                />
                {/* No error for apartment, it's optional */}
              </div>
            </div>

            {/* Order Summary */}
            <div className="border p-6 rounded-lg shadow-md bg-white space-y-6">
              {/* Order Summary Header */}
              <h2 className="text-xl font-semibold border-b pb-4">
                Order Summary
              </h2>

              {/* Order Items */}
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-4 border-b last:border-b-0"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  Your cart is empty.
                </p>
              )}

              {/* Subtotal, Shipping, and Total */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium text-gray-800">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium text-gray-800">{shipping}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-lg border-t pt-4">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Options */}
              <div className="space-y-6">
                {/* Payment on Delivery */}
                <div>
                  <label className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="payment"
                      value="Payment on Delivery"
                      className="mr-2"
                      onChange={handlePaymentChange}
                    />{" "}
                    Payment on Delivery
                  </label>
                </div>

                {/* Transfer in Advance / Stripe */}
                <div>
                  <label className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="payment"
                      value="Transfer in Advance"
                      className="mr-2"
                      onChange={(e) => setSelectedPayment(e.target.value)}
                    />
                    Transfer in Advance
                  </label>
                  {selectedPayment === "Transfer in Advance" && (
                    <Elements stripe={stripePromise}>
                      <TransferInAdvance
                        total={total}
                        onPaymentSuccess={() => {
                          setStripePaid(true);
                          setPaymentError(""); // clear any previous error
                          console.log("Payment was successful!");
                        }}
                      />
                    </Elements>
                  )}
                </div>
              </div>

              {/* Coupon Section */}
              {!couponApplied ? (
                <div className="flex gap-2 transition-all duration-300">
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg focus:border-secondary-2 focus:ring-secondary-2 focus:outline-none"
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={isApplyingCoupon}
                  />
                  <button
                    className="bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition"
                    onClick={handleApplyCoupon}
                    disabled={isApplyingCoupon}
                  >
                    Apply Coupon
                  </button>
                </div>
              ) : (
                <div className="text-green-600 flex items-center gap-2">
                  <span className="checkmark">✔</span>
                  <span>Coupon successfully applied!</span>
                </div>
              )}

              {couponError && (
                <div className="text-red-500 mt-2">{couponError}</div>
              )}

              {paymentError && (
                <div className="text-red-500 mt-2">{paymentError}</div>
              )}

              {/* Place Order Button */}
              <PlaceOrderBtn
                billingInfo={billingInfo}
                userId={session?.user?.id || ""}
                cartItems={cartItems.map((item) => ({
                  product_id: item.id.toString(),
                  quantity: item.quantity,
                  price: item.price,
                  name: item.name ?? "",
                  img: item.img ?? "",
                }))}
                total={total}
                paymentOption={
                  selectedPayment === "Transfer in Advance" && stripePaid
                    ? "Transfer in Advance - Already Payed"
                    : selectedPayment
                }
                onOrderPlaced={handleOrderPlaced}
                stripePaid={stripePaid}
                setPaymentError={setPaymentError}
                inputErrors={inputErrors}
                validateInputs={validateInputs}
                setInputErrors={setInputErrors}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
