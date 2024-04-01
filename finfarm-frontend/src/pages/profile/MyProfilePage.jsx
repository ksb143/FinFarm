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
            <div>
                <p>자기 개인 프로필 사진 뜨게 하기.</p>

                <p>프로필 사진 저장___플필 사진 저장 api 호출___저장된 s3 서버의 주소를 받아서___마이페이지 수정api의 request에 넣어줌</p>
                <p>프로필 사진을 마이페이지 조회 api로 받아와서 보여줌.</p>
                <p>사진이 동그란 테두리로 나타나게 하기</p>

            </div>
            
            <div>
                <p>개인 정보 및 세팅 변경 코너</p>
                
                <p>닉네임 변경</p>
                <p>프로필사진 변경(사진이 저장된 s3주소)</p>
            </div>
            
            <div>
                <p>가입한 지 얼마나 되었는지</p>
                <p>로그인할때 response에 memberCreateDate를 받아오므로... 그걸 store에 저장했고 여기서 보여주기</p>
            </div>

            <div>
                <p>퀴즈를 풀수 있는지 검사 api 호출로.....오늘의 문제를 풀었는지 여부 체크</p>
            </div>

            <div>
                <p>회원탈퇴 api 호출로.....accessToken에 해당하는 유저가 탈퇴됨.</p>
            </div>
            
        </div>
    );
};