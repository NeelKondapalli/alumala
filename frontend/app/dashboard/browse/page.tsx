"use client"
import Image from "next/image"
import Link from "next/link"

import { Profile } from "@/utils/utils"
import { createClient } from '@/utils/supabase/client'
import { useCallback, useEffect, useState } from 'react'

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"

import DashboardNav from "@/components/dashboardNav"

import DashboardSheet from "@/components/dashboardSheet"

import ProfilesGallery from '@/components/profileGallery';

import ProfileTable from "@/components/profileTable"

export default function Browse() {
  const supabase = createClient()

  const [loading, setLoading ] = useState(true)
  const [profiles, setProfiles ] = useState<Profile[]>([]);
  const [filter, setFilter ] = useState(null)
  const [ query, setQuery ] = useState(null)
  const [ options, setOptions ] = useState<{value: string, label: string}[]>([])
  const [ data, setData ] = useState()

  console.log("Fetching Profiles")

  const getProfileAll = useCallback(async() => {
      try {
          setLoading(true)

          const { data, error, status } = await supabase
              .from('app_profile')
              .select()
              .eq("approved", true)
          
              if ( error && status != 406 ) {
                  console.log(error)
                  throw error
              }

              if (data) {
                  const profiles: Profile[] = data.map((item) => ({
                    id: item.id,
                    name: item.name,
                    email: item.email,
                    graduation_year: item.graduation_year,
                    university: item.university,
                    major: item.major,
                    linkedin_url: item.linkedin_url,
                    video: item.video,
                    image: item.image,
                    bio: item.bio,
                    approved: item.approved
                  }));

          
                  setProfiles(profiles)
              }
              
      } catch (error) {
          alert("Error loading data!")
      } finally {
          setLoading(false)
      }

      }, [supabase])

      useEffect(() => {
        getProfileAll()
    }, [ getProfileAll ])

  if (profiles)
    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <DashboardNav/>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <DashboardSheet />
            
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Browse Profiles</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="relative ml-auto flex-1 md:grow-0">


            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <Image
                    src="/medias/default.jpeg"
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px- sm:py-0 md:gap-8 ">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <Card
                  className="sm:col-span-2 " x-chunk="dashboard-05-chunk-3"
                >
                  <CardHeader className="pb-3">
                    <CardTitle>Profiles</CardTitle>
                  </CardHeader>
                  <CardFooter>
                    <Button>Create New Profile</Button>
                  </CardFooter>
                </Card>
              
                
              </div>
              <ProfileTable profiles = { profiles }/>
              
            </div>

            {/* <ProfilesGallery profiles = { profiles }/> */}
            
            
          
          </main>
        </div>
      </div>
    )
}
