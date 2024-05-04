一、项目初始化

1、创建项目文件夹WEB3_a,创建client作为react前端代码包，smart_contrant作为solidity后端代码包


2、使用vite构建React应用，npm run dev得到以下页面


3、前端使用tailwindcss，它是一个css工具框架，安装tailwind后修改一下三个文件，就可以完成Hello world!


4、初始化智能合约，cd到smart_contract文件npm init -y，初始化一个空的package.json


二、React应用程序实现事务发送

1、新建components应用组件,格式一样，复制粘贴即可


2、创建index.js引入所有组件，在App.jsx中导入它们


3、编辑App.jsx,设计好组件结构，Ctrl+单击快速编辑组件


4、安装依赖npm install react-icons ethers、npx tailwindcss init -p 编写Navbar.jsx


5、编辑Welcme.jsx，使用React编写钱包连接转账功能，但不能进行实际操作


6、为了我们的功能正常使用编写智能合约部分，转到smart_contract文件下，npx hardhat（使用hardhat构建基本项目结构），npx hardhat test（构建测试文件），为VS Code安装solidity


7、编写一个简单的转账合约记录左右事务和事务总个数，npm install --save-dev hardhat，npx hardhat compile编译合约，编写Ignition模块下指定部署内容


8、谷歌插件安装metamask(没有钱包账户创建一个新账户，保存好12个私密单词),执行npx hardhat node打开本地节点，cmd打开新的终端 npx hardhat ignition deploy ./ignition/modules/Transactions.js --network localhost（部署到hardhat本地节点）部署合约测试

hardhat node本地节点提供了很多账户

链接一个账户查看ETH余额

部署成功得到合约地址

部署成功消耗gas

9、回到client些react部分实现与合约交互，src下新建utils包，在下面新建Transactions.json(将artifacts中编译好的合约json文件内容复制过来),constacts.js（导出合约ABI和Address）；src下新建context包，新建TransactionsContext来编写内容实现Transactions合约与welcome.jsx的上下文交互

10、在MetaMask创建一个新的账户，连接MetaMask，复制新账户address转账，等待交易完成。
