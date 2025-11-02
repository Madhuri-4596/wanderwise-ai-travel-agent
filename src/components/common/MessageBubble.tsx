'use client';

import React, { useState } from 'react';
import { Message } from '@/types';
import { useRazorpay } from '@/hooks/useRazorpay';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const { initiatePayment } = useRazorpay();
  const [showPayment, setShowPayment] = useState(false);

  // Check if message contains booking/price information
  const hasBookingInfo = !isUser && (
    message.content.includes('₹') ||
    message.content.includes('Book:') ||
    message.content.includes('CHEAPEST') ||
    message.content.includes('BEST VALUE')
  );

  const handleBookNow = () => {
    // For demo purposes, extract price from message or use default
    const priceMatch = message.content.match(/₹([\d,]+)/);
    const amount = priceMatch ? parseInt(priceMatch[1].replace(/,/g, '')) : 1000;

    initiatePayment({
      amount,
      currency: 'INR',
      name: 'Travel Booking',
      description: 'Booking via Wonderlust',
      onSuccess: (response) => {
        alert(`Payment Successful! 🎉\n\nPayment ID: ${response.payment_id}\n\nYou will receive a confirmation email shortly.`);
        setShowPayment(false);
      },
      onFailure: (error) => {
        alert(`Payment failed. Please try again.\n\nError: ${error.message}`);
        setShowPayment(false);
      },
    });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[75%] px-5 py-3 rounded-2xl smooth-transition ${
          isUser
            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-br-md shadow-lg'
            : 'bg-white text-gray-800 shadow-lg border border-orange-100 rounded-bl-md'
        }`}
      >
        {!isUser && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-black text-orange-600">AI Assistant</span>
          </div>
        )}
        <p className="text-base leading-relaxed whitespace-pre-wrap font-bold">{message.content}</p>

        {/* Payment Button */}
        {hasBookingInfo && (
          <button
            onClick={handleBookNow}
            className="mt-3 w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Book Now & Pay
          </button>
        )}

        <span className={`text-xs mt-2 block font-bold ${isUser ? 'text-white/80' : 'text-gray-500'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>
    </div>
  );
}
