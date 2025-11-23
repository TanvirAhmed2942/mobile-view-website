import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DollarSign } from 'lucide-react';

// Dummy data for transactions
const transactions = [
  {
    id: 1,
    name: 'Amoxicillin',
    orderId: '#123456789',
    amount: '$24.99',
    date: 'Oct 23, 2025'
  },
  {
    id: 2,
    name: 'Amoxicillin',
    orderId: '#123456789',
    amount: '$24.99',
    date: 'Oct 23, 2025'
  },
  {
    id: 3,
    name: 'Amoxicillin',
    orderId: '#123456789',
    amount: '$24.99',
    date: 'Oct 22, 2025'
  },
  {
    id: 4,
    name: 'Amoxicillin',
    orderId: '#123456789',
    amount: '$24.99',
    date: 'Oct 22, 2025'
  },
  {
    id: 5,
    name: 'Amoxicillin',
    orderId: '#123456789',
    amount: '$24.99',
    date: 'Oct 21, 2025'
  },
  {
    id: 6,
    name: 'Amoxicillin',
    orderId: '#123456789',
    amount: '$24.99',
    date: 'Oct 21, 2025'
  },
  {
    id: 7,
    name: 'Amoxicillin',
    orderId: '#123456789',
    amount: '$24.99',
    date: 'Oct 20, 2025'
  },
  {
    id: 8,
    name: 'Amoxicillin',
    orderId: '#123456789',
    amount: '$24.99',
    date: 'Oct 20, 2025'
  },
  {
    id: 9,
    name: 'Amoxicillin',
    orderId: '#123456789',
    amount: '$24.99',
    date: 'Oct 19, 2025'
  },
  {
    id: 10,
    name: 'Amoxicillin',
    orderId: '#123456789',
    amount: '$24.99',
    date: 'Oct 19, 2025'
  },
  {
    id: 11,
    name: 'Lisinopril',
    orderId: '#987654321',
    amount: '$15.50',
    date: 'Oct 18, 2025'
  },
  {
    id: 12,
    name: 'Metformin',
    orderId: '#456789123',
    amount: '$32.75',
    date: 'Oct 17, 2025'
  },
  {
    id: 13,
    name: 'Atorvastatin',
    orderId: '#789123456',
    amount: '$28.00',
    date: 'Oct 16, 2025'
  },
  {
    id: 14,
    name: 'Levothyroxine',
    orderId: '#321654987',
    amount: '$19.99',
    date: 'Oct 15, 2025'
  }
];

export default function RecentTransactions() {
  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Recent Transactions</h1>
      
      <ScrollArea className="h-[600px] w-full rounded-lg border bg-white">
        <div className="p-2">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">
                  {transaction.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Order {transaction.orderId}
                </p>
              </div>
              
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  {transaction.amount}
                </p>
                <p className="text-xs text-gray-500">
                  {transaction.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}