export interface Profile {
    id: React.Key | null | undefined;
    name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined;
    email: string | null | undefined;
    graduation_year: string | number | null | undefined;
    university: string | null | undefined;
    major: string | null | undefined;
    linkedin_url: string | undefined;
    video: string | undefined;
    image: string | undefined;
    bio: string | undefined;
    approved: boolean | undefined;
  }