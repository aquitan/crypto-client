-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: localhost    Database: crypto_app
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_token`
--

DROP TABLE IF EXISTS `auth_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_token` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `refresh_token` varchar(1024) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `auth_token_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_auth` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_token`
--

LOCK TABLES `auth_token` WRITE;
/*!40000 ALTER TABLE `auth_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `domain_detail`
--

DROP TABLE IF EXISTS `domain_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `domain_detail` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `show_news` tinyint(1) NOT NULL,
  `double_deposit` tinyint(1) NOT NULL,
  `deposit_fee` int NOT NULL,
  `rate_correct_sum` float NOT NULL,
  `min_deposit_sum` int NOT NULL,
  `min_withdrawal_sum` int NOT NULL,
  `currency_swap_fee` int NOT NULL,
  `internal_swap_fee` int NOT NULL,
  `date_of_create` datetime NOT NULL,
  `domain_id` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `domain_id` (`domain_id`),
  CONSTRAINT `domain_detail_ibfk_1` FOREIGN KEY (`domain_id`) REFERENCES `domain_detail` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domain_detail`
--

LOCK TABLES `domain_detail` WRITE;
/*!40000 ALTER TABLE `domain_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `domain_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `domain_list`
--

DROP TABLE IF EXISTS `domain_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `domain_list` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `full_domain_name` varchar(255) NOT NULL,
  `domain_name` varchar(100) NOT NULL,
  `company_address` varchar(255) NOT NULL,
  `company_phone_number` varchar(50) NOT NULL,
  `company_email` varchar(255) NOT NULL,
  `company_owner_name` varchar(150) NOT NULL,
  `company_year` year NOT NULL,
  `company_country` varchar(50) NOT NULL,
  `domain_owner` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domain_list`
--

LOCK TABLES `domain_list` WRITE;
/*!40000 ALTER TABLE `domain_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `domain_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `domain_withdrawal_error`
--

DROP TABLE IF EXISTS `domain_withdrawal_error`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `domain_withdrawal_error` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `domain_id` int NOT NULL,
  `error_name` varchar(100) NOT NULL,
  `error_title` varchar(50) NOT NULL,
  `error_text` varchar(1024) NOT NULL,
  `error_btn` varchar(30) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `domain_id` (`domain_id`),
  CONSTRAINT `domain_withdrawal_error_ibfk_1` FOREIGN KEY (`domain_id`) REFERENCES `domain_list` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domain_withdrawal_error`
--

LOCK TABLES `domain_withdrawal_error` WRITE;
/*!40000 ALTER TABLE `domain_withdrawal_error` DISABLE KEYS */;
/*!40000 ALTER TABLE `domain_withdrawal_error` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff_logs`
--

DROP TABLE IF EXISTS `staff_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff_logs` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `staff_email` varchar(255) NOT NULL,
  `staff_action` varchar(320) NOT NULL,
  `staff_domain` varchar(255) NOT NULL,
  `staff_id` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `staff_id` (`staff_id`),
  CONSTRAINT `staff_logs_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `user_auth` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_logs`
--

LOCK TABLES `staff_logs` WRITE;
/*!40000 ALTER TABLE `staff_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `staff_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff_params`
--

DROP TABLE IF EXISTS `staff_params`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff_params` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `staff_email` varchar(255) NOT NULL,
  `payment_fee` int NOT NULL,
  `support_name` varchar(100) NOT NULL,
  `get_staff_access_date` date NOT NULL,
  `user_who_give_access` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `user_who_give_access` (`user_who_give_access`),
  CONSTRAINT `staff_params_ibfk_1` FOREIGN KEY (`user_who_give_access`) REFERENCES `user_auth` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_params`
--

LOCK TABLES `staff_params` WRITE;
/*!40000 ALTER TABLE `staff_params` DISABLE KEYS */;
/*!40000 ALTER TABLE `staff_params` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `used_promocode`
--

DROP TABLE IF EXISTS `used_promocode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `used_promocode` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `code` varchar(30) NOT NULL,
  `date` date NOT NULL,
  `value` float NOT NULL,
  `currency` varchar(30) NOT NULL,
  `notification_text` varchar(1024) NOT NULL,
  `staff_user_id` int NOT NULL,
  `domain_name` varchar(255) NOT NULL,
  `used_by_user` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `used_promocode`
--

LOCK TABLES `used_promocode` WRITE;
/*!40000 ALTER TABLE `used_promocode` DISABLE KEYS */;
/*!40000 ALTER TABLE `used_promocode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_auth`
--

DROP TABLE IF EXISTS `user_auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_auth` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(50) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `activationLink` varchar(255) NOT NULL,
  `self_registration` varchar(100) NOT NULL,
  `agreement` tinyint(1) NOT NULL,
  `promocode` varchar(50) NOT NULL,
  `domain_name` varchar(255) NOT NULL,
  `date_of_entry` datetime NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_auth`
--

LOCK TABLES `user_auth` WRITE;
/*!40000 ALTER TABLE `user_auth` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info_for_action`
--

DROP TABLE IF EXISTS `user_info_for_action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_info_for_action` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `deposit_fee` int NOT NULL,
  `last_deposit` date DEFAULT NULL,
  `active_notification` varchar(1024) DEFAULT NULL,
  `active_error` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `active_error` (`active_error`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_info_for_action_ibfk_1` FOREIGN KEY (`active_error`) REFERENCES `domain_withdrawal_error` (`ID`),
  CONSTRAINT `user_info_for_action_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user_auth` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info_for_action`
--

LOCK TABLES `user_info_for_action` WRITE;
/*!40000 ALTER TABLE `user_info_for_action` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_info_for_action` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_ip_match`
--

DROP TABLE IF EXISTS `user_ip_match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_ip_match` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) NOT NULL,
  `user_ip_address` varchar(150) NOT NULL,
  `login_date` datetime NOT NULL,
  `browser` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_ip_match`
--

LOCK TABLES `user_ip_match` WRITE;
/*!40000 ALTER TABLE `user_ip_match` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_ip_match` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_kyc`
--

DROP TABLE IF EXISTS `user_kyc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_kyc` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone_number` varchar(50) NOT NULL,
  `date_of_birth` date NOT NULL,
  `document_number` varchar(100) NOT NULL,
  `main_address` varchar(255) NOT NULL,
  `sub_address` varchar(255) DEFAULT NULL,
  `city` varchar(30) NOT NULL,
  `country_name` varchar(50) NOT NULL,
  `state` varchar(100) NOT NULL,
  `zip_code` int NOT NULL,
  `document_type` varchar(50) NOT NULL,
  `kyc_status` varchar(30) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_kyc_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_auth` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_kyc`
--

LOCK TABLES `user_kyc` WRITE;
/*!40000 ALTER TABLE `user_kyc` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_kyc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_logs`
--

DROP TABLE IF EXISTS `user_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_logs` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `ip_address` varchar(150) NOT NULL,
  `request_city` varchar(100) NOT NULL,
  `country_name` varchar(50) NOT NULL,
  `location` varchar(150) NOT NULL,
  `browser` varchar(50) NOT NULL,
  `action_date` datetime NOT NULL,
  `user_action` varchar(255) NOT NULL,
  `user_domain` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_auth` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_logs`
--

LOCK TABLES `user_logs` WRITE;
/*!40000 ALTER TABLE `user_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_notification`
--

DROP TABLE IF EXISTS `user_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_notification` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `text` varchar(1024) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_notification`
--

LOCK TABLES `user_notification` WRITE;
/*!40000 ALTER TABLE `user_notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_params`
--

DROP TABLE IF EXISTS `user_params`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_params` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `double_deposit` tinyint(1) NOT NULL,
  `swap_ban` tinyint(1) NOT NULL,
  `internal_ban` tinyint(1) NOT NULL,
  `isUser` tinyint(1) NOT NULL,
  `isStaff` tinyint(1) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `isBanned` tinyint(1) NOT NULL,
  `isActivated` tinyint(1) NOT NULL,
  `premium_status` tinyint(1) NOT NULL,
  `two_step_status` tinyint(1) NOT NULL,
  `agreement` tinyint(1) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_params_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_auth` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_params`
--

LOCK TABLES `user_params` WRITE;
/*!40000 ALTER TABLE `user_params` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_params` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_promocode`
--

DROP TABLE IF EXISTS `user_promocode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_promocode` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `code` varchar(30) NOT NULL,
  `date` date NOT NULL,
  `value` float NOT NULL,
  `currency` varchar(30) NOT NULL,
  `notification_text` varchar(1024) NOT NULL,
  `staff_user_id` int NOT NULL,
  `domain_name` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `staff_user_id` (`staff_user_id`),
  CONSTRAINT `user_promocode_ibfk_1` FOREIGN KEY (`staff_user_id`) REFERENCES `user_auth` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_promocode`
--

LOCK TABLES `user_promocode` WRITE;
/*!40000 ALTER TABLE `user_promocode` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_promocode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_two_fa_params`
--

DROP TABLE IF EXISTS `user_two_fa_params`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_two_fa_params` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `two_step_type` varchar(30) NOT NULL,
  `enable_date` datetime NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_two_fa_params_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_auth` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_two_fa_params`
--

LOCK TABLES `user_two_fa_params` WRITE;
/*!40000 ALTER TABLE `user_two_fa_params` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_two_fa_params` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-11 11:43:12
