"use client";

import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "@/app/(auth)/login/actions"; // Import your server action
import { useRouter } from "next/navigation";

interface TransferInAdvanceProps {
  total: number; // Total amount for the payment
  onPaymentSuccess: () => void; // Callback function to handle successful payment
}

const TransferInAdvance: React.FC<TransferInAdvanceProps> = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error messages

  const handlePayment = async () => {
    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded yet. Please try again.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null); // Clear any previous error messages

    try {
      const { clientSecret } = await createPaymentIntent(total);

      if (!clientSecret) {
        throw new Error("Client secret is null. Unable to process payment.");
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (result.error) {
        // Display the error message in the UI
        setErrorMessage(
          result.error.message || "Payment failed. Please try again."
        );
      } else if (result.paymentIntent?.status === "succeeded") {
        // Redirect to the success page
        router.push("/checkout/success");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setErrorMessage(
        "An error occurred while processing the payment. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Add a Card</h3>

      {/* Display error message if payment fails */}
      {errorMessage && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
          {errorMessage}
        </div>
      )}

      <div className="space-y-4">
        <CardElement className="p-3 border rounded-lg" />
        <button
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay Now and Place Order"}
        </button>
      </div>
    </div>
  );
};

export default TransferInAdvance;
