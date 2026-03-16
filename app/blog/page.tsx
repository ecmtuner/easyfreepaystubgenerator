import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pay Stub Guide & Resources | EasyFreePayStubGenerator.com',
  description: 'Learn everything about pay stubs — what they are, how to create them, and when you need them.',
};

const posts = [
  {
    slug: 'what-is-a-pay-stub',
    title: 'What Is a Pay Stub? Everything You Need to Know',
    desc: 'A pay stub shows your earnings, deductions, and net pay for a pay period. Learn what every line means.',
    date: 'March 2025',
  },
  {
    slug: 'pay-stub-for-apartment-application',
    title: 'How to Use a Pay Stub for an Apartment Application',
    desc: 'Most landlords require 2-3 months of pay stubs. Here\'s exactly what they look for and how to create one if you\'re self-employed.',
    date: 'March 2025',
  },
  {
    slug: 'contractor-pay-stub',
    title: 'How to Create a Pay Stub as a Contractor or Freelancer',
    desc: 'Self-employed? You can still create professional pay stubs for income verification, loan applications, and tax records.',
    date: 'March 2025',
  },
  {
    slug: 'pay-stub-for-mortgage',
    title: 'Pay Stubs for Mortgage Applications — What Lenders Want',
    desc: 'Mortgage lenders require proof of income. Find out exactly what pay stubs they accept and how to prepare yours.',
    date: 'March 2025',
  },
  {
    slug: 'how-to-read-a-pay-stub',
    title: 'How to Read a Pay Stub — Every Line Explained',
    desc: 'Gross pay, net pay, FICA, YTD — we break down every field on a typical pay stub in plain English.',
    date: 'February 2025',
  },
  {
    slug: 'self-employed-income-proof',
    title: 'Proof of Income for Self-Employed People — 5 Options',
    desc: 'Bank statements, tax returns, invoices, contracts, pay stubs — here are your options when you need to prove income.',
    date: 'February 2025',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 bg-white px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-gray-900">
            <span>💵</span> EasyFreePayStubGenerator.com
          </Link>
          <Link href="/generate" className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold text-sm transition-colors">
            Create Pay Stub →
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pay Stub Guide</h1>
        <p className="text-gray-500 mb-10">Everything you need to know about pay stubs — for employees, contractors, and the self-employed.</p>

        <div className="space-y-6">
          {posts.map(p => (
            <article key={p.slug} className="border border-gray-100 rounded-xl p-6 hover:border-green-200 transition-colors">
              <Link href={`/blog/${p.slug}`}>
                <h2 className="font-bold text-lg text-gray-900 hover:text-green-600 transition-colors mb-2">{p.title}</h2>
              </Link>
              <p className="text-gray-500 text-sm mb-3">{p.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{p.date}</span>
                <Link href={`/blog/${p.slug}`} className="text-sm text-green-600 hover:text-green-500 font-medium">Read more →</Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
          <h3 className="font-bold text-xl text-gray-900 mb-3">Ready to create your pay stub?</h3>
          <p className="text-gray-600 mb-6">Fill out the form free, preview your stub, then pay $5 to download.</p>
          <Link href="/generate" className="inline-block px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition-colors">
            Generate My Pay Stub →
          </Link>
        </div>
      </div>
    </div>
  );
}
