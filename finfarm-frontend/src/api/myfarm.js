import { localAxios } from '@/utils/http-common';

const local = localAxios();

// 내농장 정보 조회
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
async function PlantSeeds() {
  try {
    const res = await local.post('/farm/plant');
    return res.data;
  } catch (error) {
    console.log('씨앗심기.. 실패', error);
    throw error;
  }
}

// 수확하기
async function HarvestPlants() {
  try {
    const res = await local.post('/farm/harvest');
    return res.data;
  } catch (error) {
    console.log('농작물 수확.. 실패', error);
    throw error;
  }
}

// 쓰레기 버리기
async function DumpTrashes() {
  try {
    const res = await local.patch('/farm/dump');
    return res.data;
  } catch (error) {
    console.log('쓰레기버리기.. 실패', error);
    throw error;
  }
}

// 농장 지력 높이기
async function LevelUpFarm() {
  try {
    const res = await local.get('/farm/farm-level');
    return res.data;
  } catch (error) {
    console.log('농장지력 강화.. 실패', error);
    throw error;
  }
}

export { CheckMyfarmInfo, PlantSeeds, HarvestPlants, DumpTrashes, LevelUpFarm };
