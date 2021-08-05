---
sidebar_position: 8
---

# 添加计划任务

`miraicle` 提供了计划任务的功能，可以让 bot 定时执行任务。本节我们来编写一个功能，让 bot 每天早上 8:30 准时向你说“早上好”。

在 `plugin` 目录下新建 `morning.py` 文件：

``` text
miraicle-example
├── config
│   ├── group_switch.json
│   └── blacklist.json
├── database
│   └── word_cloud.db
├── plugins
│   ├── __init__.py
│   ├── repeat.py
│   ├── hello.py
│   ├── word_cloud.py
# highlight-start
│   ├── morning.py
# highlight-end
│   ├── group_switch.py
│   └── blacklist.py
└── bot.py
```

编写代码如下，把 `my_qq` 改为你的 QQ 号。

``` python title='morning.py'
import miraicle


my_qq = 987654321           # 你的 QQ 号


@miraicle.scheduled_job(miraicle.Scheduler.every().day.at('8:30'))
def morning(bot: miraicle.Mirai):
    bot.send_friend_msg(qq=my_qq, msg='早上好')
```

并把这个文件加入到 `__init__.py`：

``` python title='__init__.py'
__all__ = ['hello', 'repeat', 'word_cloud', 'group_switch', 'blacklist', 'morning']
```

这个功能就完成了。注意到，和此前我们编写的插件相比，`morning` 函数缺少了 `msg` 参数。这样写的原因也显而易见，因为它不是由消息触发，而是由时间触发了。

更多用法如下：

``` python
@miraicle.scheduled_job(miraicle.Scheduler.every().second)                  # 每秒触发一次
@miraicle.scheduled_job(miraicle.Scheduler.every(10).seconds)               # 每隔 10s 触发一次
@miraicle.scheduled_job(miraicle.Scheduler.every(30).minutes)               # 每隔 30min 触发一次
@miraicle.scheduled_job(miraicle.Scheduler.every().minute.at('::30'))       # 每分钟的 30s 触发 
@miraicle.scheduled_job(miraicle.Scheduler.every().hour.at(':12:34'))       # 每小时的 12min 34s 触发
@miraicle.scheduled_job(miraicle.Scheduler.every().day.at('20'))            # 每天 20 时触发
@miraicle.scheduled_job(miraicle.Scheduler.every().sunday.at('11:45:14'))   # 每个星期天的 11:45:14 触发
```

你也可以把几个装饰器作用于同一个函数，该任务在这几个时间点均会触发。
