import { create } from 'zustand';

type BankStore = {
  accountBalance: number;
  setAccountBalance: (newBalance: number) => void;
};

const useBankStore = create<BankStore>()((set) => ({
  accountBalance: 0,
  setAccountBalance: (newBalance) =>
    set(() => ({
      accountBalance: newBalance,
    })),
}));

export default useBankStore;
