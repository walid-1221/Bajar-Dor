import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";

const fmt = (n) => Number(n).toLocaleString("bn-BD");

async function getJson(url) {
  try {
    const res = await fetch(url, { next: { revalidate: 600 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || json;
  } catch (err) {
    console.error("Fetch failed:", url, err);
    return null;
  }
}

export default async function CategoryPage({ params }) {
  const { id } = await params;
  const base = "https://api.abcz.workers.dev/api/bazardor";

  const [category, products] = await Promise.all([
    getJson(`${base}/categories/${id}`),
    getJson(`${base}/products?category=${id}`),
  ]);

  const list = Array.isArray(products) ? products : [];

  const name = category?.nameBn || list[0]?.categoryNameBn;
  const icon = category?.icon || list[0]?.categoryIcon;

  // ভুল slug হলে 404 page
  if (!name) notFound();

  return (
    <div className="min-h-[70vh] bg-emerald-50/60 px-4 py-6">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl">
            {icon}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{name}</h1>
            <p className="mt-0.5 text-xs text-gray-500">
              মোট {fmt(list.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        {list.length === 0 ? (
          <div className="mt-8 rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm">
            <p className="text-5xl">🛒</p>
            <h2 className="mt-3 text-lg font-bold text-gray-900">
              কোনো পণ্য পাওয়া যায়নি
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              এই ক্যাটাগরিতে এখনো কোনো পণ্য নেই।
            </p>
            <Link
              href="/"
              className="mt-5 inline-block rounded-md bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        ) : (
          <ProductGrid products={list} />
        )}
      </div>
    </div>
  );
}