'use client';

import { useState } from 'react';
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function Gallary({ images }: { images: string[] }){
    const [currentIndex, setCurrentIndex] = useState(0);
    const total = images.length;
    
    if(images.length === 0){
        return null;
    }
    
    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
    };
    
    const goToNext = () => {
        setCurrentIndex((prev) => (prev+1) % images.length);
    };

    const goToIndex = (index: number) => {
        setCurrentIndex(index);
    };

    const renderedImg = <img
        src={images[currentIndex]}
        alt={`Gallery image ${currentIndex + 1}`}
        className="object-cover transition-opacity duration-300"
    />
    return (
        <div className='w-full max-w-4xl mx-auto relative aspect-video overflow-hidden rounded-t-xl'>
        {renderedImg}

        <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1 m-0 text-white"
            aria-label="Previous image"
        >
            <LuChevronLeft size={30} />
        </button>

        <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 m-0 text-white cursor-pointer"
            aria-label="Next image"
        >
            <LuChevronRight size={30} />
        </button>
        
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
            <button
                key={idx}
                className={`w-2 h-2 cursor-pointer rounded-full ${
                    idx === currentIndex ? 'bg-white' : 'bg-white/50'
                } transition`}
                onClick={() => goToIndex(idx)}
                aria-label={`Go to image ${idx + 1}`}
            />
            ))}
        </div>
        </div>
    );
}