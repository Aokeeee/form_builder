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
      },
      {
        icon: "textarea",
        label: "多行输入",
        component: "NInput",
      },
      {
        icon: "inputnumber",
        label: "数字输入",
        component: "NInputNumber",
      },
      {
        icon: "radio",
        label: "单选项",
        component: "NRadio",
      },
      {
        icon: "checkbox",
        label: "多选项",
        component: "NCheckBox",
      },
      {
        icon: "select",
        label: "下拉选项",
        component: "NSelect",
      },
      {
        icon: "time",
        label: "时间选择器",
        component: "NTimePicker",
      },
      {
        icon: "date",
        label: "日期选择器",
        component: "NDatePicker",
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
