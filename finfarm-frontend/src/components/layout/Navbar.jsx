import { Link } from 'react-router-dom';
import { useState } from 'react'; // useState 추가

import navLogo from '@/assets/images/navLogo.png';
import Button from './Button';

export default function Navbar() {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  // Dropdown이 열려있는지 여부를 관리하는 상태 추가
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Dropdown을 열거나 닫는 함수
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar mb-10 flex justify-between bg-gray-50">
      <div className="flex-1">
        <img src={navLogo} alt="navLogo" className="h-auto w-32" />
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <button
            className="avatar btn btn-circle btn-ghost"
            aria-label="Profile Menu"
            onClick={toggleDropdown} // 클릭 이벤트 추가
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </button>
          {/* Dropdown이 열려있을 때만 보이도록 설정 */}
          {isDropdownOpen && (
            <ul className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
              <li>
                <Link
                  to="/bank"
                  className="justify-between"
                  onClick={toggleDropdown}
                >
                  {' '}
                  {/* 클릭 이벤트 추가 */}
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/bank" onClick={toggleDropdown}>
                  {' '}
                  {/* 클릭 이벤트 추가 */}
                  Bank
                </Link>
              </li>
            </ul>
          )}
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
