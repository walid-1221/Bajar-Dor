"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updateUser, useSession } from "@/lib/auth-client";

const inputClass =
  "w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600";

export default function UpdateUserPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    setLoading(true);
    const { data: resData, error } = await updateUser({
      name: data.name,
    });
    setLoading(false);

    console.log(resData, error);

    if (error) {
      return setError(error.message || "নাম আপডেট করা যায়নি");
    }

    if (resData?.status === true) {
      router.push("/profile");
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-emerald-50/60 px-4 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-center text-2xl font-bold text-gray-900">
          প্রোফাইল আপডেট করুন
        </h1>
        <p className="mt-1 text-center text-xs text-gray-500">
          আপনার নতুন নাম লিখে আপডেট করুন
        </p>

        <div className="mt-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <form
            key={session?.user?.name}
            onSubmit={onSubmit}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-800">
                নাম
              </label>
              <input
                name="name"
                type="text"
                required
                defaultValue={session?.user?.name || ""}
                placeholder="আপনার নাম"
                className={inputClass}
              />
            </div>

            {error && <p className="text-xs text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-emerald-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-60 cursor-pointer"
            >
              {loading ? "অপেক্ষা করুন..." : "আপডেট করুন"}
            </button>
          </form>
        </div>

        <Link
          href="/profile"
          className="mt-5 block text-center text-xs text-gray-500 hover:text-emerald-600"
        >
          ← প্রোফাইলে ফিরে যান
        </Link>
      </div>
    </div>
  );
}