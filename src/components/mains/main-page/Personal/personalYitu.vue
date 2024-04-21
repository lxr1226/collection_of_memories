<template>
  <div>
    <a-modal v-model:open="modalVisible" title="推荐" ok-text="确认" cancel-text="取消" @ok="hideModal">
      <Button v-for="(buttonText, index) in buttons" :key="index">{{ buttonText }}</Button>
      <!--      <textarea v-model="textContent" class="textbox"></textarea>-->
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import {ref, computed} from 'vue';
import {Button} from "ant-design-vue";
const open = ref<boolean>(false);

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  newContent: String,
});
const buttons = ref<string[]>(['意图1', '意图2', '意图3', '意图4', '意图5']);
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
