// @flow
import * as React from 'react';
import Responsive from 'react-responsive';

import { Backdrop } from './Backdrop';
import { BodyScrollDisabled, ModalCloseButton } from './ModalCloseButton';

import { COLORS, SPACING } from './constants';

type ModalProps = {
  children: React.Node,
  onCloseClick: () => void,
  zIndex?: number,
  enableBodyScroll: boolean,
}

export function Modal({ children, onCloseClick, zIndex, enableBodyScroll }: ModalProps) {
  return (
    <Backdrop onClick={onCloseClick} bgColor="rgba(255, 255, 255, 0.8)" zIndex={zIndex}>
      {!enableBodyScroll && <BodyScrollDisabled />}
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
  enableBodyScroll: false,
};


export function ModalMenu({ children, onClose, topLock, bottomLock }: {
  children: React.Node, onClose: () => void, topLock?: number, bottomLock?: number,
}) {
  return (
    <div>
      <Responsive maxWidth={767}>
        <BodyScrollDisabled />
      </Responsive>
      <Backdrop onClick={onClose} />
      <div className="modal" onClick={event => event.stopPropagation()} role="presentation">
        <div className="children">
          {children}
        </div>
      </div>
      { /* language=CSS */ }
      <style jsx>{`
        .children {
          height: 100%;
          overflow-x: hidden;
          overflow-y: auto;
        }
        .modal {
          background-color: #fff;
          bottom: ${bottomLock ? `${bottomLock}px` : 0};
          left: 0;
          position: fixed;
          right: 0;
          top: ${topLock ? `${topLock}px` : 0};
          z-index: 1010;
        }
        @media only screen and (min-width: 768px) {
          .modal {
            border-radius: 3px;
            border: 1px solid ${COLORS.BORDER};
            bottom: ${bottomLock ? SPACING.M : 'auto'};
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
            left: auto;
            min-width: 280px;
            position: absolute;
            top: ${topLock ? SPACING.M : 'auto'};
          }
        }
      `}</style>
    </div>
  );
}
