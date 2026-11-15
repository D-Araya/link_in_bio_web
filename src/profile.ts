export interface ProfileLink {
  id: string
  label: string
  href: `https://${string}`
  icon: string
}

// Public business data. Update here and rebuild; no runtime secrets are needed.
export const profile = {
  name: 'Rastro Sureño',
  description: 'Quesos Artesanales, Mistelas & Mermeladas',
  tagline: 'Prueba el Sur, la Patagonia te Invita a Descubrir',
  links: [
    { id: 'google', label: 'Google', href: 'https://www.google.com/search?q=rastro+sure%C3%B1o', icon: 'G' },
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/rastrosureno/', icon: '◎' },
    { id: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@rastrosureno', icon: '♪' },
    { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/rastrosureno/', icon: 'f' },
    { id: 'website', label: 'Rastro Sureño Web E-commerce', href: 'https://rastrosureno.com', icon: '↗' },
    { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/56993504989', icon: '◉' },
  ] satisfies ProfileLink[],
}
