# AIOps

使用阿里云的 FaaS 实现 AIOps 工作流自动化，目前兼容字节跳动的飞书。

## 功能特性

1. 接收 Github Webhook 推送到指定 Lark 群中
2. 接收 Tower 的 Webook 并推送到指定 Lark 群中
3. 接收 Gitee 的 Webook 并推送到指定 Lark 群中
4. 服务器 CPU、硬盘空间监测报警

## 使用方式

需安装阿里云 FaaS 的 `fun` 命令行，安装完成后使用以下命令部署：

``` javascript
fun deploy
```

## 作者

[Authing](https://authing.cn)