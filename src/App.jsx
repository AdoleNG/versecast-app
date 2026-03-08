export default function VerseCastMarketingSite() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#2b124c] text-lg font-bold text-[#f9e79f] shadow-sm">
              V
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight">VerseCast</div>
              <div className="text-xs text-slate-500">AI-driven Bible display for churches</div>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
            <a href="#how-it-works" className="transition hover:text-slate-900">How it works</a>
            <a href="#benefits" className="transition hover:text-slate-900">Benefits</a>
            <a href="#pricing" className="transition hover:text-slate-900">Pricing</a>
            <a href="#contact" className="transition hover:text-slate-900">Contact</a>
          </nav>

          <div className="hidden md:block">
            <a
              href="#contact"
              className="rounded-xl bg-[#2b124c] px-4 py-2 text-sm font-medium text-white transition hover:opacity-95"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(249,231,159,0.28),_transparent_28%),radial-gradient(circle_at_left,_rgba(43,18,76,0.07),_transparent_35%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-flex w-fit items-center rounded-full border border-[#f9e79f]/60 bg-[#fff9db] px-3 py-1 text-sm font-medium text-[#6a5712]">
                Built for churches, conferences, and ministry teams
              </div>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Help your congregation follow the sermon with Bible on screen in real time.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                VerseCast is an AI-driven Bible display platform that helps churches show the right Bible passage during live preaching. It reduces cognitive load for ministers and media teams, supports clearer teaching, and keeps attention on the message instead of manual verse searching.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="rounded-2xl bg-[#2b124c] px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:translate-y-[-1px]"
                >
                  Book a Demo
                </a>
                <a
                  href="#benefits"
                  className="rounded-2xl border border-slate-300 px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  See the Benefits
                </a>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  ["AI-driven", "Uses intelligent scripture detection during live preaching"],
                  ["Less mental strain", "Reduces cognitive load for ministers and media teams"],
                  ["Bible-first", "Designed to match real Bible references. Does not guess"],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="text-sm font-semibold text-slate-900">{title}</div>
                    <div className="mt-1 text-sm text-slate-600">{text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full max-w-2xl rounded-[28px] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200/70">
                <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">VerseCast Control Panel</div>
                      <div className="text-xs text-slate-500">Session: Sunday Morning Service</div>
                    </div>
                    <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                      Live
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Incoming sermon audio
                    </div>
                    <div className="mt-3 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                      “Turn with me to Romans chapter 3 verse 23...”
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-2xl border border-[#f3e2a0] bg-[#fff9e6] p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6f16]">
                        Detected Bible reference
                      </div>
                      <div className="mt-3 text-lg font-semibold text-slate-900">Romans 3:23</div>
                      <div className="mt-2 text-sm leading-7 text-slate-700">
                        For all have sinned, and come short of the glory of God;
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-[#2b124c] p-4 text-white">
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f9e79f]">
                        Presenter view
                      </div>
                      <div className="mt-4 text-2xl font-semibold text-[#f9e79f]">Romans 3:23</div>
                      <div className="mt-3 text-sm leading-7 text-slate-100">
                        For all have sinned, and come short of the glory of God;
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="border-y border-slate-200 bg-slate-50/70 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#2b124c]">How it works</div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                A simple service workflow that supports preaching, teaching, and worship.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                ["1", "The minister preaches naturally", "VerseCast listens during live preaching and Bible teaching without requiring rigid commands or manual searching."],
                ["2", "VerseCast detects the Bible reference", "Its AI-driven engine identifies spoken references and ranges in real time while staying grounded in the Bible text rather than inventing meanings."],
                ["3", "The verse appears on screen", "The congregation can follow visually while the minister and media team stay focused on the message."],
              ].map(([num, title, text]) => (
                <div key={num} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2b124c] text-lg font-bold text-[#f9e79f]">
                    {num}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-900">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="benefits" className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#2b124c]">Benefits</div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                More ministry value, less technical distraction.
              </h2>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {[
                ["AI-driven assistance", "VerseCast uses AI to detect Bible references in live preaching and help the church respond quickly during the sermon."],
                ["Does not guess at random verses", "The system is built to match real Bible references and passages rather than loosely interpreting what it thinks the preacher meant."],
                ["Reduced cognitive load", "Ministers and operators can stay focused on preaching, worship, and service flow instead of scrambling to find and confirm verses manually."],
                ["Better congregational engagement", "When Bible passages appears clearly on screen, people can follow the message more easily and stay connected to the preached text."],
                ["Support for real church workflows", "VerseCast is designed around live preaching, media teams, presenter screens, and the pace of real ministry environments."],
                ["KJV-friendly sermon support", "It is especially well suited to KJV-style preaching language, quotations, and Bible patterns common in church settings."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                  <div className="inline-flex rounded-2xl bg-[#f6f0ff] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#2b124c]">
                    Value
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-slate-900">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="border-y border-slate-200 bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#2b124c]">Pricing</div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Simple plans for church adoption.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Placeholder pricing for your marketing launch. You can adjust these later when you finalize packaging.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {[
                ["Starter", "$19/mo", ["1 church account", "1 live service session", "Control panel + presenter", "Email support"]],
                ["Pro", "$49/mo", ["Multiple service sessions", "Team access", "Service logs", "Priority support"]],
                ["Conference", "$199/event", ["Event-based usage", "Temporary setup support", "Presenter and operator workflow", "Ideal for conventions and crusades"]],
              ].map(([title, price, features]) => (
                <div key={title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="text-lg font-semibold text-slate-900">{title}</div>
                  <div className="mt-3 text-4xl font-bold tracking-tight text-slate-950">{price}</div>
                  <ul className="mt-6 space-y-3 text-sm text-slate-600">
                    {features.map((feature) => (
                      <li key={feature}>• {feature}</li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="mt-8 inline-flex rounded-2xl bg-[#2b124c] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
                  >
                    Talk to Sales
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#2b124c] py-20 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f9e79f]">Who it’s for</div>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Churches, conferences, and ministry teams that want Bible on screen without delay.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200">
                  VerseCast is a strong fit for churches that value live teaching clarity, smoother media workflows, and a more connected congregational experience.
                </p>
              </div>

              <div className="grid gap-4">
                {[
                  "Sunday worship services",
                  "Bible teaching and discipleship meetings",
                  "Campus and youth ministries",
                  "Conferences and revival programs",
                  "Livestream and hybrid church events",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-sm font-medium text-slate-100 backdrop-blur-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm sm:p-12">
              <div className="max-w-3xl">
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#2b124c]">Get started</div>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  Launch VerseCast for your church.
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  Request a live demo, join the early access list, or start conversations about using VerseCast in your ministry context.
                </p>
              </div>

              <div id="contact" className="mt-8 grid gap-4 sm:grid-cols-[1fr_auto]">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-[#2b124c]"
                />
                <button className="rounded-2xl bg-[#2b124c] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95">
                  Book a Demo
                </button>
              </div>
              <p className="mt-3 text-xs text-slate-500">Swap this later for a real waitlist form, contact form, or calendar booking link.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>© 2026 VerseCast. AI-driven Bible display for live preaching.</div>
          <div className="flex gap-6">
            <a href="#benefits" className="transition hover:text-slate-900">Benefits</a>
            <a href="#pricing" className="transition hover:text-slate-900">Pricing</a>
            <a href="#contact" className="transition hover:text-slate-900">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}