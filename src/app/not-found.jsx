import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-emerald-50/60 px-4 py-12">
      <div className="w-full max-w-md text-center">
        <p className="text-7xl font-bold text-emerald-600">৪০৪</p>
        <h1 className="mt-4 text-xl font-bold text-gray-900">
          পেজটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          আপনি যে পেজটি খুঁজছেন সেটি নেই অথবা সরিয়ে ফেলা হয়েছে।
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}