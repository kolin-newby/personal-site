import { useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectCard } from "./project-card";
import Button from "../common/button";
import type { Project } from "@/generated/graphql";

type Props = {
  projectList?: Project[];
  touch: boolean;
};

// Narrowest a card gets before a column is dropped, and the gap between
// columns (Tailwind's gap-4), both in rem.
const minCardWidthRem = 26;
const gapRem = 1;

// Desktop list - as many columns as fit the width. When there are more cards
// than columns, the row pages left and right one card at a time.
export const ProjectList = ({ projectList = [], touch }: Props) => {
  const count = projectList.length;

  const viewportRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState<number>(1);
  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => {
      const rem = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      const gap = gapRem * rem;
      setColumns(
        Math.max(
          1,
          Math.floor((el.clientWidth + gap) / (minCardWidthRem * rem + gap))
        )
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Clamped here rather than when columns change, so widening the screen
  // pulls the row back to show a full set of cards.
  const [start, setStart] = useState<number>(0);
  const maxStart = Math.max(0, count - columns);
  const first = Math.min(start, maxStart);

  return (
    <div className="flex w-full min-w-0 flex-col items-center gap-2">
      {/* Clips sideways only, so the cards' shadows still show above and
          below. */}
      <div ref={viewportRef} className="w-full overflow-x-clip py-4">
        <ul
          className={`flex gap-4 transition-transform duration-500 ease-out motion-reduce:transition-none ${
            count <= columns ? "justify-center" : ""
          }`}
          style={
            {
              "--columns": columns,
              // A percentage translate is of the list itself, which is the
              // viewport's width, so one step is a column plus its gap.
              transform: `translateX(calc(-${first} * (100% + ${gapRem}rem) / var(--columns)))`
            } as React.CSSProperties
          }
        >
          {projectList.map((item, index) => {
            const visible = index >= first && index < first + columns;
            return (
              // A fixed height gives the description a space to fit (or
              // overflow) and the card's size container something to query.
              <li
                key={item.id}
                inert={!visible}
                className="flex h-[min(44rem,calc(100dvh-var(--nav-h)-8rem))] w-[calc((100%-(var(--columns)-1)*1rem)/var(--columns))] shrink-0 flex-col overflow-hidden rounded-2xl bg-gray-200 shadow-lg [container:card/size]"
              >
                <ProjectCard
                  project={item}
                  index={index}
                  count={count}
                  touch={touch}
                  className="rounded-2xl"
                />
              </li>
            );
          })}
        </ul>
      </div>
      {count > columns && (
        <div className="flex items-center gap-2">
          <Button
            aria-label="Previous project"
            gradient={false}
            backgroundClassName="bg-linear-to-br from-white/60 via-transparent to-white/40 shadow-sm"
            icon={<ChevronLeft />}
            disabled={first === 0}
            onClick={() => setStart(first - 1)}
            touch={touch}
            className="disabled:pointer-events-none disabled:opacity-30"
          />
          <Button
            aria-label="Next project"
            gradient={false}
            backgroundClassName="bg-linear-to-br from-white/60 via-transparent to-white/40 shadow-sm"
            icon={<ChevronRight />}
            disabled={first === maxStart}
            onClick={() => setStart(first + 1)}
            touch={touch}
            className="disabled:pointer-events-none disabled:opacity-30"
          />
        </div>
      )}
    </div>
  );
};
