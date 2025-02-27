import React, { useState } from "react";
import styleSlide from "./SlideBar.module.css";

export default function SlideBar() {
    const [activeTab, setActiveTab] = useState(2);

    const handleTabChange = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    return (
        <div className={styleSlide.wrapper}>
            <header className={styleSlide.header}>
                <label
                    className={`${styleSlide.tab} ${activeTab === 1 ? styleSlide.activeTab : ""}`}
                    onClick={() => handleTabChange(1)}
                >
                    Basic
                </label>
                <label
                    className={`${styleSlide.tab} ${activeTab === 2 ? styleSlide.activeTab : ""}`}
                    onClick={() => handleTabChange(2)}
                >
                    Standard
                </label>
                <label
                    className={`${styleSlide.tab} ${activeTab === 3 ? styleSlide.activeTab : ""}`}
                    onClick={() => handleTabChange(3)}
                >
                    Team
                </label>
                <div
                    className={styleSlide.slider}
                    style={{
                        left: activeTab === 1 ? "5%" : activeTab === 2 ? "50%" : "100%",
                        width: activeTab === 1 ? "90px" : activeTab === 2 ? "120px" : "95px",
                        transform: activeTab === 1 ? "translateX(0%)" : activeTab === 2 ? "translateX(-50%)" : "translateX(-100%)",
                    }}
                ></div>
            </header>

            <div className={styleSlide.cardArea}>
                <div
                    className={styleSlide.cards}
                    style={{
                        transform: `translateX(-${(activeTab - 1) * 33.4}%)`,
                    }}
                >
                    <div className={`${styleSlide.row} ${styleSlide.row1}`}>
                        <div className={styleSlide.priceDetails}>
                            <span className={styleSlide.price}>19</span>
                            <p>For beginner use</p>
                        </div>
                        <ul className={styleSlide.features}>
                            <li><i className="fas fa-check"></i><span>100 GB Premium Bandwidth</span></li>
                            <li><i className="fas fa-check"></i><span>FREE 50+ Installation Scripts</span></li>
                            <li><i className="fas fa-check"></i><span>One FREE Domain Registration</span></li>
                            <li><i className="fas fa-check"></i><span>Unlimited Email Accounts</span></li>
                        </ul>
                    </div>

                    <div className={styleSlide.row}>
                        <div className={styleSlide.priceDetails}>
                            <span className={styleSlide.price}>99</span>
                            <p>For professional use</p>
                        </div>
                        <ul className={styleSlide.features}>
                            <li><i className="fas fa-check"></i><span>Unlimited GB Premium Bandwidth</span></li>
                            <li><i className="fas fa-check"></i><span>FREE 200+ Installation Scripts</span></li>
                            <li><i className="fas fa-check"></i><span>Five FREE Domain Registration</span></li>
                            <li><i className="fas fa-check"></i><span>Unlimited Email Accounts</span></li>
                        </ul>
                    </div>

                    <div className={styleSlide.row}>
                        <div className={styleSlide.priceDetails}>
                            <span className={styleSlide.price}>49</span>
                            <p>For team collaboration</p>
                        </div>
                        <ul className={styleSlide.features}>
                            <li><i className="fas fa-check"></i><span>200 GB Premium Bandwidth</span></li>
                            <li><i className="fas fa-check"></i><span>FREE 100+ Installation Scripts</span></li>
                            <li><i className="fas fa-check"></i><span>Two FREE Domain Registration</span></li>
                            <li><i className="fas fa-check"></i><span>Unlimited Email Accounts</span></li>
                        </ul>
                    </div>
                </div>
            </div>

            <button className={styleSlide.button}>Choose plan</button>
        </div>
    );
}
