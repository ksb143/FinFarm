import { create } from 'zustand';

interface PriceHistory {
  x: string;
  y: number;
  color: string;
}

interface AgricultureChartData {
  id: string;
  color: string;
  data: PriceHistory[];
}

interface AgricultureState {
  cropPriceHistoryList: AgricultureChartData[];
  addCropPriceHistory: (newAgriculture: AgricultureChartData) => void;
  setCropPriceHistory: (newAgricultureList: AgricultureChartData[]) => void;
}

const useCropPriceHistoryStore = create<AgricultureState>((set, get) => ({
  cropPriceHistoryList: [],
  addCropPriceHistory: (newAgriculture) =>
    set((state) => ({
      cropPriceHistoryList: [...state.cropPriceHistoryList, newAgriculture],
    })),
  setCropPriceHistory: (newAgricultures) =>
    set(() => ({
      cropPriceHistoryList: newAgricultures,
    })),
}));

export default useCropPriceHistoryStore;
