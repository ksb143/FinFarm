import { create } from 'zustand';

const useCropStore = create((set) => ({
  crop: [
    { name: '수박', image: '/src/assets/images/watermelon.png' },
    { name: '고구마', image: '/src/assets/images/sweetpotato.png' },
    { name: '애호박', image: '/src/assets/images/squash.png' },
    { name: '쌀', image: '/src/assets/images/rice.png' },
    { name: '감자', image: '/src/assets/images/potato.png' },
    { name: '고추가루', image: '/src/assets/images/pepperpowder.png' },
    { name: '양파', image: '/src/assets/images/onion.png' },
    { name: '대파', image: '/src/assets/images/greenonion.png' },
    { name: '당근', image: '/src/assets/images/carrot.png' },
    { name: '양배추', image: '/src/assets/images/cabbage.png' },
    { name: '새싹', image: '/src/assets/images/sprout.png' },
    { name: '고구마 씨앗', image: '/src/assets/images/seed.png' },
    { name: '씨감자', image: '/src/assets/images/seed.png' },
    { name: '마늘 씨앗', image: '/src/assets/images/seed.png' },
    { name: '대파 씨앗', image: '/src/assets/images/seed.png' },
    { name: '양파 씨앗', image: '/src/assets/images/seed.png' },
    { name: '벼', image: '/src/assets/images/seed.png' },
    { name: '당근 씨앗', image: '/src/assets/images/seed.png' },
    { name: '배추 씨앗', image: '/src/assets/images/seed.png' },
    { name: '수박 씨앗', image: '/src/assets/images/seed.png' },
    { name: '애호박 씨앗', image: '/src/assets/images/seed.png' },
  ],
}));

export default useCropStore;
