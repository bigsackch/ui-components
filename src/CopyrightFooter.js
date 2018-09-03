// @flow
import * as React from 'react';

import { Col, Grid } from './Grid';

import eventumSymbol from '../static/images/eventum-icon_usy2oo.svg';

export function CopyrightFooter({ children, company }: { children?: React.Node, company: string }) {
  return (
    <div>
      <hr />
      <Grid type="xs">
        <Col flex={2}>
          <div className="subtle text-s">
            <p className="aligned">
              <img
                alt=""
                height="22"
                src={eventumSymbol}
              />
              <span className="pls">
                {`\u00A9 ${company}`}
              </span>
            </p>
          </div>
        </Col>
        <Col flex={1} style={{ overflow: 'visible', textAlign: 'right' }}>
          {children}
        </Col>
      </Grid>
    </div>
  );
}
