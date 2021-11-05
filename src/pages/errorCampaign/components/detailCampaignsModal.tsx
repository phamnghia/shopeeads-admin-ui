import * as React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import moment from "moment";

export interface IDetailCampainsModalProps {
  isOpen: boolean;
  onClose: Function;
  data: any[];
}

export interface IDetailCampainsModalState {}

export default class DetailCampainsModal extends React.Component<
  IDetailCampainsModalProps,
  IDetailCampainsModalState
> {
  constructor(props: IDetailCampainsModalProps) {
    super(props);

    this.state = {};
  }

  public render() {
    const data = this.props.data.sort(
      (prevCampaign: any, currCampaign: any) =>
        moment(currCampaign.lastCheckedAt).unix() -
        moment(prevCampaign.lastCheckedAt).unix()
    );
    return (
      <Modal
        isOpen={this.props.isOpen}
        onClose={() => this.props.onClose()}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chi tiết các chiến dịch lỗi</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table variant="simple" colorScheme="blue" className="mb-4">
              <Thead>
                <Tr>
                  <Th>Campaign Id</Th>
                  <Th>Kiểu</Th>
                  <Th>Thời gian lỗi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((campaign, index: number) => {
                  return (
                    <Tr key={index} className="hover:bg-blue-100">
                      <Td>{campaign.campaignId}</Td>
                      <Td>{campaign.type}</Td>
                      <Td>
                        {moment(campaign.lastCheckedAt).format(
                          "HH:mm DD-MM-YYYY"
                        )}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => this.props.onClose()}
            >
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
}
