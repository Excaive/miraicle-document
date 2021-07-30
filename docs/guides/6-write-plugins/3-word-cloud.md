---
sidebar_position: 3
---

# 本群词云

得益于 `Python` 丰富的第三方库，你可以编写出具有各种复杂功能的机器人。在这一节中，我们来让 bot 收集群里的消息，并绘制出这个群的词云。

## 分析流程

我们来构思一下整个流程。

首先，需要把 bot 接收到的群消息储存起来，这一步需要一个数据库。`Python` 内置了 `sqlite3` 模块，提供了对 `SQLite` 数据库的支持，我们可以直接使用。当然，如果用文本文件来存储消息内容也不是不可以，但是你就要手动去维护索引了。

我们储存在数据库中的是一整段的消息，为了绘制词云，还需要按照语义对它们进行分词，统计每个词语出现的频数。这一步我们使用中文分词库 `jieba`，你可以使用以下命令来安装它：

``` bash
pip install jieba
```

然后就是绘制词云了，可以用 `wordcloud` 库来生成，使用以下命令来安装它：

``` bash
pip install wordcloud
```

## 创建数据库

`miraicle` 中为 `GroupMessage` 提供了很多种属性，除了消息的文字内容，你还可以获取消息的发送者、发送的群、发送时刻的时间戳等。这些属性都可以保存在数据库中。

不过，使用哪一个属性作为主键呢？数据库要求每条记录有唯一的主键，而以上属性似乎都不能保证是唯一的。如果你在使用 `miraicle` 的时候注意过控制台输出的内容，你可能知道每条消息都有一个 `id`，使用它作为主键行不行？在同一个群中，消息的 `id` 是递增的，因此具有唯一性；然而如果是两个不同的群，也有可能出现相同的 `id`。

我们可以额外设定一个主键，当插入新记录的时候进行主键自增：

``` python title='create_db.py'
import sqlite3


connect = sqlite3.connect('word_cloud.db')
cursor = connect.cursor()
cursor.execute(
    'CREATE TABLE msgs'
    '(id        INTEGER PRIMARY KEY autoincrement,'
    'time       INT,'
    'sender_id  INT,'
    'group_id   INT,'
    'msg        TEXT)')

connect.commit()
connect.close()
```

当你运行这个程序，程序所在目录下会生成一个 `word_cloud.db` 文件，这就是你创建的数据库。

## 编写功能

现在我们可以开始编写真正的功能了。和之前一样，编写新功能的时候，在 `plugins` 文件夹中新建一个文件，我们把它命名为 `word_cloud.py`。再新建一个文件夹，把刚才生成的 `word_cloud.db` 移动到里面。你的目录变成了这样：

```
miraicle-example
├── database
│   └── word_cloud.db
├── plugins
│   ├── __init__.py
│   ├── repeat.py
│   ├── hello.py
│   └── word_cloud.py
└── bot.py
```

TODO
