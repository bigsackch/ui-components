// @flow
import * as React from 'react';

type ColProps = {
  children?: React.Node,
  flex?: number | string,
  style?: Object,
}

export function Col({ children, flex, style }: ColProps) {
  return (
    <div style={style}>
      {children}
      { /* language=CSS */ }
      <style jsx>
        {`
        div {
          flex: ${flex || ''};
          overflow: hidden;
        }
      `}
      </style>
    </div>
  );
}
Col.defaultProps = {
  children: null,
  flex: 1,
  style: {},
};

export function ColRight({ children }: { children: React.Node }) {
  return (
    <div>
      {children}
      { /* language=CSS */ }
      <style jsx>
        {`
        div {
          margin-left: auto;
        }
      `}
      </style>
    </div>
  );
}

type ColWidthsProps = {
  children?: React.Node,
  type?: 'xs' | 's' | 'm' | 'l',
  width: number,
}

export function ColWidths({ children, type, width }: ColWidthsProps) {
  return (
    <div className={type}>
      {children}
      { /* language=CSS */ }
      <style jsx>
        {`
        .xs {
          width: ${width}%;
        }
        @media only screen and (min-width: 480px) {
          .s {
            width: ${width}%;
          }
        }
        @media only screen and (min-width: 768px) {
          .m {
            width: ${width}%;
          }
        }
        @media only screen and (min-width: 992px) {
          .l {
            width: ${width}%;
          }
        }
      `}
      </style>
    </div>
  );
}
ColWidths.defaultProps = {
  type: 'm',
  children: undefined,
};

type GridProps = {
  children?: React.Node,
  id?: string,
  type?: 'xs' | 's' | 'm' | 'l',
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse',
}

export function Grid({
  children, id, type, wrap,
}: GridProps) {
  return (
    <div className={type} id={id}>
      {children}
      { /* language=CSS */ }
      <style jsx>
        {`
        div {
          flex-wrap: ${wrap || ''};
        }
      `}
      </style>
      { /* language=CSS */ }
      <style jsx>
        {`
        .xs {
          display: flex;
        }
        @media only screen and (min-width: 480px) {
          .s {
            display: flex;
          }
        }
        @media only screen and (min-width: 768px) {
          .m {
            display: flex;
          }
        }
        @media only screen and (min-width: 992px) {
          .l {
            display: flex;
          }
        }
      `}
      </style>
    </div>
  );
}
Grid.defaultProps = {
  children: null,
  id: undefined,
  type: 'm',
  wrap: 'nowrap',
};
