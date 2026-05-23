"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DragScrollAreaProps {
  children: ReactNode;
  className?: string;
}

export function DragScrollArea({ children, className }: DragScrollAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
    moved: false,
  });
  const [isDragging, setIsDragging] = useState(false);

  const stopDrag = useCallback(() => {
    dragRef.current.active = false;
    setIsDragging(false);
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el || e.button !== 0) return;

    dragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      scrollLeft: el.scrollLeft,
      scrollTop: el.scrollTop,
      moved: false,
    };
    setIsDragging(true);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const el = containerRef.current;
      const drag = dragRef.current;
      if (!drag.active || !el) return;

      const dx = e.clientX - drag.startX;
      const dy = e.clientY - drag.startY;

      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        drag.moved = true;
      }

      el.scrollLeft = drag.scrollLeft - dx;
      el.scrollTop = drag.scrollTop - dy;
    };

    const onMouseUp = () => stopDrag();

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [stopDrag]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      dragRef.current = {
        active: true,
        startX: touch.clientX,
        startY: touch.clientY,
        scrollLeft: el.scrollLeft,
        scrollTop: el.scrollTop,
        moved: false,
      };
      setIsDragging(true);
    };

    const onTouchMove = (e: TouchEvent) => {
      const drag = dragRef.current;
      if (!drag.active || e.touches.length !== 1) return;

      const touch = e.touches[0];
      const dx = touch.clientX - drag.startX;
      const dy = touch.clientY - drag.startY;

      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        drag.moved = true;
      }

      el.scrollLeft = drag.scrollLeft - dx;
      el.scrollTop = drag.scrollTop - dy;
    };

    const onTouchEnd = () => stopDrag();

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("touchcancel", onTouchEnd);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [stopDrag]);

  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (dragRef.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragRef.current.moved = false;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseDown={onMouseDown}
      onClickCapture={onClickCapture}
      className={cn(
        "min-w-0 w-full overflow-auto scrollbar-none select-none",
        isDragging ? "cursor-grabbing" : "cursor-grab",
        className
      )}
    >
      {children}
    </div>
  );
}
