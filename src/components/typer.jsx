import React, { useState, useEffect } from "react";

const Typer = ({
  words = [
    "Developer",
    "Climber",
    "UX Designer",
    "Backpacker",
    "Outdoors Lover",
    "Software Engineer",
    "Photographer",
  ],
  typingSpeed = 130,
  deletingSpeed = 70,
  pauseTime = 1400,
}) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setText((prev) => currentWord.slice(0, prev.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && text === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [
    text,
    isDeleting,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseTime,
  ]);

  return (
    <span className="word-typer pl-2 text-center">
      {text}
      <span className="cursor">|</span>
    </span>
  );
};

export default Typer;
