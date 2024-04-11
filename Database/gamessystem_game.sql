-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: gamessystem
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
  `gameID` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `releaseYear` int DEFAULT NULL,
  `releaseMonth` int DEFAULT NULL,
  `releaseDay` int DEFAULT NULL,
  `ratingScore` int DEFAULT NULL,
  `ageRestriction` int DEFAULT NULL,
  `developerID` int DEFAULT NULL,
  `publisherID` int DEFAULT NULL,
  `genre` varchar(45) DEFAULT NULL,
  `imageLocation` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`gameID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (1,'With Us','Find a traitor thats in your friend group',2005,10,16,95,18,1,1,'Horror','/Images/Games/withus.png'),(2,'Sword Sprinter','Embark on a fast-paced journey as you dash and slash your way through hordes of enemies in Sword Sprinter.',2023,7,8,78,14,3,4,'Adventure','/Images/Games/swordsprint.jpg'),(3,'Terror Hit','Survive the horrors lurking around every corner in this spine-chilling horror experience, Terror Hit.',2022,11,20,92,18,1,2,'Horror','/Images/Games/terrorhit.jpg'),(4,'Digital Menace','Fight against rogue AI and unravel the mysteries of a digital world gone haywire in Digital Menace.',2024,5,3,88,17,4,1,'Sci-Fi','/Images/Games/digitalmenace.jpg'),(5,'Meshin','Dive into the depths of the ocean and explore its secrets in this underwater adventure, Meshin.',2023,9,12,82,15,5,5,'Adventure','/Images/Games/meshin.jpg'),(6,'Chick Flic','Experience the drama, romance, and comedy in this lighthearted simulation game, Chick Flic.',2022,8,28,75,13,6,6,'Simulation','/Images/Games/chickflic.jpg'),(7,'Legends of the Rift','Venture into a fantasy realm filled with magic, monsters, and adventure in Legends of the Rift.',2023,4,5,90,16,7,7,'RPG','/Images/Games/legends.jpg'),(8,'Monster','Unleash your inner beast and wreak havoc on the city streets in this monstrous rampage, Monster.',2024,2,10,85,18,8,8,'Action','/Images/Games/monster.png'),(9,'Car Fly','Defy gravity and race through the skies in high-speed flying cars in Car Fly.',2022,10,18,79,14,9,9,'Racing','/Images/Games/carfly.jpg'),(10,'Grass Simulator','Experience the thrill of mowing lawns and tending gardens in this relaxing simulation game, Grass Simulator.',2023,6,25,70,12,10,10,'Simulation','/Images/Games/touchgrass.jpg'),(11,'Stuck Iron','Navigate through treacherous landscapes and conquer formidable foes in the epic journey of Stuck Iron.',2024,1,14,86,17,11,11,'Adventure','/Images/Games/stuckiron.jpg'),(12,'Hawkguy','Take to the skies in this action-packed adventure as you control Hawkguy through daring missions and epic battles.',2024,3,15,85,16,2,3,'Action','/Images/Games/hawkguy.jpg'),(13,'Pizza Night','Try to survive working security for five nights at this pizza parlour',2010,6,21,89,15,12,5,'Horror','/Images/Games/pizzanight.jpg'),(14,'Blox World','Unleash your creativity and survival skills in this 3D world of blocks',2007,5,15,98,10,13,2,'Sandbox','/Images/Games/bloxworld.jpg'),(15,'Harvest Haven','Learn how to be a farmer in a small town in this interactive simulation',2016,2,27,100,14,1,1,'RPG','/Images/Games/harvesthaven.jpg'),(16,'Beat Blitz','Think you can hit the beats? Beat Blitz is an epic rhythm game for you to play',2008,12,1,78,12,5,5,'Rhythm','/Images/Games/beatblitz.jpg'),(17,'TGIF','Thank God it\'s Friday so you can get down on a rhythm rampage! ',2010,2,14,81,12,6,6,'Rhythm','/Images/Games/TGIF.jpg'),(18,'Blockverse','Play with your friends online through this game platform where everyone is shaped like a block',2005,11,18,65,13,2,2,'Sandbox','/Images/Games/blockverse.jpg'),(19,'Biweek','Fight to the death in a battle royale online',2017,5,4,90,13,7,7,'Sandbox','/Images/Games/biweek.jpg'),(20,'Fate','Enjoy this mythic fantasy role-playing game where you fight monsters and level up your character',2017,8,29,40,15,9,10,'RPG','/Images/Games/fate.jpg');
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-10 18:50:37
