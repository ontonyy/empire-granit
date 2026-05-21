import type { MemorialShapeSvgProps } from './types';

export function ArchedShape(props: MemorialShapeSvgProps) {
  return <path d="M86 330V134C86 80 129 38 182 38s96 42 96 96v196H86Z" {...props} />;
}

