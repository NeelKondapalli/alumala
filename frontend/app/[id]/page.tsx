"use client"
import Link from 'next/link';
import { redirect } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { type User } from '@supabase/supabase-js'
//import { createClient } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'
import { cn } from "@/lib/utils"
import Image from 'next/image'

import ProfilePage from '@/components/profilePage';
  
import { Profile } from "@/utils/utils"

import { Skeleton } from "@/components/ui/skeleton"



export default function ProfileView({ params }: { params: {id: number} }) {
    const supabase = createClient()

    const [loading, setLoading ] = useState(true)
    const [ id, setId] = useState< number | null>(null)
    const [ email, setEmail ] = useState<string | null>(null)
    const [ name, setName ] = useState<string | null>(null)
    const [ graduation, setYear ] = useState<number | null>(null)
    const [ university, setUniversity ] = useState<string | null>(null)
    const [ major, setMajor ] = useState<string | null>(null)
    const [ linkedin, setURL] = useState<string | null>(null)
    const [ bio, setBio ] = useState<string | null>(null)
    const [ profile, setProfile ] = useState<Profile | null>(null)
    const [ video, setVideo ] = useState<string | null>(null)
    const [ image, setImage ] = useState<string | null>(null)
    const [ approved, setApproved ] = useState<boolean | null>(null)


    const profileid = params?.id;
    console.log("pID IS: " + profileid)


    const getProfile = useCallback(async() => {
        try {
            setLoading(true)

            const { data, error, status } = await supabase
                .from('app_profile')
                .select('id, email, name, graduation_year, university, major, linkedin_url, bio, video, image, approved')
                .eq('id', profileid)
                .single()
            
                if ( error && status != 406 ) {
                    console.log(error)
                    throw error
                }

                if (data) {
                    setId(data.id)
                    setEmail(data.email)
                    setName(data.name)
                    setYear(data.graduation_year)
                    setUniversity(data.university)
                    setMajor(data.major)
                    setURL(data.linkedin_url)
                    setVideo(data.video)
                    setImage(data.image)
                    setBio(data.bio)
                    setApproved(data.approved)

                    const profile: Profile = {
                        id: data.id,
                        name: data.name,
                        email: data.email,
                        graduation_year: data.graduation_year,
                        university: data.university,
                        major: data.major,
                        bio: data.bio,
                        approved: data.approved,
                        video: data.video,
                        image: data.image,
                        linkedin_url: data.linkedin_url
                    }
                    setProfile(profile)
                }
                
        } catch (error) {
            alert("Error loading data!")
        } finally {
            setLoading(false)
        }

        }, [profileid, supabase])

    
        useEffect(() => {
            getProfile()
        }, [ profileid, getProfile ])



        if (profile) {
            // if (!profile.approved) {
            //     redirect('/')
            //     return null
            // }
            return (
                    <div>
                        <ProfilePage profile = { profile }  approval = { !profile.approved }/>
                    </div>
                   
            )
        }
        
        return (
            <div className="flex items-center justify-center space-x-4 mt-80">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        )



}