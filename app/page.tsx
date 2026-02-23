import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      <div className="text-8xl mb-6">🌟</div>
      <h1 className="text-4xl font-bold text-[#6D28D9] mb-3">Matikárka</h1>
      <p className="text-xl text-gray-500 mb-10 leading-relaxed">
        Tvoja trpezlivá<br />pomocníčka z matematiky
      </p>
      <Link
        href="/solve"
        className="bg-[#F59E0B] hover:bg-amber-500 text-white text-xl font-semibold px-10 py-4 rounded-2xl shadow-lg transition-all active:scale-95"
      >
        Začnime! →
      </Link>
    </div>
  )
}
