import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pay Stub Guide & Resources | EasyFreePayStubGenerator.com',
  description: 'Learn everything about pay stubs — what they are, how to create them, and when you need them.',
};

const posts = [
  {
    slug: 'how-to-make-a-pay-stub',
    title: 'How to Make a Pay Stub for Free in 2024',
    desc: 'Step-by-step guide to creating a professional pay stub — for employees, self-employed workers, and contractors.',
    date: 'March 2025',
  },
  {
    slug: 'free-pay-stub-generator-self-employed',
    title: 'Free Pay Stub Generator for Self-Employed Workers',
    desc: 'Self-employed, freelancing, or contracting? Here\'s how to create pay stubs for income verification and loan applications.',
    date: 'March 2025',
  },
  {
    slug: 'proof-of-income-without-job',
    title: 'How to Show Proof of Income Without a Traditional Job',
    desc: '8 ways to prove income when you\'re self-employed, freelancing, or between jobs — for apartments, mortgages, and loans.',
    date: 'March 2025',
  },
  {
    slug: 'pay-stub-requirements-by-state',
    title: 'Pay Stub Requirements by State (2024) — All 50 States',
    desc: 'Which states require employers to provide pay stubs? What must be included? Complete state-by-state guide.',
    date: 'March 2025',
  },
  {
    slug: 'get-pay-stubs-previous-employer',
    title: 'How to Get Pay Stubs from a Previous Employer',
    desc: 'Need old pay stubs? Here\'s exactly how to request them, what portals to check, and your legal rights.',
    date: 'March 2025',
  },
  {
    slug: '1099-vs-w2-pay-stubs',
    title: '1099 vs W-2: Do Contractors Get Pay Stubs?',
    desc: 'The key differences between 1099 contractors and W-2 employees when it comes to pay stubs, taxes, and income verification.',
    date: 'March 2025',
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
