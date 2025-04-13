'use client'
import { useState } from "react";
import { Block, Blockchain } from "@/lib/blockchain/main";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle } from "lucide-react";
import { AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import AddressList from "@/components/block/address-list";
import BlockchainBlock from "@/components/block/block";

const addresses = [
  '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
  '18h23j0dye2e082y3dfhd383h03hof323w',
  '038y3e2ts2uy10e2y9edg287du09nz2y2g'
]


const btcAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'

export default function Home() {
  const [blockchain, setBlockchain] = useState(new Blockchain());
  const [formData, setFormData] = useState({
    amount: '',
    senderAddress: btcAddress,
    receiverAddress: '',
  });

  const addAction = (e: React.FormEvent) => {
    e.preventDefault();

    // Validazione del form
    if (!formData.amount || !formData.receiverAddress) {
      alert("Please fill in all fields.");
      return;
    }

    const now = new Date();
    const formattedDate = formatDate(now);

    const newBlock = new Block(formattedDate, {
      senderAddress: formData.senderAddress,
      receiverAddress: formData.receiverAddress,
      amount: parseFloat(formData.amount),
    });

    // Non minare il blocco qui, verrà fatto in addBlock
    blockchain.addBlock(newBlock);
    
    // Aggiorna lo stato React con una nuova istanza di blockchain
    setBlockchain(new Blockchain(blockchain.chain));

    setFormData({ amount: '', senderAddress: btcAddress, receiverAddress: ''}); // Resetta il form
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

      <AddressList addresses={addresses} />

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
          <CardHeader>
            <CardTitle>Add Transaction</CardTitle>
          </CardHeader>
          <CardContent>
          <form onSubmit={addAction} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="receiverAddress">
                Receiver Address
              </Label>
              <Input
                type="text"
                value={formData.receiverAddress}
                onChange={(e) =>
                  setFormData({ ...formData, receiverAddress: e.target.value })
                }
                id="receiverAddress"
                placeholder="Enter receiver address"
                required
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="data_amount">
                Amount
              </Label>
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

            <Button type="submit" className="mt-3 w-full">
              Add Transaction
            </Button>
          </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}