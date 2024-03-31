import { localAxios } from '@/utils/http-common';

const local = localAxios();

// 농산물 판매
async function sellCrop(sellCropInfo) {
  try {
    const response = await local.post('/market/sell', {
      agricultureName: sellCropInfo.agricultureName,
      agricultureAmount: sellCropInfo.agricultureAmount,
    });
    return response.data;
  } catch (error) {
    console.log('농작물 판매 실패', error);
    throw error;
  }
}

// 씨앗 상세 조회
async function getSeedDetails(seedName) {
  try {
    const response = await local.get('/market/seed', {
      params: {
        seedName: seedName,
      },
    });
    return response.data;
  } catch (error) {
    console.log('씨앗 상세 조회 실패', error);
    throw error;
  }
}

// 씨앗 구매
async function buySeed(seedInfo) {
  try {
    const response = await local.post('/market/seed', {
      seedName: seedInfo.seedName,
      seedCount: seedInfo.seedCount,
    });
    return response.data;
  } catch (error) {
    console.log('씨앗 구매 실패', error);
    throw error;
  }
}

// 장터 조회
async function getMarketInfo() {
  try {
    const response = await local.get('/market');
    return response.data;
  } catch (error) {
    console.log('장터 정보 조회 실패', error);
    throw error;
  }
}

// 농작물 세부 조회
async function getAgricultureDetails(agricultureName) {
  try {
    const response = await local.get('/market/agriculture', {
      params: {
        agricultureName: agricultureName,
      },
    });
    return response.data;
  } catch (error) {
    console.log('농작물 상세 조회 실패', error);
    throw error;
  }
}

export {
  sellCrop,
  getSeedDetails,
  buySeed,
  getMarketInfo,
  getAgricultureDetails,
};
