import { clientEntry } from "remix/ui"
import { ClickButton } from "./click-button.tsx"

export const ParentClientComponent = clientEntry(import.meta.url, 
  function ParentClientComponent() {
    return () => (
      <div>
          <h1>Parent Client Component</h1>
          <ClickButton label="This logs twice" />
      </div>
    )
})