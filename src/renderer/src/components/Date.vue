<script setup>
import { ref } from 'vue'
import icon from '../../../../resources/icon.png?asset'

// const icon = path.join(__dirname, '../../resources/icon.png')
/**
 * Date: 2023/8/24
 * Author: Ken
 */
const date = ref('')

const update_date = () => {
  window.api.update_date().then((res) => {
    date.value = res
  })
}

update_date()

window.api.isWorking((value) => {
  if (value) {
    update_date()
  }
})

// listen tray status change

</script>

<template>
  <div>
    <div class="flex flex-col items-center">
      <img :src="icon" alt="" />
      <p class="text-6xl">
        {{ date }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>
