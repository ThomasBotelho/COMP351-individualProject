-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 25, 2021 at 12:04 AM
-- Server version: 5.7.33
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thomasbo_individualProject`
--

-- --------------------------------------------------------

--
-- Table structure for table `quoteList`
--

CREATE TABLE `quoteList` (
  `quoteID` int(11) NOT NULL,
  `quoteText` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `quoteList`
--

INSERT INTO `quoteList` (`quoteID`, `quoteText`) VALUES
(1, '\"Always remember that you are absolutely unique.  Just like everyone else.\" - Grandma'),
(2, '\"Normal is not something to aspire to, it\'s something to get away from.\" - Jodie Foster');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `quoteList`
--
ALTER TABLE `quoteList`
  ADD PRIMARY KEY (`quoteID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
