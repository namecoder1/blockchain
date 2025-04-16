import ButtonsBox from '@/components/block/buttons-box'
import React from 'react'

const GeneralLogicPage = () => {
	return (
		<div className='flex flex-col gap-8 my-8'>
			<div className='flex flex-col gap-4 mt-4'>
				<h2 className='text-3xl font-bold'>General Logic</h2>
				<div className='flex flex-col gap-6'>
					<h3 className='text-xl font-medium'>The idea</h3>
					<p className='text-muted-foreground'>
						Here is the complete implementation of the General Logic.
						You can copy and paste the code into your <code className='bg-muted px-2 py-1 rounded-md'>main.ts</code> file.
					</p>

					<section className='space-y-4'>
						<h3 className='text-xl font-medium'>Blockchain Architecture</h3>
						<p className='text-muted-foreground'>
							Our blockchain implementation consists of three main components that work together:
						</p>
						<ol className='list-decimal pl-6 space-y-2 text-muted-foreground'>
							<li><strong>Block Class</strong> - Represents individual blocks in the chain</li>
							<li><strong>Wallet Class</strong> - Handles user accounts and transactions</li>
							<li><strong>Blockchain Class</strong> - Manages the entire blockchain network</li>
						</ol>
					</section>

					<section className='space-y-4'>
						<h3 className='text-xl font-medium'>Block Class Logic</h3>
						<p className='text-muted-foreground'>
							The Block class is the fundamental building block of our blockchain:
						</p>
						<ul className='list-disc pl-6 space-y-2 text-muted-foreground'>
							<li><strong>Properties:</strong> Each block contains an index, timestamp, transactions array, previous hash, its own hash, and a nonce value</li>
							<li><strong>Hash Calculation:</strong> The block&apos;s hash is calculated using all its properties, creating a unique fingerprint</li>
							<li><strong>Mining:</strong> The mineBlock method finds a hash that starts with a specific number of zeros (difficulty), requiring computational work</li>
							<li><strong>Transaction Limit:</strong> Each block can hold a maximum of 10 transactions to maintain efficiency</li>
						</ul>
					</section>

					<section className='space-y-4'>
						<h3 className='text-xl font-medium'>Wallet Class Logic</h3>
						<p className='text-muted-foreground'>
							The Wallet class manages user accounts and transactions:
						</p>
						<ul className='list-disc pl-6 space-y-2 text-muted-foreground'>
							<li><strong>Transaction Creation:</strong> Allows users to send coins to other addresses</li>
							<li><strong>Balance Calculation:</strong> Tracks the user&apos;s balance by analyzing the blockchain</li>
							<li><strong>Transaction Verification:</strong> Validates transactions to prevent double-spending</li>
						</ul>
					</section>

					<section className='space-y-4'>
						<h3 className='text-xl font-medium'>Blockchain Class Logic</h3>
						<p className='text-muted-foreground'>
							The Blockchain class orchestrates the entire network:
						</p>
						<ul className='list-disc pl-6 space-y-2 text-muted-foreground'>
							<li><strong>Chain Management:</strong> Maintains the array of blocks that form the blockchain</li>
							<li><strong>Genesis Block:</strong> Creates the first block with special properties</li>
							<li><strong>Block Addition:</strong> Adds new blocks to the chain, linking them with previous hashes</li>
							<li><strong>Transaction Pool:</strong> Manages pending transactions before they&apos;re added to blocks</li>
							<li><strong>Validation:</strong> Verifies the integrity of the entire blockchain</li>
						</ul>
					</section>

					<section className='space-y-4'>
						<h3 className='text-xl font-medium'>Transaction Flow</h3>
						<p className='text-muted-foreground'>
							The complete flow of a transaction in our blockchain:
						</p>
						<ol className='list-decimal pl-6 space-y-2 text-muted-foreground'>
							<li>User creates a transaction using their wallet</li>
							<li>Transaction is added to the pending transactions pool</li>
							<li>Miners collect transactions from the pool (up to 10 per block)</li>
							<li>Miners perform proof-of-work to find a valid hash</li>
							<li>New block is added to the blockchain</li>
							<li>Transaction is now confirmed and permanent</li>
							<li>Recipient&apos;s wallet balance is updated</li>
						</ol>
					</section>

					<section className='space-y-4'>
						<h3 className='text-xl font-medium'>Security Mechanisms</h3>
						<p className='text-muted-foreground'>
							The blockchain implements several security features:
						</p>
						<ul className='list-disc pl-6 space-y-2 text-muted-foreground'>
							<li><strong>Cryptographic Hashing:</strong> Ensures data integrity and immutability</li>
							<li><strong>Proof-of-Work:</strong> Makes it computationally expensive to alter the blockchain</li>
							<li><strong>Chain Validation:</strong> Detects any tampering with the blockchain</li>
							<li><strong>Transaction Verification:</strong> Prevents double-spending and invalid transactions</li>
						</ul>
					</section>

					<section className='space-y-4'>
						<h3 className='text-xl font-medium'>Implementation Details</h3>
						<p className='text-muted-foreground'>
							Key technical details of our implementation:
						</p>
						<ul className='list-disc pl-6 space-y-2 text-muted-foreground'>
							<li><strong>Hash Algorithm:</strong> SHA-256 for cryptographic hashing</li>
							<li><strong>Mining Difficulty:</strong> Configurable number of leading zeros in block hashes</li>
							<li><strong>Transaction Structure:</strong> Includes sender, recipient, amount, and signature</li>
							<li><strong>Block Structure:</strong> Contains metadata and transaction data</li>
						</ul>
					</section>
				</div>
				<ButtonsBox 
					back="/learn/blockchain-class"
					forward="/learn/introduction"
					backText="Back to Blockchain Class"
					forwardText="Return to Introduction"
				/>
			</div>
		</div>
	)
}

export default GeneralLogicPage