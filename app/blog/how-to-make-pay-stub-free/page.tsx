import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How to Make a Pay Stub for Free (Step-by-Step) | EasyFreePayStubGenerator.com',
  description: 'Need to make a pay stub? Here\'s a simple step-by-step guide — whether you\'re an employee, freelancer, or small business owner. Takes about 5 minutes.',
};

export default function Page() {
  return (
    <div style={{ maxWidth: '780px', margin: '0 auto', padding: '40px 20px', fontFamily: 'Georgia, serif', color: '#1a1a1a', lineHeight: '1.8' }}>
      <div style={{ marginBottom: '12px' }}>
        <Link href="/blog" style={{ color: '#2ca01c', fontSize: '14px', textDecoration: 'none' }}>← Back to Blog</Link>
      </div>
      <h1 style={{ fontSize: '34px', fontWeight: 'bold', lineHeight: '1.3', marginBottom: '8px', fontFamily: 'Arial, sans-serif' }}>
        How to Make a Pay Stub for Free (Step-by-Step)
      </h1>
      <p style={{ color: '#888', fontSize: '13px', fontFamily: 'Arial, sans-serif', marginBottom: '32px' }}>March 2025 · 7 min read</p>

      <p>Whether you're a freelancer creating income documentation, a small business owner paying your first employee, or a contractor who needs proof of earnings for an apartment, you need a pay stub — and you probably need it today.</p>
      <p>Good news: making a professional pay stub doesn't require expensive payroll software or an accountant. Here's exactly how to do it.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>What You'll Need Before You Start</h2>
      <p>Gather this information before opening any tool or template:</p>
      <p><strong>Your information (or the employee's):</strong></p>
      <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
        <li>Full name</li>
        <li>Address</li>
        <li>Social Security Number (or last 4 digits)</li>
      </ul>
      <p><strong>The employer's information:</strong></p>
      <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
        <li>Business name and address</li>
        <li>EIN (Employer Identification Number) — if applicable</li>
      </ul>
      <p><strong>Pay period details:</strong></p>
      <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
        <li>Start and end dates of the pay period</li>
        <li>Pay date</li>
      </ul>
      <p><strong>Earnings:</strong></p>
      <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
        <li>Hourly rate or salary</li>
        <li>Hours worked (for hourly workers)</li>
        <li>Any overtime, bonuses, or commissions</li>
      </ul>
      <p><strong>Deductions:</strong></p>
      <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
        <li>Federal and state tax withholding amounts</li>
        <li>Insurance premiums, 401(k) contributions, etc.</li>
      </ul>
      <p>If you're self-employed or a freelancer, some of these fields will be different — more on that below.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>Step 1: Choose Your Method</h2>
      <p>You have three options:</p>
      <p><strong>Option A: Use an online pay stub generator</strong> (fastest)<br />A tool like EasyFreePayStubGenerator.com does the math for you, formats everything correctly, and produces a professional-looking document. Takes about 5 minutes.</p>
      <p><strong>Option B: Use a spreadsheet template</strong><br />Download a pay stub template in Excel or Google Sheets, fill in your numbers manually, and calculate taxes yourself. More work, more room for error.</p>
      <p><strong>Option C: Use payroll software</strong><br />Tools like Gusto or QuickBooks Payroll generate pay stubs automatically as part of running payroll. Best for businesses with multiple employees but overkill if you just need one or two stubs.</p>
      <p>For most people reading this — freelancers, contractors, small business owners — Option A is the right call.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>Step 2: Fill In Employee and Employer Details</h2>
      <p>Enter the basic identifying information:</p>
      <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
        <li>Employee full name and address</li>
        <li>Employer business name and address</li>
        <li>Employee ID (if you use one)</li>
        <li>SSN (can be masked for privacy)</li>
      </ul>
      <p>If you're self-employed and creating a stub for yourself, you're both the employer and the employee. Use your business name as the employer.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>Step 3: Set Your Pay Period</h2>
      <p>Define the dates this stub covers. Common pay schedules:</p>
      <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
        <li><strong>Weekly</strong> — 52 pay periods per year</li>
        <li><strong>Bi-weekly</strong> — 26 pay periods per year (most common)</li>
        <li><strong>Semi-monthly</strong> — 24 pay periods per year (1st and 15th, for example)</li>
        <li><strong>Monthly</strong> — 12 pay periods per year</li>
      </ul>
      <p>Set the pay period start date, end date, and the actual pay date.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>Step 4: Enter Earnings</h2>
      <p>For hourly workers: enter the hourly rate and total hours worked. Don't forget to flag any overtime hours separately (typically 1.5× rate for hours over 40/week).</p>
      <p>For salaried workers: enter the gross salary for the period. If you're paid $60,000/year on a bi-weekly schedule, each stub should show $2,307.69.</p>
      <p>Add any additional income separately: bonuses, commissions, tips, reimbursements (note: reimbursements usually aren't taxable).</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>Step 5: Calculate and Enter Deductions</h2>
      <p>This is where most people get stuck. Here's what to include:</p>
      <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
        <li><strong>Federal income tax:</strong> Use the IRS withholding tables or a paycheck calculator. The amount depends on filing status and allowances.</li>
        <li><strong>State income tax:</strong> Varies by state. Some states (TX, FL, WA) have no income tax. Others (CA, NY) have significant withholding.</li>
        <li><strong>Social Security:</strong> 6.2% of gross wages (up to $168,600 in 2024)</li>
        <li><strong>Medicare:</strong> 1.45% of all wages (no cap)</li>
        <li><strong>Other deductions:</strong> Health insurance, retirement contributions, etc.</li>
      </ul>
      <p>If you're using a pay stub generator, most of this is calculated automatically when you enter gross pay and location.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>Step 6: Review and Download</h2>
      <p>Before downloading, check:</p>
      <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
        <li>All names and dates are correct</li>
        <li>Gross pay matches your calculation</li>
        <li>Net pay (gross minus all deductions) looks right</li>
        <li>Pay period dates are accurate</li>
      </ul>
      <p>Preview the stub, make corrections if needed, then download.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>What About Self-Employed Pay Stubs?</h2>
      <p>If you're a freelancer or independent contractor, creating a pay stub for yourself is slightly different. You're not having taxes withheld by an employer — you pay self-employment tax directly. Your pay stub should reflect gross income and estimated taxes, making it useful as income documentation even if the tax structure differs.</p>

      <div style={{ background: '#f0faf0', border: '1px solid #2ca01c', borderRadius: '8px', padding: '24px', marginTop: '40px' }}>
        <h3 style={{ fontFamily: 'Arial, sans-serif', marginTop: 0 }}>Create Your Pay Stub Now — Free Preview</h3>
        <p style={{ marginBottom: '16px' }}>EasyFreePayStubGenerator.com walks you through every step, calculates taxes automatically, and gives you a professional pay stub you can download for $5 — with a free preview first.</p>
        <Link href="/generate" style={{ display: 'inline-block', padding: '12px 28px', background: '#2ca01c', color: '#fff', borderRadius: '6px', fontWeight: 'bold', textDecoration: 'none', fontFamily: 'Arial, sans-serif' }}>
          Create Free Pay Stub →
        </Link>
      </div>
    </div>
  );
}
