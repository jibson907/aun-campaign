import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiX,
  HiCheckCircle,
  HiOutlineExclamationCircle,
  HiArrowRight,
  HiOutlineSparkles,
  HiOutlineCurrencyDollar,
  HiOutlineChat,
} from 'react-icons/hi';
import { useRequestInfoModal } from '../lib/modal.jsx';
import { trackEvent, trackLead } from '../lib/analytics.js';
import { readUtmFromLocation } from '../lib/utils.js';

const PROGRAMS = [
  'Accounting',
  'Business Administration',
  'Entrepreneurship & Management',
  'Finance',
  'Marketing',
  'Economics',
  'Politics & International Studies',
  'English Literature & Language',
  'Communications & Multimedia Design',
  'Natural & Environmental Sciences',
  'Petroleum Chemistry',
  'Computer Science',
  'Software Engineering',
  'Information Systems',
  'Data Science & Analytics',
  'Chemical Engineering',
  'Civil Engineering',
  'Computer Engineering',
  'Electrical & Electronics Engineering',
  'Telecommunication Engineering',
  'Law',
  'Nursing',
  'Public Health',
];

const NG_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT (Abuja)', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara',
];

const currentYear = new Date().getFullYear();
const GRAD_YEARS = Array.from({ length: 6 }, (_, i) => currentYear + i);

const LEAD_API = import.meta.env.VITE_LEAD_API_URL;

export default function RequestInfoModal() {
  const { isOpen, source, close } = useRequestInfoModal();

  return createPortal(
    <AnimatePresence>
      {isOpen && <ModalShell source={source} onClose={close} />}
    </AnimatePresence>,
    document.body
  );
}

function ModalShell({ source, onClose }) {
  const firstFieldRef = useRef(null);

  useEffect(() => {
    // Focus first field on open for accessibility
    const t = setTimeout(() => firstFieldRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      key="request-info-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="request-info-title"
      className="fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto p-3 sm:items-center sm:p-6"
    >
      {/* Backdrop */}
      <motion.button
        type="button"
        aria-label="Close request information form"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 bg-aun-900/55 backdrop-blur-md"
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative my-auto w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-elevated ring-1 ring-aun-100"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-aun-700 shadow-soft transition hover:bg-aun-50"
        >
          <HiX size={20} />
        </button>

        <div className="grid lg:grid-cols-[1fr_1.15fr]">
          {/* Brand strip */}
          <aside className="relative hidden overflow-hidden bg-aun-700 p-8 text-white lg:flex lg:flex-col lg:justify-between">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(244,180,0,0.35),_transparent_55%)]"
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-200">
                Admissions
              </span>
              <h2
                id="request-info-title"
                className="mt-5 font-display text-3xl font-bold leading-tight text-white"
              >
                Request information from <span className="text-gold-300">AUN</span>
              </h2>
              <p className="mt-4 text-sm text-white/85">
                A counselor will reach out within 24 hours to walk you through programs,
                scholarships, and your next steps.
              </p>
            </div>

            <ul className="relative mt-8 space-y-3 text-sm">
              {[
                { icon: HiOutlineSparkles, k: 'Honors scholarships' },
                { icon: HiOutlineCurrencyDollar, k: 'Up to 100% tuition awards' },
                { icon: HiOutlineChat, k: '24-hour counselor response' },
              ].map(({ icon: Icon, k }) => (
                <li key={k} className="flex items-center gap-3 text-white/90">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-gold-300">
                    <Icon size={18} />
                  </span>
                  {k}
                </li>
              ))}
            </ul>
          </aside>

          {/* Form */}
          <RequestInfoForm
            firstFieldRef={firstFieldRef}
            source={source}
            onSuccess={onClose}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function RequestInfoForm({ firstFieldRef, source, onSuccess }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' });

  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      submittedAt: new Date().toISOString(),
      utm: readUtmFromLocation(),
      page: window.location.href,
      modalSource: source,
    };

    trackEvent('form_submit_attempt', { program: values.intendedProgram, source });

    try {
      if (LEAD_API) {
        const res = await fetch(LEAD_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      } else {
        await new Promise((r) => setTimeout(r, 700));
      }

      trackLead({
        content_name: 'Israel Dike Campaign Lead',
        program: values.intendedProgram,
        source,
      });
      trackEvent('form_submit_success', { program: values.intendedProgram, source });

      setStatus({
        state: 'success',
        message:
          'Thank you! An AUN admissions counselor will reach out within 24 hours.',
      });
      reset();
    } catch (err) {
      trackEvent('form_submit_error', { message: err.message, source });
      setStatus({
        state: 'error',
        message:
          'We could not submit your information. Please try again or email admissions@aun.edu.ng.',
      });
    }
  };

  if (status.state === 'success') {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center sm:p-12">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"
        >
          <HiCheckCircle size={48} />
        </motion.div>
        <h3 className="mt-6 font-display text-2xl font-bold text-aun-800">
          You&apos;re all set!
        </h3>
        <p className="mt-3 max-w-sm text-sm text-ink-600">{status.message}</p>
        <button
          type="button"
          onClick={onSuccess}
          className="btn-primary mt-8"
        >
          Close <HiArrowRight />
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4 p-7 sm:p-9"
      aria-describedby="modal-form-status"
    >
      <div className="lg:hidden">
        <h2 id="request-info-title-mobile" className="font-display text-2xl font-bold text-aun-800">
          Request information
        </h2>
        <p className="mt-1 text-sm text-ink-600">
          We&apos;ll respond within 24 hours.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First Name" error={errors.firstName?.message}>
          <input
            type="text"
            autoComplete="given-name"
            ref={(el) => {
              firstFieldRef.current = el;
            }}
            {...register('firstName', { required: 'First name is required' })}
            className="form-input"
          />
        </Field>
        <Field label="Last Name" error={errors.lastName?.message}>
          <input
            type="text"
            autoComplete="family-name"
            className="form-input"
            {...register('lastName', { required: 'Last name is required' })}
          />
        </Field>
      </div>

      <Field label="Email Address" error={errors.email?.message}>
        <input
          type="email"
          autoComplete="email"
          className="form-input"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email',
            },
          })}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone Number" error={errors.phone?.message}>
          <input
            type="tel"
            autoComplete="tel"
            placeholder="+234 ..."
            className="form-input"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^[+()\d\s-]{7,}$/,
                message: 'Please enter a valid phone number',
              },
            })}
          />
        </Field>
        <Field label="State of Residence" error={errors.state?.message}>
          <select
            defaultValue=""
            className="form-input"
            {...register('state', { required: 'Please select your state' })}
          >
            <option value="" disabled>
              Select state
            </option>
            {NG_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Intended Program" error={errors.intendedProgram?.message}>
        <select
          defaultValue=""
          className="form-input"
          {...register('intendedProgram', { required: 'Please choose a program' })}
        >
          <option value="" disabled>
            Select a program
          </option>
          {PROGRAMS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Expected Graduation Year" error={errors.graduationYear?.message}>
        <select
          defaultValue=""
          className="form-input"
          {...register('graduationYear', { required: 'Please select a year' })}
        >
          <option value="" disabled>
            Select year
          </option>
          {GRAD_YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </Field>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-gold mt-2 w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? 'Submitting…' : 'Request Information'}{' '}
        {!isSubmitting && <HiArrowRight />}
      </button>

      <p className="text-center text-[11px] text-ink-500">
        By submitting, you agree to receive admissions updates from AUN. We respect your
        privacy.
      </p>

      <AnimatePresence>
        {status.state === 'error' && (
          <motion.div
            id="modal-form-status"
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          >
            <HiOutlineExclamationCircle size={20} className="mt-0.5 shrink-0 text-red-600" />
            <span>{status.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="form-label">{label}</span>
      {children}
      {error && (
        <span className="mt-1.5 block text-xs text-red-600" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
