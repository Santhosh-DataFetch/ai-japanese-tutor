'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Edit } from 'lucide-react';

export default function DirectionalDrawerDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-center">
      <figure className="relative h-96 w-96">
        <Image src="/myself2.webp" width={600} height={600} className="h-full w-full rounded-lg object-cover" alt="profile_image" />
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => setOpen((value) => !value)}
          className="absolute bottom-2 right-2 rounded-lg bg-background p-4 shadow-black"
        >
          <Edit />
        </motion.button>
      </figure>

      <motion.div
        initial={false}
        animate={{ x: open ? 0 : 360, opacity: open ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="absolute right-0 top-0 flex h-full w-80 max-w-full flex-col rounded-l-3xl border border-white/10 bg-background/95 p-6 shadow-2xl"
      >
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-semibold">Update Profile Image</h2>
            <p className="mt-1 text-sm text-muted-foreground">Upload a new profile image or remove the current one.</p>
          </div>

          <div className="flex justify-center">
            <div className="grid h-32 w-32 place-content-center rounded-xl bg-muted text-xl font-medium">JP</div>
          </div>

          <label className="block text-sm font-medium">
            Profile Picture
            <input type="file" className="mt-2 w-full cursor-pointer rounded-md border border-border bg-background p-2 file:border-none file:bg-black file:px-3 file:py-1 file:text-white" />
          </label>

          <button type="submit" className="w-full rounded-md bg-foreground p-2 font-medium text-background">
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
}
