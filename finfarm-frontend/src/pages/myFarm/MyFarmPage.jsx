import React from 'react';
import coming_soon from '@/assets/images/coming_soon.gif';

export default function MyFarmPage() {

    return(
        <div>
            <h1>MY farm page 나의 농장 준비중!</h1>
            <img src={coming_soon} alt="img" width={800} />
        </div>
    );
}
