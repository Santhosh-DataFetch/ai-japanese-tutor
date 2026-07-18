interface Props {
  kanji: any[]
}

export default function KanjiList({
  kanji,
}: Props) {
  if (!kanji.length) {
    return (
      <div className="glass-card rounded-xl p-12 text-center">
        <h2 className="text-2xl font-bold">
          No kanji found
        </h2>

        <p className="mt-2 text-muted-foreground">
          Import a kanji dictionary first.
        </p>
      </div>
    )
  }

  return (
    <div
      className="
      grid
      gap-4
      grid-cols-2
      md:grid-cols-3
      lg:grid-cols-5
      xl:grid-cols-6
    "
    >
      {kanji.map((k) => (
        <div
          key={k.id}
          className="
            glass-card
            rounded-xl
            p-5
            hover:scale-105
            transition
            cursor-pointer
          "
        >
          <div className="text-5xl font-bold">
            {k.kanji_character}
          </div>

          <p className="mt-3 text-primary">
            {k.on_reading}
          </p>

          <p className="text-sm text-muted-foreground">
            {k.kun_reading}
          </p>

          <p className="mt-4">
            {k.meaning}
          </p>

          <div className="mt-4 flex justify-between text-xs text-muted-foreground">
            <span>
              {k.stroke_count} strokes
            </span>

            <span>
              Lv.{k.difficulty_level}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}