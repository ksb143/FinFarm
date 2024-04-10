import { create } from 'zustand';

const useCropStore = create((set) => ({
  crop: [
    {
      name: '수박',
      image:
        'https://jaesbucket.s3.ap-northeast-2.amazonaws.com/+AgriculturalProducts/watermelon.png',
    },
    {
      name: '고구마',
      image:
        'https://jaesbucket.s3.ap-northeast-2.amazonaws.com/+AgriculturalProducts/sweetpotato.png',
    },
    {
      name: '애호박',
      image:
        'https://jaesbucket.s3.ap-northeast-2.amazonaws.com/+AgriculturalProducts/squash.png',
    },
    {
      name: '쌀',
      image:
        'https://jaesbucket.s3.ap-northeast-2.amazonaws.com/20240404011531253',
    },
    {
      name: '감자',
      image:
        'https://jaesbucket.s3.ap-northeast-2.amazonaws.com/+AgriculturalProducts/potato.png',
    },
    { name: '고추가루', image: '/src/assets/images/pepperpowder.png' },
    {
      name: '양파',
      image:
        'https://jaesbucket.s3.ap-northeast-2.amazonaws.com/+AgriculturalProducts/onion.png',
    },
    {
      name: '대파',
      image:
        'https://jaesbucket.s3.ap-northeast-2.amazonaws.com/+AgriculturalProducts/greenonion.png',
    },
    {
      name: '당근',
      image:
        'https://jaesbucket.s3.ap-northeast-2.amazonaws.com/+AgriculturalProducts/carrot.png',
    },
    {
      name: '배추',
      image:
        'https://jaesbucket.s3.ap-northeast-2.amazonaws.com/+AgriculturalProducts/cabbage.png',
    },
    {
      name: '마늘',
      image:
        'https://jaesbucket.s3.ap-northeast-2.amazonaws.com/+AgriculturalProducts/galic.png',
    },
    { name: '새싹', image: '/src/assets/images/sprout.png' },
    {
      name: '고구마 씨앗',
      image:
        'https://jaesbucket.s3.ap-northeast-2.amazonaws.com/20240404011531253',
    },
    {
      name: '씨감자',
      image:
        'https://jaesbucket.s3.ap-northeast-2.amazonaws.com/20240403203441342',
    },
    {
      name: '마늘 씨앗',
      image:
        'https://jaesbucket.s3.ap-northeast-2.amazonaws.com/20240404011531253',
    },
    {
      name: '대파 씨앗',
      image:
        'https://jaesbucket.s3.ap-northeast-2.amazonaws.com/20240404011531253',
    },
    {
      name: '양파 씨앗',
      image:
        'https://jaesbucket.s3.ap-northeast-2.amazonaws.com/20240404011531253',
    },
    {
      name: '벼',
      image:
        'https://jaesbucket.s3.ap-northeast-2.amazonaws.com/+AgriculturalProducts/rice.png',
    },
    {
      name: '당근 씨앗',
      image:
        'https://jaesbucket.s3.ap-northeast-2.amazonaws.com/20240404011531253',
    },
    {
      name: '배추 씨앗',
      image:
        'https://jaesbucket.s3.ap-northeast-2.amazonaws.com/20240404011531253',
    },
    {
      name: '수박 씨앗',
      image:
        'https://jaesbucket.s3.ap-northeast-2.amazonaws.com/20240404011531253',
    },
    {
      name: '애호박 씨앗',
      image:
        'https://jaesbucket.s3.ap-northeast-2.amazonaws.com/20240404011531253',
    },
  ],
}));

export default useCropStore;
