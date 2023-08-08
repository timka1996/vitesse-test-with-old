import { Dialog, Loading, Notify, Quasar } from 'quasar'
import type { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.use(Quasar, {
    plugins: {
      Notify,
      Dialog,
      Loading,
    },
    config: {
      notify: {
        position: 'top-right',
      },
    },
  })
}
