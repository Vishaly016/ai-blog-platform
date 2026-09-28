import React, { useEffect, useState } from "react";

const PageTransition = ({ children, transitionKey }) => {

    const [displayedContent, setDisplayedContent] = useState(children);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {

        setIsExiting(true);

        const timer = setTimeout(() => {
            setDisplayedContent(children);
            setIsExiting(false);
        }, 180);

        return () => clearTimeout(timer);

    }, [transitionKey]);

    return (
        <div className={isExiting ? "page-transition exit" : "page-transition enter"}>
            {displayedContent}
        </div>
    );
};

export default PageTransition;