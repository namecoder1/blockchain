import { ArrowLeftIcon } from 'lucide-react'
import { ArrowRightIcon } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const ButtonsBox = ({ back, forward, backText, forwardText }: { back: string, forward: string, backText: string, forwardText: string }) => {
	return (
		<div className='flex flex-col md:flex-row items-center justify-center gap-3 my-4'>
			<Button asChild className="w-fit group">
				<Link href={back}>
					<ArrowLeftIcon className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
					{backText}
				</Link>
			</Button>
			<Button asChild className="w-fit group">
				<Link href={forward}>
					{forwardText}
					<ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
				</Link>
			</Button>
		</div>
	)
}

export default ButtonsBox