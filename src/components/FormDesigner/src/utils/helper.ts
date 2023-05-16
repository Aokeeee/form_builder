import { FormComponent, FormItems } from "../types";

export const genFormComponentPorps = (form: FormItems) => {
  const { component: formComponent, icon: formComponentType } = form;
  let componentProps = {};
  const entryComponentProps = {
    value: "",
    clearable: true,
  };

  if (formComponentType === "textarea") {
    componentProps = {
      ...entryComponentProps,
      type: "textarea",
      autosize: false,
      rows: 3,
      maxlength: undefined,
      minlength: undefined,
      showCount: false,
    };
  }

  if (["checkbox", "radio", "select"].includes(formComponentType)) {
    componentProps = {
      options: [
        {
          label: `${formComponentType}1`,
          value: `${formComponentType}1`,
          disabled: false,
        },
        {
          label: `${formComponentType}2`,
          value: `${formComponentType}2`,
          disabled: false,
        },
        {
          label: `${formComponentType}3`,
          value: `${formComponentType}3`,
          disabled: false,
        },
      ],
      ...entryComponentProps,
      value: null,
    };
    if (formComponentType === "select") {
      componentProps = {
        ...componentProps,
        multiple: false,
        labelField: "label",
        valueField: "value",
        customRemoteAddress: "",
      };
    }
  }

  if (formComponent === "NGrid") {
    componentProps = {
      cols: 24,
      xGap: 12,
      yGap: 12,
    };
  } else {
    componentProps = {
      ...componentProps,
      required: false,
      message: "",
      disabled: false,
    };
  }

  return componentProps;
};
type Recordable<T = any> = Record<string, T>;

export const genFormComponentTriggerData = (
  component: FormComponent,
  componentProps: Recordable
) => {
  let obj = {};

  //输入框
  if (component === "NInput") {
    obj = {
      trigger: ["blur", "input"],
    };
    //选择数字类型
  } else if (
    ["NDatePicker", "NTimePicker", "NInputNumber"].includes(component)
  ) {
    obj = {
      type: "number",
      trigger: ["blur", "change"],
    };
    //多选项 单选项
  } else {
    obj = {
      trigger: "change",
    };
    switch (component) {
      //穿梭框
      case "NTransfer":
        obj = {
          type: "array",
          trigger: "change",
        };
        break;
      //Slider,
      case "NSlider":
        obj = {
          trigger: ["blur", "change"],
        };
        break;
      //Select,
      case "NSelect":
        obj = {
          trigger: ["blur", "change"],
        };
        break;
      case "NCheckBox":
        obj = {
          type: "array",
          trigger: "change",
        };
        break;

      default:
        break;
    }
  }

  //特殊处理下拉框
  if (component === "NSelect" && componentProps.multiple === true) {
    obj = {
      type: "array",
      trigger: ["blur", "change"],
    };
  }

  return obj;
};
