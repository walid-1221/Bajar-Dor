import React from 'react';
import banner from "@/images/bazar-hero.png";
import Image from 'next/image';

const Banner = () => {
    return (
        // প্যাডিং বাড়ানো হয়েছে যাতে কার্ডটি স্ক্রিনের চারপাশ থেকে একটু দূরে থাকে
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* মূল কার্ড */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-10 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                
                <div className="flex-1 w-full">
                    <div className="inline-block bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
                        <Date />
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-xl transition-colors duration-200">
                        সব পণ্য দেখুন
                    </button>
                </div>

                <div className="flex-1 w-full flex justify-center md:justify-end">
                    <Image 
                        src={banner}
                        alt="banner"
                        width={400}
                        height={400}
                        className="w-full max-w-xs md:max-w-sm lg:max-w-md object-contain"
                        priority 
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;