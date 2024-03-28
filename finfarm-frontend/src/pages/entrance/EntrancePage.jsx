import KakaoLoginButton from '@/components/entrance/KakaoLoginButton';
import entrance1 from '@/assets/images/entrance1.png';
import entrance2 from '@/assets/images/entrance2.png';
import styles from './EntrancePage.module.css';
import ic_chip from '@/assets/images/ic_chip.png';
import crown from '@/assets/images/crown.gif';

export default function EntrancePage() {

  return (
    <>
      <div>
        <div className={styles.wrapper}>
          {/* 흰색 배경의 div로 텍스트를 감싸기 */}
          <img src={crown} alt="" width={80} className='mr-[260px]' />
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
