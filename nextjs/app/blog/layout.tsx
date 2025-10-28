import type { ReactNode } from "react";
import ReadingProgress from "@/app/components/ReadingProgress";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ReadingProgress />
      {children}
    </>
  );
}


