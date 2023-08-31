import { reactive, ref } from "vue";
import { DeptModel, AddDeptModel, SelectNode } from '@/api/dept/DeptModel'
import { getDeptParentApi } from "@/api/dept/dept";
import { ElTree, selectGroupKey } from "element-plus";
export default function useParent() {
  // 树的ref属性
  const parentTree = ref<InstanceType<typeof ElTree>>()
  // 上级树的数据
  const treeData = reactive({
    data: []
  })
  // 选中的数据
  const selectNode = reactive<SelectNode>({
    id: '',
    name: ''
  })
  //树的属性
  const defaultProps = reactive({
    children: 'children',
    label: 'name'
  })
  // 树的点击事件
  const handleNodeClick = (data: DeptModel) => {
    selectNode.id = data.id
    selectNode.name = data.name
    console.log(data)
  }
  // 获取树的数据
  const getTreeData = async () => {
    let res = await getDeptParentApi()
    if (res && res.code == 200) {
      treeData.data = res.data
    }
  }
  // 加号和减号的点击事件
  const openBtn = (data: DeptModel) => {
    // 设置展开或关闭
    data.open = !data.open
    if (parentTree.value) {
      parentTree.value.store.nodesMap[data.id].expanded = !data.open
    }

  }
  return {
    treeData,
    defaultProps,
    handleNodeClick,
    getTreeData,
    openBtn,
    parentTree,
    selectNode
  }
}