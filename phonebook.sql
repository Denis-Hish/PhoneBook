-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Хост: MySQL-8.4:3306
-- Время создания: Янв 14 2026 г., 11:10
-- Версия сервера: 8.4.6
-- Версия PHP: 8.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `phonebook`
--

-- --------------------------------------------------------

--
-- Структура таблицы `authentications`
--

CREATE TABLE `authentications` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `hashedPassword` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `authentications`
--

INSERT INTO `authentications` (`id`, `username`, `hashedPassword`, `createdAt`, `updatedAt`, `role`) VALUES
(1, 'admin', '$2b$10$3Tr/HeX1HJzlR4QvNE6LN.x8Tfu.hjCY5uY0u19C58VbHfPk4LiBu', '2026-01-08 08:11:07', '2026-01-14 09:37:33', 'admin'),
(21, 'test', '$2b$10$rG5jf5jOc6edMUWzuGUTW.yRtws/kcF8Mu1Y8tCo2e4bgs53MgM6O', '2026-01-14 09:38:16', '2026-01-14 09:38:16', 'user');

-- --------------------------------------------------------

--
-- Структура таблицы `phones`
--

CREATE TABLE `phones` (
  `id` int NOT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `phoneNumber1` varchar(255) DEFAULT NULL,
  `phoneNumber2` varchar(255) DEFAULT NULL,
  `phoneNumber3` varchar(255) DEFAULT NULL,
  `group` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `phones`
--

INSERT INTO `phones` (`id`, `userName`, `phoneNumber1`, `phoneNumber2`, `phoneNumber3`, `group`, `createdAt`, `updatedAt`) VALUES
(6, 'Dyrektor Wyk.', '211', '', '', 'Biuro', '2026-01-09 10:51:35', '2026-01-09 10:51:35'),
(7, 'IT', '205', '', '', 'Biuro', '2026-01-09 10:52:09', '2026-01-09 10:52:09'),
(8, 'Kadry', '210', '', '', 'Biuro', '2026-01-09 10:52:29', '2026-01-09 10:52:29'),
(9, 'Kluby Biuro', '204', '', '', 'Biuro', '2026-01-09 10:53:15', '2026-01-09 10:53:15'),
(10, 'Kluby Dyr.', '203', '', '', 'Biuro', '2026-01-09 10:53:56', '2026-01-09 10:53:56'),
(11, 'Księgowość', '208', '', '', 'Biuro', '2026-01-09 10:54:11', '2026-01-09 10:54:11'),
(12, 'Księgowość Dyr.', '209', '', '', 'Biuro', '2026-01-09 10:54:28', '2026-01-09 10:54:28'),
(13, 'NZOZ Archiwum', '410', '', '', 'Biuro', '2026-01-09 10:54:43', '2026-01-09 10:54:43'),
(14, 'NZOZ Biuro', '402', '', '', 'Biuro', '2026-01-09 10:55:00', '2026-01-09 10:55:00'),
(15, 'NZOZ Dyrektor', '401', '', '', 'Biuro', '2026-01-09 10:55:23', '2026-01-09 10:55:23'),
(16, 'NZOZ Rejestracja', '400', '', '', 'Biuro', '2026-01-09 10:55:47', '2026-01-09 10:55:47'),
(17, 'NZOZ Zakład terapii uzależnień', '', '602478089', '413669400', 'Biuro', '2026-01-09 10:56:14', '2026-01-09 10:56:14'),
(18, 'Prezes', '201', '', '', 'Biuro', '2026-01-09 10:57:03', '2026-01-09 10:57:03'),
(19, 'Projekty', '206', '', '', 'Biuro', '2026-01-09 10:57:29', '2026-01-09 10:57:29'),
(20, 'Sekretariat', '200', '', '', 'Biuro', '2026-01-09 10:57:45', '2026-01-09 10:57:45'),
(21, 'SNR Administracja', '403', '', '', 'Biuro', '2026-01-09 10:58:05', '2026-01-09 10:58:05'),
(22, 'Wiceprezes', '202', '', '', 'Biuro', '2026-01-09 10:58:25', '2026-01-09 10:58:25'),
(23, 'CIS Chmielnik', '', '730533883', '', 'CIS', '2026-01-09 10:58:52', '2026-01-09 10:58:52'),
(24, 'CIS Kielce', '', '537975037', '', 'CIS', '2026-01-09 10:59:19', '2026-01-09 10:59:19'),
(25, 'CIS Podgaje', '', '730533903', '', 'CIS', '2026-01-09 10:59:41', '2026-01-09 10:59:41'),
(26, 'Bar RONDO', '', '534006030', '', 'Placówki', '2026-01-09 11:00:03', '2026-01-09 11:00:03'),
(27, 'Catering Świętokrzyski', '', '533236636', '', 'Placówki', '2026-01-09 11:00:26', '2026-01-09 11:00:26'),
(28, 'NZOZ Hostel Janina', '', '691504015', '', 'Placówki', '2026-01-09 11:00:52', '2026-01-09 11:00:52'),
(29, 'NZOZ Hostel JNJ', '', '881779000', '', 'Placówki', '2026-01-09 11:01:14', '2026-01-09 11:01:14'),
(30, 'NZOZ Hostel Mielczarskiego', '', '690987788', '', 'Placówki', '2026-01-09 11:01:38', '2026-01-09 11:01:38'),
(31, 'NZOZ Ośrodek Pałęgi', '', '606329511', '413737567', 'Placówki', '2026-01-09 11:02:03', '2026-01-09 11:14:25'),
(32, 'NZOZ Ośrodek Wsparcia', '', '533325044', '', 'Placówki', '2026-01-09 11:14:48', '2026-01-09 11:14:48'),
(33, 'ŚDS Kielce', '500', '577404304', '412406779', 'Placówki', '2026-01-09 11:15:14', '2026-01-09 11:15:14'),
(34, 'ŚDS Podgaje', '', '607154259', '', 'Placówki', '2026-01-09 11:15:37', '2026-01-09 11:15:37'),
(35, 'WS Barwinek', '', '785980385', '', 'WS', '2026-01-09 11:16:03', '2026-01-09 11:16:03'),
(36, 'WS Grzymałków', '', '533011750', '', 'WS', '2026-01-09 11:16:21', '2026-01-09 11:16:21'),
(37, 'WS J.N.Jeziorańskiego', '', '503080186', '', 'WS', '2026-01-09 11:16:40', '2026-01-09 11:16:40'),
(38, 'WS Karczówkowska', '417', '', '413669417', 'WS', '2026-01-09 11:17:04', '2026-01-09 11:17:04'),
(39, 'WS Kostomłoty', '', '532159319', '', 'WS', '2026-01-09 11:17:23', '2026-01-09 11:17:23'),
(40, 'WS Naruszewicza', '', '690030002', '', 'WS', '2026-01-09 11:17:39', '2026-01-09 11:17:39'),
(41, 'WS Orla', '', '530235533', '', 'WS', '2026-01-09 11:17:55', '2026-01-09 11:17:55'),
(42, 'WS Podłęże', '', '731003103', '', 'WS', '2026-01-09 11:18:19', '2026-01-09 11:18:19'),
(43, 'WS Posłowicka', '', '887450214', '', 'WS', '2026-01-09 11:18:40', '2026-01-09 11:18:40'),
(44, 'WS Senior Hoża', '', '885910017', '', 'WS', '2026-01-09 11:19:56', '2026-01-09 11:19:56'),
(45, 'WS Senior JNJ', '', '885910015', '', 'WS', '2026-01-09 11:20:15', '2026-01-09 11:20:15'),
(46, 'WS Senior Urzędnicza', '', '721377963', '', 'WS', '2026-01-09 11:22:28', '2026-01-09 11:22:28'),
(47, 'WS Senior Żeromskiego', '', '721377893', '', 'WS', '2026-01-09 11:22:46', '2026-01-09 11:22:46'),
(48, 'WS Zagnańsk', '', '730735535', '', 'WS', '2026-01-09 11:23:02', '2026-01-09 11:23:02'),
(49, 'WS Żeromskiego', '', '730735535', '413133388', 'WS', '2026-01-09 11:23:22', '2026-01-09 11:23:22'),
(50, 'ZAZ Biuro', '', '534007010', '412436179', 'ZAZ', '2026-01-09 11:23:45', '2026-01-09 11:23:45'),
(51, 'ZAZ Kierownik', '301', '', '', 'ZAZ', '2026-01-09 11:24:07', '2026-01-09 11:24:07'),
(52, 'ZAZ Pralnia', '', '531202205', '', 'ZAZ', '2026-01-09 11:24:32', '2026-01-09 11:24:32'),
(53, 'ZAZ Sekretariat', '300', '', '', 'ZAZ', '2026-01-09 11:24:43', '2026-01-09 11:24:43'),
(54, 'ZAZ Smaczek', '', '533030207', '412787238', 'ZAZ', '2026-01-09 11:25:02', '2026-01-09 11:25:02'),
(55, 'ZAZ Trenerzy', '302', '', '', 'ZAZ', '2026-01-09 11:25:19', '2026-01-09 11:25:19');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `authentications`
--
ALTER TABLE `authentications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `username_2` (`username`),
  ADD UNIQUE KEY `username_3` (`username`),
  ADD UNIQUE KEY `username_4` (`username`),
  ADD UNIQUE KEY `username_5` (`username`),
  ADD UNIQUE KEY `username_6` (`username`);

--
-- Индексы таблицы `phones`
--
ALTER TABLE `phones`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `authentications`
--
ALTER TABLE `authentications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT для таблицы `phones`
--
ALTER TABLE `phones`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
