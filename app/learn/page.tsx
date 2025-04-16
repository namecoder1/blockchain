import Link from 'next/link'
import React from 'react'
import { ArrowRight, GraduationCap } from 'lucide-react'

const LearnPage = () => {
	return (
		<div className='container mx-auto py-12 px-4'>
			<div className='max-w-5xl mx-auto'>
				<div className='mb-16 text-center'>
					<h1 className='text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent flex items-center justify-center gap-2.5'><GraduationCap className='inline-block text-black' size={32} />Learn Blockchain</h1>
					<p className='text-lg text-muted-foreground max-w-3xl mx-auto'>
						Blockchain is a decentralized, distributed digital ledger that records transactions across a network of computers. Each block contains transaction data and is linked to previous blocks, forming an immutable chain. This technology enables secure, transparent, and tamper-resistant record-keeping without the need for a central authority.
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					<LearnBlock 
						title='Introduction' 
						description='Learn the fundamentals of blockchain technology and its core concepts.' 
						href='/learn/introduction' 
					/>

					<LearnBlock 
						title='Block Class' 
						description='Understand how blocks are structured and how they form the blockchain.' 
						href='/learn/block-class' 
					/>

					<LearnBlock 
						title='Wallet Class' 
						description='Understand how wallets are works in the blockchain context.' 
						href='/learn/wallet-class' 
					/>

					<LearnBlock 
						title='Blockchain Class' 
						description='Understand how the blockchain class is structured and how it forms the blockchain.' 
						href='/learn/blockchain-class' 
					/>

					<LearnBlock 
						title='General Logic' 
						description='Understand the general logic of the blockchain.' 
						href='/learn/general-logic' 
					/>
				</div>

			</div>
			<p className='text-muted-foreground text-center mt-12 text-sm'>If interested, here you can find a full guide in italian: <Link href='https://www.tob.codes/blog/typescript/la-tua-prima-blockchain-in-typescript' target='_blank' className='text-primary hover:underline underline-offset-2'>Blockchain Guide in 🇮🇹</Link></p>
		</div>
	)
}


const LearnBlock = ({ title, description, href }: { 
	title: string, 
	description: string, 
	href: string 
}) => {
	return (
		<Link href={href} className='group block h-full'>
			<div className='bg-card rounded-3xl p-6 border border-border hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md h-full flex flex-col'>
				<div className='flex-grow'>
					<h2 className='text-xl font-semibold mb-3 group-hover:text-primary transition-colors'>{title}</h2>
					<p className='text-muted-foreground mb-4 leading-relaxed'>{description}</p>
				</div>
				<div className='flex items-center text-primary mt-auto pt-2'>
					<span className='text-sm font-medium'>Start learning</span>
					<ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
				</div>
			</div>
		</Link>
	)
}

export default LearnPage