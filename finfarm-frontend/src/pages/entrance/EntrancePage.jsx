import KakaoLoginButton from '@/components/entrance/KakaoLoginButton';
import entrance1 from '@/assets/images/entrance1.png';
import entrance2 from '@/assets/images/entrance2.png';

export default function EntrancePage() {
  return (
    <div>
      <h1 className='text-4xl'>this is entrance page</h1>
      <KakaoLoginButton />
      <img src={entrance1}  width='300px' />
      <img src={entrance2}  width='300px' />
    </div>
  );
}
