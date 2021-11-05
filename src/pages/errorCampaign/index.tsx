import * as React from "react";
import Layout from "../../layout/default";
import { AppContext } from "../../context/app";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import CampaignService from "../../services/campaign";
import DetailCampainsModal from "./components/detailCampaignsModal";

export interface IAppProps {}

export interface IAppState {
  errorCampaigns: any[];
  isOpenDetailsModal: boolean;
  errorCampaignsDetail: any[]
}

export default class App extends React.Component<IAppProps, IAppState> {
  static contextType = AppContext;
  context!: React.ContextType<typeof AppContext>;

  constructor(props: IAppProps) {
    super(props);

    this.state = {
      errorCampaigns: [],
      isOpenDetailsModal: false,
      errorCampaignsDetail: []
    };
  }

  async componentDidMount() {
    this.context.actions.setContentTitle("Chiến dịch lỗi");
    this.context.actions.setActiveMenu("error-campaign");

    const res = await CampaignService.listErrorCampaigns();

    if (res.success) {
      this.setState({ errorCampaigns: res.data });
    }
  }

  public render() {
    return (
      <Layout>
        <div className="font-semibold mb-4 text-lg">
          {this.context.states.contentTitle}
        </div>
        <div>
          <Table variant="simple" colorScheme="blue" className="mb-4">
            <Thead>
              <Tr>
                <Th>Tên đăng nhập</Th>
                <Th>Số chiến dịch lỗi</Th>
                <Th className="flex justify-end">
                  <div className="flex justify-center w-200">Hành động</div>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {this.state.errorCampaigns.map((campaign, index: number) => {
                return (
                  <Tr key={index} className="hover:bg-blue-100">
                    <Td>{campaign.user}</Td>
                    <Td>{campaign.errorCampaigns.length}</Td>
                    <Td className="flex justify-end">
                      <div className="flex justify-center w-200">
                        <Button leftIcon={<EditIcon />} colorScheme="blue" onClick={() => {
                          this.setState({ isOpenDetailsModal: true, errorCampaignsDetail: campaign.errorCampaigns});
                        }}>
                          Chi tiết
                        </Button>
                      </div>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
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
