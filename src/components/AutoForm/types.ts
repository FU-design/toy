import type { FormItemProps, ColProps } from 'ant-design-vue';
import { RuleObject } from 'ant-design-vue/es/form/interface';

export enum ComponentType {
  INPUT,
  TEXTAREA,
  SELECT,
  RADIO
}
export type FormState<T = Record<string, string | number | undefined>> = T;
export type FormRules = {
  [k: string]: RuleObject | RuleObject[];
};
export type DedaultFieldMap = { label: string; value: string };
export type ComponentTypeKeys = keyof typeof ComponentType;
export interface FormItemState {
  type: ComponentTypeKeys;
  field: string;
  slot?: string;
  slotLabel?: string;
  defaultValue?: string;
  fieldMap?: DedaultFieldMap;
  formItemProps?: FormItemProps;
  componentProps?: Record<string, unknown>;
  defaultOptionsMap?: unknown[];
}

export interface FormOptions {
  hideOk: boolean;
  hideCancel: boolean;
  okText: string;
  cancelText: string;
}

export interface Props {
  formValue: FormState;
  formItems: FormItemState[];
  formOptions?: FormOptions;
  formRules?: FormRules;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  formDisabled?: boolean;
  disabledItems?: string[] | null;
  hiddenItems?: string[];
  showButton?: boolean;
}

export interface Emits {
  (event: 'update:formValue', formValue: FormState): void;
  (event: 'onSubmit', validate: boolean): void;
}

type ActionsSlot = {
  onSubmit: () => void;
  onReset: () => void;
};

export interface Slots {
  actions: ActionsSlot;
  [k: string]: Record<string, { item: FormItemState; formState: FormState }> | ActionsSlot;
}
