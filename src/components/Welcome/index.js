import React from 'react';
import './index.less';

/**
 * 展示欢迎界面
 */
class Welcome extends React.PureComponent {

  render() {
    return (
      <div>
        <h1 className="welcome-text">
          欢迎进入媒体资源管理平台
          <br />
          </h1>
      </div>
    );
  }

}

export default Welcome;
