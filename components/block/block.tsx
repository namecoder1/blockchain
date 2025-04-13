import React from 'react'
import { Badge } from '../ui/badge'
import { formatNumber } from '@/lib/utils'
import { Block } from '@/lib/blockchain/main'
import { CheckCircle, ArrowRight, Hash, LinkIcon } from 'lucide-react'

const BlockchainBlock = ({ block }: { block: Block }) => {
	return (
		<div className="mb-4 p-4 border rounded-xl bg-white hover:bg-gray-50 transition-colors">
			<div className="flex justify-between items-center mb-2">
				<Badge variant="secondary" className="px-2 py-0.5 text-xs">Block #{block.index}</Badge>
				<span className="text-xs text-gray-500 font-mono">{block.timestamp}</span>
			</div>
			
			<div className="flex items-center justify-between mb-3 p-2 rounded-lg bg-gray-50">
				<span className="text-lg font-semibold text-gray-800">
					{formatNumber(block.data.amount, 'BTC')}
				</span>
				<Badge variant="outline" className="text-xs bg-green-50 text-green-600 border-green-200">
					<CheckCircle className="h-3 w-3 mr-1" /> Mined
				</Badge>
			</div>
			
			<div className="flex items-center justify-between mb-3 p-2 rounded-lg bg-gray-50">
				<div className="grid grid-cols-[auto_1fr] gap-2 items-center ">
					<span className="text-xs font-medium text-gray-500 w-8 text-right">FROM</span>
					<p className="text-xs text-gray-700 truncate font-mono bg-gray-50 p-1.5 rounded-md">
						{block.data.senderAddress}
					</p>
				</div>
				
				<div className="flex justify-center my-1">
					<ArrowRight className="h-3 w-3 text-gray-300" />
				</div>
				
				<div className="grid grid-cols-[auto_1fr] gap-2 items-center">
					<span className="text-xs font-medium text-gray-500 w-8 text-right">TO</span>
					<p className="text-xs text-gray-700 truncate font-mono bg-gray-50 p-1.5 rounded-md">
						{block.data.receiverAddress}
					</p>
				</div>
			</div>

			
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