import * as React from 'react';
import checkAuth from '../components/checkAuth';
import Layout from '../layout/default';

export interface IHomeProps {
}

export interface IHomeState {
}

class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
    
  }

  public render() {
    return (
      <Layout>
        
      </Layout>
    );
  }
}

export default checkAuth(Home)
