import ButtonsBox from '@/components/block/buttons-box'
import CodeBlock from '@/components/block/codeblock'
import { step1, step2, step3, step4, step5 } from '@/lib/code-examples/blockchain-class'
import React from 'react'

const BlockchainClassPage = () => {
	return (
		<div className='flex flex-col gap-8 my-8'>
			<div className='flex flex-col gap-4 mt-4'>
				<h2 className='text-3xl font-bold'>The Blockchain Class</h2>
				<div className='flex flex-col gap-2'>
					<h3 className='text-xl font-medium'>The idea</h3>
					<p className='text-muted-foreground'>
						Here is the complete implementation of the Blockchain class.
						You can copy and paste the code into your <code className='bg-muted px-2 py-1 rounded-md'>main.ts</code> file.
					</p>
					<p className='text-muted-foreground'>
						We can start by creating the class and the constructor.
						Here we have the chain, the pending transactions and the wallet.
					</p>
					<p className='text-muted-foreground'>
						If the chain is empty, we create the genesis block; otherwise, we use the last block of the chain as the previous hash of the new block.
						We check if the chain is valid and if the wallet has enough balance to send the transactions.
					</p>
					<CodeBlock
						value={{
							language: 'typescript',
							code: step1,
							filename: 'main.ts'
						}}
					/>
					<h3 className='text-xl font-medium mt-4'>The latestBlock() & addBlock() methods</h3>
					<p className='text-muted-foreground'>
						The <code className='bg-muted px-2 py-1 rounded-md'>latestBlock()</code> method is used to get the latest block of the chain.
						And the <code className='bg-muted px-2 py-1 rounded-md'>addBlock()</code> method is used to add a new block to the chain.
					</p>
					<CodeBlock
						value={{
							language: 'typescript',
							code: step2,
							filename: 'main.ts'
						}}
					/>
					<h3 className='text-xl font-medium mt-4'>The addTransaction() method</h3>
					<p className='text-muted-foreground'>
						The <code className='bg-muted px-2 py-1 rounded-md'>addTransaction()</code> method is used to add a new transaction to the pending transactions.
						First we check if the sender has enough balance to send the transaction.
						Then we check if the transaction is valid and if it is not a double spending.
						Finally, we process the transaction and add it to the pending transactions.
						If the pending transactions are 10, we create a new block and add it to the chain.
					</p>
					<CodeBlock
						value={{
							language: 'typescript',
							code: step3,
							filename: 'main.ts'
						}}
					/>
					<h3 className='text-xl font-medium mt-4'>The minePendingTransactions() & getPendingTransactions() methods</h3>
					<p className='text-muted-foreground'>
						The <code className='bg-muted px-2 py-1 rounded-md'>minePendingTransactions()</code> method is used to mine the pending transactions.
						If there are pending transactions, we create a new block and add it to the chain.
						And the <code className='bg-muted px-2 py-1 rounded-md'>getPendingTransactions()</code> method is used to get the pending transactions.
					</p>
					<CodeBlock
						value={{
							language: 'typescript',
							code: step4,
							filename: 'main.ts'
						}}
					/>
					<h3 className='text-xl font-medium mt-4'>The checkValid() method</h3>
					<p className='text-muted-foreground'>
						And the <code className='bg-muted px-2 py-1 rounded-md'>checkValid()</code> method is used to check if the chain is valid.
						We check if the hash is valid, if the previous hash is valid, if the number of transactions is valid, if the block has no transactions and if the addresses are valid.
						Finally, we return true if the chain is valid.
					</p>
					<CodeBlock
						value={{
							language: 'typescript',
							code: step5,
							filename: 'main.ts'
						}}
					/>
				</div>
				<ButtonsBox
					back="/learn/wallet-class"
					forward="/learn/general-logic"
					backText="Back to Wallet Class"
					forwardText="Continue to General Logic"
				/>
			</div>
		</div>
	)
}

export default BlockchainClassPage