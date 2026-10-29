/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type CloudflareRuntime = import('@astrojs/cloudflare').Runtime<Record<string, string>>;
declare namespace App { interface Locals extends CloudflareRuntime {} }
