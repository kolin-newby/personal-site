import type React from "react";

export type WorkItem = {
  title: string;
  role: string;
  images: string[] | null;
  repo?: string;
  textSection: React.ReactNode;
  skills: string[];
};
