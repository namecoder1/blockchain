const IntroductionPage = () => {
	return (
		<div className='flex flex-col gap-8 my-8'>
			<div className='flex flex-col gap-4'>
				<h1 className='text-3xl font-bold'>Learn Blockchain</h1>
				<p className='text-lg text-muted-foreground'>
					Blockchain is a decentralized, distributed digital ledger that records transactions across a network of computers. Each block contains transaction data and is linked to previous blocks, forming an immutable chain. This technology enables secure, transparent, and tamper-resistant record-keeping without the need for a central authority.
				</p>

				<div className='flex flex-col gap-4 mt-4'>
					<h2 className='text-2xl font-semibold'>Technical Implementation</h2>
					
					<div className='flex flex-col gap-2'>
						<h3 className='text-xl font-medium'>Block Structure</h3>
						<p className='text-muted-foreground'>
							Each block in our implementation contains:
						</p>
						<ul className='list-disc list-inside text-muted-foreground ml-4'>
							<li>Index - Position in the chain</li>
							<li>Timestamp - When the block was created</li>
							<li>Transactions - Array of transaction data (max 10 per block)</li>
							<li>Previous Hash - Hash of the previous block</li>
							<li>Hash - Current block's hash using SHA256</li>
							<li>Nonce - Used for mining</li>
							<li>Fee - Transaction fee for the block</li>
						</ul>
					</div>

					<div className='flex flex-col gap-2'>
						<h3 className='text-xl font-medium'>Mining Process</h3>
						<p className='text-muted-foreground'>
							Our blockchain uses a proof-of-work consensus mechanism with a difficulty-based mining system. Blocks are mined when:
						</p>
						<ul className='list-disc list-inside text-muted-foreground ml-4'>
							<li>10 transactions are pending</li>
							<li>Manual mining is triggered</li>
							<li>The target hash must start with a specific number of zeros based on difficulty</li>
						</ul>
					</div>

					<div className='flex flex-col gap-2'>
						<h3 className='text-xl font-medium'>Transaction System</h3>
						<p className='text-muted-foreground'>
							The transaction system includes:
						</p>
						<ul className='list-disc list-inside text-muted-foreground ml-4'>
							<li>Dynamic fee calculation based on network load</li>
							<li>Double-spending prevention</li>
							<li>Balance validation before transaction execution</li>
							<li>Automatic block creation when transaction limit is reached</li>
						</ul>
					</div>

					<div className='flex flex-col gap-2'>
						<h3 className='text-xl font-medium'>Security Features</h3>
						<p className='text-muted-foreground'>
							Security is ensured through:
						</p>
						<ul className='list-disc list-inside text-muted-foreground ml-4'>
							<li>SHA256 hashing for block integrity</li>
							<li>Chain validation checking previous hashes</li>
							<li>Transaction verification system</li>
							<li>Immutable block structure</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default IntroductionPage