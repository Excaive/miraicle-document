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

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `text`  |  `str`  |  消息内容  |

构造方法：

``` python
miraicle.Plain('Hello world!')
```

## At

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `qq`  |  `int`  |  at 的群员的 QQ 号  |
|  `display`  |  `str`  |  at 时显示的文字，可选，仅接收消息时有效；发送消息时无效，自动显示群名片  |

构造方法：

``` python
miraicle.At('Hello world!')
```

## At 全体成员 (AtAll)

构造方法：

``` python
miraicle.AtAll()
```

## 表情 (Face)

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `face_id`  |  `int`  |  QQ 表情编号，可选，优先高于 `name`  |
|  `name`  |  `str`  |  QQ 表情名称，可选  |

构造方法：

``` python
miraicle.Face(face_id=74)
miraicle.Face(name='太阳')
```

你也可以使用 `Face` 类提供的静态工厂方法 `from_face_id` 或 `from_name` 来构造 `Face` 对象：

``` python
miraicle.Face.from_face_id(74)
miraicle.Face.from_name('太阳')
```

## 图片 (Image)

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `path`  |  `str`  |  图片的路径，发送本地图片，相对路径于 `data\net.mamoe.mirai-api-http\images`  |
|  `url`  |  `str`  |  图片的 `url`，发送时可作网络图片的链接；接收时为腾讯图片服务器的链接，可用于图片下载  |
|  `image_id`  |  `str`  |  图片的 `image_id`，群图片与好友图片格式不同  |
|  `base64`  |  `bytes` 或 `str`  |  如果是 `bytes` 则为图片的 `base64` 编码，如果是 `str` 则为图片路径，`miraicle` 会读取图片并以 `base64` 的形式编码；接收时为空  |

构造方法：

``` python
miraicle.Image(path='a.png')                # 该文件在 `data\net.mamoe.mirai-api-http\images` 目录下
miraicle.Image(url='https://github.com/mamoe/mirai/blob/dev/docs/mirai.png')    # 发送网络图片
miraicle.Image(url=r'file:\\\D:\b.gif')     # 发送本地图片，只能用绝对路径，前缀 `file:\\\` 不可省略
miraicle.Image(image_id='{B407F708-A2C6-A506-3420-98DF7CAC4A57}.jpg')           # 使用 image_id 发送图片
miraicle.Image(base64=base64.b64encode(open('c.png', 'rb').read()))             # 使用 base64 发送图片
miraicle.Image(base64='c.png')              # miraicle 读取图片并以 base64 的形式编码发送
```

你也可以使用 `Image` 类提供的静态工厂方法 `from_file`、`from_url`、`from_id` 或 `from_base64` 来构造 `Image` 对象：

``` python
miraicle.Image.from_file('a.jpg')
miraicle.Image.from_url('https://github.com/mamoe/mirai/blob/dev/docs/mirai.png')
miraicle.Image.from_url(r'file:\\\D:\b.gif')
miraicle.Image.from_id('{B407F708-A2C6-A506-3420-98DF7CAC4A57}.jpg')
miraicle.Image.from_base64(base64.b64encode(open('c.png', 'rb').read()))
miraicle.Image.from_base64('c.png')
```

## 闪照 (FlashImage)

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `path`  |  `str`  |  图片的路径，发送本地图片，相对路径于 `data\net.mamoe.mirai-api-http\images`  |
|  `url`  |  `str`  |  图片的 `url`，发送时可作网络图片的链接；接收时为腾讯图片服务器的链接，可用于图片下载  |
|  `image_id`  |  `str`  |  图片的 `image_id`，群图片与好友图片格式不同  |
|  `base64`  |  `bytes` 或 `str`  |  如果是 `bytes` 则为图片的 `base64` 编码，如果是 `str` 则为图片路径，`miraicle` 会读取图片并以 `base64` 的形式编码；接收时为空  |

构造方法：

``` python
miraicle.FlashImage(path='a.png')                # 该文件在 `data\net.mamoe.mirai-api-http\images` 目录下
miraicle.FlashImage(url='https://github.com/mamoe/mirai/blob/dev/docs/mirai.png')    # 发送网络图片
miraicle.FlashImage(url=r'file:\\\D:\b.gif')     # 发送本地图片，只能用绝对路径，前缀 `file:\\\` 不可省略
miraicle.FlashImage(image_id='{B407F708-A2C6-A506-3420-98DF7CAC4A57}.jpg')           # 使用 image_id 发送图片
miraicle.FlashImage(base64=base64.b64encode(open('c.png', 'rb').read()))             # 使用 base64 发送图片
miraicle.FlashImage(base64='c.png')              # miraicle 读取图片并以 base64 的形式编码发送
```

你也可以使用 `FlashImage` 类提供的静态工厂方法 `from_file`、`from_url`、`from_id` 或 `from_base64` 来构造 `FlashImage` 对象：

``` python
miraicle.FlashImage.from_file('a.jpg')
miraicle.FlashImage.from_url('https://github.com/mamoe/mirai/blob/dev/docs/mirai.png')
miraicle.FlashImage.from_url(r'file:\\\D:\b.gif')
miraicle.FlashImage.from_id('{B407F708-A2C6-A506-3420-98DF7CAC4A57}.jpg')
miraicle.FlashImage.from_base64(base64.b64encode(open('c.png', 'rb').read()))
miraicle.FlashImage.from_base64('c.png')
```

## 语音 (Voice)

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `path`  |  `str`  |  语音的路径，发送本地语音，相对路径于 `data\net.mamoe.mirai-api-http\voices`  |
|  `url`  |  `str`  |  语音的 `url`，发送时可作网络语音的链接；接收时为腾讯语音服务器的链接，可用于语音下载  |
|  `voice_id`  |  `str`  |  语音的 `voice_id`  |
|  `base64`  |  `bytes` 或 `str`  |  如果是 `bytes` 则为语音的 `base64` 编码，如果是 `str` 则为语音路径，`miraicle` 会读取语音并以 `base64` 的形式编码；接收时为空  |

构造方法：

``` python
miraicle.Voice(path='a.amr')                # 该文件在 `data\net.mamoe.mirai-api-http\voices` 目录下
miraicle.Voice(url='https://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')               # 发送网络语音
miraicle.Voice(url=r'file:\\\D:\b.amr')     # 发送本地语音，只能用绝对路径，前缀 `file:\\\` 不可省略
miraicle.Voice(voice_id='23C477720A37FEB6A9EE4BCCF654014F.amr')             # 使用 image_id 发送语音
miraicle.Voice(base64=base64.b64encode(open('c.wav', 'rb').read()))         # 使用 base64 发送语音
miraicle.Voice(base64='c.wav')              # miraicle 读取语音并以 base64 的形式编码发送
```

你也可以使用 `Voice` 类提供的静态工厂方法 `from_file`、`from_url`、`from_id` 或 `from_base64` 来构造 `Voice` 对象：

``` python
miraicle.Voice.from_file('a.amr')
miraicle.Voice.from_url('https://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
miraicle.Voice.from_url(r'file:\\\D:\b.amr')
miraicle.Voice.from_id('23C477720A37FEB6A9EE4BCCF654014F.amr')
miraicle.Voice.from_base64(base64.b64encode(open('c.wav', 'rb').read()))
miraicle.Voice.from_base64('c.wav')
```

## Xml

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `xml`  |  `str`  |  `xml` 文本  |

## Json

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `json`  |  `str`  |  `json` 文本  |

## App

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `content`  |  `str`  |  内容  |

## Poke

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `name`  |  `str`  |  戳一戳的类型  |

## 骰子 (Dice)

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `value`  |  `int`  |  骰子点数，范围 1 ~ 6，如果不指定则随机生成  |

构造方法：
``` python
miraicle.Dice()
miraicle.Dice(6)
```

## 文件 (File)

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `file_id`  |  `str`  |  文件识别 id  |
|  `name`  |  `str`  |  文件名  |
|  `size`  |  `int`  |  文件大小  |

## mirai 码 (MiraiCode)

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `code`  |  `str`  |  mirai 码  |

构造方法：
``` python
mirai.MiraiCode('Hello world![mirai:face:74][mirai:atall]')
```

你可以通过阅读 `mirai` 的 [文档](https://github.com/mamoe/mirai/blob/dev/docs/Messages.md#mirai-%E7%A0%81) 来了解 mirai 码的组成。
