// @flow
import * as React from 'react';

import { Backdrop } from './Backdrop';
import { ModalCloseButton } from './ModalCloseButton';

type ModalProps = {
  children: React.Node,
  onCloseClick: () => void,
  zIndex?: number,
}

export function Modal({ children, onCloseClick, zIndex }: ModalProps) {
  return (
    <Backdrop onClick={onCloseClick} bgColor="rgba(255, 255, 255, 0.8)" zIndex={zIndex}>
      <div className="modal" onClick={event => event.stopPropagation()} role="presentation">
        <ModalCloseButton color="black" onClick={onCloseClick} height={40} />
        {children}
      </div>
      { /* language=CSS */ }
      <style jsx>
        {`
        .modal {
          background-color: #fff;
          max-width: 100%;
          min-height: 100%;
          position: absolute;
          width: 850px;
        }
        @media only screen and (min-width: 768px) {
          .modal {
            box-shadow: rgba(0, 0, 0, 0.2) 0 1px 10px 0;
            margin-bottom: 60px;
            margin-top: 60px;
            min-height: auto;
            padding: 15px;
          }
        }
      `}
      </style>
    </Backdrop>
  );
}

Modal.defaultProps = {
  zIndex: 1001,
};
