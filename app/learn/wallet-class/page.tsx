import React from 'react'
import { step1, step2, step3, step4, step5, transactionType } from '@/lib/code-examples/wallet-class'
import CodeBlock from '@/components/block/codeblock'
import ButtonsBox from '@/components/block/buttons-box'

const WalletClassPage = () => {
	return (
		<div className='flex flex-col gap-8 my-8'>
			<div className='flex flex-col gap-4 mt-4'>
				<h2 className='text-3xl font-bold'>The Wallet Class</h2>
				<div className='flex flex-col gap-2'>
					<h3 className='text-xl font-medium'>The idea</h3>
					<p className='text-muted-foreground'>
						Our wallet class is designed to be a simple and easy to understand class that can be used to create and manage wallets in our blockchain.
						Create a new file called <code className='bg-muted px-2 py-1 rounded-md'>wallet.ts</code> and copy and paste the code below.
					</p>
					<CodeBlock
						value={{
							language: 'typescript',
							code: step1,
							filename: 'wallet.ts'
						}}
					/>
					<h3 className='text-xl font-medium mt-4'>The getBalance() and hasEnoughBalance() methods</h3>
					<p className='text-muted-foreground'>
						This method is used to get the balance of an address.
					</p>
					<CodeBlock
						value={{
							language: 'typescript',
							code: step2,
							filename: 'wallet.ts'
						}}
					/>
					<h3 className='text-xl font-medium mt-4'>The updateBalance() method</h3>
					<p className='text-muted-foreground'>
						This method is used to update the balance of an address.
						First we get the current balance of the address.
						Then we update the balance of the address.
					</p>
					<CodeBlock
						value={{
							language: 'typescript',
							code: step3,
							filename: 'wallet.ts'
						}}
					/>
					<h3 className='text-xl font-medium mt-4'>The processTransaction() method</h3>
					<p className='text-muted-foreground'>
						This method is used to process a transaction.
						First we check if the sender has enough balance (including fee).
						Then we update the balances of the sender and receiver.
					</p>
					<CodeBlock
						value={{
							language: 'typescript',
							code: step4,
							filename: 'wallet.ts'
						}}
					/>
					<h3 className='text-xl font-medium mt-4'>The checkDoubleSpending() method</h3>
					<p className='text-muted-foreground'>
						This method is used to check for double spending (a transaction that has already been processed) in a list of transactions.
						First we save the initial balances of the senders.
						Then we check for double spending in the list of transactions.
					</p>
					<CodeBlock
						value={{
							language: 'typescript',
							code: step5,
							filename: 'wallet.ts'
						}}
					/>
					<h3 className='text-xl font-medium mt-4' id='transaction_type'>The Transaction type</h3>
					<p className='text-muted-foreground'>
						This is the type of the transactions that can be processed by the wallet class.
					</p>
					<CodeBlock
						value={{
							language: 'typescript',
							code: transactionType,
							filename: 'types.ts'
						}}
					/>
				</div>
				<ButtonsBox
					back="/learn/block-class"
					forward="/learn/blockchain-class"
					backText="Back to Block Class"
					forwardText="Continue to Blockchain Class"
				/>
			</div>
		</div>
	)
}

export default WalletClassPage