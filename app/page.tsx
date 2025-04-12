'use client'
import { useState } from "react";
import { Block, Blockchain } from "@/lib/blockchain/main";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import formatDate from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Plus } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [blockchain, setBlockchain] = useState(new Blockchain());
  const [formData, setFormData] = useState({
    amount: '',
    currency: 'usd' as 'usd' | 'eur' | 'gbp',
  });

  const addAction = (e: React.FormEvent) => {
    e.preventDefault();

    // Validazione del form
    if (!formData.amount || !formData.currency) {
      alert("Please fill in all fields.");
      return;
    }

    const now = new Date();
    const formattedDate = formatDate(now);

    const newBlock = new Block(formattedDate, {
      amount: formData.amount,
      currency: formData.currency,
    });

    blockchain.addBlock(newBlock);

    setFormData({ amount: '', currency: 'usd' }); // Resetta il form
  };

  const getCurrencySymbol = (currency: string) => {
    switch(currency) {
      case 'usd': return '$';
      case 'eur': return '€';
      case 'gbp': return '£';
      default: return '';
    }
  };

  return (
    <div className="px-4 mx-auto py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Blockchain Visualizer</h1>
      
      {blockchain.checkValid() ? (
        <div className="mb-8 p-3 rounded-lg border-2 bg-green-50 border-green-200 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-600 font-medium">
            Blockchain is valid and secure
          </AlertDescription>
        </div>
      ) : (
        <div className="mb-8 p-3 rounded-lg border-2 bg-red-50 border-red-200 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-red-600 font-medium">
            Blockchain integrity compromised
          </AlertDescription>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="mr-2">Blockchain Ledger</span>
              <Badge variant="outline" className="ml-2">
                {blockchain.chain.length} blocks
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="max-h-[600px] overflow-y-auto">
            {blockchain.chain.length <= 1 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No transactions yet. Add your first transaction!</p>
              </div>
            ) : (
              blockchain.chain.slice(1).map((block, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="mb-2">Block #{block.index}</Badge>
                    <span className="text-sm text-gray-500">{block.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl font-bold">
                      {getCurrencySymbol(block.data.currency)}{block.data.amount}
                    </span>
                    <Badge>{block.data.currency.toUpperCase()}</Badge>
                  </div>
                  <div className="mt-3 pt-3 border-t border-dashed">
                    <p className="text-xs text-gray-500 truncate"><span className="font-medium">Hash:</span> {block.hash}</p>
                    <p className="text-xs text-gray-500 truncate"><span className="font-medium">Prev:</span> {block.previousHash}</p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Add Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={addAction}
              className="flex flex-col gap-4"
            >
              <div>
                <label htmlFor="data_amount" className="block text-sm font-medium mb-1">
                  Amount
                </label>
                <Input
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  id="data_amount"
                  placeholder="Enter amount"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="currency" className="block text-sm font-medium mb-1">
                  Currency
                </label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, currency: value as 'usd' | 'eur' | 'gbp' })
                  }
                  value={formData.currency}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eur">Euro (€)</SelectItem>
                    <SelectItem value="usd">US Dollar ($)</SelectItem>
                    <SelectItem value="gbp">British Pound (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                type="submit"
                className="mt-3 w-full"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Transaction
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}