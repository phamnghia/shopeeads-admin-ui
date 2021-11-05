import { Heading, Icon } from "@chakra-ui/react";
import * as React from "react";
import { IMenuItem } from "../../interface";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { AppContext } from "../../context/app";
import { Peoples, Calendar, TextImage, ExpiredRound  } from "@rsuite/icons";

export interface ISideBarProps extends RouteComponentProps {}

export interface ISideBarState {
  menus: IMenuItem[];
}

class SideBar extends React.Component<ISideBarProps, ISideBarState> {
  static contextType = AppContext;
  context!: React.ContextType<typeof AppContext>;

  constructor(props: ISideBarProps) {
    super(props);

    this.state = {
      menus: [
        {
          id: "user",
          text: "Quản lý người dùng",
          uri: "/users",
          icon: Peoples,
        },
        {
          id: "plan",
          text: "Danh sách sử dụng gói",
          uri: "/plan",
          icon: TextImage
        },
        {
          id: "log",
          text: "Quản lý logs",
          uri: "/log",
          icon: Calendar
        },
        {
          id: 'error-campaign',
          text: 'Chiến dịch lỗi',
          uri: "/error-campaign",
          icon: ExpiredRound
        }
      ],
    };
  }

  public render() {
    const activeMenu = this.context.states.activeMenu;
    const menuItems = this.state.menus.map((menu: IMenuItem, index: number) => {
      return (
        <div
          className={`flex flex-row py-2 my-1 px-3 text-sm mx-1 cursor-pointer hover:bg-blue-100 rounded ${
            activeMenu === menu.id ? "bg-blue-100 text-blue-700" : ""
          }`}
          key={index}
          onClick={() => this.props.history.push(menu.uri as string)}
        >
          <div className="mr-1">
            <Icon as={menu.icon} />
          </div>
          <div className="flex items-center">{menu.text}</div>
        </div>
      );
    });
    return (
      <div>
        <Heading style={{ fontSize: 26 }} className="px-2 py-3 mb-5 text-center text-blue-600">
          ShopeeAds Admin
        </Heading>
        <div>{menuItems}</div>
      </div>
    );
  }
}

export default withRouter(SideBar);
