import { DeptModel, AddDeptModel } from '@/api/dept/DeptModel'
import AddAndEdit from '@/views/system/department/AddAndEdit.vue'

import { ref } from 'vue';
import { EditType } from '@/type/BaseEnum';
import useInstance from '@/hooks/useinstance';
export default function useDept() {
  const { global, proxy } = useInstance()
  // 子组件
  const addDeptRef = ref<{ show: (type: string, row?: DeptModel) => void }>();
  // 这种方式打包会出错
  // const addDeptRef = ref<InstanceType<typeof AddAndEdit>>()
  //搜索
  const serachBtn = () => {
  }
  //新增
  const addBtn = () => {
    addDeptRef.value?.show(EditType.ADD);
  }
  //编辑
  const editBtn = (row: DeptModel) => {
    addDeptRef.value?.show(EditType.EDIT, row)
  }
  //删除
  const deleteBtn = async (row: DeptModel) => {
    console.log(global)
    console.log(proxy)
    const confirm = await global.$myconfirm('确定删除该数据吗？')
    console.log(confirm)
  }
  //保存
  const save = (parm: AddDeptModel) => {
    console.log('保存')
    console.log(parm)
    if (parm.type === EditType.ADD) {// 新增
      console.log('新增')
    } else if (parm.type === EditType.EDIT) { // 编辑
      console.log('编辑')
    }
  }
  return {
    serachBtn,
    addBtn,
    editBtn,
    deleteBtn,
    addDeptRef,
    save
  }
}