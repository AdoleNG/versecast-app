import React, { useEffect, useState } from "react";

/* ----------------------------- StyleInjector -----------------------------
   Injects small CSS utilities (fluid typography + reduced motion) so you
   can paste this single file without editing index.css immediately.
   You can later move these rules into src/index.css if you prefer.
------------------------------------------------------------------------- */
function StyleInjector() {
  useEffect(() => {
    const id = "versecast-fluid-utilities";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
      :root{
        --fluid-h1-min: 1.6rem;
        --fluid-h1-max: 3.75rem;
        --fluid-body-min: 0.95rem;
        --fluid-body-max: 1.125rem;
      }

      .h1-fluid {
        font-size: clamp(var(--fluid-h1-min), 6.5vw, var(--fluid-h1-max));
        line-height: 1.05;
      }

      .text-fluid {
        font-size: clamp(var(--fluid-body-min), 1.6vw, var(--fluid-body-max));
        line-height: 1.5;
      }

      @media (prefers-reduced-motion: reduce) {
        * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
      }

      /* small helper to animate menu height smoothly */
      .transition-max-h {
        transition: max-height 260ms cubic-bezier(.2,.9,.2,1);
      }
    `;
    document.head.appendChild(style);
    return () => {
      // keep it for the session; no cleanup to avoid flicker on HMR
    };
  }, []);
  return null;
}

/* ----------------------------- Header ----------------------------- */
function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#2b124c] text-lg font-bold text-[#f9e79f] shadow-sm">
            V
          </div>
          <div className="min-w-0">
            <div className="truncate text-lg font-semibold tracking-tight sm:text-xl">VerseCast</div>
            <div className="truncate text-sm text-slate-500">AI-driven Bible display for churches</div>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-base text-slate-600 lg:flex">
          <a href="#how-it-works" className="transition hover:text-slate-900">How it works</a>
          <a href="#benefits" className="transition hover:text-slate-900">Benefits</a>
          <a href="#pricing" className="transition hover:text-slate-900">Pricing</a>
          <a href="#contact" className="transition hover:text-slate-900">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden min-h-[44px] items-center justify-center rounded-2xl bg-[#2b124c] px-4 text-base font-semibold text-white transition hover:opacity-95 lg:inline-flex"
          >
            Book Demo
          </a>

          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 lg:hidden"
          >
            <svg className={`h-5 w-5 transition-transform ${open ? "rotate-90" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      <div className={`lg:hidden transition-max-h overflow-hidden bg-white border-t border-slate-100 ${open ? "max-h-[420px]" : "max-h-0"}`}>
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <nav className="flex flex-col gap-3 text-base text-slate-700">
            <a href="#how-it-works" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 hover:bg-slate-50">How it works</a>
            <a href="#benefits" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 hover:bg-slate-50">Benefits</a>
            <a href="#pricing" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 hover:bg-slate-50">Pricing</a>
            <a href="#contact" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 hover:bg-slate-50">Contact</a>
            <a href="#contact" onClick={() => setOpen(false)} className="mt-2 inline-flex min-h-[44px] w-full items-center justify-center rounded-2xl bg-[#2b124c] px-4 text-base font-semibold text-white transition hover:opacity-95">
              Book Demo
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

/* ----------------------------- ControlPanelMockup ----------------------------- */
function ControlPanelMockup() {
  return (
    <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/70 sm:max-w-xl sm:p-5">
      <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-lg font-semibold text-slate-900">Control Panel</div>
            <div className="text-sm text-slate-500">Sunday Morning Service</div>
          </div>
          <div className="w-fit rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">Live</div>
        </div>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Incoming sermon audio</div>
          <div className="mt-2 rounded-xl bg-slate-50 p-3 text-base leading-7 text-slate-700">“Turn with me to Romans chapter 3 verse 23...”</div>
        </div>

        <div className="mt-4 rounded-2xl border border-[#f3e2a0] bg-[#fff9e6] p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6f16]">Detected Bible passage</div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">Romans 3:23</div>
          <div className="mt-2 text-base leading-7 text-slate-700">For all have sinned, and come short of the glory of God;</div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-[#2b124c] px-5 text-sm font-semibold text-white">Approve</button>
            <button className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-slate-300 px-5 text-sm font-semibold text-slate-700">Search manually</button>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-[#2b124c] p-4 text-white">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f9e79f]">Presenter view</div>
          <div className="mt-2 text-2xl font-semibold text-[#f9e79f]">Romans 3:23</div>
          <div className="mt-2 text-base leading-7 text-slate-100">For all have sinned, and come short of the glory of God;</div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Hero ----------------------------- */
function Hero({ heroCards }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(249,231,159,0.28),_transparent_28%),radial-gradient(circle_at_left,_rgba(43,18,76,0.07),_transparent_35%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 sm:py-14 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <div className="mb-3 inline-flex w-fit max-w-full rounded-full border border-[#f9e79f]/60 bg-[#fff9db] px-3 py-1.5 text-xs font-medium text-[#6a5712] sm:text-sm">
            Built for churches, conferences, and ministry teams
          </div>

          <h1 className="max-w-2xl h1-fluid font-bold tracking-tight text-slate-950">
            Display the right Bible passage in real time during live preaching.
          </h1>

          <p className="mt-3 max-w-2xl text-fluid text-slate-600">
            VerseCast helps churches detect spoken Bible references and paraphrased Bible passages during sermons, then shows the result on a control panel so the media team can review and display it with confidence.
          </p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-[#2b124c] px-5 text-base font-semibold text-white shadow-sm transition hover:translate-y-[-1px]"
            >
              Book a Demo
            </a>
            <a
              href="#how-it-works"
              className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-slate-300 px-5 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              See How It Works
            </a>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {heroCards.map(([title, text]) => (
              <div key={title} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="text-lg font-semibold text-slate-900">{title}</div>
                <div className="mt-2 text-base leading-7 text-slate-600">{text}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <ControlPanelMockup />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- HowItWorks ----------------------------- */
function HowItWorks({ workflowSteps }) {
  return (
    <section id="how-it-works" className="border-y border-slate-200 bg-slate-50/70 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#2b124c] sm:text-base">How it works</div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">A live workflow built for real church services.</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600 sm:text-xl">VerseCast supports the media team without removing human review.</p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {workflowSteps.map(([num, title, text]) => (
            <div key={num} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2b124c] text-lg font-bold text-[#f9e79f]">{num}</div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-base leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Benefits ----------------------------- */
function Benefits({ benefitCards }) {
  return (
    <section id="benefits" className="py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#2b124c] sm:text-base">Benefits</div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">More ministry value, less technical distraction.</h2>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {benefitCards.map(([title, text]) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className="inline-flex rounded-2xl bg-[#f6f0ff] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#2b124c]">Value</div>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-base leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Pricing ----------------------------- */
function Pricing({ pricingPlans }) {
  return (
    <section id="pricing" className="border-y border-slate-200 bg-slate-50 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#2b124c] sm:text-base">Pricing</div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">Simple plans for church adoption.</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">Placeholder pricing for your marketing launch. You can adjust these later when you finalize packaging.</p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {pricingPlans.map(([title, price, features]) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="text-xl font-semibold text-slate-900">{title}</div>
              <div className="mt-2 text-4xl font-bold tracking-tight text-slate-950">{price}</div>
              <ul className="mt-5 space-y-3 text-base text-slate-600">
                {features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <a href="#contact" className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl bg-[#2b124c] px-5 text-base font-semibold text-white transition hover:opacity-95">Talk to Sales</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- WhoItsFor ----------------------------- */
function WhoItsFor({ useCases }) {
  return (
    <section className="bg-[#2b124c] py-10 text-white sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f9e79f] sm:text-base">Who it’s for</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Churches, conferences, and ministry teams that want Bible on screen without delay.</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-200">VerseCast is a strong fit for churches that value live teaching clarity, smoother media workflows, and a more connected congregational experience.</p>
          </div>

          <div className="grid gap-3">
            {useCases.map((item) => (
              <div key={item} className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-base font-medium text-slate-100 backdrop-blur-sm">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- GetStarted ----------------------------- */
function GetStarted() {
  return (
    <section className="py-10 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-10 lg:p-12">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#2b124c] sm:text-base">Get started</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">Launch VerseCast for your church.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">Request a live demo, join the early access list, or start conversations about using VerseCast in your ministry context.</p>
          </div>

          <div id="contact" className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto]">
            <input type="email" placeholder="Enter your email" className="min-h-[54px] w-full rounded-2xl border border-slate-300 bg-white px-5 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#2b124c]" />
            <button className="min-h-[54px] rounded-2xl bg-[#2b124c] px-6 text-base font-semibold text-white transition hover:opacity-95">Book a Demo</button>
          </div>

          <p className="mt-4 text-sm text-slate-500">Swap this later for a real waitlist form, contact form, or calendar booking link.</p>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Footer ----------------------------- */
function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 text-base text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>© 2026 VerseCast. AI-driven Bible display for live preaching.</div>
        <div className="flex flex-wrap gap-5">
          <a href="#benefits" className="py-1 transition hover:text-slate-900">Benefits</a>
          <a href="#pricing" className="py-1 transition hover:text-slate-900">Pricing</a>
          <a href="#contact" className="py-1 transition hover:text-slate-900">Contact</a>
        </div>
      </div>
    </footer>
  );
}

/* ----------------------------- Main App ----------------------------- */
export default function App() {
  const heroCards = [
    ["AI-driven detection", "VerseCast listens during live preaching and detects Bible passages mentioned naturally by the minister."],
    ["Less mental strain", "Reduces cognitive load for ministers and media teams during live services."],
    ["Understands paraphrases", "Even when the minister paraphrases a Bible passage, VerseCast can surface the exact Bible text for the media team to review."],
  ];

  const benefitCards = [
    ["AI-driven assistance", "VerseCast uses AI to detect Bible references and Bible passages in live preaching and helps the church respond quickly during the sermon."],
    ["Does not guess at random verses", "The system is designed to surface the intended Bible passage instead of loosely guessing what the minister may have meant."],
    ["Reduced cognitive load", "Ministers and operators can stay focused on preaching, worship, and service flow instead of scrambling to find and confirm Bible passages manually."],
    ["Better congregational engagement", "When the right Bible passage appears clearly on screen, people can follow the message more easily and stay connected to the preaching."],
    ["Real-time speed", "VerseCast detects and surfaces Bible passages within seconds, helping media teams respond quickly during live preaching."],
    ["Media team stays in control", "Detected Bible passages appear on the control panel first so the media team can review, approve, and display them."],
    ["Manual search in seconds", "Media teams can instantly search and project any Bible passage from the control panel whenever needed."],
    ["Support for real church workflows", "VerseCast is built around live preaching, media teams, presenter screens, and the pace of real ministry environments."],
    ["KJV-friendly preaching support", "It is especially well suited to KJV-style language, quotations, and common Bible preaching patterns used in church settings."],
  ];

  const workflowSteps = [
    ["1", "Minister speaks", "VerseCast listens during live preaching without interrupting the service flow."],
    ["2", "AI detects the Bible passage", "It identifies spoken references, ranges, and paraphrased Bible passages in real time."],
    ["3", "Media team reviews", "The suggested Bible passage appears on the control panel first for approval."],
    ["4", "Bible passage appears on screen", "Once approved, the congregation can follow clearly on the presenter screen."],
  ];

  const pricingPlans = [
    ["Starter", "$19/mo", ["1 church account", "1 live service session", "Control panel + presenter", "Email support"]],
    ["Pro", "$49/mo", ["Multiple service sessions", "Team access", "Service logs", "Priority support"]],
    ["Conference", "$199/event", ["Event-based usage", "Temporary setup support", "Presenter and operator workflow", "Ideal for conventions and crusades"]],
  ];

  const useCases = [
    "Sunday worship services",
    "Bible teaching and discipleship meetings",
    "Campus and youth ministries",
    "Conferences and revival programs",
    "Livestream and hybrid church events",
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <StyleInjector />
      <Header />
      <main>
        <Hero heroCards={heroCards} />
        <HowItWorks workflowSteps={workflowSteps} />
        <Benefits benefitCards={benefitCards} />
        <Pricing pricingPlans={pricingPlans} />
        <WhoItsFor useCases={useCases} />
        <GetStarted />
      </main>
      <Footer />
    </div>
  );
}
