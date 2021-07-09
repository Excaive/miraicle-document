---
sidebar_position: 4
---

# 发生了什么

让我们回来再看上一节的这个例子。首先，我们导入了 `miraicle` 包。接着，我们定义了 `hello_to_group` 和 `hello_to_friend` 这两个函数，并使用装饰器 `@miraicle.Mirai.receiver` 来分别修饰它们。注意到，虽然修饰两个函数的装饰器是相同的，但是带了不同的参数。

以 `hello_to_group` 函数为例，当函数被装饰器 `@miraicle.Mirai.receiver` 修饰的时候，`miraicle` 会把这个函数注册到参数 `GroupMessage` 对应的接收器列表。当 `miraicle` 从 `mirai-api-http` 接收到一条类型为 `GroupMessage` 的消息链时，它会首先对消息链进行预处理，封装成 `miraicle.GroupMessage` 对象。然后，`miraicle` 会依次调用 `GroupMessage` 接收器列表中的函数，传入 bot 对象和消息对象。

在 `hello_to_group` 函数中，我们让 bot 对象执行了 `send_group_msg` 方法，这是让 bot 发送一条群消息。`group` 参数代表群号，我们把它赋值为接收到消息的群号；`msg` 参数代表要发送的消息内容，我们传入字符串 'Hello world!'。这样，每当 bot 收到 `GroupMessage` 类型的消息链时，它都会发送 'Hello world!' 作为回应。

类似地，`hello_to_friend` 函数的装饰器参数为 `FriendMessage`，当 bot 接收到好友消息时，它会调用这个函数。

:::info

`miraicle` 支持的消息链类型包括 `GroupMessage`、`FriendMessage` 和 `TempMessage`，分别代表群消息、好友消息和群临时消息，`miraicle` 会把消息链封装成对应的对象。除此之外，你还可以在 `receiver` 的参数中填写各种 [事件类型](https://github.com/project-mirai/mirai-api-http/blob/master/docs/api/EventType.md) ，不过，对于大多数事件类型，`miraicle` 没有对它们进行封装，传入的消息对象是个 `dict`。

:::
