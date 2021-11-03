import * as React from "react";
import checkAuth from "../../components/checkAuth";
import Layout from "../../layout/default";
import { AppContext } from "../../context/app";
import PlanService from "../../services/plan";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";
import GearIcon from "@rsuite/icons/Gear";
import moment from "moment";
import { RouteComponentProps, withRouter } from "react-router-dom";
import UserService from "../../services/user";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";

export interface IPlanProps extends RouteComponentProps {}

export interface IPlanState {
  plans: any[];
  users: any[];
  sortType: "asc" | "desc";
}

class Plan extends React.Component<IPlanProps, IPlanState> {
  static contextType = AppContext;
  context!: React.ContextType<typeof AppContext>;

  constructor(props: IPlanProps) {
    super(props);

    this.state = {
      plans: [],
      users: [],
      sortType: "asc",
    };
  }

  async componentDidMount() {
    this.context.actions.setContentTitle("Danh sách sử dụng gói");
    this.context.actions.setActiveMenu("plan");

    const res = await UserService.countUserByPlan();

    if (res.success) {
      const userHavePlan = res.data.filter((user: any) => user.name).sort((prevUser: any, currUser: any) => {
        return prevUser.plan[0].price - currUser.plan[0].price
      });
      this.setState({ plans: userHavePlan});
      this.getUserByPlan(userHavePlan[0]._id.plan);
    }
  }

  async getUserByPlan(planId: string) {
    const res = await UserService.getUserByPlan(planId);

    if (res.success) {
      this.setState({ users: res.data });
    }
  }

  sortUser() {
    if (this.state.sortType === "asc") {
      const users = this.state.users.sort((prevUser: any, currUser) => {
        return (
          Math.round(
            (moment(prevUser.plan.expiredTime as Date).unix() -
              moment().unix()) /
              (60 * 60 * 24)
          ) -
          Math.round(
            (moment(currUser.plan.expiredTime as Date).unix() -
              moment().unix()) /
              (60 * 60 * 24)
          )
        );
      });
      this.setState({ users: users });
    } else {
      const users = this.state.users.sort((prevUser: any, currUser) => {
        return (
          Math.round(
            (moment(currUser.plan.expiredTime as Date).unix() -
              moment().unix()) /
              (60 * 60 * 24)
          ) -
          Math.round(
            (moment(prevUser.plan.expiredTime as Date).unix() -
              moment().unix()) /
              (60 * 60 * 24)
          )
        );
      });
      this.setState({ users: users });
    }
  }



  public render() {
    return (
      <Layout>
        <div className="font-semibold mb-4 text-lg">
          {this.context.states.contentTitle}
        </div>
        <div>
          <Tabs
            isManual
            variant="enclosed"
            colorScheme="blue"
            isLazy
            onChange={(index) =>
              this.getUserByPlan(this.state.plans[index]._id.plan)
            }
          >
            <TabList>
              {this.state.plans.map((plan: any, index: number) => {
                return (
                  <Tab key={index} id={plan._id.plan}>
                    {plan.name} ({plan.sum})
                  </Tab>
                );
              })}
            </TabList>
            <TabPanels>
              {this.state.plans.map((plan: any, index: number) => {
                return (
                  <TabPanel key={index}>
                    <Table className="mt-2">
                      <Thead>
                        <Tr>
                          <Th>Tên đăng nhập</Th>
                          <Th>Email</Th>
                          <Th>Số điện thoại</Th>
                          <Th>Tên gói sử dụng</Th>
                          <Th>Ngày hết hạn gói</Th>
                          <Th>
                            Số ngày khả dụng{" "}
                            {this.state.sortType === 'desc' && <ArrowUpIcon color="blue" onClick={() => {
                              this.setState({ sortType: 'asc' });
                              this.sortUser()
                            }} />}
                            {this.state.sortType === 'asc' && <ArrowDownIcon color="blue" onClick={() => {
                              this.setState({ sortType: 'desc' });
                              this.sortUser()
                            }} />}
                          </Th>
                          <Th className="flex justify-center">Hành động</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {this.state.users.map((user: any, index: number) => {
                          return (
                            <Tr key={index} className="hover:bg-blue-100">
                              <Td>{user.username}</Td>
                              <Td>{user.email}</Td>
                              <Td>{user.phone}</Td>
                              <Td>
                                {user.plan._id ? (
                                  user.plan.name
                                ) : (
                                  <span>-</span>
                                )}
                              </Td>
                              <Td>
                                {user.plan.expiredTime ? (
                                  moment(user.plan.expiredTime).format(
                                    "DD/MM/YYYY"
                                  )
                                ) : (
                                  <div>-</div>
                                )}
                              </Td>
                              <Td>
                                {Math.round(
                                  (moment(
                                    user.plan.expiredTime as Date
                                  ).unix() -
                                    moment().unix()) /
                                    (60 * 60 * 24)
                                )}
                              </Td>
                              <Td className="flex justify-center">
                                <Button
                                  leftIcon={<GearIcon />}
                                  colorScheme="blue"
                                  onClick={() => {
                                    this.props.history.push(
                                      `users/${user._id}`
                                    );
                                  }}
                                >
                                  Cài đặt tài khoản
                                </Button>
                              </Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                    </Table>
                  </TabPanel>
                );
              })}
            </TabPanels>
          </Tabs>
        </div>
      </Layout>
    );
  }
}

export default withRouter(Plan);
