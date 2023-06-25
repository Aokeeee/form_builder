import { FormData } from '../types';
export const formItemsData: FormData[] = [
  {
    type: 'BasicField',
    title: '基础字段',
    data: [
      {
        icon: 'input',
        label: '单行输入',
        component: 'NInput',
      },
      {
        icon: 'textarea',
        label: '多行输入',
        component: 'NInput',
      },
      {
        icon: 'inputnumber',
        label: '数字输入',
        component: 'NInputNumber',
      },
      {
        icon: 'radio',
        label: '单选项',
        component: 'NRadio',
      },
      {
        icon: 'checkbox',
        label: '多选项',
        component: 'NCheckBox',
      },
      {
        icon: 'select',
        label: '下拉选项',
        component: 'NSelect',
      },
      {
        icon: 'time',
        label: '时间选择器',
        component: 'NTimePicker',
      },
      {
        icon: 'date',
        label: '日期选择器',
        component: 'NDatePicker',
      },
    ],
  },
  {
    type: 'ContainerField',
    title: '容器字段',
    data: [
      {
        icon: 'grid',
        label: '栅格布局',
        component: 'NGrid',
      },
    ],
  },
  {
    type: 'AdvancedField',
    title: '高级字段',
    data: [
      {
        icon: 'person',
        label: '人员选择',
        component: 'EmployeeSelector',
      },
      {
        icon: 'upload',
        label: '附件上传',
        component: 'UpLoad',
      },
    ],
  },
  {
    type: 'CustomField',
    title: '自定义字段',
    data: [],
  },
];

export const formItemPorps = [
  {
    type: 'BasicProps',
    title: '基础属性',
    props: [
      {
        component: 'NInput',
        label: '唯一标识',
      },
    ],
  },
  {
    type: 'AdvancedProps',
    title: '高级属性',
    props: [],
  },
  {
    type: 'handleProps',
    title: '事件属性',
    props: [],
  },
];

export const sizeData = [
  {
    value: 'small',
    label: 'small',
  },
  {
    value: 'medium',
    label: 'medium',
  },
  {
    value: 'large',
    label: 'large',
  },
];
export const labelPlacementData = [
  {
    value: 'left',
    label: '左侧',
  },
  {
    value: 'top',
    label: '顶部',
  },
];
export const labelAlignData = [
  {
    value: 'left',
    label: '居左',
  },
  {
    value: 'center',
    label: '居中',
  },
  {
    value: 'right',
    label: '居右',
  },
];
export const datePickerType = [
  {
    value: 'date',
    label: '日期',
  },
  {
    value: 'datetime',
    label: '时间日期',
  },
];
