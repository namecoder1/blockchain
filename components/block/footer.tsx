import React from 'react'
import { Github, Heart } from 'lucide-react'
import Image from 'next/image'
import logo from '@/public/logo.png'

const Footer = () => {
	return (
		<footer className="py-4 border-t border-gray-200">
			<div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
				<div className="flex items-center">
					<div className="flex items-center gap-1">
						<Image src={logo} alt="logo" width={25} height={25} />
						<span className="font-bold text-xl bg-gradient-to-r from-orange-400 via-red-600 to-purple-600 bg-clip-text text-transparent">ts.chain</span>
					</div>
				</div>
				
				<div className="flex items-center gap-6">
					<a href="https://github.com/namecoder1/blockchain" className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors">
						<Github className="h-4 w-4" />
						<span className="text-sm">GitHub</span>
					</a>
					<div className="flex items-center gap-2 text-gray-400">
						<span className="text-sm">Built with</span>
						<Heart className="h-4 w-4 fill-red-500 text-red-500" />
						<span className="text-sm">by <a href="https://github.com/namecoder1" className="text-blue-400 hover:text-blue-600 transition-colors">namecoder1</a></span>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer