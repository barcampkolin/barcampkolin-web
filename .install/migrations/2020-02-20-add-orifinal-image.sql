ALTER TABLE `conferee` ADD column `picture_original_url` VARCHAR(255) DEFAULT NULL COMMENT 'URL to original of user profile picture' AFTER `picture_url`;
