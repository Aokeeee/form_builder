import { ref, unref } from "vue";
import { v4 } from "uuid";
import { FormItems } from "../types";
import { resetColumns } from "../utils/data";
export function useFormDesigner() {
  const schema = ref<FormItems[]>([]);
  const currentData = ref<FormItems | undefined>(undefined);

  const handleAdd = (e: { newIndex: number; item: any }) => {
    const { newIndex, item } = e;
    const key = v4().replaceAll("-", "");

    //每次拖拽给当前组件数据赋唯一key、id
    schema.value[newIndex] = {
      ...schema.value[newIndex],
      key,
      id: `${schema.value[newIndex].icon}_${key}`,
    };
    //处理栅格布局
    if (schema.value[newIndex].component === "NGrid") {
      // resetColumns();
      schema.value[newIndex] = {
        ...schema.value[newIndex],
        columns: schema.value[newIndex].componentPorps.columns.map(
          (item: any) => ({
            ...item,
          })
        ),
      };
      console.log(schema.value[newIndex]);
    }
    currentData.value = schema.value[newIndex];
    console.log(newIndex, schema.value, currentData.value.key);
  };

  const handleGiAdd = (
    event: any,
    row: any,
    index: string | number | symbol
  ) => {
    const { newIndex, oldIndex, item } = event;
    console.log(newIndex, oldIndex, item.className);
    //不允许栅格嵌套栅格
    // if (item.className.includes("grid")) {
    //   item.tagName === "BUTTON" && row.columns[index].list.splice(newIndex, 1);
    //   console.info(
    //     `%c不允许栅格嵌套栅格 `,
    //     "color:#ab1f3f;font-size: 16px;font-weight:bolder"
    //   );
    // } else {
    //   const key = v4().replaceAll("-", "");
    //   row.columns[index].list[newIndex] = {
    //     ...row.columns[index].list[newIndex],
    //     key,
    //     id: `${row.columns[index].list[newIndex].icon}_${key}`,
    //   };
    //   currentData.value = row.columns[index].list[newIndex];
    // }
  };

  const handleItemClick = (row: FormItems) => {
    currentData.value = row;
  };
  const handleItmeDelete = (index: number, grid?: boolean) => {
    if (schema.value.length - 1 === index) {
      if (index === 0) {
        currentData.value = undefined;
      } else {
        currentData.value = schema.value[index - 1];
      }
    } else {
      currentData.value = schema.value[index + 1];
    }
    // if (grid) resetColumns();
    schema.value.splice(index, 1);
  };

  const handleItemCopy = () => {
    const key = v4().replaceAll("-", "");
  };

  const handleClear = () => {
    schema.value = [];
  };
  const handlePreview = () => {
    console.log(schema.value);
  };
  return {
    schema,
    handleAdd,
    handleGiAdd,
    currentData,
    handlePreview,
    handleItemClick,
    handleItmeDelete,
  };
}
