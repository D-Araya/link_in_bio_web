import Avatar from './components/Avatar.tsx'
import LinkButton from './components/LinkButton.tsx'

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '16px'
    }}>
      <main style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '16px',
        textAlign: 'center',
        maxWidth: '512px',
        width: '100%',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        <Avatar 
          src="/logo_rastro_sureno.jpg"
          alt="Rastro Sureño Logo"
          name="Rastro Sureño"
        />
        
        <p style={{
          fontSize: '18px',
          color: '#4b5563',
          marginBottom: '12px'
        }}>Quesos Artesanales, Mistelas & Mermeladas</p>
        <p style={{
          fontStyle: 'italic',
          color: '#6b7280',
          marginBottom: '32px'
        }}>"Prueba el Sur, la Patagonia te Invita a Descubrir"</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <LinkButton href="https://google.com/search?q=rastro+sureño" icon="fab fa-google" color="#4285F4">
            Google
          </LinkButton>
          <LinkButton href="https://instagram.com" icon="fab fa-instagram" color="#E4405F">
            Instagram
          </LinkButton>
          <LinkButton href="https://tiktok.com" icon="fab fa-tiktok" color="#000000">
            TikTok
          </LinkButton>
          <LinkButton href="https://facebook.com" icon="fab fa-facebook" color="#1877F2">
            Facebook
          </LinkButton>
          <LinkButton href="https://rastrosureno.com" icon="fas fa-shopping-cart" color="#667eea">
            Rastro Sureño Web E-commerce
          </LinkButton>
          <LinkButton href="https://wa.me/1234567890" icon="fab fa-whatsapp" color="#25D366">
            WhatsApp
          </LinkButton>
        </div>
        
        <footer style={{
          marginTop: '32px',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          <p>&copy; 2025 Rastro Sureño. Todos los derechos reservados.</p>
        </footer>
      </main>
    </div>
  )
}

export default App
