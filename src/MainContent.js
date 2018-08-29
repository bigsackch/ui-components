// @flow
import * as React from 'react';

export function MainContent({ children }: { children: React.Node }) {
  return (
    <div>
      {children}
      {/* language=CSS */}
      <style jsx>
        {`
          div {
            max-width: 1200px;
            margin: 0 auto;
          }
        `}
      </style>
    </div>
  );
}
