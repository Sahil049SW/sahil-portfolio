// Deterministic demo logic for the Spreadsheet / Data Workflow Automation demo.
// Synthetic fixture data only. Pure functions: same input -> same output.

export interface RawRow {
  name: string;
  email: string;
  phone: string;
  date: string;
  amount: string;
}

export interface CleanRow {
  name: string;
  email: string;
  phone: string; // E.164-ish: +1XXXXXXXXXX or "" when unusable
  date: string; // ISO yyyy-mm-dd or "" when unparsable
  amount: number | null;
}

export interface Anomaly {
  rowIndex: number;
  field: keyof RawRow;
  reason: string;
}

export interface DuplicateGroup {
  email: string;
  rowIndexes: number[];
}

export interface NormalizeResult {
  clean: CleanRow[];
  anomalies: Anomaly[];
  duplicates: DuplicateGroup[];
}

/** Intentionally messy synthetic rows. */
export const messyRows: RawRow[] = [
  { name: "alex morgan", email: "ALEX.MORGAN@example.com", phone: "(555) 010-2233", date: "03/04/2025", amount: "$1,200.00" },
  { name: "Priya Nair", email: "priya.nair@example.com", phone: "555-010-8899", date: "2025-03-11", amount: "860" },
  { name: "ALEX MORGAN", email: "alex.morgan@example.com", phone: "5550102233", date: "2025-03-04", amount: "$1,200.00" },
  { name: "Daniel Osei", email: "", phone: "555 010 4411", date: "Apr 2, 2025", amount: "not set" },
  { name: "mei chen", email: "MEI.CHEN@EXAMPLE.COM", phone: "+1 (555) 010-7722", date: "2025-04-15", amount: "$2,045.50" },
];

function normalizeName(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return "";
}

function validIsoDate(year: number, month: number, day: number): string | null {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return null;
  }
  if (month < 1 || month > 12 || day < 1) return null;

  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  if (day > daysInMonth) return null;

  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function normalizeDate(raw: string): string {
  const s = raw.trim();
  const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) {
    return validIsoDate(Number(iso[1]), Number(iso[2]), Number(iso[3])) ?? "";
  }

  const mdy = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (mdy) {
    return validIsoDate(Number(mdy[3]), Number(mdy[1]), Number(mdy[2])) ?? "";
  }

  // "Apr 2, 2025" — parsed with an explicit month map so results are
  // timezone-independent (deterministic on any machine).
  const mdy2 = s.match(/^([A-Za-z]{3,9})\s+(\d{1,2}),\s*(\d{4})$/);
  if (mdy2) {
    const months: Record<string, number> = {
      jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
      jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
    };
    const month = months[mdy2[1].slice(0, 3).toLowerCase()];
    if (month) {
      return validIsoDate(Number(mdy2[3]), month, Number(mdy2[2])) ?? "";
    }
  }
  return "";
}

function normalizeAmount(raw: string): number | null {
  const cleaned = raw.replace(/[$,\s]/g, "");
  if (cleaned === "") return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

export function normalizeRows(rows: RawRow[]): NormalizeResult {
  const anomalies: Anomaly[] = [];
  const clean: CleanRow[] = rows.map((row, rowIndex) => {
    const email = normalizeEmail(row.email);
    const phone = normalizePhone(row.phone);
    const date = normalizeDate(row.date);
    const amount = normalizeAmount(row.amount);

    if (email === "") anomalies.push({ rowIndex, field: "email", reason: "Missing email address" });
    if (row.phone.trim() !== "" && phone === "") anomalies.push({ rowIndex, field: "phone", reason: "Unparsable phone number" });
    if (date === "") anomalies.push({ rowIndex, field: "date", reason: "Unparsable date" });
    if (amount === null) anomalies.push({ rowIndex, field: "amount", reason: "Missing or invalid amount" });

    return { name: normalizeName(row.name), email, phone, date, amount };
  });

  const byEmail = new Map<string, number[]>();
  clean.forEach((row, i) => {
    if (row.email === "") return;
    const list = byEmail.get(row.email) ?? [];
    list.push(i);
    byEmail.set(row.email, list);
  });
  const duplicates: DuplicateGroup[] = [...byEmail.entries()]
    .filter(([, indexes]) => indexes.length > 1)
    .map(([email, rowIndexes]) => ({ email, rowIndexes }));

  return { clean, anomalies, duplicates };
}
