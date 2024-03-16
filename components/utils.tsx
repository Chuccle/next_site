import { useRef } from 'react';

const safeDocument = typeof document !== 'undefined' ? document : {};

/**
 * Usage:
 * const [blockScroll, allowScroll] = useScrollBlock();
 */
export default function useScrollBlock(): [() => void, () => void] {
  const scrollBlocked = useRef<boolean>(false);
  const { body } = safeDocument as Document;
  const html = (safeDocument as Document).documentElement;

  const blockScroll = () => {
    if (scrollBlocked.current) return;

    /**
     * 1. Fixes a bug in iOS and desktop Safari whereby setting
     *    `overflow: hidden` on the html/body does not prevent scrolling.
     * 2. Fixes a bug in desktop Safari where `overflowY` does not prevent
     *    scroll if an `overflow-x` style is also applied to the body.
     */
    html.style.position = 'relative'; /* [1] */
    html.style.overflow = 'hidden'; /* [2] */
    

    body.style.position = 'relative'; /* [1] */
    body.style.overflow = 'hidden'; /* [2] */


    scrollBlocked.current = true;
  };

  const allowScroll = () => {
    if (!scrollBlocked.current) return;

  
    html.style.position = '';
    html.style.overflow = '';

    body.style.position = '';
    body.style.overflow = '';
    body.style.paddingRight = '';

    scrollBlocked.current = false;
  };

  return [blockScroll, allowScroll];
}