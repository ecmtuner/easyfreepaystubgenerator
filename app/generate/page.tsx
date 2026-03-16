'use client';
import { useState } from 'react';
import Link from 'next/link';

const PAY_PERIODS = ['Weekly', 'Bi-Weekly', 'Semi-Monthly', 'Monthly'];
const STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
const PERIOD_MULTIPLIERS: Record<string, number> = { Weekly: 52, 'Bi-Weekly': 26, 'Semi-Monthly': 24, Monthly: 12 };

// Federal tax using correct annualization per pay period
function calcFederalTax(gross: number, filing: string, payPeriod: string): number {
  const mult = PERIOD_MULTIPLIERS[payPeriod] || 26;
  const annual = gross * mult;
  let tax = 0;
  if (filing === 'single' || filing === 'head') {
    if (annual <= 11600) tax = annual * 0.10;
    else if (annual <= 47150) tax = 1160 + (annual - 11600) * 0.12;
    else if (annual <= 100525) tax = 5426 + (annual - 47150) * 0.22;
    else if (annual <= 191950) tax = 17168 + (annual - 100525) * 0.24;
    else if (annual <= 243725) tax = 39110 + (annual - 191950) * 0.32;
    else if (annual <= 609350) tax = 55678 + (annual - 243725) * 0.35;
    else tax = 183647 + (annual - 609350) * 0.37;
  } else {
    if (annual <= 23200) tax = annual * 0.10;
    else if (annual <= 94300) tax = 2320 + (annual - 23200) * 0.12;
    else if (annual <= 201050) tax = 10852 + (annual - 94300) * 0.22;
    else if (annual <= 383900) tax = 34337 + (annual - 201050) * 0.24;
    else if (annual <= 487450) tax = 78221 + (annual - 383900) * 0.32;
    else if (annual <= 731200) tax = 111357 + (annual - 487450) * 0.35;
    else tax = 196669 + (annual - 731200) * 0.37;
  }
  return Math.max(0, tax / mult);
}

function calcStateTax(gross: number, state: string): number {
  const rates: Record<string, number> = {
    CA: 0.093, NY: 0.0685, NJ: 0.0637, MA: 0.05, IL: 0.0495,
    TX: 0, FL: 0, WA: 0, NV: 0, TN: 0, WY: 0, SD: 0, AK: 0, NH: 0,
    PA: 0.0307, OH: 0.0399, GA: 0.055, NC: 0.0525, VA: 0.0575,
    CO: 0.044, AZ: 0.025, MI: 0.0425, MN: 0.0985, OR: 0.099,
    CT: 0.065, MD: 0.0575, MO: 0.054, WI: 0.0765, SC: 0.07,
    AL: 0.05, KY: 0.045, LA: 0.042, AR: 0.049, OK: 0.05, KS: 0.057,
    MS: 0.05, ID: 0.058, UT: 0.0485, NE: 0.068, MT: 0.069, RI: 0.0599,
    ME: 0.075, ND: 0.029, HI: 0.11, VT: 0.0875, WV: 0.065, IA: 0.06,
    IN: 0.0323, DE: 0.066, NM: 0.049,
  };
  return gross * (rates[state] || 0.05);
}

// YTD multiplier based on pay date month
function ytdMultiplier(payDate: string, payPeriod: string): number {
  const month = new Date(payDate).getMonth() + 1 || 3;
  const mult = PERIOD_MULTIPLIERS[payPeriod] || 26;
  const periodsPerMonth = mult / 12;
  return Math.round(periodsPerMonth * month);
}

interface StubForm {
  // Employer
  companyName: string; companyAddress: string; companyCity: string; companyState: string; companyZip: string; ein: string;
  // Employee
  employeeName: string; employeeAddress: string; employeeCity: string; employeeState: string; employeeZip: string;
  ssn: string; employeeId: string; department: string; jobTitle: string;
  // Pay
  payPeriod: string; payDate: string; periodStart: string; periodEnd: string; checkNumber: string;
  payRate: string; rateType: 'hourly' | 'salary'; hoursWorked: string; overtimeHours: string; overtimeRate: string;
  vacationHoursUsed: string; vacationHoursBalance: string; sickHoursUsed: string; sickHoursBalance: string;
  // Deductions
  federalFiling: string; federalAllowances: string; stateCode: string; stateAllowances: string;
  additionalFederal: string; health: string; dental: string; vision: string; retirement401k: string;
  otherDeduction1Name: string; otherDeduction1Amount: string;
  otherDeduction2Name: string; otherDeduction2Amount: string;
  // YTD overrides (optional)
  ytdGrossOverride: string;
  // Template
  template: 'classic' | 'adp' | 'modern';
}

export default function GeneratePage() {
  const today = new Date().toISOString().split('T')[0];
  const [step, setStep] = useState(1);
  const [paying, setPaying] = useState(false);
  const [form, setForm] = useState<StubForm>({
    companyName: '', companyAddress: '', companyCity: '', companyState: 'NJ', companyZip: '', ein: '',
    employeeName: '', employeeAddress: '', employeeCity: '', employeeState: 'NJ', employeeZip: '',
    ssn: '', employeeId: '', department: '', jobTitle: '',
    payPeriod: 'Bi-Weekly', payDate: today, periodStart: today, periodEnd: today, checkNumber: '',
    payRate: '', rateType: 'hourly', hoursWorked: '80', overtimeHours: '0', overtimeRate: '',
    vacationHoursUsed: '0', vacationHoursBalance: '40', sickHoursUsed: '0', sickHoursBalance: '24',
    federalFiling: 'single', federalAllowances: '1', stateCode: 'NJ', stateAllowances: '1',
    additionalFederal: '0', health: '0', dental: '0', vision: '0', retirement401k: '0',
    otherDeduction1Name: '', otherDeduction1Amount: '0',
    otherDeduction2Name: '', otherDeduction2Amount: '0',
    ytdGrossOverride: '',
    template: 'adp',
  });

  const f = (k: keyof StubForm, v: string) => setForm(p => ({ ...p, [k]: v }));

  // Calculations
  const rate = parseFloat(form.payRate) || 0;
  const hours = parseFloat(form.hoursWorked) || 0;
  const otHours = parseFloat(form.overtimeHours) || 0;
  const otRate = parseFloat(form.overtimeRate) || rate * 1.5;
  const regularPay = form.rateType === 'hourly' ? rate * hours : rate;
  const overtimePay = form.rateType === 'hourly' ? otHours * otRate : 0;
  const grossPay = regularPay + overtimePay;
  const federalTax = calcFederalTax(grossPay, form.federalFiling, form.payPeriod) + (parseFloat(form.additionalFederal) || 0);
  const stateTax = calcStateTax(grossPay, form.stateCode);
  const socialSecurity = Math.min(grossPay * 0.062, 160200 / (PERIOD_MULTIPLIERS[form.payPeriod] || 26) * 0.062);
  const medicare = grossPay * 0.0145;
  const health = parseFloat(form.health) || 0;
  const dental = parseFloat(form.dental) || 0;
  const vision = parseFloat(form.vision) || 0;
  const retirement = parseFloat(form.retirement401k) || 0;
  const other1 = parseFloat(form.otherDeduction1Amount) || 0;
  const other2 = parseFloat(form.otherDeduction2Amount) || 0;
  const totalDeductions = federalTax + stateTax + socialSecurity + medicare + health + dental + vision + retirement + other1 + other2;
  const netPay = grossPay - totalDeductions;

  // YTD calculations
  const ytdPeriods = ytdMultiplier(form.payDate, form.payPeriod);
  const ytdGross = parseFloat(form.ytdGrossOverride) || grossPay * ytdPeriods;
  const ytdFederal = (federalTax / grossPay) * ytdGross || 0;
  const ytdState = (stateTax / grossPay) * ytdGross || 0;
  const ytdSS = Math.min((socialSecurity / grossPay) * ytdGross, 160200 * 0.062) || 0;
  const ytdMedicare = (medicare / grossPay) * ytdGross || 0;
  const ytdHealth = health * ytdPeriods;
  const ytdDental = dental * ytdPeriods;
  const ytdVision = vision * ytdPeriods;
  const ytdRetirement = retirement * ytdPeriods;
  const ytdOther1 = other1 * ytdPeriods;
  const ytdOther2 = other2 * ytdPeriods;
  const ytdTotalDeductions = ytdFederal + ytdState + ytdSS + ytdMedicare + ytdHealth + ytdDental + ytdVision + ytdRetirement + ytdOther1 + ytdOther2;
  const ytdNet = ytdGross - ytdTotalDeductions;

  const inp = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500 bg-white";
  const lbl = "text-xs text-gray-500 mb-1 block font-medium";
  const steps = ['Employer', 'Employee', 'Pay Info', 'Deductions', 'Preview & Pay'];

  const handleCheckout = async () => {
    setPaying(true);
    const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
    const stubData = {
      form, grossPay, regularPay, overtimePay, federalTax, stateTax, socialSecurity, medicare,
      health, dental, vision, retirement, other1, other2, totalDeductions, netPay,
      ytdGross, ytdFederal, ytdState, ytdSS, ytdMedicare, ytdHealth, ytdDental, ytdVision,
      ytdRetirement, ytdOther1, ytdOther2, ytdTotalDeductions, ytdNet, ytdPeriods,
    };
    sessionStorage.setItem(`stub_${token}`, JSON.stringify(stubData));
    const res = await fetch('/api/checkout', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stubToken: token }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else { alert('Payment error. Please try again.'); setPaying(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-gray-900">
            <span>💵</span> EasyFreePayStubGenerator.com
          </Link>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Free Preview · $5 to Download</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create Your Pay Stub</h1>
          <p className="text-gray-500 text-sm mt-1">Fill out free · Preview instantly · Pay $5 to download PDF</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-1">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-1">
              <button onClick={() => setStep(i + 1)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  step === i + 1 ? 'bg-green-600 text-white' : step > i + 1 ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'
                }`}>
                {step > i + 1 ? '✓ ' : `${i + 1}. `}{s}
              </button>
              {i < steps.length - 1 && <span className="text-gray-300 text-xs">›</span>}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

          {/* STEP 1 — Employer */}
          {step === 1 && (
            <div>
              <h2 className="font-bold text-gray-900 mb-5">Employer / Company Information</h2>

              {/* Template selector */}
              <div className="mb-6">
                <label className={lbl}>Pay Stub Template Style</label>
                <div className="grid grid-cols-3 gap-3">
                  {([['adp', '🏢 ADP Style', 'Most realistic, used by major companies'], ['classic', '📋 Classic', 'Traditional check stub format'], ['modern', '✨ Modern', 'Clean minimal design']] as const).map(([val, label, desc]) => (
                    <button key={val} onClick={() => f('template', val)}
                      className={`p-3 rounded-xl border-2 text-left transition-colors ${form.template === val ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className="font-semibold text-sm text-gray-900">{label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2"><label className={lbl}>Company Name *</label>
                  <input value={form.companyName} onChange={e => f('companyName', e.target.value)} placeholder="Acme Plumbing LLC" className={inp} /></div>
                <div className="sm:col-span-2"><label className={lbl}>Street Address</label>
                  <input value={form.companyAddress} onChange={e => f('companyAddress', e.target.value)} placeholder="123 Main St" className={inp} /></div>
                <div><label className={lbl}>City</label>
                  <input value={form.companyCity} onChange={e => f('companyCity', e.target.value)} placeholder="Lyndhurst" className={inp} /></div>
                <div className="grid grid-cols-2 gap-2">
                  <div><label className={lbl}>State</label>
                    <select value={form.companyState} onChange={e => f('companyState', e.target.value)} className={inp}>
                      {STATES.map(s => <option key={s}>{s}</option>)}</select></div>
                  <div><label className={lbl}>ZIP</label>
                    <input value={form.companyZip} onChange={e => f('companyZip', e.target.value)} placeholder="07071" className={inp} /></div>
                </div>
                <div><label className={lbl}>EIN (optional)</label>
                  <input value={form.ein} onChange={e => f('ein', e.target.value)} placeholder="XX-XXXXXXX" className={inp} /></div>
              </div>
            </div>
          )}

          {/* STEP 2 — Employee */}
          {step === 2 && (
            <div>
              <h2 className="font-bold text-gray-900 mb-5">Employee Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2"><label className={lbl}>Employee Full Name *</label>
                  <input value={form.employeeName} onChange={e => f('employeeName', e.target.value)} placeholder="John Smith" className={inp} /></div>
                <div className="sm:col-span-2"><label className={lbl}>Street Address</label>
                  <input value={form.employeeAddress} onChange={e => f('employeeAddress', e.target.value)} placeholder="456 Oak Ave" className={inp} /></div>
                <div><label className={lbl}>City</label>
                  <input value={form.employeeCity} onChange={e => f('employeeCity', e.target.value)} placeholder="Rutherford" className={inp} /></div>
                <div className="grid grid-cols-2 gap-2">
                  <div><label className={lbl}>State</label>
                    <select value={form.employeeState} onChange={e => f('employeeState', e.target.value)} className={inp}>
                      {STATES.map(s => <option key={s}>{s}</option>)}</select></div>
                  <div><label className={lbl}>ZIP</label>
                    <input value={form.employeeZip} onChange={e => f('employeeZip', e.target.value)} placeholder="07070" className={inp} /></div>
                </div>
                <div><label className={lbl}>SSN — Last 4 Digits Only</label>
                  <input
                    value={form.ssn}
                    onChange={e => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                      f('ssn', val);
                    }}
                    placeholder="1234"
                    maxLength={4}
                    inputMode="numeric"
                    className={inp}
                  />
                  <span className="text-xs text-gray-400 mt-0.5 block">Displayed as XXX-XX-1234 on the stub</span>
                </div>
                <div><label className={lbl}>Employee ID</label>
                  <input value={form.employeeId} onChange={e => f('employeeId', e.target.value)} placeholder="EMP001" className={inp} /></div>
                <div><label className={lbl}>Job Title (optional)</label>
                  <input value={form.jobTitle} onChange={e => f('jobTitle', e.target.value)} placeholder="Senior Plumber" className={inp} /></div>
                <div><label className={lbl}>Department (optional)</label>
                  <input value={form.department} onChange={e => f('department', e.target.value)} placeholder="Field Operations" className={inp} /></div>
              </div>
            </div>
          )}

          {/* STEP 3 — Pay Info */}
          {step === 3 && (
            <div>
              <h2 className="font-bold text-gray-900 mb-5">Pay Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={lbl}>Pay Period *</label>
                  <select value={form.payPeriod} onChange={e => f('payPeriod', e.target.value)} className={inp}>
                    {PAY_PERIODS.map(p => <option key={p}>{p}</option>)}</select></div>
                <div><label className={lbl}>Pay Date *</label>
                  <input type="date" value={form.payDate} onChange={e => f('payDate', e.target.value)} className={inp} /></div>
                <div><label className={lbl}>Period Start Date</label>
                  <input type="date" value={form.periodStart} onChange={e => f('periodStart', e.target.value)} className={inp} /></div>
                <div><label className={lbl}>Period End Date</label>
                  <input type="date" value={form.periodEnd} onChange={e => f('periodEnd', e.target.value)} className={inp} /></div>
                <div><label className={lbl}>Check Number (optional)</label>
                  <input value={form.checkNumber} onChange={e => f('checkNumber', e.target.value)} placeholder="1042" className={inp} /></div>
                <div><label className={lbl}>Pay Type</label>
                  <select value={form.rateType} onChange={e => f('rateType', e.target.value as 'hourly' | 'salary')} className={inp}>
                    <option value="hourly">Hourly</option>
                    <option value="salary">Salary (per period)</option></select></div>
                <div><label className={lbl}>{form.rateType === 'hourly' ? 'Hourly Rate ($)' : 'Salary Amount This Period ($)'}</label>
                  <input type="number" value={form.payRate} onChange={e => f('payRate', e.target.value)} placeholder="25.00" min="0" step="0.01" className={inp} /></div>
                {form.rateType === 'hourly' && <>
                  <div><label className={lbl}>Regular Hours Worked</label>
                    <input type="number" value={form.hoursWorked} onChange={e => f('hoursWorked', e.target.value)} placeholder="40" className={inp} /></div>
                  <div><label className={lbl}>Overtime Hours</label>
                    <input type="number" value={form.overtimeHours} onChange={e => f('overtimeHours', e.target.value)} placeholder="0" className={inp} /></div>
                  <div><label className={lbl}>OT Rate (blank = 1.5× auto)</label>
                    <input type="number" value={form.overtimeRate} onChange={e => f('overtimeRate', e.target.value)} placeholder={rate > 0 ? `${(rate * 1.5).toFixed(2)}` : 'auto'} className={inp} /></div>
                </>}

                {/* PTO / Vacation */}
                <div className="sm:col-span-2 mt-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Vacation / PTO (optional)</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div><label className={lbl}>Vacation Used (hrs)</label>
                      <input type="number" value={form.vacationHoursUsed} onChange={e => f('vacationHoursUsed', e.target.value)} placeholder="0" className={inp} /></div>
                    <div><label className={lbl}>Vacation Balance (hrs)</label>
                      <input type="number" value={form.vacationHoursBalance} onChange={e => f('vacationHoursBalance', e.target.value)} placeholder="40" className={inp} /></div>
                    <div><label className={lbl}>Sick Used (hrs)</label>
                      <input type="number" value={form.sickHoursUsed} onChange={e => f('sickHoursUsed', e.target.value)} placeholder="0" className={inp} /></div>
                    <div><label className={lbl}>Sick Balance (hrs)</label>
                      <input type="number" value={form.sickHoursBalance} onChange={e => f('sickHoursBalance', e.target.value)} placeholder="24" className={inp} /></div>
                  </div>
                </div>

                {/* YTD override */}
                <div className="sm:col-span-2">
                  <label className={lbl}>YTD Gross Override (optional — auto-calculated if blank)</label>
                  <input type="number" value={form.ytdGrossOverride} onChange={e => f('ytdGrossOverride', e.target.value)} placeholder={`Auto: $${(grossPay * ytdPeriods).toFixed(2)}`} className={inp} />
                  <p className="text-xs text-gray-400 mt-1">Leave blank to auto-calculate based on pay date. Override if you know the exact YTD figure.</p>
                </div>
              </div>

              {grossPay > 0 && (
                <div className="mt-5 p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Regular Pay</span><span>${regularPay.toFixed(2)}</span></div>
                  {overtimePay > 0 && <div className="flex justify-between text-sm mt-1"><span className="text-gray-600">Overtime Pay</span><span>${overtimePay.toFixed(2)}</span></div>}
                  <div className="flex justify-between font-bold mt-2 pt-2 border-t border-green-200">
                    <span>Gross Pay</span><span className="text-green-600">${grossPay.toFixed(2)}</span></div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4 — Deductions */}
          {step === 4 && (
            <div>
              <h2 className="font-bold text-gray-900 mb-5">Taxes & Deductions</h2>

              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Federal & State Tax</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div><label className={lbl}>Federal Filing Status</label>
                  <select value={form.federalFiling} onChange={e => f('federalFiling', e.target.value)} className={inp}>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="head">Head of Household</option></select></div>
                <div><label className={lbl}>Federal Allowances</label>
                  <input type="number" value={form.federalAllowances} onChange={e => f('federalAllowances', e.target.value)} placeholder="1" min="0" className={inp} /></div>
                <div><label className={lbl}>State (for withholding)</label>
                  <select value={form.stateCode} onChange={e => f('stateCode', e.target.value)} className={inp}>
                    {STATES.map(s => <option key={s}>{s}</option>)}</select></div>
                <div><label className={lbl}>State Allowances</label>
                  <input type="number" value={form.stateAllowances} onChange={e => f('stateAllowances', e.target.value)} placeholder="1" min="0" className={inp} /></div>
                <div><label className={lbl}>Additional Federal Withholding ($)</label>
                  <input type="number" value={form.additionalFederal} onChange={e => f('additionalFederal', e.target.value)} placeholder="0" className={inp} /></div>
              </div>

              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Voluntary Deductions (Pre/Post-Tax)</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={lbl}>Health Insurance ($/period)</label>
                  <input type="number" value={form.health} onChange={e => f('health', e.target.value)} placeholder="0" className={inp} /></div>
                <div><label className={lbl}>Dental ($/period)</label>
                  <input type="number" value={form.dental} onChange={e => f('dental', e.target.value)} placeholder="0" className={inp} /></div>
                <div><label className={lbl}>Vision ($/period)</label>
                  <input type="number" value={form.vision} onChange={e => f('vision', e.target.value)} placeholder="0" className={inp} /></div>
                <div><label className={lbl}>401(k) Contribution ($/period)</label>
                  <input type="number" value={form.retirement401k} onChange={e => f('retirement401k', e.target.value)} placeholder="0" className={inp} /></div>
                <div><label className={lbl}>Other Deduction #1 — Name</label>
                  <input value={form.otherDeduction1Name} onChange={e => f('otherDeduction1Name', e.target.value)} placeholder="Union Dues" className={inp} /></div>
                <div><label className={lbl}>Other Deduction #1 — Amount ($)</label>
                  <input type="number" value={form.otherDeduction1Amount} onChange={e => f('otherDeduction1Amount', e.target.value)} placeholder="0" className={inp} /></div>
                <div><label className={lbl}>Other Deduction #2 — Name</label>
                  <input value={form.otherDeduction2Name} onChange={e => f('otherDeduction2Name', e.target.value)} placeholder="Garnishment" className={inp} /></div>
                <div><label className={lbl}>Other Deduction #2 — Amount ($)</label>
                  <input type="number" value={form.otherDeduction2Amount} onChange={e => f('otherDeduction2Amount', e.target.value)} placeholder="0" className={inp} /></div>
              </div>

              {grossPay > 0 && (
                <div className="mt-5 p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1.5 text-sm">
                  <div className="flex justify-between"><span className="text-gray-600">Gross Pay</span><span className="font-medium">${grossPay.toFixed(2)}</span></div>
                  <div className="flex justify-between text-red-600"><span>Federal Tax ({form.federalFiling})</span><span>−${federalTax.toFixed(2)}</span></div>
                  <div className="flex justify-between text-red-600"><span>State Tax ({form.stateCode})</span><span>−${stateTax.toFixed(2)}</span></div>
                  <div className="flex justify-between text-red-600"><span>Social Security (6.2%)</span><span>−${socialSecurity.toFixed(2)}</span></div>
                  <div className="flex justify-between text-red-600"><span>Medicare (1.45%)</span><span>−${medicare.toFixed(2)}</span></div>
                  {health > 0 && <div className="flex justify-between text-orange-600"><span>Health Insurance</span><span>−${health.toFixed(2)}</span></div>}
                  {dental > 0 && <div className="flex justify-between text-orange-600"><span>Dental</span><span>−${dental.toFixed(2)}</span></div>}
                  {vision > 0 && <div className="flex justify-between text-orange-600"><span>Vision</span><span>−${vision.toFixed(2)}</span></div>}
                  {retirement > 0 && <div className="flex justify-between text-orange-600"><span>401(k)</span><span>−${retirement.toFixed(2)}</span></div>}
                  {other1 > 0 && <div className="flex justify-between text-orange-600"><span>{form.otherDeduction1Name || 'Other #1'}</span><span>−${other1.toFixed(2)}</span></div>}
                  {other2 > 0 && <div className="flex justify-between text-orange-600"><span>{form.otherDeduction2Name || 'Other #2'}</span><span>−${other2.toFixed(2)}</span></div>}
                  <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-300">
                    <span>Net Pay</span><span className="text-green-600">${netPay.toFixed(2)}</span></div>
                </div>
              )}
            </div>
          )}

          {/* STEP 5 — Preview & Pay */}
          {step === 5 && (
            <div>
              <h2 className="font-bold text-gray-900 mb-1">Preview Your Pay Stub</h2>
              <p className="text-gray-500 text-sm mb-4">Pay $5 to download the clean PDF — watermark removed on download.</p>

              {/* Watermark wrapper — wraps ALL template previews */}
              <div style={{ position: 'relative', userSelect: 'none' }}>
                {/* Diagonal watermark overlay */}
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 10,
                  pointerEvents: 'none', overflow: 'hidden',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {/* repeating diagonal text grid */}
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} style={{
                      position: 'absolute',
                      top: `${(i % 6) * 18 - 5}%`,
                      left: `${Math.floor(i / 6) * 22 - 5}%`,
                      transform: 'rotate(-35deg)',
                      fontSize: '22px',
                      fontWeight: 'bold',
                      color: 'rgba(0,0,0,0.10)',
                      fontFamily: 'Arial, sans-serif',
                      whiteSpace: 'nowrap',
                      letterSpacing: '2px',
                    }}>
                      PREVIEW ONLY
                    </div>
                  ))}
                </div>

              {/* Template: ADP Style */}
              {form.template === 'adp' && (
                <div className="border border-gray-400 text-gray-900 text-xs font-sans overflow-x-auto bg-white">
                  <div className="bg-blue-800 text-white px-4 py-2 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-sm">{form.companyName || 'Company Name'}</div>
                      <div className="text-blue-200 text-xs">{form.companyAddress} {form.companyCity}{form.companyCity && ','} {form.companyState} {form.companyZip}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">EARNINGS STATEMENT</div>
                      <div className="text-blue-200 text-xs">Period: {form.periodStart} – {form.periodEnd}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 border-b border-gray-300">
                    <div className="p-3 border-r border-gray-300">
                      <div className="text-gray-500 text-xs uppercase font-bold mb-1">Employee</div>
                      <div className="font-bold">{form.employeeName || 'Employee Name'}</div>
                      <div>{form.employeeAddress}</div>
                      <div>{form.employeeCity}{form.employeeCity && ','} {form.employeeState} {form.employeeZip}</div>
                      {form.ssn && <div className="mt-1">SSN: XXX-XX-{form.ssn}</div>}
                    </div>
                    <div className="p-3 border-r border-gray-300">
                      <div className="text-gray-500 text-xs uppercase font-bold mb-1">Pay Info</div>
                      {form.employeeId && <div>Emp ID: {form.employeeId}</div>}
                      {form.jobTitle && <div>Title: {form.jobTitle}</div>}
                      {form.department && <div>Dept: {form.department}</div>}
                      <div>Period: {form.payPeriod}</div>
                      <div>Pay Date: {form.payDate}</div>
                      {form.checkNumber && <div>Check #: {form.checkNumber}</div>}
                    </div>
                    <div className="p-3">
                      <div className="text-gray-500 text-xs uppercase font-bold mb-1">Tax Withholding</div>
                      <div>Federal: <span className="font-medium capitalize">{form.federalFiling}</span> / {form.federalAllowances} allow.</div>
                      <div>State: <span className="font-medium">{form.stateCode}</span> / {form.stateAllowances} allow.</div>
                      {form.ein && <div className="mt-1">EIN: {form.ein}</div>}
                    </div>
                  </div>
                  <table className="w-full border-b border-gray-300">
                    <thead><tr className="bg-gray-100 border-b border-gray-300">
                      <th className="text-left p-2 text-gray-600 font-bold uppercase text-xs">Earnings</th>
                      <th className="text-right p-2 text-gray-600 font-bold uppercase text-xs">Rate</th>
                      <th className="text-right p-2 text-gray-600 font-bold uppercase text-xs">Hours</th>
                      <th className="text-right p-2 text-gray-600 font-bold uppercase text-xs">Current</th>
                      <th className="text-right p-2 text-gray-600 font-bold uppercase text-xs">YTD</th>
                    </tr></thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="p-2">Regular</td>
                        <td className="p-2 text-right">{form.rateType === 'hourly' ? `$${rate.toFixed(2)}` : '—'}</td>
                        <td className="p-2 text-right">{form.rateType === 'hourly' ? form.hoursWorked : '—'}</td>
                        <td className="p-2 text-right font-medium">${regularPay.toFixed(2)}</td>
                        <td className="p-2 text-right">${(regularPay * ytdPeriods).toFixed(2)}</td>
                      </tr>
                      {overtimePay > 0 && <tr className="border-b border-gray-100">
                        <td className="p-2">Overtime</td>
                        <td className="p-2 text-right">${otRate.toFixed(2)}</td>
                        <td className="p-2 text-right">{form.overtimeHours}</td>
                        <td className="p-2 text-right font-medium">${overtimePay.toFixed(2)}</td>
                        <td className="p-2 text-right">${(overtimePay * ytdPeriods).toFixed(2)}</td>
                      </tr>}
                    </tbody>
                    <tfoot><tr className="bg-blue-50 font-bold border-t border-gray-300">
                      <td className="p-2" colSpan={3}>Gross Pay</td>
                      <td className="p-2 text-right">${grossPay.toFixed(2)}</td>
                      <td className="p-2 text-right">${ytdGross.toFixed(2)}</td>
                    </tr></tfoot>
                  </table>
                  <table className="w-full border-b border-gray-300">
                    <thead><tr className="bg-gray-100 border-b border-gray-300">
                      <th className="text-left p-2 text-gray-600 font-bold uppercase text-xs">Deductions</th>
                      <th className="text-right p-2 text-gray-600 font-bold uppercase text-xs">Current</th>
                      <th className="text-right p-2 text-gray-600 font-bold uppercase text-xs">YTD</th>
                    </tr></thead>
                    <tbody>
                      <tr className="border-b border-gray-100"><td className="p-2">Federal Income Tax</td><td className="p-2 text-right">${federalTax.toFixed(2)}</td><td className="p-2 text-right">${ytdFederal.toFixed(2)}</td></tr>
                      <tr className="border-b border-gray-100"><td className="p-2">State Income Tax ({form.stateCode})</td><td className="p-2 text-right">${stateTax.toFixed(2)}</td><td className="p-2 text-right">${ytdState.toFixed(2)}</td></tr>
                      <tr className="border-b border-gray-100"><td className="p-2">Social Security Tax</td><td className="p-2 text-right">${socialSecurity.toFixed(2)}</td><td className="p-2 text-right">${ytdSS.toFixed(2)}</td></tr>
                      <tr className="border-b border-gray-100"><td className="p-2">Medicare Tax</td><td className="p-2 text-right">${medicare.toFixed(2)}</td><td className="p-2 text-right">${ytdMedicare.toFixed(2)}</td></tr>
                      {health > 0 && <tr className="border-b border-gray-100"><td className="p-2">Medical Insurance</td><td className="p-2 text-right">${health.toFixed(2)}</td><td className="p-2 text-right">${ytdHealth.toFixed(2)}</td></tr>}
                      {dental > 0 && <tr className="border-b border-gray-100"><td className="p-2">Dental Insurance</td><td className="p-2 text-right">${dental.toFixed(2)}</td><td className="p-2 text-right">${ytdDental.toFixed(2)}</td></tr>}
                      {vision > 0 && <tr className="border-b border-gray-100"><td className="p-2">Vision Insurance</td><td className="p-2 text-right">${vision.toFixed(2)}</td><td className="p-2 text-right">${ytdVision.toFixed(2)}</td></tr>}
                      {retirement > 0 && <tr className="border-b border-gray-100"><td className="p-2">401(k) Contribution</td><td className="p-2 text-right">${retirement.toFixed(2)}</td><td className="p-2 text-right">${ytdRetirement.toFixed(2)}</td></tr>}
                      {other1 > 0 && <tr className="border-b border-gray-100"><td className="p-2">{form.otherDeduction1Name || 'Other Deduction'}</td><td className="p-2 text-right">${other1.toFixed(2)}</td><td className="p-2 text-right">${ytdOther1.toFixed(2)}</td></tr>}
                      {other2 > 0 && <tr className="border-b border-gray-100"><td className="p-2">{form.otherDeduction2Name || 'Other Deduction 2'}</td><td className="p-2 text-right">${other2.toFixed(2)}</td><td className="p-2 text-right">${ytdOther2.toFixed(2)}</td></tr>}
                    </tbody>
                    <tfoot><tr className="bg-blue-50 font-bold border-t border-gray-300">
                      <td className="p-2">Total Deductions</td>
                      <td className="p-2 text-right">${totalDeductions.toFixed(2)}</td>
                      <td className="p-2 text-right">${ytdTotalDeductions.toFixed(2)}</td>
                    </tr></tfoot>
                  </table>
                  <div className="grid grid-cols-2">
                    <div className="p-3 border-r border-gray-300">
                      <div className="text-gray-500 text-xs uppercase font-bold mb-2">Leave Balances</div>
                      <table className="w-full text-xs"><thead><tr className="text-gray-400"><th className="text-left">Type</th><th className="text-right">Used</th><th className="text-right">Balance</th></tr></thead>
                        <tbody>
                          <tr><td>Vacation</td><td className="text-right">{form.vacationHoursUsed} hrs</td><td className="text-right">{form.vacationHoursBalance} hrs</td></tr>
                          <tr><td>Sick</td><td className="text-right">{form.sickHoursUsed} hrs</td><td className="text-right">{form.sickHoursBalance} hrs</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="p-4 bg-blue-800 text-white">
                      <div className="text-blue-300 text-xs uppercase font-bold mb-1">Net Pay This Period</div>
                      <div className="text-3xl font-bold">${netPay.toFixed(2)}</div>
                      <div className="text-blue-300 text-xs mt-1">YTD Net Pay: ${ytdNet.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Template: Classic */}
              {form.template === 'classic' && (
                <div className="border-2 border-gray-500 text-gray-900 text-xs font-mono bg-white">
                  <div className="text-center py-3 border-b-2 border-gray-500 bg-gray-50">
                    <div className="font-bold text-base">{form.companyName || 'Company Name'}</div>
                    <div className="text-gray-600">{form.companyAddress} · {form.companyCity}{form.companyCity && ','} {form.companyState} {form.companyZip}</div>
                    {form.ein && <div className="text-gray-500">EIN: {form.ein}</div>}
                    <div className="font-bold text-sm mt-1 tracking-widest">PAYROLL CHECK STUB</div>
                  </div>
                  <div className="grid grid-cols-2 border-b border-gray-400">
                    <div className="p-3 border-r border-gray-400">
                      <div className="font-bold uppercase mb-1">Employee</div>
                      <div>{form.employeeName}</div>
                      <div>{form.employeeAddress}</div>
                      <div>{form.employeeCity}{form.employeeCity && ','} {form.employeeState} {form.employeeZip}</div>
                      {form.ssn && <div>SSN: XXX-XX-{form.ssn}</div>}
                      {form.employeeId && <div>Emp ID: {form.employeeId}</div>}
                      {form.jobTitle && <div>Title: {form.jobTitle}</div>}
                      {form.department && <div>Dept: {form.department}</div>}
                    </div>
                    <div className="p-3">
                      <div className="font-bold uppercase mb-1">Pay Period Info</div>
                      <div>Pay Period: {form.payPeriod}</div>
                      <div>Period: {form.periodStart} – {form.periodEnd}</div>
                      <div>Pay Date: {form.payDate}</div>
                      {form.checkNumber && <div>Check #: {form.checkNumber}</div>}
                      <div className="mt-2 font-bold uppercase">Tax Withholding</div>
                      <div>Federal: {form.federalFiling} / {form.federalAllowances} allow.</div>
                      <div>State ({form.stateCode}): {form.stateAllowances} allow.</div>
                    </div>
                  </div>
                  <table className="w-full">
                    <thead><tr className="bg-gray-200 border-b border-gray-400">
                      <th className="text-left p-2">DESCRIPTION</th><th className="text-right p-2">HRS</th>
                      <th className="text-right p-2">RATE</th><th className="text-right p-2">CURRENT</th><th className="text-right p-2">YTD</th>
                    </tr></thead>
                    <tbody>
                      <tr className="border-b border-gray-300"><td className="p-2">Regular Earnings</td>
                        <td className="p-2 text-right">{form.rateType === 'hourly' ? form.hoursWorked : '—'}</td>
                        <td className="p-2 text-right">{form.rateType === 'hourly' ? `$${rate.toFixed(2)}` : '—'}</td>
                        <td className="p-2 text-right">${regularPay.toFixed(2)}</td><td className="p-2 text-right">${(regularPay * ytdPeriods).toFixed(2)}</td></tr>
                      {overtimePay > 0 && <tr className="border-b border-gray-300"><td className="p-2">Overtime (1.5x)</td>
                        <td className="p-2 text-right">{form.overtimeHours}</td><td className="p-2 text-right">${otRate.toFixed(2)}</td>
                        <td className="p-2 text-right">${overtimePay.toFixed(2)}</td><td className="p-2 text-right">${(overtimePay * ytdPeriods).toFixed(2)}</td></tr>}
                      <tr className="border-b-2 border-gray-400 font-bold bg-gray-50"><td className="p-2">GROSS PAY</td><td className="p-2" colSpan={2}></td>
                        <td className="p-2 text-right">${grossPay.toFixed(2)}</td><td className="p-2 text-right">${ytdGross.toFixed(2)}</td></tr>
                      {[['Federal Income Tax', federalTax, ytdFederal], ['State Income Tax (' + form.stateCode + ')', stateTax, ytdState],
                        ['Social Security', socialSecurity, ytdSS], ['Medicare', medicare, ytdMedicare],
                        ...(health > 0 ? [['Medical Insurance', health, ytdHealth]] : []),
                        ...(dental > 0 ? [['Dental Insurance', dental, ytdDental]] : []),
                        ...(vision > 0 ? [['Vision Insurance', vision, ytdVision]] : []),
                        ...(retirement > 0 ? [['401(k)', retirement, ytdRetirement]] : []),
                        ...(other1 > 0 ? [[form.otherDeduction1Name || 'Other', other1, ytdOther1]] : []),
                        ...(other2 > 0 ? [[form.otherDeduction2Name || 'Other 2', other2, ytdOther2]] : []),
                      ].map(([l, c, y]) => (
                        <tr key={String(l)} className="border-b border-gray-200">
                          <td className="p-2">{String(l)}</td><td className="p-2" colSpan={2}></td>
                          <td className="p-2 text-right">${Number(c).toFixed(2)}</td><td className="p-2 text-right">${Number(y).toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr className="font-bold bg-gray-200 border-t-2 border-gray-500 text-sm"><td className="p-2">NET PAY</td><td className="p-2" colSpan={2}></td>
                        <td className="p-2 text-right">${netPay.toFixed(2)}</td><td className="p-2 text-right">${ytdNet.toFixed(2)}</td></tr>
                    </tbody>
                  </table>
                  <div className="p-2 border-t border-gray-400 grid grid-cols-2 text-xs text-gray-500">
                    <div>Vacation: {form.vacationHoursUsed} used · {form.vacationHoursBalance} hrs remaining</div>
                    <div>Sick: {form.sickHoursUsed} used · {form.sickHoursBalance} hrs remaining</div>
                  </div>
                </div>
              )}

              {/* Template: Modern */}
              {form.template === 'modern' && (
                <div className="border border-gray-200 rounded-xl text-gray-900 text-xs overflow-hidden bg-white">
                  <div className="bg-gray-900 text-white px-5 py-4 flex justify-between items-start">
                    <div>
                      <div className="font-bold text-base">{form.companyName || 'Company Name'}</div>
                      <div className="text-gray-400 text-xs mt-0.5">{form.companyAddress} {form.companyCity}{form.companyCity && ','} {form.companyState}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-400 text-xs">Pay Date</div>
                      <div className="font-bold">{form.payDate}</div>
                      <div className="text-gray-400 text-xs">{form.periodStart} – {form.periodEnd}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-0 border-b border-gray-100 bg-gray-50 p-4">
                    <div><div className="text-gray-400 uppercase text-xs font-bold mb-1">Employee</div>
                      <div className="font-semibold">{form.employeeName || '—'}</div>
                      {form.jobTitle && <div className="text-gray-500">{form.jobTitle}</div>}
                      {form.ssn && <div className="text-gray-400">SSN: XXX-XX-{form.ssn}</div>}</div>
                    <div><div className="text-gray-400 uppercase text-xs font-bold mb-1">Details</div>
                      <div>{form.payPeriod}</div>
                      <div>Fed: <span className="capitalize">{form.federalFiling}</span> / {form.federalAllowances}</div>
                      {form.checkNumber && <div>Chk #{form.checkNumber}</div>}</div>
                    <div className="text-right"><div className="text-gray-400 uppercase text-xs font-bold mb-1">Gross Pay</div>
                      <div className="text-2xl font-bold">${grossPay.toFixed(2)}</div>
                      <div className="text-gray-400 text-xs">YTD ${ytdGross.toFixed(2)}</div></div>
                  </div>
                  <table className="w-full">
                    <thead><tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left p-3 text-gray-500 font-bold uppercase text-xs">Deduction</th>
                      <th className="text-right p-3 text-gray-500 font-bold uppercase text-xs">This Period</th>
                      <th className="text-right p-3 text-gray-500 font-bold uppercase text-xs">YTD</th>
                    </tr></thead>
                    <tbody>
                      {[['Federal Income Tax', federalTax, ytdFederal], ['State Tax (' + form.stateCode + ')', stateTax, ytdState],
                        ['Social Security', socialSecurity, ytdSS], ['Medicare', medicare, ytdMedicare],
                        ...(health > 0 ? [['Medical', health, ytdHealth]] : []),
                        ...(dental > 0 ? [['Dental', dental, ytdDental]] : []),
                        ...(vision > 0 ? [['Vision', vision, ytdVision]] : []),
                        ...(retirement > 0 ? [['401(k)', retirement, ytdRetirement]] : []),
                        ...(other1 > 0 ? [[form.otherDeduction1Name || 'Other', other1, ytdOther1]] : []),
                        ...(other2 > 0 ? [[form.otherDeduction2Name || 'Other 2', other2, ytdOther2]] : []),
                      ].map(([l, c, y]) => (
                        <tr key={String(l)} className="border-b border-gray-50">
                          <td className="p-3">{String(l)}</td>
                          <td className="p-3 text-right">${Number(c).toFixed(2)}</td>
                          <td className="p-3 text-right text-gray-400">${Number(y).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="bg-gray-900 text-white flex items-center justify-between p-4">
                    <div>
                      <div className="text-gray-400 text-xs uppercase font-bold">Net Pay</div>
                      <div className="text-2xl font-bold">${netPay.toFixed(2)}</div>
                    </div>
                    <div className="text-right text-xs text-gray-400">
                      <div>YTD Net: ${ytdNet.toFixed(2)}</div>
                      <div className="mt-1">Vacation: {form.vacationHoursBalance} hrs · Sick: {form.sickHoursBalance} hrs</div>
                    </div>
                  </div>
                </div>
              )}

              </div>{/* end watermark wrapper */}

              {/* Pay CTA */}
              <div className="mt-5 bg-green-50 border border-green-200 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-gray-900">Download this pay stub</p>
                  <p className="text-gray-500 text-sm">Pay $5 · Instant PDF · No account required</p>
                </div>
                <button onClick={handleCheckout} disabled={!grossPay || paying}
                  className="shrink-0 px-6 py-3 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white rounded-xl font-bold transition-colors">
                  {paying ? 'Redirecting...' : '💳 Pay $5 & Download PDF'}
                </button>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-5 border-t border-gray-100">
            {step > 1
              ? <button onClick={() => setStep(s => s - 1)} className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors">← Back</button>
              : <div />}
            {step < 5 && (
              <button onClick={() => setStep(s => s + 1)} className="px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-xl font-medium transition-colors">Next →</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}