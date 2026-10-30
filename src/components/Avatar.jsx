import { useState } from 'react'

// Fotos locais em src/assets/images, empacotadas pelo Vite (só entram no build as que existem).
const LOCAL = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
})
const byName = Object.fromEntries(
  Object.entries(LOCAL).map(([path, url]) => [path.split('/').pop().toLowerCase(), url]),
)

function localPhoto(member) {
  if (member.photo) return byName[member.photo.toLowerCase()]
  const base = member.github.toLowerCase()
  return Object.entries(byName).find(([file]) => file.replace(/\.[^.]+$/, '') === base)?.[1]
}

const initials = (name) => {
  const parts = name.split(' ')
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

// Ordem: foto local → foto de perfil do GitHub → iniciais.
export default function Avatar({ member }) {
  const sources = [localPhoto(member), `https://github.com/${member.github}.png?size=240`].filter(Boolean)
  const [idx, setIdx] = useState(0)
  const src = sources[idx]

  return (
    <span className="member__photo">
      {src ? (
        <img
          src={src}
          alt={`Foto de ${member.name}`}
          width="240"
          height="240"
          loading="lazy"
          decoding="async"
          onError={() => setIdx((i) => i + 1)}
        />
      ) : (
        <span className="member__initials" role="img" aria-label={member.name}>
          {initials(member.name)}
        </span>
      )}
    </span>
  )
}
