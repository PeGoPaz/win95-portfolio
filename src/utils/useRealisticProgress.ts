import { useEffect, useState, useRef } from "react";

/**
 * Hook to simulate a realistic progress bar that mimics a Windows 95 boot sequence.
 * It moves in chunks, has variable speeds, and pauses at critical points.
 */
export function useRealisticProgress(
  isComplete: boolean,
  targetValue: number = 100,
  pauseAt: number = 94
) {
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const nextTick = () => {
      // Clear any existing timer
      if (timerRef.current) clearTimeout(timerRef.current);

      if (progress >= targetValue) return;

      setProgress((prev) => {
        if (prev >= pauseAt && !isComplete) {
          return prev; // Stay at pause point until manually completed
        }

        if (prev >= targetValue) return prev;

        // Random step size for "chunkier" feel
        const step = Math.floor(Math.random() * 8) + 1;
        
        // Random delay to simulate varying load speeds
        // Occasionally longer delays for "realistic" feel
        const isStalling = Math.random() > 0.8;
        const delay = isStalling 
          ? Math.floor(Math.random() * 600) + 300 
          : Math.floor(Math.random() * 150) + 50;

        const next = Math.min(prev + step, isComplete ? targetValue : pauseAt);
        
        timerRef.current = window.setTimeout(nextTick, delay);
        return next;
      });
    };

    // Start or resume the ticking process
    if (progress < targetValue) {
      timerRef.current = window.setTimeout(nextTick, 100);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [progress, isComplete, targetValue, pauseAt]);

  // Jump to 100% when isComplete becomes true if we were stalled
  useEffect(() => {
    if (isComplete && progress < targetValue) {
      // Smoothly finish the last part
      const finishTimer = setInterval(() => {
        setProgress(prev => {
          if (prev >= targetValue) {
            clearInterval(finishTimer);
            return targetValue;
          }
          return Math.min(prev + 5, targetValue);
        });
      }, 50);
      return () => clearInterval(finishTimer);
    }
  }, [isComplete, targetValue, progress]);

  return progress;
}
