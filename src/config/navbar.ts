import type { INavbarConfig } from '~/types'

const navbarConfig: INavbarConfig = {
  links: [
    // {
    //   title: 'Dashboard',
    //   icon: 'carbon-dashboard',
    //   to: '/',
    //   children: [
    //     // {
    //     //   title: 'Umumiy',
    //     //   icon: 'carbon:dashboard-reference',
    //     //   to: '/dashboard',
    //     // },
    //     // {
    //     //   title: 'Undirilgan grafik qoldiq',
    //     //   icon: 'mdi:chart-bar-stacked',
    //     //   to: '/dashboard-for-collector',
    //     //   rules: ['collected_graphic_debt_per_collector.show'],
    //     // },
    //   ],
    // },
    {
      title: 'Users',
      icon: 'ic:outline-insert-chart-outlined',
      to: '/users',
      rules: 'margin_dashboards.show',
      children: [
        {
          title: 'Users',
          icon: 'ic:outline-insert-chart-outlined',
          to: '/users/users',
          rules: ['margin_dashboards.show'],
        },
      ],
    },
    {
      title: 'Posts',
      icon: 'fluent:wallet-credit-card-32-regular',
      to: '/posts',
      rules: 'cashbox.show',
      children: [
        {
          title: 'Posts',
          icon: 'lucide:layout-dashboard',
          to: '/posts/posts',
        },
        /* {
          title: 'To\'lovchilar',
          icon: 'ph:users-three-light',
          to: '/cashbox/clients',
        },
        {
          title: 'Oldindan to\'lov',
          icon: 'ic:baseline-add-card',
          to: '/cashbox/prepaid-clients',
        }, */
      ],
    },

  ],
}
export default navbarConfig
