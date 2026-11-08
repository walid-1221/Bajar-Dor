This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.






# 🛒 বাজার দর (BazarDor)

প্রয়োজনীয় নিত্যপণ্যের দৈনিক দাম এক নজরে দেখার একটি ওয়েব অ্যাপ। বিভিন্ন বাজারের সর্বনিম্ন, সর্বোচ্চ ও গড় দাম, আর আগের দিনের তুলনায় দামের পরিবর্তন দেখা যায়।

🔗 **Live:** https://your-site.vercel.app

## Technologies Used

- Next.js (App Router)
- Tailwind CSS
- Better Auth (Email/Password, Google, GitHub)
- react-hot-toast
- lucide-react

## Key Features

1. **Authentication:** Email/Password, Google ও GitHub দিয়ে সাইন ইন ও সাইন আপ, protected routes
2. **Price Ticker:** লাইভ স্ক্রলিং মার্কি, যেখানে পণ্যের দাম ও ▲▼ পরিবর্তন দেখায়
3. **Category Page:** ক্যাটাগরি অনুযায়ী পণ্য, দাম অনুযায়ী সাজানোর (sort) সুবিধা
4. **Product Details:** বাজারভিত্তিক দাম, সর্বনিম্ন, সর্বোচ্চ ও গড় দামের বিশ্লেষণ
5. **Profile Update:** প্রোফাইল দেখা ও নাম আপডেট করা
6. **Responsive UI:** মোবাইল, ট্যাবলেট ও ডেস্কটপে কাজ করে, সাথে skeleton loader ও 404 পেজ

## Run Locally

\`\`\`bash
git clone https://github.com/TOMAR_USERNAME/bajardar.git
cd bajardar
npm install
npm run dev
\`\`\`

`.env` file e dorkar: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`.