import React from 'react';
import KakaoLoginButton from '@/components/entrance/KakaoLoginButton';
import entrance1 from '@/assets/images/entrance1.png';
import entrance2 from '@/assets/images/entrance2.png';
import entrance3 from '@/assets/images/entrance3.png';
import entrance4 from '@/assets/images/entrance4.png';

export default function EntrancePage() {

    return(
        <div>
            <div className='flex justify-center'>
                <p className='text-7xl'>this is entrance page</p>
            </div>            
            <br />
            <br />
            <div className='flex' >
                <img src={entrance1} width='400px' />
                <img src={entrance2} width='400px' />
                <img src={entrance3} width='400px' />
            </div>
            <br />
            <br />
            <div className='flex justify-center' >
                <KakaoLoginButton />
            </div>
        </div>
    );
}
