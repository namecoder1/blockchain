'use client'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

const AddressList = ({ addresses }: { addresses: string[] }) => {
	const { toast } = useToast();

	const copyAddress = () => {
		toast({
			title: 'Address copied to clipboard',
			description: 'You can now paste it into your wallet',
			variant: 'success',
		})
	}

	return (
		<Card className='mb-8 p-4'>
			<h2 className="text-lg font-semibold mb-3">Saved Addresses</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
				{addresses.map((address, index) => (
					<Card key={index} className="p-3 hover:bg-gray-50 transition-colors">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
									{index + 1}
								</div>
								<span className="text-sm font-medium text-gray-700 truncate">{address.substring(0, 9)}...{address.substring(address.length - 4)}</span>
							</div>
							<CopyToClipboard text={address}>
								<Button 
									onClick={() => copyAddress()} 
									variant="outline" 
									size="sm" 
									className="text-xs px-3 py-1 h-8"
								>
									Copy
								</Button>
							</CopyToClipboard>
						</div>
					</Card>
				))}
			</div>
		</Card>
	)
}

export default AddressList