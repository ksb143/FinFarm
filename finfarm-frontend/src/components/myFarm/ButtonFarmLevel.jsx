import bg from '@/assets/images/FarmUp.png';
import { LevelUpFarm } from '@/api/myfarm';

const ButtonFarmLevel = () => {
  const handleUpgrade = () => {
    LevelUpFarm()
      .then((res) => {
        console.log('Farm upgraded successfully:', res);
      })
      .catch((err) => {
        console.log('Failed to upgrade farm:', err);
      });
  };

  return (
    <button
      className="btn-xl btn rounded-xl hover:bg-lime-500"
      onClick={handleUpgrade}
      style={{
        width: '300px',
        height: '133px',
        backgroundImage: `url(${bg})`,
      }}
    ></button>
  );
};

export default ButtonFarmLevel;
