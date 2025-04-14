'use client'
import { Blockchain } from '@/lib/blockchain/main';
import React, { SetStateAction } from 'react'
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { formatNumber } from '@/lib/utils';
import { formatAddress } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

const PendingTransactions = ({ blockchain, setBlockchain }: { 
	blockchain: Blockchain, 
	setBlockchain: (value: SetStateAction<Blockchain>) => void 
}) => {
	const { toast } = useToast();
	
	return (
		<>
			{blockchain.getPendingTransactions().length > 0 && (
				<div className="mt-6">
					<h3 className="text-lg font-semibold mb-3">Pending Transactions</h3>
					<div className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-100">
					<div className="flex justify-between items-center mb-3">
						<p className="text-sm font-medium text-gray-600">
							<span className="inline-flex items-center bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full mr-2">
								{blockchain.getPendingTransactions().length}/10
							</span>
							transactions pending
						</p>
						<span className="text-xs text-gray-500 italic">Will be mined when full</span>
					</div>
					
					<div className="flex flex-col gap-3">
						{blockchain.getPendingTransactions().map((tx, index) => (
							<Accordion key={index} type="single" collapsible>
							<AccordionItem value="item-1">
								<AccordionTrigger>
									<p className='flex items-center gap-1'>
										<span className='text-xs text-gray-500 truncate font-mono bg-gray-50 p-1 rounded-md flex-1'>
											{formatAddress(tx.senderAddress)}
										</span>
										<ArrowRight className='h-3 w-3 text-gray-400' />
										<span className='text-xs text-gray-500 truncate font-mono bg-gray-50 p-1 rounded-md flex-1'>
											{formatAddress(tx.receiverAddress)}
										</span>
									</p>
								</AccordionTrigger>
								<AccordionContent>
									<p>{formatNumber(tx.amount, 'BTC')}</p>
									<p className='text-xs text-gray-500'>{formatDate(new Date(tx.timestamp))}</p>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
						))}
					</div>
					
					<Button 
						type="button" 
						className="mt-5 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 flex items-center justify-center gap-2"
						onClick={() => {
							try {
								// mine the pending transactions
								const result = blockchain.minePendingTransactions();
								// update the blockchain
								setBlockchain(prevBlockchain => {
									// create a new blockchain with the same chain and wallet
									const newBlockchain = new Blockchain(prevBlockchain.chain, prevBlockchain.wallet);
									// update the pending transactions
									newBlockchain.pendingTransactions = [...prevBlockchain.pendingTransactions];
									return newBlockchain;
								});
								// show a toast if the transactions are mined successfully
								if (result) {
									toast({
										variant: "success",
										title: "Success",
										description: "Transactions mined successfully!",
									});
								} else {
									// show a toast if there are no pending transactions to mine
									toast({
										variant: "destructive",
										title: "No Transactions",
										description: "There are no pending transactions to mine.",
									});
								}
							} catch (error) {
								// show a toast if the mining fails
								toast({
									variant: "destructive",
									title: "Mining Failed",
									description: error instanceof Error ? error.message : "Failed to mine transactions",
								});
							}
						}}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
							<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
						</svg>
						Mine Pending Transactions
					</Button>
				</div>
			</div>
		)}
		</>
	)
}

export default PendingTransactions