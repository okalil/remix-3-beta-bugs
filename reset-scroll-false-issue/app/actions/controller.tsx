import { createController } from 'remix/router'
import { css } from 'remix/ui'

import { assetServer } from '../assets.ts'
import { routes } from '../routes.ts'
import { Document } from '../ui/document.tsx'

export default createController(routes, {
  actions: {
    async assets(context) {
      return (
        (await assetServer.fetch(context.request)) ?? new Response('Not Found', { status: 404 })
      )
    },
    home(context) {
      let url = new URL(context.request.url)
      let sort = url.searchParams.get('sort') ?? 'newest'

      return context.render(
        <Document title="rmx-reset-scroll=false">
          <main
            mix={css({
              fontFamily: 'system-ui, sans-serif',
              maxWidth: '40rem',
              margin: '0 auto',
              padding: '1.5rem',
              lineHeight: 1.5,
            })}
          >
            <h1>rmx-reset-scroll="false"</h1>
            <p>
              Scroll down, then click a sort link. With <code>rmx-reset-scroll="false"</code>,
              scroll position should be preserved. Currently it resets to the top.
            </p>
            <p>
              Current sort: <strong>{sort}</strong>
            </p>

            <nav
              aria-label="Sort"
              mix={css({
                position: 'sticky',
                top: 0,
                display: 'flex',
                gap: '1rem',
                padding: '0.75rem 0',
                background: 'white',
                borderBottom: '1px solid #ddd',
                '& a': { color: '#06c' },
              })}
            >
              <a href="?sort=newest" rmx-reset-scroll="false">
                Newest
              </a>
              <a href="?sort=oldest" rmx-reset-scroll="false">
                Oldest
              </a>
              <a href="?sort=popular" rmx-reset-scroll="false">
                Popular
              </a>
            </nav>

            <ol
              mix={css({
                margin: '1.5rem 0 0',
                padding: 0,
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              })}
            >
              {itemsForSort(sort).map((item, index) => (
                <li
                  key={item}
                  mix={css({
                    padding: '1.25rem',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    minHeight: '6rem',
                  })}
                >
                  <strong>
                    #{index + 1}: {item}
                  </strong>
                  <p mix={css({ margin: '0.5rem 0 0', color: '#555' })}>
                    Tall list item so the page scrolls. Use this space to scroll past the sticky
                    nav, then change sort without expecting a jump to the top.
                  </p>
                </li>
              ))}
            </ol>
          </main>
        </Document>,
      )
    },
  },
})

function itemsForSort(sort: string): string[] {
  let items = Array.from({ length: 40 }, (_, i) => `Item ${i + 1}`)
  if (sort === 'oldest') return items.slice().reverse()
  if (sort === 'popular') return items.slice().sort((a, b) => b.length - a.length || a.localeCompare(b))
  return items
}
