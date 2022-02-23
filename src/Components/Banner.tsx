import React from 'react';
import Styles from '../Styles/banner.module.css';

function Home() {
    return (
        <div className={Styles.bannerWrapper}>
            <div className={Styles.titleWrapper}>
                <h1>Your Academy Awards</h1>
                <h2>Do record about your films...</h2>
            </div>
            <hr/>
        </div>

    )
}

export default Home


