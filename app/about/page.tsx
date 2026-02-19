import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white pt-24 pb-[clamp(4rem,10vh,8rem)] px-6">

      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl">

        {/* ================= HEADER ================= */}
        <div className="mb-20 text-center">
          <h1 className="font-semibold tracking-tight text-[clamp(2.5rem,5vw,4rem)]">
            About Found It
          </h1>

          <p className="mt-6 text-zinc-400 text-[clamp(1rem,1.5vw,1.25rem)] max-w-3xl mx-auto">
            Found It is a student-built lost and found platform designed to
            reconnect people with their missing belongings quickly, securely,
            and efficiently.
          </p>
        </div>

        {/* ================= MISSION ================= */}
        <div className="mb-24 grid gap-16 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-zinc-300 leading-relaxed">
              Our mission is simple: make it easy to report, search, and recover
              lost items within our school community. By centralizing lost and
              found reports in one accessible place, we reduce confusion and
              increase the chances of items being returned.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-zinc-300 leading-relaxed">
              We aim to create a trusted digital space where students can take
              responsibility for lost items, improve accountability, and help
              one another. Found It is built to be fast, reliable, and easy to use.
            </p>
          </div>
        </div>

        {/* ================= HOW IT WORKS ================= */}
        <div className="mb-32">
          <h2 className="text-2xl font-semibold mb-10 text-center">
            How It Works
          </h2>

          <div className="grid gap-8 md:grid-cols-3 text-center">
            <div className="p-6 rounded-xl border border-white/10 bg-white/5">
              <h3 className="font-semibold mb-2">Report</h3>
              <p className="text-zinc-400 text-sm">
                Found an item? Upload a description and photo so others can identify it.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-white/10 bg-white/5">
              <h3 className="font-semibold mb-2">Search</h3>
              <p className="text-zinc-400 text-sm">
                Browse reported items or search by keywords to find what you’ve lost.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-white/10 bg-white/5">
              <h3 className="font-semibold mb-2">Reconnect</h3>
              <p className="text-zinc-400 text-sm">
                Claim and verify ownership so items can be returned safely.
              </p>
            </div>
          </div>
        </div>

        {/* ================= TEAM SECTION ================= */}
        <div className="relative">

          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-900/10 via-fuchsia-900/10 to-purple-900/10 blur-3xl opacity-60" />

          <h2 className="text-center text-2xl font-semibold mb-12">
            Built By Students
          </h2>

          <div className="flex flex-col gap-12 lg:flex-row">

            {/* Team Member 1 */}
            <div className="relative flex-1 rounded-2xl overflow-hidden border border-white/10 group">
              <div className="relative h-[420px] w-full">
                <Image
                  src="/SLB_Suit.png"
                  alt="Team Member"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-semibold mb-2">
                  Victor Braday
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Lead developer focused on backend systems, database structure,
                  and secure item submission.
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="relative flex-1 rounded-2xl overflow-hidden border border-white/10 group">
              <div className="relative h-[420px] w-full">
                <Image
                  src="/SLB_Suit.png"
                  alt="Team Member"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-semibold mb-2">
                  Aaron Jagroop
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Frontend developer responsible for user experience, interface
                  design, and responsive layout.
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="relative flex-1 rounded-2xl overflow-hidden border border-white/10 group">
              <div className="relative h-[420px] w-full">
                <Image
                  src="/SLB_Suit.png"
                  alt="Team Member"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-semibold mb-2">
                  Janka
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Project contributor supporting testing, organization,
                  and feature planning.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
