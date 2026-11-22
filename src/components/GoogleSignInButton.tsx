import React from 'react';

/** Official multicolor Google «G» (Identity branding paths). */
export function GoogleGIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      className="google-btn__icon"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7 12.9 19.6C14.7 15.1 18.9 12 24 12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.1 35.2 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l.0.0 6.2 5.2C39.2 36.9 44 32 44 24c0-1.2-.1-2.3-.4-3.5z"
      />
    </svg>
  );
}

type GoogleSignInButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  /** Italian label — default «Accedi con Google». */
  children?: React.ReactNode;
  className?: string;
  /** Stretch to parent width (e.g. coming-soon owner gate). */
  fullWidth?: boolean;
  type?: 'button' | 'submit';
};

/**
 * ENN-210 — Maria’s glass pill Google OAuth CTA (not gold, not rect 4px).
 * Light frosted glass + official G; readable on dark Tarot Italia UI.
 * Auth wiring stays with the caller (Firebase `signInWithPopup`).
 */
export function GoogleSignInButton({
  onClick,
  disabled = false,
  children = 'Accedi con Google',
  className,
  fullWidth = false,
  type = 'button',
}: GoogleSignInButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={['google-btn', fullWidth ? 'google-btn--block' : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      <GoogleGIcon />
      <span className="google-btn__label">{children}</span>
    </button>
  );
}
