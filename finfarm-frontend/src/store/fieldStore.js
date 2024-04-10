import { create } from 'zustand';

const useFieldStore = create((set) => ({
  farmField: Array(25).fill(null), // 예시로 25칸의 밭을 가정
  setFarmField: (info) =>
    set((state) => {
      const updatedFarmField = state.farmField.map((field, index) => {
        const fieldInfo = info.find((item) => item.index === index + 1);
        return fieldInfo || null;
      });
      return { farmField: updatedFarmField };
    }),
}));

export default useFieldStore;
