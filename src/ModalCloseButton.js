// @flow
import * as React from 'react';

import iconCloseBlack from '../static/images/icons/Close-Line-Black-120-Custom.svg';
import iconCloseWhite from '../static/images/icons/Close-Line-White-120.svg';

type Props = {
  color?: 'black' | 'white',
  onClick: () => void,
  height: number,
}

function disableBodyScroll(): number {
  const { body, documentElement } = document;
  const scrollTop = Math.max(
    window.pageYOffset,
    documentElement ? documentElement.scrollTop : 0,
    body ? body.scrollTop : 0,
  );

  if (body) {
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.left = '0';
    body.style.right = '0';
    body.style.top = `${-scrollTop}px`;
  }
  return scrollTop;
}

function enableBodyScroll(scrollTop: number) {
  const { body, documentElement } = document;
  if (body) {
    body.style.overflow = '';
    body.style.position = '';
    body.style.left = '';
    body.style.right = '';
    body.style.top = '';
    body.scrollTop = scrollTop;
  }
  if (documentElement) {
    documentElement.scrollTop = scrollTop;
  }
}

export class ModalCloseButton extends React.Component<Props, { bodyScrollTop: number }> {
  static defaultProps = {
    color: 'white',
  };

  state = {
    bodyScrollTop: 0,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);

    const bodyScrollTop = disableBodyScroll();
    this.setState({ bodyScrollTop });
  }

  componentWillUnmount() {
    const { bodyScrollTop } = this.state;

    window.removeEventListener('keydown', this.handleKeyDown);
    enableBodyScroll(bodyScrollTop);
  }

  handleKeyDown = (event: SyntheticKeyboardEvent<>) => {
    const { onClick } = this.props;

    if (event.key === 'Escape') {
      onClick();
    }
  };

  render() {
    const { onClick, height, color } = this.props;

    return (
      <button onClick={onClick} type="button">
        <img
          alt=""
          height={height}
          src={color === 'black' ? iconCloseBlack : iconCloseWhite}
        />
        { /* language=CSS */ }
        <style jsx>
          {`
          button {
            border: 0;
            background-color: transparent;
            outline: 0;
            padding: 6px 10px 6px 6px;
            cursor: pointer;
          }
        `}
        </style>
      </button>
    );
  }
}
