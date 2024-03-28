import { Link } from 'react-router-dom';
import { useState } from 'react'; // useState 추가
import { useNavigate } from 'react-router-dom';
import useUserStore from '@/store/userStore';

import navLogo from '@/assets/images/navLogo2.png';
import profile_icon from '@/assets/images/profile_icon2.png';

export default function Navbar() {
  const { 
    accessToken,
    memberNickname,
    memberEmail,
    memberCurPoint,
    memberImageUrl,
    memberSolveQuiz,
    memberCreateDate
  } = useUserStore();

  const navigate = useNavigate();
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
  const CurrentPoint = `${localStorage.getItem('memberCurPoint')} 포인트`;
  const UserNickname = `${localStorage.getItem('memberNickname')} 님`;  
  
  const GoToMainHome = () => {
    navigate('/home')
  };
  
  // Dropdown이 열려있는지 여부를 관리하는 상태 추가
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Dropdown을 열거나 닫는 함수
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar mb-10 flex justify-between bg-gray-50">
      <div className="flex-2">
        <img src={navLogo} alt="navLogo" className="h-auto w-48" onClick={GoToMainHome}/>
      </div>
      <div className="flex-none gap-8">
        <div className="dropdown dropdown-end">
          <button
            className="avatar btn btn-circle btn-ghost w-24 h-24"
            aria-label="Profile Menu"
            onClick={toggleDropdown} // 클릭 이벤트 추가
          >
            <div className="w-44 rounded-full">
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
                  👩 Profile
                </Link>
              </li>
              <li>
                <Link to="/bank" onClick={toggleDropdown}>
                  {' '}
                  {/* 클릭 이벤트 추가 */}
                  🏛 Bank
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl" >{UserNickname}</span>
          
          <button className="btn btn-base min-w-32 text-2xl rounded-full bg-lime-500 font-hopang text-white hover:bg-lime-800" >로그아웃</button>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-x-11">
            <span className="text-2xl">💰 Point :</span>
            <span className="text-2xl">{CurrentPoint}</span>
          </div>

          <div className="flex items-center gap-x-8">
            <span className="text-2xl">📅 Today :</span>
            <span className="text-2xl">{formattedDate}</span>
          </div>

          <div className="flex items-center gap-x-2">
            <button className="text-2xl">🌈 Weather :</button>
            <span className="text-2xl">맑음</span>
          </div>

        </div>
      </div>
    </div>
  );
}
