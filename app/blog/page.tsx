import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pay Stub Guide & Resources | EasyFreePayStubGenerator.com',
  description: 'Learn everything about pay stubs — what they are, how to create them, and when you need them.',
};

const posts = [
  {
    slug: 'free-pay-stub-generator-online',
    title: 'How to Generate a Free Pay Stub Online in Minutes',
    desc: 'Learn how to use a free pay stub generator to create a professional pay stub in minutes — no software, no accountant, no hassle.',
    date: 'March 2025',
  },
  {
    slug: 'best-pay-stub-generator-self-employed',
    title: 'The Best Free Pay Stub Generator for Self-Employed Workers',
    desc: 'Self-employed and need income documentation? Find the best pay stub generator for freelancers, sole proprietors, and independent workers.',
    date: 'March 2025',
  },
  {
    slug: 'free-check-stub-maker',
    title: 'Free Check Stub Maker: Create Professional Pay Stubs Instantly',
    desc: 'Use a free check stub maker to create accurate, professional pay stubs in minutes. No sign-up required, instant PDF download.',
    date: 'March 2025',
  },
  {
    slug: 'pay-stub-generator-no-sign-up',
    title: 'Free Pay Stub Generator — No Sign Up, No Download Required',
    desc: 'Generate a professional pay stub online with no account required. Free preview, instant PDF download, works on any device.',
    date: 'March 2025',
  },
  {
    slug: 'pay-stub-generator-for-contractors',
    title: 'Pay Stub Generator for Independent Contractors and 1099 Workers',
    desc: 'Independent contractor? Get a pay stub generator built for 1099 workers — accurate self-employment tax calculations, professional PDF output.',
    date: 'March 2025',
  },
  {
    slug: 'proof-of-income-pay-stub-generator',
    title: 'How to Create Proof of Income with a Free Pay Stub Generator',
    desc: 'Need proof of income? A free pay stub generator creates the credible income documentation landlords and lenders actually want.',
    date: 'March 2025',
  },
  {
    slug: 'what-is-a-pay-stub',
    title: 'What Is a Pay Stub and What Should It Include?',
    desc: 'A plain-English breakdown of every field on a pay stub — gross pay, deductions, taxes, and net pay — and why each one matters.',
    date: 'March 2025',
  },
  {
    slug: 'how-to-make-pay-stub-free',
    title: 'How to Make a Pay Stub for Free (Step-by-Step)',
    desc: 'A simple step-by-step guide to creating a professional pay stub — whether you\'re an employee, freelancer, or small business owner.',
    date: 'March 2025',
  },
  {
    slug: 'pay-stub-requirements-by-state-2025',
    title: 'Pay Stub Requirements by State (2025)',
    desc: 'Pay stub laws vary by state. Here\'s what employers must provide in California, Texas, New York, Florida, and more.',
    date: 'March 2025',
  },
  {
    slug: 'pay-stubs-self-employed-freelancers',
    title: 'Pay Stubs for Self-Employed and Freelancers',
    desc: 'Self-employed? You still need pay stubs — for apartments, loans, and taxes. Here\'s how freelancers can create pay documentation without an employer.',
    date: 'March 2025',
  },
  {
    slug: 'pay-stub-to-rent-apartment',
    title: 'Do I Need a Pay Stub to Rent an Apartment?',
    desc: 'Most landlords ask for pay stubs as proof of income. Here\'s what they\'re looking for and what to do if you don\'t have traditional stubs.',
    date: 'March 2025',
  },
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
