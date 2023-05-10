import { FormData } from "../types";

export const formItemsData: FormData[] = [
  {
    type: "BasicField",
    title: "基础字段",
    data: [
      {
        icon: "input",
        label: "单行输入",
        component: "NInput",
        componentProps: {
          value: "",
          clearable: true,
        },
      },
      {
        icon: "textarea",
        label: "多行输入",
        component: "NInput",
        componentProps: {
          value: "",
          clearable: true,
        },
      },
      {
        icon: "inputnumber",
        label: "数字输入",
        component: "NInputNumber",
        componentProps: {
          value: null,
        },
      },
      {
        icon: "radio",
        label: "单选项",
        component: "NRadio",
        componentProps: {
          value: null,
        },
      },
      {
        icon: "checkbox",
        label: "多选项",
        component: "NCheckBox",
        componentProps: {
          value: null,
        },
      },
      {
        icon: "select",
        label: "下拉选项",
        component: "NSelect",
        componentProps: {
          value: null,
        },
      },
      {
        icon: "time",
        label: "时间选择器",
        component: "NTimePicker",
        componentProps: {
          value: null,
        },
      },
      {
        icon: "date",
        label: "日期选择器",
        component: "NDatePicker",
        componentProps: {
          value: null,
        },
      },
    ],
  },
  {
    type: "ContainerField",
    title: "容器字段",
    data: [
      {
        icon: "grid",
        label: "栅格布局",
        component: "NGrid",
        columns: [
          {
            span: 1,
            list: [],
          },
          {
            span: 1,
            list: [],
          },
        ],
        componentPorps: {
          cols: 2,
          xGap: 12,
          yGap: 12,
        },
      },
    ],
  },
  {
    type: "AdvancedField",
    title: "高级字段",
    data: [],
  },
  {
    type: "CustomField",
    title: "自定义字段",
    data: [],
  },
];

export const formItemPorps = [
  {
    type: "BasicProps",
    title: "基础属性",
    props: [
      {
        component: "NInput",
        label: "唯一标识",
      },
    ],
  },
  {
    type: "AdvancedProps",
    title: "高级属性",
    props: [],
  },
  {
    type: "handleProps",
    title: "事件属性",
    props: [],
  },
];

export const schema = [];
