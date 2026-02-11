export default function Turtle() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b0b10] via-[#120f1a] to-[#0b0b10]" />

      {/* Purple / magenta ambient glows */}
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#a855f7]/35 blur-[140px]" />
      <div className="absolute top-1/3 right-[-200px] h-[460px] w-[460px] rounded-full bg-[#d946ef]/25 blur-[140px]" />
      <div className="absolute bottom-[-220px] left-1/2 h-[420px] w-[420px] rounded-full bg-[#8b5cf6]/20 blur-[120px]" />
    </div>
  );
}
