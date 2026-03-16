import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pay Stub Requirements by State (2024) — All 50 States | EasyFreePayStubGenerator.com',
  description: 'Complete guide to pay stub laws by state. Which states require employers to provide pay stubs? What must be included? Updated for 2024.',
};

export default function Page() {
  const states = [
    { state: 'California', requirement: 'Required — itemized written statement every pay period', notable: 'Most detailed requirements in the US' },
    { state: 'New York', requirement: 'Required — written or electronic wage statement', notable: 'Must include pay rate, pay period, hours worked' },
    { state: 'New Jersey', requirement: 'Required — written statement of wages', notable: 'Must show gross and net wages, deductions' },
    { state: 'Texas', requirement: 'Required — earnings statement', notable: 'No specific format required' },
    { state: 'Florida', requirement: 'No state law — federal FLSA applies', notable: 'Employers must keep payroll records but no stub required' },
    { state: 'Illinois', requirement: 'Required — written or electronic pay stub', notable: 'Must include hours worked for hourly employees' },
    { state: 'Pennsylvania', requirement: 'Required — written statement', notable: 'Must show hours worked and wages paid' },
    { state: 'Ohio', requirement: 'Required — itemized statement', notable: 'Must include gross wages, deductions, net wages' },
    { state: 'Georgia', requirement: 'No state law — federal only', notable: 'No pay stub required by state law' },
    { state: 'Michigan', requirement: 'Required — written statement', notable: 'Electronic format acceptable' },
  ];

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto', padding: '40px 20px', fontFamily: 'Georgia, serif', color: '#1a1a1a', lineHeight: '1.8' }}>
      <div style={{ marginBottom: '12px' }}>
        <Link href="/blog" style={{ color: '#2ca01c', fontSize: '14px', textDecoration: 'none' }}>← Back to Blog</Link>
      </div>
      <h1 style={{ fontSize: '34px', fontWeight: 'bold', lineHeight: '1.3', marginBottom: '8px', fontFamily: 'Arial, sans-serif' }}>
        Pay Stub Requirements by State (2024)
      </h1>
      <p style={{ color: '#888', fontSize: '13px', fontFamily: 'Arial, sans-serif', marginBottom: '32px' }}>March 2025 · 8 min read</p>

      <p>Pay stub laws vary significantly from state to state. Some states require detailed itemized statements delivered every pay period. Others have no state-level requirements at all, leaving employees only with federal FLSA protections. Here's what you need to know.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>Federal Pay Stub Requirements</h2>
      <p>At the federal level, the <strong>Fair Labor Standards Act (FLSA)</strong> does not technically require employers to provide pay stubs. However, it does require employers to keep accurate payroll records including:</p>
      <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
        <li>Hours worked each day and week</li>
        <li>Regular hourly pay rate</li>
        <li>Total daily or weekly straight-time earnings</li>
        <li>Total overtime earnings for the week</li>
        <li>All additions to or deductions from wages</li>
        <li>Total wages paid each pay period</li>
        <li>Date of payment and pay period covered</li>
      </ul>
      <p>Many states go further and require this information to be provided to employees in writing.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>States That Require Pay Stubs</h2>
      <p>The following states require employers to provide employees with a written or electronic earnings statement each pay period:</p>
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', fontFamily: 'Arial, sans-serif' }}>
          <thead>
            <tr style={{ background: '#2d5f8a', color: '#fff' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left' }}>State</th>
              <th style={{ padding: '10px 12px', textAlign: 'left' }}>Requirement</th>
              <th style={{ padding: '10px 12px', textAlign: 'left' }}>Notable</th>
            </tr>
          </thead>
          <tbody>
            {states.map((row, i) => (
              <tr key={row.state} style={{ background: i % 2 === 0 ? '#f9f9f9' : '#fff', borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '9px 12px', fontWeight: 'bold' }}>{row.state}</td>
                <td style={{ padding: '9px 12px' }}>{row.requirement}</td>
                <td style={{ padding: '9px 12px', color: '#555' }}>{row.notable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>States With No Pay Stub Law</h2>
      <p>These states have no specific state law requiring employers to provide pay stubs (federal FLSA recordkeeping requirements still apply):</p>
      <p style={{ fontFamily: 'Arial, sans-serif', background: '#f5f5f5', padding: '12px 16px', borderRadius: '6px', fontSize: '13px' }}>
        Alabama · Arkansas · Florida · Georgia · Louisiana · Mississippi · Ohio · South Carolina · Tennessee (no specific format required) · Virginia (written statement required only if requested)
      </p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>What Must Be Included on a Pay Stub?</h2>
      <p>While requirements vary by state, a comprehensive pay stub should include the following to meet all state requirements:</p>
      <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
        <li>Employee name and last 4 digits of SSN</li>
        <li>Employer name and address</li>
        <li>Pay period begin and end dates</li>
        <li>Pay date</li>
        <li>Gross wages (before deductions)</li>
        <li>Hours worked (for hourly employees)</li>
        <li>Hourly pay rate</li>
        <li>All deductions itemized separately (federal tax, state tax, FICA, benefits)</li>
        <li>Net wages (take-home pay)</li>
        <li>Year-to-date totals for wages and deductions</li>
      </ul>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>California — The Strictest Pay Stub State</h2>
      <p>California has the most detailed pay stub requirements in the nation under California Labor Code Section 226. Every pay stub must include:</p>
      <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
        <li>Gross wages earned</li>
        <li>Total hours worked (for non-exempt employees)</li>
        <li>All deductions (each listed separately)</li>
        <li>Net wages earned</li>
        <li>Inclusive dates of the pay period</li>
        <li>Employee name and last 4 digits of SSN</li>
        <li>Name and address of the employer</li>
        <li>All applicable hourly rates and hours worked at each rate</li>
        <li>For piece-rate workers: total piece-rate units earned and the applicable piece rate</li>
      </ul>
      <p>California employers who fail to provide compliant pay stubs face penalties of $50 per employee per initial violation and $100 per employee for each subsequent violation, up to $4,000 per employee.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>Electronic vs. Paper Pay Stubs</h2>
      <p>Most states now allow electronic pay stubs (email, employee portal, PDF) as long as employees can access them easily. Some states require employee consent before switching to electronic delivery. California, for example, requires employees to affirmatively consent to electronic-only pay stubs.</p>

      <div style={{ background: '#f0faf0', border: '1px solid #2ca01c', borderRadius: '8px', padding: '24px', marginTop: '40px' }}>
        <h3 style={{ fontFamily: 'Arial, sans-serif', marginTop: 0 }}>Create Compliant Pay Stubs for Any State</h3>
        <p style={{ marginBottom: '16px' }}>Our generator automatically calculates the correct state taxes for all 50 states and includes all required fields. Free preview, $5 to download.</p>
        <Link href="/generate" style={{ display: 'inline-block', padding: '12px 28px', background: '#2ca01c', color: '#fff', borderRadius: '6px', fontWeight: 'bold', textDecoration: 'none', fontFamily: 'Arial, sans-serif' }}>
          Generate Pay Stub →
        </Link>
      </div>
    </div>
  );
}
