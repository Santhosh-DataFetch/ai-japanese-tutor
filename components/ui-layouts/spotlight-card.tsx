'use client';

import Image from 'next/image';

const boxes = [
  {
    id: '12',
    chart: '/chart_motl5z.webp',
    className: 'grid xl:col-span-1 col-start-1 col-end-3',
  },
  {
    id: '52',
    chart: '/chart4_s7wsku.webp',
    className: 'grid xl:col-span-1 col-start-3 col-end-6',
  },
  {
    id: '42',
    chart: '/chart3_i9wdgb.webp',
    className: 'grid xl:col-span-1 col-start-1 col-end-3',
  },
  {
    id: '22',
    chart: '/star_tb9ivg.webp',
    className: 'grid xl:col-span-1 col-start-3 col-end-6',
  },
  {
    id: '32',
    title: 'Track Goals',
    chart: '/chart1_rll0mx.webp',
    des: 'Keeping track of your goals helps you stay organized, motivated, and focused.',
    className: 'xl:col-span-2 xl:row-span-2 row-start-2 row-end-3 col-start-1 col-end-6',
  },
];

export default function SpotlightCard() {
  return (
    <div className="relative rounded-2xl bg-black p-4 sm:p-8">
      <div className="grid gap-2 md:grid-cols-4">
        {boxes.map((box) => (
          <div key={box.id} className={`rounded-xl border border-white/10 bg-gradient-to-br from-[#0c0c0c] to-[#252525] p-4 ${box.className}`}>
            <div className="flex h-full flex-col items-center justify-center gap-3 rounded-lg">
              {box.chart ? (
                <Image src={box.chart} alt={box.title ?? 'grid'} width={600} height={600} className="mx-auto w-fit" />
              ) : null}
              {box.title ? <h3 className="text-center text-2xl font-semibold text-white">{box.title}</h3> : null}
              {box.des ? <p className="text-center text-xs text-slate-300 sm:text-sm">{box.des}</p> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
