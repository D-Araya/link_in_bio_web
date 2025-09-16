interface LinkButtonProps {
  href: string;
  icon: string;
  children?: React.ReactNode;
  text?: string;
  color?: string;
}

const LinkButton = ({ href, icon, children, text, color }: LinkButtonProps) => {
  const baseStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px 24px',
    backgroundColor: '#ffffff',
    color: '#1f2937',
    textDecoration: 'none',
    borderRadius: '12px',
    fontWeight: '500',
    fontSize: '16px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '2px solid #e5e7eb',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    gap: '12px',
    cursor: 'pointer'
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = '#f9fafb';
    e.currentTarget.style.borderColor = '#d1d5db';
    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    e.currentTarget.style.transform = 'translateY(-2px)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = '#ffffff';
    e.currentTarget.style.borderColor = '#e5e7eb';
    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    e.currentTarget.style.transform = 'translateY(0)';
  };

  return (
    <a
      href={href}
      style={baseStyle}
      target={href.startsWith('http') ? '_blank' : '_self'}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={`Visitar ${text || children} en nueva pestaña`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {icon.startsWith('fa') ? (
         <i className={icon} style={{ marginRight: '8px', color: color || '#1f2937' }} />
       ) : (
         <span style={{ marginRight: '8px', color: color || '#1f2937' }}>{icon}</span>
       )}
       {text || children}
    </a>
  );
};

export default LinkButton;