import React from 'react';

const Decrease = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  const data = await res.json();

  const products = Array.isArray(data) ? data : data.data || [];
  
  // দাম কমেছে এমন পণ্য ফিল্টার করে প্রথম ৬টি নেওয়া
  const decrease = products
    .filter((i) => i.today < i.yesterday)
    .slice(0, 6);

  return (
    // max-w-7xl এবং px-4 দিয়ে Banner-এর সাথে অ্যালাইন করা হয়েছে
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      
      {/* সেকশন হেডিং (সবুজ অ্যারো) */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-green-600 text-sm">▼</span>
        <h2 className="text-xl font-bold text-gray-900">আজ দাম কমেছে</h2>
      </div>

      {/* ৩ কলামের গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {decrease?.map((item) => {
          // পার্সেন্টেজ ক্যালকুলেশন (দাম কমার কারণে সংখ্যাটি ঋণাত্মক হতে পারে, তাই Math.abs ব্যবহার করা হয়েছে)
          const rawPercentage = ((item.today - item.yesterday) / item.yesterday) * 100;
          const percentage = Math.abs(rawPercentage).toFixed(2);

          return (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
            >
              
              {/* কার্ডের উপরের অংশ (আইকন, নাম, একক) */}
              <div className="flex items-start gap-3 mb-6">
                <div className="text-2xl mt-1">
                  {item.categoryIcon || item.image}
                </div>
                <div>
                  {/* পণ্যের নাম */}
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">
                    {item.nameBn}
                  </h3>
                  {/* ক্যাটাগরি ও একক */}
                  <p className="text-sm text-gray-500 mt-0.5">
                    {item.categoryNameBn} • {item.unit}
                  </p>
                </div>
              </div>

              {/* কার্ডের নিচের অংশ (দাম ও পার্সেন্টেজ) */}
              <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-50">
                <div>
                  <p className="text-xs text-gray-500 mb-1">আজকের দাম</p>
                  <p className="text-2xl font-black text-gray-900">
                    {item.today} টাকা
                  </p>
                </div>
                
                {/* পার্সেন্টেজ ব্যাজ (সবুজ রঙ) */}
                <div className="bg-green-50 text-green-600 font-bold text-xs py-1.5 px-2.5 rounded-lg flex items-center gap-1 mb-1">
                  <span className="text-[10px]">▼</span> 
                  {item.change?.pct || percentage}%
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Decrease;