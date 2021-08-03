---
sidebar_position: 2
---

# 人类的本质

调整好项目的结构之后，我们来编写一个复读机插件。

在 `plugins` 文件夹中新建一个 `repeat.py` 文件。现在，你的目录应该像这样：

``` text
miraicle-example
├── plugins
│   ├── __init__.py
# highlight-start
│   ├── repeat.py
# highlight-end
│   └── hello.py
└── bot.py
```

首先来设定一下：如果一条群消息被重复了 3 次，这个时候 bot 就会对这条消息进行复读。

按照这样的思路，我们可以写出以下代码：

``` python title='repeat.py'
import miraicle

msg_repeat = None
repeat_times = 0


@miraicle.Mirai.receiver('GroupMessage')
def repeat(bot: miraicle.Mirai, msg: miraicle.GroupMessage):
    global msg_repeat, repeat_times
    if msg == msg_repeat:
        repeat_times += 1
    else:
        msg_repeat = msg
        repeat_times = 1
    if repeat_times == 3:
        bot.send_group_msg(group=msg.group, msg=msg)
```

:::info

`GroupMessage`、`FriendMessage` 和 `TempMessage` 类均继承自 `Message` 类。而 `Message` 对等号做了重载：只要两个 `Message` 对象中的消息链列表相等，这两条消息就会被认为是相等的，而不用考虑它们是否在同一时间，由同一个账号发送。

:::

在 `__init__.py` 文件中加入这个插件：

``` python title='__init__.py'
__all__ = ['hello', 'repeat']
```

运行程序。当你在群里重复发送 3 次相同的消息，你的 bot 也会跟着复读了。

然而，你也许发现了，这样的复读是对 bot 接收到的所有群消息进行的。这意味着，如果你和你的 bot 同时在 A、B、C 3 个群里，你在 A 群发送了一条消息，接着先后在 B 群、C 群发送了同样的消息，bot 会在 C 群对这条消息进行复读。再比如说，当某个群里一条消息被重复了 2 次，突然另一个群里来了一条消息，第一个群里的复读就被打断了。也就是说，现在这个 bot 的复读是跨群的，这样显然不合常理。

我们可以使用一个字典来记录每个群内正在重复的消息，以及重复的次数。一旦某个群内同一条消息重复 3 次，bot 就会复读这条消息。修改后的代码如下：

``` python title='repeat.py'
import miraicle

# highlight-start
msg_dict = {}
# highlight-end


@miraicle.Mirai.receiver('GroupMessage')
def repeat(bot: miraicle.Mirai, msg: miraicle.GroupMessage):
    # highlight-start
    group = msg.group
    if group not in msg_dict:
        msg_dict[group] = {'msg_repeat': msg, 'repeat_times': 1}
    elif msg_dict[group]['msg_repeat'] == msg:
        msg_dict[group]['repeat_times'] += 1
    else:
        msg_dict[group] = {'msg_repeat': msg, 'repeat_times': 1}
    if msg_dict[group]['repeat_times'] == 3:
        # highlight-end
        bot.send_group_msg(group=msg.group, msg=msg)
```

怎么样，现在你的 bot 是不是离人类的本质又近了一步？
