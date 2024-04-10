import React, { useState } from 'react';
import entrance4 from '@/assets/images/entrance4.png';
import useUserStore from '@/store/userStore';
import quiz from '@/assets/images/quiz.png';
import QuizModal from '@/components/layout/QuizModal';
import { getQuizAward, isQuizSolvePossible, fetchQuiz } from '@/api/mainpage';

export default function MainHomePage() {
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizData, setQuizData] = useState({ question: '', choices: [] });

  // 전역상태관리 import 로직
  const { nickname: nickname } = useUserStore((state) => ({
    nickname: state.nickname,
  }));

  const handleQuizAttempt = async () => {
    const canSolveQuiz = await isQuizSolvePossible();
    if (canSolveQuiz) {
      const data = await fetchQuiz();
      if (
        data &&
        Array.isArray(data.choices) &&
        typeof data.correct === 'string' &&
        typeof data.question === 'string'
      ) {
        // 정상적인 데이터인 경우, 퀴즈 데이터를 상태에 설정
        setQuizData({
          question: data.question,
          choices: data.choices,
          correct: data.correct,
        });
        setShowQuizModal(true); // 퀴즈 모달 표시
      } else {
        console.error('퀴즈 데이터가 올바르지 않습니다:', data);
      }
    } else {
      alert('이미 도전했습니다. 내일 다시 도전하세요!');
    }
  };

  const handleCloseQuizModal = () => {
    setShowQuizModal(false); // 모달 숨김
  };

  const handleQuizAward = async (isCorrect) => {
    if (isCorrect) {
      // 정답인 경우의 로직 (예: 포인트 증가 등)
      const curPoint = await getQuizAward();
      useUserStore.setState({ pointsInthePocket: curPoint });
      console.log(curPoint);
      console.log('정답 처리 로직');
    } else {
      // 오답인 경우의 로직
      console.log('오답 처리 로직');
    }
    setShowQuizModal(false); // 퀴즈 모달 닫기
  };

  return (
    <div className="flex ">
      {showQuizModal && (
        <QuizModal
          question={quizData.question} // 퀴즈 질문
          choices={quizData.choices} // 퀴즈 선택지
          onSolve={handleQuizAward} // 퀴즈 정답 처리 함수
          onCancel={handleCloseQuizModal} // 모달 닫기 함수
          correct={quizData.correct} // 정답 문자열 전달
        ></QuizModal>
      )}
      <div className="flex items-stretch">
        <img src={entrance4} width="500px" />

        <div className="ml-20 flex h-96 flex-col items-center justify-between">
          <p className="text-center text-5xl">환영합니다, {nickname}님!</p>

          <img src={quiz} alt="quiz" className="mb-10 mt-20" width="200px" />

          <div className="flex">
            <div class="flex flex-col items-center justify-between">
              <p className="text-center text-3xl">
                데일리 농산물 퀴즈에 도전하고
              </p>
              <p className="text-center text-3xl">5,000 Point를 받아보세요!</p>
            </div>

            <button
              className="btn btn-square ml-10 h-20 w-20 bg-lime-500 font-hopang text-3xl text-white hover:bg-lime-800"
              onClick={handleQuizAttempt}
            >
              도전
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
