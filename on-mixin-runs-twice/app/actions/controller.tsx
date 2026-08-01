import { createController } from 'remix/router'
import { Frame } from 'remix/ui'

import { ClickButton } from '../assets/click-button.tsx'
import { assetServer } from '../assets.ts'
import { routes } from '../routes.ts'
import { Document } from '../ui/document.tsx'
import { ParentClientComponent } from '../assets/parent-client-component.tsx'

export default createController(routes, {
  actions: {
    async assets(context) {
      return (
        (await assetServer.fetch(context.request)) ?? new Response('Not Found', { status: 404 })
      )
    },
    home(context) {
      return context.render(
        <Document title="On Mixin Runs Twice">
          <main>
            <h1>Home</h1>
            <ClickButton label="This logs once" />
            <Frame src={routes.child.href()} />
          </main>
        </Document>,
      )
    },
    child(context) {
      return context.render(<ParentClientComponent />)
    },
  },
})
