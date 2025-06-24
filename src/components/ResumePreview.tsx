'use client'

import { useState, useEffect, useRef, type ReactNode, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ResumePreviewProps {
  children: ReactNode
  className?: string
}

const RESUME_WIDTH_PX = 816;

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ children, className }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0);

    useEffect(() => {
      const target = containerRef.current;
      if (!target) return;

      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width } = entry.contentRect;
          if (width > 0) {
            setScale(width / RESUME_WIDTH_PX);
          }
        }
      });

      observer.observe(target);

      return () => {
        observer.disconnect();
      };
    }, []);

    return (
      <div
        ref={containerRef}
        className={cn(
          'aspect-[8.5/11] w-full bg-white rounded-lg shadow-inner overflow-hidden ring-1 ring-black/5',
          className
        )}
      >
          <div
            className="origin-top-left transition-opacity duration-200"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              opacity: scale > 0 ? 1 : 0,
            }}
          >
            <div ref={ref} className="w-[816px] h-[1056px] bg-white">
              {children}
            </div>
          </div>
      </div>
    )
  }
)

ResumePreview.displayName = 'ResumePreview'
