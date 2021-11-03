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

export interface IPlanProps extends RouteComponentProps {}

export interface IPlanState {
  plans: any[];
  tabId: string;
  users: any[];
}

class Plan extends React.Component<IPlanProps, IPlanState> {
  static contextType = AppContext;
  context!: React.ContextType<typeof AppContext>;

  constructor(props: IPlanProps) {
    super(props);

    this.state = {
      plans: [],
      tabId: "",
      users: [],
    };
  }

  async componentDidMount() {
    this.context.actions.setContentTitle("Danh sách sử dụng gói");
    this.context.actions.setActiveMenu("plan");

    const res = await PlanService.getAllPlans();

    if (res.success) {
      this.setState({ plans: res.data });
      this.getUserByPlan(res.data[0]._id)
    }
  }

  async getUserByPlan(planId: string) {
    const res = await UserService.getUserByPlan(planId);
    
    if (res.success) {
      console.log(res.data);
      this.setState({ users: res.data })
    }
  }

  public render() {
    return (
      <Layout>
        <div className="font-semibold mb-4 text-lg">
          {this.context.states.contentTitle}
        </div>
        <div>
          <Tabs isManual variant="enclosed" colorScheme="blue" isLazy onChange={(index) => this.getUserByPlan(this.state.plans[index]._id)}>
            <TabList>
              {this.state.plans.map((plan: any, index: number) => {
                return (
                  <Tab key={index} id={plan._id}>
                    {plan.name}
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
                          <Th>Số ngày khả dụng</Th>
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
                              <Td>{Math.round((moment(user.plan.expiredTime as Date).unix() - moment().unix()) / (60*60*24))}</Td>
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
