import navLogo from '@/assets/images/navLogo.png';

import Button from './Button';

export default function Navbar() {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  return (
    <div className="flex justify-between navbar bg-gray-50">
      <div className="flex-1">
        <img src={navLogo} alt="navLogo" className="w-32 h-auto" />
      </div>
      <div className="flex-none gap-2">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p>김수빈님</p>
          <Button>로그아웃</Button>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-x-2 items-center">
            <span className="text-xs">💰현금</span>
            <span className="text-xs">300,000원</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <span className="text-xs">📅날짜</span>
            <span className="text-xs">{formattedDate}</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <button className="text-xs">🌈날씨</button>
            <span className="text-xs">맑음</span>
          </div>
        </div>
      </div>
    </div>
  );
}
