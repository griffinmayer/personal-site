interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  href?: string;
  external?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-[var(--accent)] text-[var(--base)] hover:bg-[var(--accent-dim)]',
  outline: 'border border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]',
  ghost:   'text-[var(--text-muted)] hover:text-[var(--text)]',
};

export function Button({
  children,
  variant = 'primary',
  href,
  external,
  onClick,
  className,
  type = 'button',
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-lg h-11 px-8 text-sm';
  const classes = `${base} ${variantClasses[variant]} ${className ?? ''}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
