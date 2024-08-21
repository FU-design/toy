<template>
  <div class="platform-authorize">
    <template v-if="currPage?.action == 'ADD_NEW_PLATFORM'">
      <select-menu :select-data="ADD_NEW_PLATFORM" @select="onSelect('SELECT_AUTH_PLATFORM', $event)" />
    </template>

    <template v-if="currPage?.action == 'SELECT_AUTH_PLATFORM'">
      <select-menu :select-data="SELECT_AUTH_PLATFORM">
        <template #select-custom-content>
          <a-form v-bind="layout" ref="formRef" :model="formState" :colon="false">
            <a-form-item v-for="item in credentialFormModel" :label="item.displayName" :name="item.name"
              :rules="[{ required: true, message: `Please input ${item.displayName}!` }]">
              <a-input v-model:value="formState[`${item.name}`]" :placeholder="`please input ${item.displayName}`" />
            </a-form-item>
          </a-form>
        </template>
      </select-menu>
    </template>
    <footer v-if="currPage?.action == 'SELECT_AUTH_PLATFORM'">
      <a-button :loading="loading" type="primary" @click="onCheck">{{ loading ? '校验中' : '确认' }}</a-button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import SelectMenu from "./select-menu.vue";
import useAIChat from "./ai-chat";
import { storeToRefs } from "pinia";
import type { SelectData, Option } from "./select-menu.vue";
import type { FormInstance } from 'ant-design-vue';

interface PlatformAuthorizeProps {
  currPage?: Option;
}
type FormState = { [key: string]: string }
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const aiChat = useAIChat();
const formRef = ref<FormInstance>();
const formState = ref<FormState>({});
const props = defineProps<PlatformAuthorizeProps>();
const emits = defineEmits(["update:currPage"]);
const { currPage } = toRefs(props);
const { loading, supportedPlatForms, credentialFormModel } = storeToRefs(aiChat)

const ADD_NEW_PLATFORM = computed<SelectData[]>(() => {
  return ([{
    subTitle: "请选择下列要授权的平台",
    options: supportedPlatForms.value.map(v => ({ ...v, action: '' })),
  }])
});

const SELECT_AUTH_PLATFORM = computed<SelectData[]>(() => ([{
  subTitle: `您正在授权 ${currPage.value?.name} 平台, 请填写下列信息`,
  options: [],
},]));


watchEffect(() => {
  formState.value = credentialFormModel.value.reduce((acc, cur) => {
    acc[cur.name] = ''
    return acc
  }, {} as FormState)
})


const onSelect = (type: string, option: Option) => {
  const { id, name, supportModels } = option
  aiChat.setCurrPlatform({ id, name, supportModels })
  aiChat.getPlatformOfCredentialFormModel()
  emits("update:currPage", { ...option, action: type });
};

const onCheck = async () => {
  try {
    const values = await formRef.value?.validateFields();
    aiChat.testAuthOfPlatform(values)
    emits("update:currPage", { ...currPage.value, action: 'SELECT_MODEL_PLATFORM' });
  } catch (errorInfo) {
    console.log('Failed:', errorInfo);
  }
};


</script>

<style lang="scss" scoped>
.platform-authorize {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}



footer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 20px;
}
</style>
