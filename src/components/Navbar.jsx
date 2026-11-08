// "use client";
// import { useState } from "react"
// import { Button } from "@heroui/react";
// import { signOut,useSession } from "@/lib/auth-client"
// import Link from "next/link";

// export default function Navbar() {

  




//   const [isMenuOpen, setIsMenuOpen] = useState(false);
// const {data: session} = useSession();
// // console.log("session", data.user);

// const navLinks = (
//     <>
//   <li>
//             <Link href="/profile">Profile</Link>
//           </li>
//           <li>
//             <Link href="/dashboard" className="font-medium text-accent" aria-current="page">
//               Dashboard
//             </Link>
//           </li>
//           <li>
//             <Link href="#">Pricing</Link>
//           </li>
//           </>

// )
// const authLinks = (
//     <>
//     <Link href="/sign-in">Login</Link>
//     <Button>Sign Up</Button>
//     </>
// )



  


//   return (
//     <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
//       <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
//         <div className="flex items-center gap-4">
//           <button
//             className="md:hidden"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             aria-label="Toggle menu"
//             aria-expanded={isMenuOpen}
//           >
//             <span className="sr-only">Menu</span>
//             <svg
//               className="h-6 w-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               {isMenuOpen ? (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               ) : (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               )}
//             </svg>
//           </button>
//           <div className="flex items-center gap-3">
            
//             <p className="font-bold">ACME</p>
//           </div>
//         </div>
//         <ul className="hidden items-center gap-4 md:flex">
//         {navLinks}</ul>
//         <div className="hidden items-center gap-4 md:flex">
//          {session?.user ? <Button onClick={async () => await signOut()} >LogOut</Button>: authLinks}
//         </div>
//       </header>
//       {isMenuOpen && (
//         <div className="border-t border-separator md:hidden">
//           <ul className="flex flex-col gap-2 p-4">
//            {navLinks}
           
//             <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
//          {session?.user ? <Button>LogOut</Button>: authLinks}
//             </li>
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// }

import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  let categories = [];

  try {
    const res = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/categories",
      { next: { revalidate: 3600 } }
    );
    if (res.ok) categories = await res.json();
  } catch (err) {
    console.error("Categories fetch failed:", err);
  }

  return <NavbarClient categories={categories} />;
}