<template>
  <div>
    <a-form
      v-if="showForm"
      ref="ruleFormRef"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :model="ruleForm"
      :disabled="componentDisabled"
    >
      <div v-for="item in formItems">
        <a-form-item v-bind="item.itemOptions">
          <!-- input -->
          <a-input
            v-if="item.type == 'input'"
            v-model:value="ruleForm[item.key]"
            v-bind="item.extraOps"
            v-on="item.on || {}"
          />

          <!-- textarea  -->
          <a-textarea
            v-if="item.type == 'textarea'"
            v-model:value="ruleForm[item.key]"
            v-bind="item.extraOps"
            v-on="item.on || {}"
          />
        </a-form-item>
      </div>
      <a-form-item :wrapper-col="{ span: 24 }">
        <!-- 作用域插槽传递事件 -->
        <slot name="btngroup" :onSubmit="onSubmit" :onReset="onReset">
          <div class="wrp-btn">
            <a-button type="primary" @click="onSubmit">Submit</a-button>
            <a-button @click="onReset">Reset</a-button>
          </div>
        </slot>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import type { FormItemState, FormOptions } from './types.ts';

const FormProps = {
  modelValue: {
    type: Object as PropType<Record<string, any>>,
    required: false
  },
  formItems: {
    type: Array as PropType<FormItemState[]>,
    default: () => []
  },
  // 其他的表单选项配置
  options: {
    type: Object as PropType<FormOptions>,
    default: () => {
      return {};
    }
  }
};

interface InitFormItem {
  [key: string]: any;
}

export default defineComponent({
  name: 'AutoForm',
  props: FormProps,
  emits: ['update:modelValue', 'ok'],
  // props,{attrs, slots, emit, expose}
  setup(props, { emit, expose }) {
    const labelCol = { style: { width: 'auto' } };
    const wrapperCol = { span: 24 };
    const { modelValue, formItems } = toRefs(props);

    const ruleFormRef = ref();
    const showForm = ref(true);
    const ruleForm = ref<any>({});
    const componentDisabled = ref(false);
    const optionsMapVal = ref({}); //选项对应的列表map
    const tmp_localData = ref({}); //防止没有使用v-model绑定的情况下的数据暂存对象

    // 临时保存在父组件没有传递 v-model 值时
    const ruleFormTmpResolve = computed({
      get() {
        const len = Object.keys(modelValue).length;
        return len ? modelValue.value : tmp_localData.value;
      },
      set(val) {
        tmp_localData.value = val || {};
        emit('update:modelValue', val);
      }
    });

    // 实时更新表单最后的值
    watch(
      ruleForm,
      (val) => {
        if (val) {
          emit('update:modelValue', val);
        }
      },
      { deep: true }
    );

    // 初始化表单信息
    function initForm() {
      let newForm: InitFormItem = {};

      // 通过遍历 formItems 配置信息，获取当前 ruleForm 中所需要的变量
      formItems.value.forEach(({ key, defaultValue }) => {
        newForm[key] = defaultValue || '';
      });
      Object.assign(ruleForm.value, {
        ...newForm,
        ...ruleFormTmpResolve.value
      });
    }

    function setOptionsVal<T>(key: string, list: T) {
      Object.assign(optionsMapVal.value as Ref<T>, key, list);
    }

    // 手动更新 form 的值
    function updateValue(newVal: typeof props.modelValue) {
      const updatedVal = { ...ruleForm.value, ...newVal };
      Object.assign(ruleForm.value, updatedVal);
    }

    const onSubmit = () => {
      ruleFormRef.value
        .validate()
        .then(() => {
          emit('update:modelValue', unref(ruleForm));
          emit('ok');
        })
        .catch((error: Error) => {
          console.log('error', error);
        });
    };

    const onReset = () => {};

    onMounted(() => {
      initForm();
    });

    // 暴露外部调用方法
    expose({ setOptionsVal, updateValue });

    return {
      labelCol,
      wrapperCol,
      ruleFormRef,
      showForm,
      ruleForm,
      componentDisabled,
      onSubmit,
      onReset,
      setOptionsVal,
      updateValue
    };
  }
});
</script>

<style lang="scss" scoped>
.wrp-btn {
  display: flex;
  justify-content: space-around;
}
</style>
