export function MomoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#AE2070" />
      <path fill="#fff" d="M14 46V18h8.2l9.8 16.2L41.8 18H50v28h-7.2V30.2L35.2 44h-6.4l-7.6-13.8V46z" />
    </svg>
  );
}
