import ButtonsBox from "@/components/block/buttons-box";
import CodeBlock from "@/components/block/codeblock";
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "ts.chain - Learn Blockchain",
	description: "Learn about blockchain technology",
}

const IntroductionPage = () => {
	return (
		<div className='flex flex-col gap-8 my-8'>
			<div className='flex flex-col gap-4 mt-4'>
				<h2 className='text-3xl font-bold'>Technical Implementation</h2>
				
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
						<li>Hash - Current block&apos;s hash using SHA256</li>
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
			<div className="flex flex-col gap-4 mt-4">
				<h3 className='text-2xl font-bold'>Getting Started</h3>
				<div className="flex flex-col gap-2">
					<h3 className='text-xl font-medium'>Installation</h3>
					<p>Download the repository from <a href="https://github.com/namecoder1/blockchain" target="_blank" className="text-blue-500">GitHub</a></p>
					<p className='text-muted-foreground'>
						Install the blockchain implementation using npm:
					</p>
					<CodeBlock
						value={{
							language: 'bash',
							code: 'npm install\nnpm run dev',
							filename: 'Shell'
						}}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<h3 className='text-xl font-medium'>Dependencies</h3>
					<ul className='list-disc list-inside text-muted-foreground ml-4'>
						<li>Next.js 14</li>
						<li>shadcn/ui</li>
						<li>Typescript</li>
						<li>crypto-js</li>
						<li>react-copy-to-clipboard</li>
						<li>hamburger-react</li>
					</ul>
				</div>
				<div className="flex flex-col gap-2">
					<h3 className='text-xl font-medium'>Start coding!</h3>
					<p className='text-muted-foreground'>
						Create the first file, <code className="bg-muted px-2 py-1 rounded-md">main.ts</code>.
					</p>
				</div>
				<ButtonsBox
					back="/learn"
					forward="/learn/block-class"
					backText="Back to Introduction"
					forwardText="Continue to Block Class"
				/>
			</div>
		</div>
	)
}

export default IntroductionPage