import Avatar from './components/Avatar'
import LinkButton from './components/LinkButton'
import { profile } from './profile'
import logo from './assets/logo_rastro_sureno.jpg'

function App() {
  return (
    <main className="profile-card">
      <Avatar src={logo} alt="Logo de Rastro Sureño" name={profile.name} />
      <p className="profile-description">{profile.description}</p>
      <p className="profile-tagline">“{profile.tagline}”</p>
      <nav className="profile-links" aria-label="Canales de Rastro Sureño">
        {profile.links.map((link) => <LinkButton key={link.id} {...link} />)}
      </nav>
      <footer className="profile-footer">
        <p>&copy; {new Date().getFullYear()} {profile.name}. Todos los derechos reservados.</p>
      </footer>
    </main>
  )
}

export default App
