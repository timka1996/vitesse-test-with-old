<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { QList } from 'quasar'
import navbarConfig from '~/config/navbar'
import themeConfig from '~/config/theme'
import type { INavbarLink } from '~/types'
import http from '~/utils/axios'

const { dense } = themeConfig
/* const store = useAuthStore()
const userRules = store.getRules */
const router = useRouter()
function reduceRules(rules: string) {
  return rules
    .split('|')
    .some(r =>
      r
        .split('.')
        .reduce(
          (acc, rule) => (typeof acc === 'object' ? acc[rule] : acc),
          //   userRules,
        ),
    )
}

function checkTheLink(link: INavbarLink) {
  if (link.rules) {
    if (typeof link.rules === 'string')
      return reduceRules(link.rules)

    return link.rules.every(rule => reduceRules(rule))
  }
  return true
}

const links = computed(() =>
  navbarConfig.links.filter((link) => {
    if (link.rules)
      return checkTheLink(link)

    return link.children?.some(child => checkTheLink(child))
  }),
)

const linkSearch = ref<string>('')
const filteredLinks = ref<INavbarLink[]>([...links.value])

function filteredChildLinks(link: INavbarLink) {
  return link.children?.filter((child: INavbarLink) => checkTheLink(child))
}

function filterLinks() {
  if (!linkSearch.value)
    filteredLinks.value = [...links.value]

  filteredLinks.value = []
  links.value.forEach((link: INavbarLink) => {
    const exist_ = filteredChildLinks(link)
    const existChildren = exist_?.filter((child: INavbarLink) =>
      child.title?.toLowerCase().includes(linkSearch.value?.toLowerCase()),
    )
    if (existChildren?.length)
      filteredLinks.value.push({ ...link, children: existChildren })
  })
}

function handleClearFilter() {
  linkSearch.value = ''
  filteredLinks.value = [...links.value]
}
const mini = useLocalStorage('miniSidebar', false)
const version = ref('')
async function init() {
  const res = await http.cashAPI.get('/v1_0/get_last_version')
  version.value = res.data.version_name
}
onMounted(() => {
  // init()
})
</script>

<template>
  <q-drawer
    class="navbar"
    show-if-above
    :mini="mini"
    bordered
    side="left"
    :width="256"
    relative
  >
    <div
      v-show="!mini"
      absolute
      right-1
      cursor-pointer
      @click="router.push('/versions')"
    >
      <span ma-2 text-10px font-600 text-gray>Versiya {{ version || "1.0.1" }}</span>
    </div>
    <button
      class="close"
      :class="mini ? 'ml-14px mt-10px -rotate-180deg' : 'ml-24px mt-20px'"
      @click="mini = !mini"
    >
      <svg
        width="19"
        height="17"
        viewBox="0 0 19 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 15V17H1V15H19ZM4.596 0.904007L6.01 2.31801L2.828 5.50001L6.01 8.68201L4.596 10.096L0 5.50001L4.596 0.904007ZM19 8.00001V10H10V8.00001H19ZM19 1.00001V3.00001H10V1.00001H19Z"
          fill="#8896A1"
        />
      </svg>
    </button>
    <div class="logo" :class="{ 'logo--dense': dense }">
      <svg
        width="30"
        height="25"
        viewBox="0 0 30 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.24825 1.8735L14.1811 10.416L5.76609 24.9977L0.833252 16.4567L9.24825 1.8735ZM12.3309 16.4567H29.1666L24.2338 24.9977H7.3995L12.3309 16.4567ZM18.4835 15.04L10.0671 0.455414H19.9328L28.3478 15.04H18.4849H18.4835Z"
          fill="#227ACC"
        />
      </svg>
      <span v-show="!mini"> Ishonch </span>
    </div>
    <!-- Sidebar Menu -->
    <div class="pa-4">
      <q-input
        v-show="!mini"
        v-model="linkSearch"
        dense
        clearable
        label="Menyudan izlash..."
        filled
        @clear="handleClearFilter"
        @update:model-value="filterLinks"
      />
    </div>
    <div class="navbar__menu" style="position: relative">
      <QList :dense="dense">
        <div v-for="link in filteredLinks" :key="link.title">
          <q-item
            v-if="!link.children"
            clickable
            :to="link.to"
            mb-4
            :dense="dense"
          >
            <q-item-section avatar>
              <Icon :icon="link.icon" text-20px color-gray-700 />
            </q-item-section>
            <q-item-section>
              <span text-16px>
                {{ link.title }}
              </span>
            </q-item-section>
          </q-item>
          <div v-else pb-4>
            <q-expansion-item group="navbarExpansion" :dense="dense">
              <template #header>
                <q-item-section avatar>
                  <Icon :icon="link.icon" text-20px color-gray-700 />
                </q-item-section>

                <q-item-section>
                  <span text-16px>
                    {{ link.title }}
                  </span>
                </q-item-section>
              </template>
              <QList
                v-for="sublink in filteredChildLinks(link)"
                :key="sublink.title"
                :dense="dense"
              >
                <q-item clickable :to="sublink.to" mb-4>
                  <q-item-section avatar>
                    <Icon :icon="sublink.icon" text-20px color-gray-700 />
                  </q-item-section>
                  <q-item-section>
                    <span text-16px>
                      {{ sublink.title }}
                    </span>
                  </q-item-section>
                </q-item>
              </QList>
            </q-expansion-item>
          </div>
        </div>
      </QList>
    </div>
  </q-drawer>
</template>

<style lang="scss">
.home-list {
  transition: all 0.3s;
}
.home-list:hover {
  cursor: pointer;
  color: rgb(109, 206, 109);
}
.navbar {
  .close {
    @apply w-28px h-28px transition rounded-sm flex items-center justify-center;

    &:hover {
      @apply bg-gray-50;

      svg path {
        @apply fill-gray-700;
      }
    }
  }

  .logo {
    color: #227acc;
    @apply flex items-center justify-center gap-x-12px text-20px leading-24px mt-45px mb-35px;

    &--dense {
      @apply mt-25px mb-15px;
    }
  }

  &__menu {
    .q-item {
      .q-focus-helper,
      &.q-hoverable:hover .q-focus-helper {
        background: transparent;
        opacity: 0;
      }

      &__section--side {
        @apply pl-12px;
      }

      &__section svg path {
        @apply transition;
      }

      &__section--main {
        @apply color-gray-700 transition;
      }

      &.q-hoverable:hover:not(.q-router-link--exact-active)
        .q-item__section
        svg
        path {
        @apply fill-green;
      }

      &.q-hoverable:hover:not(.q-router-link--exact-active)
        .q-item__section--main {
        @apply color-green;
      }

      @apply relative;

      &.q-router-link--exact-active::before {
        content: "";
        @apply absolute h-full left-0 top-0 w-8px bg-green;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        box-shadow: 0px 0px 16px rgba(41, 204, 57, 0.4);
      }
    }

    .q-router-link {
      &--exact-active {
        .q-item__section svg path {
          @apply fill-green;
        }

        .q-item__section--main {
          @apply color-green;
        }
      }
    }

    .q-expansion-item--expanded .q-expansion-item__container > .q-item::before {
      @apply absolute h-full left-0 top-0 w-8px bg-green;
      content: "";
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      box-shadow: 0px 0px 16px rgba(41, 204, 57, 0.4);
    }

    .q-expansion-item {
      &__content {
        .q-item {
          &::before {
            display: none;
          }

          &__section--side {
            @apply pl-24px;
          }
        }
      }
    }
  }
}
</style>
