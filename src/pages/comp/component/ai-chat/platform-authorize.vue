<template>
  <div class="platform-authorize">
    <div v-if="currPage?.action == 'ADD_NEW_PLATFORM'">
      <select-menu :select-data="ADD_NEW_PLATFORM" @select="onSelect('SELECT_AUTH_PLATFORM', $event)" />
    </div>

    <div v-if="currPage?.action == 'SELECT_AUTH_PLATFORM'">
      <select-menu :select-data="SELECT_AUTH_PLATFORM">
        <template #select-custom-content>
          <a-form v-bind="layout" :model="formState" :colon="false" name="dynamic_rule">
            <a-form-item v-for="item in credentialFormModel" :label="item.displayName">
              <a-input v-model:value="formState[`${item.name}`]" :placeholder="`please input ${item.displayName}`"
                :rules="[{ required: true, message: `input ${item.displayName}` }]" />
            </a-form-item>
          </a-form>
        </template>
      </select-menu>
    </div>
    <footer v-if="currPage?.action == 'SELECT_AUTH_PLATFORM'">
      <a-button type="primary" @click="onCheck">confirm</a-button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import SelectMenu from "./select-menu.vue";
import useAIChat from "./ai-chat";
import { storeToRefs } from "pinia";
import type { SelectData, Option } from "./select-menu.vue";


interface PlatformAuthorizeProps {
  currPage?: Option;
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
}

const aiChat = useAIChat();
const props = defineProps<PlatformAuthorizeProps>();
const emits = defineEmits(["update:currPage"]);
const { currPage } = toRefs(props);
const { formState, supportedPlatForms, credentialFormModel } = storeToRefs(aiChat)

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


const onSelect = (type: string, option: Option) => {
  aiChat.getPlatformOfCredentialFormModel(option.id)
  emits("update:currPage", { ...option, action: type });
};

const onCheck = () => {
  console.log('1111 :>> ', 1111);
}


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
