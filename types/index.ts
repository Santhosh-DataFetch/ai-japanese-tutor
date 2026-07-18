import type { Database } from "./database";

export type Vocabulary =
  Database["public"]["Tables"]["vocabulary"]["Row"];

export type Kanji =
  Database["public"]["Tables"]["kanji_dictionary"]["Row"];

export type UserProfile =
  Database["public"]["Tables"]["profiles"]["Row"];