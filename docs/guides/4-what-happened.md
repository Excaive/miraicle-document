---
sidebar_position: 4
---

# 发生了什么？

## 创建 Mirai 实例

让我们回来再看上一节的这个例子。

``` python
bot = miraicle.Mirai(qq=qq, verify_key=verify_key, port=port)
bot.run()
```

我们创建了一个 `Mirai` 实例，传入了 `qq`、`verify_key` 和 `port` 参数，并让它执行了 `run` 方法。它会和 `mirai-api-http` 建立连接，获取最近的事件和消息。

:::info

`run` 是个阻塞的方法，这意味着如果你的程序写在这条语句的后面，它将无法执行。

:::

在默认的情况下，`miraicle` 是通过 `http` 的方式与 `mirai-api-http` 进行连接的。 `miraicle` 通过每隔一段时间向 `mirai-api-http` 发送请求，即轮询的方式，从而接收消息。

:::info

`miraicle` 提供了多种连接方式，并进行模块化分离成 `adapter`，你可以在 `mirai-api-http` 的配置文件中进行修改。`miraicle` 实现了其中的两种连接方式：`http` 和 `ws`。

:::

如果你希望通过 `ws` 的方式和 `mirai-api-http` 连接，可以这样做：

``` python
bot = miraicle.Mirai(qq=qq, verify_key=verify_key, port=port, adapter='ws')
```

## 接收器

``` python
@miraicle.Mirai.receiver('GroupMessage')
def hello_to_group(bot: miraicle.Mirai, msg: miraicle.GroupMessage):
    bot.send_group_msg(group=msg.group, msg='Hello world!')


@miraicle.Mirai.receiver('FriendMessage')
def hello_to_friend(bot: miraicle.Mirai, msg: miraicle.FriendMessage):
    bot.send_friend_msg(qq=msg.sender, msg='Hello world!')
```

我们定义了 `hello_to_group` 和 `hello_to_friend` 这两个函数，并使用装饰器 `@miraicle.Mirai.receiver` 来分别装饰它们。注意到，两个函数的装饰器是相同的，但是它们带了不同的参数。

以 `hello_to_group` 函数为例，当函数被装饰器 `@miraicle.Mirai.receiver` 装饰的时候，`miraicle` 会把这个函数注册到参数 `GroupMessage` 对应的接收器列表。这意味着每当 `miraicle` 接收到一条群消息，都会把消息交给这个函数来处理。

当 `miraicle` 接收到一条类型为 `GroupMessage` 的消息链时，它会首先对消息链进行预处理，封装成 `miraicle.GroupMessage` 对象。然后，`miraicle` 会依次调用 `GroupMessage` 接收器列表中的函数，传入 bot 对象和消息对象来执行它。

在 `hello_to_group` 函数中，我们让 bot 对象执行了 `send_group_msg` 方法，这是让 bot 发送一条群消息。`group` 参数代表群号，我们把它赋值为接收到消息的群号；`msg` 参数代表要发送的消息内容，我们传入字符串 'Hello world!'。这样，每当 bot 收到 `GroupMessage` 类型的消息链时，它都会发送 'Hello world!' 作为回应。

类似地，`hello_to_friend` 函数的装饰器参数为 `FriendMessage`，当 bot 接收到好友消息时，它会调用这个函数。

:::info

`miraicle` 支持的消息链类型包括 `GroupMessage`、`FriendMessage` 和 `TempMessage`，分别代表群消息、好友消息和群临时消息，`miraicle` 会把消息链封装成对应的对象。除此之外，你还可以在 `receiver` 的参数中填写各种 [事件类型](https://github.com/project-mirai/mirai-api-http/blob/master/docs/api/EventType.md) ，不过，对于大多数事件类型，`miraicle` 没有对它们进行封装，传入的消息对象是个 `dict`。

:::
