import type { HTMLAttributes } from 'react';

export interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  as?: 'span' | 'p';
}

export function Eyebrow({ as: Tag = 'span', className, children, ...rest }: EyebrowProps) {
  const Component = Tag as 'span';
  return (
    <Component className={['ui-eyebrow', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </Component>
  );
}
