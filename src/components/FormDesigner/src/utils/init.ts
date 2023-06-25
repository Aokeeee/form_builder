import { http } from '@/utils/http/axios';
import { FormItems } from '../types';
import { genFormComponentTriggerData } from './helper';
import { isArray } from '@/utils/is';

export async function handleSelectRequestData(props: any) {
  let options = props.options;
  try {
    const { customRemoteAddress, labelField, valueField } = props;
    props.options = await http.request({
      url: customRemoteAddress,
      method: 'GET',
    });
    props.labelField = labelField || 'label';
    props.valueField = valueField || 'value';
  } catch (error) {
    props.options = options;
  }
}

export function setHelper(item: FormItems, formModel: Recordable, formRules: Recordable) {
  const { value, required, message } = item.componentProps;
  formModel[item.field] = value;
  if (item.component === 'NSelect' && item.componentProps.customRemoteAddress) {
    handleSelectRequestData(item.componentProps);
  }
  if (required && required === true) {
    formRules[item.field] = {
      required: required,
      message: message || `${item.label}不可为空`,
      ...genFormComponentTriggerData(item.component, item.componentProps),
    };
  }
}

export function initFormValues(list: FormItems[], formModel: Recordable, formRules: Recordable) {
  list.forEach((item) => {
    if (item.component != 'NGrid') {
      setHelper(item, formModel, formRules);
    } else {
      const { columns } = item;
      if (columns && columns.length) {
        columns.forEach((parent) => {
          if (parent.list.length) {
            parent.list.forEach((child) => {
              setHelper(child, formModel, formRules);
            });
          }
        });
      }
    }
  });
}
