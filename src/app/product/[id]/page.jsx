import Link from "next/link";
import { notFound } from "next/navigation";

const unitBn = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const fmt = (n, d = 0) =>
  Number(n).toLocaleString("bn-BD", {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });

async function getProduct(id) {
  try {
    const res = await fetch(
      `https://api.abcz.workers.dev/api/bazardor/products/${id}`,
      { next: { revalidate: 600 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || json;
  } catch (err) {
    console.error("Product fetch failed:", err);
    return null;
  }
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;

  const product = await getProduct(id);
  if (!product || !product.markets || product.markets.length === 0) notFound();

  const markets = product.markets;
  const unit = unitBn[product.unit] || product.unit;

  const lowest = markets.reduce((a, b) => (b.min < a.min ? b : a), markets[0]);
  const highest = markets.reduce((a, b) => (b.max > a.max ? b : a), markets[0]);
  const avg =
    markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length;

  const dir = product.change?.dir;
  const pct = Math.abs(product.change?.pct ?? 0);
  const changeColor =
    dir === "up"
      ? "text-red-600"
      : dir === "down"
      ? "text-green-600"
      : "text-gray-500";
  const changeIcon = dir === "up" ? "▲" : dir === "down" ? "▼" : "–";

  return (
    <div className="bg-emerald-50/60 min-h-[70vh] px-4 py-6">
      <div className="mx-auto max-w-4xl">
        {/* ব্রেডক্রাম্ব */}
        <nav className="mb-4 flex items-center gap-1.5 text-xs text-gray-500">
          <Link href="/" className="hover:text-emerald-600">
            হোম
          </Link>
          <span>›</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-emerald-600"
          >
            {product.categoryNameBn}
          </Link>
          <span>›</span>
          <span className="text-gray-800">{product.nameBn}</span>
        </nav>

        {/* হেডার কার্ড */}
        <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-3xl">
              {product.image}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {product.nameBn}
              </h1>
              <p className="mt-0.5 text-xs text-gray-500">
                {product.categoryNameBn} · প্রতি {unit}
              </p>
              <p className="mt-1 text-[11px] text-gray-400">
                বিভিন্ন বাজারের গড় মূল্য
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-center">
            <p className="text-[11px] text-gray-500">আজকের দাম</p>
            <p className="text-2xl font-bold text-gray-900">
              {fmt(product.today)}
            </p>
            <p className="text-[11px] text-gray-500">টাকা / {unit}</p>
            <p className={`mt-1 text-xs font-bold ${changeColor}`}>
              {changeIcon} {fmt(pct, 1)}%
            </p>
          </div>
        </div>

        {/* বাজার বিশ্লেষণ */}
        <div className="mt-5 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-bold text-gray-900">বাজার বিশ্লেষণ</h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <p className="text-[11px] text-gray-500">সর্বনিম্ন দাম</p>
              <p className="mt-1 text-xl font-bold text-green-600">
                {fmt(lowest.min)} টাকা
              </p>
              <p className="mt-1 text-[11px] text-gray-500">
                {lowest.market}, {lowest.division}
              </p>
            </div>

            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <p className="text-[11px] text-gray-500">সর্বোচ্চ দাম</p>
              <p className="mt-1 text-xl font-bold text-red-600">
                {fmt(highest.max)} টাকা
              </p>
              <p className="mt-1 text-[11px] text-gray-500">
                {highest.market}, {highest.division}
              </p>
            </div>

            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <p className="text-[11px] text-gray-500">গড় দাম</p>
              <p className="mt-1 text-xl font-bold text-gray-900">
                {fmt(avg)} টাকা
              </p>
              <p className="mt-1 text-[11px] text-gray-500">
                {fmt(markets.length)}টি বাজারের গড়
              </p>
            </div>
          </div>
        </div>

        {/* বাজারভিত্তিক দাম */}
        <div className="mt-5 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto">
<table className="w-full min-w-130 text-left text-sm">
                  <thead>
                <tr className="border-b border-gray-200 text-xs text-gray-500">
                  <th className="py-2 pl-2 font-medium">বাজার</th>
                  <th className="py-2 font-medium">বিভাগ</th>
                  <th className="py-2 text-right font-medium">সর্বনিম্ন</th>
                  <th className="py-2 text-right font-medium">সর্বোচ্চ</th>
                  <th className="py-2 pr-2 text-right font-medium">দাম</th>
                </tr>
              </thead>
              <tbody>
                {markets.map((m, i) => (
                  <tr
                    key={`${m.market}-${i}`}
                    className={i % 2 === 0 ? "bg-emerald-50/50" : "bg-white"}
                  >
                    <td className="py-2.5 pl-2 text-gray-900">{m.market}</td>
                    <td className="py-2.5 text-gray-600">{m.division}</td>
                    <td className="py-2.5 text-right text-gray-700">
                      {fmt(m.min)} টাকা
                    </td>
                    <td className="py-2.5 text-right text-gray-700">
                      {fmt(m.max)} টাকা
                    </td>
                    <td className="py-2.5 pr-2 text-right font-bold text-gray-900">
                      {fmt((m.min + m.max) / 2, 2)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}