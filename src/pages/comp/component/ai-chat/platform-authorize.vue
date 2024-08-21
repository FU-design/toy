<template>
  <div class="platform-authorize">
    <div v-if="currPage?.action == 'ADD_NEW_PLATFORM'">
      <select-menu :select-data="ADD_NEW_PLATFORM" @select="onSelect('SELECT_AUTH_PLATFORM', $event)" />
    </div>

    <div v-if="currPage?.action == 'SELECT_AUTH_PLATFORM'">
      <select-menu :select-data="SELECT_AUTH_PLATFORM">
        <template #select-custom-content>
          <a-form v-bind="layout" :colon="false">
            <a-form-item :label="currPage['authCredential']" v-bind="validateInfos.name">
              <a-input :placeholder="`please input ${currPage['authCredential']}`" />
            </a-form-item>
            <a-form-item :label="currPage['authCredential']" v-bind="validateInfos.name">
              <a-input :placeholder="`please input ${currPage['authCredential']}`" />
            </a-form-item>
            <a-form-item :label="currPage['authCredential']" v-bind="validateInfos.name">
              <a-input :placeholder="`please input ${currPage['authCredential']}`" />
            </a-form-item>
            <a-form-item :label="currPage['authCredential']" v-bind="validateInfos.name">
              <a-input :placeholder="`please input ${currPage['authCredential']}`" />
            </a-form-item>
            <a-form-item :label="currPage['authCredential']" v-bind="validateInfos.name">
              <a-input :placeholder="`please input ${currPage['authCredential']}`" />
            </a-form-item>
            <a-form-item :label="currPage['authCredential']" v-bind="validateInfos.name">
              <a-input :placeholder="`please input ${currPage['authCredential']}`" />
            </a-form-item>
            <a-form-item :label="currPage['authCredential']" v-bind="validateInfos.name">
              <a-input :placeholder="`please input ${currPage['authCredential']}`" />
            </a-form-item>
            <a-form-item :label="currPage['authCredential']" v-bind="validateInfos.name">
              <a-input :placeholder="`please input ${currPage['authCredential']}`" />
            </a-form-item>
            <a-form-item :label="currPage['authCredential']" v-bind="validateInfos.name">
              <a-input :placeholder="`please input ${currPage['authCredential']}`" />
            </a-form-item>
          </a-form>
        </template>
      </select-menu>
    </div>

  </div>
</template>

<script setup lang="ts">
import SelectMenu from "./select-menu.vue";
import useAIChat from "./ai-chat";
import type { SelectData, Option } from "./select-menu.vue";
import { Form } from 'ant-design-vue';
import { storeToRefs } from "pinia";

interface PlatformAuthorizeProps {
  currPage?: Option;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const aiChat = useAIChat();
const useForm = Form.useForm;
const props = defineProps<PlatformAuthorizeProps>();
const emits = defineEmits(["update:currPage"]);
const modelRef = reactive({});
const rulesRef = reactive({ name: [{ required: true, message: 'Please input name', }], });
const { currPage } = toRefs(props);
const { supportedPlatForms } = storeToRefs(aiChat)

const ADD_NEW_PLATFORM = computed<SelectData[]>(() => {
  return ([
    {
      subTitle: "请选择下列要授权的平台",
      options: supportedPlatForms.value.map(v => ({ ...v, action: '' })),
    },
  ])
});

const SELECT_AUTH_PLATFORM = computed<SelectData[]>(() => ([
  {
    subTitle: `您正在授权 ${currPage.value?.name} 平台, 请填写下列信息`,
    options: [],
  },
]));

const onSelect = (type: string, option: Option) => {
  emits("update:currPage", { ...option, action: type });
};


const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef, {
  onValidate: (...args) => console.log(...args),
});
const onSubmit = () => {
  validate()
    .then(() => {
      console.log(toRaw(modelRef));
    })
    .catch(err => {
      console.log('error', err);
    });
};
</script>

<style lang="scss" scoped>
.platform-authorize {}
</style>
