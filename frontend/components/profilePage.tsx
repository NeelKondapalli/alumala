
"use client"
import React from 'react';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"
  
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  
  
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

  import { CircleUserRound, Home } from "lucide-react"

  import Link from 'next/link';
  
  import { Profile } from "@/utils/utils"

interface ProfilesPageProps {
    profile: Profile;
    approval?: boolean;
}

const ProfilesPage: React.FC<ProfilesPageProps> = ({ profile, approval = false }) => {
    return (
      <>
      <div className = "flex justify-between">
          <div>
          </div>
      <NavigationMenu >
      <NavigationMenuList >
        <NavigationMenuItem >
          {approval ? (
             <Link href="/approval" legacyBehavior passHref>
             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
               <Home />
             </NavigationMenuLink>
           </Link>
          ) : (
            <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Home />
            </NavigationMenuLink>
          </Link>
          )}
      
        </NavigationMenuItem>
      </NavigationMenuList>
      </NavigationMenu>
      </div>

      <main className="flex gap-6 py-6 px-3 items-center justify-center">
          <Card className="w-[1150px] " >
              <CardHeader className="flex flex-row pb-3">
              
              <div className = "flex flex-col md:flex-row">
                  <div className = "pt-11 pl-[60px] md:pl-4 lg:pl-4 pr-3">
                    <Avatar className = "size-[300px]">
                      <AvatarImage src= {`https://tcnkepluqwnvvuwptdrk.supabase.co/storage/v1/object/public/profile_videos/${profile.id}/${profile.image}`} />
                      <AvatarFallback>  
                          <CircleUserRound className = "bg-white stroke-[1px] size-[300px]"/>
                      </AvatarFallback>

                    </Avatar>
                  </div>

                  <div className = "pl-10 flex flex-col space-y-10 text-left align-middle pt-9">
                    <CardTitle className="text-4xl">{profile.name}</CardTitle>
                    <div>
                      <CardDescription className="w-100 text-left">University</CardDescription>
                      <CardTitle className="text-2xl w-100 text-left ">{profile.university}</CardTitle>
                    </div>
                    <div>
                      <CardDescription className="w-100 text-left">Major</CardDescription>
                      <CardTitle className="text-2xl w-100 text-left ">{profile.major}</CardTitle>
                    </div>
                    <div>
                      <CardDescription className="w-100 text-left">Graduation Year</CardDescription>
                      <CardTitle className="text-2xl w-100 text-left ">{profile.graduation_year}</CardTitle>
                    </div>
                  </div>

                  
                
          
                </div>
                </CardHeader>
                <CardContent className = "space-y-8">
                  <div className="relative flex pt-10 items-center">
                    <div className="flex-grow border-t border-black"></div>
                    <span className="flex-shrink mx-4 text-black">Bio</span>
                    <div className="flex-grow border-t border-black"></div>
                  </div>

                  <div>
                    {profile.bio}
                  </div>
              

                  <div className="relative flex items-center">
                    <div className="flex-grow border-t border-black"></div>
                    <span className="flex-shrink mx-4 text-black">Video</span>
                    <div className="flex-grow border-t border-black"></div>
                  </div>


                  
                  <div>
                    { profile.video ? (
                      <video className = "w-full rounded-lg dark:border-gray-600" controls>
                        <source src= {`https://tcnkepluqwnvvuwptdrk.supabase.co/storage/v1/object/public/profile_videos/${profile.id}/${profile.video}`} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <div>No vid here</div>
                    )
                    }
            

                  </div> 
                
                  

                  <div className="relative flex items-center">
                    <div className="flex-grow border-t border-black"></div>
                    <span className="flex-shrink mx-4 text-black">Contact</span>
                    <div className="flex-grow border-t border-black"></div>
                  </div>

                  <div className = "flex justify-between">
                    <div>
                      <div className = "text-bold">
                        LinkedIn
                      </div>
                      <CardDescription>
                        <a href = {profile.linkedin_url} className = "no-underline hover:underline">{profile.linkedin_url}</a>
                      </CardDescription>
                    </div>

                    <div>
                      <div className = "text-bold">
                        Email
                      </div>
                      <CardDescription>
                        {profile.email}
                      </CardDescription>
                    </div>
                  </div>                    
              

                </CardContent>
                    


                

            </Card>
            </main>
            </>


      
    );
  };
  
  export default ProfilesPage;