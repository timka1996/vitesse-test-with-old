<script lang="ts" setup>
const router = useRouter()
function goHome() {
  router.push('/')
}
function goBack() {
  router.go(-1)
}
</script>

<template>
  <div m-auto h-100vh flex items-center justify-center container>
    <div flex-1>
      <h1 mb-15px text-40px font-700 leading-47px>
        Xatolik
      </h1>
      <h3 mb-18px text-32px font-400 leading-38px>
        Sahifa topilmadi
      </h3>
      <p mb-54px text-16px font-400 leading-24px text-gray-900>
        Bunday sahifa mavjud emas yoki tizimdan o'chirilgan. Bosh sahifaga
        qaytishni tafsiya qilamiz.
      </p>

      <div flex gap-x-4>
        <button

          block rounded-md bg-blue-500 px-38px py-12px text-16px color-white
          @click="goHome"
        >
          Bosh sahifaga qaytish
        </button>
        <button

          block rounded-md bg-green-500 px-38px py-12px text-16px color-white
          @click="goBack"
        >
          Orqaga qaytish
        </button>
      </div>
    </div>
    <div flex-1>
      <img src="/assets/images/404.png" alt="404">
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: empty
</route>
