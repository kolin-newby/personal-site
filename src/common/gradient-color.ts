import { useMemo } from "react";

// Full class strings (not built dynamically) so Tailwind can detect them.
export const gradientColors = [
  "bg-linear-to-br from-[#FFF176]/60 to-[#A5D6A7]/60",
  "bg-linear-to-br from-[#81D4FA]/60 to-[#FFAB91]/60",
  "bg-linear-to-br from-[#F8BBD0]/60 to-[#81D4FA]/60",
  "bg-linear-to-br from-[#CE93D8]/60 to-[#80DEEA]/60",
  "bg-linear-to-br from-[#FFE082]/60 to-[#FFAB91]/60",
  "bg-linear-to-br from-[#A5D6A7]/60 to-[#80DEEA]/60",
  "bg-linear-to-br from-[#EF9A9A]/60 to-[#F8BBD0]/60",
  "bg-linear-to-br from-[#9FA8DA]/60 to-[#CE93D8]/60",
  "bg-linear-to-br from-[#FFCC80]/60 to-[#FFF176]/60",
  "bg-linear-to-br from-[#80CBC4]/60 to-[#A5D6A7]/60",
  "bg-linear-to-br from-[#B39DDB]/60 to-[#F8BBD0]/60",
  "bg-linear-to-br from-[#C5E1A5]/60 to-[#FFE082]/60",
] as const;

let lastRandomIndex = -1;

// Picks a random index that differs from the previous random pick. Draws from
// the palette minus one slot, then shifts past the last index to skip it.
const randomIndex = () => {
  const n = gradientColors.length;
  let i = Math.floor(Math.random() * (lastRandomIndex < 0 ? n : n - 1));
  if (lastRandomIndex >= 0 && i >= lastRandomIndex) i++;
  lastRandomIndex = i;
  return i;
};

// Returns the gradient at `index` (wrapping around the palette), or a random
// one when no index is given. Consecutive random picks never repeat.
export const getGradientColor = (index?: number | null) => {
  const i = index != null ? index % gradientColors.length : randomIndex();
  return gradientColors[i] ?? "";
};

// Same as getGradientColor, but stable across re-renders so a random pick
// doesn't change every time the component updates.
export const useGradientColor = (index?: number | null) =>
  useMemo(() => getGradientColor(index), [index]);
