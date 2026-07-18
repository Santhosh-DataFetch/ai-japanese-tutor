"use client";

import { useState } from "react";

interface Props {
  onSearch: (v: string) => void;
  onJlpt: (v: string) => void;
  onSort: (v: string) => void;
}

export default function VocabularyToolbar({
  onSearch,
  onJlpt,
  onSort,
}: Props) {
  const [search, setSearch] = useState("");

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-3">

      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          onSearch(e.target.value);
        }}
        className="rounded-xl bg-muted p-3"
      />

      <select
        className="rounded-xl bg-muted p-3"
        onChange={(e) => onJlpt(e.target.value)}
      >
        <option value="">All JLPT</option>
        <option>N5</option>
        <option>N4</option>
        <option>N3</option>
        <option>N2</option>
        <option>N1</option>
      </select>

      <select
        className="rounded-xl bg-muted p-3"
        onChange={(e) => onSort(e.target.value)}
      >
        <option value="a-z">A → Z</option>
        <option value="z-a">Z → A</option>
        <option value="newest">Newest</option>
      </select>

    </div>
  );
}