-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 12, 2022 at 03:54 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gassin`
--

-- --------------------------------------------------------

--
-- Table structure for table `hasil`
--

CREATE TABLE `hasil` (
  `id_hasil` int(11) NOT NULL,
  `id_room` varchar(16) DEFAULT NULL,
  `tanggal` varchar(10) DEFAULT NULL,
  `jam_mulai` time NOT NULL,
  `jam_selesai` time NOT NULL,
  `voting` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hasil`
--

INSERT INTO `hasil` (`id_hasil`, `id_room`, `tanggal`, `jam_mulai`, `jam_selesai`, `voting`) VALUES
(78, '50NW9o2Vv1vY6uAZ', '2001-12-7', '06:30:00', '06:36:00', 0),
(79, '50NW9o2Vv1vY6uAZ', '2001-12-7', '07:01:00', '07:36:00', 0),
(80, '50NW9o2Vv1vY6uAZ', '2001-12-7', '08:01:00', '08:30:00', 0),
(81, '50NW9o2Vv1vY6uAZ', '2001-12-7', '09:30:00', '09:36:00', 0),
(82, '50NW9o2Vv1vY6uAZ', '2001-12-7', '10:01:00', '10:30:00', 0),
(83, '50NW9o2Vv1vY6uAZ', '2001-12-7', '14:30:00', '14:36:00', 0),
(84, '50NW9o2Vv1vY6uAZ', '2001-12-7', '15:01:00', '15:36:00', 0),
(85, '50NW9o2Vv1vY6uAZ', '2001-12-7', '16:01:00', '16:30:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `jadwal_pengguna`
--

CREATE TABLE `jadwal_pengguna` (
  `id_jadwal_pengguna` int(11) NOT NULL,
  `id_pengguna` int(11) DEFAULT NULL,
  `tanggal` date NOT NULL,
  `jam_mulai` time DEFAULT NULL,
  `jam_selesai` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jadwal_pengguna`
--

INSERT INTO `jadwal_pengguna` (`id_jadwal_pengguna`, `id_pengguna`, `tanggal`, `jam_mulai`, `jam_selesai`) VALUES
(2, 53, '2023-01-07', '14:40:00', '15:00:00'),
(3, 53, '2023-01-07', '16:59:00', '17:20:00'),
(4, 53, '2023-01-07', '19:50:00', '20:30:00'),
(5, 54, '2023-01-07', '19:20:00', '20:20:00'),
(6, 55, '2023-01-07', '14:40:00', '14:50:00'),
(7, 55, '2023-01-07', '19:20:00', '20:30:00'),
(8, 55, '2023-01-07', '16:40:00', '16:50:00'),
(9, 56, '2023-01-07', '19:20:00', '20:20:00'),
(94, 57, '2022-12-16', '09:00:00', '09:10:00'),
(95, 57, '2022-12-16', '15:00:00', '15:10:00'),
(99, 57, '2022-12-24', '11:30:00', '11:35:00'),
(100, 57, '2022-12-24', '18:55:00', '19:15:00'),
(104, 58, '2022-12-16', '09:05:00', '09:15:00'),
(105, 58, '2022-12-16', '14:55:00', '15:20:00'),
(109, 58, '2022-12-24', '11:00:00', '11:20:00'),
(110, 58, '2022-12-24', '19:00:00', '19:10:00'),
(129, 59, '2023-01-06', '17:00:00', '17:30:00'),
(130, 59, '2023-01-06', '20:52:00', '22:53:00'),
(131, 59, '2023-01-06', '07:01:00', '08:00:00'),
(132, 59, '2023-01-06', '10:00:00', '11:00:00'),
(133, 59, '2023-01-06', '14:00:00', '15:00:00'),
(134, 59, '2023-01-06', '17:00:00', '17:30:00'),
(135, 60, '2022-12-07', '06:50:00', '08:50:00'),
(136, 60, '2022-12-07', '09:50:00', '10:50:00'),
(137, 60, '2022-12-07', '14:51:00', '16:53:00');

-- --------------------------------------------------------

--
-- Table structure for table `pengguna`
--

CREATE TABLE `pengguna` (
  `id_pengguna` int(11) NOT NULL,
  `id_room` varchar(16) DEFAULT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `peran` varchar(20) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pengguna`
--

INSERT INTO `pengguna` (`id_pengguna`, `id_room`, `nama`, `peran`, `status`) VALUES
(53, 'QurW8oRv98dJn_ho', 'Fitri Andriyani', 'host', 0),
(54, 'QurW8oRv98dJn_ho', 'Malika', 'entrant', 0),
(55, 'QurW8oRv98dJn_ho', 'Anam', 'entrant', 0),
(56, 'QurW8oRv98dJn_ho', 'Na Jaemin', 'entrant', 0),
(57, '3jXVEe99DdXYwP1k', 'Na Jaemin', 'host', 0),
(58, '3jXVEe99DdXYwP1k', 'Lee Jeno', 'entrant', 0),
(59, 'QurW8oRv98dJn_ho', 'Jeno', 'entrant', 1),
(60, '50NW9o2Vv1vY6uAZ', 'Fitri Andriyani', 'host', 1),
(61, '50NW9o2Vv1vY6uAZ', 'Lee Haechan', 'entrant', 0),
(65, '50NW9o2Vv1vY6uAZ', 'Anam', 'entrant', 0),
(67, '50NW9o2Vv1vY6uAZ', '202410102062', 'entrant', 0),
(68, 'O-Diq3BcUSFC0h8I', 'Na Jaemin', 'host', 0),
(90, 'O-Diq3BcUSFC0h8I', 'Renjun', 'entrant', 0),
(91, 'T1GMV7gZqSas17xD', 'Jisung', 'host', 0);

-- --------------------------------------------------------

--
-- Table structure for table `pilihan_hari`
--

CREATE TABLE `pilihan_hari` (
  `id_pilihan_hari` int(11) NOT NULL,
  `id_room` varchar(16) DEFAULT NULL,
  `hari_dan_tanggal` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pilihan_hari`
--

INSERT INTO `pilihan_hari` (`id_pilihan_hari`, `id_room`, `hari_dan_tanggal`) VALUES
(27, 'QurW8oRv98dJn_ho', '2023-01-07'),
(28, '3jXVEe99DdXYwP1k', '2022-12-16'),
(29, '3jXVEe99DdXYwP1k', '2022-12-24'),
(30, '50NW9o2Vv1vY6uAZ', '2022-12-07'),
(31, 'O-Diq3BcUSFC0h8I', '2022-12-15'),
(32, 'O-Diq3BcUSFC0h8I', '2022-12-23'),
(33, 'T1GMV7gZqSas17xD', '2022-12-12'),
(34, 'T1GMV7gZqSas17xD', '2022-12-23'),
(35, 'T1GMV7gZqSas17xD', '2023-01-03');

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `id_room` varchar(16) NOT NULL,
  `nama_room` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`id_room`, `nama_room`) VALUES
('3jXVEe99DdXYwP1k', 'Meet Up with 2 Days Option'),
('50NW9o2Vv1vY6uAZ', 'Fitri\'s Birthday'),
('O-Diq3BcUSFC0h8I', 'Jeno\'s Birthday'),
('QurW8oRv98dJn_ho', 'Fitri\'s Birthday'),
('T1GMV7gZqSas17xD', 'Jisung\'s Birthday');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hasil`
--
ALTER TABLE `hasil`
  ADD PRIMARY KEY (`id_hasil`);

--
-- Indexes for table `jadwal_pengguna`
--
ALTER TABLE `jadwal_pengguna`
  ADD PRIMARY KEY (`id_jadwal_pengguna`);

--
-- Indexes for table `pengguna`
--
ALTER TABLE `pengguna`
  ADD PRIMARY KEY (`id_pengguna`);

--
-- Indexes for table `pilihan_hari`
--
ALTER TABLE `pilihan_hari`
  ADD PRIMARY KEY (`id_pilihan_hari`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id_room`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hasil`
--
ALTER TABLE `hasil`
  MODIFY `id_hasil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `jadwal_pengguna`
--
ALTER TABLE `jadwal_pengguna`
  MODIFY `id_jadwal_pengguna` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=138;

--
-- AUTO_INCREMENT for table `pengguna`
--
ALTER TABLE `pengguna`
  MODIFY `id_pengguna` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `pilihan_hari`
--
ALTER TABLE `pilihan_hari`
  MODIFY `id_pilihan_hari` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
