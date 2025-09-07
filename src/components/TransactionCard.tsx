import { Card } from "./ui/card";
import { Coffee, Car, ShoppingBag, Film, DollarSign } from "lucide-react";

interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  roundUp: number;
  date: string;
  category: string;
}

interface TransactionCardProps {
  transaction: Transaction;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const categoryIcons = {
    "Food & Drink": Coffee,
    "Transportation": Car,
    "Shopping": ShoppingBag,
    "Entertainment": Film,
  };

  const IconComponent = categoryIcons[transaction.category as keyof typeof categoryIcons] || DollarSign;

  return (
    <Card className="p-4 mb-3 bg-white/80 backdrop-blur-sm border border-gray-200/60 cursor-pointer hover:shadow-lg hover:bg-white/90 transition-all duration-300 hover:scale-[1.01]">
      <div className="flex items-center gap-4">
        {/* Enhanced Category Icon */}
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
          <IconComponent className="w-5 h-5 text-emerald-600" />
        </div>

        <div className="flex-1">
          {/* Transaction Details */}
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="text-gray-800 mb-1">{transaction.merchant}</h4>
              <p className="text-xs text-gray-500">{transaction.category}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-700">${transaction.amount.toFixed(2)}</p>
              <div className="flex items-center gap-1 justify-end">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                <p className="text-xs text-emerald-600">
                  +${transaction.roundUp.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">{transaction.date}</p>
            <div className="px-2 py-1 bg-emerald-50 rounded-full">
              <p className="text-xs text-emerald-700">Donated</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}