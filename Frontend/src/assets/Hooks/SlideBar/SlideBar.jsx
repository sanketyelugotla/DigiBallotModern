import React, { useState } from "react";
import styleSlide from "./SlideBar.module.css";

export default function SlideBar({ headings, content, onTabChange, buttons }) {
    const [activeTab, setActiveTab] = useState(0); // Default to first tab
    const handleTabChange = (index) => {
        setActiveTab(index);
        onTabChange && onTabChange();
    };

    const totalTabs = headings.length;
    const sliderWidth = 100 / totalTabs; // Adjust slider width dynamically

    return (
        <div className={styleSlide.wrapper}>
            {/* Tabs Header */}
            <div className={styleSlide.completeHeader}>
                <header className={styleSlide.header}>
                    {headings.map((heading, index) => (
                        <label
                            key={index}
                            className={`${styleSlide.tab} ${activeTab === index ? styleSlide.activeTab : ""}`}
                            onClick={() => handleTabChange(index)}
                            style={{ width: `${sliderWidth}%` }} // Adjust width
                        >
                            {heading}
                        </label>
                    ))}
                    <div
                        className={styleSlide.slider}
                        style={{
                            left: `${(activeTab * 100) / totalTabs}%`,
                            width: `${sliderWidth}%`,
                            transform: `translateX(0%)`, // Align properly
                        }}
                    >
                    </div>
                </header>
                <div className={styleSlide.buttonsDiv}>
                    {buttons}
                </div>
            </div>

            {/* Content Area */}
            <div className={styleSlide.cardArea}>
                <div
                    className={styleSlide.cards}
                    style={{
                        width: `${totalTabs * 100}%`,
                        transform: `translateX(-${(activeTab * 100) / totalTabs}%)`,
                    }}
                >
                    {content.map((item, index) => (
                        <div key={index} className={styleSlide.row} style={{ width: `${100 / totalTabs}%` }}>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
