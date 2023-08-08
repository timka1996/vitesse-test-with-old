import { acceptHMRUpdate, defineStore } from 'pinia'

interface IState {
  overlay: boolean
  pageTitle: string
  disabled_repository_menu: boolean
}
export const useVariablesStore = defineStore('variables', {
  state: (): IState => ({
    overlay: false,
    pageTitle: '',
    disabled_repository_menu: false,
  }),
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useVariablesStore, import.meta.hot))
