'use client'

import { useEffect, useState } from 'react'

interface LegalPageProps {
  title: string
  lastUpdated: string
  sections: { id: string; title: string; content: string }[]
}

export default function LegalPageLayout({ title, lastUpdated, sections }: LegalPageProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id || '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px' }
    )

    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        {/* TOC Sidebar */}
        <aside className="hidden lg:block w-[200px] shrink-0">
          <div className="sticky top-[88px] bg-surface border border-primary/10 rounded-xl p-5">
            <p className="text-on-surface/40 text-[11px] uppercase tracking-wider font-label mb-3">Contents</p>
            <nav className="space-y-1.5">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`block text-[13px] transition-colors py-1 ${
                    activeId === s.id
                      ? 'text-primary font-semibold border-l-2 border-primary pl-3'
                      : 'text-on-surface/50 hover:text-on-surface/80 pl-3'
                  }`}
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 max-w-[740px]">
          <div className="glass-card legal-card p-8 sm:p-10 lg:p-11">
            {/* Last updated badge */}
            <span className="inline-block bg-primary/[0.08] border border-primary/15 text-on-surface/50 text-xs px-3 py-1 rounded-full mb-7">
              Last Updated: {lastUpdated}
            </span>

            <h1 className="font-display font-bold text-3xl text-on-surface mb-8">{title}</h1>

            <div className="space-y-10">
              {sections.map((s) => (
                <section key={s.id} id={s.id}>
                  <h2 className="font-display font-semibold text-xl text-on-surface border-l-[3px] border-primary pl-4 mb-4">
                    {s.title}
                  </h2>
                  <div
                    className="text-on-surface/80 text-[15px] font-body leading-[1.85] space-y-4 [&_a]:text-primary [&_a]:underline [&_strong]:text-on-surface"
                    dangerouslySetInnerHTML={{ __html: s.content }}
                  />
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
