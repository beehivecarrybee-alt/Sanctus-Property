import { useEffect, useRef, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const PROPERTY_TYPES = [
  "Residential",
  "Commercial",
  "Mixed-use",
  "Land / Plot",
  "Renovation",
  "Other",
];

const BUDGETS = [
  "Under ₹50L",
  "₹50L – ₹1Cr",
  "₹1Cr – ₹5Cr",
  "₹5Cr – ₹10Cr",
  "Above ₹10Cr",
  "Prefer not to say",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  budget: string;
  message: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  propertyType: "",
  budget: "",
  message: "",
};

export function EnquiryDialog({ open, onClose }: Props) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const overlayRef = useRef<HTMLDivElement>(null);

  // Reset on open
  useEffect(() => {
    if (open) {
      setForm(EMPTY);
      setErrors({});
      setSubmitted(false);
      setLoading(false);
    }
  }, [open]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && !loading) onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, loading]);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 7) e.phone = "Valid phone required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to send enquiry");
      }
      
      setSubmitted(true);
    } catch (error: any) {
      console.error("Submission failed:", error);
      alert(error.message || "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(20,16,12,0.72)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div
        className="relative w-full max-w-lg max-h-[92dvh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
        style={{ animation: "enquiryIn 0.3s cubic-bezier(0.22,1,0.36,1)" }}
      >
        {/* Gold top accent strip */}
        <div className="h-1 w-full rounded-t-2xl bg-gradient-to-r from-[#C9883A] via-[#e8b06e] to-[#C9883A]" />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close enquiry"
          className="absolute top-4 right-4 h-8 w-8 rounded-full bg-[oklch(0.94_0.01_80)] flex items-center justify-center text-[oklch(0.48_0.012_80)] hover:bg-[oklch(0.9_0.012_80)] transition-colors z-10"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <div className="px-8 pt-8 pb-10">
          {submitted ? (
            /* ── Success state ── */
            <div className="flex flex-col items-center text-center py-8 gap-5">
              <div className="h-16 w-16 rounded-full bg-[oklch(0.72_0.13_70)]/10 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="oklch(0.72 0.13 70)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 style={{ fontFamily: "var(--font-display, Georgia, serif)" }} className="text-2xl font-medium text-[oklch(0.18_0.01_80)]">
                Enquiry Received
              </h2>
              <p className="text-sm text-[oklch(0.48_0.012_80)] max-w-xs leading-relaxed">
                Thank you, <strong>{form.name}</strong>. Our team at Sanctus Property will get back to you within one business day.
              </p>
              <div className="mt-2 h-px w-16 bg-[oklch(0.72_0.13_70)]/40" />
              <button
                onClick={onClose}
                className="mt-2 rounded-full bg-[oklch(0.18_0.01_80)] text-white px-8 py-3 text-sm hover:bg-[oklch(0.72_0.13_70)] transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <>
              <div className="mb-7">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[oklch(0.48_0.012_80)] mb-3">
                  <span className="h-px w-6 bg-[oklch(0.72_0.13_70)]" />
                  Sanctus Property
                </div>
                <h2 style={{ fontFamily: "var(--font-display, Georgia, serif)" }} className="text-2xl md:text-3xl font-medium text-[oklch(0.18_0.01_80)] leading-tight">
                  Start your enquiry
                </h2>
                <p className="mt-2 text-sm text-[oklch(0.48_0.012_80)]">
                  Fill in your details and we'll be in touch shortly.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <Field label="Full Name *" error={errors.name}>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={set("name")}
                    className={inputCls(!!errors.name)}
                  />
                </Field>

                {/* Email + Phone — side by side on sm+ */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Email Address *" error={errors.email}>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={set("email")}
                      className={inputCls(!!errors.email)}
                    />
                  </Field>
                  <Field label="Phone Number *" error={errors.phone}>
                    <input
                      type="tel"
                      placeholder="+00 00000 00000"
                      value={form.phone}
                      onChange={set("phone")}
                      className={inputCls(!!errors.phone)}
                    />
                  </Field>
                </div>

                {/* Property type + Budget */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Property Type">
                    <select value={form.propertyType} onChange={set("propertyType")} className={inputCls(false)}>
                      <option value="">Select type…</option>
                      {PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </Field>
                  <Field label="Budget Range">
                    <select value={form.budget} onChange={set("budget")} className={inputCls(false)}>
                      <option value="">Select budget…</option>
                      {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </Field>
                </div>

                {/* Message */}
                <Field label="Your Message">
                  <textarea
                    rows={3}
                    placeholder="Tell us about your project or requirement…"
                    value={form.message}
                    onChange={set("message")}
                    className={inputCls(false) + " resize-none"}
                  />
                </Field>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-[oklch(0.18_0.01_80)] text-white py-3.5 text-sm font-medium tracking-wide hover:bg-[oklch(0.72_0.13_70)] hover:text-[oklch(0.16_0.008_80)] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Submit Enquiry →"}
                </button>

                <p className="text-center text-[10px] text-[oklch(0.65_0.012_80)]">
                  We respect your privacy. Your details are never shared.
                </p>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Keyframe */}
      <style>{`
        @keyframes enquiryIn {
          from { opacity: 0; transform: scale(0.94) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ── Helpers ── */
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-[oklch(0.35_0.01_80)] tracking-wide">{label}</label>
      {children}
      {error && <span className="text-[11px] text-red-500">{error}</span>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return [
    "w-full rounded-xl border px-4 py-2.5 text-sm bg-[oklch(0.985_0.005_80)] text-[oklch(0.18_0.01_80)]",
    "placeholder:text-[oklch(0.7_0.008_80)] outline-none",
    "focus:border-[oklch(0.72_0.13_70)] focus:ring-2 focus:ring-[oklch(0.72_0.13_70)]/20 transition",
    hasError ? "border-red-400" : "border-[oklch(0.88_0.01_80)]",
  ].join(" ");
}
