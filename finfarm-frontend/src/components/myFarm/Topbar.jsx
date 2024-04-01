import React from 'react';
import useUserStore from '@/store/userStore';
import PropTypes from 'prop-types';
import { CheckMyfarmInfo, LevelUpFarm } from '@/api/myfarm';

CheckMyfarmInfo.PropTypes = {
  nickname: PropTypes.string,
  imageUrl: PropTypes.string,
  farmLevel: PropTypes.number,
  farmEffect: PropTypes.number,
  nextReinforceCost: PropTypes.number,
  nextReinforceEffect: PropTypes.number,
  nextReinforceProbability: PropTypes.number,
  farmFieldInfo: PropTypes.array,
  memberItems: PropTypes.object,
};

function Topbar() {
  const { accessToken: accessToken } = useUserStore((state) => ({
    accessToken: state.accessToken,
  }));

  return (
    <>
      <div>
        <div>
          <h1>{nickname}의 농장</h1>
        </div>

        <div>
          <h1>농장레벨: {farmLevel}</h1>
        </div>

        <div>
          <button onClick={handleReinforce}>지력강화</button>
        </div>
      </div>
    </>
  );
}

export default Topbar;
