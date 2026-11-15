import type { ProfileLink } from '../profile'

const LinkButton = ({ id, href, icon, label }: ProfileLink) => (
  <a
    className="link-button"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`${label} (se abre en una pestaña nueva)`}
  >
    <span className={`link-icon link-icon--${id}`} aria-hidden="true">{icon}</span>
    <span>{label}</span>
  </a>
)

export default LinkButton
