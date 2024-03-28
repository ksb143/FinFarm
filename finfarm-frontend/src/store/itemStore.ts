import create from 'zustand';

interface Item {
  name: string;
  unit?: string; // 작물만
  period?: number; // 씨앗만
  content: string;
  amount: number;
}

interface ItemState {
  items: Item[];
  addItem: (newItem: Item) => void;
  addItems: (newItems: Item[]) => void;
}

const useItemStore = create<ItemState>((set) => ({
  items: [],
  // 아이템 하나 추가
  addItem: (newItem) =>
    set((state) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.name === newItem.name,
      );

      // 이미 존재하는 아이템인 경우
      if (existingItemIndex >= 0) {
        const updatedItems = state.items.map((item, index) => {
          if (index === existingItemIndex) {
            // amount를 증가시킨 새 아이템 객체 반환
            return { ...item, amount: item.amount + newItem.amount };
          }
          return item;
        });

        return { items: updatedItems };
      } else {
        // 새로운 아이템 추가
        return { items: [...state.items, newItem] };
      }
    }),
  // 아이템 여러개 추가
  addItems: (newItems) =>
    set((state) => {
      // 새로운 아이템들을 처리하기 위한 로직
      const updatedItems = newItems.reduce(
        (acc, newItem) => {
          const existingItemIndex = acc.findIndex(
            (item) => item.name === newItem.name,
          );

          // 이미 존재하는 아이템인 경우 amount 업데이트
          if (existingItemIndex >= 0) {
            acc[existingItemIndex] = {
              ...acc[existingItemIndex],
              amount: acc[existingItemIndex].amount + newItem.amount,
            };
          } else {
            // 새로운 아이템 추가
            acc.push(newItem);
          }

          return acc;
        },
        [...state.items],
      ); // 초기값으로 기존 아이템들을 복사

      return { items: updatedItems };
    }),
}));

export default useItemStore;
