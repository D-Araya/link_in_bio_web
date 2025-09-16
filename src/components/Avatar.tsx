interface AvatarProps {
  src: string;
  alt: string;
  name: string;
}

const Avatar = ({ src, alt, name }: AvatarProps) => {
  const containerStyle = {
    textAlign: 'center' as const,
    marginBottom: '32px'
  };

  const imageStyle = {
    width: '100%',
    maxWidth: '400px',
    height: 'auto',
    borderRadius: '12px',
    margin: '0 auto 12px auto',
    border: '2px solid #e5e7eb',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: 'transform 0.3s ease',
    display: 'block'
  };

  const nameStyle = {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px'
  };

  return (
    <div style={containerStyle}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={imageStyle}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      />
      <h1 style={nameStyle}>{name}</h1>
    </div>
  );
};

export default Avatar;