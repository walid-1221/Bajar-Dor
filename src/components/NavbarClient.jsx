"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ChevronDown, LogOut, User } from "lucide-react";
import Logo from "@/images/logo-icon.png";
import { signOut, useSession } from "@/lib/auth-client";

export default function NavbarClient({ categories = [] }) {
  const { data: session, isPending } = useSession();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const menuRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const user = session?.user;

  useEffect(() => {
    setDate(new Date().toLocaleDateString("bn-BD", { dateStyle: "full" }));
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await signOut();
    setOpen(false);
    toast.success("সফলভাবে লগ আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* টপ হেডার */}
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-xl bg-emerald-600 p-2">
              <Image
                src={Logo}
                alt="logo"
                width={24}
                height={24}
                className="brightness-0 invert"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="mb-1 text-xl font-bold leading-none text-gray-900">
                বাজার দর
              </h2>
              <p className="min-h-3.5 text-[11px] font-medium text-gray-500">
                {date}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            {isPending ? null : user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className="flex cursor-pointer items-center gap-2"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      referrerPolicy="no-referrer"
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white">
                      {user.name?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                  <span className="hidden text-sm font-semibold text-gray-800 sm:block">
                    {user.name}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-44 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                    <Link
                      href="/profile"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <User className="h-4 w-4" /> প্রোফাইল
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      <LogOut className="h-4 w-4" /> লগ আউট
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-sm font-semibold text-gray-700 transition-colors hover:text-emerald-600"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/sign-up"
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 sm:px-5"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        {/* ক্যাটাগরি মেনু */}
        <div className="scrollbar-hide flex items-center gap-2 overflow-x-auto border-t border-gray-100 py-3">
          {categories.map((category) => {
            const active = pathname === `/category/${category.id}`;
            return (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                  active
                    ? "bg-emerald-600 text-white"
                    : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                }`}
              >
                <span className="text-base">{category.icon}</span>
                <span>{category.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}