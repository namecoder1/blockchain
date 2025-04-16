import ButtonsBox from '@/components/block/buttons-box'
import CodeBlock from '@/components/block/codeblock'
import { step1, step2, step3 } from '@/lib/code-examples/block-class'
import Link from 'next/link'
import React from 'react'

const BlockClassPage = () => {
	return (
		<div className='flex flex-col gap-8 my-8'>
			<div className='flex flex-col gap-4 mt-4'>
				<h2 className='text-3xl font-bold'>The Block Class</h2>
				<div className='flex flex-col gap-2'>
					<h3 className='text-xl font-medium'>The idea</h3>
					<p className='text-muted-foreground'>
						Our block class is designed to be a simple and easy to understand class that can be used to create and manage blocks in our blockchain.
					</p>
					<p className='text-muted-foreground'>
						To start we need to import the <code className='bg-muted px-2 py-1 rounded-md'>crypto-js</code> library and the <code className='bg-muted px-2 py-1 rounded-md'>Transaction</code> class (don&apos;t worry about it for now, we&apos;ll cover it later in the <Link href="/learn/wallet-class#transaction_type" className='text-primary hover:underline underline-offset-2'>Wallet Class</Link> page).
					</p>
					<h3 className='text-xl font-medium mt-4'>The constructor</h3>
					<p className='text-muted-foreground'>
						Now we can start coding the class, first we define the properties of the class for type safety.
						Then, inside the constructor we check if the number of transactions is valid (we can&apos;t have more than 10 transactions per block).
						After that, we initialize the properties of the class.
					</p>
					<BlockProperties />
					<CodeBlock
						value={{
							language: "typescript",
							code: step1,
							filename: "main.ts"
						}}
					/>
					<h3 className='text-xl font-medium mt-4'>The calculateHash() method</h3>
					<p className='text-muted-foreground'>
						This method is used to calculate the hash of the block.
						Using the <code className='bg-muted px-2 py-1 rounded-md'>crypto-js</code> library we can create a joined string of all the properties of the block.
						Finally we need to return the hash of the string.
					</p>
					<CodeBlock
						value={{
							language: "typescript",
							code: step2,
							filename: "main.ts"
						}}
					/>
					<h3 className='text-xl font-medium mt-4'>The mineBlock() method</h3>
					<p className='text-muted-foreground'>
						This method is used to mine the block.
						First we need to create a loop that will try to find a hash that starts with the correct number of zeros.
						Once we find the correct hash, we can return the block.
					</p>
					<CodeBlock
						value={{
							language: "typescript",
							code: step3,
							filename: "main.ts"
						}}
					/>
				</div>
				<ButtonsBox 
					back="/learn/introduction"
					forward="/learn/wallet-class"
					backText="Back to Introduction"
					forwardText="Continue to Wallet Class"
				/>
			</div>
		</div>
	)
}

const BlockProperties = () => (
	<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6'>
		<BlockProperty name='index' description='to calculate positon in the chain' />
		<BlockProperty name='timestamp' description='inserted when transaction is done' />
		<BlockProperty name='transactions' description='data of the Block' />
		<BlockProperty name='previousHash' description='hash value of the prev. Block' />
		<BlockProperty name='hash' description='hash value of the block' />
		<BlockProperty name='nonce' description='used by the mineBlock() to find the correct hash to mine the block (and so to confirm it)' />
	</div>
)

const BlockProperty = ({ name, description }: { name: string, description: string }) => (
	<div className='bg-gradient-to-br from-card to-card/80 rounded-xl p-4 border border-border/50 backdrop-blur-sm'>
		<div className='bg-primary/10 p-2 rounded-lg mb-2 inline-block'>
			<span className='text-primary font-medium text-sm'>{name}</span>
		</div>
		<p className='text-muted-foreground/80 text-xs leading-relaxed'>{description}</p>
	</div>
)

export default BlockClassPage