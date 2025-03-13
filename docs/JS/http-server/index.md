# 使用http-server搭建https服务

## 安装http-server
```bash
npm install -g http-server
```
使用-p参数指定端口号，启动node服务器，将当前目录下的文件作为静态资源暴露出去

## 获取证书
```bash
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

输入这个命令后会在当前目录下生成证书，这个过程会需要提供一些参数，命令行里可以输入“.”（表示置空），快速填完参数

```bash
├── cert.pem
└── key.pem
```

## 启动http-server命令
```bash
http-server -S -p 8080
```

由于是自定义的证书，浏览器会有风险提示，这里选择高级->继续访问即可
参考： https://www.cnblogs.com/DreamSeeker/p/16468040.html