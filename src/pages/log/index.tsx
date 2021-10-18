import * as React from "react";
import Layout from "../../layout/default";
import { AppContext } from "../../context/app";
import LogService from "../../services/log";
import moment from "moment";
import { Pagination } from "rsuite";
import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { RouteComponentProps, withRouter } from "react-router-dom";

export interface ILogProps extends RouteComponentProps {}

// interface ILog {
//   _id: string;
//   description: string;
//   createdAt: Date;
// }

export interface ILogState {
  logs: any[];
  total: number;
  page: number;
}

class Log extends React.Component<ILogProps, ILogState> {
  static contextType = AppContext;
  context!: React.ContextType<typeof AppContext>;

  constructor(props: ILogProps) {
    super(props);

    this.state = {
      logs: [],
      total: 0,
      page: 1,
    };
  }

  async componentDidMount() {
    this.context.actions.setActiveMenu("log");
    this.context.actions.setContentTitle("Quản lý logs");
    const logRes = await LogService.getAllLogs();
    console.log(logRes.data);
    if (logRes.success) {
      this.setState({ logs: logRes.data.logs, total: logRes.data.total });
    }
  }

  changePage = async (page: number) => {
    const logRes = await LogService.getAllLogs(page);

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
        <div className="font-semibold mb-4 text-lg">
          {this.context.states.contentTitle}
        </div>
        <div>
          <Table variant="simple" colorScheme="blue" className="mb-4">
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Người dùng</Th>
                <Th>Nội dung</Th>
                <Th>Thời gian</Th>
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
              total: `Tổng: ${this.state.total}`,
            }}
            first
            total={this.state.total}
            activePage={this.state.page}
            limit={20}
            onChangePage={(page) => this.changePage(page)}
          />
        </div>
      </Layout>
    );
  }
}

export default withRouter(Log);
