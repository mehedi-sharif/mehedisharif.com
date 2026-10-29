import type { APIContext } from "astro";
export function secret(locals: APIContext["locals"], name: string): string {
  const value = locals.runtime?.env?.[name] ?? import.meta.env[name];
  if (!value) throw new Error(`Missing server configuration: ${name}`);
  return value;
}
