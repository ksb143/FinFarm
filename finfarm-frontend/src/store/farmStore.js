import { create } from 'zustand';

const useFarmStore = create((set) => ({
  farmerNickname: '',
  farmLevel: 1,
  farmEffect: 0,
  nextReinforceCost: 0,
  nextReinforceEffect: 0,
  nextReinforceProbability: 0,
  farmFieldInfo: [],
  memberItems: {
    seeds: [],
    agricultures: [],
  },
  setFarmerNickname: (farmerNickname) => set({ farmerNickname }),
  setFarmLevel: (farmLevel) => set({ farmLevel }),
  setFarmEffect: (farmEffect) => set({ farmEffect }),
  setNextReinforceCost: (nextReinforceCost) => set({ nextReinforceCost }),
  setNextReinforceEffect: (nextReinforceEffect) => set({ nextReinforceEffect }),
  setNextReinforceProbability: (nextReinforceProbability) =>
    set({ nextReinforceProbability }),
  setFarmFieldInfo: (farmFieldInfo) => set({ farmFieldInfo }),
  setMemberItems: (memberItems) => set({ memberItems }),
}));

export default useFarmStore;
