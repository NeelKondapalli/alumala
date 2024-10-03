"use client"
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client'
import { useCallback, useEffect, useState } from 'react'
import { Check, ChevronsUpDown, IterationCwIcon, Home, X, Eye } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { ScrollArea } from "@/components/ui/scroll-area"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
  
import { Profile } from "@/utils/utils"

interface ProfilesPageProps {
    profiles: Profile[];
    approval?: boolean;
    //email: string;
    //bio: string;
}



const ProfilesGallery: React.FC<ProfilesPageProps> = ({ profiles, approval = false}) => {
  const supabase = createClient()
  const approveProfile = async ( profileid: Profile['id'] ) => {
    try {
      const { data, error, status } = await supabase
      .from('app_profile')
      .update({"approved": true})
      .eq('id', profileid)


      if ( error && status != 406 ) {
          console.log(error)
          throw error
      } else {
        window.location.reload()
      }

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

    return (
        <>
       <div className='grid sm:grid cols-1 md:grid-cols-2 lg:grid-cols-4 px-5'>

            
  
              {profiles.map((profile: Profile) => (
                <div key = {profile.id} className = "px-1.5 py-1.5">
                  <Card className='w-full h-auto min-h-[225px]'> {/* Adjusted height to ensure all cards are of equal height */}
                    <ScrollArea className='w-full h-auto min-h-[225px]'>
                      <CardHeader className ="text-center">
                        <CardTitle>{profile.name}</CardTitle>
                        <CardDescription>
                          <div className = "h-5 overflow-hidden text-overflow-ellipsis">
                            <strong className = "mr-2">{profile.university}</strong>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className = "space-y-3">
                        <div className="h-7 overflow-hidden text-overflow-ellipsis ">
                          <strong className="mr-2">Major:</strong>
                          <span>{profile.major}</span>
                        </div>
                 
                          <div>
                            <span>DVHS Class of &#39;{profile.graduation_year}</span>
                          </div>
                        
                        
                      </CardContent>
                      <CardFooter className="items-center space-y-5 flex-col ">

                        <Button className="w-full" asChild>
                          <Link href={`/${profile.id}`} key={profile.id}> <Eye className="mr-2 h-4 w-4" /> View Profile</Link>
                        </Button>

                        {/* {approval && (
                          <div className = "flex w-full space-x-2">
                            <Button variant = "outline" className="w-full" asChild onClick={ () => approveProfile(profile.id)}>
                              <Link href={`/approval/`} key={profile.id}> <Check className="mr-2 h-4 w-4 " color = "#00e025" /> Approve</Link>
                            </Button>

                            <Button variant = "outline" className="w-full" asChild>
                              <Link href={`/approval/${profile.id}`} key={profile.id}> <X className="mr-2 h-4 w-4" color = "red" /> Deny</Link>
                            </Button>
                          </div>

                        )} */}

                        {approval && (
                          <div className = "flex w-full space-x-2">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant = "outline" className="w-full"> <Check className="mr-2 h-4 w-4 " color = "#00e025" /> Approve</Button>
                              </PopoverTrigger>
                              <PopoverContent className = "w-25">
                                <div className = "space-y-2">
                                  {/* <p className="text-sm text-muted-foreground">Confirm Approval</p> */}
                                  <div className = "flex justify-center">
                                    <Button variant = "outline" className="w-[150px]" asChild onClick={ () => approveProfile(profile.id)}>
                                      <Link href={`/approval/`} key={profile.id}> Confirm Approval </Link>
                                    </Button>
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>

                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant = "outline" className="w-full"> <X className="mr-2 h-4 w-4" color = "red" /> Deny</Button>
                              </PopoverTrigger>
                              <PopoverContent className = "w-50">
                                <div className = "space-y-2">
                                  {/* <p className="text-sm text-muted-foreground">Confirm Denial</p> */}
                                  <div className = "flex justify-center">
                                    <Button variant = "outline" className="w-[150px]" asChild >
                                      <Link href={`/approval/`} key={profile.id}> Confirm Denial </Link>
                                    </Button>
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                            {/* <Button variant = "outline" className="w-full" asChild onClick={ () => approveProfile(profile.id)}>
                              <Link href={`/approval/`} key={profile.id}> <Check className="mr-2 h-4 w-4 " color = "#00e025" /> Approve</Link>
                            </Button>

                            <Button variant = "outline" className="w-full" asChild>
                              <Link href={`/approval/${profile.id}`} key={profile.id}> <X className="mr-2 h-4 w-4" color = "red" /> Deny</Link>
                            </Button> */}
                          </div>

                        )}

                       


                        
                      </CardFooter>
                      

                    </ScrollArea>
              
                  </Card>
                  </div>
              ))}
            </div>
       
        
        </>


      
    );
  };
  
  export default ProfilesGallery;