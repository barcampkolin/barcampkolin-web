# ************************************************************
# Database: barcampkolin
# Generation Time: 2019-12-01 00:00:00 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table conferee
# ------------------------------------------------------------

DROP TABLE IF EXISTS `conferee`;

CREATE TABLE `conferee` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Unique id',
  `user_id` int(11) unsigned DEFAULT NULL COMMENT 'Foreign key - used:id',
  `name` varchar(200) NOT NULL DEFAULT '' COMMENT 'Users name',
  `email` varchar(200) NOT NULL DEFAULT '' COMMENT 'Users e-mail',
  `picture_url` varchar(255) DEFAULT NULL COMMENT 'URL to user profile picture',
  `bio` text COMMENT 'Short info about user',
  `allow_mail` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT 'Boolean - allow to send e-mails',
  `consens` datetime DEFAULT NULL COMMENT 'Consens to keep users private data',
  `extended` text COMMENT 'JSON - Extending data',
  `created` datetime NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Boolean - is active?',
  PRIMARY KEY (`id`),
  UNIQUE KEY `conferee_user` (`user_id`),
  CONSTRAINT `conferee_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table config
# ------------------------------------------------------------

DROP TABLE IF EXISTS `config`;

CREATE TABLE `config` (
  `id` varchar(64) NOT NULL DEFAULT '' COMMENT 'Unique name of config item',
  `value` text NOT NULL COMMENT 'JSON encoded config value',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;



# Dump of table file
# ------------------------------------------------------------

DROP TABLE IF EXISTS `file`;

CREATE TABLE `file` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table newsletter_subscribe
# ------------------------------------------------------------

DROP TABLE IF EXISTS `newsletter_subscribe`;

CREATE TABLE `newsletter_subscribe` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(200) NOT NULL DEFAULT '' COMMENT 'E-mail to subscribe',
  `consent_date` datetime NOT NULL COMMENT 'Date of user''s consent',
  `consent_desc` varchar(200) NOT NULL DEFAULT '' COMMENT 'Way to get user''s consent',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;



# Dump of table partner_groups
# ------------------------------------------------------------

DROP TABLE IF EXISTS `partner_groups`;

CREATE TABLE `partner_groups` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID of group',
  `name` varchar(100) DEFAULT NULL COMMENT 'Name of group',
  `height` int(11) unsigned DEFAULT NULL COMMENT 'Default height of images in group',
  `order` int(11) NOT NULL COMMENT 'Order definition in groups',
  `enabled` int(1) unsigned NOT NULL DEFAULT '1' COMMENT 'Boolean - 1 for enabled',
  PRIMARY KEY (`id`),
  KEY `enabled` (`enabled`,`order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table partners
# ------------------------------------------------------------

DROP TABLE IF EXISTS `partners`;

CREATE TABLE `partners` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID of partner',
  `group_id` int(10) unsigned NOT NULL COMMENT 'FK - ID of partner''s group',
  `name` varchar(255) DEFAULT NULL COMMENT 'name of partner',
  `url` text COMMENT 'URL to partner''s site',
  `picture_url` text COMMENT 'URL to logo image',
  `height` int(10) unsigned DEFAULT NULL COMMENT 'Height of image',
  `order` int(11) NOT NULL COMMENT 'Order index',
  `enabled` int(1) unsigned NOT NULL DEFAULT '1' COMMENT 'Boolean - 1 for enabled',
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`,`enabled`,`order`),
  CONSTRAINT `partners_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `partner_groups` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table program
# ------------------------------------------------------------

DROP TABLE IF EXISTS `program`;

CREATE TABLE `program` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(64) DEFAULT NULL,
  `talk_id` int(10) unsigned DEFAULT NULL,
  `room` varchar(64) DEFAULT NULL,
  `time` time DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `title` text,
  `speaker` varchar(200) DEFAULT NULL,
  `style` varchar(64) DEFAULT NULL,
  `category` varchar(64) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `program_talk` (`talk_id`),
  CONSTRAINT `program_talk` FOREIGN KEY (`talk_id`) REFERENCES `talk` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table talk
# ------------------------------------------------------------

DROP TABLE IF EXISTS `talk`;

CREATE TABLE `talk` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Unique id',
  `conferee_id` int(11) unsigned DEFAULT NULL COMMENT 'Foreign key - conferee:id',
  `title` varchar(255) NOT NULL DEFAULT '' COMMENT 'Talk name',
  `description` text COMMENT 'Talk Description',
  `purpose` text COMMENT 'Talk purpose',
  `enabled` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `votes` int(11) DEFAULT '0',
  `vote_coefficient` int(11) NOT NULL DEFAULT '0',
  `category` varchar(30) DEFAULT NULL COMMENT 'Talk category',
  `company` varchar(200) DEFAULT NULL COMMENT 'Speaker''s company',
  `notes` text COMMENT 'private notes',
  `extended` text COMMENT 'JSON - Extending data',
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `talk_conferee` (`conferee_id`),
  CONSTRAINT `talk_conferee` FOREIGN KEY (`conferee_id`) REFERENCES `conferee` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table talk_votes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `talk_votes`;

CREATE TABLE `talk_votes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `talk_id` int(11) unsigned NOT NULL,
  `user_id` int(11) unsigned NOT NULL,
  `value` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `talk_id` (`talk_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `talk_vote` FOREIGN KEY (`talk_id`) REFERENCES `talk` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vote_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'User id',
  `email` varchar(200) DEFAULT NULL COMMENT 'Users e-mail',
  `name` varchar(200) DEFAULT NULL COMMENT 'Users name',
  `picture_url` varchar(255) DEFAULT NULL COMMENT 'URL to user profile picture',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table user_identity
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_identity`;

CREATE TABLE `user_identity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(100) NOT NULL DEFAULT '' COMMENT 'Identity ID on platform',
  `platform` varchar(30) NOT NULL DEFAULT '' COMMENT 'Platform name',
  `user_id` int(11) unsigned DEFAULT NULL COMMENT 'Foreign key - used:id',
  `identity` text COMMENT 'Identity data',
  `token` text COMMENT 'Secret (token or password)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `forign_key` (`key`,`platform`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `identity_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table user_role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_role`;

CREATE TABLE `user_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `user_id` int(11) unsigned NOT NULL COMMENT 'Foreign key - used:id',
  `role` varchar(30) NOT NULL DEFAULT '' COMMENT 'Role name',
  PRIMARY KEY (`id`),
  KEY `role` (`role`),
  KEY `user_role` (`user_id`),
  CONSTRAINT `user_role` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
