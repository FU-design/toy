<template>
  <a-card>
    <auto-form
      ref="autoFormRef"
      v-model:form-value="formValue"
      :form-items="formItems"
      :form-rules="rules"
    >
      <template #portSlot="{ item, state }">
        <a-form-item v-bind="item.formItemProps">
          <a-input v-model:value="state[item.field]" />
        </a-form-item>
      </template>
    </auto-form>
  </a-card>
</template>

<script setup lang="ts">
import { FormItemState, FormRules, FormState } from './types';
import AutoForm from './AutoForm.vue';

type AutoFromInstance = InstanceType<typeof AutoForm>;

const autoFormRef = ref<AutoFromInstance | null>(null);
const formValue = ref<FormState>({});
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入名字', trigger: 'blur' },
    { min: 3, max: 50, message: '长度3-50', trigger: 'blur' },
    {
      pattern: /^[0-9a-zA-Z_]{1,}$/,
      message: '请输入正确的名字，字母/数字/下划线,'
    }
  ],
  platfrom: [{ required: true, message: '请输入平台', trigger: 'blur' }],
  apiKey: [{ required: true, message: '请输入API Key', trigger: 'blur' }],
  model: [{ required: true, message: '请输入模型', trigger: 'blur' }],
  port: [{ required: true, message: '请输入备注', trigger: 'blur' }],
  resGroupId: [{ required: true, message: '请选择资源组', trigger: 'blur' }],
  remark: [{ required: true, message: '请输入备注', trigger: 'blur' }],
  type: [{ required: true, message: '请选择创建类型', trigger: 'blur' }]
});
const formItems = computed((): FormItemState[] => [
  {
    type: 'INPUT',
    field: 'name',
    formItemProps: {
      name: 'name',
      label: '名字'
    },
    componentProps: {
      placeholder: '请输入你的名字'
    }
  },
  {
    type: 'INPUT',
    field: 'platfrom',
    formItemProps: {
      name: 'platfrom',
      label: '平台'
    }
  },
  {
    type: 'INPUT',
    field: 'apiKey',
    formItemProps: {
      name: 'apiKey',
      label: 'API Key'
    }
  },
  {
    type: 'INPUT',
    field: 'model',
    formItemProps: {
      name: 'model',
      label: '模型'
    }
  },
  {
    type: 'INPUT',
    field: 'port',
    slot: 'portSlot',
    formItemProps: {
      name: 'port',
      label: 'gRPC端口'
    }
  },
  {
    type: 'SELECT',
    field: 'resGroupId',
    defaultValue: '',
    fieldMap: {
      label: 'name',
      value: 'resourceGroupId'
    },
    formItemProps: {
      name: 'resGroupId',
      label: '选择资源组'
    },
    componentProps: {
      placeholder: '请选择资源组'
    }
  },
  {
    type: 'TEXTAREA',
    field: 'remark',
    formItemProps: {
      name: 'remark',
      label: '备注'
    }
  },
  {
    type: 'RADIO',
    field: 'type',
    defaultValue: '0',
    defaultOptionsMap: [
      { value: '0', label: '向导' },
      { value: '1', label: '脚本' }
    ],
    formItemProps: {
      name: 'type',
      label: '创建类型'
    }
  }
]);

const resourceList = [
  {
    name: '资源组1',
    resourceGroupId: 'id_001'
  },
  {
    name: '资源组2',
    resourceGroupId: 'id_002'
  },
  {
    name: '资源组3',
    resourceGroupId: 'id_003'
  }
];

onMounted(() => {
  autoFormRef.value?.setOptions('resGroupId', resourceList);
});
</script>

<style scoped></style>
