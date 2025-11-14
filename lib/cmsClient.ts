const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;

if (!CMS_URL) {
  console.warn(
    "NEXT_PUBLIC_CMS_URL is not defined. Using default http://localhost:1337"
  );
}

export async function cmsFetch<T = any>(
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

  if (!res.ok) {
    console.error(`CMS fetch error: ${res.status} ${res.statusText}`);
    throw new Error("Failed to fetch from CMS");
  }

  return res.json();
}
