import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

interface Profile {
  id: string | number | null | undefined; // Removed React.Key bc query in <Link href... doesn't work with bigInt
  name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined;
  email: string | null | undefined;
  graduation_year: string | number | null | undefined;
  university: string | null | undefined;
  major: string | null | undefined;
  linkedin_url: string | undefined;
  video: string | null | undefined;
  created_at: string | null | undefined;
  updated_at: string | null | undefined;
  bio: string | undefined;
  // Include other properties as needed
} 

export async function GET(request: NextRequest) {
  let id = request.nextUrl.searchParams.get("id");
  console.log("ID ISb " + id)
  const res = await fetch('http://127.0.0.1:8000/api/profile/?format=json');
  const profiles = await res.json();
  //console.log("ALL PROFILES")
  //console.log(profiles)
  let returnProfiles = id ? profiles.filter((d: { id: number; }) => d.id == parseInt(id!)) : profiles;
  //console.log("RETURN PROFILES, id:" + id)
  //console.log(returnProfiles)
  return NextResponse.json(returnProfiles);
}

// export async function GET() {
//   const res = await fetch('http://127.0.0.1:8000/api/profile/?format=json');
//   return res
// }
