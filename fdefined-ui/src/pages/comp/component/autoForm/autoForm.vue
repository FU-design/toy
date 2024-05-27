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
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">Submit</a-button>
        <a-button style="margin-left: 10px">Reset</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  watch,
  ref,
  computed,
  onMounted,
  toRefs,
  unref,
} from "vue";
import type { PropType, Ref } from "vue";

interface FormOptions {
  rowCol: number; // 表单单行几列
  hideOk: boolean; // 是否隐藏确认按钮
  okText: string; //确认按钮文案
  hideCancel: boolean; // 是否隐藏取消按钮
  cancelText: string; //取消按钮文案
}

interface FormItemState {
  type: string; //表单item类型 参考antd所支持标签
  key: string; //表单对应的绑定值 key
  defaultValue?: string; //表单项对应的默认值
  copy?: boolean; //针对于text文本复制
  fieldNames?: { label: string; value: string }; // 自定义选项中的label和value 如 { label:'key',value:'value' }
  itemOptions?: any; // 表单item标签对应的属性拓展 例如：prop  rules label等标签属性
  extraOps?: any; // input等标签对应的属性拓展 例如：placeholder size type等标签属性
  on?: any; // input等标签对应的事件拓展 例如：click,change等标签属性
  values?: any[]; // 拥有选项的标签选项 例如:select  Array为固定选项 动态接口赋值请使用 setOptionsVal 设置prop对应的选项列表
  params?: any; // 需要携带参数 依赖于其他标签参数请使用%{}%模板用于联动 如 %{resGroupId}%
  template?: string; // 插槽
}

const FormProps = {
  modelValue: {
    type: Object,
    required: false,
  },
  formItems: {
    type: Array as PropType<FormItemState[]>,
    default: () => [],
  },
  // 其他的表单选项配置
  options: {
    type: Object as PropType<FormOptions>,
    default: () => {
      return {};
    },
  },
};

interface InitFormItem {
  [key: string]: any;
}

export default defineComponent({
  name: "AutoForm",
  props: FormProps,
  emits: ["update:modelValue", "ok"],
  // props,{attrs, slots, emit, expose}
  setup(props, { emit, expose }) {
    const labelCol = { style: { width: "150px" } };
    const wrapperCol = { span: 14 };
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
        emit("update:modelValue", val);
      },
    });

    // 实时更新表单最后的值
    watch(
      ruleForm,
      (val) => {
        if (val) {
          emit("update:modelValue", val);
        }
      },
      { deep: true }
    );

    // 初始化表单信息
    function initForm() {
      let newForm: InitFormItem = {};

      // 通过遍历 formItems 配置信息，获取当前 ruleForm 中所需要的变量
      formItems.value.forEach(({ key, defaultValue }) => {
        newForm[key] = defaultValue || "";
      });
      Object.assign(ruleForm.value, {
        ...newForm,
        ...ruleFormTmpResolve.value,
      });
    }

    function setOptionsVal<T>(key: string, list: T) {
      Object.assign(optionsMapVal.value as Ref<T>, key, list);
    }

    const onSubmit = () => {
      ruleFormRef.value
        .validate()
        .then(() => {
          emit("update:modelValue", unref(ruleForm));
        })
        .catch((error: Error) => {
          console.log("error", error);
        });
    };

    onMounted(() => {
      initForm();
    });

    // 暴露外部调用方法
    expose({ setOptionsVal });

    return {
      labelCol,
      wrapperCol,
      ruleFormRef,
      showForm,
      ruleForm,
      componentDisabled,
      onSubmit,
    };
  },
});
</script>

<style scoped></style>
