import type { MemorialShapeSvgProps } from './types';

export function HeartShape(props: MemorialShapeSvgProps) {
  return (
    <path
      d="M182 330 78 210C43 170 45 104 86 70c34-28 80-22 96 18 16-40 62-46 96-18 41 34 43 100 8 140L182 330Z"
      {...props}
    />
  );
}

