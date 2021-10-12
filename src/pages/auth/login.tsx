import {
  Button,
  FormControl,
  FormLabel,
  Input,
  createStandaloneToast
} from "@chakra-ui/react";
import * as React from "react";
import AuthService from "../../services/auth";
import { AppContext } from "../../context/app";
import { RouteComponentProps, withRouter } from "react-router-dom";

export interface ILoginProps extends RouteComponentProps {
  
}

export interface ILoginState {
  username: string,
  password: string,
}

class Login extends React.Component<ILoginProps, ILoginState> {
  static contextType = AppContext;
  context!: React.ContextType<typeof AppContext>;

  constructor(props: ILoginProps) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }

  componentDidMount() {
    if (this.context.states.token) {
      this.props.history.push('/');
    }
  }

  async loginHandler() {
    const loginRes = await AuthService.login(this.state.username, this.state.password);
    if (loginRes.success) {
      this.context.actions.setUser(loginRes.data.user);
      this.context.actions.setToken(loginRes.data.token);
      localStorage.setItem('ad_user', JSON.stringify(loginRes.data.user));
      localStorage.setItem('ad_token', loginRes.data.token);
      this.props.history.push('/users')
    } else {
      const toast = createStandaloneToast();

      toast({
        description: loginRes.message,
        status: 'error',
        position: 'top'
      })
    }

  }

  public render() {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="bg-white">
          <div className="shadow p-3 w-450">
            <div className="mb-4">
              <FormControl id="username" className="mb-2">
                <FormLabel>Tên đăng nhập</FormLabel>
                <Input id="username" type="text" onChange={(event) => this.setState({ username: event.target.value })} />
              </FormControl>
              <FormControl id="username">
                <FormLabel>Mật khẩu</FormLabel>
                <Input type="password" onChange={(event) => this.setState({ password: event.target.value })} onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    this.loginHandler();
                  }
                }}  />
              </FormControl>
            </div>

            <div className="flex justify-end">
              <Button colorScheme="blue" disabled={!this.state.username || !this.state.password} onClick={() => this.loginHandler()}>Đăng nhập</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
