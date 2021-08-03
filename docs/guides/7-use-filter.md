---
sidebar_position: 7
---

# 使用过滤器

在上一节中，我们已经编写了几个组件。只要你的 bot 还在运行，这几个组件都可以被触发。但是有时候，你可能会希望一些组件只在某些特定的群运行，或者不希望某些人使用你的 bot。对于这个问题，`miraicle` 提供了一套方案：过滤器。

`miraicle` 内置了两种过滤器：群组件开关 `GroupSwitchFilter` 和黑名单 `BlacklistFilter`。如果你的 bot 使用了过滤器，当 `miraicle` 收到一条消息时，会首先发送给过滤器，判断它是否满足某些条件，只有符合条件的消息才会继续被送往你编写的组件接受调用。

每个过滤器需要有一个 `json` 文件来记录它的配置信息。在你的项目目录下创建一个 `config` 文件夹来储存这些文件，现在你的目录结构是这样：

``` text
miraicle-example
# highlight-start
├── config
# highlight-end
├── database
│   └── word_cloud.db
├── plugins
│   ├── __init__.py
│   ├── repeat.py
│   ├── hello.py
│   └── word_cloud.py
└── bot.py
```

## 群组件开关

在 `bot.py` 中添加一行：

``` python title='bot.py'
import miraicle
from plugins import *


qq = 123456789              # 你登录的机器人 QQ 号
verify_key = 'miraicle'     # 你在 setting.yml 中设置的 verifyKey
port = 8080                 # 你在 setting.yml 中设置的 port (http)

bot = miraicle.Mirai(qq=qq, verify_key=verify_key, port=port)
# highlight-start
bot.set_filter(miraicle.GroupSwitchFilter(r'config\group_switch.json'))
# highlight-end
bot.run()
```

这意味着你给 bot 启用了群组件开关过滤器，并用 `config\group_switch.json` 文件来记录它的配置。运行程序，程序会自动帮你创建配置文件，目前它里面还没有内容。

现在，你可以尝试在群里触发 bot 的功能，你会发现 bot 没有反应了，而只有当你私聊 bot 的时候它才会对你进行回复。这是因为初始状况下 bot 的每个组件都是关闭的。接下来我们来对这些组件的开关进行控制。

在 `plugin` 文件夹下创建 `group_switch.py` 文件，用来编写组件开关的逻辑：

``` text
miraicle-example
├── config
├── database
│   └── word_cloud.db
├── plugins
│   ├── __init__.py
│   ├── repeat.py
│   ├── hello.py
│   └── word_cloud.py
# highlight-start
│   └── group_switch.py
# highlight-end
└── bot.py
```

并把它加入 `__init__.py` 当中：

``` python title='__init__.py'
__all__ = ['hello', 'repeat', 'word_cloud', 'group_switch']
```

首先在文件中编写以下内容。函数 `group_switch` 被添加了 `@miraicle.Mirai.filter('GroupSwitchFilter')` 装饰器，你可以在这个函数中对群组件开关过滤器 `GroupSwitchFilter` 进行控制。

``` python title='group_switch.py'
import miraicle


@miraicle.Mirai.filter('GroupSwitchFilter')
def group_switch(bot: miraicle.Mirai, msg: miraicle.GroupMessage, flt: miraicle.GroupSwitchFilter):
    ...
```

`GroupSwitchFilter` 提供了以下几种方法可以给你使用：

|  方法  | 效果  |
|  ----  | ----  |
|  `enable(group, func_name)`  |  在群组 `group` 启用名为 `func_name` 的组件  |
|  `disable(group, func_name)`  |  在群组 `group` 禁用名为 `func_name` 的组件  |
|  `enable_all(group)`  |  在群组 `group` 启用所有组件  |
|  `disable_all(group)`  |  在群组 `group` 禁用所有组件  |
|  `funcs_info(group=None)`  |  返回所有组件信息；`group` 参数可选，如果不为空，会额外返回该组件在指定的群是否被打开  |

了解这些方法之后，你就可以在 `group_switch` 函数中对各组件进行开关控制了。接下来我们编写打开和关闭所有组件的功能：

``` python title='group_switch.py'
import miraicle


# highlight-start
my_qq = 987654321   # 你的 QQ 号
# highlight-end


@miraicle.Mirai.filter('GroupSwitchFilter')
def group_switch(bot: miraicle.Mirai, msg: miraicle.GroupMessage, flt: miraicle.GroupSwitchFilter):
    # highlight-start
    if msg.sender == my_qq:
        if msg.plain == '启用所有组件':
            flt.enable_all(group=msg.group)
            bot.send_group_msg(group=msg.group, msg='已在群内启用所有组件', quote=msg.id)
        elif msg.plain == '禁用所有组件':
            flt.disable_all(group=msg.group)
            bot.send_group_msg(group=msg.group, msg='已在群内禁用所有组件', quote=msg.id)
    # highlight-end
```

把 `my_qq` 改为你的 QQ 号。运行程序，在群里发送一条消息：“启用所有组件”，bot 会回复你并在群内启用所有组件。这个时候你再打开 `group_switch.json` 文件，可以看到在这个群中被启用的组件列表：

``` json
{
    "12345678": [
        "hello_to_group",
        "repeat",
        "word_cloud"
    ]
}
```

你也可以手动修改这个文件来控制组件的开关，但是当你修改过后，需要重启 bot ，因为过滤器在被初始化的时候才会从配置文件中读取信息。

## 黑名单

TODO
