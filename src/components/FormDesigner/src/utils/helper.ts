import { FormComponent, FormItems } from "../types";

export const formComponentPorps = {};

export const genFormComponentPorps = (form: FormItems) => {
  const { component: formComponent, icon: formComponentType } = form;
  let componentProps = {};
  const entryComponentProps = {
    disabled: false,
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
  }

  switch (formComponent) {
    case "NGrid":
      componentProps = {
        cols: 24,
        xGap: 12,
        yGap: 12,
      };
      break;
    case "NSelect":
      componentProps = {
        ...componentProps,
        multiple: false,
        labelField: "label",
        valueField: "value",
        customRemoteAddress: "",
      };
      break;

    default:
      break;
  }
  console.log(componentProps);

  return componentProps;
};
