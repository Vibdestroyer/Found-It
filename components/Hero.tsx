import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative z-20 w-full overflow-hidden pt-20 pb-[min(12vh,6rem)] lg:min-h-screen">



      
        {/* ================= BACKGROUND LAYER ================= */}
        <div
            className="absolute inset-0 animate-[pulse_12s_ease-in-out_infinite]"

            style={{
                backgroundImage: `
                repeating-linear-gradient(
                    135deg,
                    rgba(255,255,255,0.08) 0px,
                    rgba(255,255,255,0.08) 2px,
                    transparent 2px,
                    transparent 26px
                ),
                repeating-linear-gradient(
                    135deg,
                    rgba(255,255,255,0.06) 0px,
                    rgba(255,255,255,0.06) 1px,
                    transparent 1px,
                    transparent 12px
                ),
                radial-gradient(
                    rgba(255,255,255,0.12) 1px,
                    transparent 1px
                )
                `,
                backgroundSize:
                "auto, auto, clamp(16px, 2vw, 28px) clamp(16px, 2vw, 28px)",
                opacity: 0.35,
                maskImage:
                "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
                WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
            }}
        />


        {/* ================= CONTENT GRID ================= */}
       <div className="relative flex items-center pt-10">


            <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-[1fr_.9fr]">
        
                {/* ========== LEFT: TEXT COLUMN ========== */}
                <div className="relative pr-5 lg:pl-6">
                    <div className="mx-auto max-w-[650px] text-center lg:text-left">

                        <h1 className="font-semibold tracking-tight text-white leading-tight text-[clamp(2.5rem,5vw,5rem)]">
                        Supporting Local Businesses & Communities
                        </h1>

                        <p className="mt-8 text-zinc-300 text-[clamp(1rem,1.5vw,1.4rem)]">
                        Welcome to Marmot Association — a community dedicated to helping
                        you find and support local small businesses in your area.
                        </p>

                        {/* CTA buttons */}
                        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center lg:justify-start">

                        <button className="rounded-md bg-purple-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-purple-500">
                            Explore Businesses
                        </button>

                        <Link href="/add-business">
                            <button className="rounded-md border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10">
                            Add Your Business
                            </button>
                        </Link>
                        </div>

                    </div>
                </div>


                {/* ========== RIGHT: VISUAL COLUMN ========== */}
                <div className="relative w-full lg:pl-12">
  
                    {/* DESIGN CANVAS */}
                    <div className="relative mx-auto aspect-[4/3] w-full max-w-[1000px]">

                        {/* Card container */}
                        <div className="absolute inset-0 overflow-hidden rounded-2xl bg-white/5">

                        {/* Ambient shapes */}
                        <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />
                        <div className="absolute bottom-[-60px] left-[-40px] h-32 w-32 rounded-full bg-fuchsia-500/20 blur-2xl" />
                        <div className="absolute right-1/4 top-1/4 h-72 w-72 rounded-full bg-purple-600/30 blur-3xl" />

                        {/* Vertical animated pillars */}
                        <div className="absolute bottom-0 right-[-6%] h-[85%] w-[18%] rounded-t-full bg-purple-800/35 animate-float-slowest" />
                        <div className="absolute bottom-0 right-[4%] h-[70%] w-[16%] rounded-t-full bg-purple-700/40 animate-float-slow" />
                        <div className="absolute bottom-0 right-[12%] h-[57%] w-[14%] rounded-t-full bg-fuchsia-600/35 animate-float-slower" />
                        <div className="absolute bottom-0 right-[20%] h-[48%] w-[12%] rounded-t-full bg-purple-500/30 animate-float-fast" />

                        {/* Image — fluid scaling */}
                        <div className="absolute right-[5%] top-[10%] w-[80%]  aspect-square">
                            <Image
                            src="/SLB_Suit.png"
                            alt="Founder"
                            fill
                            priority
                            className="rounded-full object-cover"
                            />
                        </div>

                        {/* Slanted bar */}
                        <div
                            className="absolute bottom-[-10%] left-[-10%] right-[-10%] h-[20%] rotate-[-4deg]"
                            style={{
                            background:
                                "linear-gradient(90deg, rgba(88,28,135,0.55) 0%, rgba(126,34,206,.75) 50%, rgba(196,25,73,0.85) 100%)",
                            }}
                        />

                        {/* Slanted bar */}
                        <div
                            className="absolute bottom-[8%] left-[-20%] right-[-10%] h-[15%] rotate-[40deg]"
                            style={{
                            background:
                                "linear-gradient(90deg, rgba(124,45,18,.55) 0%, rgba(126,34,206,.75) 50%, rgba(134,25,143,0.55) 100%)",
                            }}
                        />

                        {/* Slanted bar */}
                        <div
                            className="absolute bottom-[80%] left-[-20%] right-[-10%] h-[15%] rotate-[-10deg]"
                            style={{
                            clipPath: "polygon(0 0, 100% 0, 45% 100%, 0 100%)",
                            background:
                                "linear-gradient(90deg, rgba(124,45,18,.55) 0%, rgba(126,34,206,.75) 50%, rgba(134,25,143,0.55) 100%)",
                            }}
                        />

                        {/* Quote */}
                        <div className="absolute bottom-[5%] left-[5%] right-[5%]">
                            <p className="text-sm italic text-zinc-300">
                            “When you support a small business, you're supporting a dream.”
                            </p>
                        </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
}
