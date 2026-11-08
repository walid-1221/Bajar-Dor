import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in");

  const { user } = session;

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-emerald-50/60 px-4 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-center text-2xl font-bold text-gray-900">
          আমার প্রোফাইল
        </h1>
        <p className="mt-1 text-center text-xs text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য
        </p>

        <div className="mt-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          {/* অবতার */}
          <div className="flex flex-col items-center">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-600 text-3xl font-semibold text-white">
                {user.name?.[0]?.toUpperCase() || "U"}
              </div>
            )}

            <h2 className="mt-4 text-lg font-bold text-gray-900">
              {user.name}
            </h2>
            <p className="mt-0.5 text-sm text-gray-500">{user.email}</p>
          </div>

          {/* বাটন */}
          <Link
            href="/update-user"
            className="mt-6 block w-full rounded-md bg-emerald-600 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            প্রোফাইল আপডেট করুন
          </Link>
        </div>

        <Link
          href="/"
          className="mt-5 block text-center text-xs text-gray-500 hover:text-emerald-600"
        >
          ← হোমে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;