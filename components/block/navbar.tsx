'use client'

import Image from "next/image"
import logo from "@/public/logo.png"
import Link from "next/link"
import { Squeeze as Hamburger } from 'hamburger-react'
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<nav className="flex items-center max-w-4xl w-full mx-auto justify-between bg-gray-50 border-2 border-gray-200 px-3 py-2 m-4 rounded-full">
			<div className="flex items-center gap-2">
				<Image src={logo} alt="logo" width={35} height={35} />
				<h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-red-600 to-purple-600 text-transparent bg-clip-text">ts.chain</h1>
			</div>
			
			{/* Desktop Navigation */}
			<div className="hidden md:flex items-center gap-1">
				<Link className="hover:bg-gray-100/70 px-4 py-2 rounded-full" href="/">Home</Link>
				<Link className="hover:bg-gray-100/70 px-4 py-2 rounded-full" href="/learn/introduction">Learn</Link>	
			</div>
			
			{/* Mobile Navigation */}
			<div className="md:hidden">
				<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
					<DropdownMenuTrigger asChild>
						<div>
							<Hamburger toggled={isOpen} toggle={setIsOpen} size={20} />
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-48 mt-2">
						<DropdownMenuItem asChild>
							<Link href="/" className="w-full cursor-pointer">Home</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/learn/introduction" className="w-full cursor-pointer">Learn</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</nav>
	)
}

export default Navbar