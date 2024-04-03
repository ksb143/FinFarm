import React from 'react';
import bg from '@/assets/images/FarmUp.png';
import { LevelUpFarm } from '@/api/myfarm';

const ButtonFarmLevel = () => {
  const handleUpgrade = () => {
    LevelUpFarm()
      .then((res) => {
        console.log('지력강화 request: 성공', res);
        if (res.reinforcementSuccess) {
          console.log('지력강화 response: 성공', res);
          // 성공 모달의 내용 업데이트 및 보여주기
          const successModal = document.getElementById('successModal');
          successModal.querySelector('.py-4').innerHTML =
            `현재 지력 레벨: ${res.farmLevel} 
            `;
          successModal.showModal();
        } else {
          console.log('지력강화 response: 실패', res);
          // 실패 모달의 내용 업데이트 및 보여주기
          const failureModal = document.getElementById('failureModal');
          failureModal.querySelector('.py-4').innerHTML =
            `현재 지력 레벨: ${res.farmLevel}
            <br/>
            다음 강화에 필요한 비용: ${res.nextReinforceCost}
            <br/>
            다음 강화 성공 가능성: ${res.nextReinforceProbability * 100}%
            `;
          failureModal.showModal();
        }
      })
      .catch((err) => {
        console.log('지력강화 request 보내기 실패:', err);
      });
  };

  return (
    <>
      <button
        className="btn-xl btn rounded-xl hover:bg-lime-500"
        onClick={handleUpgrade}
        style={{
          width: '300px',
          height: '133px',
          backgroundImage: `url(${bg})`,
        }}
      ></button>

      {/* 성공 모달 */}
      <dialog id="successModal" className="modal">
        <div className="modal-box">
          <h3 className="text-7xl ">성공!</h3>
          <p className="py-4 text-lg">
            현재 지력 레벨: N<br />
            다음 강화에 필요한 비용: M
          </p>
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => document.getElementById('successModal').close()}
            >
              닫기
            </button>
          </div>
        </div>
      </dialog>

      {/* 실패 모달 */}
      <dialog id="failureModal" className="modal">
        <div className="modal-box">
          <h3 className="text-3xl ">지력 강화에 실패했습니다.</h3>
          <p className="py-4 text-lg">
            현재 지력 레벨: N<br />
            다음 강화에 필요한 비용: M
          </p>
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => document.getElementById('failureModal').close()}
            >
              닫기
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ButtonFarmLevel;
