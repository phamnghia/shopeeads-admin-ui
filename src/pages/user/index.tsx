import { createStandaloneToast, Input } from "@chakra-ui/react";
import * as React from "react";
import { AppContext } from "../../context/app";
import Layout from "../../layout/default";
import UserService from "../../services/user";
import UserTable from "./components/user-table";

export interface IUserProps {}

export interface IUserState {
  users: any[];
  searchData: string;
  page: number;
  total: number;
  limit: number;
}

class User extends React.Component<IUserProps, IUserState> {
  static contextType = AppContext;
  context!: React.ContextType<typeof AppContext>;
  toast = createStandaloneToast();

  constructor(props: IUserProps) {
    super(props);

    this.state = {
      users: [],
      searchData: "",
      //pag
      page: 1,
      total: 0,
      limit: 0,
    };
  }

  async componentDidUpdate(prevProps: IUserProps, prevState: IUserState) {
    if (
      prevState.searchData !== this.state.searchData &&
      this.state.searchData === ""
    ) {
      await this.loadUsers();
    }
  }

  async loadUsers() {
    const userRes = await UserService.getAllUser();
    if (userRes.success) {
      return this.setState({
        users: userRes.data.users,
        total: userRes.data.total,
      });
    }
  }

  async componentDidMount() {
    this.context.actions.setActiveMenu("user");
    this.context.actions.setContentTitle("Quản lý người dùng");
    await this.loadUsers();
  }

  findUserHandler = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const findUserRes = await UserService.findUser(this.state.searchData);
      if (findUserRes.success) {
        this.setState({
          users: findUserRes.data.users,
          total: findUserRes.data.total,
        });
      }
    }
  };

  pageChange = async (page: number) => {
    let userRes;

    if (!this.state.searchData) {
      userRes = await UserService.getAllUser(page, this.state.limit);
    } else {
      userRes = await UserService.findUser(
        this.state.searchData,
        page,
        this.state.limit
      );
    }

    if (userRes.success) {
      this.setState({
        users: userRes.data.users,
        page: page,
        total: userRes.data.total,
      });
    }
  };

  limitChange = (limit: number) => {
    this.setState({ limit: limit });
  };

  public render() {
    return (
      <Layout>
        <div className="font-semibold mb-4 text-lg">
          {this.context.states.contentTitle}
        </div>
        <Input
          style={{ width: 250 }}
          size="sm"
          className="mb-4"
          placeholder="Tìm kiếm..."
          onChange={(event) =>
            this.setState({ searchData: event.target.value })
          }
          onKeyDown={this.findUserHandler}
        />
        <UserTable
          limit={this.state.limit}
          pageChange={this.pageChange}
          page={this.state.page}
          total={this.state.total}
          data={this.state.users}
        />
      </Layout>
    );
  }
}

export default User;
