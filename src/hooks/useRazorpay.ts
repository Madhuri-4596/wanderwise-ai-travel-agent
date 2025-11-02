'use client';

import { useCallback } from 'react';

interface PaymentOptions {
  amount: number;
  currency?: string;
  name: string;
  description: string;
  onSuccess: (response: any) => void;
  onFailure?: (error: any) => void;
}

export const useRazorpay = () => {
  const initiatePayment = useCallback(async (options: PaymentOptions) => {
    try {
      // Create order on backend
      const orderResponse = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: options.amount,
          currency: options.currency || 'INR',
          receipt: `receipt_${Date.now()}`,
          notes: {
            name: options.name,
            description: options.description,
          },
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error('Failed to create order');
      }

      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const razorpayOptions = {
          key: orderData.key_id,
          amount: orderData.order.amount,
          currency: orderData.order.currency,
          name: 'LUNO Travel Agent',
          description: options.description,
          order_id: orderData.order.id,
          handler: async function (response: any) {
            // Verify payment
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                booking_details: {
                  name: options.name,
                  description: options.description,
                  amount: options.amount,
                },
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              options.onSuccess(verifyData);
            } else {
              options.onFailure?.(new Error('Payment verification failed'));
            }
          },
          prefill: {
            name: '',
            email: '',
            contact: '',
          },
          theme: {
            color: '#FF7F50',
          },
        };

        const razorpay = new (window as any).Razorpay(razorpayOptions);
        razorpay.open();
      };

      script.onerror = () => {
        options.onFailure?.(new Error('Failed to load Razorpay'));
      };
    } catch (error) {
      console.error('Payment error:', error);
      options.onFailure?.(error);
    }
  }, []);

  return { initiatePayment };
};
