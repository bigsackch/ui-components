// @flow
/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import isTouchDevice from 'is-touch-device';

type Props = {
  bgColor?: string,
  children?: React.Node,
  onClick: () => void,
  zIndex?: number,
}

export class Backdrop extends React.Component<Props> {
  static defaultProps = {
    bgColor: 'transparent',
    children: undefined,
    zIndex: 99,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event: SyntheticKeyboardEvent<>) => {
    const { onClick } = this.props;

    if (event.key === 'Escape') {
      onClick();
    }
  };

  handleOnClick = (event: SyntheticEvent<HTMLDivElement>) => {
    const { onClick } = this.props;

    event.stopPropagation();
    onClick();
  };

  render() {
    const { children, zIndex, bgColor } = this.props;

    return (
      <div
        onClick={this.handleOnClick}
        style={{
          zIndex,
          backgroundColor: bgColor,
        }}
      >
        {children}
        { /* language=CSS */ }
        <style jsx>
          {`
            div {
              position: fixed;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              display: flex;
              justify-content: center;
            }
          `}
        </style>
        { /* language=CSS */ }
        <style jsx>
          {`
            div {
              overflow-y: ${isTouchDevice() ? 'scroll' : 'auto'};
              -webkit-overflow-scrolling: ${isTouchDevice() ? 'touch' : 'auto'};
            }
          `}
        </style>
      </div>
    );
  }
}
