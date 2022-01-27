-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: localhost    Database: crypto_app
-- ------------------------------------------------------
-- Server version	8.0.27-0ubuntu0.20.04.1

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
-- Table structure for table `used_promocode`
--

DROP TABLE IF EXISTS `used_promocode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `used_promocode` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `code` varchar(30) NOT NULL,
  `date` varchar(50) NOT NULL,
  `value` float NOT NULL,
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
  `isUser` tinyint(1) NOT NULL,
  `isStaff` tinyint(1) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `isBanned` tinyint(1) NOT NULL,
  `isActivated` tinyint(1) NOT NULL,
  `activationLink` varchar(255) NOT NULL,
  `self_registration` varchar(30) NOT NULL,
  `promocode` varchar(50) NOT NULL,
  `domain_name` varchar(255) NOT NULL,
  `date_of_entry` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_auth`
--

LOCK TABLES `user_auth` WRITE;
/*!40000 ALTER TABLE `user_auth` DISABLE KEYS */;
INSERT INTO `user_auth` VALUES (1,'onegin343@ukr.net','Qwe12345','',1,1,0,0,1,'Jh7LD8FyotE6plz5lK','self registred','empty','localhost:3000','2022-01-26 10:20:39');
/*!40000 ALTER TABLE `user_auth` ENABLE KEYS */;
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
  `date_of_birth` varchar(50) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_kyc`
--

LOCK TABLES `user_kyc` WRITE;
/*!40000 ALTER TABLE `user_kyc` DISABLE KEYS */;
INSERT INTO `user_kyc` VALUES (1,'Niko','Belik','onegin343@ukr.net','98721717273','2022/01/04','18201 12','some str.','123 ulitsa str.','Kyiv','','NY',189621,'National ID','pending',1);
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
  `action_date` varchar(50) NOT NULL,
  `user_action` varchar(255) NOT NULL,
  `user_domain` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_auth` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_logs`
--

LOCK TABLES `user_logs` WRITE;
/*!40000 ALTER TABLE `user_logs` DISABLE KEYS */;
INSERT INTO `user_logs` VALUES (1,'onegin343@ukr.net','194.28.102.5','Kyiv','Ukraine','50.4547, 30.5238','2022-01-26 10:21:26','/','localhost:3000',1),(2,'onegin343@ukr.net','194.28.102.5','Kyiv','Ukraine','50.4547, 30.5238','2022-01-26 10:21:26','/profile','localhost:3000',1),(3,'onegin343@ukr.net','194.28.102.5','Kyiv','Ukraine','50.4547, 30.5238','2022-01-26 10:21:26','profile','undefined',1),(4,'onegin343@ukr.net','194.28.102.5','Kyiv','Ukraine','50.4547, 30.5238','2022-01-26 10:29:30','dashboard','localhost:3000',1),(5,'onegin343@ukr.net','194.28.102.5','Kyiv','Ukraine','50.4547, 30.5238','2022-01-26 10:29:30','/profile','localhost:3000',1),(6,'onegin343@ukr.net','194.28.102.5','Kyiv','Ukraine','50.4547, 30.5238','2022-01-26 10:29:30','profile','undefined',1),(7,'onegin343@ukr.net','194.28.102.5','Kyiv','Ukraine','50.4547, 30.5238','2022-01-26 10:31:17','dashboard','localhost:3000',1),(8,'onegin343@ukr.net','194.28.102.5','Kyiv','Ukraine','50.4547, 30.5238','2022-01-26 10:31:17','/profile','localhost:3000',1),(9,'onegin343@ukr.net','194.28.102.5','Kyiv','Ukraine','50.4547, 30.5238','2022-01-26 10:31:17','profile','undefined',1),(10,'onegin343@ukr.net','194.28.102.5','Kyiv','Ukraine','50.4547, 30.5238','2022-01-26 10:39:35','dashboard','localhost:3000',1),(11,'onegin343@ukr.net','194.28.102.5','Kyiv','Ukraine','50.4547, 30.5238','2022-01-26 10:39:35','profile','localhost:3000',1),(12,'onegin343@ukr.net','194.28.102.5','Kyiv','Ukraine','50.4547, 30.5238','2022-01-26 10:39:35','profile','localhost:3000',1),(13,'onegin343@ukr.net','194.28.102.5','Kyiv','Ukraine','50.4547, 30.5238','2022-01-26 10:49:47','dashboard','localhost:3000',1),(14,'onegin343@ukr.net','194.28.102.5','Kyiv','Ukraine','50.4547, 30.5238','2022-01-27 12:48:55','dashboard','localhost:3000',1),(15,'onegin343@ukr.net','194.28.102.5','Kyiv','Ukraine','50.4547, 30.5238','2022-01-27 12:49:55','dashboard','localhost:3000',1),(16,'onegin343@ukr.net','194.28.102.5','Kyiv','Ukraine','50.4547, 30.5238','2022-01-27 12:49:56','dashboard','localhost:3000',1),(17,'onegin343@ukr.net','194.28.102.5','Kyiv','Ukraine','50.4547, 30.5238','2022-01-27 12:50:24','dashboard','localhost:3000',1),(18,'mail@mail.com','129.12.221.33','logdon','undefined','919182561 129841 192','2022/11/12','undefined','localhost:3000',1),(19,'mail@mail.com','129.12.221.33','logdon','undefined','919182561 129841 192','2022/11/12','смотрит работу логов для секурити юзера','localhost:3000',1),(20,'onegin343@ukr.net','129.12.221.33','logdon','undefined','919182561 129841 192','2022/11/12','смотрит работу логов для секурити юзера','localhost:3000',1),(21,'onegin343@ukr.net','129.12.221.33','logdon','undefined','919182561 129841 192','2022/11/12','смотрит работу логов для секурити юзера','localhost:3000',1),(22,'onegin343@ukr.net','129.12.221.33','logdon','undefined','919182561 129841 192','2022/11/12','смотрит работу логов для секурити юзера','localhost:3000',1),(23,'onegin343@ukr.net','129.12.221.33','logdon','undefined','919182561 129841 192','2022/11/12','смотрит работу логов для секурити юзера','localhost:3000',1),(24,'onegin343@ukr.net','129.12.221.33','logdon','undefined','919182561 129841 192','2022/11/12','смотрит работу логов для секурити юзера','localhost:3000',1),(25,'onegin343@ukr.net','129.12.221.33','logdon','undefined','919182561 129841 192','2022/11/12','смотрит работу логов для секурити юзера','localhost:3000',1),(26,'onegin343@ukr.net','129.12.221.33','logdon','undefined','919182561 129841 192','2022/11/12','смотрит работу логов для секурити юзера','localhost:3000',1),(27,'onegin343@ukr.net','129.12.221.33','logdon','undefined','919182561 129841 192','2022/11/12','смотрит работу логов для секурити юзера','localhost:3000',1),(28,'onegin343@ukr.net','129.12.221.33','logdon','undefined','919182561 129841 192','2022/11/12','смотрит работу логов для секурити юзера','localhost:3000',1);
/*!40000 ALTER TABLE `user_logs` ENABLE KEYS */;
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
  `date` varchar(50) NOT NULL,
  `value` float NOT NULL,
  `staff_user_id` int NOT NULL,
  `domain_name` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `staff_user_id` (`staff_user_id`),
  CONSTRAINT `user_promocode_ibfk_1` FOREIGN KEY (`staff_user_id`) REFERENCES `user_auth` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_promocode`
--

LOCK TABLES `user_promocode` WRITE;
/*!40000 ALTER TABLE `user_promocode` DISABLE KEYS */;
INSERT INTO `user_promocode` VALUES (1,'0','2020/11/11',0.32,1,'opentrade.cc'),(2,'1','2020/11/11',0.32,1,'opentrade.cc'),(3,'NYDxO2mV','2020/11/11',0.32,1,'opentrade.cc'),(4,'PkPhEaq9','2020/11/11',0.32,1,'opentrade.cc'),(5,'Xng0dW3K','2020/11/11',0.32,1,'opentrade.cc'),(6,'LZuY9AsN','2020/11/11',0.32,1,'opentrade.cc'),(7,'OgVFcL5v','2020/11/11',0.32,1,'opentrade.cc'),(8,'SXE4wp8h','2020/11/11',0.32,1,'opentrade.cc'),(9,'qI535aCB','2020/11/11',0.32,1,'opentrade.cc'),(10,'UUjM66iE','2020/11/11',0.32,1,'opentrade.cc'),(11,'LHJBS2Jm','2020/11/11',0.32,1,'opentrade.cc'),(12,'LHJBS2Jm','2020/11/11',0.41,1,'opentrade.cc'),(13,'LHJBS2Jm','2020/11/11',0.51,1,'opentrade.cc'),(14,'xWB4E3bR','2020/11/11',0.32,1,'opentrade.cc'),(15,'xWB4E3bR','2020/11/11',0.41,1,'opentrade.cc'),(16,'xWB4E3bR','2020/11/11',0.51,1,'opentrade.cc'),(17,'ylkhdXC2','2020/11/11',0.32,1,'opentrade.cc'),(18,'ylkhdXC2','2020/11/11',0.41,1,'opentrade.cc'),(19,'ylkhdXC2','2020/11/11',0.51,1,'opentrade.cc'),(20,'D65O4ldL','2020/11/11',0.32,1,'opentrade.cc'),(21,'D65O4ldL','2020/11/11',0.41,1,'opentrade.cc'),(22,'D65O4ldL','2020/11/11',0.51,1,'opentrade.cc'),(23,'SPg3STfD','2020/11/11',0.32,1,'opentrade.cc'),(24,'SPg3STfD','2020/11/11',0.41,1,'opentrade.cc'),(25,'SPg3STfD','2020/11/11',0.51,1,'opentrade.cc'),(26,'HM1eANUz','2020/11/11',0.32,1,'opentrade.cc'),(27,'HM1eANUz','2020/11/11',0.41,1,'opentrade.cc'),(28,'HM1eANUz','2020/11/11',0.51,1,'opentrade.cc'),(29,'[object Object]','2020/11/11',0.32,1,'opentrade.cc'),(30,'[object Object]','2020/11/11',0.41,1,'opentrade.cc'),(31,'[object Object]','2020/11/11',0.51,1,'opentrade.cc'),(32,'[object Object]','2020/11/11',0.004,1,'opentrade.cc'),(33,'[object Object]','2020/11/11',0.032,1,'opentrade.cc'),(34,'t06Lf3QR','2020/11/11',0.32,1,'opentrade.cc'),(35,'T99zSwV0','2020/11/11',0.41,1,'opentrade.cc'),(36,'GobwUBp8','2020/11/11',0.51,1,'opentrade.cc'),(37,'N5R85IAl','2020/11/11',0.004,1,'opentrade.cc'),(38,'Lkq0HzqM','2020/11/11',0.032,1,'opentrade.cc'),(39,'CJh2cSnq','2020/11/11',0.92,1,'opentrade.cc'),(40,'OhPkdLj9','2022/11/12',0.22,1,'localhost:3000'),(41,'43H6bECJ','2022/11/12',0.032,1,'localhost:3000'),(42,'SLi384oH','2022/11/12',0.321,1,'localhost:3000'),(43,'A1rv3APw','2022/11/12',0.003,1,'localhost:3000'),(44,'KhQJA90X','2022/11/12',0.7,1,'localhost:3000');
/*!40000 ALTER TABLE `user_promocode` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-27 17:22:06
