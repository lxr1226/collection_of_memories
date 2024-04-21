<template>
  <div class="loader">
    <div class="span" v-for="i in 15" :key="i"></div>
  </div>
</template>

<script setup lang="ts">
import '../../../../assets/css/voiceInputCss/wave.less'

interface LoaderData {
  // 如果有数据需要在这里声明
}

const loaderData: LoaderData = {}

</script>
