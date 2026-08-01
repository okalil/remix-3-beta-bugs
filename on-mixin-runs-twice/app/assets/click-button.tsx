import { clientEntry, on, type Handle } from 'remix/ui'

export const ClickButton = clientEntry(import.meta.url, function ClickButton(handle: Handle<{ label: string }>) {
  return () => (
    <button type="button" mix={on('click', () => console.log('click'))}>
      {handle.props.label}
    </button>
  )
})
