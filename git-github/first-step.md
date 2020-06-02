# 简单使用 git 和 github

初步使用 github 就像是把它当作资源的在线托管平台，不过它是基于 git 的，尤其适用于代码。

Github 可以让人们直接在网页上面操作，从 repo 创建到维护都不需要 CLI。更好的方式是学习 git 在本地维护 repo，并使用相关命令备份到 github repo。

## github 账号

访问 github.com 注册账号，github 有丰富的文档。

创建一个新的 repo，按页面提示进行。

## 学习简单 git 命令

访问 git-scm.com，它是 git 的官网。学习 pro-git 前两章就能应付大多数使用场景了。

```sh
# 一些初级命令

# man git 
git config --global user.name
git config --global user.email
git config --global core.editor
git init
git add
git commit -m
git remote add origin
git push -u origin master
```

## ssh

默认情况，我们要将本地 repo push 到 github，每次都要输入账号和密码，在频繁操作的时候这显得很繁琐。

使用 ssh 生成密钥，私钥放在本地，公钥放到 github，可以避免每次输入 github 的账号和密码。

```sh
ssh-genkey
ssh-agent
ssh-add
ssh -T git@github.com # 将 github.com 添入 ~/.ssh/known_hosts

# 如果之前 remote 设置了 https 的地址，改为 ssh
git remote rm origin
# 替换[  ]中的内容
git remote add origin git@github.com:[username]/[reponame].git
```

github settings 页面 ssh 相关部分放入 keyname.pub 公钥。

这样，我们就可以开始维护一个本地和 github 的 repo 了。

## clone

git clone 命令也很常用，人们经常用到它快速 pull 一个自己或他人的 repo 到本地。
