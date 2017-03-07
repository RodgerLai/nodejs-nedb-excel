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
          Welcome, 基于nodejs+webpack,以nosql轻量级嵌入式数据库nedb作为存储，页面渲染采用react+redux,样式框架为ant design,实现了excel表格上传导出以及可视化.
          <br />
          项目地址: <a target="_blank" href="https://github.com/RodgerLai/nodejs-nedb-excel">https://github.com/RodgerLai/nodejs-nedb-excel</a>
        </h1>
      </div>
    );
  }

}

export default Welcome;
