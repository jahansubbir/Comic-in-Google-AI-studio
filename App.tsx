
import React, { useState } from 'react';
import { GeminiService } from './geminiService';
import { STORY_DATA } from './constants';
import { StoryState } from './types';
import ComicBook from './components/ComicBook';

const App: React.FC = () => {
  const [state, setState] = useState<StoryState>({
    currentPage: 0,
    pages: STORY_DATA,
    isGenerating: false
  });

  const handleGenerateComic = async () => {
    setState(prev => ({ ...prev, isGenerating: true, error: undefined }));
    const service = new GeminiService();
    
    try {
      const updatedPages = [...state.pages];
      
      // Generate images for all pages
      for (let i = 0; i < updatedPages.length; i++) {
        const page = updatedPages[i];
        for (let j = 0; j < page.panels.length; j++) {
          const panel = page.panels[j];
          if (!panel.imageUrl) {
            const url = await service.generatePanelImage(panel.prompt);
            panel.imageUrl = url;
            // Update state incrementally for better UX
            setState(prev => ({
              ...prev,
              pages: [...updatedPages]
            }));
          }
        }
      }
    } catch (err: any) {
      setState(prev => ({ 
        ...prev, 
        error: "ছবি তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করো! (Failed to generate images. Please try again.)" 
      }));
    } finally {
      setState(prev => ({ ...prev, isGenerating: false }));
    }
  };

  const goToNext = () => {
    setState(prev => ({
      ...prev,
      currentPage: Math.min(prev.currentPage + 1, prev.pages.length - 1)
    }));
  };

  const goToPrev = () => {
    setState(prev => ({
      ...prev,
      currentPage: Math.max(prev.currentPage - 1, 0)
    }));
  };

  const isComicReady = state.pages.every(p => p.panels.every(pan => !!pan.imageUrl));

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-5xl md:text-7xl font-bold comic-font text-yellow-500 mb-2 tracking-widest uppercase [text-shadow:4px_4px_0px_#000]">
          Super Alu-Man
        </h1>
        <p className="text-xl md:text-2xl font-bold text-gray-800 bg-white inline-block px-4 py-1 comic-card">
          গুড্ডুর মহাবীরত্ব (The Adventures of Guddu)
        </p>
      </header>

      {!isComicReady && !state.isGenerating && (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl comic-card text-center">
          <img 
            src="https://picsum.photos/seed/potatobig/400/400" 
            alt="Superhero Potato" 
            className="w-48 h-48 mb-6 rounded-full border-4 border-black"
          />
          <h2 className="text-3xl font-bold mb-4">স্বাগতম খুদে বন্ধুরা!</h2>
          <p className="text-lg text-gray-700 mb-6">
            গুড্ডু আলুর জাদুকরী কমিক বই তৈরি করতে নিচের বাটনে ক্লিক করো।
          </p>
          <button
            onClick={handleGenerateComic}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-full text-2xl comic-card transition-transform active:scale-95"
          >
            কমিক তৈরি করো! ⚡️
          </button>
        </div>
      )}

      {state.isGenerating && (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl comic-card text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500 mb-4"></div>
          <h2 className="text-3xl font-bold mb-2">কমিক তৈরি হচ্ছে...</h2>
          <p className="text-lg text-gray-600">একটু অপেক্ষা করো, গুড্ডু আসছে!</p>
          <div className="mt-8 grid grid-cols-4 gap-2 w-full max-w-xs">
            {state.pages.map((p, idx) => (
              <div 
                key={idx} 
                className={`h-3 rounded ${p.panels[0].imageUrl ? 'bg-green-500' : 'bg-gray-200'}`}
              />
            ))}
          </div>
        </div>
      )}

      {state.error && (
        <div className="bg-red-100 border-4 border-red-500 p-4 mb-4 font-bold text-center comic-card">
          {state.error}
          <button 
            onClick={handleGenerateComic}
            className="ml-4 underline hover:text-red-700"
          >
            আবার চেষ্টা করো
          </button>
        </div>
      )}

      {isComicReady && (
        <ComicBook 
          page={state.pages[state.currentPage]} 
          total={state.pages.length}
          currentIdx={state.currentPage}
          onNext={goToNext}
          onPrev={goToPrev}
        />
      )}

      <footer className="mt-12 text-center text-gray-500 font-bold">
        © ২০২৪ গুড্ডু প্রোডাকশন | বাচ্চাদের জন্য ভালোবাসায় তৈরি
      </footer>
    </div>
  );
};

export default App;
