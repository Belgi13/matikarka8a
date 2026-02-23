interface Props { current: number; total: number }

export default function ProgressDots({ current, total }: Props) {
  return (
    <div className="flex items-center gap-2 justify-center py-3">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i < current
              ? 'w-3 h-3 bg-[#6D28D9]'
              : i === current
              ? 'w-4 h-4 bg-[#6D28D9] ring-2 ring-[#DDD6FE]'
              : 'w-3 h-3 bg-gray-200'
          }`}
        />
      ))}
    </div>
  )
}
