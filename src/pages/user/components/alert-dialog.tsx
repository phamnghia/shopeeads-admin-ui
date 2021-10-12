import * as React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button
} from "@chakra-ui/react"

export interface ICAlertDialogProps {
  isOpen: boolean
  close: Function
  confirm: Function
}

export interface ICAlertDialogState {
}

export default class CAlertDialog extends React.Component<ICAlertDialogProps, ICAlertDialogState> {
  constructor(props: ICAlertDialogProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <AlertDialog
        leastDestructiveRef={undefined}
        isOpen={this.props.isOpen}
        onClose={() => this.props.close()}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Thông báo
            </AlertDialogHeader>

            <AlertDialogBody>
              Bạn có chắc chắn muốn thực hiện xoá gói?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button size="sm" onClick={() => this.props.close()}>
                Huỷ
              </Button>
              <Button size="sm" colorScheme="red" onClick={() => this.props.confirm()} ml={3}>
                Xoá
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  }
}
