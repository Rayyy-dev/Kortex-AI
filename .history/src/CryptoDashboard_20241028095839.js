"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Bitcoin, DollarSign, Coins, ArrowUpRight, ArrowDownRight, Sparkles } from 'lucide-react';

const cryptoData = [
  { name: 'Bitcoin', symbol: 'BTC', price: 45123, change: 2.5, icon: Bitcoin, color: '#F7931A' },
  { name: 'Ethereum', symbol: 'ETH', price: 3017, change: -0.8, icon: DollarSign, color: '#627EEA' },
  { name: 'Ripple', symbol: 'XRP', price: 0.75, change: 1.2, icon: Coins, color: '#23292F' },
];

// ... (rest of your provided code until the Dashboard component)

export const CompactCryptoDashboardGenerator = () => {
  const [stage, setStage] = useState('typing');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage(stage === 'typing' ? 'pipeline' : stage === 'pipeline' ? 'dashboard' : 'typing');
    }, stage === 'typing' ? 3000 : stage === 'pipeline' ? 5000 : 5000);

    return () => clearTimeout(timer);
  }, [stage]);

  return (
    <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center text-white">AI Solutions</h1>
        <p className="text-center text-gray-400 mb-6 text-sm">Describe your issue and let our AI generate a solution for you!</p>
        <div className="bg-[#1a1a2e] p-4 rounded-lg min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {/* ... (rest of your component JSX) */}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
