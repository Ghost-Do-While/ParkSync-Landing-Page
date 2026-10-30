import { useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useAnimation, revealChildren } from '../lib/useAnimation'
import { TEAM } from '../data/content'
import { GitHubIcon } from './Icons'
import SectionHead from './SectionHead'
import Avatar from './Avatar'

export default function Team() {
  const ref = useRef(null)

  useAnimation(ref, (root) => {
    revealChildren(root)
    gsap.from(root.querySelectorAll('[data-dim]'), {
      scaleX: 0, duration: 1, ease: 'power2.out',
      scrollTrigger: { trigger: root, start: 'top 75%', once: true },
    })
    gsap.from(root.querySelectorAll('.member'), {
      autoAlpha: 0, y: 30, rotateX: -12, stagger: 0.1, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: root.querySelector('.team'), start: 'top 85%', once: true },
    })
  })

  return (
    <section className="section" id="equipe" ref={ref} aria-labelledby="equipe-title">
      <div className="container">
        <SectionHead
          id="equipe-title"
          idx="07"
          label="Autoria"
          title={<>Quem <em>projetou</em> o ParkSync.</>}
          lead="Projeto desenvolvido como Trabalho de Conclusão de Curso do Técnico em Desenvolvimento de Sistemas."
          dim="RESPONSÁVEIS TÉCNICOS"
        />
        <ul className="team">
          {TEAM.map((m) => (
            <li key={m.github}>
              <article className="member panel crop">
                <Avatar member={m} />
                <div>
                  <h3>{m.name}</h3>
                  <ul className="member__roles" aria-label="Funções">
                    {m.roles.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
                <a href={`https://github.com/${m.github}`} target="_blank" rel="noreferrer">
                  <GitHubIcon /> {m.github}
                  <span className="visually-hidden"> no GitHub (abre em nova aba)</span>
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
