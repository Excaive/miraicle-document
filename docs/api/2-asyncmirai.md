---
sidebar_position: 2
---

# asyncmirai

## *class* `AsyncMirai`

### `__init__(qq, verify_key, port, session_key=None, adapter='http')`

- **说明：** 创建一个 `AsyncMirai` 对象

- **参数：**

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `qq`  |  `int`  |  要绑定的 bot 的 qq 号  |
|  `verify_key`  |  `str`  |  创建 `mirai-http-server` 时生成的 key, 在 `mirai-api-http` 的 `setting` 文件中手动指定  |
|  `port`  |  `int`  |  端口号，在 `mirai-api-http` 的 `setting` 文件中手动指定  |
|  `session_key`  |  `Optional[str]`  |  经过校验得到的 session 号，可选  |
|  `adapter`  |  `str`  |  连接方式，支持 http 和 ws，默认为 http  |

###  *coroutine* `version()`

- **说明：** 获取 `mirai-api-http` 的版本号

### `run()`

- **说明：** 开始运行

### *coroutine* `send_friend_msg(qq, msg)`

- **说明：** 发送好友消息

- **参数：**

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  qq  |  `int`  |  发送消息目标好友的 QQ 号  |
|  msg  |  消息链列表  |  发送的消息  |

- **返回：** `mirai-api-http` 的响应

### *coroutine* `send_temp_msg(group, qq, msg)`

- **说明：** 发送临时会话消息

- **参数：**

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  group  |  `int`  |  临时会话群号  |
|  qq  |  `int`  |  临时会话对象 QQ 号  |
|  msg  |  消息链列表  |  发送的消息  |

- **返回：** `mirai-api-http` 的响应

### *coroutine* `send_group_msg(group, msg, quote=None)`

- **说明：** 发送群消息

- **参数：**

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  group  |  `int`  |  发送消息目标群的群号  |
|  msg  |  消息链列表  |  发送的消息  |
|  quote  |  `Optional[int]`  |  引用一条消息的 `messageId` 进行回复  |

- **返回：** `mirai-api-http` 的响应

### *coroutine* `recall(id)`

- **说明：** 撤回消息

- **参数：**

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `id`  |  `int`  |  需要撤回的消息的 `messageId`  |

- **返回：** `mirai-api-http` 的响应

### *coroutine* `friend_list()`

- **说明：** 获取好友列表

- **返回：** 好友列表

### *coroutine* `group_list()`

- **说明：** 获取群列表

- **返回：** 群列表

### *coroutine* `member_list(group)`

- **说明：** 获取群成员列表

- **参数：**

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `group`  |  `int`  |  群号  |

- **返回：** 群成员列表

### *coroutine* `session_info()`

- **说明：** 获取 session 信息

- **返回：** session 信息

### *coroutine* `bot_profile()`

- **说明：** 获取 bot 资料

- **返回：** bot 资料

### *coroutine* `friend_profile()`

- **说明：** 获取好友资料

- **参数：**

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `qq`  |  `int`  |  好友 QQ 号  |

- **返回：** 好友资料

### *coroutine* `member_profile(group, qq)`

- **说明：** 获取群员资料

- **参数：**

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `group`  |  `int`  |  指定群的群号  |
|  `qq`  |  `int`  |  群员 QQ 号  |

- **返回：** 群员资料

### *coroutine* `upload_img(img, type='group')`

- **说明：** 图片文件上传，当前仅支持 http

- **参数：**

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `img`  |  `miraicle.Image`  |  上传的 `Image` 对象  |
|  `type`  |  `str`  |  'friend' 或 'group' 或 'temp'，默认为 'group'  |

- **返回：** 图片的 `imageId`, `url` 和 `path`

### *coroutine* `upload_voice(voice, type='group')`

- **说明：** 语音文件上传，当前仅支持 http

- **参数：**

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `voice`  |  `miraicle.Voice`  |  上传的 `Voice` 对象  |
|  `type`  |  `str`  |  当前仅支持 'group'  |

- **返回：** 语音的 `VoiceId`, `url` 和 `path`

### *coroutine* `upload_file_and_send(path, group, file, type='Group')`

- **说明：** 文件上传，当前仅支持 http

- **参数：**

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `path`  |  `str`  |  文件上传目录与名字  |
|  `group`  |  `int`  |  指定群的群号  |
|  `file`  |    |  文件内容  |
|  `type`  |  `str`  |  当前仅支持 `Group`  |

- **返回：** `mirai-api-http` 的响应

### *coroutine* `mute(group, qq, time)`

- **说明：** 禁言群成员

- **参数：**

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `group`  |  `int`  |  指定群的群号  |
|  `qq`  |  `int`  |  指定群员 QQ 号  |
|  `time`  |  `int`  |  禁言时长，单位为秒，最多 30 天  |

- **返回：** `mirai-api-http` 的响应

### *coroutine* `unmute(group, qq)`

- **说明：** 解除群成员禁言

- **参数：**

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `group`  |  `int`  |  指定群的群号  |
|  `qq`  |  `int`  |  指定群员 QQ 号  |

- **返回：** `mirai-api-http` 的响应

### *coroutine* `kick(group, qq, msg='')`

- **说明：** 移除群成员

- **参数：**

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `group`  |  `int`  |  指定群的群号  |
|  `qq`  |  `int`  |  指定群员 QQ 号  |
|  `msg`  |  `str`  |  信息  |

- **返回：** `mirai-api-http` 的响应

### *coroutine* `quit(group)`

- **说明：** 退出群聊

- **参数：**

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `group`  |  `int`  |  退出的群号  |

- **返回：** `mirai-api-http` 的响应

### *coroutine* `mute_all(group)`

- **说明：** 全体禁言

- **参数：**

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `group`  |  `int`  |  指定群的群号  |

- **返回：** `mirai-api-http` 的响应

### *coroutine* `unmute_all(group)`

- **说明：** 解除全体禁言

- **参数：**

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `group`  |  `int`  |  指定群的群号  |

- **返回：** `mirai-api-http` 的响应

### *coroutine* `file_list(dir_id=None, group=None, qq=None, with_download_info=False)`

- **说明：** 获取文件列表，目前仅支持群文件的操作

- **参数：**

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `dir_id`  |  `Optional[str]`  |  文件夹 id，空为根目录，默认为 `None`  |
|  `group`  |  `Optional[int]`  |  群号，可选  |
|  `qq`  |  `Optional[int]`  |  好友 QQ 号，可选  |
|  `with_download_info`  |  `bool`  |  是否携带下载信息，额外请求，无必要不要携带  |

- **返回：** 文件列表

### *coroutine* `file_info(file, group=None, qq=None, with_download_info=False)`

- **说明：** 获取文件信息

- **参数：**

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `file`  |  `Union[File, str]`  |  文件对象或文件唯一ID  |
|  `group`  |  `Optional[int]`  |  群号，可选  |
|  `qq`  |  `Optional[int]`  |  好友 QQ 号，可选  |
|  `with_download_info`  |  `bool`  |  是否携带下载信息，额外请求，无必要不要携带  |

- **返回：** 文件信息

###  *coroutine* `is_owner(qq, group)`

- **说明：** 判断某成员在指定群内是否为群主

- **参数：**

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `qq`  |  `int`  |  指定群员 QQ 号  |
|  `group`  |  `int`  |  指定群的群号  |

- **返回：** `bool` 类型，某成员在指定群内是否为群主

###  *coroutine* `is_administrator(qq, group)`

- **说明：** 判断某成员在指定群内是否为管理员

- **参数：**

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `qq`  |  `int`  |  指定群员 QQ 号  |
|  `group`  |  `int`  |  指定群的群号  |

- **返回：** `bool` 类型，某成员在指定群内是否为管理员

### *decorator* `receiver`

- **说明：** 接收器，被该装饰器装饰的函数响应某一类型的消息

- **参数：**

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `msg_type`  |  `str`  |  响应的消息类型  |

### *decorator* `filter`

- **说明：** 过滤器

- **参数：**

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `filter_type`  |  `str`  |  过滤器类型  |

###  `set_filter(flt)`

- **说明：** 设置过滤器

- **参数：**

|  参数  |  类型  | 说明  |
|  ----  |  ----  |  ----  |
|  `flt`  |  `miraicle.BaseFilter`  |  要设置的过滤器  |
