import * as React from 'react';
import checkAuth from '../../components/checkAuth';
import Layout from '../../layout/default';

export interface IPlanProps {
}

export interface IPlanState {
}

class Plan extends React.Component<IPlanProps, IPlanState> {
  constructor(props: IPlanProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <Layout>
        Planádadasâs
      </Layout>
    );
  }
}

export default checkAuth(Plan);
