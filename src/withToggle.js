import * as React from 'react';

export class withToggle extends React.Component<> {
  state = {
    toggleStatus: this.props.initialToggleStatus,
  };

  toggle() {
    this.setState(prevState => ({ toggleStatus: !prevState.toggleStatus }));
  }

  render() {
    const { children } = this.props;

    return (
      children({
        toggle: this.toggle,
        toggleStatus: this.state.toggleStatus,
      })
    )
  }
}
