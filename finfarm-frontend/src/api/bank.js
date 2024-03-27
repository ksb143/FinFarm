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

// 최근 이체 내역 확인 함수
async function recentTransferDetails() {
  try {
    const response = await localAxios().get('/banking/account/remit/recent');
    return response.data;
  } catch (error) {
    return error;
  }
}

// 송금 함수
async function accountTransfer(transferContent) {
  try {
    const response = await localAxios().post('/banking/account/remit', {
      otherMemberPk: transferContent.recipient,
      amount: transferContent.amount,
      accountPassword: transferContent.password,
    });

    const remitData = response.data;
    return remitData;
  } catch (error) {
    return error;
  }
}

// 송금 유저 조회 함수
async function checkAnotherUser(anotherUser) {
  try {
    const response = await localAxios().get('/banking/account/remit', {
      nickname: anotherUser,
    });
    return response.data;
  } catch (error) {
    console.log('실패');
    throw error;
  }
}

export {
  accountCheck,
  recentTransferDetails,
  accountTransfer,
  checkAnotherUser,
};
