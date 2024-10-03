"use client"
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client'
import { useCallback, useEffect, useState } from 'react'
import { Check, ChevronsUpDown, IterationCwIcon, Home } from "lucide-react"

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

import ProfilesGallery from '@/components/profileGallery';

import FilterCombobox from "@/components/filterCombobox"
import { StringMappingType } from 'typescript';

import { Profile } from "@/utils/utils"


const columns = [
  {
    value: "name",
    label: "Name",
  },
  {
    value: "graduation_year",
    label: "Graduation Year",
  },
  {
    value: "university",
    label: "University",
  },
  {
    value: "major",
    label: "Major",
  },
]

export default function GalleryPage() {
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


  const getColumnData = useCallback(async(filter: string) => {
    //alert("Loading labels")
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
              //Return ALL values
              // const options: { label: string; value: string }[] = data.map((item) => ({
              //   label: item[filter],
              //   value: item[filter],
                
              // }));
            
              // console.log(options)

              //Only return the UNIQUE values
              const options: { label: string; value: string }[] = [];
              const uniqueValues = new Set();

              data.forEach((item) => {
                const value = item[filter];
                if (!uniqueValues.has(value)) {
                  uniqueValues.add(value);
                  options.push({
                    label: value,
                    value: value,
                  });
                }
              });
              console.log(options);
              
              setOptions(options)
            }
            
    } catch (error) {
        alert("Error loading data!")
    } finally {
        setLoading(false)
    }

    }, [supabase])


    const getQueryData = useCallback(async(query: string | number, filter: string) => {
      //alert("Loading labels")
      try {
          setLoading(true)
        
          const { data, error, status } = await supabase
              .from('app_profile')
              .select()
              .eq(filter, query)
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

    useEffect(() => {
      if (filter)
        getColumnData(filter)
  }, [ filter ])

  useEffect(() => {
    if (query && filter)
      getQueryData(query, filter)
}, [ query ])

    


      if (profiles) {
          return (
            <>
    

            <div className = "flex justify-center">
            <NavigationMenu>
              <NavigationMenuList>
        
                <NavigationMenuItem>

                <div className="pt-3 pb-[30px] w-full">
                  {/* <Input className="rounded-lg" placeholder="Search..." type="search" />
                  <Button className="rounded-lg px-2.5 " type="submit">
                    <Search size={20}/>
                  </Button> */}
                  <h2 className="text-center scroll-m-20 border-b pb-2 text-6xl font-semibold tracking-tight first:mt-0">Alumala</h2>
                </div>
         
                <div className="w-full max-w-sm items-center space-x-2 pt-3 pb-[40px] space-x-3">
                  {/* <Input className="rounded-lg" placeholder="Search..." type="search" />
                  <Button className="rounded-lg px-2.5 " type="submit">
                    <Search size={20}/>
                  </Button> */}
                    <div className = "flex space-x-3">
                      <FilterCombobox setState = { setFilter } disabled = { false } placeholder = {"Select filter..."} frameworks = {columns}/>
                      { filter && options ? (
                        <FilterCombobox setState={setQuery} disabled = { false } placeholder = {"Select value..."} frameworks = {options}/>
                      ) : (
                        <FilterCombobox setState={setQuery} disabled = { true } placeholder = {"Select value..."} frameworks = {options}/>
                      )
                      }
                  
                    </div>
                    {/* <div>
                      {query}
                    </div> */}
                   
                </div>

                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            </div>


            <ProfilesGallery profiles = { profiles }/>
          </>
          )
      }
      
      return (
          <div>
              Loading profiles . . .
          </div>
      )



}