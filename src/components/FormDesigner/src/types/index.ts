export type FormComponent =
  | "NInput"
  | "NSelect"
  | "NCheckBox"
  | "NInputNumber"
  | "NSwitch"
  | "NRadio"
  | "NRate"
  | "NSlider"
  | "NTimePicker"
  | "NDatePicker"
  | "NGrid";

export interface FormItems {
  label: string;
  icon: string;
  component: FormComponent;
  [key: string]: any;
}

export interface FormData {
  type: string;
  title: string;
  data: FormItems[];
}
