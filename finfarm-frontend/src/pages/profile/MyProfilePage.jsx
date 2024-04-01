import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useUserStore from '@/store/userStore';
import axios from 'axios';

export default function MyProfilePage() {

    return(
        <div>
            <h1 className='text-3xl'>MY page 마이페이지 준비중!</h1>
            <br />
            <br />
            <p>자기 개인 프로필 사진 뜨게 하기.</p>
            <br />
            <p>개인 정보 및 세팅 변경 코너</p>
            <br />
            <p>회원탈퇴 버튼</p>
            <br />
            <p>가입한 지 얼마나 되었는지</p>
            <br />
            <p>오늘의 문제를 풀었는지 여부</p>
        </div>
    );
};