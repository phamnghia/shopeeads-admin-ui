import * as React from "react";
import Layout from "../../layout/default";
import { AppContext } from "../../context/app";
import UserService from "../../services/user";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Image,
  Divider,
  FormControl,
  FormLabel,
  Input,
  createStandaloneToast,
} from "@chakra-ui/react";
import { DatePicker, SelectPicker } from "rsuite";
import PlanService from "../../services/plan";
import { calendarLocale } from "../../config/index";
import moment from "moment";
import CAlertDialog from "./components/alert-dialog";
import { Pagination } from "rsuite";
import LogService from "../../services/log";
import AdminService from "../../services/admin";

export interface IUserDetailProps
  extends RouteComponentProps<{ userId: string }> {}

export interface IUserDetailState {
  user: any;
  shops: any[];
  plans: any[];
  plan: string;
  expiredPlanTime: Date | undefined;
  updatePlan: boolean;
  isShowDeletePlan: boolean;
  newPass: string;
  logs: any[];
  total: number;
  page: number;
  admins: any[];
  admin: string;
}

class UserDetail extends React.Component<IUserDetailProps, IUserDetailState> {
  static contextType = AppContext;
  context!: React.ContextType<typeof AppContext>;

  constructor(props: IUserDetailProps) {
    super(props);

    this.state = {
      user: {
        username: "",
        email: "",
        phone: "",
      },
      shops: [],
      plans: [],
      plan: "",
      expiredPlanTime: undefined,
      isShowDeletePlan: false,
      newPass: "",
      updatePlan: false,
      total: 0,
      page: 1,
      logs: [],
      admins: [],
      admin: ''
    };
  }

  componentDidUpdate(prevProps: IUserDetailProps, prevSates: IUserDetailState) {
    if (
      (prevSates.plan && prevSates.plan !== this.state.plan) ||
      (prevSates.expiredPlanTime &&
        prevSates.expiredPlanTime !== this.state.expiredPlanTime)
    ) {
      this.setState({ updatePlan: true });
    }
  }

  async componentDidMount() {
    try {
      const userId = this.props.match.params.userId;
      const [userRes, shopRes, planRes, logRes, adminRes] = await Promise.all([
        UserService.getUser(userId),
        UserService.getUserShop(userId),
        PlanService.getAllPlans(),
        LogService.getLogsByUser(userId, 1, 10),
        AdminService.listAdmin(),
      ]);
      const newState: any = {};

      newState.user = userRes.data;
      newState.shops = shopRes.data;
      newState.plans = planRes.data;
      newState.logs = logRes.data.logs;
      newState.total = logRes.data.total;
      newState.admins = adminRes.data;

      if (userRes.data.plan) {
        newState.plan = userRes.data.plan._id;
        newState.expiredPlanTime = userRes.data.plan.expiredTime
      }

      if (userRes.data.admin) {
        this.setState({ admin: userRes.data?.admin._id})
      }

      this.setState(newState);
    } catch (error) {
      alert("C?? l???i x???y ra");
    }

    this.context.actions.setContentTitle(`Chi ti???t ng?????i d??ng`);
  }

  deletePlan = async () => {
    const res = await UserService.deleteUserPlan(
      this.state.user._id,
      this.state.plan
    );
    if (res.success) {
      this.setState({
        user: res.data,
        isShowDeletePlan: false,
        plan: "",
        expiredPlanTime: undefined,
      });
    }
  };

  addPlan = async () => {
    const toast = createStandaloneToast();
    const res = await UserService.addUserPlan(
      this.state.user._id,
      this.state.expiredPlanTime as Date,
      this.state.plan
    );

    if (res.success) {
      this.setState({ user: res.data });
      if (this.state.updatePlan) {
        this.setState({ updatePlan: false });
        return toast({
          description: "N??ng c???p g??i th??nh c??ng",
          status: "success",
          position: "top",
        });
      }
      toast({
        description: "Th??m g??i th??nh c??ng",
        status: "success",
        position: "top",
      });
    } else {
      toast({
        description: res.message,
        status: "error",
        position: "top",
      });
    }
  };

  async resetPlan() {
    const userRes = await UserService.getUser(this.state.user._id);

    if (userRes.success) {
      this.setState({
        user: userRes.data,
        plan: userRes.data.plan._id,
        expiredPlanTime: userRes.data.expiredTime,
        updatePlan: false,
      });
    }
  }

  changePassHandler = async () => {
    const toast = createStandaloneToast();
    if (!this.state.newPass || this.state.newPass.length < 6) {
      return toast({
        description: "M???t kh???u ph???i c?? nhi???u h??n 6 k?? t???",
        status: "warning",
        position: "top",
      });
    }

    const res = await UserService.changePassword(
      this.state.user._id,
      this.state.newPass
    );

    if (res.success) {
      toast({
        description: "?????i m???t kh???u th??nh c??ng",
        status: "success",
        position: "top",
      });
      this.setState({ newPass: "" });
    }
  };

  changePage = async (page: number) => {
    const logRes = await LogService.getLogsByUser(this.props.match.params.userId, page, 10);

    if (logRes.success) {
      this.setState({
        logs: logRes.data.logs,
        total: logRes.data.total,
        page: page,
      });
    }
  };

  public render() {
    return (
      <Layout>
        <div className="font-semibold text-lg mb-4">
          {this.context.states.contentTitle}{" "}
          <span className="text-blue-500 underline">
            {this.state.user.username}
          </span>
        </div>
        <div className="flex flex-row gap-4 mb-4">
          <div>
            <div className="p-2 border border-gray-200 mb-4 w-500">
              <div className="font-semibold text-lg">Th??ng tin c?? nh??n</div>
              <Divider className="my-2" />
              <div className="grid grid-cols-3">
                <div style={{ width: 300 }}>
                  <FormControl className="mb-2" style={{ width: 300 }}>
                    <FormLabel>T??n ????ng nh???p</FormLabel>
                    <Input
                      size="sm"
                      value={this.state.user.username}
                      disabled={true}
                    />
                  </FormControl>
                  <FormControl className="mb-2" style={{ width: 300 }}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      size="sm"
                      value={this.state.user.email}
                      disabled={true}
                    />
                  </FormControl>
                  <FormControl className="mb-2" style={{ width: 300 }}>
                    <FormLabel>S??? ??i???n tho???i</FormLabel>
                    <Input
                      size="sm"
                      value={this.state.user.phone}
                      disabled={true}
                    />
                  </FormControl>
                  {/* <p className="p-1">Email : {this.state.user.email}</p>
            <p className="p-1">S??? ??i???n tho???i : {this.state.user.phone}</p> */}
                </div>
              </div>
              <div className="w-300">
                <FormControl className="mb-2" style={{ width: 300 }}>
                  <FormLabel>?????i m???t kh???u</FormLabel>
                  <div className="flex flex-row">
                    <Input
                      value={this.state.newPass}
                      onChange={(event) =>
                        this.setState({
                          newPass: event.target.value,
                        })
                      }
                      type="password"
                      size="sm"
                      className="mr-1"
                    />
                    <Button
                      className="float-right"
                      colorScheme="blue"
                      size="sm"
                      onClick={() => this.changePassHandler()}
                    >
                      L??u
                    </Button>
                  </div>
                </FormControl>

                <FormControl className="mb-2" style={{ width: 300 }}>
                  <FormLabel>Ng??y t???o t??i kho???n</FormLabel>
                  <div>{moment(this.state.user.createdAt).format("DD/MM/YYYY")}</div>
                </FormControl>

                <FormControl className="mb-2" style={{ width: 300 }}>
                  <FormLabel>Admin qu???n l??</FormLabel>
                  <div>
                    <SelectPicker 
                      data={this.state.admins} 
                      cleanable={false} 
                      searchable={false} 
                      labelKey="username" 
                      valueKey="_id"
                      value={this.state.admin}
                      placeholder="Ch???n admin qu???n l??"
                      onChange={async (value) => { 
                        this.setState({ admin: value as string });
                        const res = await UserService.updateUser(this.props.match.params.userId, {
                          admin: this.state.admins.find((admin: any) => admin._id === value)
                        })
                        if (res.success) {
                          const toast = createStandaloneToast();
                          toast({
                            status: 'success',
                            description: 'C???p nh???t admin th??nh c??ng',
                            title: 'Th??ng b??o',
                            position: 'top'
                          })
                        }
                      }}
                    />
                  </div>
                </FormControl>
              </div>
            </div>
            <div className="p-2 border border-gray-200 w-500">
              <div className="font-semibold text-lg">C??i ?????t g??i</div>
              <Divider className="my-2" />
              <div className="w-300">
                <div>
                  <div className="mb-2 flex flex-row">
                    <div className="mr-1 w-100 flex items-center">G??i</div>
                    {this.state.user.plan?._id ? (
                      <SelectPicker
                        placeholder="Ch???n g??i"
                        searchable={false}
                        cleanable={false}
                        style={{ width: 200 }}
                        data={this.state.plans}
                        labelKey="name"
                        valueKey="_id"
                        value={this.state.plan}
                        onChange={(value) => {
                          const newState: any = {}
                          const trialPlan = this.state.plans.find((plan: any) => plan._id === value);
                          if (trialPlan.name === 'G??i d??ng th???') newState.expiredPlanTime = moment().add(7, 'day').toDate();
                          newState.plan = value as string;
                          this.setState(newState)
                        }}
                      />
                    ) : (
                      <SelectPicker
                        placeholder="Ch???n g??i"
                        searchable={false}
                        cleanable={false}
                        style={{ width: 200 }}
                        data={this.state.plans}
                        labelKey="name"
                        valueKey="_id"
                        value={this.state.plan}
                        onChange={(value) => {
                          const newState: any = {}
                          const trialPlan = this.state.plans.find((plan: any) => plan._id === value);
                          if (trialPlan.name === 'G??i d??ng th???') newState.expiredPlanTime = moment().add(7, 'day').toDate();
                          newState.plan = value as string;
                          this.setState(newState)
                        }}
                      />
                    )}
                  </div>
                  <div className="mb-2 flex flex-row">
                    <div className="mr-1 w-100 flex items-center">
                      Ng??y h???t h???n:{" "}
                    </div>
                    {this.state.user.plan?.expiredTime ? (
                      <DatePicker
                        locale={calendarLocale}
                        oneTap
                        format="dd-MM-yyyy"
                        placeholder="Ch???n ng??y h???t h???n"
                        style={{ width: 200 }}
                        cleanable={false}
                        value={
                          this.state.user.plan?.expiredTime
                            ? moment(this.state.expiredPlanTime).toDate()
                            : this.state.expiredPlanTime
                        }
                        disabled={this.state.plans.find((plan: any) => plan._id === this.state.plan)?.name === 'G??i d??ng th???'}
                        onChange={(value) => {
                          this.setState({
                            expiredPlanTime: value,
                          });
                        }}
                      />
                    ) : (
                      <DatePicker
                        locale={calendarLocale}
                        oneTap
                        format="dd-MM-yyyy"
                        placeholder="Ch???n ng??y h???t h???n"
                        style={{ width: 200 }}
                        cleanable={false}
                        value={this.state.expiredPlanTime}
                        disabled={this.state.plans.find((plan: any) => plan._id === this.state.plan)?.name === 'G??i d??ng th???'}
                        onChange={(value) => {
                          this.setState({ expiredPlanTime: value });
                        }}
                      />
                    )}
                  </div>
                  <div className="flex justify-end">
                    {this.state.user.plan?._id ? (
                      <div>
                        <Button
                          size="sm"
                          colorScheme="blue"
                          className="mr-1"
                          onClick={() => this.addPlan()}
                          disabled={!this.state.updatePlan}
                        >
                          C???p nh???t g??i
                        </Button>
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() =>
                            this.setState({ isShowDeletePlan: true })
                          }
                        >
                          Hu??? g??i
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Button
                          size="sm"
                          colorScheme="blue"
                          disabled={
                            !this.state.plan || !this.state.expiredPlanTime
                          }
                          onClick={async () => this.addPlan()}
                        >
                          X??c nh???n
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <div className="p-2 border border-gray-200" style={{ height: '100%'}}>
              <div className="font-semibold text-lg">Danh s??ch c???a h??ng</div>
              <Divider className="my-2" />
              <div style={{ height: '100%'}}>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>???nh</Th>
                      <Th>ShopId</Th>
                      <Th>T??n c???a h??ng</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {this.state.shops.map((shop, index: number) => {
                      return (
                        <Tr key={index}>
                          <Td>
                            <Image width={50} height={50} src={shop.avatar} />
                          </Td>
                          <Td>{shop.shopId}</Td>
                          <Td>{shop.username}</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
                {this.state.shops.length === 0 ? (
                  <div className="w-full h-100 flex items-center justify-center">
                    Kh??ng c?? d??? li???u
                  </div>
                ) : null}
                <CAlertDialog
                  isOpen={this.state.isShowDeletePlan}
                  close={() => this.setState({ isShowDeletePlan: false })}
                  confirm={this.deletePlan}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="font-semibold mb-4 text-lg">
          {this.context.states.contentTitle}
        </div>
        <div>
          <Table variant="simple" colorScheme="blue" className="mb-4">
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Ng?????i d??ng</Th>
                <Th>N???i dung</Th>
                <Th>Th???i gian</Th>
              </Tr>
            </Thead>
            <Tbody>
              {this.state.logs.map((log: any, index: number) => {
                return (
                  <Tr key={index}>
                    <Td>{log.type}</Td>
                    <Td
                      className="cursor-pointer hover:text-blue-500 hover:underline"
                      onClick={() =>
                        this.props.history.push(`/users/${log.user._id}`)
                      }
                    >
                      {log.user?.username}
                    </Td>
                    <Td>{log.description}</Td>
                    <Td>{moment(log.createdAt).format("HH:mm DD/MM/YYYY")}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </div>
        <div className="flex justify-end">
          <Pagination
            layout={["total", "|", "pager"]}
            className="px-5 mr-5"
            size="md"
            prev
            last
            next
            locale={{
              total: `T???ng: ${this.state.total}`,
            }}
            first
            total={this.state.total}
            activePage={this.state.page}
            limit={10}
            onChangePage={(page) => this.changePage(page)}
          />
        </div>
      </Layout>
    );
  }
}

export default withRouter(UserDetail);
