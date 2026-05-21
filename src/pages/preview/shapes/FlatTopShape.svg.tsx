import type { MemorialShapeSvgProps } from './types';

export function FlatTopShape(props: MemorialShapeSvgProps) {
  return <path d="M82 330V62h200v268H82Z" {...props} />;
}

