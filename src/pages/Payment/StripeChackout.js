import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutFrom";
import "./Stripe.css";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../../Redux/slice/orderSlice";

const stripePromise = loadStripe(
  "pk_test_51PxjlmJ6MvCbIOBu6vHaq2YMHirsKHIcj3cU0oJPtD1caEEk4XgNS5tllP93dDQAH7pi2SzdRJDGmJaG51GxnFVm00ZTCkQk2l"
);

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const [dpmCheckerLink, setDpmCheckerLink] = useState("");
  const currentOrder = useSelector(selectCurrentOrder);
  console.log(currentOrder);
  
  useEffect(() => {
    fetch("http://localhost:8080/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: currentOrder.totalAmount }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
      <div className="Stripe">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm/>
          </Elements>
        )}
      </div>
  );
}
