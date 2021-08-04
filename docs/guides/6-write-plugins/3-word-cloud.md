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

``` text
miraicle-example
# highlight-start
├── database
│   └── word_cloud.db
# highlight-end
├── plugins
│   ├── __init__.py
│   ├── repeat.py
│   ├── hello.py
# highlight-start
│   └── word_cloud.py
# highlight-end
└── bot.py
```

### 读写数据

我们来给这个功能设定一个触发词，当在群里发送以触发词为内容的消息时，bot 将从数据库中查找这个群内发送过的消息，进行分词并绘制词云；否则，bot 会将这条消息存入数据库：

``` python title='word_cloud.py'
import miraicle


@miraicle.Mirai.receiver('GroupMessage')
def word_cloud(bot: miraicle.Mirai, msg: miraicle.GroupMessage):
    if msg.plain == '本群词云':
        # TODO: 从数据库中查找本群消息，进行分词并绘制词云
        ...

    elif msg.plain:
        # TODO: 将消息数据存入数据库
        ...
```

接着，连接数据库，通过传递 SQL 语句，来实现数据的读写：

``` python title='word_cloud.py'
import miraicle
# highlight-start
import sqlite3
# highlight-end


@miraicle.Mirai.receiver('GroupMessage')
def word_cloud(bot: miraicle.Mirai, msg: miraicle.GroupMessage):
    if msg.plain == '本群词云':
        # highlight-start
        connect = sqlite3.connect(r'database\word_cloud.db')
        cursor = connect.cursor()
        execute_text = 'SELECT msg FROM msgs WHERE group_id = ?'
        content = (msg.group,)
        results = cursor.execute(execute_text, content).fetchall()
        results = [r[0] for r in results]
        # highlight-end

        # TODO: 进行分词并绘制词云

    elif msg.plain:
        # highlight-start
        connect = sqlite3.connect(r'database\word_cloud.db')
        cursor = connect.cursor()
        execute_text = 'INSERT INTO msgs(time, sender_id, group_id, msg) VALUES(?, ?, ?, ?)'
        content = (msg.time, msg.sender, msg.group, msg.plain)
        cursor.execute(execute_text, content)
        connect.commit()
        # highlight-end
```

:::info

`sqlite3` 模块支持使用 `?` 占位符来传递参数。如果没有使用占位符，而是通过格式化方法直接把参数写入字符串，则有可能会发生注入：如果消息中带有 `,` 或 `)` 符号，插入语句就会执行出错了。

:::

### 分词

从数据库获取到消息之后，就可以对它们进行分词了。你可以查阅 [`jieba`](https://github.com/fxsjy/jieba) 的文档来了解它的用法。分词完成后，使用一个字典来记录每个词语出现的次数：

``` python title='word_cloud.py'
import miraicle
import sqlite3
# highlight-start
import jieba
from collections import defaultdict
# highlight-end


@miraicle.Mirai.receiver('GroupMessage')
def word_cloud(bot: miraicle.Mirai, msg: miraicle.GroupMessage):
    if msg.plain == '本群词云':
        connect = sqlite3.connect(r'database\word_cloud.db')
        cursor = connect.cursor()
        execute_text = 'SELECT msg FROM msgs WHERE group_id = ?'
        content = (msg.group,)
        results = cursor.execute(execute_text, content).fetchall()
        results = [r[0] for r in results]

        # highlight-start
        counts = defaultdict(int)
        for result in results:
            words = jieba.cut(result, cut_all=True)
            for word in words:
                if word and not word.isspace():
                    counts[word] += 1
        # highlight-end

        # TODO: 绘制词云

    elif msg.plain:
        connect = sqlite3.connect(r'database\word_cloud.db')
        cursor = connect.cursor()
        execute_text = 'INSERT INTO msgs(time, sender_id, group_id, msg) VALUES(?, ?, ?, ?)'
        content = (msg.time, msg.sender, msg.group, msg.plain)
        cursor.execute(execute_text, content)
        connect.commit()
```

:::info

`Python` 中通过 `key` 来访问字典，当 `key` 不存在时，会引发 `KeyError` 异常。如果使用普通的字典，需首先判断这个词语是否在字典中出现过，然后才能进一步操作。我们使用了一种简化的方法，使用 `defaultdict` 来替代普通的字典，参数 `default_factory` 设为 `int`。当 `key` 不存在时， `default_factory` 会调用 `int()` 为其提供一个默认值 0。

:::

:::info

我们在记录词语的出现次数之前，做了一个判断：如果 `word` 为空字符串或全部由空格组成的字符串，不对其进行统计。这是因为后续在绘制词云时，空字符串会使 `wordcloud` 库抛出异常，无法绘制；空格组成的字符串会使词云图片中出现大量空白，影响观感。

:::

### 绘制词云

接下来就是绘制词云了。`wordcloud` 的 [文档](http://amueller.github.io/word_cloud/auto_examples/index.html) 提供了丰富的示例，你可以自己选择喜欢的图片，为词云提供轮廓和配色。这里我们用最小示例来演示。

需要注意的是，`wordcloud` 采用的默认字体是 `DroidSansMono.ttf`。这款字体不支持中文，所以需手动指定一款中文字体，这里我们选择黑体（`simhei.ttf`）。

``` python title='word_cloud.py'
import miraicle
import sqlite3
import jieba
# highlight-start
import wordcloud
import matplotlib.pyplot as plt
# highlight-end
from collections import defaultdict


@miraicle.Mirai.receiver('GroupMessage')
def word_cloud(bot: miraicle.Mirai, msg: miraicle.GroupMessage):
    if msg.plain == '本群词云':
        connect = sqlite3.connect(r'database\word_cloud.db')
        cursor = connect.cursor()
        execute_text = 'SELECT msg FROM msgs WHERE group_id = ?'
        content = (msg.group,)
        results = cursor.execute(execute_text, content).fetchall()
        results = [r[0] for r in results]

        counts = defaultdict(int)
        for result in results:
            words = jieba.cut(result, cut_all=True)
            for word in words:
                if word and not word.isspace():
                    counts[word] += 1

        # highlight-start
        cloud = wordcloud.WordCloud(background_color='white', repeat=True, font_path='simhei.ttf')
        cloud.generate_from_frequencies(counts)
        figure = plt.figure(figsize=(16, 9))
        plt.axis('off')
        plt.imshow(cloud, interpolation='bilinear')
        # highlight-end
        
        # TODO: 发送图片

    elif msg.plain:
        connect = sqlite3.connect(r'database\word_cloud.db')
        cursor = connect.cursor()
        execute_text = 'INSERT INTO msgs(time, sender_id, group_id, msg) VALUES(?, ?, ?, ?)'
        content = (msg.time, msg.sender, msg.group, msg.plain)
        cursor.execute(execute_text, content)
        connect.commit()
```

### 发送消息

最后，把绘制好的词云发送到群里。在 `miraicle` 中，`Image` 类有 `path`、`url`、`image_id`、`base64` 四种属性，填写其中任意一个均可以构造有效的 `Image` 对象。这里我们选择使用 `base64` 来构造。`Image` 类提供了工厂方法 `from_base64`，把词云图片的字节串用 `base64` 编码后传入该方法即可。

我们依然使用 `send_group_msg` 方法来让 bot 发送消息。可以把 `quote` 参数指定为传入消息的 `id`，bot 会对这条消息进行回复。

由于生成词云的时间可能较长，可以让 bot 在收到触发词后，先回复一句 “正在生成本群词云”。完整代码如下：

``` python title='word_cloud.py'
import miraicle
# highlight-start
import io
import base64
# highlight-end
import sqlite3
import jieba
import wordcloud
import matplotlib.pyplot as plt
from collections import defaultdict


@miraicle.Mirai.receiver('GroupMessage')
def word_cloud(bot: miraicle.Mirai, msg: miraicle.GroupMessage):
    if msg.plain == '本群词云':
        connect = sqlite3.connect(r'database\word_cloud.db')
        cursor = connect.cursor()
        # highlight-start
        bot.send_group_msg(msg.group, '正在生成本群词云', quote=msg.id)
        # highlight-end
        execute_text = 'SELECT msg FROM msgs WHERE group_id = ?'
        content = (msg.group,)
        results = cursor.execute(execute_text, content).fetchall()
        results = [r[0] for r in results]

        counts = defaultdict(int)
        for result in results:
            words = jieba.cut(result, cut_all=True)
            for word in words:
                if word and not word.isspace():
                    counts[word] += 1

        cloud = wordcloud.WordCloud(background_color='white', repeat=True, font_path='simhei.ttf')
        cloud.generate_from_frequencies(counts)
        figure = plt.figure(figsize=(16, 9))
        plt.axis('off')
        plt.imshow(cloud, interpolation='bilinear')
        
        # highlight-start
        with io.BytesIO() as buffer:
            figure.canvas.print_png(buffer)
            binary_data = buffer.getvalue()
            base64_data = base64.b64encode(binary_data)
        bot.send_group_msg(msg.group, [miraicle.Image.from_base64(base64_data)], quote=msg.id)
        # highlight-end

    elif msg.plain:
        connect = sqlite3.connect(r'database\word_cloud.db')
        cursor = connect.cursor()
        execute_text = 'INSERT INTO msgs(time, sender_id, group_id, msg) VALUES(?, ?, ?, ?)'
        content = (msg.time, msg.sender, msg.group, msg.plain)
        cursor.execute(execute_text, content)
        connect.commit()
```

:::info

使用 `Image.from_base64` 方法时，你可以选择传入 `bytes` 或 `str` 类型的参数。 `byte` 类型的参数代表图片的 `base64` 编码，会直接给 `base64` 属性赋值；`str` 类型的参数会被认为是图片所在的路径，该方法会自动帮你读取图片、编码并给 `base64` 属性赋值。所以你也可以先把词云图片保存下来，使用它的路径来构造 `Image` 对象。

:::

别忘了在 `__init__.py` 文件中加入 `word_cloud`：

``` python title='__init__.py'
__all__ = ['hello', 'repeat', 'word_cloud']
```

现在，词云插件编写完成了。在群里发送一句“本群词云”，看看 bot 给你的回复吧！