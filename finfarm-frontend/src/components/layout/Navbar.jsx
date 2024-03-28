import { Link } from 'react-router-dom';
import { useState } from 'react'; // useState 추가

import navLogo from '@/assets/images/navLogo.png';
import profile_icon from '@/assets/images/profile_icon.png';

export default function Navbar() {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
  const CurrentPoint = `${localStorage.getItem('memberCurPoint')} 포인트`;
  const UserNickname = `${localStorage.getItem('memberNickname')} 님`;  

  // Dropdown이 열려있는지 여부를 관리하는 상태 추가
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Dropdown을 열거나 닫는 함수
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar mb-10 flex justify-between bg-gray-50">
      <div className="flex-1">
        <img src={navLogo} alt="navLogo" className="h-auto w-28" />
      </div>
      <div className="flex-none gap-8">
        <div className="dropdown dropdown-end">
          <button
            className="avatar btn btn-circle btn-ghost"
            aria-label="Profile Menu"
            onClick={toggleDropdown} // 클릭 이벤트 추가
          >
            <div className="w-16 rounded-full">
              <img
                alt="profile_icon"
                src={profile_icon}
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
          <p className='' >{UserNickname}</p>
          <button className="btn btn-sm min-w-32 rounded-full bg-lime-500 font-hopang text-white hover:bg-lime-800" >로그아웃</button>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-x-2">
            <span className="text-xs">💰 지금 가진 돈</span>
            <span className="text-xs">{CurrentPoint}</span>
          </div>

          <div className="flex items-center gap-x-2">
            <span className="text-xs">📅 오늘의 날짜</span>
            <span className="text-xs">{formattedDate}</span>
          </div>

          <div className="flex items-center gap-x-2">
            <button className="text-xs">🌈 오늘의 날씨</button>
            <span className="text-xs">맑음</span>
          </div>

        </div>
      </div>
    </div>
  );
}
