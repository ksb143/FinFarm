import { create } from 'zustand';

const useCropStore = create((set) => ({
  crop: [
    { name: 'watermelon', image: '/src/assets/images/watermelon.png' },
    { name: 'sweetpotato', image: '/src/assets/images/sweetpotato.png' },
    { name: 'squash', image: '/src/assets/images/squash.png' },
    { name: 'rice', image: '/src/assets/images/rice.png' },
    { name: 'potato', image: '/src/assets/images/potato.png' },
    { name: 'pepperpowder', image: '/src/assets/images/pepperpowder.png' },
    { name: 'onion', image: '/src/assets/images/onion.png' },
    { name: 'greenonion', image: '/src/assets/images/greenonion.png' },
    { name: 'carrot', image: '/src/assets/images/carrot.png' },
    { name: 'cabbage', image: '/src/assets/images/cabbage.png' },
  ],
}));

export default useCropStore;
