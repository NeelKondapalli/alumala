
import Link from 'next/link';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <>
        {/* <div className = "flex justify-between px-3">
           <Link href="/profiles" legacyBehavior passHref>See Profiles </Link>
           <div className = "justify-right space-x-2.5">
              <Link href="/login" legacyBehavior passHref> Login/Logout </Link>
              <Link href="/profileView" legacyBehavior passHref> View Profile </Link>
            </div>
           </div> */}
        {children}
    </>
  )
}
