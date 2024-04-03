import { Link } from 'react-router-dom';
import { useState } from 'react'; // useState 추가
import { useNavigate } from 'react-router-dom';
import useUserStore from '@/store/userStore';

import navLogo from '@/assets/images/navLogo2.png';
import profile_icon from '@/assets/images/profile_icon2.png';

export default function Navbar() {
  // 전역상태관리 import 로직
  const {
    nickname: nickname,
    pointsInthePocket: pointsInthePocket,
    profileImageUrl: profileImageUrl,
  } = useUserStore((state) => ({
    nickname: state.nickname,
    pointsInthePocket: state.pointsInthePocket,
    profileImageUrl: state.profileImageUrl,
  }));
  // 전역상태관리 초기화 로직
  const { resetAccessToken } = useUserStore((state) => ({
    resetAccessToken: state.resetAccessToken,
  }));

  const navigate = useNavigate();

  const today = new Date();

  const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  const GoToMainHome = () => {
    if (localStorage.getItem('accessToken')) {
      navigate('/home');
    } else {
      navigate('/entrance');
    }
  };

  // Dropdown이 열려있는지 여부를 관리하는 상태 추가
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Dropdown을 열거나 닫는 함수
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // accessToken 삭제
    resetAccessToken();

    navigate('/entrance'); // 로그인 페이지나 웰컴 페이지로 이동
  };

  return (
    <div className="navbar mb-10 flex justify-between bg-gray-50">
      <div className="flex-2">
        <img
          src={navLogo}
          alt="navLogo"
          className="h-auto w-48 cursor-pointer"
          onClick={GoToMainHome}
        />
      </div>
      <div className="flex-none gap-8">
        <div className="dropdown dropdown-end">
          <button
            className="avatar btn btn-circle btn-ghost h-24 w-24"
            aria-label="Profile Menu"
            onClick={toggleDropdown} // 클릭 이벤트 추가
          >
            <div className="w-20 rounded-full">
              <img
                alt="profile_icon"
                src={profileImageUrl ? profileImageUrl : profile_icon}
              />
            </div>
          </button>
          {/* Dropdown이 열려있을 때만 보이도록 설정 */}
          {isDropdownOpen && (
            <ul className="menu-xl menu dropdown-content z-[1] mt-3 w-48 rounded-box bg-base-100 p-2 text-2xl shadow">
              <li>
                <Link
                  to="/mypage"
                  className="justify-between"
                  onClick={toggleDropdown}
                >
                  {' '}
                  {/* 클릭 이벤트 추가 */}
                  👩 마이페이지
                </Link>
              </li>
              <li>
                <Link to="/bank" onClick={toggleDropdown}>
                  {' '}
                  {/* 클릭 이벤트 추가 */}
                  🏛 은행 가기
                </Link>
              </li>
              <li>
                <Link to="/myfarm" onClick={toggleDropdown}>
                  {' '}
                  {/* 클릭 이벤트 추가 */}
                  🍎 농장 가기
                </Link>
              </li>
              <li>
                <Link to="/market" onClick={toggleDropdown}>
                  {' '}
                  {/* 클릭 이벤트 추가 */}
                  🛍 장터 가기
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl">{nickname}</span>

          <button
            onClick={handleLogout}
            className="btn-base btn min-w-32 rounded-full bg-lime-500 font-hopang text-2xl text-white hover:bg-lime-800"
          >
            로그아웃
          </button>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-x-11">
            <span className="text-xl">💰 Point :</span>
            <span className="text-xl">
              {pointsInthePocket.toLocaleString()}원
            </span>
          </div>

          <div className="flex items-center gap-x-8">
            <span className="text-xl">📅 Today :</span>
            <span className="text-xl">{formattedDate}</span>
          </div>

          <div className="flex items-center gap-x-3">
            <button className="text-xl">🌈 Weather :</button>
            <span className="text-xl">맑음</span>
          </div>
        </div>
      </div>
    </div>
  );
}
