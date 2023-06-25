import { ref, reactive, toRefs } from 'vue';
import { v4 } from 'uuid';
import { FormItems, GenFormProps } from '../types';
import { genFormComponentPorps } from '../utils/helper';
export function useFormDesigner() {
  const schema = ref<FormItems[]>([]);
  const currentData = ref<FormItems | undefined>(undefined);

  const formProps = ref<GenFormProps>({
    title: '默认标题',
    width: 600,
    size: 'medium',
    labelPlacement: 'left',
    labelAlign: 'center',
    labelWidth: 85,
    dataList: [],
  });
  const handleAdd = (e: { newIndex: number; item: any }) => {
    const { newIndex } = e;
    const key = v4().replaceAll('-', '');
    //每次拖拽给当前组件数据赋唯一key、id
    schema.value[newIndex] = {
      ...schema.value[newIndex],
      key,
      field: `${schema.value[newIndex].icon}_${key}`,
      componentProps: {
        ...genFormComponentPorps(schema.value[newIndex]),
      },
      //处理栅格布局
      columns:
        schema.value[newIndex].component === 'NGrid'
          ? [
              {
                span: 12,
                list: [],
              },
              {
                span: 12,
                list: [],
              },
            ]
          : null,
    };

    currentData.value = schema.value[newIndex];

    console.log('当前行数据====>', schema.value[newIndex]);
  };

  const handleGiAdd = (event: any, row: any, index: string | number | symbol) => {
    const { newIndex, oldIndex, item } = event;
    // 不允许栅格嵌套栅格
    console.log(event);

    if (item.className.includes('grid-com')) {
      item.tagName === 'BUTTON' && row.columns[index].list.splice(newIndex, 1);
      console.info(`%c不允许栅格嵌套栅格 `, 'color:#ab1f3f;font-size: 16px;font-weight:bolder');
    } else {
      const key = v4().replaceAll('-', '');
      row.columns[index].list[newIndex] = {
        ...row.columns[index].list[newIndex],
        key,
        field: `${row.columns[index].list[newIndex].icon}_${key}`,
        componentProps: {
          ...genFormComponentPorps(row.columns[index].list[newIndex]),
        },
      };
      currentData.value = row.columns[index].list[newIndex];
      console.log('栅格数据====>', row.columns[index]);
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
    const key = v4().replaceAll('-', '');
    const arr = list && list.length ? list : schema.value;
    const copyData: FormItems = {
      ...arr[index],
      key,
      field: `${arr[index].icon}_${key}`,
      componentProps: {
        ...genFormComponentPorps(arr[index]),
      },
      //处理栅格布局
      columns:
        arr[index].component === 'NGrid'
          ? [
              {
                span: 12,
                list: [],
              },
              {
                span: 12,
                list: [],
              },
            ]
          : null,
    };
    arr.splice(index + 1, 0, copyData);
    currentData.value = copyData;
  };

  const handleClear = () => {
    schema.value = [];
    currentData.value = undefined;
  };

  const setFormData = (formList: FormItems[], formConfig: GenFormProps) => {
    schema.value = formList;
    console.log(formList, formConfig);

    currentData.value = schema.value[0];
    formProps.value = formConfig;
  };

  return {
    schema,
    formProps,
    setFormData,
    handleAdd,
    handleGiAdd,
    handleClear,
    currentData,
    handleItemCopy,
    handleItemClick,
    handleItmeDelete,
  };
}
