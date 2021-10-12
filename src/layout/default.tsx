import * as React from 'react';
import Header from './components/header';
import SideBar from './components/sidebar';

export interface ILayoutProps {
}

export interface ILayoutState {
}

export default class Layout extends React.Component<ILayoutProps, ILayoutState> {
  constructor(props: ILayoutProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <div className="flex flex-column">
        <div className="w-250 h-screen border-r border-gray-200" style={{ minWidth: 250 }}>
          <SideBar />
        </div>
        <div className="w-full">
          <div className="h-80 p-3 border-b border-gray-200">
            <Header />
          </div>
          <div className="h-screen p-3">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
