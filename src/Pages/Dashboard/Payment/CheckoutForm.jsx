import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useCart from "../../../hooks/useCart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [cart, refetch] = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const totalPrice = cart.reduce(
    (prevItem, currItem) => prevItem + currItem.price,
    0
  );

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/payments/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      setError("");
      console.log("PaymentMethod Method", paymentMethod);
    }

    //confirm the payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm payment error", confirmError);
    } else {
      console.log("Payment confirmed", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // now save the payment in the database
        const payment = {
          email: user?.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(), //utc date convert, use momentjs to convert
          cartIds: cart.map((item) => item._id),
          menuItemIds: cart.map((item) => item.menuId),
          status: "pending",
        };

        const res = await axiosSecure.post("/payments", payment);
        console.log("payment save", res);
        refetch();
        if (res?.data?.paymentResult?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Payment successful!",
            text: "Your order has been placed.",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/paymentHistory");
        }
      }
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg transition-all hover:shadow-3xl">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 relative">
          Secure Payment
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-500 rounded-full"></span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group border-2 border-gray-200 p-5 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:border-blue-300 transition-all focus-within:border-blue-500 focus-within:ring-8 ring-blue-100">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#1a1a1a",
                    fontFamily: "'Inter', sans-serif",
                    "::placeholder": {
                      color: "#9ca3af",
                      fontWeight: "400"
                    },
                    lineHeight: "1.5",
                    letterSpacing: "0.025em"
                  },
                  invalid: {
                    color: "#dc2626",
                    iconColor: "#dc2626"
                  },
                },
                // hidePostalCode: true,
                classes: {
                  focus: 'focused'
                }
              }}
              className="p-3"
            />
          </div>

          <button
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl transition-transform transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:pointer-events-none"
            type="submit"
            disabled={!stripe}
          >
            Pay Now
            <span className="ml-2">→</span>
          </button>

          {error && (
            <div className="flex items-center p-3 bg-red-50/80 border border-red-100 rounded-lg text-red-600 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          {transactionId && (
            <div className="flex items-center p-3 bg-emerald-50/80 border border-emerald-100 rounded-lg text-emerald-600 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Transaction ID: <span className="font-mono ml-2">{transactionId}</span>
            </div>
          )}
        </form>

        <div className="mt-6 flex justify-center space-x-4">
          <div className="flex items-center text-gray-400 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1 14.414l-4.707-4.707 1.414-1.414L11 13.586l5.293-5.293 1.414 1.414L11 16.414z" />
            </svg>
            Secure SSL
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm3.293 8.707L11 13.586l-2.293-2.293-1.414 1.414L11 16.414l5.707-5.707-1.414-1.414z" />
            </svg>
            256-bit Encryption
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;