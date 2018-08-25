CREATE DATABASE  IF NOT EXISTS `project_two` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `project_two`;
-- MySQL dump 10.13  Distrib 8.0.11, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: project_two
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `traveltables`
--

DROP TABLE IF EXISTS `traveltables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `traveltables` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `future_location` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `traveltables`
--

LOCK TABLES `traveltables` WRITE;
/*!40000 ALTER TABLE `traveltables` DISABLE KEYS */;
INSERT INTO `traveltables` VALUES (1,'Michelle','michelle@michelle.com','https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350','BRA,COL,ARG,USA','2018-08-24 04:10:55','2018-08-24 18:04:38'),(2,'Jacob','jrnels10@gmail.com','https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/10402965_10153670228184125_4801898598549483650_n.jpg?_nc_cat=0&oh=b32e657b8922b359227e8e76be22afdc&oe=5C39CC6E','BRA,ARG,MEX,AUS,CHN','2018-08-24 04:10:55','2018-08-24 18:04:38'),(3,'Craig','craig@craig.com','https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350','FRA,ESP,IND,KAZ,AFG,MNG,CHN,RUS,AUS,CAN','2018-08-24 04:10:55','2018-08-24 18:04:38'),(4,'Coco','coco@woof.com','https://scontent-lax3-1.xx.fbcdn.net/v/t1.15752-9/40045422_2123909161190900_2984320874158489600_n.jpg?_nc_cat=0&oh=00e0c0291bb7b68a966204b0fc51fd8a&oe=5BF95C7E','MEX,COL,PER,BRA,SUR,DZA,NER,BWA,TZA,AGO,AUS,IND,PAK,CHN','2018-08-24 04:10:55','2018-08-24 18:04:38'),(5,'Rachel','rachel@rachel.com','https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350','PER,BRA,BWA,ZAF,AUS,CHN,JPN,FRA,UKR,TUR,SAU,USA,MEX','2018-08-24 04:10:55','2018-08-24 18:04:38'),(6,'Craig','craig@craig.com','https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350','BRA,USA,MEX,AUS,CHN','2018-08-24 04:10:55','2018-08-24 18:04:38'),(44,'Angel Lugo','theangellugo@gmail.com','https://lh5.googleusercontent.com/-IW-Q85HuvF0/AAAAAAAAAAI/AAAAAAAAnZM/Tvabw-MO9s8/photo.jpg','RUS,CHN,MNG,KAZ,BLR,FIN,NOR,BRA','2018-08-24 04:10:55','2018-08-24 18:04:38'),(47,'Jacob Nelson','jrnels10@gmail.com','https://lh4.googleusercontent.com/-6gNsecsEDVI/AAAAAAAAAAI/AAAAAAAAAEE/j40xD7fQsnM/photo.jpg','RUS,CHN,MNG,KAZ,BLR,FIN,NOR,BRA','2018-08-24 04:30:04','2018-08-24 04:30:30'),(48,'Meg Haack','meggie.haack@gmail.com','https://lh6.googleusercontent.com/-5mLtkqtuLTw/AAAAAAAAAAI/AAAAAAAAUd0/NWBdHqZfLjw/photo.jpg','AUS,HTI,CUB,ESP,FRA,GBR,ITA,BRA','2018-08-24 04:36:40','2018-08-24 04:37:09'),(49,'Britney Spars','lavendersaguaro@gmail.com','https://lh4.googleusercontent.com/-q5aExnYHnkU/AAAAAAAAAAI/AAAAAAAAAAc/WMvli0qMt_0/photo.jpg','ESP,ITA,FRA,CAN,AUS,RUS','2018-08-24 04:41:59','2018-08-24 16:59:18');
/*!40000 ALTER TABLE `traveltables` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-08-25  9:52:54
