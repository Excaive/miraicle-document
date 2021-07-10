---
sidebar_position: 5
---

# 消息链

我们已经成功地让 bot 发送文字消息。那么，如何让 bot 发送带有表情、图片的更加复杂的消息呢？看完本节之后，你会得到答案。

可能你注意到了，上一节中已经提到了“消息链”这个名词。在 `mirai` 的设计中，消息不是一串字符，而是由文字、表情、图片等消息元素组成的列表。

`miraicle` 也沿用了这样的设计。你可以使用 `msg.chain` 来访问消息对象对应的消息链，它是一个装有各种消息元素的列表，这些消息元素均继承自 `Element`。

当你让 bot 发送消息时，也可以构造一个这样的列表。让我们来把上一节中的 `hello_to_group` 函数改写一下：

``` python
@miraicle.Mirai.receiver('GroupMessage')
def hello_to_group(bot: miraicle.Mirai, msg: miraicle.GroupMessage):
    if msg.plain in ['Hello', 'hello']:
        bot.send_group_msg(group=msg.group, msg=[miraicle.Plain('Hello world!'),
                                                 miraicle.Face().from_face_id(74),
                                                 miraicle.At(qq=msg.sender)])
```

我们不希望 bot 对群里每一条消息都做回应，造成刷屏，所以我们使用了一条选择语句。现在，只有当消息的文字内容为 'Hello' 或 'hello' 的时候，bot 才会响应。

运行程序，试着在群里向 bot 问好。bot 会发送带有表情的 'Hello world!'，并 at 你。

下面对各种消息元素进行介绍，你可以使用这些消息元素，构造更加复杂的消息链。

## 文字 (Plain)

TODO

## At

TODO

## At 全体成员 (AtAll)

TODO

## 表情 (Face)

TODO

## 图片 (Image)

TODO

## 闪照 (FlashImage)

TODO

## 语音 (Voice)

TODO

## Xml

TODO

## Json

TODO

## App

TODO

## Poke

TODO

## 骰子 (Dice)

TODO

## 文件 (File)

TODO
