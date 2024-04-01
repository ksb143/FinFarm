import { create } from 'zustand';

interface Agriculture {
  agricultureName: string;
  agricultureContent: string;
  agricultureImageUrl: string;
  unit: string;
  seedPrice: number;
  minPriceInWeek: number;
  maxPriceInWeek: number;
  fluctuationPrice: number;
  fluctuationRate: number;
  agriculturePriceHistoryDTO: Array<{
    date: string;
    agriculturePrice: number;
  }>;
}

interface AgricultureState {
  cropList: Agriculture[];
  addCrop: (newAgriculture: Agriculture) => void;
  setCropList: (newAgriculture: Agriculture[]) => void;
}

const useCropInfoStore = create<AgricultureState>((set) => ({
  cropList: [], // 초기 상태 비워두기
  addCrop: (newAgriculture) =>
    set((state) => ({
      cropList: [...state.cropList, newAgriculture],
    })),
  setCropList: (newAgricultures) =>
    set(() => ({
      cropList: newAgricultures,
    })),
}));

export default useCropInfoStore;
