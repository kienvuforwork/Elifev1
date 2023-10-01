import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCurrentUser } from './app/actions/getCurrentUser'
 
// This function can be marked `async` if using `await` inside
export async function  middleware(req: NextRequest) {
//   let user
//   let cookie = req.cookies.get('token')
//   try {
//     const response = await fetch("http://localhost:8080/user", {
//       method: "GET",
//       credentials: "same-origin",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${cookie && cookie.value}`
//       },

//     });
//        const res = await response.json();
//        if(res.status === "error"){
//         user= null
//        } else{
//         user = res
//        }
//   } catch (error) {
//     console.error("There is no user", );
//   }
// ;
//   if (req.nextUrl.pathname.startsWith('/home') && !user) {
//     return NextResponse.rewrite(new URL('/', req.url))
//   }
//   if (req.nextUrl.pathname.startsWith('/user') && !user) {
//     return NextResponse.rewrite(new URL('/', req.url))
//   }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/home', "/user/:user*", "/"],
}

