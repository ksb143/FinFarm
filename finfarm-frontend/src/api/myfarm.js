import { localAxios } from '@/utils/http-common';

const local = localAxios();

// 내농장 정보 조회
// 파라미터 없음. 리퀘 바디 없음.
async function CheckMyfarmInfo() {
  try {
    const res = await local.get('/farm');
    return res.data;
  } catch (error) {
    console.log('내농장 정보 조회.. 실패', error);
    throw error;
  }
}

// 씨앗심기
// 파라미터 없음. 리퀘 바디에 "farmFieldIndex": 10, "seedName": "씨감자"
async function PlantSeeds() {
  try {
    const res = await local.post('/farm/plant');
    return res.data;
  } catch (error) {
    console.log('씨앗심기.. 실패', error);
    throw error;
  }
}

async function HarvestPlants() {
  try {
    const res = await local.post('/farm/harvest');
    return res.data;
  } catch (error) {
    console.log('농작물 수확.. 실패', error);
    throw error;
  }
}

async function DumpTrashes() {
  try {
    const res = await local.post('/farm/dump');
    return res.data;
  } catch (error) {
    console.log('쓰레기버리기.. 실패', error);
    throw error;
  }
}

async function LevelUpFarm() {
  try {
    const res = await local.post('/farm/farm-level');
    return res.data;
  } catch (error) {
    console.log('농장지력 강화.. 실패', error);
    throw error;
  }
}

export { CheckMyfarmInfo, PlantSeeds, HarvestPlants, DumpTrashes, LevelUpFarm };
