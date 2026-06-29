declare module 'react-pageflip' {
  import { ReactNode, RefObject } from 'react';

  interface HTMLFlipBookProps {
    width: number;
    height: number;
    size?: 'fixed' | 'stretch';
    minCoverOpacity?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    startPage?: number;
    usePortrait?: boolean;
    startZIndex?: number;
    autoSize?: boolean;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    clickEventForward?: boolean;
    useMouseEvents?: boolean;
    swipeDistance?: number;
    showPageCorners?: boolean;
    children?: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    ref?: RefObject<HTMLFlipBookHandle | null>;
    onFlip?: (e: { data: number }) => void;
    onChangeOrientation?: (e: { data: 'landscape' | 'portrait' }) => void;
    onChangeState?: (e: { data: string }) => void;
  }

  interface HTMLFlipBookHandle {
    pageFlip: () => {
      flipNext: () => void;
      flipPrev: () => void;
      flip: (index: number) => void;
      getPageCount: () => number;
      getCurrentPageIndex: () => number;
    };
  }

  export default function HTMLFlipBook(props: HTMLFlipBookProps): JSX.Element;
}
