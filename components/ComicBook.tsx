
import React from 'react';
import { ComicPage } from '../types';

interface Props {
  page: ComicPage;
  total: number;
  currentIdx: number;
  onNext: () => void;
  onPrev: () => void;
}

const ComicBook: React.FC<Props> = ({ page, total, currentIdx, onNext, onPrev }) => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg comic-card relative">
      <div className="flex justify-between items-center mb-6">
        <span className="bg-black text-white px-4 py-1 font-bold comic-font text-xl">
          PAGE {currentIdx + 1}
        </span>
        <h2 className="text-xl md:text-2xl font-bold text-center flex-1 mx-4">
          {page.title}
        </h2>
        <span className="bg-yellow-400 text-black px-4 py-1 font-bold border-2 border-black">
          {currentIdx + 1} / {total}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {page.panels.map((panel, idx) => (
          <div key={idx} className="flex flex-col border-4 border-black p-2 bg-gray-50">
            {/* Image Frame */}
            <div className="relative w-full aspect-square overflow-hidden border-4 border-black">
              <img 
                src={panel.imageUrl} 
                alt={`Panel ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Caption Box - Positioned like a classic comic box */}
              <div className="absolute top-0 left-0 bg-yellow-400 border-b-4 border-r-4 border-black p-2 text-sm font-bold shadow-md max-w-[80%]">
                {panel.caption}
              </div>
            </div>

            {/* Speech Bubble Area */}
            <div className="mt-4 flex justify-center flex-grow">
              <div className="speech-bubble w-full min-h-[80px] flex items-center justify-center">
                <p className="text-lg md:text-xl font-bold text-center leading-tight">
                  {panel.dialogue}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between mt-8 gap-4">
        <button
          onClick={onPrev}
          disabled={currentIdx === 0}
          className={`flex-1 py-3 px-4 rounded font-bold text-lg comic-card transition-colors ${
            currentIdx === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-50'
          }`}
        >
          ← আগের পৃষ্ঠা
        </button>
        <button
          onClick={onNext}
          disabled={currentIdx === total - 1}
          className={`flex-1 py-3 px-4 rounded font-bold text-lg comic-card transition-colors ${
            currentIdx === total - 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-500'
          }`}
        >
          পরের পৃষ্ঠা →
        </button>
      </div>
    </div>
  );
};

export default ComicBook;
