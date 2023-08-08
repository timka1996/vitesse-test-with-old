import { type ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface IPageMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface INavbarLink {
  title: string
  icon: string
  to: string
  rules?: Array<string> | string
  children?: INavbarLink[]
}

export interface INavbarConfig {
  links: INavbarLink[]
}
