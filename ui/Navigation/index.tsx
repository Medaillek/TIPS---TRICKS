import React from 'react'

import NavigationHolder from './NavigationHolder'
import NavigationItemsMapper from './NavigationItemsMapper'

const Navigation: React.FC<{}> = () => {
	return (
		<NavigationHolder>
			<NavigationItemsMapper />
		</NavigationHolder>
	)
}

export default Navigation
