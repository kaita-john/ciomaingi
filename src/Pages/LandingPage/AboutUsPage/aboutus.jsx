import React from 'react';
import styles from './aboutus.module.css';
import candleOne from '/src/assets/img/candleone.jpg'
import candleTwo from '/src/assets/img/candletwo.jpg'
import candleThree from '/src/assets/img/candlethree.jpg'
import candleFour from '/src/assets/img/candlefour.jpg'
import candleFive from '/src/assets/img/candlefive.jpg'

const AboutUs = () => {
    return (
        <div className={styles.aboutUsContainer}>

            <section className={styles.contentSection}>
                <div className={styles.contentWrapper}>
                    {/* Left Column: Text */}
                    <div className={styles.textContent}>
                        <div align='center'>
                            <h2>Our Story</h2>
                        </div>
                        <p>
                            Cio Maingi Candles was born from a desire to make eco-friendly candles more accessible to
                            individuals and businesses interested in candle-making.
                        </p>
                        <p>
                            Cio Maingi Candles was registered in 2021 as a candle supply studio in Kiambu County, Kenya.
                            We named the business after our great grandmother “Cio Maingi” who lived in the Mt. Kenya
                            region during the late 1800s.
                        </p>
                        <p>
                            She was a fiery woman who once broke free from chains set by the colonizers (both literally
                            & figuratively). We created this brand to keep her legacy alive, honor her beauty &
                            intellect, and share her unquenchable fire with our audience.
                        </p>
                    </div>

                    {/* Right Column: Image */}
                    <br/>
                    <div className={styles.imageContent}>
                        <img
                            src={candleOne}
                            alt="Candle making supplies"
                            className={styles.contentImage}
                        />
                    </div>
                </div>
            </section>

            {/* Visual Story Section */}
            <section className={styles.visualStorySection}>
                <div className={styles.visualStoryWrapper}>
                    <div className={styles.visualStoryItem}>
                        <img
                            src={candleTwo}
                            alt="Lit candle"
                            className={styles.visualImage}
                        />
                        <p>Handcrafted with care, inspired by nature.</p>
                    </div>
                    <div className={styles.visualStoryItem}>
                        <img
                            src={candleThree}
                            alt="Mt. Kenya landscape"
                            className={styles.visualImage}
                        />
                        <p>Rooted in the beauty of Mt. Kenya.</p>
                    </div>
                    <div className={styles.visualStoryItem}>
                        <img
                            src={candleFour}
                            alt="Candle making workshop"
                            className={styles.visualImage}
                        />
                        <p>Empowering creativity through workshops.</p>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className={styles.ctaSection}>
                <h2>Join Our Journey</h2>
                <p>
                    Discover the art of candle-making with Cio Maingi Candles. Let’s light up the world together.
                </p>
                <button className={styles.ctaButton}>Explore Our Products</button>
            </section>
        </div>
    );
};

export default AboutUs;