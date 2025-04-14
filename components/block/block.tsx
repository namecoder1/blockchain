import React from 'react'
import { Badge } from '../ui/badge'
import { formatAddress, formatDate, formatNumber } from '@/lib/utils'
import { Block } from '@/lib/blockchain/main'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { CheckCircle, ArrowRight, Hash, LinkIcon } from 'lucide-react'

const BlockchainBlock = ({ block }: { block: Block }) => {
	return (
		<div className="mb-4 p-4 border rounded-xl bg-white hover:bg-gray-50 transition-colors">
			<div className="flex justify-between items-center mb-2">
				<div className="flex items-center gap-2">
					<Badge variant="secondary" className="px-2 py-0.5 text-xs">Block #{block.index}</Badge>
					<Badge variant="outline" className="text-xs bg-green-50 text-green-600 border-green-200">
						<CheckCircle className="h-3 w-3 mr-1" /> Mined
					</Badge>
				</div>
				
				<span className="text-xs text-gray-500 font-mono">{formatDate(new Date(block.timestamp))}</span>
			</div>
			
			{block.transactions.map((tx, index) => (
				<Accordion key={index} type="single" collapsible>
					<AccordionItem value="item-1">
						<AccordionTrigger>
							<p className='flex items-center gap-1'>
								<span className='text-xs text-gray-500 truncate font-mono bg-gray-50 p-1 rounded-md flex-1'>{formatAddress(tx.senderAddress)}</span>
								<ArrowRight className='h-3 w-3 text-gray-400' />
								<span className='text-xs text-gray-500 truncate font-mono bg-gray-50 p-1 rounded-md flex-1'>{formatAddress(tx.receiverAddress)}</span>
							</p>
						</AccordionTrigger>
						<AccordionContent>
							<div className='flex justify-between items-center gap-1'>
								<p>{formatNumber(tx.amount, 'BTC')}</p>
								<p className='text-xs text-gray-500'>Fee: {formatNumber(tx.fee, 'BTC')}</p>
							</div>
							<p className='text-xs text-gray-500'>{formatDate(new Date(tx.timestamp))}</p>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			))}

			
			<div className="mt-2 pt-2 border-t border-dashed border-gray-100 space-y-1.5">
				<div className="flex items-center gap-1.5">
					<Hash className="h-3 w-3 text-gray-400" />
					<p className="text-xs text-gray-500 truncate font-mono bg-gray-50 p-1 rounded-md flex-1">{block.hash}</p>
				</div>
				<div className="flex items-center gap-1.5">
					<LinkIcon className="h-3 w-3 text-gray-400" />
					<p className="text-xs text-gray-500 truncate font-mono bg-gray-50 p-1 rounded-md flex-1">{block.previousHash}</p>
				</div>
			</div>
		</div>
	)
}

export default BlockchainBlock