'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const fd = (d: string) => {
  if (!d) return '';
  const p = d.split('-');
  return p.length === 3 ? `${p[1]}/${p[2]}/${p[0]}` : d;
};
const fmt = (v: unknown) =>
  Number(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const n = (v: unknown) => Number(v) || 0;

function DownloadInner() {
  const params = useSearchParams();
  const token = params.get('token');
  const mock = params.get('mock');
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) { setError('No token found.'); return; }
    const raw = sessionStorage.getItem(`stub_${token}`);
    if (!raw) { setError('Session expired. Please generate a new stub.'); return; }
    try { setData(JSON.parse(raw)); sessionStorage.removeItem(`stub_${token}`); }
    catch { setError('Could not load stub data.'); }
  }, [token]);

  if (error) return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ background: '#fff', padding: '36px', borderRadius: '10px', border: '1px solid #ddd', textAlign: 'center', maxWidth: 380 }}>
        <div style={{ fontSize: '36px', marginBottom: '10px' }}>⚠️</div>
        <div style={{ fontWeight: 'bold', fontSize: '17px', marginBottom: '8px' }}>Session Expired</div>
        <div style={{ color: '#666', fontSize: '13px', marginBottom: '22px' }}>{error}</div>
        <a href="/generate" style={{ padding: '11px 24px', background: '#2ca01c', color: '#fff', borderRadius: '6px', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px' }}>← New Pay Stub</a>
      </div>
    </div>
  );

  if (!data) return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif', color: '#666' }}>
      Loading your pay stub...
    </div>
  );

  const {
    form: rawForm, grossPay, regularPay, overtimePay,
    federalTax, stateTax, socialSecurity, medicare,
    health, dental, vision, retirement, other1, other2,
    netPay, ytdGross, ytdFederal, ytdState, ytdSS, ytdMedicare,
    ytdHealth, ytdDental, ytdVision, ytdRetirement, ytdOther1, ytdOther2,
    ytdNet, ytdPeriods,
  } = data as Record<string, unknown>;

  const fm = rawForm as Record<string, string>;
  const rate = parseFloat(fm.payRate) || 0;
  const otRate = parseFloat(fm.overtimeRate) || rate * 1.5;
  const ytdP = n(ytdPeriods);

  const totalTaxes = n(federalTax) + n(stateTax) + n(socialSecurity) + n(medicare);
  const ytdTotalTaxes = n(ytdFederal) + n(ytdState) + n(ytdSS) + n(ytdMedicare);
  const totalBenefits = n(health) + n(dental) + n(vision) + n(retirement) + n(other1) + n(other2);
  const ytdTotalBenefits = n(ytdHealth) + n(ytdDental) + n(ytdVision) + n(ytdRetirement) + n(ytdOther1) + n(ytdOther2);
  const totalDeductions = totalTaxes + totalBenefits;
  const ytdTotalDeductions = ytdTotalTaxes + ytdTotalBenefits;

  const checkNum = fm.checkNumber || String(Math.floor(10000 + Math.random() * 89999));
  const coAddr2 = [fm.companyCity, fm.companyState].filter(Boolean).join(', ') + (fm.companyZip ? ' ' + fm.companyZip : '');
  const empAddr2 = [fm.employeeCity, fm.employeeState].filter(Boolean).join(', ') + (fm.employeeZip ? ' ' + fm.employeeZip : '');

  // accent color - professional blue matching 123paystubs style
  const ACCENT = '#2d5f8a';
  const ACCENT_LIGHT = '#e8f0f7';
  const ACCENT_DARK = '#1a3d5c';

  const tblStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '11px',
  };

  const thStyle = (right?: boolean): React.CSSProperties => ({
    padding: '5px 8px',
    textAlign: right ? 'right' : 'left',
    fontWeight: 'bold',
    fontSize: '9.5px',
    color: '#fff',
    background: ACCENT,
    borderRight: right ? undefined : '1px solid rgba(255,255,255,0.15)',
    whiteSpace: 'nowrap' as const,
  });

  const tdStyle = (right?: boolean, bold?: boolean, shade?: boolean): React.CSSProperties => ({
    padding: '5px 8px',
    textAlign: right ? 'right' : 'left',
    fontWeight: bold ? 'bold' : 'normal',
    background: shade ? '#f7fafd' : '#fff',
    borderBottom: '1px solid #eef0f2',
    borderRight: right ? undefined : '1px solid #eef0f2',
  });

  const totalStyle = (right?: boolean): React.CSSProperties => ({
    padding: '5px 8px',
    textAlign: right ? 'right' : 'left',
    fontWeight: 'bold',
    background: ACCENT_LIGHT,
    borderTop: `2px solid ${ACCENT}`,
    borderBottom: `1px solid ${ACCENT}`,
  });

  const deductRows = [
    ...(n(retirement) > 0 ? [['401(k) Contribution', retirement, ytdRetirement]] : []),
    ...(n(health) > 0 ? [['Medical Insurance', health, ytdHealth]] : []),
    ...(n(dental) > 0 ? [['Dental Insurance', dental, ytdDental]] : []),
    ...(n(vision) > 0 ? [['Vision Insurance', vision, ytdVision]] : []),
    ...(n(other1) > 0 ? [[fm.otherDeduction1Name || 'Other Deduction', other1, ytdOther1]] : []),
    ...(n(other2) > 0 ? [[fm.otherDeduction2Name || 'Other Deduction 2', other2, ytdOther2]] : []),
  ] as [string, unknown, unknown][];

  return (
    <div style={{ background: '#e8ecf0', minHeight: '100vh', padding: '24px 12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; margin: 0 !important; }
          @page { margin: 0.45in; size: letter portrait; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .stub-doc { box-shadow: none !important; max-width: 100% !important; }
        }
        .stub-doc { max-width: 760px; margin: 0 auto; }
      `}</style>

      {/* ── Action bar ── */}
      <div className="no-print" style={{ maxWidth: '760px', margin: '0 auto 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#1a1a1a' }}>{mock ? '📋 Preview Mode' : '✅ Your Pay Stub is Ready'}</div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '3px' }}>Ctrl+P / Cmd+P → "Save as PDF" to download</div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => window.print()} style={{ padding: '10px 22px', background: '#2ca01c', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
            🖨️ Print / Save PDF
          </button>
          <a href="/generate" style={{ padding: '10px 16px', background: '#fff', color: '#444', border: '1px solid #ccc', borderRadius: '6px', fontWeight: '500', textDecoration: 'none', fontSize: '13px' }}>
            + New Stub
          </a>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          PAY STUB DOCUMENT
      ═══════════════════════════════════════ */}
      <div className="stub-doc" style={{
        background: '#fff',
        border: `1px solid #c8d4de`,
        borderTop: `4px solid ${ACCENT}`,
        borderRadius: '2px',
        boxShadow: '0 3px 14px rgba(0,0,0,0.18)',
        overflow: 'hidden',
        fontSize: '11px',
        color: '#1a1a1a',
      }}>

        {/* ── COLORED HEADER BAND ── */}
        <div style={{ background: `linear-gradient(135deg, ${ACCENT_DARK} 0%, ${ACCENT} 100%)`, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {/* Company */}
          <div style={{ color: '#fff' }}>
            <div style={{ fontWeight: 'bold', fontSize: '16px', letterSpacing: '0.3px' }}>{fm.companyName || 'Company Name'}</div>
            {fm.companyAddress && <div style={{ fontSize: '11px', color: '#b8d0e8', marginTop: '3px' }}>{fm.companyAddress}</div>}
            {coAddr2 && <div style={{ fontSize: '11px', color: '#b8d0e8' }}>{coAddr2}</div>}
            {fm.ein && <div style={{ fontSize: '10px', color: '#8ab8d8', marginTop: '2px' }}>EIN: {fm.ein}</div>}
          </div>
          {/* Pay stub title + period */}
          <div style={{ textAlign: 'right', color: '#fff' }}>
            <div style={{ fontWeight: 'bold', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', color: '#fff' }}>Pay Stub</div>
            <div style={{ fontSize: '10px', color: '#b8d0e8', marginTop: '4px' }}>
              Period: {fd(fm.periodStart)} – {fd(fm.periodEnd)}
            </div>
            <div style={{ fontSize: '10px', color: '#b8d0e8' }}>
              Pay Date: <span style={{ color: '#fff', fontWeight: 'bold' }}>{fd(fm.payDate)}</span>
            </div>
            <div style={{ fontSize: '10px', color: '#b8d0e8' }}>
              Check No.: <span style={{ color: '#fff', fontWeight: 'bold' }}>{checkNum}</span>
            </div>
          </div>
        </div>

        {/* ── EMPLOYEE + EMPLOYER INFO ROW ── */}
        <div style={{ background: ACCENT_LIGHT, borderBottom: `1px solid #c8d4de`, padding: '10px 18px', display: 'flex', gap: '32px', flexWrap: 'wrap', fontSize: '10.5px' }}>
          {/* Employee */}
          <div style={{ minWidth: '180px' }}>
            <div style={{ fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.8px', color: ACCENT, marginBottom: '3px' }}>Employee</div>
            <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#111' }}>{fm.employeeName || '—'}</div>
            {fm.employeeAddress && <div style={{ color: '#444' }}>{fm.employeeAddress}</div>}
            {empAddr2 && <div style={{ color: '#444' }}>{empAddr2}</div>}
            <div style={{ marginTop: '3px' }}><span style={{ color: '#777' }}>SSN: </span><span style={{ fontWeight: 'bold' }}>{fm.ssn ? `XXX-XX-${fm.ssn}` : 'XXX-XX-XXXX'}</span></div>
          </div>
          {/* Employment details */}
          <div style={{ minWidth: '160px' }}>
            <div style={{ fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.8px', color: ACCENT, marginBottom: '3px' }}>Employment</div>
            {fm.jobTitle && <div><span style={{ color: '#777' }}>Title: </span><span style={{ fontWeight: 'bold' }}>{fm.jobTitle}</span></div>}
            {fm.department && <div><span style={{ color: '#777' }}>Department: </span><span style={{ fontWeight: 'bold' }}>{fm.department}</span></div>}
            {fm.employeeId && <div><span style={{ color: '#777' }}>ID: </span><span style={{ fontWeight: 'bold' }}>{fm.employeeId}</span></div>}
            <div><span style={{ color: '#777' }}>Frequency: </span><span style={{ fontWeight: 'bold' }}>{fm.payPeriod || 'Bi-Weekly'}</span></div>
          </div>
          {/* Pay info */}
          <div style={{ minWidth: '160px' }}>
            <div style={{ fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.8px', color: ACCENT, marginBottom: '3px' }}>Pay Info</div>
            <div><span style={{ color: '#777' }}>Pay Type: </span><span style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{fm.rateType || 'Hourly'}</span></div>
            {fm.rateType === 'hourly' && <div><span style={{ color: '#777' }}>Pay Rate: </span><span style={{ fontWeight: 'bold' }}>${rate.toFixed(2)}/hr</span></div>}
            <div><span style={{ color: '#777' }}>Filing Status: </span><span style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{fm.federalFiling || 'Single'}</span></div>
            <div><span style={{ color: '#777' }}>Allowances: </span><span style={{ fontWeight: 'bold' }}>{fm.federalAllowances || '0'}</span></div>
          </div>
        </div>

        {/* ── MAIN TWO-COLUMN BODY ── */}
        <div style={{ display: 'flex', alignItems: 'stretch' }}>

          {/* LEFT COLUMN */}
          <div style={{ flex: '0 0 52%', borderRight: `1px solid #dce4ec` }}>

            {/* Earnings header */}
            <div style={{ background: ACCENT, padding: '6px 8px 5px 10px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Earnings</span>
              <div style={{ display: 'flex', gap: '48px' }}>
                <span style={{ color: '#cde0f0', fontSize: '9.5px', fontWeight: 'bold', textTransform: 'uppercase' }}>This Period</span>
                <span style={{ color: '#cde0f0', fontSize: '9.5px', fontWeight: 'bold', textTransform: 'uppercase' }}>YTD</span>
              </div>
            </div>

            {/* Earnings rows */}
            <div style={{ fontSize: '11px' }}>
              {/* Regular pay row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', borderBottom: '1px solid #eef1f4', background: '#fff' }}>
                <div style={{ flex: '1' }}>
                  <div style={{ fontWeight: '600' }}>Regular Pay</div>
                  {fm.rateType === 'hourly' && (
                    <div style={{ fontSize: '9.5px', color: '#888', marginTop: '1px' }}>
                      {parseFloat(fm.hoursWorked || '0').toFixed(2)} hrs × ${rate.toFixed(2)}/hr
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '24px', minWidth: '130px', justifyContent: 'flex-end' }}>
                  <span style={{ minWidth: '60px', textAlign: 'right', fontWeight: '600' }}>${fmt(regularPay)}</span>
                  <span style={{ minWidth: '60px', textAlign: 'right', color: '#555' }}>${fmt(n(regularPay) * ytdP)}</span>
                </div>
              </div>
              {/* Overtime row */}
              {n(overtimePay) > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', borderBottom: '1px solid #eef1f4', background: '#fafcfe' }}>
                  <div style={{ flex: '1' }}>
                    <div style={{ fontWeight: '600' }}>Overtime (1.5x)</div>
                    <div style={{ fontSize: '9.5px', color: '#888', marginTop: '1px' }}>
                      {parseFloat(fm.overtimeHours || '0').toFixed(2)} hrs × ${otRate.toFixed(2)}/hr
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '24px', minWidth: '130px', justifyContent: 'flex-end' }}>
                    <span style={{ minWidth: '60px', textAlign: 'right', fontWeight: '600' }}>${fmt(overtimePay)}</span>
                    <span style={{ minWidth: '60px', textAlign: 'right', color: '#555' }}>${fmt(n(overtimePay) * ytdP)}</span>
                  </div>
                </div>
              )}
              {/* Gross total */}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: ACCENT_LIGHT, borderBottom: `1px solid ${ACCENT}`, borderTop: `1px solid ${ACCENT}` }}>
                <span style={{ fontWeight: 'bold' }}>Gross Pay</span>
                <div style={{ display: 'flex', gap: '24px', minWidth: '130px', justifyContent: 'flex-end' }}>
                  <span style={{ minWidth: '60px', textAlign: 'right', fontWeight: 'bold' }}>${fmt(grossPay)}</span>
                  <span style={{ minWidth: '60px', textAlign: 'right', fontWeight: 'bold' }}>${fmt(ytdGross)}</span>
                </div>
              </div>
            </div>

            {/* Withholding / Tax Info */}
            <div style={{ background: ACCENT, padding: '6px 8px 5px 10px', marginTop: '1px' }}>
              <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Tax Withholding Info</span>
            </div>
            <table style={tblStyle}>
              <thead>
                <tr>
                  <th style={{ ...thStyle(), background: '#4a7aa8', fontSize: '9px' }}></th>
                  <th style={{ ...thStyle(true), background: '#4a7aa8', fontSize: '9px', textAlign: 'center' }}>Federal</th>
                  <th style={{ ...thStyle(true), background: '#4a7aa8', fontSize: '9px', textAlign: 'center' }}>{fm.stateCode || 'State'}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdStyle()}>Filing Status</td>
                  <td style={{ ...tdStyle(true), textAlign: 'center', textTransform: 'capitalize' }}>{fm.federalFiling || 'Single'}</td>
                  <td style={{ ...tdStyle(true), textAlign: 'center', textTransform: 'capitalize' }}>{fm.federalFiling || 'Single'}</td>
                </tr>
                <tr>
                  <td style={tdStyle(false, false, true)}>Allowances</td>
                  <td style={{ ...tdStyle(true, false, true), textAlign: 'center' }}>{fm.federalAllowances || '0'}</td>
                  <td style={{ ...tdStyle(true, false, true), textAlign: 'center' }}>{fm.stateAllowances || '0'}</td>
                </tr>
                {n(fm.additionalFederal) > 0 && (
                  <tr>
                    <td style={tdStyle()}>Addl Withholding</td>
                    <td style={{ ...tdStyle(true), textAlign: 'center' }}>${parseFloat(fm.additionalFederal).toFixed(2)}</td>
                    <td style={{ ...tdStyle(true), textAlign: 'center' }}>—</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Leave Balances */}
            <div style={{ background: ACCENT, padding: '6px 8px 5px 10px', marginTop: '1px' }}>
              <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Leave Balances</span>
            </div>
            <table style={tblStyle}>
              <thead>
                <tr>
                  <th style={thStyle()}>Type</th>
                  <th style={{ ...thStyle(true), textAlign: 'center' }}>Used</th>
                  <th style={{ ...thStyle(true), textAlign: 'center' }}>Available</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdStyle()}>Vacation</td>
                  <td style={{ ...tdStyle(true), textAlign: 'center' }}>{fm.vacationHoursUsed || '0'} hrs</td>
                  <td style={{ ...tdStyle(true), textAlign: 'center', fontWeight: 'bold' }}>{fm.vacationHoursBalance || '0'} hrs</td>
                </tr>
                <tr>
                  <td style={tdStyle(false, false, true)}>Sick Time</td>
                  <td style={{ ...tdStyle(true, false, true), textAlign: 'center' }}>{fm.sickHoursUsed || '0'} hrs</td>
                  <td style={{ ...tdStyle(true, false, true), textAlign: 'center', fontWeight: 'bold' }}>{fm.sickHoursBalance || '0'} hrs</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>

            {/* Taxes */}
            <div style={{ background: ACCENT, padding: '6px 8px 5px 10px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Employee Taxes</span>
              <div style={{ display: 'flex', gap: '24px' }}>
                <span style={{ color: '#cde0f0', fontSize: '9.5px', fontWeight: 'bold', textTransform: 'uppercase' }}>This Period</span>
                <span style={{ color: '#cde0f0', fontSize: '9.5px', fontWeight: 'bold', textTransform: 'uppercase' }}>YTD</span>
              </div>
            </div>
            <div style={{ fontSize: '11px' }}>
              {([
                ['Federal Income Tax', federalTax, ytdFederal],
                ['Social Security (6.2%)', socialSecurity, ytdSS],
                ['Medicare (1.45%)', medicare, ytdMedicare],
                [`${fm.stateCode || 'State'} Income Tax`, stateTax, ytdState],
              ] as [string, unknown, unknown][]).map(([label, curr, ytd], i) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 10px', borderBottom: '1px solid #eef1f4', background: i % 2 === 1 ? '#fafcfe' : '#fff' }}>
                  <span style={{ flex: 1 }}>{label}</span>
                  <div style={{ display: 'flex', gap: '16px', minWidth: '120px', justifyContent: 'flex-end' }}>
                    <span style={{ minWidth: '52px', textAlign: 'right' }}>${fmt(curr)}</span>
                    <span style={{ minWidth: '52px', textAlign: 'right', color: '#555' }}>${fmt(ytd)}</span>
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 10px', background: ACCENT_LIGHT, borderTop: `1px solid ${ACCENT}`, borderBottom: `1px solid ${ACCENT}` }}>
                <span style={{ fontWeight: 'bold' }}>Total Employee Taxes</span>
                <div style={{ display: 'flex', gap: '16px', minWidth: '120px', justifyContent: 'flex-end' }}>
                  <span style={{ minWidth: '52px', textAlign: 'right', fontWeight: 'bold' }}>${totalTaxes.toFixed(2)}</span>
                  <span style={{ minWidth: '52px', textAlign: 'right', fontWeight: 'bold' }}>${ytdTotalTaxes.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Deductions */}
            {deductRows.length > 0 && (
              <>
                <div style={{ background: ACCENT, padding: '6px 8px 5px 10px', marginTop: '1px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Employee Deductions</span>
                  <div style={{ display: 'flex', gap: '24px' }}>
                    <span style={{ color: '#cde0f0', fontSize: '9.5px', fontWeight: 'bold', textTransform: 'uppercase' }}>This Period</span>
                    <span style={{ color: '#cde0f0', fontSize: '9.5px', fontWeight: 'bold', textTransform: 'uppercase' }}>YTD</span>
                  </div>
                </div>
                <div style={{ fontSize: '11px' }}>
                  {deductRows.map(([label, curr, ytd], i) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 10px', borderBottom: '1px solid #eef1f4', background: i % 2 === 1 ? '#fafcfe' : '#fff' }}>
                      <span style={{ flex: 1 }}>{label}</span>
                      <div style={{ display: 'flex', gap: '16px', minWidth: '120px', justifyContent: 'flex-end' }}>
                        <span style={{ minWidth: '52px', textAlign: 'right' }}>${fmt(curr)}</span>
                        <span style={{ minWidth: '52px', textAlign: 'right', color: '#555' }}>${fmt(ytd)}</span>
                      </div>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 10px', background: ACCENT_LIGHT, borderTop: `1px solid ${ACCENT}`, borderBottom: `1px solid ${ACCENT}` }}>
                    <span style={{ fontWeight: 'bold' }}>Total Deductions</span>
                    <div style={{ display: 'flex', gap: '16px', minWidth: '120px', justifyContent: 'flex-end' }}>
                      <span style={{ minWidth: '52px', textAlign: 'right', fontWeight: 'bold' }}>${totalBenefits.toFixed(2)}</span>
                      <span style={{ minWidth: '52px', textAlign: 'right', fontWeight: 'bold' }}>${ytdTotalBenefits.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* NET PAY — pushed to bottom */}
            <div style={{ marginTop: 'auto' }}>
              {/* Summary table */}
              <div style={{ borderTop: `2px solid ${ACCENT}`, background: '#f0f4f8', padding: '6px 10px', fontSize: '11px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                  <span style={{ color: '#555' }}>Gross Pay</span>
                  <div style={{ display: 'flex', gap: '16px', minWidth: '120px', justifyContent: 'flex-end' }}>
                    <span style={{ minWidth: '52px', textAlign: 'right' }}>${fmt(grossPay)}</span>
                    <span style={{ minWidth: '52px', textAlign: 'right', color: '#555' }}>${fmt(ytdGross)}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                  <span style={{ color: '#555' }}>Total Taxes</span>
                  <div style={{ display: 'flex', gap: '16px', minWidth: '120px', justifyContent: 'flex-end' }}>
                    <span style={{ minWidth: '52px', textAlign: 'right', color: '#c0392b' }}>–${totalTaxes.toFixed(2)}</span>
                    <span style={{ minWidth: '52px', textAlign: 'right', color: '#c0392b' }}>–${ytdTotalTaxes.toFixed(2)}</span>
                  </div>
                </div>
                {totalBenefits > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                    <span style={{ color: '#555' }}>Total Deductions</span>
                    <div style={{ display: 'flex', gap: '16px', minWidth: '120px', justifyContent: 'flex-end' }}>
                      <span style={{ minWidth: '52px', textAlign: 'right', color: '#c0392b' }}>–${totalBenefits.toFixed(2)}</span>
                      <span style={{ minWidth: '52px', textAlign: 'right', color: '#c0392b' }}>–${ytdTotalBenefits.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
              {/* Net Pay box */}
              <div style={{ background: `linear-gradient(135deg, ${ACCENT_DARK} 0%, ${ACCENT} 100%)`, padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: '#fff' }}>
                  <div style={{ fontSize: '9px', color: '#b8d0e8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>Net Pay This Period</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '-0.5px', color: '#fff' }}>${fmt(netPay)}</div>
                </div>
                <div style={{ textAlign: 'right', color: '#fff' }}>
                  <div style={{ fontSize: '9px', color: '#b8d0e8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>YTD Net Pay</div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>${fmt(ytdNet)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div style={{ background: '#f7f9fb', borderTop: '1px solid #dce4ec', padding: '6px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '8.5px', color: '#999' }}>
          <span>This document is for income verification and record-keeping purposes only. Not an official employer payroll document.</span>
          <span style={{ whiteSpace: 'nowrap', marginLeft: '10px' }}>EasyFreePayStubGenerator.com</span>
        </div>
      </div>

      {/* Upsell */}
      <div className="no-print" style={{ maxWidth: '760px', margin: '16px auto 0', background: '#fff', border: '1px solid #dce4ec', borderRadius: '8px', padding: '12px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Need to invoice clients?</div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>InvoiceBuddy — professional invoicing for contractors and the trades.</div>
        </div>
        <a href="https://invoicebuddy.com" target="_blank" rel="noopener noreferrer"
          style={{ padding: '9px 20px', background: '#2563eb', color: '#fff', borderRadius: '6px', fontWeight: 'bold', textDecoration: 'none', fontSize: '13px', whiteSpace: 'nowrap' }}>
          Try Free →
        </a>
      </div>
    </div>
  );
}

export default function DownloadPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontFamily: 'Arial' }}>Loading...</div>}>
      <DownloadInner />
    </Suspense>
  );
}