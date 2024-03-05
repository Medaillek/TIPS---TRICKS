import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

export interface NavigationLinkProps {
	href: string
	icon: React.ReactNode
	tooltip: string
	isCurrentPage: boolean
	handleClick?: () => void
}

const NavigationLink = ({
	href,
	icon,
	tooltip,
	isCurrentPage,
	handleClick,
}: NavigationLinkProps) => {
	return (
		<Link
			href={href}
			onClick={handleClick}
			className={cn(
				`group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 group ${
					isCurrentPage ? 'text-blue-600 hover:text-blue-600' : ''
				}`
			)}
		>
			<>{icon}</>
			<span
				className={
					'w-max absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100 hidden group-hover:inline-block'
				}
			>
				{tooltip}
			</span>
		</Link>
	)
}

export default NavigationLink
