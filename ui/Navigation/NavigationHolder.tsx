import React from 'react'
import styles from './styles.module.css'
import LogoutButton from './LogoutButton'

interface NavigationHolderProps {
	children?: React.ReactNode
	logo?: React.ReactNode
}

const NavigationHolder = ({ children, logo }: NavigationHolderProps) => {
	return (
		<>
			<input
				type="checkbox"
				name="peer"
				id="menu-toggle"
				className="peer absolute top-0 left-0 opacity-0"
			/>
			<label
				htmlFor="menu-toggle"
				className="fixed bg-gray-300 w-8 h-12 peer-checked:translate-x-20 flex rounded-r-md  items-center justify-center cursor-pointer z-50 top-1 left-0 lg:hidden transition-all after:content-['>'] peer-checked:after:rotate-180"
			></label>

			<nav
				className={`hidden fixed lg:sticky top-0 w-0 max-h-dvh peer-checked:flex lg:flex h-dvh flex-col justify-between border-x bg-white z-50 ${styles.navbar}`}
				id="navbar"
			>
				<div className="h-full flex flex-col">
					<div
						className="inline-flex h-20 w-20 items-center justify-center animate-fade-in"
						style={{ '--animation-duration': '200ms' } as React.CSSProperties}
					>
						<div className="w-16">{logo}</div>
					</div>

					<div className="border-t border-gray-100 h-full">
						<div className="px-2 flex flex-col h-full">{children}</div>
					</div>
				</div>
				<div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
					<LogoutButton />
				</div>
			</nav>
		</>
	)
}

export default NavigationHolder
