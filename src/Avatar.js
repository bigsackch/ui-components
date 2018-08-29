// @flow
import * as React from 'react';

export function Avatar({
  src, altPart, className, width,
}: { src: string, altPart?: ?string, className?: string, width: number }) {
  return (
    <div>
      <img alt={`${altPart || ''} avatar`} className={className} src={src} />
      { /* language=CSS */ }
      <style jsx>
        {`
        img {
          border-radius: 50%;
          display: block;
          width: ${width}px;
        }
      `}
      </style>
    </div>
  );
}

Avatar.defaultProps = {
  altPart: '',
  className: undefined,
};
