/* eslint-disable @typescript-eslint/no-explicit-any */
const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;

if (!CMS_URL) {
  console.warn(
    "NEXT_PUBLIC_CMS_URL is not defined. Using default http://localhost:1337"
  );
}

export class CMSFetchError extends Error {
  status: number;
  statusText: string;
  body: any;

  constructor(status: number, statusText: string, body: any) {
    super(`CMS fetch error: ${status} ${statusText}`);
    this.name = "CMSFetchError";
    this.status = status;
    this.statusText = statusText;
    this.body = body;
  }
}

export async function cmsFetch<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const base = CMS_URL ?? "http://localhost:1337";

  const res = await fetch(`${base}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    next: { revalidate: 60 }
  });

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    // ignore empty body
  }

  if (!res.ok) {
    console.error(`CMS fetch error: ${res.status} ${res.statusText}`, data);
    throw new CMSFetchError(res.status, res.statusText, data);
  }

  return data;
}
