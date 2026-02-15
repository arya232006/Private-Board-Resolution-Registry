import { useEffect, useState } from "react";

interface CounterProps {
  value: number | bigint;
  duration?: number;
  className?: string;
}

export const Counter = ({ value, duration = 1000, className }: CounterProps) => {
  const [count, setCount] = useState<number>(0);
  const target = Number(value);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startCount = count;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const currentCount = Math.floor(progress * (target - startCount) + startCount);
      setCount(currentCount);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [target, duration]);

  return <span className={className}>{count}</span>;
};
