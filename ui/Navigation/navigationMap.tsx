import { LayoutDashboard, ListTodo, Search, Users2 } from 'lucide-react'
import { NavigationLinkProps } from './NavigationLink'

// This is a map of the navigation links to be displayed in the navigation bar.
// The key is a group name, and the value is an array of NavigationLinkProps. The key is only here to say it's a group.

export const navigationLinks: Record<
	string,
	Omit<NavigationLinkProps, 'isCurrentPage'>[]
> = {
	'group-0': [
		{
			href: '',
			icon: <LayoutDashboard />,
			tooltip: 'Dashboard',
		},
	],
	'group-1': [
		{
			href: 'demandes',
			icon: <ListTodo />,
			tooltip: 'Demandes du formulaire',
		},
		{
			href: 'utilisateurs',
			icon: <Users2 />,
			tooltip: 'Utilisateurs',
		},
	],
	'group-2': [
		{
			href: 'search',
			icon: <Search />,
			tooltip: 'Rechercher un matériel',
		},
	],
}
