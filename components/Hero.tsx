
import Link from "next/link";



export default function Hero() {



  return (

//custamizability for hero      pt-24 pb-32

   <section className="relative z-20 w-full overflow-hidden pt-10 pb-32">
    {/* Background */}
    <div className="absolute inset-0 -z-10">
        {/* Black-to-transparent fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent" />

        


        {/* Slashed texture */}
        <div
            className="absolute inset-0"
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
            backgroundSize: "auto, auto, 24px 24px",
            opacity: 0.35,
            maskImage:
                "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
            WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
            }}
        />
        </div>


        {/* Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_.9fr] items-center">
        
        {/* LEFT: Text */}
        <div className="md:pl-6 pr-5">

            <p className="mt-6 max-w-xl text-lg text-zinc-300 pb-10">
                MARMOT ASSOCIATION
            </p>

            <div className="pl-20">
                <h1 className="text-8xl font-semibold tracking-tight text-white md:text-8x1 ">
                    Supporting Local Businesses & Communities
                </h1>

                <p className="mt-6 max-w-xl text-lg text-zinc-300 pl-2">
                    Welcome to Marmot Association - A community dedicated to helping you find and support local small businesses in your area.
                </p>
            

                {/* CTA buttons */}
                <div className="mt-16 flex gap-4">
                    <button className="rounded-md bg-purple-600 px-6 py-3 text-sm font-medium text-white hover:bg-purple-500 transition">
                    Explore Businesses
                    </button>

                    <Link href="/add-business">
                        <button className="rounded-md border border-white/20 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition">
                            Add Your Business
                        </button>
                    </Link>
                </div>
            </div>
        </div>


        {/* RIGHT: Visual area (placeholder for now) */}
        <div className="relative h-[500px] w-full md:pl-12">
            {/* Card container */}
            <div className="absolute inset-0 rounded-2xl bg-white/2 overflow-hidden">

                {/* Abstract accent shapes */}
                <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />
                <div className="absolute bottom-[-60px] left-[-40px] h-32 w-32 rounded-full bg-fuchsia-500/20 blur-2xl" />
                <div className="absolute  right-37 top-18 h-72 w-72 rounded-full bg-purple-600/30 blur-3xl -z-10" />
                
<div
  className="absolute top-16 left--40 h-32 w-164 rotate-[-18deg] bg-purple-700/20"
  style={{
    clipPath: "polygon(0 0, 100% 0, 45% 100%, 0 100%)",
    background:
      "linear-gradient(90deg, rgba(124,45,18,0.15) 0%, rgba(126,34,206,0.35) 50%, rgba(134,25,143,0.65) 100%)",
  }}
/>



                
                {/* Shapes */}
                {/* Curved background pillars */}
                <div className="absolute bottom-0 -right-24 h-[380px] w-48 rounded-t-full bg-purple-800/35 animate-float-slowest" />
                <div className="absolute bottom-0 right-4 h-[320px] w-32 rounded-t-full bg-purple-700/40 animate-float-slow" />
                <div className="absolute bottom-0 right-20 h-[260px] w-24 rounded-t-full bg-fuchsia-600/35 animate-float-slower" />
                <div className="absolute bottom-0 right-36 h-[200px] w-20 rounded-t-full bg-purple-500/30 animate-float-fast" />

                {/* Left ambient shapes */}
                <div className="absolute top-4 left-46 h-56 w-56 rounded-full bg-purple-600/20 blur-3xl animate-float-slower" />
                <div className="absolute top-32 left-12 h-32 w-32 rounded-full bg-fuchsia-500/15 blur-2xl animate-float-slowest" />

                <div className="absolute bottom-20 left-4 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl animate-float-slower" />


                {/* Subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />


                
                {/* Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                
                <img
                    src="/SLB_Suit.png"
                    alt="Founder"
                    className="absolute right-8 top-4 h-140 w-140 rounded-full object-cover z-10"
                />
                </div>

                {/* slanted rectangle */}
                <div className="absolute bottom-[-35px]  left-[-10%] right-[-10%] h-28 bg-black rotate-[-4deg] z-30" 
                    style={{
                        background:"linear-gradient(90deg, rgba(88,28,135,0.55) 0%, rgba(126,34,206,.75) 50%, rgba(196,25,73,0.85) 100%)",
                    }}
                />
                <div className="absolute bottom-[25px]  left-[-30%] right-[-10%] h-28 bg-black rotate-[35deg] z-30" 
                    style={{
                        background:"linear-gradient(90deg, rgba(124,45,18,.55) 0%, rgba(126,34,206,.75) 50%, rgba(134,25,143,0.55) 100%)",
                    }}
                />



                {/* Quote */}
                <div className="absolute bottom-4 left-4 right-4 z-40">
                <p className="text-sm text-zinc-300 italic leading-relaxed">
                    “When you support a small business, you're supporting a dream.”
                </p>
                </div>
            </div>
        </div>




    </div>

</section>

  );
}



