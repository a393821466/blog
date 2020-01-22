-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2020 年 01 月 22 日 19:04
-- 服务器版本: 5.5.53
-- PHP 版本: 5.4.45

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `blog_db`
--

-- --------------------------------------------------------

--
-- 表的结构 `blog_article`
--

CREATE TABLE IF NOT EXISTS `blog_article` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '文章ID',
  `title` varchar(180) NOT NULL COMMENT '文章标题',
  `menuId` int(11) NOT NULL COMMENT '文章所属',
  `autor` varchar(80) DEFAULT NULL COMMENT '作者',
  `summary` text COMMENT '文章摘要',
  `status` int(11) NOT NULL COMMENT '启用(1,是2,否)',
  `hot` int(11) NOT NULL COMMENT '精选(1,是,2,否)',
  `showHome` int(11) NOT NULL COMMENT '轮播图(1,是,2,否)',
  `image` text NOT NULL COMMENT '图片',
  `viewerNum` bigint(20) DEFAULT NULL COMMENT '浏览人数',
  `content` text NOT NULL COMMENT '文章内容',
  `markContent` text COMMENT 'markdown内容',
  `create_time` bigint(20) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='文章' AUTO_INCREMENT=22 ;

--
-- 转存表中的数据 `blog_article`
--

INSERT INTO `blog_article` (`id`, `title`, `menuId`, `autor`, `summary`, `status`, `hot`, `showHome`, `image`, `viewerNum`, `content`, `markContent`, `create_time`) VALUES
(20, '测试新文章编写', 0, 'Maple', '测试', 1, 2, 2, 'http://localhost:3000/public/uploads/summary/2020/1579672507730790.jpeg', 10, '<p>测试啊啊啊</p>\n<pre><div class="hljs"><code class="lang-javascript"><span class="hljs-keyword">var</span> a=<span class="hljs-number">0</span>;\n<span class="hljs-keyword">var</span> b=<span class="hljs-number">1</span>;\n<span class="hljs-built_in">console</span>.log(a+b)\n</code></div></pre>\n<p><img src="http://localhost:3000/public/uploads/content/2020/1579664933927755.jpeg" alt="flutterreview.jpeg" /></p>\n', '测试啊啊啊\n```javascript\nvar a=0;\nvar b=1;\nconsole.log(a+b)\n```\n![flutterreview.jpeg](http://localhost:3000/public/uploads/content/2020/1579664933927755.jpeg)', 1579664937172),
(21, '测试二', 3, 'Maple', '测试啦啦啦', 1, 2, 2, 'http://localhost:3000/public/uploads/summary/2020/1579673475563767.jpeg', 10, '<p>** 为什么选择快餐店POS系统？ **</p>\n<p>刚开始我想作一套以酒水商城为背景的手机端应用，但是我发现网上这样的应用太多了，什么仿饿了么，什么知乎，什么购物车都可以在网上找到，所以你完全可以Github网站中下载，自学掌握。我觉的既然作了这个实战，就要够酷够复杂，我下面列举了三个原因，大家可以看一下（你其实可以忽略前两点）。</p>\n<p>这个收银界面足够复杂：我们采用三栏布局，每栏的交互操作都很有技术技巧，让你快速掌握复杂应用的开发。<br />\n用到的知识点多：用到实战中90%以上的知识点，让你把Vue的知识串联起来，快速成为单位中的技术牛人。<br />\n为了更好的和女神啪啪啪：京东-强东哥的女神愿望就是开奶茶店，我的女神愿望就是开个快餐店。<br />\nMockPlus软件下载：</p>\n<p>Mockplus是一款免费的软件，你可以随便下载：https://www.mockplus.cn/ 。下载好后你需要注册一个账户，就可以正常使用了。</p>\n<p>下面是我们用Mockplus制作的应用框线图，虽然简单，但是已经把我脑海中快餐店Pos系统的大体样式画出来了。在作项目之前，一定要画出框线图，反复讨论需求和技术实现，这样能避免开发中的大范围修改，在实际工作当中非常重要。</p>\n<p>源码：<a href="https://coding.net/u/shenghongyu/p/fabric.js-Demo/git" target="_blank">https://coding.net/u/shenghongyu/p/fabric.js-Demo/git</a></p>\n<h2><a id="2Vuecli_15"></a>第2节：Vue-cli搭建开发环境</h2>\n<p>我们采用Vue-cli进行快速搭建，如果你对Vue-cli还不了解，请观看下面的文章，大概30分钟可完全掌握Vue-cli。</p>\n<iframe \n    height=450 \n    width=800 \n    src="//player.bilibili.com/player.html?aid=48860539&cid=85564154&page=3" \n    frameborder=0 \n    allowfullscreen>\n</iframe>\n<h3><a id="_27"></a>搭建项目架构：</h3>\n<p>项目采用Webpack+Vue-router的架构方式，开始安装（全部在windows系统上操作，我也没有mac电脑）。 1.按Win+R，然后在文本框中输入cmd，回车打开命令行，输入vue-cli安装命令：</p>\n<pre><div class="hljs"><code class="lang-javascript">mpm install vue-cli -g\n</code></div></pre>\n', '** 为什么选择快餐店POS系统？ **\n\n刚开始我想作一套以酒水商城为背景的手机端应用，但是我发现网上这样的应用太多了，什么仿饿了么，什么知乎，什么购物车都可以在网上找到，所以你完全可以Github网站中下载，自学掌握。我觉的既然作了这个实战，就要够酷够复杂，我下面列举了三个原因，大家可以看一下（你其实可以忽略前两点）。\n\n这个收银界面足够复杂：我们采用三栏布局，每栏的交互操作都很有技术技巧，让你快速掌握复杂应用的开发。\n用到的知识点多：用到实战中90%以上的知识点，让你把Vue的知识串联起来，快速成为单位中的技术牛人。\n为了更好的和女神啪啪啪：京东-强东哥的女神愿望就是开奶茶店，我的女神愿望就是开个快餐店。\nMockPlus软件下载：\n\nMockplus是一款免费的软件，你可以随便下载：https://www.mockplus.cn/ 。下载好后你需要注册一个账户，就可以正常使用了。\n\n下面是我们用Mockplus制作的应用框线图，虽然简单，但是已经把我脑海中快餐店Pos系统的大体样式画出来了。在作项目之前，一定要画出框线图，反复讨论需求和技术实现，这样能避免开发中的大范围修改，在实际工作当中非常重要。\n\n源码：[https://coding.net/u/shenghongyu/p/fabric.js-Demo/git](https://coding.net/u/shenghongyu/p/fabric.js-Demo/git)\n\n## 第2节：Vue-cli搭建开发环境\n\n我们采用Vue-cli进行快速搭建，如果你对Vue-cli还不了解，请观看下面的文章，大概30分钟可完全掌握Vue-cli。\n\n<iframe \n    height=450 \n    width=800 \n    src="//player.bilibili.com/player.html?aid=48860539&cid=85564154&page=3" \n    frameborder=0 \n    allowfullscreen>\n</iframe>\n\n### 搭建项目架构：\n项目采用Webpack+Vue-router的架构方式，开始安装（全部在windows系统上操作，我也没有mac电脑）。 1.按Win+R，然后在文本框中输入cmd，回车打开命令行，输入vue-cli安装命令：\n\n```javascript\nmpm install vue-cli -g\n```\n', 1579673798391);

-- --------------------------------------------------------

--
-- 表的结构 `blog_menu`
--

CREATE TABLE IF NOT EXISTS `blog_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `masterMenu` varchar(100) NOT NULL COMMENT '主菜单标题',
  `subMenu` varchar(100) NOT NULL COMMENT '子菜单标题',
  `type` int(11) NOT NULL COMMENT '类型(1,模块2,菜单)',
  `url` varchar(150) DEFAULT NULL COMMENT '菜单URL',
  `masterId` int(11) NOT NULL COMMENT '主菜单id',
  `sort` int(11) DEFAULT NULL COMMENT '排序',
  `description` varchar(255) DEFAULT NULL COMMENT '详情',
  `icon` varchar(100) DEFAULT NULL COMMENT '图标',
  `create_time` bigint(20) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='菜单' AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `blog_menu`
--

INSERT INTO `blog_menu` (`id`, `masterMenu`, `subMenu`, `type`, `url`, `masterId`, `sort`, `description`, `icon`, `create_time`) VALUES
(1, '首页', '首页', 1, '', 0, 100, '这家伙很懒,什么都没写。', '', 1579023588457),
(2, '分类', '分类', 1, '', 0, 100, '这家伙很懒,什么都没写。', '', 1579023732195),
(3, '分类', '技术文章', 2, '', 2, 100, '这家伙很懒,什么都没写。', '', 1579024337537),
(4, '分类', '学习笔记', 2, '', 2, 100, '这家伙很懒,什么都没写。', '', 1579024393871);

-- --------------------------------------------------------

--
-- 表的结构 `blog_system`
--

CREATE TABLE IF NOT EXISTS `blog_system` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '网站ID',
  `userId` int(11) DEFAULT NULL COMMENT '用户ID',
  `title` varchar(120) DEFAULT NULL COMMENT '网站标题',
  `summary` text COMMENT '网站摘要',
  `logo` text COMMENT '网站logo',
  `seo` text COMMENT 'meta信息',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='网站设置' AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `blog_system`
--

INSERT INTO `blog_system` (`id`, `userId`, `title`, `summary`, `logo`, `seo`) VALUES
(2, 9, '', '我的个人博客', '枫林木屋', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `blog_user`
--

CREATE TABLE IF NOT EXISTS `blog_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(60) NOT NULL COMMENT '用户名',
  `password` varchar(60) NOT NULL COMMENT '密码',
  `nicename` varchar(120) NOT NULL COMMENT '昵称',
  `avator` text COMMENT '头像',
  `alipayAccount` varchar(160) DEFAULT NULL COMMENT '支付宝账号',
  `tag` text COMMENT '标签',
  `about` text COMMENT '关于自己',
  `qq` varchar(60) DEFAULT NULL COMMENT 'qq',
  `wechat` varchar(100) DEFAULT NULL COMMENT '微信',
  `github` varchar(140) DEFAULT NULL COMMENT 'github账号',
  `other` varchar(255) DEFAULT NULL COMMENT '其它账号',
  `create_time` bigint(20) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='用户列表' AUTO_INCREMENT=10 ;

--
-- 转存表中的数据 `blog_user`
--

INSERT INTO `blog_user` (`id`, `username`, `password`, `nicename`, `avator`, `alipayAccount`, `tag`, `about`, `qq`, `wechat`, `github`, `other`, `create_time`) VALUES
(9, 'admin', 'Bc51WmuYxlMop7bT1rfUyA==', '一杯二锅头', '暂未开放', '', '前端Noob,4年经验,小小胖,研究美食,喜欢开发', '2015年7月毕业,最开始学了设计,后转的前端,算是半路出家,开发这个系统,一方面是希望有一个对自己学习生活记录的存储空间,另一方面是可以跟广大编程爱好者一起学习.', '393821466', 'achenger520', 'a393821466', 'https://www.baidu.com', 1578675995083);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
