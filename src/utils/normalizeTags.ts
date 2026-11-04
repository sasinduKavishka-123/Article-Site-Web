export function normalizeTag(raw: string, lowercase = true): string {
  const t = raw.trim().replace(/\s+/g, " ");
  return lowercase ? t.toLowerCase() : t;
}

export function addUnique(list: string[], raw: string, lovercase = true): string[]{
        const value = normalizeTag(raw, lovercase)
        if (!value) return list
        if (list.some((x) => x.toLowerCase() === value.toLowerCase())) return list
        return [...list, value]
}