-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema yourscope
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema yourscope
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `yourscope` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `yourscope` ;

-- -----------------------------------------------------
-- Table `yourscope`.`Company`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yourscope`.`Company` (
  `CompanyID` INT NOT NULL AUTO_INCREMENT,
  `CompanyName` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `Country` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `City` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `Address` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `UnitNumber` INT NULL DEFAULT NULL,
  `Phone` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `Fax` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `Email` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `Type` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  PRIMARY KEY (`CompanyID`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `yourscope`.`Courses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yourscope`.`Courses` (
  `CourseId` INT NOT NULL AUTO_INCREMENT,
  `CourseCode` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `Name` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `Description` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `Discipline` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `Type` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `Grade` TINYINT UNSIGNED NOT NULL,
  `Credits` TINYINT UNSIGNED NOT NULL,
  `Prerequisites` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  PRIMARY KEY (`CourseId`))
ENGINE = InnoDB
AUTO_INCREMENT = 181
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `yourscope`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yourscope`.`Users` (
  `UserId` INT NOT NULL AUTO_INCREMENT,
  `Email` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `FirstName` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `MiddleName` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `LastName` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `Birthday` DATETIME(6) NULL DEFAULT NULL,
  `Role` INT NOT NULL,
  `Affiliation` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `Grade` SMALLINT NULL DEFAULT NULL,
  `AffiliationID` INT NULL DEFAULT NULL,
  PRIMARY KEY (`UserId`))
ENGINE = InnoDB
AUTO_INCREMENT = 74
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `yourscope`.`Schedules`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yourscope`.`Schedules` (
  `ScheduleId` INT NOT NULL AUTO_INCREMENT,
  `StudentId` INT NOT NULL,
  PRIMARY KEY (`ScheduleId`),
  INDEX `IX_Schedules_StudentId` (`StudentId` ASC) VISIBLE,
  CONSTRAINT `FK_Schedules_Users_StudentId`
    FOREIGN KEY (`StudentId`)
    REFERENCES `yourscope`.`Users` (`UserId`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `yourscope`.`Years`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yourscope`.`Years` (
  `YearId` INT NOT NULL AUTO_INCREMENT,
  `YearNumber` INT NOT NULL,
  `ScheduleId` INT NOT NULL,
  PRIMARY KEY (`YearId`),
  INDEX `IX_Years_ScheduleId` (`ScheduleId` ASC) VISIBLE,
  CONSTRAINT `FK_Years_Schedules_ScheduleId`
    FOREIGN KEY (`ScheduleId`)
    REFERENCES `yourscope`.`Schedules` (`ScheduleId`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 29
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `yourscope`.`CourseYear`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yourscope`.`CourseYear` (
  `YearId` INT NOT NULL,
  `CourseId` INT NOT NULL,
  PRIMARY KEY (`CourseId`, `YearId`),
  INDEX `IX_CourseYear_YearId` (`YearId` ASC) VISIBLE,
  CONSTRAINT `FK_CourseYear_Courses_CourseId`
    FOREIGN KEY (`CourseId`)
    REFERENCES `yourscope`.`Courses` (`CourseId`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_CourseYear_Years_YearId`
    FOREIGN KEY (`YearId`)
    REFERENCES `yourscope`.`Years` (`YearId`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `yourscope`.`Profiles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yourscope`.`Profiles` (
  `ProfileId` INT NOT NULL AUTO_INCREMENT,
  `UserId` INT NOT NULL,
  `Skills` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `IntrestsHobbies` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `Awards` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  PRIMARY KEY (`ProfileId`),
  INDEX `IX_Profiles_UserId` (`UserId` ASC) VISIBLE,
  CONSTRAINT `FK_Profiles_Users_UserId`
    FOREIGN KEY (`UserId`)
    REFERENCES `yourscope`.`Users` (`UserId`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `yourscope`.`CoverLetters`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yourscope`.`CoverLetters` (
  `CoverLetterId` INT NOT NULL AUTO_INCREMENT,
  `Intro` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `SalesPitch1` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `SalesPitch2` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `SalesPitch3` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `Conclusion` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `ProfileId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`CoverLetterId`),
  INDEX `IX_CoverLetters_ProfileId` (`ProfileId` ASC) VISIBLE,
  CONSTRAINT `FK_CoverLetters_Profiles_ProfileId`
    FOREIGN KEY (`ProfileId`)
    REFERENCES `yourscope`.`Profiles` (`ProfileId`))
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `yourscope`.`Schools`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yourscope`.`Schools` (
  `SchoolId` INT NOT NULL AUTO_INCREMENT,
  `Name` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `Address` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  PRIMARY KEY (`SchoolId`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `yourscope`.`Events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yourscope`.`Events` (
  `EventId` INT NOT NULL AUTO_INCREMENT,
  `Title` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `Description` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `Date` DATETIME(6) NOT NULL,
  `Location` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `UserId` INT NULL DEFAULT NULL,
  `SchoolId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`EventId`),
  INDEX `IX_Events_UserId` (`UserId` ASC) VISIBLE,
  INDEX `IX_Events_SchoolId` (`SchoolId` ASC) VISIBLE,
  CONSTRAINT `FK_Events_Schools_SchoolId`
    FOREIGN KEY (`SchoolId`)
    REFERENCES `yourscope`.`Schools` (`SchoolId`),
  CONSTRAINT `FK_Events_Users_UserId`
    FOREIGN KEY (`UserId`)
    REFERENCES `yourscope`.`Users` (`UserId`))
ENGINE = InnoDB
AUTO_INCREMENT = 36
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `yourscope`.`Experiences`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yourscope`.`Experiences` (
  `ExperienceId` INT NOT NULL AUTO_INCREMENT,
  `isWorkExperience` TINYINT(1) NOT NULL,
  `StartDate` INT NOT NULL,
  `EndDate` INT NOT NULL,
  `Position` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `Company` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `Location` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `Description` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `ProfileId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`ExperienceId`),
  INDEX `IX_Experiences_ProfileId` (`ProfileId` ASC) VISIBLE,
  CONSTRAINT `FK_Experiences_Profiles_ProfileId`
    FOREIGN KEY (`ProfileId`)
    REFERENCES `yourscope`.`Profiles` (`ProfileId`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `yourscope`.`JobPostings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yourscope`.`JobPostings` (
  `JobPostingId` INT NOT NULL AUTO_INCREMENT,
  `UserId` INT NOT NULL,
  `Title` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `Description` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `ApplicationDeadline` DATETIME(6) NOT NULL,
  PRIMARY KEY (`JobPostingId`),
  INDEX `IX_JobPostings_UserId` (`UserId` ASC) VISIBLE,
  CONSTRAINT `FK_JobPostings_Users_UserId`
    FOREIGN KEY (`UserId`)
    REFERENCES `yourscope`.`Users` (`UserId`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 33
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `yourscope`.`JobApplications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yourscope`.`JobApplications` (
  `JobApplicationId` INT NOT NULL AUTO_INCREMENT,
  `JobPostingId` INT NOT NULL,
  `UserId` INT NOT NULL,
  `CoverLetterId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`JobApplicationId`),
  INDEX `IX_JobApplications_JobPostingId` (`JobPostingId` ASC) VISIBLE,
  INDEX `IX_JobApplications_UserId` (`UserId` ASC) VISIBLE,
  INDEX `IX_JobApplications_CoverLetterId` (`CoverLetterId` ASC) VISIBLE,
  CONSTRAINT `FK_JobApplications_CoverLetters_CoverLetterId`
    FOREIGN KEY (`CoverLetterId`)
    REFERENCES `yourscope`.`CoverLetters` (`CoverLetterId`),
  CONSTRAINT `FK_JobApplications_JobPostings_JobPostingId`
    FOREIGN KEY (`JobPostingId`)
    REFERENCES `yourscope`.`JobPostings` (`JobPostingId`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_JobApplications_Users_UserId`
    FOREIGN KEY (`UserId`)
    REFERENCES `yourscope`.`Users` (`UserId`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `yourscope`.`SchoolCourse`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yourscope`.`SchoolCourse` (
  `SchoolId` INT NOT NULL,
  `CourseId` INT NOT NULL,
  PRIMARY KEY (`SchoolId`, `CourseId`),
  INDEX `IX_SchoolCourse_CourseId` (`CourseId` ASC) VISIBLE,
  CONSTRAINT `FK_SchoolCourse_Courses_CourseId`
    FOREIGN KEY (`CourseId`)
    REFERENCES `yourscope`.`Courses` (`CourseId`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_SchoolCourse_Schools_SchoolId`
    FOREIGN KEY (`SchoolId`)
    REFERENCES `yourscope`.`Schools` (`SchoolId`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `yourscope`.`__EFMigrationsHistory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yourscope`.`__EFMigrationsHistory` (
  `MigrationId` VARCHAR(150) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `ProductVersion` VARCHAR(32) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  PRIMARY KEY (`MigrationId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

USE `yourscope` ;

-- -----------------------------------------------------
-- procedure POMELO_AFTER_ADD_PRIMARY_KEY
-- -----------------------------------------------------

DELIMITER $$
USE `yourscope`$$
CREATE DEFINER=`admin`@`%` PROCEDURE `POMELO_AFTER_ADD_PRIMARY_KEY`(IN `SCHEMA_NAME_ARGUMENT` VARCHAR(255), IN `TABLE_NAME_ARGUMENT` VARCHAR(255), IN `COLUMN_NAME_ARGUMENT` VARCHAR(255))
BEGIN
	DECLARE HAS_AUTO_INCREMENT_ID INT(11);
	DECLARE PRIMARY_KEY_COLUMN_NAME VARCHAR(255);
	DECLARE PRIMARY_KEY_TYPE VARCHAR(255);
	DECLARE SQL_EXP VARCHAR(1000);
	SELECT COUNT(*)
		INTO HAS_AUTO_INCREMENT_ID
		FROM `information_schema`.`COLUMNS`
		WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
			AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
			AND `COLUMN_NAME` = COLUMN_NAME_ARGUMENT
			AND `COLUMN_TYPE` LIKE '%int%'
			AND `COLUMN_KEY` = 'PRI';
	IF HAS_AUTO_INCREMENT_ID THEN
		SELECT `COLUMN_TYPE`
			INTO PRIMARY_KEY_TYPE
			FROM `information_schema`.`COLUMNS`
			WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
				AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
				AND `COLUMN_NAME` = COLUMN_NAME_ARGUMENT
				AND `COLUMN_TYPE` LIKE '%int%'
				AND `COLUMN_KEY` = 'PRI';
		SELECT `COLUMN_NAME`
			INTO PRIMARY_KEY_COLUMN_NAME
			FROM `information_schema`.`COLUMNS`
			WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
				AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
				AND `COLUMN_NAME` = COLUMN_NAME_ARGUMENT
				AND `COLUMN_TYPE` LIKE '%int%'
				AND `COLUMN_KEY` = 'PRI';
		SET SQL_EXP = CONCAT('ALTER TABLE `', (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA())), '`.`', TABLE_NAME_ARGUMENT, '` MODIFY COLUMN `', PRIMARY_KEY_COLUMN_NAME, '` ', PRIMARY_KEY_TYPE, ' NOT NULL AUTO_INCREMENT;');
		SET @SQL_EXP = SQL_EXP;
		PREPARE SQL_EXP_EXECUTE FROM @SQL_EXP;
		EXECUTE SQL_EXP_EXECUTE;
		DEALLOCATE PREPARE SQL_EXP_EXECUTE;
	END IF;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure POMELO_BEFORE_DROP_PRIMARY_KEY
-- -----------------------------------------------------

DELIMITER $$
USE `yourscope`$$
CREATE DEFINER=`admin`@`%` PROCEDURE `POMELO_BEFORE_DROP_PRIMARY_KEY`(IN `SCHEMA_NAME_ARGUMENT` VARCHAR(255), IN `TABLE_NAME_ARGUMENT` VARCHAR(255))
BEGIN
	DECLARE HAS_AUTO_INCREMENT_ID TINYINT(1);
	DECLARE PRIMARY_KEY_COLUMN_NAME VARCHAR(255);
	DECLARE PRIMARY_KEY_TYPE VARCHAR(255);
	DECLARE SQL_EXP VARCHAR(1000);
	SELECT COUNT(*)
		INTO HAS_AUTO_INCREMENT_ID
		FROM `information_schema`.`COLUMNS`
		WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
			AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
			AND `Extra` = 'auto_increment'
			AND `COLUMN_KEY` = 'PRI'
			LIMIT 1;
	IF HAS_AUTO_INCREMENT_ID THEN
		SELECT `COLUMN_TYPE`
			INTO PRIMARY_KEY_TYPE
			FROM `information_schema`.`COLUMNS`
			WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
				AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
				AND `COLUMN_KEY` = 'PRI'
			LIMIT 1;
		SELECT `COLUMN_NAME`
			INTO PRIMARY_KEY_COLUMN_NAME
			FROM `information_schema`.`COLUMNS`
			WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
				AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
				AND `COLUMN_KEY` = 'PRI'
			LIMIT 1;
		SET SQL_EXP = CONCAT('ALTER TABLE `', (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA())), '`.`', TABLE_NAME_ARGUMENT, '` MODIFY COLUMN `', PRIMARY_KEY_COLUMN_NAME, '` ', PRIMARY_KEY_TYPE, ' NOT NULL;');
		SET @SQL_EXP = SQL_EXP;
		PREPARE SQL_EXP_EXECUTE FROM @SQL_EXP;
		EXECUTE SQL_EXP_EXECUTE;
		DEALLOCATE PREPARE SQL_EXP_EXECUTE;
	END IF;
END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
