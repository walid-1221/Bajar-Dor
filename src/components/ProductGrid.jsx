"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

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

export default function ProductGrid({ products = [] }) {
  const [sort, setSort] = useState("default");

  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "asc") list.sort((a, b) => a.today - b.today);
    if (sort === "desc") list.sort((a, b) => b.today - a.today);
    return list;
  }, [products, sort]);

  return (
    <div>
      {/* সাজান */}
      <div className="mt-5 flex items-center justify-end gap-2">
        <label htmlFor="sort" className="text-xs text-gray-500">
          সাজান:
        </label>
        <div className="relative">
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="cursor-pointer appearance-none rounded-md border border-gray-200 bg-white py-1.5 pl-3 pr-8 text-sm text-gray-800 outline-none focus:border-emerald-600"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* কার্ড */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => {
          const dir = p.change?.dir;
          const pct = Math.abs(p.change?.pct ?? 0);
          const badge =
            dir === "up"
              ? "bg-red-50 text-red-600"
              : dir === "down"
              ? "bg-green-50 text-green-600"
              : "bg-gray-100 text-gray-500";
          const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

          return (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-lg">
                  {p.image}
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    {p.nameBn}
                  </h2>
                  <p className="text-[11px] text-gray-500">
                    প্রতি {unitBn[p.unit] || p.unit}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-[11px] text-gray-500">আজকের দাম</p>
                  <p className="text-lg font-bold text-gray-900">
                    {fmt(p.today)}{" "}
                    <span className="text-xs font-medium text-gray-500">
                      টাকা
                    </span>
                  </p>
                </div>
                <span
                  className={`rounded-md px-2 py-1 text-[11px] font-bold ${badge}`}
                >
                  {arrow} {fmt(pct, 1)}%
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}