# git config 配置

在 Git 里，git config命令能用来设置和获取 Git 的配置变量。

在命令行输入 `git config`, 系统会显示可配置的命令。

```bash
➜  ~ git config
usage: git config [<options>]

Config file location
    --global              use global config file
    --system              use system config file
    --local               use repository config file
    --worktree            use per-worktree config file
    -f, --file <file>     use given config file
    --blob <blob-id>      read config from given blob object

Action
    --get                 get value: name [value-pattern]
    --get-all             get all values: key [value-pattern]
    --get-regexp          get values for regexp: name-regex [value-pattern]
    --get-urlmatch        get value specific for the URL: section[.var] URL
    --replace-all         replace all matching variables: name value [value-pattern]
    --add                 add a new variable: name value
    --unset               remove a variable: name [value-pattern]
    --unset-all           remove all matches: name [value-pattern]
    --rename-section      rename section: old-name new-name
    --remove-section      remove a section: name
    -l, --list            list all
    --fixed-value         use string equality when comparing values to 'value-pattern'
    -e, --edit            open an editor
    --get-color           find the color configured: slot [default]
    --get-colorbool       find the color setting: slot [stdout-is-tty]

Type
    -t, --type <type>     value is given this type
    --bool                value is "true" or "false"
    --int                 value is decimal number
    --bool-or-int         value is --bool or --int
    --bool-or-str         value is --bool or string
    --path                value is a path (file or directory name)
    --expiry-date         value is an expiry date

Other
    -z, --null            terminate values with NUL byte
    --name-only           show variable names only
    --includes            respect include directives on lookup
    --show-origin         show origin of config (file, standard input, blob, command line)
    --show-scope          show scope of config (worktree, local, global, system, command)
    --default <value>     with --get, use default value when missing entry
```

## --global 和 --system

- --global：使用该选项时，配置信息会被保存到用户主目录下的.gitconfig文件（在 Windows 系统中是C:\Users\用户名\.gitconfig；在 Linux 或 macOS 系统中是~/.gitconfig ）。该文件只对当前用户起作用。   
- --system：此选项会把配置信息保存到系统级的 Git 配置文件中，在 Linux 或 macOS 系统里通常是/etc/gitconfig；在 Windows 系统中是git安装目录\mingw64\etc\gitconfig。该文件会对系统里的所有用户生效。

Git 在读取配置时，存在一定的优先级顺序。从高到低依次为：仓库级配置（.git/config）、用户级配置（--global对应的配置文件）、系统级配置（--system对应的配置文件）。

## 设置user信息

使用 `git config --global user.name "xxx"` 和 `git config --global user.email "xxx@xxx.com"` 命令可以设置用户信息。

```bash
➜  ~ git config --global user.name "xxx"
➜  ~ git config --global user.email "xxx@xxx.com"
```

## --list

使用 `git config --list` 命令可以查看已配置的信息。

```bash
➜  ~ git config --list
user.name=xxx
user.email=xxx@xxx.com
```

## 设置pull的合并策略

使用 `git config --global pull.rebase true` 命令可以设置pull的合并策略。

```bash
➜  ~ git config --global pull.rebase true
```

默认的合并策略是 `merge`，设置为 `rebase` 后，pull 时会使用 rebase 的方式合并。

## 设置分支关联

使用 `git branch -u <remote>/<remote-branch> <local-branch>` 命令可以设置分支关联。

```bash
➜  ~ git branch -u origin/main main
```

关联 origin 远端的 main 分支和本地的 main 分支，后续在执行这两个分支的操作时，可以省略远程分支名。

```bash
# 设置前  
➜  ~ git push(pull) origin main

# 设置后
➜  ~ git push(pull)
```


