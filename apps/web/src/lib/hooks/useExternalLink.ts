export function useExternalLink(url: string) {
  return () => (window.location.href = url);
}
