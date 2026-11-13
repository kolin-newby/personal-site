import { useState, useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../common/use-media-query";
import { useShouldAnimate } from "../common/use-should-animate";

type Props = {
  typingTerms?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
};

export const TypingDisplay = ({
  typingTerms = [
    "Developer",
    "Climber",
    "UX Designer",
    "Backpacker",
    "API Logger",
    "Outdoors Lover",
    "Software Engineer",
    "Photographer",
  ],
  typingSpeed = 130,
  deletingSpeed = 70,
  pauseTime = 1400,
}: Props) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  const containerRef = useRef<HTMLSpanElement>(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  // Also false under reduced motion, which pauses the timers below.
  const shouldRun = useShouldAnimate(containerRef);

  // One timer per step: type a letter, pause on a finished word, or delete a
  // letter. The step that deletes the last letter also moves to the next word.
  useEffect(() => {
    if (!shouldRun) return;

    const currentWord = typingTerms[wordIndex] ?? "";
    let timer: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      timer = setTimeout(() => {
        if (text.length <= 1) {
          setText("");
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % typingTerms.length);
        } else {
          setText(text.slice(0, -1));
        }
      }, deletingSpeed);
    } else if (text === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else {
      timer = setTimeout(
        () => setText(currentWord.slice(0, text.length + 1)),
        typingSpeed,
      );
    }

    return () => clearTimeout(timer);
  }, [
    text,
    isDeleting,
    wordIndex,
    typingTerms,
    typingSpeed,
    deletingSpeed,
    pauseTime,
    shouldRun, // re-evaluate when visibility changes
  ]);

  // Be polite to users who prefer reduced motion: show the first term, still.
  const displayText = prefersReducedMotion ? (typingTerms[0] ?? "") : text;

  return (
    <span
      ref={containerRef}
      className="pl-2 text-center"
      aria-hidden="true"
    >
      {displayText}
      <span className="cursor">|</span>
    </span>
  );
};
