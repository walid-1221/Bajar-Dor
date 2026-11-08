import React from "react";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const Marquee = async () => {
  let products = [];

  try {
    const res = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/products",
      { next: { revalidate: 600 } }
    );
    if (res.ok) {
      const pPrice = await res.json();
      products = Array.isArray(pPrice) ? pPrice : pPrice.data || [];
    }
  } catch (err) {
    console.error("Marquee fetch failed:", err);
  }

  if (products.length === 0) return null;

  return (
    <div className="bg-gray-50 text-black border-y border-gray-200 py-2">
      <div className="max-w-7xl mx-auto overflow-hidden">
        <MarqueeText duration={30} pauseOnHover={true}>
          {products.map((p) => (
            <span
              key={p.id}
              className="mx-6 inline-flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              {/* ইমোজি বা আইকন */}
              <span className="text-base">{p.image}</span>

              {/* পণ্যের নাম */}
              <span>{p.nameBn}</span>

              {/* আজকের দাম ও একক */}
              <span className="font-semibold text-gray-900">
                {p.today} টাকা/{p.unit}
              </span>

              {/* দাম বাড়া বা কমার পার্সেন্টেজ */}
              {p.change && p.change.dir && (
                <span
                  className={`text-xs font-bold flex items-center ${
                    p.change.dir === "up" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {p.change.dir === "up" ? "🔼" : "🔽"}
                  {p.change.pct}%
                </span>
              )}

              {/* ডিভাইডার */}
              <span className="text-gray-300 ml-3">|</span>
            </span>
          ))}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;