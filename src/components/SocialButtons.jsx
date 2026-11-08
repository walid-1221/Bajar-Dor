"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" className="h-4 w-4" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-17.1z" />
    <path fill="#FBBC05" d="M10.5 28.7c-.5-1.4-.8-2.9-.8-4.7s.3-3.3.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z" />
    <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.7c-2.1 1.4-4.8 2.3-8.5 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.3 1 .1-.7.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
  </svg>
);

export default function SocialButtons() {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleSocial = async (provider) => {
    setLoadingProvider(provider);

    try {
      const { error } = await signIn.social({ provider, callbackURL: "/" });

      if (error) {
        toast.error("সোশ্যাল সাইন ইন করা যায়নি, আবার চেষ্টা করুন");
        setLoadingProvider(null);
      }
      // সফল হলে browser নিজেই Google/GitHub এ redirect হয়ে যায়
    } catch (err) {
      console.error(err);
      toast.error("কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন");
      setLoadingProvider(null);
    }
  };

  const btn =
    "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-800 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={() => handleSocial("google")}
        disabled={loadingProvider !== null}
        className={btn}
      >
        <GoogleIcon />
        {loadingProvider === "google" ? "অপেক্ষা করুন..." : "Google দিয়ে চালিয়ে যান"}
      </button>

      <button
        type="button"
        onClick={() => handleSocial("github")}
        disabled={loadingProvider !== null}
        className={btn}
      >
        <GithubIcon />
        {loadingProvider === "github" ? "অপেক্ষা করুন..." : "GitHub দিয়ে চালিয়ে যান"}
      </button>
    </div>
  );
}