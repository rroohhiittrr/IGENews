"use client";

import { useState } from "react";
import { X, CreditCard, Smartphone, Landmark, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  price: string;
  category: "reader" | "sme" | "associate-sme" | "company" | "leader";
  planId: string;
  onSuccess: (updatedFields: any) => void;
}

type PaymentMethod = "card" | "upi" | "netbanking";

export default function CheckoutModal({
  isOpen,
  onClose,
  planName,
  price,
  category,
  planId,
  onSuccess,
}: CheckoutModalProps) {
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [paymentState, setPaymentState] = useState<"idle" | "processing" | "success">("idle");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  if (!isOpen) return null;

  const handlePay = () => {
    setPaymentState("processing");
    setTimeout(() => {
      setPaymentState("success");
      setTimeout(() => {
        // Build the update payload based on category
        const updatePayload: any = {};
        const isFreePlan = planId === "free";

        if (category === "reader") {
          updatePayload.readerPlan = planId;
          updatePayload.plan = planId === "free" ? "free" : planId === "pro" ? "pro" : "enterprise";
        } else {
          if (isFreePlan) {
            // Initiate onboarding flow
            updatePayload.onboardingRole = category;
            updatePayload.onboardingStatus = "Draft";
            updatePayload.onboardingForm = {};
            updatePayload.onboardingDocs = {};
            updatePayload.onboardingFeedback = "";

            if (category === "sme") updatePayload.smePlan = "free";
            else if (category === "associate-sme") updatePayload.associateSmePlan = "free";
            else if (category === "company") updatePayload.companyPlan = "free";
            else if (category === "leader") updatePayload.leaderPlan = "free";
          } else {
            // For paid plans, activate instantly
            if (category === "sme") {
              updatePayload.smePlan = planId;
              updatePayload.accountType = "sme";
            } else if (category === "associate-sme") {
              updatePayload.associateSmePlan = planId;
              updatePayload.accountType = "associate-sme";
            } else if (category === "company") {
              updatePayload.companyPlan = planId;
              updatePayload.accountType = "company";
            } else if (category === "leader") {
              updatePayload.leaderPlan = planId;
              updatePayload.accountType = "leader";
            }
          }
        }

        onSuccess(updatePayload);
        setPaymentState("idle");
        onClose();
      }, 2000);
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={paymentState === "processing" ? undefined : onClose}
          className="absolute inset-0 bg-[#0c1829]/70 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white dark:bg-[#122238] w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl border border-gray-100 dark:border-white/10 z-10"
        >
          {paymentState === "idle" && (
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#1D1D46] dark:text-white">Secure Checkout</h3>
                  <p className="text-xs text-gray-500 mt-1">Upgrade your subscription securely</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Order Summary */}
              <div className="bg-[#f4f7fb] dark:bg-white/5 rounded-2xl p-5 mb-6 border border-gray-100 dark:border-transparent flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F0652E] block mb-1">SELECTED PLAN</span>
                  <span className="text-base font-bold text-[#1D1D46] dark:text-white">{planName}</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#1D1D46] dark:text-white">{price}</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">
                    {price === "Free" || price === "₹0" || price.toLowerCase().includes("free") ? "Activation Free" : "Recurring charge"}
                  </span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <span className="text-xs font-bold text-[#1D1D46] dark:text-white/70 block mb-3">Select Payment Method</span>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "card", label: "Card", icon: CreditCard },
                    { id: "upi", label: "UPI", icon: Smartphone },
                    { id: "netbanking", label: "NetBanking", icon: Landmark },
                  ].map((m) => {
                    const Icon = m.icon;
                    const isSelected = method === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setMethod(m.id as PaymentMethod)}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                          isSelected
                            ? "border-[#1D1D46] dark:border-[#F0652E] bg-[#1D1D46]/5 dark:bg-[#F0652E]/5 text-[#1D1D46] dark:text-white font-bold"
                            : "border-gray-200 dark:border-white/10 text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
                        }`}
                      >
                        <Icon className="w-5 h-5 mb-1.5" />
                        <span className="text-xs">{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Method Forms */}
              <div className="space-y-4 mb-8 min-h-[140px]">
                {method === "card" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Card Number</label>
                      <input
                        type="text"
                        placeholder="4111 2222 3333 4444"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-sm font-medium text-[#1D1D46] dark:text-white border-none focus:outline-none focus:ring-2 focus:ring-[#F0652E]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-sm font-medium text-[#1D1D46] dark:text-white border-none focus:outline-none focus:ring-2 focus:ring-[#F0652E]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">CVV</label>
                        <input
                          type="password"
                          placeholder="•••"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          maxLength={3}
                          className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-sm font-medium text-[#1D1D46] dark:text-white border-none focus:outline-none focus:ring-2 focus:ring-[#F0652E]"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {method === "upi" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">UPI ID</label>
                      <input
                        type="text"
                        placeholder="username@okaxis"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-sm font-medium text-[#1D1D46] dark:text-white border-none focus:outline-none focus:ring-2 focus:ring-[#F0652E]"
                      />
                    </div>
                    <p className="text-[11px] text-gray-400 leading-normal">
                      A payment request will be sent to your UPI app. Confirm the payment there to proceed.
                    </p>
                  </motion.div>
                )}

                {method === "netbanking" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Select Bank</label>
                      <select className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-sm font-semibold text-[#1D1D46] dark:text-white border-none focus:outline-none focus:ring-2 focus:ring-[#F0652E]">
                        <option>State Bank of India</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                        <option>Kotak Mahindra Bank</option>
                      </select>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-normal">
                      You will be redirected to your bank's secure page to complete the transaction.
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handlePay}
                  className="w-full py-4 bg-gradient-to-r from-[#1D1D46] to-[#0642BA] hover:from-[#0642BA] hover:to-[#1D1D46] text-white font-bold rounded-2xl shadow-lg transition-all text-sm flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#F0652E]" />
                  {price === "Free" || price === "₹0" || price.toLowerCase().includes("free") ? "Activate Free Plan & Start Onboarding" : `Pay ${price}`}
                </button>
                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-medium">
                  🔒 SSL Secured & Encrypted 256-bit Payment
                </div>
              </div>
            </div>
          )}

          {paymentState === "processing" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-10 flex flex-col items-center justify-center text-center space-y-4 min-h-[380px]"
            >
              <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-gray-100 dark:border-white/5" />
                <Loader2 className="w-8 h-8 text-[#F0652E] animate-spin absolute" />
              </div>
              <h3 className="text-lg font-bold text-[#1D1D46] dark:text-white mt-4">Processing Secure Payment</h3>
              <p className="text-xs text-gray-400 max-w-xs">
                Please do not close this window or click back. We are validating your transaction with the payment gateway.
              </p>
            </motion.div>
          )}

          {paymentState === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-10 flex flex-col items-center justify-center text-center space-y-4 min-h-[380px]"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400"
              >
                <CheckCircle2 className="w-10 h-10" />
              </motion.div>
              <h3 className="text-xl font-bold text-[#1D1D46] dark:text-white mt-4">Payment Successful!</h3>
              <p className="text-xs text-gray-400 max-w-xs">
                Your subscription has been successfully updated. We are redirecting you to your updated profile dashboard.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
