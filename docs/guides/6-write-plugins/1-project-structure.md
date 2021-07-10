---
sidebar_position: 1
---

# 项目结构

到目前为止，bot 的所有功能都是写在一个 py 文件里的。如果我们继续往这个文件里添加功能，它会变得巨大而杂乱。因此，在编写更复杂的功能之前，我们有必要对项目的结构进行一些调整。

创建一个这样的目录：

```
miraicle-example
├── plugins
│   ├── __init__.py
│   └── hello.py
└── bot.py
```

:::info

如果你使用 `PyCharm` 来创建项目，可以右击项目根目录 -> 新建 -> `Python` 包，来创建包含 `__init__.py` 文件的 `plugins` 文件夹。

:::

我们来把 `bot.py` 中让 bot 向世界问好的功能剪切到 `hello.py` 中：

``` python title='hello.py'
import miraicle


@miraicle.Mirai.receiver('FriendMessage')
def hello_to_friend(bot: miraicle.Mirai, msg: miraicle.FriendMessage):
    bot.send_friend_msg(qq=msg.sender, msg='Hello world!')


@miraicle.Mirai.receiver('GroupMessage')
def hello_to_group(bot: miraicle.Mirai, msg: miraicle.GroupMessage):
    if msg.plain in ['Hello', 'hello']:
        bot.send_group_msg(group=msg.group, msg=[miraicle.Plain('Hello world!'),
                                                 miraicle.Face().from_face_id(74),
                                                 miraicle.At(qq=msg.sender)])
```

打开 `__init__.py`，输入这样一行代码：

``` python title='__init__.py'
__all__ = ['hello']
```

:::info

`__all__` 是 `Python` 针对模块公开接口的一种约定，以提供“白名单”的形式暴露接口。如果定义了 `__all__`，然后在其他文件中使用 `from xxx import *` 导入该文件时，只会导入 `__all__` 列出的成员，其他成员都被排除在外。

:::

最后，在 `bot.py` 里面导入 `plugins`:

``` python title='bot.py'
import miraicle
# highlight-start
from plugins import *
# highlight-end

qq = 123456789              # 你登录的机器人 QQ 号
verify_key = 'miraicle'     # 你在 setting.yml 中设置的 verifyKey
port = 8080                 # 你在 setting.yml 中设置的 port (http)

bot = miraicle.Mirai(qq=qq, verify_key=verify_key, port=port)
bot.run()
```

现在，如果你想要给 bot 添加更多的功能，你需要做的是在 `plugins` 文件夹中添加一个文件，编写你想要实现的功能。最后，别忘了在 `__init__.py` 里面添加文件名。
