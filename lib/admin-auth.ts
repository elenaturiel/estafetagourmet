import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Acceso al panel /admin con una contraseña (variable ADMIN_PASSWORD en Vercel).
 * Al entrar se guarda una cookie firmada que caduca a los 14 días.
 */
const COOKIE = "admin_session";
const DAYS = 14;

const password = () => (process.env.ADMIN_PASSWORD ?? "").trim();
export const isAdminConfigured = () => password().length >= 8;

const sign = (value: string) => createHmac("sha256", password()).update(`estafeta-admin:${value}`).digest("hex");

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function passwordMatches(input: string): boolean {
  if (!isAdminConfigured()) return false;
  return safeEqual(createHmac("sha256", "cmp").update(input).digest("hex"), createHmac("sha256", "cmp").update(password()).digest("hex"));
}

export async function startSession() {
  const expires = Date.now() + DAYS * 86_400_000;
  const jar = await cookies();
  jar.set(COOKIE, `${expires}.${sign(String(expires))}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: DAYS * 86_400,
  });
}

export async function endSession() {
  (await cookies()).delete({ name: COOKIE, path: "/admin" });
}

export async function isAdmin(): Promise<boolean> {
  if (!isAdminConfigured()) return false;
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return false;
  const [expires, mac] = raw.split(".");
  if (!expires || !mac || Number(expires) < Date.now()) return false;
  return safeEqual(mac, sign(expires));
}
