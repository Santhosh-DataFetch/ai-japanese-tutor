'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

function FileSvgDraw() {
  return (
    <>
      <svg className="mb-3 h-8 w-8 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
      </svg>
      <p className="mb-1 text-sm text-primary">
        <span className="font-semibold">Click to upload</span>
        &nbsp; or drag and drop
      </p>
      <p className="text-xs text-primary">SVG, PNG, JPG or GIF</p>
    </>
  );
}

export default function FileUploadDropzone() {
  const [files, setFiles] = useState<File[]>([]);
  const previews = useMemo(() => files.map((file) => ({ name: file.name, url: URL.createObjectURL(file) })), [files]);

  return (
    <div className="py-16">
      <div className="mx-auto w-96 rounded-lg border border-dashed border-primary/40 bg-muted p-2">
        <label className="flex min-h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-muted p-4">
          <FileSvgDraw />
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const selectedFiles = Array.from(event.target.files ?? []);
              setFiles(selectedFiles.slice(0, 4));
            }}
          />
        </label>

        <div className="mt-4 flex flex-row flex-wrap gap-2">
          {previews.map((preview, index) => (
            <div key={`${preview.name}-${index}`} className="overflow-hidden rounded-md border p-0">
              <Image src={preview.url} alt={preview.name} height={80} width={80} className="size-20 rounded-md object-cover bg-primary" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
