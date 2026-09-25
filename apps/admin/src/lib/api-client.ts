const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002";

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${apiUrl}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const body = (await response.json().catch(() => null)) as
    { message?: string; error?: string } | T | null;

  if (!response.ok) {
    if (response.status === 401 && typeof window !== "undefined") {
      window.location.assign("/login");
    }

    const message =
      body && typeof body === "object" && "message" in body
        ? body.message
        : undefined;

    throw new Error(message ?? "درخواست با خطا مواجه شد.");
  }

  return body as T;
}
