# shell 脚本

---
Shell 脚本（shell script），是一种为 shell 编写的脚本程序。Shell 跟 JavaScript、php 类似，只要有一个能编写代码的文本编辑器和一个能解释执行的脚本解释器即可（在类 Unix 系统中，通常自带了`bash`作为 shell解释器）。

:::tip 说明
Linux 的 Shell 种类众多，常见的有 

- Bourne Shell（/usr/bin/sh或/bin/sh）
- Bourne Again Shell（/bin/bash）
- C Shell（/usr/bin/csh）
- K Shell（/usr/bin/ksh）
- Shell for Root（/sbin/sh）

:::

## 可执行的 shell 脚本文件

一个脚本文件可执行的必要条件有：
1. 脚本文件具有可执行权限（`chmod +x`赋予可执行权限）
2. 脚本文件第一行指定解释器

    `#!` 告诉系统执行此文件时使用的解释器  
    `#!/bin/bash` 表示这是一个 bash 脚本，/bin/bash 是 bash 解释器的路径。   
    可以去环境变量中找到其他的解释器路径，例如：
    ```bash
    # 查看环境变量
    echo $PATH
    # 查看 [python] 解释器路径
    which python
    ``` 
    将得到的解释器路径写入脚本文件第一行即可。

:::warning 注意
这表示脚本文件执行并不受扩展名影响，即使文件名是 `text.txt` 满足以上两个条件也可以执行的。但是在实际运用中建议使用对应的脚本扩展名（如 `.sh`,`.py`,`.php`,`.js` 等）用于辨别。

```bash
✗ vim script.txt
# 写入内容：#!/bin/bash \n echo "hello world"
✗ chmod +x ./script.txt 
✗ ./script.txt 
hello world

```
:::


## 创建并执行一个 shell 脚本

```bash
# 创建一个脚本文件
vim script.sh
```

写入内容：
```bash
#!/bin/bash
echo "bash 脚本执行成功"
echo "传递的参数：$1"
echo "--------------------------------"
if [ $1 == "sys" ]; then
  echo "当前目录：$(pwd)"
  echo "当前用户：$(whoami)"
  echo "当前时间：$(date)"
  echo "当前版本：$(uname -r)"
fi
```

保存并退出：
```bash
:wq
```

赋予可执行权限：
```bash
chmod +x script.sh
```

执行脚本：
```bash
./script.sh sys
```

执行结果：
```text
bash 脚本执行成功
传递的参数：sys
--------------------------------
当前目录：/Users/xxx/Desktop/shy/vitepress
当前用户：xxx
当前时间：2025年12月31日 星期三 15时43分27秒 CST
当前版本：23.1.0
当前主机名：MacBook-Pro
```