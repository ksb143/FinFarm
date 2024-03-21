import navLogo from '@/assets/images/navLogo.png';

import Button from './Button';

export default function Navbar() {
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
          <p className="text-xs">현금 {1000}원 보유한</p>
          <p>김수빈님</p>
        </div>
        <Button>로그아웃</Button>
      </div>
    </div>
  );
}
