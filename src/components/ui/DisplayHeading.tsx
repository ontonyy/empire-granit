import type { HTMLAttributes } from 'react';

type Level = 1 | 2 | 3;

export interface DisplayHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: Level;
  as?: `h${Level}`;
}

export function DisplayHeading({
  level = 1,
  as,
  className,
  children,
  ...rest
}: DisplayHeadingProps) {
  const Tag = (as ?? (`h${level}` as `h${Level}`)) as 'h1';
  const sizeClass = `ui-display-${level}`;
  return (
    <Tag className={['ui-display', sizeClass, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </Tag>
  );
}
