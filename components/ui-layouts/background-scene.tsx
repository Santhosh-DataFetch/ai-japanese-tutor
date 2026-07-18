'use client';

import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import { useMemo } from 'react';
import BackgroundModel from './background-model';
import useDimension from './use-dimension';

export default function BackgroundScene() {
  const device = useDimension();

  const frustumSize = device.height || 1080;
  const aspect = device.width / (device.height || 1080);

  const cameraArgs = useMemo(() => [
    (frustumSize * aspect) / -2,
    (frustumSize * aspect) / 2,
    frustumSize / 2,
    frustumSize / -2,
    -1000,
    1000,
  ] as const, [aspect, frustumSize]);

  if (!device.width || !device.height) {
    return null;
  }

  return (
    <div className="relative h-screen w-full bg-neutral-950 text-white">
      <Canvas>
        <OrthographicCamera makeDefault args={cameraArgs} position={[0, 0, 2]} />
        <BackgroundModel />
      </Canvas>
      <article className="absolute bottom-14 w-full text-center">
        <h1 className="text-7xl uppercase tracking-tighter 2xl:text-8xl">Independent</h1>
        <p className="text-xl 2xl:text-2xl">Live for yourself, not for society.</p>
      </article>
    </div>
  );
}
