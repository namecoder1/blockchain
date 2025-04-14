'use client'
import { useState, useEffect } from "react";
import { Blockchain } from "@/lib/blockchain/main";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Users, User, Wallet } from "lucide-react";
import { AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import BlockchainBlock from "@/components/block/block";
import PendingTransactions from "@/components/block/pending-transactions";
import { formatNumber } from "@/lib/utils";
import { user1, user2 } from "@/lib/blockchain/data";
import { ResponsiveAddress } from "@/components/ui/responsive-address";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const { toast } = useToast();
	const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [blockchain, setBlockchain] = useState(new Blockchain());
  const [formData, setFormData] = useState({
    amount: '',
    senderAddress: user1.address,
    receiverAddress: '',
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchBtcPrice();
  }, []);

  const fetchBtcPrice = async () => {
		try {
			const response = await fetch('/api/btc-price');
			if (!response.ok) {
				throw new Error('Failed to fetch BTC price');
			}
			const data = await response.json();
			setBtcPrice(data.price);
		} catch (error) {
			console.error('Error fetching BTC price:', error);
			return null;
		}
	};

  const addAction = (e: React.FormEvent) => {
    e.preventDefault();

    // Validazione del form
    if (!formData.amount || !formData.receiverAddress) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields.",
      });
      return;
    }

    const grossAmount = parseFloat(formData.amount);
    const fee = blockchain.calculateFee(grossAmount);
    const netAmount = grossAmount - fee;

    // Create a new transaction
    const newTransaction = {
      senderAddress: formData.senderAddress,
      receiverAddress: formData.receiverAddress,
      amount: netAmount,
      timestamp: new Date().toISOString(),
      fee: fee
    };

    try {
      // Add the transaction to the blockchain
      blockchain.addTransaction(newTransaction);
      
      // Forza l'aggiornamento dello stato creando una nuova istanza
      setBlockchain(prevBlockchain => {
        const newBlockchain = new Blockchain(prevBlockchain.chain, prevBlockchain.wallet);
        newBlockchain.pendingTransactions = [...prevBlockchain.pendingTransactions];
        return newBlockchain;
      });

      setFormData({ amount: '', senderAddress: user1.address, receiverAddress: ''}); 
      
      // Show success toast
      toast({
        variant: "success",
        title: "Success",
        description: "Transaction added successfully!",
      });
    } catch (error) {
      // Show error toast
      toast({
        variant: "destructive",
        title: "Transaction Failed",
        description: error instanceof Error ? error.message : "Transaction failed",
      });
    }
  };
  
  return (
    <div className="w-full py-8">
      {blockchain.checkValid() ? (
        <div className="mb-8 p-3 rounded-3xl border-2 bg-green-50 border-green-200 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-600 font-medium">
            Blockchain is valid and secure
          </AlertDescription>
        </div>
      ) : (
        <div className="mb-8 p-3 rounded-3xl border-2 bg-red-50 border-red-200 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-red-600 font-medium">
            Blockchain integrity compromised
          </AlertDescription>
        </div>
      )}

      {mounted && (
        <Card className="mb-4 shadow-sm bg-gradient-to-br from-gray-50 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <div className="p-2 bg-blue-50 rounded-xl mr-3">
                <Wallet className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <span className="block text-lg font-semibold">Wallet Balances</span>
                <span className="text-xs text-gray-500">Current exchange rate: 1 BTC ≈ {formatNumber(btcPrice || 0, 'EUR')}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <div className="flex justify-between gap-2 sm:items-center py-3 px-4 bg-blue-50 rounded-3xl border border-blue-100">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <div className="flex items-center mb-1 sm:mb-0">
                    <User className="h-4 w-4 mr-2 text-blue-600" />
                    <span className="font-medium mr-2">Your Balance:</span>
                  </div>
                  <ResponsiveAddress address={user1.address} className="font-mono text-xs bg-blue-100 w-fit py-1 px-2 rounded-3xl" />
                </div>
                <div className="flex flex-col items-end mt-1 sm:mt-0">
                  <span className="font-bold text-sm text-blue-700">{formatNumber(blockchain.getBalance(user1.address), 'BTC')}</span>
                  <span className="text-xs text-gray-500">≈ {formatNumber(blockchain.getBalance(user1.address) * (btcPrice || 0), 'EUR')}</span>
                </div>
              </div>
              
              <div className="flex justify-between gap-2 sm:items-center py-3 px-4 bg-gray-50 rounded-3xl border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <div className="flex items-center mb-1 sm:mb-0">
                    <Users className="h-4 w-4 mr-2 text-gray-600" />
                    <span className="font-medium mr-2">Available:</span>
                  </div>
                  <ResponsiveAddress address={user2.address} className="font-mono text-xs bg-gray-200 py-1 px-2 rounded-3xl" toCopy={true} />
                </div>
                <div className="flex flex-col items-end mt-1 sm:mt-0">
                  <span className="font-bold text-sm text-gray-700">{formatNumber(blockchain.getBalance(user2.address), 'BTC')}</span>
                  <span className="text-xs text-gray-500">≈ {formatNumber(blockchain.getBalance(user2.address) * (btcPrice || 0), 'EUR')}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <PendingTransactions blockchain={blockchain} setBlockchain={setBlockchain} />

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
                <BlockchainBlock key={index} block={block} />
              ))
            )}
            
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
                <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
              </svg>
              Send Transaction
            </CardTitle>
          </CardHeader>
          <CardContent>
          <form onSubmit={addAction} className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="receiverAddress" className="text-sm font-medium">
                Receiver Address
              </Label>
              <Select
                value={formData.receiverAddress}
                onValueChange={(value) =>
                  setFormData({ ...formData, receiverAddress: value })
                }
              >
                <SelectTrigger className="w-full font-mono text-sm">
                  <SelectValue placeholder="Select receiver address" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={user2.address} className="font-mono">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-xs">{user2.address}</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="data_amount" className="text-sm font-medium">
                Amount (Gross)
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  id="data_amount"
                  placeholder="Enter amount"
                  required
                  className="w-full pl-10 font-mono text-sm"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                    <path d="M12 18V6"></path>
                  </svg>
                </div>
              </div>
            </div>

            {formData.amount && (
              <div className="mt-3 bg-gray-50 rounded-xl border border-gray-100 p-3 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm font-medium text-gray-700">Fee</span>
                  </div>
                  <div className="flex flex-col items-end mt-1 sm:mt-0">
                    <span className="text-sm font-semibold text-gray-900">{formatNumber(blockchain.calculateFee(parseFloat(formData.amount)), 'BTC')}</span>
                    <span className="text-xs text-gray-500">≈ {formatNumber(blockchain.calculateFee(parseFloat(formData.amount)) * (btcPrice || 0), 'EUR')}</span>
                  </div>
                </div>
                
                <div className="h-px bg-gray-200"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm font-medium text-gray-700">Net Amount</span>
                  </div>
                  <div className="flex flex-col items-end mt-1 sm:mt-0">
                    <span className="text-sm font-semibold text-gray-900">{formatNumber(parseFloat(formData.amount) - blockchain.calculateFee(parseFloat(formData.amount)), 'BTC')}</span>
                    <span className="text-xs text-gray-500">≈ {formatNumber((parseFloat(formData.amount) - blockchain.calculateFee(parseFloat(formData.amount))) * (btcPrice || 0), 'EUR')}</span>
                  </div>
                </div>
              </div>
            )}

            <Button type="submit" className="mt-3 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
              Send Transaction
            </Button>
          </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}