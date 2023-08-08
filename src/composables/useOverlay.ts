import { useVariablesStore } from '~/stores/variables'

const store = useVariablesStore()
export function useOverlay(value: boolean) {
  store.overlay = value
}
export function getOverlay(): boolean {
  return store.overlay
}
