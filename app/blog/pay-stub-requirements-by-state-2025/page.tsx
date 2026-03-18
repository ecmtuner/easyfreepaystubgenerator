import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pay Stub Requirements by State (2025) | EasyFreePayStubGenerator.com',
  description: 'Pay stub laws vary by state. Here\'s what employers must provide in California, Texas, New York, Florida, and more — plus what to do if you\'re self-employed.',
};

export default function Page() {
  return (
    <div style={{ maxWidth: '780px', margin: '0 auto', padding: '40px 20px', fontFamily: 'Georgia, serif', color: '#1a1a1a', lineHeight: '1.8' }}>
      <div style={{ marginBottom: '12px' }}>
        <Link href="/blog" style={{ color: '#2ca01c', fontSize: '14px', textDecoration: 'none' }}>← Back to Blog</Link>
      </div>
      <h1 style={{ fontSize: '34px', fontWeight: 'bold', lineHeight: '1.3', marginBottom: '8px', fontFamily: 'Arial, sans-serif' }}>
        Pay Stub Requirements by State (2025)
      </h1>
      <p style={{ color: '#888', fontSize: '13px', fontFamily: 'Arial, sans-serif', marginBottom: '32px' }}>March 2025 · 8 min read</p>

      <p>Not every employer is required to give you a pay stub — but most are, and the specifics depend entirely on what state you're in. For employees, knowing your rights matters. For employers and self-employed workers, knowing what you're required to provide (or what documentation you'll need) is equally important.</p>
      <p>Here's a breakdown of pay stub requirements in the 10 most populous US states.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>How State Pay Stub Laws Work</h2>
      <p>States fall into three general categories:</p>
      <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
        <li><strong>Access states:</strong> Employers must provide pay stubs, either on paper or electronically</li>
        <li><strong>Opt-out states:</strong> Employers must provide pay stubs unless the employee opts out</li>
        <li><strong>No requirement states:</strong> No state law requires employers to provide pay stubs (though federal law still requires accurate payroll records)</li>
      </ul>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>California</h2>
      <p><strong>Requirement: Yes — written or printed stub required</strong></p>
      <p>California has some of the strictest pay stub laws in the country. Employers must provide an itemized written statement with every paycheck. Required fields include:</p>
      <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
        <li>Gross wages earned</li>
        <li>Total hours worked (hourly employees)</li>
        <li>All deductions</li>
        <li>Net wages earned</li>
        <li>Pay period dates</li>
        <li>Employee name and last 4 of SSN</li>
        <li>Employer name and address</li>
        <li>Hourly rates in effect and hours worked at each rate</li>
      </ul>
      <p>California also has a private right of action — employees can sue for pay stub violations. The penalties are real.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>Texas</h2>
      <p><strong>Requirement: Yes — employers must provide earnings statements</strong></p>
      <p>Texas requires employers to give employees an earnings statement each payday, showing gross pay and deductions. It can be electronic with employee consent. Self-employed workers in Texas have no specific requirement imposed on them but regularly need pay documentation for apartment applications and loans.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>New York</h2>
      <p><strong>Requirement: Yes — detailed wage statements required</strong></p>
      <p>New York requires employers to provide a pay stub each payday. It must include gross wages, deductions, and net wages. New York City has additional wage theft prevention requirements that add extra documentation for employers.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>Florida</h2>
      <p><strong>Requirement: No state law requiring pay stubs</strong></p>
      <p>Florida has no specific law requiring employers to provide pay stubs, but most do as a matter of standard practice. Employers are still required to keep accurate payroll records. For self-employed workers in Florida, creating your own pay documentation is the only way to prove income.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>Illinois</h2>
      <p><strong>Requirement: Yes — earnings statements required</strong></p>
      <p>Illinois employers must provide employees with an itemized statement of earnings and deductions each pay period. This can be electronic with employee consent. The Illinois Wage Payment and Collection Act governs this requirement.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>Pennsylvania</h2>
      <p><strong>Requirement: No state mandate for pay stubs</strong></p>
      <p>Like Florida, Pennsylvania has no state law requiring pay stub issuance. Federal recordkeeping requirements still apply to employers. Employees and freelancers often need to create their own documentation for income verification purposes.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>Ohio</h2>
      <p><strong>Requirement: Yes — written itemized statement required</strong></p>
      <p>Ohio employers must give employees a written or printed pay statement. It must show gross wages, deductions, and net wages. Electronic pay stubs are acceptable with employee agreement.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>Georgia</h2>
      <p><strong>Requirement: No state mandate</strong></p>
      <p>Georgia doesn't require employers to provide pay stubs under state law. Standard practice varies widely by employer size. If you're a freelancer or self-employed in Georgia and need income documentation, you'll need to generate your own.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>North Carolina</h2>
      <p><strong>Requirement: Yes — wage payment statement required</strong></p>
      <p>North Carolina requires employers to provide a wage payment statement showing gross wages and deductions. This can be provided electronically. The NC Wage and Hour Act covers these requirements.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>Michigan</h2>
      <p><strong>Requirement: Yes — itemized statement required</strong></p>
      <p>Michigan employers must provide an itemized statement of wages and deductions with each paycheck. The Michigan Payment of Wages and Fringe Benefits Act governs this.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>What If You're Self-Employed or a Freelancer?</h2>
      <p>None of the above requirements apply to self-employed individuals — you're your own employer. But that doesn't mean you don't need pay documentation. Landlords, banks, and lenders frequently require proof of income, and a pay stub is one of the most recognized forms.</p>
      <p>The solution is to create your own. A pay stub generator designed for freelancers lets you document your income accurately and professionally, even if no employer is cutting you a check.</p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '36px', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>What Should Every Pay Stub Include (Regardless of State)?</h2>
      <p>Even in states with no mandated format, a complete pay stub should have:</p>
      <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
        <li>Employee and employer names/addresses</li>
        <li>Pay period and pay date</li>
        <li>Gross earnings</li>
        <li>All deductions itemized</li>
        <li>Net pay</li>
        <li>Year-to-date totals</li>
      </ul>

      <div style={{ background: '#f0faf0', border: '1px solid #2ca01c', borderRadius: '8px', padding: '24px', marginTop: '40px' }}>
        <h3 style={{ fontFamily: 'Arial, sans-serif', marginTop: 0 }}>Create Your Pay Stub Now — Free Preview</h3>
        <p style={{ marginBottom: '16px' }}>Need a pay stub that meets documentation standards? EasyFreePayStubGenerator.com creates accurate, professional pay stubs for employees, freelancers, and small businesses. Free preview, $5 to download.</p>
        <Link href="/generate" style={{ display: 'inline-block', padding: '12px 28px', background: '#2ca01c', color: '#fff', borderRadius: '6px', fontWeight: 'bold', textDecoration: 'none', fontFamily: 'Arial, sans-serif' }}>
          Create Free Pay Stub →
        </Link>
      </div>
    </div>
  );
}
