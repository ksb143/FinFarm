import { create } from 'zustand';

const useCropStore = create((set) => ({
  crop: [
    { name: 'watermelon', image: '@/assets/images/watermelon.png' },
    { name: 'sweetpotato', image: '@/assets/images/sweetpotato.png' },
    { name: 'squash', image: '@/assets/images/squash.png' },
    { name: 'rice', image: '@/assets/images/rice.png' },
    { name: 'potato', image: '@/assets/images/potato.png' },
    { name: 'pepperpowder', image: '@/assets/images/pepperpowder.png' },
    { name: 'onion', image: '@/assets/images/onion.png' },
    { name: 'greenonion', image: '@/assets/images/greenonion.png' },
    { name: 'carrot', image: '@/assets/images/carrot.png' },
    { name: 'cabbage', image: '@/assets/images/cabbage.png' },
  ],
}));

export default useCropStore;
