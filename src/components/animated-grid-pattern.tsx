"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";

interface AnimatedGridPatternProps extends Omit<
  ComponentPropsWithoutRef<"svg">,
  "opacity"
> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: number;
  numSquares?: number;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
  opacity?: number;
}

type Square = {
  id: number;
  pos: [number, number];
  iteration: number;
  initialDelay: number;
};

const MAX_INITIAL_DELAY = 2;

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  opacity = 1,
  ...props
}: AnimatedGridPatternProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const patternId = useId();
  const containerRef = useRef<SVGSVGElement | null>(null);
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const [squares, setSquares] = useState<Array<Square>>([]);

  const getPos = useCallback((): [number, number] => {
    return [
      Math.floor((Math.random() * dimensionsRef.current.width) / width),
      Math.floor((Math.random() * dimensionsRef.current.height) / height),
    ];
  }, [height, width]);

  const updateSquarePosition = useCallback(
    (squareId: number) => {
      setSquares((currentSquares) =>
        currentSquares.map((sq) =>
          sq.id === squareId
            ? { ...sq, pos: getPos(), iteration: sq.iteration + 1 }
            : sq,
        ),
      );
    },
    [getPos],
  );

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const nextWidth = entry.contentRect.width;
        const nextHeight = entry.contentRect.height;

        if (
          dimensionsRef.current.width === nextWidth &&
          dimensionsRef.current.height === nextHeight
        ) {
          continue;
        }

        dimensionsRef.current = { width: nextWidth, height: nextHeight };

        setSquares(
          Array.from({ length: numSquares }, (_, i) => ({
            id: i,
            pos: [
              Math.floor((Math.random() * nextWidth) / width),
              Math.floor((Math.random() * nextHeight) / height),
            ] as [number, number],
            initialDelay: Math.random() * MAX_INITIAL_DELAY,
            iteration: 0,
          })),
        );
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [width, height, numSquares]);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        className,
      )}
      style={{ opacity }}
      {...props}
    >
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(
          ({
            pos: [squareX, squareY],
            id: squareId,
            iteration,
            initialDelay,
          }) =>
            prefersReducedMotion ? (
              <rect
                key={`${squareId}-${iteration}`}
                width={width - 1}
                height={height - 1}
                x={squareX * width + 1}
                y={squareY * height + 1}
                fill="currentColor"
                strokeWidth="0"
                opacity={maxOpacity}
              />
            ) : (
              <motion.rect
                initial={{ opacity: 0 }}
                animate={{ opacity: maxOpacity }}
                transition={{
                  duration,
                  repeat: 1,
                  delay: initialDelay,
                  repeatType: "reverse",
                  repeatDelay,
                }}
                onAnimationComplete={() => updateSquarePosition(squareId)}
                key={`${squareId}-${iteration}`}
                width={width - 1}
                height={height - 1}
                x={squareX * width + 1}
                y={squareY * height + 1}
                fill="currentColor"
                strokeWidth="0"
              />
            ),
        )}
      </svg>
    </svg>
  );
}
