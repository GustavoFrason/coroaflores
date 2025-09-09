// lib/utm.ts
export function withUtm(baseUrl: string, content: string): string {
  const sep = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${sep}utm_source=site&utm_medium=cta&utm_campaign=landing&utm_content=${encodeURIComponent(
    content
  )}`;
}
