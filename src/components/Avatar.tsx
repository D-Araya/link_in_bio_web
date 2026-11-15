interface AvatarProps {
  src: string
  alt: string
  name: string
}

const Avatar = ({ src, alt, name }: AvatarProps) => (
  <header className="profile-header">
    <img
      className="profile-logo"
      src={src}
      alt={alt}
      width={1056}
      height={664}
      fetchPriority="high"
    />
    <h1>{name}</h1>
  </header>
)

export default Avatar
