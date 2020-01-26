/*
 Navicat Premium Data Transfer

 Source Server         : pwd123456
 Source Server Type    : MySQL
 Source Server Version : 80013
 Source Host           : localhost:3306
 Source Schema         : blog_db

 Target Server Type    : MySQL
 Target Server Version : 80013
 File Encoding         : 65001

 Date: 26/01/2020 22:18:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for blog_article
-- ----------------------------
DROP TABLE IF EXISTS `blog_article`;
CREATE TABLE `blog_article` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '文章ID',
  `title` varchar(180) NOT NULL COMMENT '文章标题',
  `menuId` int(11) NOT NULL COMMENT '文章所属',
  `autor` varchar(80) DEFAULT NULL COMMENT '作者',
  `summary` text COMMENT '文章摘要',
  `status` int(11) NOT NULL COMMENT '启用(1,是2,否)',
  `hot` int(11) NOT NULL COMMENT '精选(1,是,2,否)',
  `like` int(11) NOT NULL DEFAULT '0' COMMENT '点赞',
  `showHome` int(11) NOT NULL COMMENT '轮播图(1,是,2,否)',
  `image` text NOT NULL COMMENT '图片',
  `viewerNum` bigint(20) DEFAULT NULL COMMENT '浏览人数',
  `content` text NOT NULL COMMENT '文章内容',
  `markContent` text COMMENT 'markdown内容',
  `create_time` bigint(20) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COMMENT='文章';

-- ----------------------------
-- Records of blog_article
-- ----------------------------
BEGIN;
INSERT INTO `blog_article` VALUES (20, '测试新文章编写', 0, 'Maple', '测试', 1, 2, 0, 2, 'http://localhost:3000/public/uploads/summary/2020/1579672507730790.jpeg', 10, '<p>测试啊啊啊</p>\n<pre><div class=\"hljs\"><code class=\"lang-javascript\"><span class=\"hljs-keyword\">var</span> a=<span class=\"hljs-number\">0</span>;\n<span class=\"hljs-keyword\">var</span> b=<span class=\"hljs-number\">1</span>;\n<span class=\"hljs-built_in\">console</span>.log(a+b)\n</code></div></pre>\n<p><img src=\"http://localhost:3000/public/uploads/content/2020/1579664933927755.jpeg\" alt=\"flutterreview.jpeg\" /></p>\n<audio id=\"audio\" controls=\"\" preload=\"none\">\n      <source id=\"mp3\" src=\"https://sharefs.yun.kugou.com/202001231724/109f4433e1df7b5cf11ac439ce174c5b/G010/M09/1C/10/Sg0DAFT_9wuASfpxAE3pVy4UFPw875.mp3\">\n      </audio>', '测试啊啊啊\n```javascript\nvar a=0;\nvar b=1;\nconsole.log(a+b)\n```\n![flutterreview.jpeg](http://localhost:3000/public/uploads/content/2020/1579664933927755.jpeg)\n\n<audio id=\"audio\" controls=\"\" preload=\"none\">\n      <source id=\"mp3\" src=\"https://sharefs.yun.kugou.com/202001231724/109f4433e1df7b5cf11ac439ce174c5b/G010/M09/1C/10/Sg0DAFT_9wuASfpxAE3pVy4UFPw875.mp3\">\n      </audio>', 1579664937172);
INSERT INTO `blog_article` VALUES (21, '测试二', 3, 'Maple', '测试啦啦啦', 1, 2, 0, 2, 'http://localhost:3000/public/uploads/summary/2020/1579673475563767.jpeg', 10, '<p>** 为什么选择快餐店POS系统？ **</p>\n<p>刚开始我想作一套以酒水商城为背景的手机端应用，但是我发现网上这样的应用太多了，什么仿饿了么，什么知乎，什么购物车都可以在网上找到，所以你完全可以Github网站中下载，自学掌握。我觉的既然作了这个实战，就要够酷够复杂，我下面列举了三个原因，大家可以看一下（你其实可以忽略前两点）。</p>\n<p>这个收银界面足够复杂：我们采用三栏布局，每栏的交互操作都很有技术技巧，让你快速掌握复杂应用的开发。<br />\n用到的知识点多：用到实战中90%以上的知识点，让你把Vue的知识串联起来，快速成为单位中的技术牛人。<br />\n为了更好的和女神啪啪啪：京东-强东哥的女神愿望就是开奶茶店，我的女神愿望就是开个快餐店。<br />\nMockPlus软件下载：</p>\n<p>Mockplus是一款免费的软件，你可以随便下载：https://www.mockplus.cn/ 。下载好后你需要注册一个账户，就可以正常使用了。</p>\n<p>下面是我们用Mockplus制作的应用框线图，虽然简单，但是已经把我脑海中快餐店Pos系统的大体样式画出来了。在作项目之前，一定要画出框线图，反复讨论需求和技术实现，这样能避免开发中的大范围修改，在实际工作当中非常重要。</p>\n<p>源码：<a href=\"https://coding.net/u/shenghongyu/p/fabric.js-Demo/git\" target=\"_blank\">https://coding.net/u/shenghongyu/p/fabric.js-Demo/git</a></p>\n<h2><a id=\"2Vuecli_15\"></a>第2节：Vue-cli搭建开发环境</h2>\n<p>我们采用Vue-cli进行快速搭建，如果你对Vue-cli还不了解，请观看下面的文章，大概30分钟可完全掌握Vue-cli。</p>\n<iframe \n    height=450 \n    width=800 \n    src=\"//player.bilibili.com/player.html?aid=48860539&cid=85564154&page=3\" \n    frameborder=0 \n    allowfullscreen>\n</iframe>\n<h3><a id=\"_27\"></a>搭建项目架构：</h3>\n<p>项目采用Webpack+Vue-router的架构方式，开始安装（全部在windows系统上操作，我也没有mac电脑）。 1.按Win+R，然后在文本框中输入cmd，回车打开命令行，输入vue-cli安装命令：</p>\n<pre><div class=\"hljs\"><code class=\"lang-javascript\">mpm install vue-cli -g\n</code></div></pre>\n', '** 为什么选择快餐店POS系统？ **\n\n刚开始我想作一套以酒水商城为背景的手机端应用，但是我发现网上这样的应用太多了，什么仿饿了么，什么知乎，什么购物车都可以在网上找到，所以你完全可以Github网站中下载，自学掌握。我觉的既然作了这个实战，就要够酷够复杂，我下面列举了三个原因，大家可以看一下（你其实可以忽略前两点）。\n\n这个收银界面足够复杂：我们采用三栏布局，每栏的交互操作都很有技术技巧，让你快速掌握复杂应用的开发。\n用到的知识点多：用到实战中90%以上的知识点，让你把Vue的知识串联起来，快速成为单位中的技术牛人。\n为了更好的和女神啪啪啪：京东-强东哥的女神愿望就是开奶茶店，我的女神愿望就是开个快餐店。\nMockPlus软件下载：\n\nMockplus是一款免费的软件，你可以随便下载：https://www.mockplus.cn/ 。下载好后你需要注册一个账户，就可以正常使用了。\n\n下面是我们用Mockplus制作的应用框线图，虽然简单，但是已经把我脑海中快餐店Pos系统的大体样式画出来了。在作项目之前，一定要画出框线图，反复讨论需求和技术实现，这样能避免开发中的大范围修改，在实际工作当中非常重要。\n\n源码：[https://coding.net/u/shenghongyu/p/fabric.js-Demo/git](https://coding.net/u/shenghongyu/p/fabric.js-Demo/git)\n\n## 第2节：Vue-cli搭建开发环境\n\n我们采用Vue-cli进行快速搭建，如果你对Vue-cli还不了解，请观看下面的文章，大概30分钟可完全掌握Vue-cli。\n\n<iframe \n    height=450 \n    width=800 \n    src=\"//player.bilibili.com/player.html?aid=48860539&cid=85564154&page=3\" \n    frameborder=0 \n    allowfullscreen>\n</iframe>\n\n### 搭建项目架构：\n项目采用Webpack+Vue-router的架构方式，开始安装（全部在windows系统上操作，我也没有mac电脑）。 1.按Win+R，然后在文本框中输入cmd，回车打开命令行，输入vue-cli安装命令：\n\n```javascript\nmpm install vue-cli -g\n```\n', 1579673798391);
COMMIT;

-- ----------------------------
-- Table structure for blog_comment
-- ----------------------------
DROP TABLE IF EXISTS `blog_comment`;
CREATE TABLE `blog_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论ID',
  `article_id` int(11) NOT NULL COMMENT '文章ID',
  `comment_name` varchar(120) NOT NULL COMMENT '评论人昵称',
  `comment_qq` varchar(120) DEFAULT NULL COMMENT '评论人QQ',
  `comment_email` varchar(180) NOT NULL COMMENT '评论Email',
  `comment_text` text NOT NULL COMMENT '评论内容',
  `reply_id` int(11) NOT NULL COMMENT '回复id (0是评论,回复ID会自动增长)',
  `avatar` text NOT NULL COMMENT '头像',
  `status` int(11) NOT NULL COMMENT '评论审核状态',
  `create_time` bigint(20) NOT NULL COMMENT '评论时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COMMENT='评论';

-- ----------------------------
-- Records of blog_comment
-- ----------------------------
BEGIN;
INSERT INTO `blog_comment` VALUES (15, 20, '枫林', '392883244', '392482@qq.com', '大选中茶多酚武器恶趣味请问请问萨达打撒是大大撒达到最大持续的高对方是否大选中茶多酚武器恶趣味请问请问萨达打撒是大大撒达到最大持续的高对方是否大选中茶多酚武器恶趣味请问请问萨达打撒是大大撒达到最大持续的高对方是否大选中茶多酚武器恶趣味请问请问萨达打撒是大大撒达到最大持续的高对方是否', 13, 'http://a0.att.hudong.com/16/12/01300535031999137270128786964.jpg', 2, 1579887168153);
INSERT INTO `blog_comment` VALUES (14, 20, '枫林', '392883244', '392482@qq.com', '大选中茶多酚武器恶趣味请问请问萨达打撒是大大撒达到最大持续的高对方是否', 13, 'http://a0.att.hudong.com/16/12/01300535031999137270128786964.jpg', 2, 1579887163670);
INSERT INTO `blog_comment` VALUES (13, 20, '阿拉啦', '392883244', '392482@qq.com', '大选中茶多酚武器恶趣味请问请问萨达打撒是大大撒达到最大持续的高对方是否', 0, 'http://a0.att.hudong.com/16/12/01300535031999137270128786964.jpg', 2, 1579887147668);
INSERT INTO `blog_comment` VALUES (16, 20, '测试测试22232', '4234112322', '392482@qq.com', '大选中茶多酚武器恶趣味请问请问萨达打撒是大大撒达到最大持续的高对方是否大选中茶多酚武器恶趣味请问请问萨达打撒是大大撒达到最大持续的高对方是否大选中茶多酚武器恶趣味请问请问萨达打撒是大大撒达到最大持续的高对方是否大选中茶多酚武器恶趣味请问请问萨达打撒是大大撒达到最大持续的高对方是否', 0, 'http://a0.att.hudong.com/16/12/01300535031999137270128786964.jpg', 2, 1579887195571);
INSERT INTO `blog_comment` VALUES (17, 20, '偶死亡', '4234112322', '392482@qq.com', '大选中茶多酚武器恶趣味请问请问萨达打撒是大大撒达到最大持续的高对方是否大选中茶多酚武器恶趣味请问请问萨达打撒是大大撒达到最大持续的高对方是否大选中茶多酚武器恶趣味请问请问萨达打撒是大大撒达到最大持续的高对方是否大选中茶多酚武器恶趣味请问请问萨达打撒是大大撒达到最大持续的高对方是否', 16, 'http://a0.att.hudong.com/16/12/01300535031999137270128786964.jpg', 2, 1579887226374);
INSERT INTO `blog_comment` VALUES (18, 20, '偶死亡', '4234112322', '392482@qq.com', '大选中茶多酚武器恶趣味请问请问萨达打撒是大大撒达到最大持续的高对方是否大选中茶多酚武器恶趣味请问请问萨达打撒是大大撒达到最大持续的高对方是否大选中茶多酚武器恶趣味请问请问萨达打撒是大大撒达到最大持续的高对方是否大选中茶多酚武器恶趣味请问请问萨达打撒是大大撒达到最大持续的高对方是否', 16, 'http://a0.att.hudong.com/16/12/01300535031999137270128786964.jpg', 2, 1579973143245);
INSERT INTO `blog_comment` VALUES (23, 21, '很忐忑', '4234112322', '392482@qq.com', '大选中茶多酚武器恶趣味请问请问萨达打撒是大大撒达到最大持续的高对方是否大选中茶多酚武器恶趣味请问请问萨达打撒是大大撒达到最大持续的高对方是否大选中茶多酚武器恶趣味请问请问萨达打撒是大大撒达到最大持续的高对方是否大选中茶多酚武器恶趣味请问请问萨达打撒是大大撒达到最大持续的高对方是否', 0, 'http://a0.att.hudong.com/16/12/01300535031999137270128786964.jpg', 2, 1579980150819);
COMMIT;

-- ----------------------------
-- Table structure for blog_menu
-- ----------------------------
DROP TABLE IF EXISTS `blog_menu`;
CREATE TABLE `blog_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `masterMenu` varchar(100) NOT NULL COMMENT '主菜单标题',
  `subMenu` varchar(100) NOT NULL COMMENT '子菜单标题',
  `type` int(11) NOT NULL COMMENT '类型(1,模块2,菜单)',
  `url` varchar(150) DEFAULT NULL COMMENT '菜单URL',
  `masterId` int(11) NOT NULL COMMENT '主菜单id',
  `sort` int(11) DEFAULT NULL COMMENT '排序',
  `description` varchar(255) DEFAULT NULL COMMENT '详情',
  `icon` varchar(100) DEFAULT NULL COMMENT '图标',
  `isMenu` int(11) NOT NULL DEFAULT '2' COMMENT '是否菜单',
  `create_time` bigint(20) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='菜单';

-- ----------------------------
-- Records of blog_menu
-- ----------------------------
BEGIN;
INSERT INTO `blog_menu` VALUES (1, '首页', '首页', 1, '/home', 0, 100, '这家伙很懒,什么都没写。', '', 2, 1579023588457);
INSERT INTO `blog_menu` VALUES (2, '分类', '分类', 1, '', 0, 100, '这家伙很懒,什么都没写。', '', 1, 1579023732195);
INSERT INTO `blog_menu` VALUES (3, '分类', '技术文章', 2, '', 2, 100, '这家伙很懒,什么都没写。', '', 2, 1579024337537);
INSERT INTO `blog_menu` VALUES (4, '分类', '学习笔记', 2, '', 2, 100, '这家伙很懒,什么都没写。', '', 2, 1579024393871);
COMMIT;

-- ----------------------------
-- Table structure for blog_reply
-- ----------------------------
DROP TABLE IF EXISTS `blog_reply`;
CREATE TABLE `blog_reply` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '回复ID',
  `comment_id` int(11) NOT NULL COMMENT '评论ID',
  `reply_name` varchar(120) NOT NULL COMMENT '回复人的名称',
  `reply_email` varchar(180) NOT NULL COMMENT '回复人的email',
  `reply_qq` varchar(120) NOT NULL COMMENT '回复人的QQ',
  `reply_text` text NOT NULL COMMENT '回复人的内容',
  `avatar` text NOT NULL COMMENT '头像',
  `status` int(11) NOT NULL COMMENT '回复人的审核状态',
  `create_time` bigint(20) NOT NULL COMMENT '回复时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='回复';

-- ----------------------------
-- Records of blog_reply
-- ----------------------------
BEGIN;
INSERT INTO `blog_reply` VALUES (1, 5, '打算休', '12343522', 'asd@qq.com', '的撒旦委屈委屈委屈委屈', 'http://a0.att.hudong.com/16/12/01300535031999137270128786964.jpg', 2, 1579857535876);
INSERT INTO `blog_reply` VALUES (2, 5, '阿三', '12343522', 'asd@qq.com', '的撒旦委屈委屈委屈委屈啊实打实大苏打的委屈恶趣味去按程序正常撒打算委屈', 'http://a0.att.hudong.com/16/12/01300535031999137270128786964.jpg', 2, 1579857587313);
INSERT INTO `blog_reply` VALUES (3, 5, '阿三是', '12343522', 'asd@qq.com', '的撒旦委屈委屈委屈委屈啊实打实大苏打的委屈恶趣味去按程序正常撒打算委屈啊实打实大苏打撒大苏打撒旦我去额', 'http://a0.att.hudong.com/16/12/01300535031999137270128786964.jpg', 2, 1579857595476);
INSERT INTO `blog_reply` VALUES (4, 5, '阿安心', '12343522', 'asd@qq.com', '的撒旦委屈委屈委屈委屈啊实打实大苏打的委屈恶趣味去按程序正常撒打算委屈啊实打实大苏打撒大苏打撒旦我去额阿斯顿我去额前饿', 'http://a0.att.hudong.com/16/12/01300535031999137270128786964.jpg', 2, 1579857602223);
INSERT INTO `blog_reply` VALUES (5, 8, '阿安心', '12343522', 'asd@qq.com', '的撒旦委屈委屈委屈委屈啊实打实大苏打的委屈恶趣现在擦拭大无畏味去按程序正常撒打算委屈啊实打实大苏打撒大苏打撒旦我去额阿斯顿我去额前饿', 'http://a0.att.hudong.com/16/12/01300535031999137270128786964.jpg', 2, 1579857607136);
INSERT INTO `blog_reply` VALUES (6, 8, '阿安心', '12343522', 'asd@qq.com', '的撒旦委屈委屈委屈委屈啊实打实大苏打的委屈恶趣现在擦拭大无畏味去按程序正常撒打算委屈啊实打实大苏打撒大苏打撒旦我去额阿斯顿我去额前饿', 'http://a0.att.hudong.com/16/12/01300535031999137270128786964.jpg', 2, 1579857963871);
COMMIT;

-- ----------------------------
-- Table structure for blog_system
-- ----------------------------
DROP TABLE IF EXISTS `blog_system`;
CREATE TABLE `blog_system` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '网站ID',
  `userId` int(11) DEFAULT NULL COMMENT '用户ID',
  `title` varchar(120) DEFAULT NULL COMMENT '网站标题',
  `summary` text COMMENT '网站摘要',
  `logo` text COMMENT '网站logo',
  `seo` text COMMENT 'meta信息',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='网站设置';

-- ----------------------------
-- Records of blog_system
-- ----------------------------
BEGIN;
INSERT INTO `blog_system` VALUES (2, 9, '', '我的个人博客', '枫林木屋', NULL);
COMMIT;

-- ----------------------------
-- Table structure for blog_user
-- ----------------------------
DROP TABLE IF EXISTS `blog_user`;
CREATE TABLE `blog_user` (
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
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='用户列表';

-- ----------------------------
-- Records of blog_user
-- ----------------------------
BEGIN;
INSERT INTO `blog_user` VALUES (9, 'admin', 'Bc51WmuYxlMop7bT1rfUyA==', '一杯二锅头', '暂未开放', '', '前端Noob,4年经验,小小胖,研究美食,喜欢开发', '2015年7月毕业,最开始学了设计,后转的前端,算是半路出家,开发这个系统,一方面是希望有一个对自己学习生活记录的存储空间,另一方面是可以跟广大编程爱好者一起学习.', '393821466', 'achenger520', 'a393821466', 'https://www.baidu.com', 1578675995083);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
