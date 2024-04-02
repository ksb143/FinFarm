import PropTypes from 'prop-types';

import fail from '@/assets/images/fail.png';
import one from '@/assets/images/number_1.png';
import two from '@/assets/images/number_2.png';
import three from '@/assets/images/number_3.png';
import four from '@/assets/images/number_4.png';

QuizModal.propTypes = {
  children: PropTypes.node.isRequired,
  question: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null, undefined])
  ]),
  choices: PropTypes.arrayOf(PropTypes.string),
  onSolve: PropTypes.func,
  onCancel: PropTypes.func,
  correct: PropTypes.string.isRequired
};

export default function QuizModal({
  question,
  choices,
  correct,
  onSolve,
  onCancel
}) {

  const images = [one, two, three, four];

  const handleChoiceClick = (choice) => {
    if (choice === correct) {
      alert('정답입니다!');
      onSolve(true); // 정답인 경우
    } else {
      alert('오답입니다! 정답은 '+ correct + '입니다.');
      onSolve(false); // 오답인 경우
    }
  };

  return (
    
    <div className="fixed left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 w-1/2 rounded-lg border-2 border-solid border-gray-300 bg-white">
        <div className="absolute top-0 right-0 m-2">
            <img src={fail} alt="exit"  width='20px' onClick={onCancel}/>
        </div>
        <div className="p-8">
            <p className="text-2xl font-bold mb-4">{question}</p> 
            <ul className="space-y-2">
                {choices.map((text, index) => (
                  <li key={index} className="bg-lime-100 p-2 flex items-center hover:bg-lime-300" onClick={() => handleChoiceClick(text)}>
                    <img src={images[index]} width = '20px' alt={`Number ${index + 1}`} className="mr-2" />{text}
                  </li>
                ))}
            </ul>
        </div>
    </div>

  );
}
