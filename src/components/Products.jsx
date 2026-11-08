import React from 'react';

const Products = async () => {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
    const data = await res.json();

    const products = Array.isArray(data) ? data : data.data || [];
    
    // ছবির মতো ডেট ফরম্যাট
    const todayDate = new Date().toLocaleDateString('bn-BD', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full bg-[#f8fafc]">
            
            {/* হেডার সেকশন */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">সব পণ্য</h2>
                <p className="text-sm text-gray-500 mt-1">
                    সর্বমোট {products.length}টি পণ্য • হালনাগাদ: {todayDate}
                </p>
            </div>

            {/* ৩ কলামের গ্রিড */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map((item) => {
                    // দাম বাড়া, কমা বা সমান থাকার লজিক
                    const isUp = item.today > item.yesterday;
                    const isDown = item.today < item.yesterday;
                    const isSame = item.today === item.yesterday;

                    // পার্সেন্টেজ ক্যালকুলেশন
                    const diff = Math.abs(item.today - item.yesterday);
                    const percentage = item.yesterday > 0 ? ((diff / item.yesterday) * 100).toFixed(2) : "0";

                    return (
                        <div 
                            key={item.id} 
                            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
                        >
                            {/* উপরের অংশ: আইকন, নাম, ক্যাটাগরি */}
                            <div className="flex items-start gap-3 mb-6">
                                <div className="text-2xl mt-1">
                                    {item.categoryIcon || item.image}
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-gray-900 leading-tight">
                                        {item.nameBn}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {item.categoryNameBn} • {item.unit}
                                    </p>
                                </div>
                            </div>

                            {/* নিচের অংশ: দাম এবং পরিবর্তনের ব্যাজ */}
                            <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-50">
                                <div>
                                    <p className="text-[11px] text-gray-500 mb-1">আজকের দাম</p>
                                    <p className="text-xl font-black text-gray-900">
                                        {item.today} টাকা
                                    </p>
                                </div>
                                
                                {/* ব্যাজ লজিক */}
                                <div className={`font-bold text-xs py-1.5 px-2.5 rounded-lg flex items-center gap-1 mb-1
                                    ${isUp ? 'bg-red-50 text-red-600' : ''}
                                    ${isDown ? 'bg-green-50 text-green-600' : ''}
                                    ${isSame ? 'bg-gray-100 text-gray-500' : ''}
                                `}>
                                    {isUp && (
                                        <>
                                            <span className="text-[10px]">▲</span> 
                                            {item.change?.pct || percentage}%
                                        </>
                                    )}
                                    {isDown && (
                                        <>
                                            <span className="text-[10px]">▼</span> 
                                            {item.change?.pct || percentage}%
                                        </>
                                    )}
                                    {isSame && (
                                        <>
                                            <span className="text-[12px]">—</span> ০%
                                        </>
                                    )}
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Products;