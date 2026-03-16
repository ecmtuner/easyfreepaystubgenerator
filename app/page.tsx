import Link from 'next/link';

const features = [
  { icon: '⚡', title: 'Ready in 2 Minutes', desc: 'Enter your info and get a professional pay stub instantly.' },
  { icon: '🧮', title: 'Auto Tax Calculation', desc: 'Federal, state, Social Security, Medicare — all calculated automatically.' },
  { icon: '🖨️', title: 'Print or Save as PDF', desc: 'Download a clean, professional PDF ready to share or print.' },
  { icon: '🏗️', title: 'Built for Contractors', desc: 'Perfect for freelancers, self-employed, and small business owners.' },
  { icon: '🔒', title: 'Private & Secure', desc: 'Your data stays in your browser. Nothing is stored on our servers.' },
  { icon: '💵', title: 'Only $5 to Download', desc: 'Free to preview. Pay $5 only when you\'re ready to download.' },
];

const useCases = [
  'Proof of income for apartment applications',
  'Income verification for bank loans or mortgages',
  'Records for self-employed contractors',
  'Documentation for freelancers and gig workers',
  'Small business payroll records',
  'Tax preparation documentation',
];

const faqs = [
  {
    q: 'Is the pay stub generator really free?',
    a: 'You can fill out your information and preview your pay stub completely free. We charge $5 to download the final PDF — no subscription, no hidden fees.'
  },
  {
    q: 'Is this pay stub legally valid?',
    a: 'Our pay stubs are professional documents for record-keeping and income verification. They are not official payroll records. For legal payroll compliance, consult a payroll professional.'
  },
  {
    q: 'What taxes are calculated?',
    a: 'We calculate federal income tax (2024 brackets, single or married filing), state income tax for all 50 states, Social Security (6.2%), Medicare (1.45%), and any additional deductions you enter.'
  },
  {
    q: 'Can I use this for an apartment application?',
    a: 'Yes. Many landlords and property managers accept pay stubs as proof of income. Our stubs include all standard fields: employer info, employee info, gross pay, deductions, and net pay.'
  },
  {
    q: 'Do you store my personal information?',
    a: 'No. Your information is processed in your browser and used only to generate the PDF. We do not store your name, SSN, salary, or any other personal details.'
  },
  {
    q: 'Can I generate multiple pay stubs?',
    a: 'Yes. Each pay stub is $5. You can generate as many as you need — each one is a fresh $5 transaction.'
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💵</span>
            <span className="font-bold text-gray-900">EasyFreePayStubGenerator</span>
            <span className="hidden sm:inline text-gray-400">.com</span>
          </div>
          <Link href="/generate"
            className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold text-sm transition-colors">
            Create Pay Stub →
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-green-50 to-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full mb-6">
            ✓ Free to preview · $5 to download
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Free Pay Stub Generator<br />
            <span className="text-green-600">Ready in 2 Minutes</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create a professional pay stub instantly. Fill out your info, preview for free,
            and download a print-ready PDF for just $5. No account needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/generate"
              className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-colors shadow-lg shadow-green-200">
              Generate My Pay Stub — Free Preview
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-400">No signup · No subscription · $5 to download PDF</p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Enter Your Info', desc: 'Fill in employer details, employee info, pay rate, hours, and deductions.' },
              { step: '2', title: 'Preview for Free', desc: 'See your complete pay stub before paying anything. Make any changes.' },
              { step: '3', title: 'Pay $5 & Download', desc: 'Pay once, download your print-ready PDF instantly.' },
            ].map(s => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">{s.step}</div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/generate"
              className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-colors">
              Start Now →
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">Everything You Need</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Who Uses Our Pay Stub Generator?</h2>
              <p className="text-gray-600 mb-6">Whether you're a contractor, freelancer, or small business owner, a professional pay stub helps you prove income and keep records.</p>
              <ul className="space-y-3">
                {useCases.map(u => (
                  <li key={u} className="flex items-start gap-2 text-gray-700">
                    <span className="text-green-600 mt-0.5">✓</span> {u}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="text-center mb-4">
                <span className="text-4xl font-extrabold text-green-600">$5</span>
                <p className="text-gray-500 text-sm mt-1">per pay stub download</p>
              </div>
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Free preview before you pay</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Federal + state tax auto-calculated</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> All 50 states supported</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Hourly or salary pay types</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Overtime, health, dental, 401k</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Print-ready PDF output</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> No account required</li>
              </ul>
              <Link href="/generate"
                className="block text-center w-full px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition-colors">
                Create My Pay Stub
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map(f => (
              <div key={f.q} className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">{f.q}</h3>
                <p className="text-gray-600 text-sm">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 bg-green-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Create Your Pay Stub?</h2>
          <p className="text-green-100 mb-8">Free preview. $5 to download. Takes 2 minutes.</p>
          <Link href="/generate"
            className="inline-block px-8 py-4 bg-white text-green-700 rounded-xl font-bold text-lg hover:bg-green-50 transition-colors shadow-lg">
            Generate My Pay Stub Now →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} EasyFreePayStubGenerator.com</p>
          <div className="flex gap-6">
            <Link href="/blog" className="hover:text-gray-600">Pay Stub Guide</Link>
            <Link href="/generate" className="hover:text-gray-600">Generate</Link>
          </div>
          <p>Not affiliated with any payroll provider</p>
        </div>
      </footer>
    </div>
  );
}
