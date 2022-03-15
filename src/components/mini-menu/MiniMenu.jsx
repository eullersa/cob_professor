import { Fragment } from 'react';
import Logo from '../logo/Logo';

function MiniMenu({link}) {

  return (
    <Fragment>
      <div id='minimenu'>
        <div className="menu-content">
          <Logo link={link} />
        </div>
      </div>
    </Fragment>
  );
}

export default MiniMenu;