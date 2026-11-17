/**
 * Parse API JSON safely. Vercel FUNCTION_INVOCATION_FAILED returns plain text
 * ("A server error has occurred") which would throw on res.json().
 */
export async function readJsonResponse<T extends Record<string, unknown>>(
  res: Response,
  fallbackError: string
): Promise<T & { error?: string }> {
  const text = await res.text();
  if (!text.trim()) {
    throw new Error(fallbackError);
  }
  try {
    return JSON.parse(text) as T & { error?: string };
  } catch {
    throw new Error(fallbackError);
  }
}
