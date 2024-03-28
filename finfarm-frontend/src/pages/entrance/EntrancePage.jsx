import KakaoLoginButton from '@/components/entrance/KakaoLoginButton';
import entrance1 from '@/assets/images/entrance1.png';
import entrance2 from '@/assets/images/entrance2.png';
import styles from './EntrancePage.module.css';
import ic_chip from '@/assets/images/ic_chip.png';

export default function EntrancePage() {

  return (
    <>
      <div>
        {/* 내용을 중앙에 배치하기 위한 wrapper div */}
        <div className={styles.wrapper}>
          {/* 흰색 배경의 div로 텍스트를 감싸기 */}
          <div className={styles.whiteBox}>
            <div className={styles.whiteBox2}>
              
              <h1 className='text-sm' > <pre>FIN_FARM    110****1110</pre></h1>
              <img src={ic_chip} alt="ic_chip" width={20} />
              <br />
              <KakaoLoginButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
