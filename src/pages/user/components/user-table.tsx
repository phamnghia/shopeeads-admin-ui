import * as React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import GearIcon from "@rsuite/icons/Gear";
import { RouteComponentProps, withRouter } from "react-router-dom";
import moment from "moment";
import { Pagination } from "rsuite";

export interface IUserTableProps extends RouteComponentProps {
  data: any[];
  pageChange: Function;
  page: number;
  total: number;
  limit: number;
}

export interface IUserTableState {}

class UserTable extends React.Component<IUserTableProps, IUserTableState> {
  constructor(props: IUserTableProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <div>
        <Table variant="simple" colorScheme="blue" className="mb-4">
          <Thead>
            <Tr>
              <Th>Tên đăng nhập</Th>
              <Th>Email</Th>
              <Th>Số điện thoại</Th>
              <Th>Gói</Th>
              <Th>Ngày hết hạn</Th>
              <Th>Ngày tạo tài khoản</Th>
              <Th className="flex justify-center">Hành động</Th>
            </Tr>
          </Thead>
          <Tbody>
            {this.props.data.map((user, index: number) => {
              return (
                <Tr key={index} className="hover:bg-blue-100">
                  <Td>{user.username}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.phone}</Td>
                  <Td>
                    {user.plan && user.plan._id ? user.plan.name : <span>-</span>}
                  </Td>
                  <Td>
                    {user.plan && user.plan.expiredTime ? (
                      moment(user.plan.expiredTime).format("DD/MM/YYYY")
                    ) : (
                      <div>-</div>
                    )}
                  </Td>
                  <Td>
                    {moment(user.createdAt).format("DD/MM/YYYY")}
                  </Td>
                  <Td className="flex justify-center">
                    <Button
                      leftIcon={<GearIcon />}
                      colorScheme="blue"
                      onClick={() => {
                        this.props.history.push(`users/${user._id}`);
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
        <div className="flex justify-end">
          <Pagination
            layout={['total', '|', 'pager']}
            className="px-5 mr-5"
            size="md"
            prev
            last
            next
            locale={{
              total: `Tổng: ${this.props.total}`
            }}
            first
            total={this.props.total}
            activePage={this.props.page}
            limit={20}
            onChangePage={(page) => this.props.pageChange(page)}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(UserTable);
