'use client'

import { usePathname } from 'next/navigation'
import React, { useMemo } from 'react'
import { navigationLinks } from './navigationMap'
import NavigationList from './NavigationList'
import NavigationLink from './NavigationLink'

const baseName = /\/dashboard\/?/

const NavigationItemsMapper = () => {
	const pathName = usePathname()

	const groups = Object.entries(navigationLinks)

	const currentHref = useMemo(() => {
		return pathName.replace(baseName, '').split('/')[0]
	}, [pathName])

	return (
		<>
			{groups.map(([group, links]) => (
				<NavigationList key={group}>
					{links.map((link, index) => {
						return (
							<li key={link.tooltip}>
								<NavigationLink
									{...link}
									href={`/dashboard/${link.href}`.replace('//', '/')}
									isCurrentPage={currentHref === link.href}
								/>
							</li>
						)
					})}
				</NavigationList>
			))}
		</>
	)
}

export default NavigationItemsMapper
