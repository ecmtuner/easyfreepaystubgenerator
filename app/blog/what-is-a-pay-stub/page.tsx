import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'What Is a Pay Stub and What Should It Include? | EasyFreePayStubGenerator.com',
  description: 'Not sure what a pay stub is or what goes on one? Here\'s a plain-English breakdown of every field you need to know — and why it matters.',
};

export default function Page() {
  return (
    <div style={{ maxWidth: '780px', margin: '0 auto', padding: '40px 20px', fontFamily: 'Georgia, serif', color: '#1a1a1a', lineHeight: '1.8' }}>
      <div style={{ marginBottom: '12px' }}>
        <Link href="/blog" style={{ color: '#2ca01c', fontSize: '14px', textDecoration: 'none' }}>← Back to Blog</Link>
      </div>
      <h1 style={{ fontSize: '34px', fontWeight: 'bold', lineHeight: '1.3', marginBottom: '8px', fontFamily: 'Arial, sans-serif' }}>
        What Is a Pay Stub and What Should It Include?
      </h1>
      <p style={{ color: '#888', fontSize: '13px', fontFamily: 'Arial, sans-serif', marginBottom: '32px' }}>March 2025 · 6 min read</p>

      <p>If you've ever received a paycheck and noticed the paper attached to it — or the digital document that came with your direct deposit — that's a pay stub. It's one of those documents that most people glance at and file away, but it contains important information about your income, taxes, and deductions.</p>
      <p>If you're self-employed, a freelancer, or a small business owner issuing your first payments, understanding pay stubs matters even more.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>The Simple Definition</h2>
      <p>A pay stub (also called a paycheck stub or earnings statement) is a document that accompanies a paycheck and shows the breakdown of an employee's earnings for that pay period. It shows what was earned, what was withheld for taxes and other deductions, and what was actually paid out.</p>
      <p>Most employees receive them automatically. Freelancers, contractors, and self-employed individuals often need to create their own.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>What Every Pay Stub Should Include</h2>

      <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '28px', marginBottom: '10px', fontFamily: 'Arial, sans-serif' }}>Employee and Employer Information</h3>
      <p>At the top of any pay stub you'll find:</p>
      <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
        <li><strong>Employee name</strong> and address</li>
        <li><strong>Employer name</strong> and address</li>
        <li><strong>Employee ID</strong> (if applicable)</li>
        <li><strong>Social Security Number</strong> (usually partially masked, e.g., XXX-XX-1234)</li>
      </ul>
      <p>This identifies who earned the money and who paid it.</p>

      <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '28px', marginBottom: '10px', fontFamily: 'Arial, sans-serif' }}>Pay Period and Pay Date</h3>
      <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
        <li><strong>Pay period:</strong> The dates covered by this pay stub (e.g., Jan 1–15, 2025)</li>
        <li><strong>Pay date:</strong> The actual date the payment was issued or deposited</li>
      </ul>
      <p>These matter for tax records, loan applications, and any situation where someone needs to verify income at a specific point in time.</p>

      <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '28px', marginBottom: '10px', fontFamily: 'Arial, sans-serif' }}>Earnings</h3>
      <p>This is the core of the pay stub:</p>
      <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
        <li><strong>Gross pay:</strong> Total earnings before any deductions. For hourly workers, this is hours worked × hourly rate. For salaried workers, it's the fixed salary for the period.</li>
        <li><strong>Regular pay:</strong> Base wages for regular hours</li>
        <li><strong>Overtime pay:</strong> Hours worked beyond 40/week, typically at 1.5× the regular rate</li>
        <li><strong>Other earnings:</strong> Bonuses, commissions, tips — listed separately</li>
      </ul>

      <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '28px', marginBottom: '10px', fontFamily: 'Arial, sans-serif' }}>Deductions</h3>
      <p>Deductions come in two types:</p>
      <p><strong>Pre-tax deductions</strong> (reduce your taxable income):</p>
      <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
        <li>Health insurance premiums</li>
        <li>401(k) or retirement contributions</li>
        <li>FSA/HSA contributions</li>
      </ul>
      <p><strong>Post-tax deductions</strong> (come out after tax is calculated):</p>
      <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
        <li>Wage garnishments</li>
        <li>After-tax insurance plans</li>
        <li>Union dues</li>
      </ul>

      <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '28px', marginBottom: '10px', fontFamily: 'Arial, sans-serif' }}>Taxes Withheld</h3>
      <p>Every pay stub shows what was taken out for taxes:</p>
      <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
        <li><strong>Federal income tax</strong> — Based on your W-4 elections and income level</li>
        <li><strong>State income tax</strong> — Varies by state (some states have none)</li>
        <li><strong>Social Security (FICA)</strong> — 6.2% of gross wages up to the annual cap</li>
        <li><strong>Medicare</strong> — 1.45% of all wages</li>
        <li><strong>Local/city taxes</strong> — Where applicable (New York City, for example)</li>
      </ul>

      <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '28px', marginBottom: '10px', fontFamily: 'Arial, sans-serif' }}>Net Pay</h3>
      <p>This is the number most people actually care about: what you actually take home after all deductions and taxes. Sometimes called "take-home pay."</p>

      <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '28px', marginBottom: '10px', fontFamily: 'Arial, sans-serif' }}>Year-to-Date (YTD) Totals</h3>
      <p>Most pay stubs include a YTD column alongside the current-period column. This shows your cumulative totals for the year — useful for tax preparation and for verifying income over time.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>Why Do Pay Stubs Matter?</h2>
      <p>Pay stubs serve several purposes beyond just showing you what you earned:</p>
      <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
        <li><strong>Renting an apartment</strong> — Landlords almost always ask for proof of income</li>
        <li><strong>Getting a loan or mortgage</strong> — Lenders verify income through pay stubs</li>
        <li><strong>Tax filing</strong> — Pay stubs help you verify your W-2 is accurate</li>
        <li><strong>Dispute resolution</strong> — If there's ever a payroll error, your stubs are the record</li>
      </ul>
      <p>For freelancers and self-employed workers, creating your own pay stubs creates the paper trail that employees get automatically.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>Creating a Pay Stub Without an Employer</h2>
      <p>If you're self-employed, a 1099 contractor, or a small business owner, you won't receive pay stubs automatically. But you often need them — for apartments, loans, and accounting purposes.</p>
      <p>The fastest solution: use a pay stub generator that handles all the calculations and formatting for you.</p>

      <div style={{ background: '#f0faf0', border: '1px solid #2ca01c', borderRadius: '8px', padding: '24px', marginTop: '40px' }}>
        <h3 style={{ fontFamily: 'Arial, sans-serif', marginTop: 0 }}>Create Your Pay Stub Now — Free Preview</h3>
        <p style={{ marginBottom: '16px' }}>EasyFreePayStubGenerator.com lets you create a professional, accurate pay stub in minutes. Preview it free — download for $5. No subscription, no account required.</p>
        <Link href="/generate" style={{ display: 'inline-block', padding: '12px 28px', background: '#2ca01c', color: '#fff', borderRadius: '6px', fontWeight: 'bold', textDecoration: 'none', fontFamily: 'Arial, sans-serif' }}>
          Create Free Pay Stub →
        </Link>
      </div>
    </div>
  );
}
