Arch linux 中(Ubuntu 也是)，firefox 的 markdown viewer 插件似乎不能工作。

下面是一个解决方案, 照搬 https://superuser.com/questions/696361/how-to-get-the-markdown-viewer-addon-of-firefox-to-work-on-linux

1. `touch ~/.local/share/mime/packages/text-markdown.xml`
2. edit it with:
```xml
<?xml version="1.0"?>
<mime-info xmlns="http://www.freedesktop.org/standards/shared-mime-info">
  <mime-type type="text/plain">
    <glob pattern="*.md"></glob>
    <glob pattern="*.mkd"></glob>
    <glob pattern="*.markdown"></glob>
  </mime-type>
</mime-info>
```
3. `update-mime-database ~/.local/share/mime`

完成这三步，即可以让安装了 markdown-viwer 插件的 firefox 直接打开 markdown 并转化成 html，非常方便。

经测试，archlinux 和 ubuntu 都可行。
