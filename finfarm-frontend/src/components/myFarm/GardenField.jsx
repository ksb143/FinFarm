import 양배추 from '@/assets/images/cabbage.png';
import useUserStore from '@/store/userStore';
import useCropStore from '@/store/cropStore';

const GardenItem = ({ crop }) => (
  <div className="h-30 w-30 static bg-amber-900">
    <img
      src={crop.image}
      alt={crop.name}
      className="mx-auto mb-1 mt-1 h-20 w-20 rounded-3xl bg-amber-800"
    />
    <div className="flex flex-row justify-between border-emerald-400 bg-white"></div>
  </div>
);

const GardenField = () => {
  // 전역상태관리 import 로직
  const { nickname: nickname } = useUserStore((state) => ({
    nickname: state.nickname,
  }));

  const crops = useCropStore((state) => state.crop);

  return (
    <>
      <div
        className="relative flex flex-col"
        style={{ width: '400px', height: 'auto' }}
      >
        <div className="mb-3 text-center">
          <h1 className="border-2 text-2xl ">{nickname} 님의 농장</h1>
        </div>
        <div className="overflow-auto border-2 bg-amber-800 px-3 py-3">
          <div className="grid grid-cols-5 gap-1 bg-amber-900 px-3 py-3 text-center">
            {crops.map((crop, index) => (
              <GardenItem key={index} crop={crop} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GardenField;
