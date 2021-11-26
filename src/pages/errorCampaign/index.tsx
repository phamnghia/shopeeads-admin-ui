import * as React from "react";
import Layout from "../../layout/default";
import { AppContext } from "../../context/app";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import CampaignService from "../../services/campaign";
import DetailCampainsModal from "./components/detailCampaignsModal";
import ShopService from "../../services/shop";
import { RouteComponentProps, withRouter } from "react-router-dom";

export interface IAppProps extends RouteComponentProps {}

export interface IAppState {
  errorCampaigns: any[];
  isOpenDetailsModal: boolean;
  errorCampaignsDetail: any[];
  errorShops: any[];
}

export default withRouter(
  class App extends React.Component<IAppProps, IAppState> {
    static contextType = AppContext;
    context!: React.ContextType<typeof AppContext>;

    constructor(props: IAppProps) {
      super(props);

      this.state = {
        errorCampaigns: [],
        isOpenDetailsModal: false,
        errorCampaignsDetail: [],
        errorShops: [],
      };
    }

    async componentDidMount() {
      this.context.actions.setContentTitle("Lỗi hệ thống");
      this.context.actions.setActiveMenu("error-campaign");

      const [campaignRes, shopRes] = await Promise.all([
        CampaignService.listErrorCampaigns(),
        ShopService.getErrorShops(),
      ]);

      if (campaignRes.success) {
        this.setState({ errorCampaigns: campaignRes.data });
      }

      if (shopRes.success) {
        this.setState({ errorShops: shopRes.data });
      }
    }

    public render() {
      return (
        <Layout>
          <div className="font-semibold mb-4 text-lg">
            {this.context.states.contentTitle}
          </div>
          <div>
            <Tabs>
              <TabList>
                <Tab>Lỗi chiến dịch</Tab>
                <Tab>Lỗi cửa hàng</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Table variant="simple" colorScheme="blue" className="mb-4">
                    <Thead>
                      <Tr>
                        <Th>Tên đăng nhập</Th>
                        <Th>Số chiến dịch lỗi</Th>
                        <Th className="flex justify-end">
                          <div className="flex justify-center w-200">
                            Hành động
                          </div>
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {this.state.errorCampaigns.map(
                        (campaign, index: number) => {
                          return (
                            <Tr key={index} className="hover:bg-blue-100">
                              <Td
                                className="hover:underline hover:text-blue-500 cursor-pointer"
                                onClick={() =>
                                  this.props.history.push(
                                    `users/${campaign._id?.ownerId}`
                                  )
                                }
                              >
                                {campaign.user}
                              </Td>
                              <Td>{campaign.errorCampaigns.length}</Td>
                              <Td className="flex justify-end">
                                <div className="flex justify-center w-200">
                                  <Button
                                    leftIcon={<EditIcon />}
                                    colorScheme="blue"
                                    onClick={() => {
                                      this.setState({
                                        isOpenDetailsModal: true,
                                        errorCampaignsDetail:
                                          campaign.errorCampaigns,
                                      });
                                    }}
                                  >
                                    Chi tiết
                                  </Button>
                                </div>
                              </Td>
                            </Tr>
                          );
                        }
                      )}
                    </Tbody>
                  </Table>
                </TabPanel>
                <TabPanel>
                  <Table variant="simple" colorScheme="blue" className="mb-4">
                    <Thead>
                      <Tr>
                        <Th>Tên cửa hàng</Th>
                        <Th>Tên đăng nhập</Th>
                        <Th>Lỗi</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {this.state.errorShops.map((shop, index: number) => {
                        return (
                          <Tr key={index} className="hover:bg-blue-100">
                            <Td>{shop.shop}</Td>
                            <Td
                              className="hover:underline hover:text-blue-500 cursor-pointer"
                              onClick={() => {
                                this.props.history.push(`users/${shop.userId}`);
                              }}
                            >
                              {shop.username}
                            </Td>
                            <Td>
                              {shop.logs && shop.logs.length > 0
                                ? shop.logs[0]
                                : "..."}
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
          <DetailCampainsModal
            isOpen={this.state.isOpenDetailsModal}
            onClose={() => this.setState({ isOpenDetailsModal: false })}
            data={this.state.errorCampaignsDetail}
          />
        </Layout>
      );
    }
  }
);
