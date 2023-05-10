import { ref } from "vue";
import { v4 } from "uuid";
import { FormItems, FormComponent } from "../types";
import { formItemsData } from "../utils/data";
export function useFormDesigner() {
  const schema = ref<FormItems[]>([]);
  const currentData = ref<FormItems | undefined>(undefined);

  // const resetDefalutValue = (
  //   component: FormComponent,
  //   index: number,
  //   list?: FormItems[]
  // ) => {
  //   const arr = list && list.length ? list : schema.value;
  //   const parentVal = formItemsData.find((item) =>
  //     item.data.find((item) => item.component === component)
  //   );
  //   const defaultValue =
  //     parentVal &&
  //     parentVal.data.find((item) => item.component === component)
  //       ?.componentProps;

  //   if (defaultValue) {
  //     // arr[index].componentProps = defaultValue;
  //     console.log(arr[index].componentProps);
  //   }
  // };

  const handleAdd = (e: { newIndex: number; item: any }) => {
    const { newIndex } = e;
    const key = v4().replaceAll("-", "");

    //每次拖拽给当前组件数据赋唯一key、id
    schema.value[newIndex] = {
      ...schema.value[newIndex],
      key,
      id: `${schema.value[newIndex].icon}_${key}`,
    };
    // resetDefalutValue(schema.value[newIndex].component, newIndex, schema.value);

    //处理栅格布局
    if (schema.value[newIndex].component === "NGrid") {
      schema.value[newIndex] = {
        ...schema.value[newIndex],
        //clear columns
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
      };
    }
    currentData.value = schema.value[newIndex];
    console.log("当前行数据====>", schema.value[newIndex]);
  };

  const handleGiAdd = (
    event: any,
    row: any,
    index: string | number | symbol
  ) => {
    const { newIndex, oldIndex, item } = event;
    // 不允许栅格嵌套栅格
    if (item.className.includes("grid")) {
      item.tagName === "BUTTON" && row.columns[index].list.splice(newIndex, 1);
      console.info(
        `%c不允许栅格嵌套栅格 `,
        "color:#ab1f3f;font-size: 16px;font-weight:bolder"
      );
    } else {
      const key = v4().replaceAll("-", "");
      row.columns[index].list[newIndex] = {
        ...row.columns[index].list[newIndex],
        key,
        id: `${row.columns[index].list[newIndex].icon}_${key}`,
      };
      currentData.value = row.columns[index].list[newIndex];
      console.log("栅格数据====>", row.columns[index]);
    }
  };

  const handleItemClick = (row: FormItems) => {
    currentData.value = row;
  };
  const handleItmeDelete = (index: number, list?: FormItems[]) => {
    const arr = list && list.length ? list : schema.value;
    if (arr.length - 1 === index) {
      if (index === 0) {
        currentData.value = undefined;
      } else {
        currentData.value = arr[index - 1];
      }
    } else {
      currentData.value = arr[index + 1];
    }
    arr.splice(index, 1);
  };

  const handleItemCopy = (index: number, list?: FormItems[]) => {
    const key = v4().replaceAll("-", "");
    const arr = list && list.length ? list : schema.value;

    let copyData: FormItems = {
      ...arr[index],
      key,
      id: `${arr[index].icon}_${key}`,
    };

    //handle grid copy clear all childnode
    if (arr[index].component === "NGrid") {
      copyData = {
        ...copyData,
        //default columns
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
      };
    }
    arr.splice(index + 1, 0, copyData);
    currentData.value = copyData;
  };

  const handleClear = () => {
    schema.value = [];
    currentData.value = undefined;
  };
  const handlePreview = () => {
    console.log(schema.value);
  };

  return {
    schema,
    handleAdd,
    handleGiAdd,
    handleClear,
    currentData,
    handlePreview,
    handleItemCopy,
    handleItemClick,
    handleItmeDelete,
  };
}
