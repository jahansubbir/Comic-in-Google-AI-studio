
export interface ComicPanel {
  prompt: string;
  dialogue: string;
  imageUrl?: string;
  caption: string;
}

export interface ComicPage {
  id: number;
  title: string;
  panels: ComicPanel[];
}

export interface StoryState {
  currentPage: number;
  pages: ComicPage[];
  isGenerating: boolean;
  error?: string;
}
