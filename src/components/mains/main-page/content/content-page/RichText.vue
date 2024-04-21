<template>
  <div>
    <a-modal v-model:open="modalVisible" title="修改AI回答" ok-text="确认" cancel-text="取消" @ok="hideModal">
      <textarea v-model="textContent" class="textbox"></textarea>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import {ref, computed} from 'vue';
import {message} from "ant-design-vue";
import {ZHQRevise} from "@/services/content";
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
const hideModal = async () => {
  const QuestionId = localStorage.getItem('ID');
  const AccountId = localStorage.getItem('AcountID');
  const requestData = {
    replied: textContent.value,
    questionId: 2,
    userId: AccountId
  }
  const response = await ZHQRevise(requestData)
  console.log(response)
  // 在接口请求成功后进行提示
  message.success('修改成功')
  // 更新页面的 textContent.value
  if (response && response.data) {
    textContent.value = response.replied;
  }
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
