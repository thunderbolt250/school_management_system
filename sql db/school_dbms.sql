-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 30 août 2024 à 10:23
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `school_dbms`
--

-- --------------------------------------------------------

--
-- Structure de la table `students`
--

CREATE TABLE `students` (
  `No` int(11) NOT NULL,
  `Names` varchar(255) NOT NULL,
  `Grade` int(50) NOT NULL,
  `Gender` varchar(10) NOT NULL,
  `Age` int(11) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Province` varchar(25) NOT NULL,
  `District` varchar(25) NOT NULL,
  `Sector` varchar(25) NOT NULL,
  `Cell` varchar(25) NOT NULL,
  `Village` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `students`
--

INSERT INTO `students` (`No`, `Names`, `Grade`, `Gender`, `Age`, `Email`, `Province`, `District`, `Sector`, `Cell`, `Village`) VALUES
(1, 'Mwesigye Emmy', 6, 'Male', 27, 'mwesigyeemmy20@gmail.com', 'Kigali', 'Gasabo', 'Kacyiru', 'Kamutwa', 'Kanserege'),
(2, 'kirabo Annet', 4, 'Female', 30, 'kirabo@yahoo.com', 'East', 'Bugesera', 'Gashora', 'Biryogo', 'Bidudu'),
(3, 'mfuranziza', 3, 'Female', 23, 'mfuranziza@gmail.com', 'Kigali', 'Kicukiro', 'Kicukiro', 'Kagina', 'Umunyinya'),
(5, 'peter', 3, 'Male', 34, 'peter@gmail.com', 'South', 'Huye', 'Rwaniro', 'Mwendo', 'Cyarera'),
(6, 'kamana gervais', 4, 'Male', 20, 'kamana@gmail.com', 'East', 'Nyagatare', 'Matimba', 'Cyembogo', 'Kamahoro'),
(7, 'scott', 5, 'Male', 34, 'scott@gmail.com', 'West', 'Nyabihu', 'Bigogwe', 'Kijote', 'Zihari');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `No` int(11) NOT NULL,
  `Names` varchar(25) NOT NULL,
  `Username` varchar(25) NOT NULL,
  `Email` varchar(25) NOT NULL,
  `Password` varchar(200) NOT NULL,
  `Picture` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`No`, `Names`, `Username`, `Email`, `Password`, `Picture`) VALUES
(1, 'mwesigye emmy', 'Thunderbolt', 'mwesigyeemmy020@gmail.com', '$2b$10$WD2RcuECwJO8n0pRYaKO9.KwqBAZQuSvA8Mabrmg0sHGh7QgwQUUe', 'uploads/1722066839550-thunderb.jpg'),
(2, 'kamana gervais', 'kg2', 'kamana@gmail.com', '$2b$10$WD2RcuECwJO8n0pRYaKO9.KwqBAZQuSvA8Mabrmg0sHGh7QgwQUUe', 'uploads/1722069193283-kg2.png'),
(3, 'mfuranziza', 'kevg', 'mfuranziza@gmail.com', '$2b$10$WD2RcuECwJO8n0pRYaKO9.KwqBAZQuSvA8Mabrmg0sHGh7QgwQUUe', 'uploads/1722352057903-kevine.jpeg'),
(5, 'scott', 'scottx', 'scott@gmail.com', 'scott', ''),
(6, 'karuhanga', 'karukix', 'karuhanga@gmail.com', 'karuhanga', ''),
(7, 'nadia umuhoza', 'nadine', 'nadia@gmail.com', 'nadia', ''),
(8, 'jimmy big', 'bigjim', 'jimmy@gmail.com', '1234', ''),
(10, 'mugisha jackson', 'mugix', 'mugisha@gmail.com', '$2b$10$Jr5HEzoLrWzWfLlgo.HHAeRhfYFrYqmf2NxjHqpYuxFZHqtmOs75C', '');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`No`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`No`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `students`
--
ALTER TABLE `students`
  MODIFY `No` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `No` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
