# NVM

## 关于使用 nvm list available 显示内容为空问题

通常是网络问题导致的 Node.js 镜像源获取版本信息失败,可修改`nvm`的镜像源

1. 找到 nvm 文件下的 `settings.txt` 文件，在其中加入以下镜像源

   ```txt
   node_mirror: https://npmmirror.com/mirrors/node/
   npm_mirror: https://npmmirror.com/mirrors/npm/
   ```

2. 保存后重新输入 `nvm list available` 即可

## 相关指令

```shell
nvm list
nvm use version
nvm install version
```
