import * as React from 'react';

import { Button } from '../src/Buttons';
import { Col, Grid } from '../src/Grid';
import { DatePickerWithData } from '../src/DatePickerWithData';
import { DateSelectButton } from '../src/DateSelectButton';
import { Header, HeaderButtonMenu, HeaderLink, ModalMenuLink } from '../src/Header';
import { LocaleSelectorWithState } from '../src/LocaleSelector';
import { MainContent } from '../src/MainContent';
import { SPACING } from '../src/constants';
import { Select, TextInput, Label } from '../src/FormComponents';

const XL = 60;

function FormsDemo() {
  return(
      <div>
        <h1>Inputs</h1>
        <Grid>
          <Col>
            <Select onChange={(v) => {console.log("Selected: ", v)}}
                    label="3/4 width of wrapper element"
                    wrapperStyle={{width: "75%"}}>
              <option value="1">One</option>
              <option value="2">Two</option>
            </Select>
          </Col>
          <Col>
            <TextInput onChange={(v) => {console.log("Printed: ", v)}}
                       label="Just input..." />
          </Col>
        </Grid>
        <Label label="Label with custom wrapper props" wrapperClass="mrgl" wrapperStyle={{width: "20%"}}/>
        <TextInput onChange={(v) => {console.log("Printed: ", v)}}
                   errorMessage="Some Error" hasError />
        <Grid>
          <Col>
            <Label label="Simple label" description="With some desc" />
          </Col>
          <Col>
            <Label label="With otherProps"
                   style={{color: "green"}}
                   wrapperStyle={{color: "blue"}}
                   className="mrgl"
                   description="And with wrapperStyle"/>
          </Col>
        </Grid>
      </div>
  );
}

function ButtonsDemo() {
  const { L, S } = SPACING;

  return (
    <div style={{ marginTop: XL }}>
      <h1>Buttons</h1>
      <div style={{ margin: `0 ${S} ${L}`}}>
        <Grid type="m">
          <Col>
            <div style={{ margin: S }}>
              <Button
                btnStyle="primary"
                btnSize="m"
                onClick={() => { console.log("Click!") }}
              >Primary</Button>
            </div>
          </Col>
          <Col>
            <div style={{ margin: S }}>
              <Button
                btnStyle="emphasis"
                btnSize="m"
                onClick={() => { console.log("Click!") }}
              >Emphasis</Button>
            </div>
          </Col>
          <Col>
            <div style={{ margin: S }}>
              <Button
                btnStyle="border"
                btnSize="m"
                onClick={() => { console.log("Click!") }}
              >Bordered</Button>
            </div>
          </Col>
        </Grid>
        <Grid type="m">
          <Col>
            <div style={{ margin: S }}>
              <Button
                btnStyle="primary"
                btnSize="l"
                onClick={() => { console.log("Click!") }}
              >Large</Button>
            </div>
          </Col>
          <Col>
            <div style={{ margin: S }}>
              <Button
                disabled
                btnStyle="primary"
                btnSize="l"
                onClick={() => { console.log("Click!") }}
              >Disabled</Button>
            </div>
          </Col>
          <Col>
            <Button
              btnStyle="link"
              btnSize="m"
              style={{ margin: S }}
              onClick={() => { console.log("Click!") }}
            >Link</Button>
          </Col>
        </Grid>
        <Grid>
          <Col>
            <Button
               btnStyle="primary"
               btnSize="m"
               className="mrgl"
               style={{margin: S}}
               onClick={() => { console.log("Click!") }}>With otherProps</Button>
          </Col>
          <Col>
            <Button
               disabled
               btnStyle="primary"
               btnSize="l"
               className="mrgl"
               onClick={() => { console.log("Click!") }}
            >Disabled with custom class</Button>
          </Col>
        </Grid>
      </div>
    </div>
  );
}

function HeaderDemo() {
  return (
    <Header>
      <HeaderButtonMenu buttonChild="Menu" topLock={100}>
        <ModalMenuLink href="/">Link 1</ModalMenuLink>
        <ModalMenuLink href="/">Link 2</ModalMenuLink>
        <ModalMenuLink href="/">Link 3</ModalMenuLink>
      </HeaderButtonMenu>
      <HeaderLink href="/">Link 4</HeaderLink>
      <HeaderLink href="/">Link 5</HeaderLink>
    </Header>
  );
}

function GridDemo() {
  return (
    <div style={{ marginTop: XL }}>
      <h1>Grid</h1>
      <div className="mod">
        <div>Type: s</div>
        <Grid type="s">
          <Col flex={1} style={{ backgroundColor: 'green' }}>
            <p>Col 1/4</p>
          </Col>
          <Col flex={2} style={{ backgroundColor: 'red' }}>
            <p>Col 2/4</p>
          </Col>
          <Col flex={1} style={{ backgroundColor: 'blue' }}>
            <p>Col 1/4</p>
          </Col>
        </Grid>
      </div>
      <div className="mod">
        <div>Type: m</div>
        <Grid type="m">
          <Col flex={1} style={{ backgroundColor: 'green' }}>
            <p>Col 1/4</p>
          </Col>
          <Col flex={2} style={{ backgroundColor: 'red' }}>
            <p>Col 2/4</p>
          </Col>
          <Col flex={1} style={{ backgroundColor: 'blue' }}>
            <p>Col 1/4</p>
          </Col>
        </Grid>
      </div>
    </div>
  );
}

function LocaleSelectorDemo() {
  return (
    <div style={{ marginTop: XL }}>
      <h1>LocaleSelector</h1>
      <div style={{ position: 'relative', margin: SPACING.M, textAlign: 'right', width: 200 }}>
        <LocaleSelectorWithState locale='nb' onSelect={locale => console.log(locale)} />
      </div>
    </div>
  );
}

class DatePickerDemo extends React.Component {
  state = {
    showDatePicker: false,
    selectedDate: null,
  };

  toggleShowDatePicker = () => {
    this.setState(prevState => ({ showDatePicker: !prevState.showDatePicker }));
  };

  render() {
    const { selectedDate, showDatePicker } = this.state;

    return (
      <div style={{ marginTop: XL, display: "flex" }}>
        <div>
          <h1>DatePicker</h1>
          <DateSelectButton date={selectedDate}
                            locale='en'
                            wrapperStyle={{ width: 200, margin: SPACING.M }}
                            onClick={this.toggleShowDatePicker}/>
          {showDatePicker ? (
            <DatePickerWithData
              onClose={this.toggleShowDatePicker}
              onDateClick={date => {
                console.log("Selected Date: ", date);
                this.setState({ selectedDate: date, showDatePicker: false });
              }}
            />
            ) : null}
        </div>
        <div>
          <h1>Just DateSelect button</h1>
          <DateSelectButton date={selectedDate}
                            locale='en'
                            placeholder="With placeholder"
                            wrapperStyle={{ width: 200, margin: SPACING.M }}
                            onClick={() => { console.log("DateSelect button clicked") }}/>
        </div>
      </div>
  )
  }

}

export default () => (
  <div>
    <HeaderDemo />
    <MainContent>
      <FormsDemo />
      <ButtonsDemo />
      <DatePickerDemo />
      <GridDemo />
      <LocaleSelectorDemo />
    </MainContent>
    { /* language=CSS */ }
    <style jsx global>
      {`
        .mrgl {background-color: #e0b4b4 !important}
        @font-face {
          font-display: swap;
          font-family: 'Brandon Grotesque';
          font-style: normal;
          font-weight: 300;
          src: local('Brandon Grotesque Light'), url('/static/fonts/Brandon_light.woff') format('woff');
        }
        @font-face {
          font-display: swap;
          font-family: 'Brandon Grotesque';
          font-style: italic;
          font-weight: 300;
          src: local('Brandon Grotesque Light Italic'), url('/static/fonts/Brandon_light_it.woff') format('woff');
        }
        @font-face {
          font-display: swap;
          font-family: 'Brandon Grotesque';
          font-style: normal;
          font-weight: 400;
          src: local('Brandon Grotesque Regular'), url('/static/fonts/Brandon_reg.woff') format('woff');
        }
        @font-face {
          font-display: swap;
          font-family: 'Brandon Grotesque';
          font-style: normal;
          font-weight: 700;
          src: local('Brandon Grotesque Bold'), url('/static/fonts/Brandon_bld.woff') format('woff');
        }
        html {
          box-sizing: border-box;
          height: 100%;
          letter-spacing: 0.02rem;
          line-height: 1.3;
          font-size: 62.5%;
          font-weight: 300;
        }
        body {
          background-color: #fff;
          color: rgb(75, 75, 75);
          font-family: "Brandon Grotesque", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
          font-size: 1.9rem;
          min-height: 100%;
        }
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0
        }
        button,
        input,
        optgroup,
        select,
        textarea {
          color: rgb(72,72,72);
          font-family: "Brandon Grotesque", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 300;
          font-size: 1.9rem;
          letter-spacing: 0.02rem;
          line-height: 1.15;
        }
        img {
          max-width: 100%;
        }
        .mod, h1, h2, h3, h4, h5, h6, p, ul, ol, hr, pre, center, dl {
          margin: 20px;
        }
        h1 {
          font-size: 3.0rem;
          font-weight: 700;
          letter-spacing: -0.05rem;
          line-height: 1.2;
          -webkit-font-smoothing: antialiased;
        }
        @media only screen and (min-width: 768px) {
          h1 {
            font-size: 3.8rem;
          }
        }
        h2,
        h3 {
          font-size: 2.2rem;
          font-weight: 400;
          letter-spacing: 0.02rem;
          line-height: 1.2;
        }
        ul,
        ol {
          list-style-type: none;
          padding: 0;
        }
        a,
        a:link,
        a:visited,
        .link {
          color: #019288;
          cursor: pointer;
          font-weight: 400;
          text-decoration: none;
          -webkit-font-smoothing: antialiased;
        }
        a:hover,
        a:link:hover,
        .link:hover {
          text-decoration: underline;
        }
        a.no-decoration,
        a.no-decoration:hover,
        a.no-decoration:focus,
        a.no-decoration:visited {
          /* text-decoration: none; */
          color: rgb(75, 75, 75);
        }
      `}
    </style>
  </div>
)
