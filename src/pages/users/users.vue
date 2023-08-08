<script setup lang="ts">
import type { QTableProps } from 'quasar'
import { usersStore } from '~/stores/users/users'
import useNotify from '~/composables/useNotify'

const store = usersStore()
const notify = useNotify()
const headers: QTableProps['columns'] = [
  {
    name: 'id',
    label: 'ID',
    align: 'left',
    field: 'id',
  },

  {
    name: 'name',
    label: 'Name',
    align: 'left',
    field: 'name',
  },
  {
    name: 'username',
    label: 'Username',
    align: 'left',
    field: 'username',
  },
  {
    name: 'email',
    label: 'Email',
    align: 'left',
    field: 'email',
  },
  {
    name: 'phone',
    label: 'Phone',
    align: 'left',
    field: 'phone',
  },
  {
    name: 'website',
    label: 'Website',
    align: 'left',
    field: 'website',
  },

]
async function onRequest({
  pagination,
}: {
  pagination: QTableProps['pagination']
}) {
  await store.fetchData(pagination)
}
async function init() {
  try {
    useOverlay(true)
    await store.fetchData()
    useOverlay(false)
  }
  catch (err: any) {
    useOverlay(false)
    notify.error(err.response.data.message || 'Xatolik yuz berdi')
  }
}
onMounted(() => {
  init()
})
</script>

<template>
  <q-table
    v-model:pagination="store.pagination"
    rows-per-page-label="Sahifadagi qatorlar soni"
    no-data-label="Ma'lumotlar mavjud emas"
    :loading="store.loading"
    :rows="store.data"
    :columns="headers"
    flat
    hide-pagination
    class="sticky-headered-table"
    virtual-scroll
    table-header-class="bg-gray-300 font-bold"
    :class="store.data.length > 0 ? 'height_table' : ''"
    :virtual-scroll-sticky-size-start="48"
    :virtual-scroll-item-size="48"
    :rows-per-page-options="[0]"
    @request="onRequest"
  >
    <template #top="scope">
      <ActionsBar
        v-model:search="store.search"

        :scope="scope"
        search-width="200px"
        @add="handleAdd"
        @reload="onRequest({ pagination: store.pagination })"
        @update:search="store.fetchData()"
      />
    </template>
  </q-table>
</template>

/* <route lang="yaml">
meta:
  rule: scoring_payment_discipline.show
</route>

 */
<style scoped lang="scss">
.height_table {
  @apply h-87vh;
}
</style>
