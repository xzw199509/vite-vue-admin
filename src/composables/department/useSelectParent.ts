import { ref } from "vue";
export default function useSelectParent() {
  // parent组件的ref属性
  const parentRef = ref<{ show: () => void }>()

  // 选择上级部门
  const selectParent = () => {
    parentRef.value?.show()
  }
  return {
    parentRef,
    selectParent
  }
}