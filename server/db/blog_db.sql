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

 Date: 21/01/2020 01:00:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for blog_article
-- ----------------------------
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
  `create_time` bigint(20) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='文章' AUTO_INCREMENT=18;

-- ----------------------------
-- Records of blog_article
-- ----------------------------
BEGIN;
INSERT INTO `blog_article` VALUES (10, 'VSCode常用插件和技巧教程', 3, 'Maple', '想写这个文章已经很久了，但是一直觉的需要的人可能会很少，毕竟VSCode这种每天都使用IDE工具，基本在1小时内就可以快速上手，但是通过我对身边同事的观察，我发现还是有很多小伙伴使用不够精通。特别是现在越来越多的插件，有的非常好用，直接可以提高我们的开发效率，那从今天开始，我开始更新VSCode的一些插件和技巧，这个并不是定期更新，而是我有了好的素材就会更新。', 1, 2, 2, 'http://localhost:3000/public/uploads/summary/2020/1579373002136110.jpg', 124, '<p>想写这个文章已经很久了，但是一直觉的需要的人可能会很少，毕竟VSCode这种每天都使用IDE工具，基本在1小时内就可以快速上手，但是通过我对身边同事的观察，我发现还是有很多小伙伴使用不够精通。特别是现在越来越多的插件，有的非常好用，直接可以提高我们的开发效率，那从今天开始，我开始更新VSCode的一些插件和技巧，这个并不是定期更新，而是我有了好的素材就会更新。</p>', 1579373061607);
INSERT INTO `blog_article` VALUES (11, 'Taro多端统一框架基础免费教程', 3, 'Maple', '2020年第2天，开始继续出视频，录视频。有要一起学习的小伙伴吗?\n随着微信小程序越来越火，其它平台也都推出了自己的小程序产品（支付宝、快应用、百度、抖音）。小程序最大的特点就是平台能为你提供强大的流量，所以小程序开发变成了前端必会知识。 作为一个从来不想写程序，一心只想泡妹子的程序员，我一直期盼有一种解决方案，可以一次开发，多端运行。这也就是我的学习理念，每多学一点知识，就少些一些代码。', 1, 2, 2, 'http://localhost:3000/public/uploads/summary/2020/157937317094556.jpg', 124, '<p>2020年第2天，开始继续出视频，录视频。有要一起学习的小伙伴吗?<br>随着微信小程序越来越火，其它平台也都推出了自己的小程序产品（支付宝、快应用、百度、抖音）。小程序最大的特点就是平台能为你提供强大的流量，所以小程序开发变成了前端必会知识。 作为一个从来不想写程序，一心只想泡妹子的程序员，我一直期盼有一种解决方案，可以一次开发，多端运行。这也就是我的学习理念，每多学一点知识，就少些一些代码。</p>', 1579373296649);
INSERT INTO `blog_article` VALUES (12, 'Taro多端统一框架基础免费教程', 3, 'Maple', '随着微信小程序越来越火，其它平台也都推出了自己的小程序产品（支付宝、快应用、百度、抖音）。小程序最大的特点就是平台能为你提供强大的流量，所以小程序开发变成了前端必会知识。  作为一个从来不想写程序，一心只想泡妹子的程序员，我一直期盼有一种解决方案，可以一次开发，多端运行。这也就是我的学习理念，每多学一点知识，就少些一些代码。期间我尝试Flutter、尝试uni-app、直到我遇到了Taro，我感觉', 1, 2, 2, 'http://localhost:3000/public/uploads/summary/2020/1579373840876973.jpg', 10, '<h3><span style=\"font-weight: normal;\"></span>自我介绍和课程特点</h3><p>第一课按惯例要作一个自我介绍，我目前专注于前端开发，每年都会出100集左右的免费视频，目标是10年出1000集免费视频。目前我已经出免费视频500多集，每周大概会有3集左右的视频更新。所以如果你想跟着技术胖持续学习，请记住<code>https://jspang.com</code>这个网站。</p><p>课程中全部代码都是手敲，逐行讲解，防止你听的一脸懵逼。</p><p>本教程每周更新三集，所以建议你收藏。</p><p>当然我也希望你能加入小密圈，如果学习Taro框架遇到什么困难，可以在小密圈向技术胖进行提问。 也算是对技术胖的一种支持吧。</p>', 1579373856521);
INSERT INTO `blog_article` VALUES (13, '啦啦', 0, 'Maple', 'dsads', 1, 2, 2, 'http://localhost:3000/public/uploads/summary/2020/1579451236773729.jpg', 10, '<p>asdas</p>', 1579451241693);
INSERT INTO `blog_article` VALUES (14, '我爱你啊啊啊', 0, 'Maple', '大三大四的', 1, 2, 2, 'http://localhost:3000/public/uploads/summary/2020/1579451305485282.jpg', 10, '<p>达萨达萨的</p><p><img src=\"http://localhost:3000/public/uploads/content/2020/1579451315729264.jpg\" style=\"max-width:100%;\"><br></p>', 1579451319369);
INSERT INTO `blog_article` VALUES (15, '啦啦啦', 3, 'Maple', '', 1, 2, 2, 'http://localhost:3000/public/uploads/summary/2020/1579451342961438.jpg', 10, '<p>sadaas</p>', 1579451347313);
INSERT INTO `blog_article` VALUES (16, '新文章', 4, 'Maple', '啦啦啦啦', 2, 1, 1, 'http://localhost:3000/public/uploads/summary/2020/1579460161678103.jpg', 10, '<p>啦啦啦啦</p>', 1579460170013);
INSERT INTO `blog_article` VALUES (17, '啦啦', 4, 'Maple', 'adas', 1, 2, 2, '', 10, '<p>asdas</p>', 1579460457170);
COMMIT;

-- ----------------------------
-- Table structure for blog_menu
-- ----------------------------
CREATE TABLE IF NOT EXISTS `blog_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `masterMenu` varchar(100) NOT NULL COMMENT '主菜单标题',
  `subMenu` varchar(100) NOT NULL COMMENT '子菜单标题',
  `type` int(11) NOT NULL COMMENT '类型(1,模块2,菜单)',
  `url` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '菜单URL',
  `masterId` int(11) NOT NULL COMMENT '主菜单id',
  `sort` int(11) DEFAULT NULL COMMENT '排序',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '详情',
  `icon` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '图标',
  `create_time` bigint(20) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='菜单';

-- ----------------------------
-- Records of blog_menu
-- ----------------------------
BEGIN;
INSERT INTO `blog_menu` VALUES (1, '首页', 'home', 1, '', 0, 100, '这家伙很懒,什么都没写。', '', 1579023588457);
INSERT INTO `blog_menu` VALUES (2, '分类', 'menu', 1, '', 0, 100, '这家伙很懒,什么都没写。', '', 1579023732195);
INSERT INTO `blog_menu` VALUES (3, '分类', '技术文章', 2, '', 2, 100, '这家伙很懒,什么都没写。', '', 1579024337537);
INSERT INTO `blog_menu` VALUES (4, '分类', '学习笔记', 2, '', 2, 100, '这家伙很懒,什么都没写。', '', 1579024393871);
COMMIT;

-- ----------------------------
-- Table structure for blog_system
-- ----------------------------
CREATE TABLE IF NOT EXISTS `blog_system` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '网站ID',
  `userId` int(11) DEFAULT NULL COMMENT '用户ID',
  `title` varchar(120) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '网站标题',
  `summary` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '网站摘要',
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
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='用户列表';

-- ----------------------------
-- Records of blog_user
-- ----------------------------
BEGIN;
INSERT INTO `blog_user` VALUES (9, 'admin', 'Bc51WmuYxlMop7bT1rfUyA==', '一杯二锅头', '暂未开放', '', '前端Noob,4年经验,小小胖,研究美食,喜欢开发', '2015年7月毕业,最开始学了设计,后转的前端,算是半路出家,开发这个系统,一方面是希望有一个对自己学习生活记录的存储空间,另一方面是可以跟广大编程爱好者一起学习.', '393821466', 'achenger520', 'a393821466', 'https://www.baidu.com', 1578675995083);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
