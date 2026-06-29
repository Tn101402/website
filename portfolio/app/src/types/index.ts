export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  thumbnail: string;
}

export interface Education {
  id: string;
  title: string;
  period: string;
  description: string;
}

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
}

export interface Skill {
  name: string;
  color: string;
}

export interface ContactLink {
  icon: string;
  label: string;
  value: string;
  url: string;
}

export type DeviceType = 'desktop' | 'tablet' | 'mobile';
export type Orientation = 'landscape' | 'portrait';

export interface BookState {
  currentPage: number;
  totalPages: number;
  isFlipping: boolean;
  isOpen: boolean;
  soundEnabled: boolean;
  device: DeviceType;
  orientation: Orientation;
}

export interface FlipBookRef {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
    flip: (index: number) => void;
    getPageCount: () => number;
    getCurrentPageIndex: () => number;
  };
}
