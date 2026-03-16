import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '1099 vs W-2: Do Contractors Get Pay Stubs? (2024) | EasyFreePayStubGenerator.com',
  description: 'What\'s the difference between 1099 contractors and W-2 employees when it comes to pay stubs, taxes, and income verification? Complete guide.',
};

export default function Page() {
  return (
    <div style={{ maxWidth: '780px', margin: '0 auto', padding: '40px 20px', fontFamily: 'Georgia, serif', color: '#1a1a1a', lineHeight: '1.8' }}>
      <div style={{ marginBottom: '12px' }}>
        <Link href="/blog" style={{ color: '#2ca01c', fontSize: '14px', textDecoration: 'none' }}>← Back to Blog</Link>
      </div>
      <h1 style={{ fontSize: '34px', fontWeight: 'bold', lineHeight: '1.3', marginBottom: '8px', fontFamily: 'Arial, sans-serif' }}>
        1099 vs W-2: Do Contractors Get Pay Stubs?
      </h1>
      <p style={{ color: '#888', fontSize: '13px', fontFamily: 'Arial, sans-serif', marginBottom: '32px' }}>March 2025 · 7 min read</p>

      <p>If you work as a 1099 independent contractor, you've probably noticed something missing compared to your W-2 employee friends: nobody's handing you a pay stub with each payment. So does that mean contractors don't get pay stubs — and what does that mean for proving your income?</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>The Key Difference: Employee vs. Contractor</h2>
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', fontFamily: 'Arial, sans-serif' }}>
          <thead>
            <tr style={{ background: '#2d5f8a', color: '#fff' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left' }}>Factor</th>
              <th style={{ padding: '10px 12px', textAlign: 'left' }}>W-2 Employee</th>
              <th style={{ padding: '10px 12px', textAlign: 'left' }}>1099 Contractor</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Pay stubs provided', 'Yes — every pay period', 'No — you invoice clients'],
              ['Taxes withheld', 'Yes — employer withholds', 'No — you pay quarterly'],
              ['Social Security/Medicare', 'Split 50/50 with employer', 'You pay both halves (15.3%)'],
              ['Benefits', 'Often provided', 'You provide your own'],
              ['Income form', 'W-2 at year end', '1099-NEC from each client'],
              ['Proof of income', 'Pay stubs + W-2', 'Invoices + 1099s + bank statements'],
            ].map(([factor, w2, c1099], i) => (
              <tr key={factor} style={{ background: i % 2 === 0 ? '#f9f9f9' : '#fff', borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '9px 12px', fontWeight: 'bold' }}>{factor}</td>
                <td style={{ padding: '9px 12px' }}>{w2}</td>
                <td style={{ padding: '9px 12px' }}>{c1099}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>Do 1099 Contractors Get Pay Stubs?</h2>
      <p>No — traditional pay stubs are not provided to independent contractors. When you work as a 1099 contractor, you're running your own business. You invoice your clients, they pay you, and at year-end they send you a 1099-NEC if they paid you $600 or more.</p>
      <p>However, contractors can — and often should — <strong>create their own pay stubs</strong>. This is completely legal and gives you a professional income documentation record for:</p>
      <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
        <li>Apartment and rental applications</li>
        <li>Mortgage and loan applications</li>
        <li>Your own financial record-keeping</li>
        <li>Quarterly estimated tax calculations</li>
      </ul>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>How 1099 Taxes Work</h2>
      <p>This is the part most new contractors are shocked by. As a W-2 employee, your employer pays half of your Social Security and Medicare taxes. As a 1099 contractor, you pay both halves:</p>
      <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
        <li><strong>Social Security:</strong> 12.4% (vs 6.2% for employees)</li>
        <li><strong>Medicare:</strong> 2.9% (vs 1.45% for employees)</li>
        <li><strong>Total self-employment tax:</strong> 15.3% on net earnings</li>
        <li><strong>Federal income tax:</strong> Based on your tax bracket</li>
        <li><strong>State income tax:</strong> Varies by state</li>
      </ul>
      <p>The good news: you can deduct the employer-equivalent half of self-employment tax (7.65%) from your gross income when calculating federal income tax.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>Quarterly Estimated Taxes</h2>
      <p>W-2 employees have taxes withheld automatically. As a 1099 contractor, you're responsible for paying taxes yourself — quarterly. The IRS requires estimated tax payments if you expect to owe at least $1,000 in taxes for the year.</p>
      <p>Due dates for quarterly estimated taxes:</p>
      <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
        <li>Q1 (Jan–Mar): Due April 15</li>
        <li>Q2 (Apr–May): Due June 15</li>
        <li>Q3 (Jun–Aug): Due September 15</li>
        <li>Q4 (Sep–Dec): Due January 15 of next year</li>
      </ul>
      <p>A good rule of thumb: set aside 25-30% of every payment you receive for taxes.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>How to Prove Income as a 1099 Contractor</h2>
      <p>When you need to verify income for an apartment or loan application, use a combination of these:</p>
      <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
        <li><strong>Self-generated pay stubs</strong> — Shows your income in a format lenders and landlords understand</li>
        <li><strong>1099-NEC forms</strong> — Official income documentation from clients</li>
        <li><strong>Bank statements</strong> — Shows actual deposits from client payments</li>
        <li><strong>Tax returns (Schedule C)</strong> — Shows annual net profit from your business</li>
        <li><strong>Invoices</strong> — Ongoing work documentation</li>
      </ul>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>W-2 vs 1099: Which Is Better?</h2>
      <p>It depends on your situation:</p>
      <p><strong>W-2 is better if:</strong> you want predictable income, employer-provided benefits, and simpler tax filing. W-2 status is also better for loan applications since income is easier to verify.</p>
      <p><strong>1099 is better if:</strong> you value flexibility, can deduct business expenses, work with multiple clients, and earn enough to cover your own benefits. Many contractors earn significantly more than equivalent W-2 employees precisely because they handle their own taxes and benefits.</p>

      <div style={{ background: '#f0faf0', border: '1px solid #2ca01c', borderRadius: '8px', padding: '24px', marginTop: '40px' }}>
        <h3 style={{ fontFamily: 'Arial, sans-serif', marginTop: 0 }}>1099 Contractor? Create Your Pay Stubs</h3>
        <p style={{ marginBottom: '16px' }}>Generate professional pay stubs that account for self-employment tax. Perfect for income verification. Free preview, $5 to download.</p>
        <Link href="/generate" style={{ display: 'inline-block', padding: '12px 28px', background: '#2ca01c', color: '#fff', borderRadius: '6px', fontWeight: 'bold', textDecoration: 'none', fontFamily: 'Arial, sans-serif' }}>
          Create Contractor Pay Stub →
        </Link>
      </div>
    </div>
  );
}
