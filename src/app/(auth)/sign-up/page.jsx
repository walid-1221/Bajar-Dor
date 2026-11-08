"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUp } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

const inputClass =
  "w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fail = (msg) => {
    setError(msg);
    toast.error(msg);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (data.password.length < 8) {
      return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    }
    if (!/[A-Z]/.test(data.password)) {
      return fail("পাসওয়ার্ডে অন্তত একটি বড় হাতের অক্ষর থাকতে হবে");
    }
    if (!/[0-9]/.test(data.password)) {
      return fail("পাসওয়ার্ডে অন্তত একটি সংখ্যা থাকতে হবে");
    }
    if (data.password !== data.confirmPassword) {
      return fail("পাসওয়ার্ড দুটি মিলছে না");
    }

    setLoading(true);
    const { data: resData, error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    setLoading(false);

    if (error) {
      const exists = /exist/i.test(error.message || "");
      return fail(
        exists
          ? "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে"
          : "অ্যাকাউন্ট তৈরি করা যায়নি, আবার চেষ্টা করুন"
      );
    }

    if (resData?.user) {
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এবার সাইন ইন করুন");
      router.push("/sign-in");
    }
  };

  return (
    <div className="min-h-[70vh] bg-emerald-50/60 px-4 py-12">
      <div className="mx-auto w-full max-w-md">
        <h1 className="text-center text-2xl font-bold text-gray-900">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="mt-1 text-center text-xs text-gray-500">
          নিচে আপনার তথ্য দিয়ে সাইন আপ করুন এবং বাজার দর দেখুন
        </p>

        <div className="mt-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-800">নাম</label>
              <input name="name" type="text" required placeholder="আপনার নাম" className={inputClass} />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-800">ইমেইল</label>
              <input name="email" type="email" required placeholder="you@example.com" className={inputClass} />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-800">পাসওয়ার্ড</label>
              <input name="password" type="password" required minLength={8} placeholder="কমপক্ষে ৮ অক্ষর" className={inputClass} />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-800">পাসওয়ার্ড নিশ্চিত করুন</label>
              <input name="confirmPassword" type="password" required placeholder="আবার লিখুন" className={inputClass} />
            </div>

            {error && <p className="text-xs text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer rounded-md bg-emerald-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-60"
            >
              {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-[11px] text-gray-400">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <SocialButtons />

          <p className="mt-5 text-center text-xs text-gray-500">
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/sign-in" className="font-semibold text-emerald-600 hover:underline">
              সাইন ইন করুন
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