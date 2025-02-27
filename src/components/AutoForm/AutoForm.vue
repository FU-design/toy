<template>
  <div>
    <a-form
      ref="formRef"
      label-align="left"
      :model="formState"
      :label-col="props.labelCol"
      :wrapper-col="props.wrapperCol"
      :disabled="props.formDisabled"
      :rules="props.formRules || {}"
    >
      <div v-for="item in formItems" :key="item.field">
        <slot v-bind="{ item, state: formState }" :name="item.slot ?? item.field">
          <a-form-item v-if="!hiddenItems.includes(item.field)" v-bind="item.formItemProps">
            <component
              :is="getComponentName(item)"
              v-model:value="formState[item.field]"
              v-bind="item.componentProps"
              v-on="componentEvents[item.field] || {}"
              :disabled="componentisDisable(item)"
            >
              <template v-if="item.type === 'SELECT'">
                <a-select-option
                  v-for="(child, childIndex) in options(item)"
                  :key="childIndex"
                  :value="optionBinds('value', child, item)"
                >
                  {{ optionBinds('label', child, item) }}
                </a-select-option>
              </template>
              <template v-if="item.type === 'RADIO'">
                <a-radio
                  v-for="(child, childIndex) in options(item)"
                  :key="childIndex"
                  :value="optionBinds('value', child, item)"
                >
                  {{ optionBinds('label', child, item) }}
                </a-radio>
              </template>
            </component>
          </a-form-item>
        </slot>
      </div>
      <a-form-item v-if="showButton">
        <slot name="actions" :on-submit="onSubmit" :on-reset="onReset">
          <a-space>
            <a-button type="primary" @click="onSubmit">
              {{ props.formOptions.okText }}
            </a-button>
            <a-button @click="onReset">
              {{ props.formOptions.cancelText }}
            </a-button>
          </a-space>
        </slot>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="tsx" setup>
import { DedaultFieldMap, Emits, FormItemState, FormState, Props, Slots } from './types';
import { Input, Select, RadioGroup, Textarea } from 'ant-design-vue';

defineSlots<Slots>();

const props = withDefaults(defineProps<Props>(), {
  showButton: true,
  disabledItems: null, // Has higher priority than componentProps of formItems
  hiddenItems: () => [],
  labelCol: () => {
    return { span: 4 };
  },
  wrapperCol: () => {
    return { span: 14 };
  },
  formOptions: () => {
    return {
      hideOk: false,
      hideCancel: false,
      okText: 'Submit',
      cancelText: 'Reset'
    };
  }
});

const emits = defineEmits<Emits>();

const formRef = ref();
const formState = ref<FormState>({});
const tmpCacheFormState = ref<FormState>({});
const optionMap = ref<Record<string, unknown>>({});
const componentEvents = ref<Record<string, unknown>>({});
const { formValue, formItems, hiddenItems, disabledItems } = toRefs(props);

const ruleFormTmpResolve = computed({
  get() {
    const len = Object.keys(formValue.value).length;
    return len ? formValue.value : tmpCacheFormState.value;
  },
  set(val) {
    tmpCacheFormState.value = val || {};
    emits('update:formValue', val);
  }
});

const getComponentName = computed(() => {
  return (item: FormItemState) => {
    if (item.type === 'SELECT') {
      return Select;
    } else if (item.type === 'RADIO') {
      return RadioGroup;
    } else if (item.type === 'TEXTAREA') {
      return Textarea;
    } else {
      return Input;
    }
  };
});

watch(
  formState,
  (newState) => {
    emits('update:formValue', newState);
  },
  {
    deep: true
  }
);

const componentisDisable = (item: FormItemState): boolean => {
  return disabledItems.value
    ? disabledItems.value.includes(item.field)
    : (item.componentProps?.disabled as boolean);
};

const options = (item: FormItemState) => {
  return optionMap.value[item.field] || item.defaultOptionsMap || [];
};

const optionBinds = (
  key: keyof DedaultFieldMap,
  child: string | Record<string, string>,
  item: FormItemState
) => {
  return typeof child === 'string' ? child : child[(item.fieldMap && item.fieldMap[key]) || key];
};

const initForm = () => {
  const newForm: FormState = {};
  props.formItems.forEach((item) => {
    const { field, defaultValue } = item;
    newForm[field] = defaultValue || undefined;
  });
  Object.assign(formState.value, {
    ...newForm,
    ...ruleFormTmpResolve.value
  });
};

const getFormValidation = async () => {
  try {
    await formRef.value.validateFields();
    return Promise.resolve(true);
  } catch (error) {
    console.log('Failed:', error);
    return Promise.resolve(false);
  }
};

const setOptions = (field: string, list: unknown[]) => {
  optionMap.value[field] = list;
};

const setFormItemEvents = (field: string, events: unknown) => {
  componentEvents.value[field] = events;
};

const setFormValue = <T,>(form: FormState<T>) => {
  const oldForm = { ...toRaw(formState.value) };
  formState.value = { ...oldForm, ...form };
};

const resetForm = () => {
  formRef.value.resetFields();
};

const onSubmit = async () => {
  try {
    await formRef.value.validateFields();
    emits('onSubmit', true);
  } catch (error) {
    console.log('Failed:', error);
    emits('onSubmit', false);
  }
};

const onReset = () => {
  resetForm();
};

onMounted(() => {
  initForm();
});

defineExpose({
  resetForm,
  getFormValidation,
  setOptions,
  setFormItemEvents,
  setFormValue
});
</script>
