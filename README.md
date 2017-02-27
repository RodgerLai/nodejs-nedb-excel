## 技术
- 基于nodejs+webpack
- 以nosql轻量级移动数据库nedb作为存储
- 前端页面渲染采用react+redux
- 样式框架为material-ui

## 功能
- 实现了excel表格上传，存储以及导出
- 表格数据可视化
- 实现了语言切换（I18N）

## 发布时运行

- Clone this repository
- npm i to install the dependencies (Node 4+, NPM 3+)
- npm run build to build everything (client and server)
- npm start to run the server on port 8080
- Open your browser on http://localhost:8080

## 开发时运行

- Clone this repository
- npm i to install the dependencies (Node 4+, NPM 3+)
- Open another terminal (you need two of those)
- npm run start-server on the first terminal to start the server bit
- npm run start-ui on the second terminal, to run live webpack with hot-reload
- Open your browser on http://localhost:8081