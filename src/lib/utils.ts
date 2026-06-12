/** Join class names, skipping falsy values. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Local date as YYYY-MM-DD, used for streak tracking. */
export function todayKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function isYesterday(dayKey: string, now = new Date()): boolean {
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  return dayKey === todayKey(yesterday);
}
