export const TOTAL_FRAMES = 280;

export const frameUrl = (i: number): string => {
  const n = String(i).padStart(3, "0");
  return `/frames/ezgif-frame-${n}.webp`;
};

export const frameUrls: string[] = Array.from({ length: TOTAL_FRAMES }, (_, i) => frameUrl(i + 1));
