import React, { useState, useEffect, useRef } from "react";
import { usePageVisible } from "../common/use-page-visible";
import { useInViewport } from "../common/use-in-viewport";

const Typer = ({
  words = [
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
  pauseWhenOffScreen = true,
}) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  const containerRef = useRef(null);
  const timeoutRef = useRef(null);

  const inView = useInViewport(containerRef, { threshold: 0 });
  const pageVisible = usePageVisible();
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const shouldRun =
    !prefersReducedMotion && (!pauseWhenOffScreen || (inView && pageVisible));

  useEffect(() => {
    // Always clear the previous timer before scheduling a new one
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!shouldRun) return;

    const currentWord = words[wordIndex] ?? "";

    // Default plan: schedule a type/delete step
    let delay = isDeleting ? deletingSpeed : typingSpeed;
    let nextTimer = setTimeout(() => {
      setText((prev) =>
        isDeleting ? prev.slice(0, -1) : currentWord.slice(0, prev.length + 1)
      );
    }, delay);

    // Transition overrides (use current `text`, like your original logic)
    if (!isDeleting && text === currentWord) {
      // reached end of word → pause, then flip to deleting
      clearTimeout(nextTimer);
      nextTimer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === "") {
      // finished deleting → advance word immediately (no timer needed here)
      clearTimeout(nextTimer);
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return; // nothing else to schedule this tick
    }

    timeoutRef.current = nextTimer;

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [
    text,
    isDeleting,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseTime,
    shouldRun, // re-evaluate when visibility changes
  ]);

  // Be polite to users who prefer reduced motion
  useEffect(() => {
    if (prefersReducedMotion) {
      setText(words[0] ?? "");
      setIsDeleting(false);
      setWordIndex(0);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);

  return (
    <span ref={containerRef} className="word-typer pl-2 text-center">
      {text}
      <span className="cursor">|</span>
    </span>
  );
};

export default Typer;
