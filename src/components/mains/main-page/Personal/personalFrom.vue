<template>
  <div>
    <a-modal v-model:open="modalVisible" title="提示" ok-text="确认" cancel-text="取消" @ok="hideModal">
      <p>个人基本信息还未完善，本次需要完善吗？</p>
      <!--      <textarea v-model="textContent" class="textbox"></textarea>-->
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import {ref, computed} from 'vue';
const open = ref<boolean>(false);

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  newContent: String,
});

const emit = defineEmits(['update:modelValue']);
const modalVisible = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v),
});
const textContent = ref(props.newContent);
const hideModal = () => {
  modalVisible.value = false;
};


</script>
<style scoped>
.textbox{
  width: 100%;
  height: 50%;
  border: white;
}
</style>
