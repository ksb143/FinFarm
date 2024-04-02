import { localAxios } from '@/utils/http-common';
import axios from 'axios';


const local = localAxios();

// 퀴즈 풀이 가능 여부 확인 함수
async function isQuizSolvePossible() {
    try {
      const response = await local.get('/member/quiz-possible');
      console.log(response.data)
      return response.data.isPossible;
    } catch (error) {
      console.log('퀴즈 풀이 가능 여부 조회 실패', error);
      throw error;
    }
  }

// 퀴즈 풀이 보상 획득 함수
async function getQuizAward() {
    try {
      const response = await local.get('/member/quiz-award');
      console.log(response.data)
      return response.data.curPoint;
    } catch (error) {
      console.log('퀴즈 풀이 가능 여부 조회 실패', error);
      throw error;
    }
  }
  


// 퀴즈 정보 가져오는 함수
async function fetchQuiz() {
    try {
      const response = await axios.get('https://j10d203.p.ssafy.io/quiz');
      console.log('퀴즈 정보:', response.data);
      
      // 퀴즈 데이터 구조분해 할당
      const { question, answer, wrong } = response.data;

      console.log(typeof(question));
      console.log(typeof(answer));
      console.log(typeof(wrong))
  
      const choices = [...wrong, answer].sort(() => Math.random() - 0.5);

      // 문제, 정답과 오답을 포함한 객체 반환
      return {
        question: question, // 문제
        correct: answer, // 정답
        choices: choices// 모든 선택지 (오답 3개)
      };
    } catch (error) {
      console.error('퀴즈 정보 가져오기 실패:', error);
      throw error; // 오류를 호출자에게 전파
    }
  }

  export{
    isQuizSolvePossible,
    getQuizAward,
    fetchQuiz
}