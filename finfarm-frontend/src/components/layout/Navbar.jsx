import navLogo from '@/assets/images/navLogo.png';

import Button from './Button';

export default function Navbar() {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  return (
    <div className="navbar mb-10 flex justify-between bg-gray-50">
      <div className="flex-1">
        <img src={navLogo} alt="navLogo" className="h-auto w-32" />
      </div>
      <div className="flex-none gap-2">
        <div
          tabIndex={0}
          role="button"
          className="avatar btn btn-circle btn-ghost"
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
          <div className="flex items-center gap-x-2">
            <span className="text-xs">💰현금</span>
            <span className="text-xs">300,000원</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="text-xs">📅날짜</span>
            <span className="text-xs">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <button className="text-xs">🌈날씨</button>
            <span className="text-xs">맑음</span>
          </div>
        </div>
      </div>
    </div>
  );
}
