import React, { useEffect, useRef, useState } from "react";
import "./ScrollAnimation.css";

const ScrollAnimation = ({ children, type = "text" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const divRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 } // Trigger when at least 10% of the element is visible
        );

        if (divRef.current) {
            observer.observe(divRef.current);
        }

        return () => {
            if (divRef.current) {
                observer.unobserve(divRef.current);
            }
        };
    }, []);

    if (type === "text") {
        // Render text (paragraphs)
        return (
            <div className="container">
                <div ref={divRef} className="scroll-item">
                    <p
                        className={`line ${isVisible ? "visible" : ""}`}
                        style={{ transitionDelay: `0.3s` }}
                    >
                        {children}
                    </p>
                </div>
            </div>
        );
    } else if (type === "div") {
        // Render a div with animation for all children
        return (
            <div className="container">
                <div
                    ref={divRef}
                    className={`scroll-item ${isVisible ? "visible" : ""}`}
                    style={{ transitionDelay: `0.3s` }}
                >
                    {children}
                </div>
            </div>
        );
    }

    return null;
};

export default ScrollAnimation;
