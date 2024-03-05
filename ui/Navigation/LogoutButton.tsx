'use client'

import { createClient } from '@/lib/supabase/client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { LogOutIcon } from 'lucide-react'
import NavigationLink from './NavigationLink'

const LogoutButton = () => {
	const supabase = createClient()
	const router = useRouter()

	return (
		<NavigationLink
			href="#"
			icon={<LogOutIcon />}
			isCurrentPage={false}
			handleClick={async () => {
				supabase.auth.signOut().then((res) => {
					if (res.error) {
						console.error(res.error)
						throw new Error('Erreur lors de la déconnexion')
					}
					router.replace('/login')
				})
			}}
			tooltip="Se déconnecter"
		/>
	)
}

export default LogoutButton
