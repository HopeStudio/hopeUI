# HopeUI
[![](https://travis-ci.com/HopeStudio/hopeUI.svg?branch=master)](https://travis-ci.com/HopeStudio/hopeUI)

基于 react 的 UI 组件库

## 安装
目前未在 npm 发布，待工作流完善后进行发布。

## 开发说明

### 流程说明

1. fork 到自己名下
2. 本地开发组件
3. 编写测试文件 *.spec.js 并测试
4. 发 pull request 到 `master` 分支
5. 关注结果反馈

### 本地开发
```bash
$ git clone git@github.com:HopeStudio/hopeUI.git
$ cd hopeUI/main
$ npm install
$ npm start
```
使用浏览器访问 http://localhost:8868 查看 demo

### 目录结构
```
├── app                # 组件代码
│   ├── icons          # 矢量图标
│   │   ├── source     # SVG 源文件
│   │   ├── store      # 转换后的 react 组件
│   │   └── export.js  # 图标组件导出文件
│   ├── rules          # 基本 CSS 规则以及颜色规则
│   ├── tools          # 工具函数
│   ├── entry.js       # demo 入口文件
│   └── hopeUI.html    # demo html 文件
├── dist               # 生成文件
├── lib                # 外部库
└── package.json
```

### 打包
```bash
$ npm run pack
```

### lint
目前多数代码并未规范化，只需保证新加入代码符合规范即可
```bash
$ npm run lint
```

### 测试
测试
```bash
$ npm run test
```
测试并生成覆盖率报告
```bash
$ npm run testCoverage
```
代码覆盖率报告将以 html 形式生成在 coverage/icov-report 中

### 添加矢量图标

1. 将待添加图标的 SVG 源文件复制到 app/icons/source 目录下
2. 运行
   ```bash
   $ npm run svgIcon
   ```
3. 在 app/icons/export.js 中加入导入和导出新图标的代码

### 工具函数说明

#### colorTrans(styleObj, className)
- `styleObj` &lt;Object> 添加的样式
- `className` &lt;String>

用 `styleObj` 和 `className` 组成样式表并写入到一个 `<style>` 标签中。返回 `<style>` 标签的 id。

在这个过程中会对 `styleObj` 中的颜色值进行转换，转换规则参考 app/rules/colors.js。

注意：`styleObj` 中的键名应该是在 CSS 中出现的原始样式名，而不应该是驼峰形式。

#### uuid(len, radix)
- `len` &lt;Number> 长度
- `radix` &lt;Number> 所用字符数，默认为 `62`

返回一个随机的字符串。

不指定长度时返回的字符串符合 GUID 格式，但其中每个部分均由随机产生而并未使用到日期、网卡等信息。

