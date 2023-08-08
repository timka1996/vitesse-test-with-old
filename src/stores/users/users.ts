import { acceptHMRUpdate, defineStore } from 'pinia'
import type { QTable } from 'quasar'
import type { IUsers } from '~/types/users/users'
import type { IPageMeta } from '~/types'
import http from '~/utils/axios'

interface IState {
  data: IUsers[]
  organizations: []
  loading: boolean
  editing: null | boolean
  search: string
  pagination: QTable['pagination']
  obj: IUsers
}
export const usersStore = defineStore('users', {
  state: (): IState => ({
    data: [],
    organizations: [],
    loading: false,
    search: '',
    editing: null,
    pagination: {
      rowsNumber: 1,
      rowsPerPage: 15,
      page: 1,
    },
    obj: {
      id: 0,
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
    },
  }),
  actions: {
    setPagination(pageMeta: IPageMeta) {
      if (this.pagination) {
        this.pagination.page = pageMeta.current_page
        this.pagination.rowsNumber = pageMeta.total
        this.pagination.rowsPerPage = pageMeta.per_page
      }
    },
    async fetchData(pagination?: QTable['pagination']) {
      if (this.loading)
        return
      this.loading = true
      try {
        const res = await http.usersAPI.get('/users', /* {
          params: {
            page: pagination?.page || this.pagination?.page,
            search: this.search,
          },
        } */)
        this.data = res.data
      //  this.setPagination(res.data.meta)
      }
      catch (error) {
        return Promise.reject(error)
      }
      finally {
        this.loading = false
      }
    },
    /*    async createSettings() {
      try {
        await http.usersAPI.post('/scoring_contracts_settings', this.obj)
        return Promise.resolve()
      }
      catch (e) {
        return Promise.reject(e)
      }
    },
    async editSettings() {
      try {
        await http.usersAPI.put(
          `/scoring_contracts_settings/${this.obj.id}`,
          this.obj,
        )
        return Promise.resolve()
      }
      catch (e) {
        return Promise.reject(e)
      }
    },
    async fetchOrganization() {
      try {
        const { data } = await http.usersAPI.get(
          '/organization/for_analysis_settings',
        )
        this.organizations = data
        return Promise.resolve()
      }
      catch (err) {
        return Promise.reject(err)
      }
    },
    async toggleActive(id: number) {
      try {
        const res = await http.usersAPI.get('/check_guarantor_contract', {
          params: {
            id,
          },
        })
        return Promise.resolve(res)
      }
      catch (err) {
        return Promise.reject(err)
      }
    }, */
  },
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usersStore, import.meta.hot))
