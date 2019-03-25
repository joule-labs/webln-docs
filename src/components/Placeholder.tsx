import React from 'react';
import { Icon } from 'antd';

interface Props {
  children: React.ReactNode;
}

const Placeholder: React.SFC<Props> = ({ children }) => (
  <div className="Placeholder">
    <Icon type="frown" />
    <div className="Placeholder-content">
      {children}
    </div>
  </div>
);

export default Placeholder;