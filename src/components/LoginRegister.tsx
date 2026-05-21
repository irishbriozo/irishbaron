import React, { useState } from 'react';
import { User } from '../types';
import { KeyRound, Mail, UserCheck, ShieldCheck, HelpCircle } from 'lucide-react';

interface LoginRegisterProps {
  onLoginSuccess: (user: User) => void;
  setCurrentTab: (tab: string) => void;
}

export default function LoginRegister({ onLoginSuccess, setCurrentTab }: LoginRegisterProps) {
  const [activeForm, setActiveForm] = useState<'login' | 'register'>('login');
  const [loginRole, setLoginRole] = useState<'customer' | 'student' | 'admin'>('customer');

  // Login form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentId, setStudentId] = useState('');

  // Register form fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regRole, setRegRole] = useState<'customer' | 'student'>('customer');
  const [regStudentId, setRegStudentId] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Auxiliary UI alerts
  const [alertMsg, setAlertMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  // Quick Account Login Presets (Evaluator Helper)
  const PRESETS = [
    {
      label: 'Admin Presets',
      email: 'primo@canteen.com',
      password: 'admin123',
      role: 'admin' as const,
      desc: 'Full order dispatcher, menu and reservation controls.',
    },
    {
      label: 'Student Presets',
      email: 'sophia@student.edu',
      password: 'password123',
      role: 'student' as const,
      studentId: '2026-9842',
      desc: 'Enrolls automatic 10% discount on coffee beverages.',
    },
    {
      label: 'General Customer Presets',
      email: 'juan@customer.com',
      password: 'customer123',
      role: 'customer' as const,
      desc: 'Basic delivery, pickup and dining appointments.',
    }
  ];

  const applyPreset = (preset: typeof PRESETS[number]) => {
    setLoginRole(preset.role);
    setEmail(preset.email);
    setPassword(preset.password);
    if (preset.role === 'student' && preset.studentId) {
      setStudentId(preset.studentId);
    } else {
      setStudentId('');
    }
    setAlertMsg({
      type: 'success',
      text: `Loaded preset: ${preset.label}. You can now click "Sign In"!`,
    });
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setAlertMsg({ type: 'error', text: 'Please fill in all layout credentials.' });
      return;
    }

    if (loginRole === 'student' && !studentId) {
      setAlertMsg({ type: 'error', text: 'Enrolled students must provide their Student ID number.' });
      return;
    }

    // Check credentials against our presets
    if (loginRole === 'admin' && email === 'primo@canteen.com' && password === 'admin123') {
      const user: User = {
        id: 'admin-1',
        name: 'Chef Primo',
        email: 'primo@canteen.com',
        role: 'admin',
        phone: '09170001111',
      };
      onLoginSuccess(user);
    } else if (loginRole === 'student' && email === 'sophia@student.edu' && password === 'password123') {
      const user: User = {
        id: 'stud-1',
        name: 'Sophia Briozo',
        email: 'sophia@student.edu',
        role: 'student',
        idNumber: studentId || '2026-9842',
        phone: '09187654321',
      };
      onLoginSuccess(user);
    } else if (loginRole === 'customer' && email === 'juan@customer.com' && password === 'customer123') {
      const user: User = {
        id: 'cust-1',
        name: 'Juan Dela Cruz',
        email: 'juan@customer.com',
        role: 'customer',
        phone: '09171234567',
      };
      onLoginSuccess(user);
    } else {
      // Simulate successful registration logins too or custom inputs
      const dummyName = email.split('@')[0];
      const customUser: User = {
        id: 'user-' + Math.random().toString(36).substr(2, 4),
        name: dummyName.charAt(0).toUpperCase() + dummyName.slice(1),
        email,
        role: loginRole,
        idNumber: loginRole === 'student' ? (studentId || 'STUD-TEMP') : undefined,
        phone: '09159998888',
      };
      onLoginSuccess(customUser);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPhone || !regPassword) {
      setAlertMsg({ type: 'error', text: 'Please fill out all registration fields.' });
      return;
    }

    if (regRole === 'student' && !regStudentId) {
      setAlertMsg({ type: 'error', text: 'Student ID Number is mandatory for school registration.' });
      return;
    }

    const newUser: User = {
      id: 'reg-' + Math.random().toString(36).substr(2, 4),
      name: regName,
      email: regEmail,
      role: regRole,
      idNumber: regRole === 'student' ? regStudentId : undefined,
      phone: regPhone,
    };

    setAlertMsg({
      type: 'success',
      text: 'Registration successful! logging you in directly...',
    });

    setTimeout(() => {
      onLoginSuccess(newUser);
    }, 1200);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    alert(`Reset pass token sent to ${forgotEmail}. Please inspect mock inbox.`);
    setForgotPasswordOpen(false);
    setForgotEmail('');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" id="login-module-root">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-start">
        
        {/* Presets Helper Column (Left) */}
        <div className="lg:col-span-5 space-y-6" id="login-presets-info">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-850">
              Canteen Demonstration Panel
            </span>
            <h2 className="font-sans text-2xl font-bold tracking-tight text-amber-950 sm:text-3xl mt-1">
              Select a Demo Profile
            </h2>
            <p className="text-xs text-stone-500 mt-2">
              We have preloaded mock roles below. Click any to fill in credentials instantly and test custom flows:
            </p>
          </div>

          <div className="space-y-4" id="presets-button-stack">
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => applyPreset(p)}
                className="w-full text-left rounded-xl border border-amber-100 bg-amber-50/40 p-4 hover:bg-amber-50 hover:border-amber-300 transition-all cursor-pointer flex items-start gap-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shrink-0 text-amber-800 shadow-xs">
                  {p.role === 'admin' ? <ShieldCheck className="h-4.5 w-4.5" /> : <UserCheck className="h-4.5 w-4.5" />}
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">{p.label}</div>
                  <div className="text-[10px] text-stone-500 mt-0.5">{p.desc}</div>
                  <div className="font-mono text-[9px] text-amber-900 mt-1.5 opacity-90">
                    ID: {p.email} | PW: {p.password}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-dashed border-stone-200 p-4 bg-stone-50 text-[11px] text-stone-500 leading-relaxed">
            🎓 <strong>Student Discount Activation:</strong> Logged-in students get an instant coffee savings discount during checkout! Admins gain access to live orders dispatching, reservation responses, and catering dashboards.
          </div>
        </div>

        {/* Form Container Column (Right) */}
        <div className="lg:col-span-1" />
        
        <div className="lg:col-span-6" id="login-forms-card">
          <div className="rounded-2xl border border-stone-150/60 bg-white p-6 sm:p-8 shadow-sm">
            
            {/* Tab Heads */}
            <div className="flex border-b border-stone-100 pb-4 mb-6">
              <button
                onClick={() => { setActiveForm('login'); setAlertMsg(null); }}
                className={`flex-1 text-center pb-2 text-sm font-bold transition-colors cursor-pointer ${
                  activeForm === 'login' ? 'text-amber-800 border-b-2 border-amber-800' : 'text-stone-400 hover:text-stone-700'
                }`}
                id="tab-head-login"
              >
                Sign In Acc
              </button>
              
              <button
                onClick={() => { setActiveForm('register'); setAlertMsg(null); }}
                className={`flex-1 text-center pb-2 text-sm font-bold transition-colors cursor-pointer ${
                  activeForm === 'register' ? 'text-amber-800 border-b-2 border-amber-800' : 'text-stone-400 hover:text-stone-700'
                }`}
                id="tab-head-register"
              >
                Register Acc
              </button>
            </div>

            {alertMsg && (
              <div
                className={`mb-5 rounded-lg p-3 text-xs ${
                  alertMsg.type === 'error' ? 'bg-red-50 text-red-950 border border-red-105' : 'bg-emerald-50 text-emerald-950 border border-emerald-105'
                }`}
              >
                {alertMsg.text}
              </div>
            )}

            {/* ================= FORM 1: LOGIN ================= */}
            {activeForm === 'login' && !forgotPasswordOpen && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                
                {/* Role Switcher */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500">Sign In Role</label>
                  <div className="grid grid-cols-3 gap-2 bg-stone-50 p-1 rounded-lg border border-stone-100">
                    {(['customer', 'student', 'admin'] as const).map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => { setLoginRole(role); setAlertMsg(null); }}
                        className={`py-1.5 rounded-md text-center text-xs font-semibold capitalize pointer transition-colors cursor-pointer ${
                          loginRole === role ? 'bg-amber-800 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/50'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="login-email" className="block text-xs font-semibold text-stone-700">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute top-2.5 left-3 h-4 w-4 text-stone-400" />
                    <input
                      type="email"
                      id="login-email"
                      required
                      placeholder="e.g. maria@customer.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-stone-200 pl-9 pr-4 py-2 text-xs outline-none focus:border-amber-700 focus:bg-white bg-stone-50/50"
                    />
                  </div>
                </div>

                {loginRole === 'student' && (
                  <div className="space-y-1.5 animate-fadeIn">
                    <label htmlFor="login-student-id" className="block text-xs font-semibold text-stone-700">Student ID Number</label>
                    <input
                      type="text"
                      id="login-student-id"
                      required
                      placeholder="e.g. 2026-9842"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="w-full rounded-lg border border-stone-200 px-3 py-2 text-xs outline-none focus:border-amber-700 focus:bg-white bg-stone-50/50"
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="login-password" className="block text-xs font-semibold text-stone-700">Security Password</label>
                    <button
                      type="button"
                      onClick={() => setForgotPasswordOpen(true)}
                      className="text-[11px] text-amber-850 hover:underline cursor-pointer"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <KeyRound className="absolute top-2.5 left-3 h-4 w-4 text-stone-400" />
                    <input
                      type="password"
                      id="login-password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border border-stone-200 pl-9 pr-4 py-2 text-xs outline-none focus:border-amber-700 focus:bg-white bg-stone-50/50"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold py-3 text-xs shadow-md transition-all mt-4 cursor-pointer"
                  id="login-form-submit-btn"
                >
                  Sign In Account
                </button>
              </form>
            )}

            {/* ================= FORGOT MODULE ================= */}
            {activeForm === 'login' && forgotPasswordOpen && (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="flex items-center gap-1.5 text-stone-800 font-semibold text-xs pb-2">
                  <HelpCircle className="h-4 w-4 text-amber-800" />
                  <span>Forgot Password Mode</span>
                </div>
                <p className="text-xs text-stone-500 leading-normal">
                  Provide your registered email account below. We will dispatch a secure link to reset your canteen dashboard password.
                </p>

                <div className="space-y-1.5">
                  <label htmlFor="forgot-email" className="block text-xs font-semibold text-stone-700">Registered Email</label>
                  <input
                    type="email"
                    id="forgot-email"
                    required
                    placeholder="maria@customer.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full rounded-lg border border-stone-200 px-3 py-2 text-xs outline-none focus:border-amber-700 focus:bg-white"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setForgotPasswordOpen(false)}
                    className="flex-1 rounded-lg border border-stone-200 py-2.5 text-xs text-stone-600 hover:bg-stone-50 cursor-pointer"
                  >
                    Back to Login
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-amber-800 hover:bg-amber-900 text-white py-2.5 text-xs font-semibold cursor-pointer"
                  >
                    Send Password Link
                  </button>
                </div>
              </form>
            )}

            {/* ================= FORM 2: REGISTER ================= */}
            {activeForm === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5 col-span-2">
                    <label htmlFor="reg-name" className="block text-xs font-semibold text-stone-700">Full Name</label>
                    <input
                      type="text"
                      id="reg-name"
                      required
                      placeholder="e.g. Maria Santos"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full rounded-lg border border-stone-200 px-3 py-2 text-xs outline-none focus:border-amber-700 bg-stone-50/50 text-stone-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="reg-email" className="block text-xs font-semibold text-stone-700">Email Address</label>
                    <input
                      type="email"
                      id="reg-email"
                      required
                      placeholder="maria@customer.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full rounded-lg border border-stone-200 px-3 py-2 text-xs outline-none focus:border-amber-700 bg-stone-50/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="reg-phone" className="block text-xs font-semibold text-stone-700">Phone Number</label>
                    <input
                      type="text"
                      id="reg-phone"
                      required
                      placeholder="0917XXXXXXX"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full rounded-lg border border-stone-200 px-3 py-2 text-xs outline-none focus:border-amber-700 bg-stone-50/50"
                    />
                  </div>
                </div>

                {/* Role Toggle for Registration */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-700">Are you enrolling as a Student?</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
                      <input
                        type="radio"
                        name="reg-role"
                        checked={regRole === 'customer'}
                        onChange={() => setRegRole('customer')}
                        className="text-amber-800 focus:ring-amber-500"
                      />
                      <span>No, General Customer</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
                      <input
                        type="radio"
                        name="reg-role"
                        checked={regRole === 'student'}
                        onChange={() => setRegRole('student')}
                        className="text-amber-800 focus:ring-amber-500"
                      />
                      <span>Yes, Enrolled Student (Get 10% off cafe specials)</span>
                    </label>
                  </div>
                </div>

                {regRole === 'student' && (
                  <div className="space-y-1.5 animate-fadeIn">
                    <label htmlFor="reg-student-id" className="block text-xs font-semibold text-stone-700">Enrolled Student ID</label>
                    <input
                      type="text"
                      id="reg-student-id"
                      required
                      placeholder="e.g. 2026-XXXX"
                      value={regStudentId}
                      onChange={(e) => setRegStudentId(e.target.value)}
                      className="w-full rounded-lg border border-stone-200 px-3 py-2 text-xs outline-none focus:border-amber-700 focus:bg-white"
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <label htmlFor="reg-pass" className="block text-xs font-semibold text-stone-700">Choose Security Password</label>
                  <input
                    type="password"
                    id="reg-pass"
                    required
                    placeholder="Minimum 6 characters"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full rounded-lg border border-stone-200 px-3 py-2 text-xs outline-none focus:border-amber-700 focus:bg-white bg-stone-50/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-amber-850 hover:bg-amber-900 text-white font-bold py-3 text-xs shadow-md transition-all mt-4 cursor-pointer"
                  id="reg-form-submit-btn"
                >
                  Create Canteen Account
                </button>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
