import { localAxios } from '@/utils/http-common';

// 조회 함수
async function accountCheck(accountContent) {
  try {
    const response = await localAxios().post('/banking/account', {
      startDate: accountContent.startDate,
      endDate: accountContent.endDate,
      accountType: accountContent.transitionType,
      accountNickname: accountContent.recordName,
      sortCriteria: accountContent.sortOrder,
    });

    const filterData = response.data;
    return filterData;
  } catch (error) {
    return error;
  }
}

export { accountCheck };
