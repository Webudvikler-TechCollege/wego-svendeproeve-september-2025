import { useState, useEffect } from "react";
import spinner from "../../assets/spinner.svg";

export const FrontpageHeader = ({ slides }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [animationKey, setAnimationKey] = useState(0);

    // Auto-rotate slides every 15 seconds
    useEffect(() => {
        if (!slides.length) return;

        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 15000);

        return () => clearInterval(interval);
    }, [slides.length]);

    // Handle text transition with proper timing
    useEffect(() => {
        if (!slides.length) return;
        
        const current = slides[currentSlide];
        const newText = current?.text || "Your journey starts here";
        
        // Immediately update the display text and trigger animation
        setDisplayText(newText);
        setAnimationKey(prev => prev + 1);
    }, [currentSlide, slides]);

    if (!slides.length) {
        return (
            <header className="frontpage-header bg-gray-200 h-96 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-600">Loading slides...</h1>
                </div>
            </header>
        );
    }

    const current = slides[currentSlide];
    const imageUrl = current?.imageBlobUrl || current?.imageUrl;
    const imageLoaded = !current?.imageLoading && !current?.imageError;
    const imageError = current?.imageError;

    return (
        <header 
            className="frontpage-header relative h-[calc(100vh-96px)] bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out overflow-hidden"
            style={{
                backgroundImage: (imageLoaded && imageUrl && !imageError) 
                    ? `url(${imageUrl})` 
                    : `url(${spinner})`
            }}
        >
            {/* Loading overlay */}
            {current?.imageLoading && (
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center z-[5]">
                    <div className="text-center">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        <p className="text-gray-600">Loading image...</p>
                    </div>
                </div>
            )}

            {/* Content with key-based animation reset */}
            <div key={animationKey} className="relative z-10 h-full flex items-center justify-center text-center px-4">
                <div className="max-w-4xl mx-auto p-6 rounded-lg">
                    <p className="text-2xl md:text-3xl lg:text-4xl text-white slide-in-text-delay font-medium drop-shadow-lg">
                        {displayText}
                    </p>
                </div>
            </div>
        </header>
    );
};