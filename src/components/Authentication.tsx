import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

import { Button, buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/Icons'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/use-toast'

export const Authentication = () => {
	const { data: session, status } = useSession()
	const { toast } = useToast()

	const handleLogout = async () => {
		try {
			await signOut({ callbackUrl: '/' })
		} catch (error) {
			toast({
				title: 'Something went wrong.',
				description: 'Please try again later.'
			})
		}
	}

	if (status === 'loading') {
		return (
			<Button disabled variant='ghost'>
				<Icons.loader className='mr-2 h-4 w-4 animate-spin' />
				Loading...
			</Button>
		)
	}

	if (status === 'unauthenticated') {
		return (
			<Link href='/auth' className={buttonVariants({ variant: 'ghost' })}>
				Login
			</Link>
		)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost'>{session?.user.name}</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='center' className='dark:bg-[#121212]'>
				<DropdownMenuItem>
					<Link
						href='/dashboard/new'
						className={buttonVariants({
							variant: 'ghost',
							className: 'text-base'
						})}
					>
						<Icons.plus className=' mr-2 h-4 w-4' /> Create new link
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link
						href='/dashboard'
						className={buttonVariants({
							variant: 'ghost',
							className: 'text-base'
						})}
					>
						<Icons.layout className=' mr-2 h-4 w-4' /> Dashboard
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Button variant='ghost' onClick={handleLogout}>
						<Icons.logout className=' mr-2 h-4 w-4' /> Sign out
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}