-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 23, 2022 at 06:53 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodedatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(1, 'Action'),
(2, 'Horror'),
(3, 'Comedy'),
(4, 'Drama'),
(5, 'Mistery'),
(6, 'Documentary'),
(7, 'Romance'),
(8, 'Western'),
(9, 'Animated'),
(10, 'Fantasy'),
(11, 'Crime'),
(12, 'Adventure'),
(13, 'Thriller'),
(14, 'Sci-Fi');

-- --------------------------------------------------------

--
-- Table structure for table `cat_movies`
--

CREATE TABLE `cat_movies` (
  `id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `cat_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cat_movies`
--

INSERT INTO `cat_movies` (`id`, `movie_id`, `cat_id`) VALUES
(1, 1, 11),
(2, 1, 1),
(3, 1, 12),
(4, 1, 3),
(5, 2, 1),
(6, 2, 11),
(7, 2, 13),
(8, 4, 12),
(9, 4, 10),
(10, 22, 1),
(11, 22, 12),
(12, 22, 3),
(13, 29, 1),
(14, 29, 12),
(15, 29, 10),
(16, 28, 1),
(17, 28, 12),
(18, 28, 14),
(19, 27, 1),
(20, 27, 12),
(21, 27, 14),
(22, 26, 1),
(23, 26, 12),
(24, 26, 14),
(25, 25, 1),
(26, 25, 12),
(27, 25, 14),
(30, 24, 1),
(31, 24, 12),
(32, 24, 14),
(33, 30, 1),
(34, 30, 12),
(35, 30, 14);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `description` varchar(600) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `modified_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `user_id`, `description`, `movie_id`, `created_at`, `modified_at`) VALUES
(2, 10, 'Ez egy rossz film', 22, '2022-04-08 22:50:25', NULL),
(3, 7, 'Ez egy uj komment csak a teszt kedveert', 1, '2022-04-09 11:18:57', NULL),
(4, 8, 'Az egyik kedvencem 10/10. Imadom a szineszt es egyszeruen az osszeallitas valami zsenialis. Effektusok, robbanasok, szornyek, a leheto legjobbak. Es csak azert van ez a komment hogy kiprobaljuk hogy nez ki egy hosszu komment a listaban. Koszi kosziii', 22, '2022-04-09 15:09:34', NULL),
(5, 8, 'Az egyik kedvencem 10/10. Imadom a szineszt es egyszeruen az osszeallitas valami zsenialis. Effektusok, robbanasok, szornyek, a leheto legjobbak. Es csak azert van ez a komment hogy kiprobaljuk hogy nez ki egy hosszu komment a listaban. Koszi kosziiiAz egyik kedvencem 10/10. Imadom a szineszt es egyszeruen az osszeallitas valami zsenialis. Effektusok, robbanasok, szornyek, a leheto legjobbak. Es csak azert van ez a komment hogy kiprobaljuk hogy nez ki egy hosszu komment a listaban. Koszi kosziii', 22, '2022-04-09 15:12:38', NULL),
(9, 5, 'Best movie of 2021', 29, '2022-04-29 10:47:35', NULL),
(10, 5, 'Its just one of my favourites', 22, '2022-05-17 13:59:21', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `favourites`
--

CREATE TABLE `favourites` (
  `favourites_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `favourites`
--

INSERT INTO `favourites` (`favourites_id`, `user_id`, `movie_id`) VALUES
(11, 5, 29),
(14, 5, 4),
(17, 5, 22),
(20, 7, 30);

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `likes_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `is_liked` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`likes_id`, `movie_id`, `user_id`, `is_liked`) VALUES
(1, 22, 5, 1),
(2, 4, 5, 0),
(11, 1, 5, 1),
(13, 29, 5, 1),
(14, 27, 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `list`
--

CREATE TABLE `list` (
  `list_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `list`
--

INSERT INTO `list` (`list_id`, `user_id`, `movie_id`) VALUES
(18, 7, 27),
(19, 7, 28),
(21, 5, 24),
(22, 5, 25),
(25, 5, 30),
(27, 5, 2),
(28, 5, 1),
(29, 5, 28);

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `movieName` varchar(100) NOT NULL,
  `movieDescription` varchar(500) NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `video` varchar(500) DEFAULT NULL,
  `releaseDate` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `movieName`, `movieDescription`, `image`, `video`, `releaseDate`) VALUES
(1, 'Red Notice', 'An FBI profiler pursuing the world\'s most wanted art thief becomes his reluctant partner in crime to catch an elusive crook who\'s always one step ahead.', 'rednotice.jpg', NULL, 2021),
(2, 'Fast and Furious 5', 'Dominic Toretto and his crew of street racers plan a massive heist to buy their freedom while in the sights of a powerful Brazilian drug lord and a dangerous federal agent.', 'fastandfurious.jpg', NULL, 2011),
(4, 'Harry Potter', 'As Harry, Ron, and Hermione race against time and evil to destroy the Horcruxes, they uncover the existence of the three most powerful objects in the wizarding world: the Deathly Hallows.', 'harrypotter.jpeg', NULL, 2010),
(22, 'Love and Monsters', 'Seven years after he survived the monster apocalypse, lovably hapless Joel leaves his cozy underground bunker behind on a quest to reunite with his ex.', 'lovemonsters.jpg', NULL, 2020),
(24, 'Avengers', 'Earth\'s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.', 'avengers.jpg', NULL, 2012),
(25, 'Age of Ultron', 'When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it\'s up to Earth\'s mightiest heroes to stop the villainous Ultron from enacting his terrible plan.', 'ageofultron.jpeg', NULL, 2015),
(26, 'Iron Man 3', 'When Tony Stark\'s world is torn apart by a formidable terrorist called the Mandarin, he starts an odyssey of rebuilding and retribution.', 'ironman3.jpg', NULL, 2013),
(27, 'Civil War', 'Political involvement in the Avengers\' affairs causes a rift between Captain America and Iron Man.', 'civil war.jpg', NULL, 2016),
(28, 'Winter Soldier', 'As Steve Rogers struggles to embrace his role in the modern world, he teams up with a fellow Avenger and S.H.I.E.L.D agent, Black Widow, to battle a new threat from history: an assassin known as the Winter Soldier.', 'winter soldier.jpg', NULL, 2014),
(29, 'No Way Home', 'With Spider-Man\'s identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.', 'nowayhome.jpg', NULL, 2021),
(30, 'Jurassic World', 'A new theme park, built on the original site of Jurassic Park, creates a genetically modified hybrid dinosaur, the Indominus Rex, which escapes containment and goes on a killing spree.', 'jurassic world.jpg', NULL, 2015);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `description` varchar(400) NOT NULL,
  `is_seen` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `reactions`
--

CREATE TABLE `reactions` (
  `reaction_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `is_liked` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reactions`
--

INSERT INTO `reactions` (`reaction_id`, `user_id`, `comment_id`, `is_liked`) VALUES
(14, 8, 2, 1),
(18, 5, 2, 0),
(20, 5, 4, 1),
(21, 5, 3, 0),
(25, 5, 5, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(500) NOT NULL,
  `is_admin` tinyint(1) DEFAULT NULL,
  `profile_pic` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `username`, `password`, `is_admin`, `profile_pic`) VALUES
(5, 'test@citromail.com', 'dalaa', '$2b$10$SLeg1agO3NTNECKk8IkSv.SxS/ANOV8hE9tFBblwe.Lp7FrW.pn7y', 0, 'image-1649269075049-wallpaper2.jpg'),
(6, 'superadmin@erdsoft.com', 'test1', '$2b$10$wzvrGhw5a5KoxhDH7.VACOfsx8PgUE2GHsuSN0qD6Eb429lAqlwAS', 0, NULL),
(7, 'krisztianpasztor11@gmail.com', 'kecskeHarcos69', '$2b$10$YcXhV6/sNnBPMiX5mQ7TB.TZG/YbnTo.jkXKtskjo6KGnQ8CUx33y', 0, NULL),
(8, 'balaaa@gmail.com', 'asd', '$2b$10$7Y6mTwHZdAsB6oif5tt6WOmQ4IX7IipW2IghTiqE6hKxdj3rU1MLq', 0, 'image-1649268469264-born.jpeg'),
(10, 'new@gmail.com', 'newusername', '$2b$10$MMHQIrSswSkq.WfDy.KdMuP.oY88ziDGYkfjf/ypdy3E03DT8hsQW', 0, NULL),
(11, 'admin@gmail.com', 'test admin', '$2b$10$/V9ufNoMknusjbt1DocFROmowaTXDaBUKZSQXwRbHO6NnVUMrqQNC', 1, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `cat_movies`
--
ALTER TABLE `cat_movies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `movie_id` (`movie_id`),
  ADD KEY `cat_id` (`cat_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `movie_id` (`movie_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `favourites`
--
ALTER TABLE `favourites`
  ADD PRIMARY KEY (`favourites_id`),
  ADD KEY `movie_id` (`movie_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`likes_id`),
  ADD KEY `movie_id` (`movie_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `list`
--
ALTER TABLE `list`
  ADD PRIMARY KEY (`list_id`),
  ADD KEY `movie_id` (`movie_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `reactions`
--
ALTER TABLE `reactions`
  ADD PRIMARY KEY (`reaction_id`),
  ADD KEY `comment_id` (`comment_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `cat_movies`
--
ALTER TABLE `cat_movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `favourites`
--
ALTER TABLE `favourites`
  MODIFY `favourites_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `likes_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `list`
--
ALTER TABLE `list`
  MODIFY `list_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reactions`
--
ALTER TABLE `reactions`
  MODIFY `reaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cat_movies`
--
ALTER TABLE `cat_movies`
  ADD CONSTRAINT `cat_movies_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cat_movies_ibfk_2` FOREIGN KEY (`cat_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `favourites`
--
ALTER TABLE `favourites`
  ADD CONSTRAINT `favourites_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favourites_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `list`
--
ALTER TABLE `list`
  ADD CONSTRAINT `list_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `list_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reactions`
--
ALTER TABLE `reactions`
  ADD CONSTRAINT `reactions_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`comment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
