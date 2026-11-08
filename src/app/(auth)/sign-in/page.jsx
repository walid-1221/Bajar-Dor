"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

const inputClass =
  "w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // protected page e login charao gele toast
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("redirect")) {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "auth-required" });
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    setLoading(true);
    const { error } = await signIn.email({
      email: data.email,
      password: data.password,
    });
    setLoading(false);

    if (error) {
      const msg = "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে";
      setError(msg);
      return toast.error(msg);
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");

    // যে পেজে যেতে চেয়েছিল সেখানে, নাহলে হোমে
    const redirect = new URLSearchParams(window.location.search).get("redirect");
    const safe = redirect && redirect.startsWith("/") && !redirect.startsWith("//");
    router.push(safe ? redirect : "/");
    router.refresh();
  };

  return (
    <div className="min-h-[70vh] bg-emerald-50/60 px-4 py-12">
      <div className="mx-auto w-full max-w-md">
        <h1 className="text-center text-2xl font-bold text-gray-900">সাইন ইন</h1>
        <p className="mt-1 text-center text-xs text-gray-500">
          আপনার অ্যাকাউন্টে ঢুকে বাজার দর দেখুন
        </p>

        <div className="mt-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-800">ইমেইল</label>
              <input name="email" type="email" required placeholder="you@example.com" className={inputClass} />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-800">পাসওয়ার্ড</label>
              <input name="password" type="password" required placeholder="আপনার পাসওয়ার্ড" className={inputClass} />
            </div>

            {error && <p className="text-xs text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer rounded-md bg-emerald-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-60"
            >
              {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-[11px] text-gray-400">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <SocialButtons />

          <p className="mt-5 text-center text-xs text-gray-500">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/sign-up" className="font-semibold text-emerald-600 hover:underline">
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        <Link href="/" className="mt-5 block text-center text-xs text-gray-500 hover:text-emerald-600">
          ← হোমে ফিরে যান
        </Link>
      </div>
    </div>
  );
}