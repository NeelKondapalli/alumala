import { Profile } from "@/utils/utils"

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

  import Link from 'next/link';

  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import { Badge } from "@/components/ui/badge"

  import { Button } from "@/components/ui/button"

  import { Check, Eye } from "lucide-react"

interface ProfileTableProps {
    profiles: Profile[];
    approval?: boolean;
}

const ProfileTable: React.FC<ProfileTableProps> = ({profiles, approval = false}) => {
    return (
        <Tabs defaultValue="all">
                <div className="flex items-center">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="unapproved">Unapproved</TabsTrigger>
                  </TabsList>
          
                </div>
                <TabsContent value="all">
                  <Card>
                    <CardHeader className="px-7">
                      <CardTitle>Alumni</CardTitle>
                      <CardDescription>
    
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Major
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Class of
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Contact
                            </TableHead>
                            <TableHead className="text-right"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                        {profiles.map((profile: Profile) => (
           
                            <TableRow key = {profile.id} className="bg-accent">
                            <TableCell>
                              <div className="font-medium">{profile.name}</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                {profile.university}
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {profile.major}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="text-xs" variant="secondary">
                                {profile.graduation_year}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                <a href = {profile.linkedin_url} className = "no-underline hover:underline">{profile.linkedin_url}</a>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant = "ghost" className="w-full" asChild>
                                    <Link href={`/${profile.id}`} key={profile.id}> <Eye className="mr-1 h-5 w-5" /></Link>
                                </Button>
                            </TableCell>
                          </TableRow>
     
                        ))}
                            
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="unapproved">
                <Button variant = "outline" className="w-[260px]" asChild>
                    <Link href="/approval"> <Check className="mr-1 h-5 w-5" />Visit Approval Page</Link>
                </Button>
                </TabsContent>
              </Tabs>
    )
}

export default ProfileTable