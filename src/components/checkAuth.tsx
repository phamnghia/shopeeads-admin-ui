import * as React from "react";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import { AppContext } from "../context/app";

export interface IComposedCompoentProps extends RouteComponentProps {}

export interface IComposedCompoentState {}

function checkAuth(ChildComponnent: any) {
  class ComposedCompoent extends React.Component<
    IComposedCompoentProps,
    IComposedCompoentState
  > {
    static contextType = AppContext;
    context!: React.ContextType<typeof AppContext>;

    constructor(props: IComposedCompoentProps) {
      super(props);

      this.state = {};
    }

    componentDidUpdate() {
      if (!this.context.states.token) {
        this.props.history.push("/login");
      }
    }

    public render() {
      return this.context.states.token ? (
        <ChildComponnent {...this.props} />
      ) : (
        <Redirect to="/login" />
      );
    }
  }

  return withRouter(ComposedCompoent);
}

export default checkAuth;
