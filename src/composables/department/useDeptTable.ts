/**
 * 表格列表的业务逻辑
 */
import { reactive, onMounted } from "vue";
import { DeptListRes, ListParm } from "@/api/dept/deptModel";
import { getDeptListApi } from "@/api/dept/dept"
export default function useDepaTbale() {
  // 定义搜索数据
  const searchFrom = reactive<ListParm>({
    searchName: ''
  })
  //定义表格数据
  const tableData = reactive<DeptListRes>({
    list: []
  })
  //获取表格数据
  const getDeptList = async () => {
    const res = await getDeptListApi(searchFrom);
    if (res && res.code == 200) {
      console.log(res.data)
      tableData.list = res.data;
    }
  }
  //首次加载数据
  onMounted(() => {
    getDeptList()
  })
  return {
    searchFrom,
    tableData,
    getDeptList
  }
}