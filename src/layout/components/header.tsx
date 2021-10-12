import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import * as React from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons'
import { AppContext } from '../../context/app';
import { RouteComponentProps, withRouter } from 'react-router-dom';

export interface IHeaderProps extends RouteComponentProps {
}

export interface IHeaderState {
}

class Header extends React.Component<IHeaderProps, IHeaderState> {
  static contextType = AppContext;
  context!: React.ContextType<typeof AppContext>;

  constructor(props: IHeaderProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <div className="flex items-center justify-end" style={{ height: '100%' }}>
        <div>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<ChevronDownIcon />}
              variant="outline"
            />
            <MenuList>
              <MenuItem className="font-semibold" onClick={() => this.context.actions.logout()}>Đăng xuất</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    );
  }
}

export default withRouter(Header)
