---
sidebar_position: 3
---

# 开始使用

首先启动 `mirai-console` 并登陆你的机器人账号。你可以查看 [`mirai-console`](https://github.com/mamoe/mirai-console) 的文档，或者在 `mirai-console` 中输入 `/help` 来学习如何使用。

现在一切工作已经准备完成，你可以开始动手写自己的 bot 了。打开你最熟悉的编辑器或 IDE ，创建一个名为 `bot.py` 的文件，内容如下：

``` python title='bot.py'
import miraicle


@miraicle.Mirai.receiver('GroupMessage')
def hello_to_group(bot: miraicle.Mirai, msg: miraicle.GroupMessage):
    bot.send_group_msg(group=msg.group, msg='Hello world!')


@miraicle.Mirai.receiver('FriendMessage')
def hello_to_friend(bot: miraicle.Mirai, msg: miraicle.FriendMessage):
    bot.send_friend_msg(qq=msg.sender, msg='Hello world!')


qq = 123456789              # 你登录的机器人 QQ 号
verify_key = 'miraicle'     # 你在 setting.yml 中设置的 verifyKey
port = 8080                 # 你在 setting.yml 中设置的 port (http)

bot = miraicle.Mirai(qq=qq, verify_key=verify_key, port=port)
bot.run()
```

将变量 `qq` 修改为你登录的机器人的 QQ 号，并根据你在 `mirai-api-http` 的配置修改 `verify_key` 和 `port` 的值，然后运行。如果你的设置是正确的，程序会输出类似于这样的内容：

```
method '__http_verify' has called
sessionKey: KT26iQBo
method '__http_bind' has called
method '__http_main_loop' starts
```

打开一个 QQ 群，随便发送一条消息（前提是你的 bot 也在这个群）；或者向 bot 私发一条消息（前提是你已经添加 bot 为好友）。不出意外的话，你会收到 bot 的回复：

```
Hello world!
```

好的，现在可以祝贺，你的 bot 运行成功了！
