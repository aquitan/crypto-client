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
-- Table structure for table `deposit_history`
--

DROP TABLE IF EXISTS `deposit_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deposit_history` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) NOT NULL,
  `user_domain` varchar(255) NOT NULL,
  `coin_name` varchar(30) NOT NULL,
  `crypto_amount` double NOT NULL,
  `usd_amount` double NOT NULL,
  `date` timestamp NOT NULL,
  `address` varchar(80) NOT NULL,
  `status` varchar(30) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `deposit_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_auth` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deposit_history`
--

LOCK TABLES `deposit_history` WRITE;
/*!40000 ALTER TABLE `deposit_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `deposit_history` ENABLE KEYS */;
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
  `date_of_create` timestamp NOT NULL,
  `domain_id` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `domain_id` (`domain_id`),
  CONSTRAINT `domain_detail_ibfk_1` FOREIGN KEY (`domain_id`) REFERENCES `domain_list` (`ID`)
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
-- Table structure for table `domain_terms`
--

DROP TABLE IF EXISTS `domain_terms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `domain_terms` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `domain_name` varchar(100) NOT NULL,
  `terms_body` longtext NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domain_terms`
--

LOCK TABLES `domain_terms` WRITE;
/*!40000 ALTER TABLE `domain_terms` DISABLE KEYS */;
INSERT INTO `domain_terms` VALUES (1,'template','<h2>PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY. BY CLICKING THE \"CREATE ACCOUNT\" BUTTON OR BY ACCESSING OR USING THE SERVICES, YOU AGREE TO BE LEGALLY BOUND hBY THESE TERMS AND CONDITIONS AND ALL TERMS INCORPORATED BY REFERENCE.</h2>\n    <p>This summary of our Terms and Conditions offers you an overview of the key terms that apply to your use of our website and trading services. While we hope this summary section is helpful, you should read the complete Terms and Conditions of Service below since they provide important information about how our services work. Please note that we refer to our online service where you can execute trades as \"${domainSmall}\".</p>\n    <h3>Our Services</h3>\n    <p>${domainSmall} provides you with a simple and convenient way to trade one type of digital asset for another type of digital asset. Our services do not provide users with the ability to trade one form of legal tender for another form of legal tender. Additionally, the range of services available to you will depend in part upon the countries from which you access ${domainSmall}.</p>\n    <h3>Eligibility and Acceptable Use</h3>\n    <p>You must meet certain eligibility criteria to use ${domainSmall}. For instance, you must be an adult and there are certain locations from which you may not be able to use some or all of ${domainSmall}. Additionally, there are certain things you cannot do when using ${domainSmall}, such as engage in illegal activities, lie, or do anything that would cause damage to our services or systems. Please see the acceptable use section for more details.</p>\n    <h3>Trading Risks</h3>\n    <p>Engaging in any trade can be financially risky, and there can be higher financial risks if you engage in any margin transactions, use any other sophisticated trading options, or trade in digital assets that are subject to volatile market price movements. Please don&lsquo;t use ${domainSmall} if you do not understand these risks and enter into trades only when you understand the trading option you are using, the characteristics of the digital asset you intend to trade, and the potential financial risk of loss trading them entails.</p>\n    <h3>Other Important Legal Terms</h3>\n    <p>There are important legal terms provided below in the complete Terms and Conditions, including your indemnification responsibilities, our limitation of liability and warranty disclaimers, and your agreement to arbitrate most disputes. Please take the time to read these terms carefully. You can always contact us through support if you have any questions at ${domainSupport}</p>\n    <h3>1. Complete Terms and Conditions</h3>\n    <p>These Terms and Conditions and any terms expressly incorporated herein (\"Terms and Conditions\") apply to your access to and use of the websites and mobile applications ${domainSmall},  and its wholly owned subsidiaries (collectively, \"${domainSmall}\", \"we\", or \"us\"), and the trading and direct sale services provided by ${domainSmall} as described in these Terms and Conditions (collectively, our \"Services\").</p>\n    <h3>Key Definitions</h3>\n    <p>Capitalized terms not otherwise defined in these Terms and Conditions will have the following meaning:</p>\n    <p>1.1	\"External Account\" means any Financial Account or Digital Asset Account: from which you may load Funds into your ${domainSmall} Account, and to which you may transfer Funds from your ${domainSmall} Account.</p>\n    <p>1.2	\"Financial Account\" means any financial account of which you are the beneficial owner that is maintained by a third party outside of the Services, including, but not limited to third-party payment service accounts or accounts maintained by third party financial institutions.</p>\n    <p>1.3	\"Funds\" means Digital Asset and/or Legal Tender.</p>\n    <p>1.4	\"Legal Tender\" means any national currency, such as U.S. dollars, that may be used as the equivalent to display the comparative value of Digital Assets.</p>\n    <p>1.5	\"Premium Account\" It\n    s a special Account status provided by the ${domainSmall} Service that have its own activation value and it can be assigned to User(s) if they met special requirements such as Country of Residence and digital assets monthly turnover.</p>\n    <p>1.6	\"${domainSmall} Account\" means a user account accessible via the Services where Funds may be stored by ${domainSmall} on behalf of a user.</p>\n    <p>1.7	\"Digital Asset\" means bitcoins, ethereum and other digital assets that may be purchased, sold or traded via the Services.</p>\n    <p>1.8	\"Digital Asset Account\" means any Digital Asset address or account owned, controlled or operated by you that is maintained outside of the Services, and is not owned, controlled or operated by ${domainSmall}.</p>\n    <p>1.9	\"System\" means fully automatic software algorithm, which controls all parts and aspects of the exchange’s operations. System defines type of transactions, calculate fees, changes, and monitors status of your account, defines amount of special payments, to reduce the likelihood of the human factor. Any interference with System is prohibited by this document. Any action aimed as disabling System will entail any legitimate consequences.</p>\n    <h3>2. Eligibility</h3>\n    <p>${domainSmall} may not make the Services available in all markets and jurisdictions and may restrict or prohibit use of the Services from certain U.S. states or foreign jurisdictions (\"Restricted Locations\"). Certain Locations (“High-risk Locations for illegal financial transactions and fraud”) can impose certain restrictions such as an insurance payment, restriction in using some features, special limits and other restrictions, which can be defined and established by the System. The use of special programs and software to hide the real location will have consequences that will be also determined by the System.</p>\n    <p>You further represent and warrant that you: (a) are of legal age to form a binding contract (at least 18 years old in the U.S.); (b) have not previously been suspended or removed from using our Services; (c) have full power and authority to enter into this agreement and in doing so will not violate any other agreement to which you are a party; (d) are not located in, under the control of, or a national or resident of (i) any Restricted Locations, or (ii) any country to which the United States has embargoed goods or services; (e) are not identified as a \"Specially Designated National;\" (f) are not placed on the Commerce Department’s Denied Persons List; and (g) will not use our Services if any applicable laws in your country prohibit you from doing so in accordance with these Terms and Conditions.</p>\n    <h3>3.	${domainSmall} Account</h3>\n    <p>3.1	Number of ${domainSmall} Accounts. ${domainSmall} may, in its sole discretion, limit the number of ${domainSmall} Accounts that you may hold, maintain, or acquire. Creating multiple accounts is forbidden and may have consequences due to the blocking of the account, both or all accounts, funds, penalty, and other necessary measures taken by the arbitration this dispute.</p>\n    <p>3.2	${domainSmall} Account information and security. In order to engage in any trades via the Services, you must create a ${domainSmall} Account and provide any requested information. When you create a ${domainSmall} Account, you agree to: (a) create a strong password that you do not use for any other website or online service; (b) provide accurate and truthful information; (c) maintain and promptly update your ${domainSmall} Account information; (d) maintain the security of your ${domainSmall} Account by protecting your password and restricting access to your ${domainSmall} Account; (e) promptly notify us if you discover or otherwise suspect any security breaches related to your ${domainSmall} Account; and (f) take responsibility for all activities that occur under your ${domainSmall} Account and accept all risks of any authorized or unauthorized access to your ${domainSmall} Account, to the maximum extent permitted by law.</p>\n    <h3>4.	Privacy Policy</h3>\n    <p>Please refer to our Privacy Policy for information about how we collect, use and share your information.</p>\n    <h3>5.	General Obligations </h3>\n    <p>This Section 5 applies to: (i) all trades completed via the Services, (ii) your purchase and/or sale of Digital Assets directly from ${domainSmall} via the Services, and (iii) any transaction in which you load Funds into your ${domainSmall} Account from your External Account or transfer Funds from your ${domainSmall} Account into an External Account.</p>\n    <p>5.1	Conditions and Restrictions. We may, at any time and in our sole discretion, refuse any trade submitted via the Services, impose limits on the trade amount permitted via the Services or impose any other conditions or restrictions upon your use of the Services for funding your ${domainSmall} Account or for trading without prior notice. For example, we may limit the number of open orders that you may establish via the Services or we may restrict trades from certain locations.</p>\n    <p>5.2	Accuracy of Information. You must provide any information required when creating a ${domainSmall} Account or when prompted by any screen displayed within the Services. You represent and warrant that any information you provide via the Services is accurate and complete.</p>\n    <p>5.3	Cancellations. You may only cancel an order initiated via the Services if such cancellation occurs before ${domainSmall} executes the transaction. Once your order has been executed, you may not change, withdraw, or cancel your authorization for ${domainSmall} to complete such transaction. If an order has been partially filled, you may cancel the unfilled remainder unless the order relates to a market trade. We reserve the right to refuse any cancellation request associated with a market order once you have submitted such order. In contrast to exchange orders, all trades are irreversible once initiated. While we may, at our sole discretion, reverse a trade under certain extraordinary conditions, a customer does not have a right to a reversal of a trade.</p>\n    <p>5.4	Insufficient Funds. If you have an insufficient amount of Funds in your ${domainSmall} Account to complete an order via the Services, we may cancel the entire order or may fulfill a partial order using the amount of Funds currently available in your ${domainSmall} Account, less any fees owed to ${domainSmall} in connection with our execution of the trade (as described in Section 9).</p>\n    <p>5.5	Wallet Address Verification. If you transfer funds to your ${domainSmall} Account from an external service or wallet, your external address is automatically added to the list of verified wallets with your account. Balance withdrawals are allowed only into verified external wallet address.</p>\n    <p>5.6	Taxes. It is your responsibility to determine what, if any, taxes apply to the trades you complete via the Services, and it is your responsibility to report and remit the correct tax to the appropriate tax authority. You agree that ${domainSmall} is not responsible for determining whether taxes apply to your trades or for collecting, reporting, withholding, or remitting any taxes arising from any trades.</p>\n    <h3>6.	${domainSmall} Account Funds</h3>\n    <p>6.1	Funding your ${domainSmall} Account. In order to complete an order or trade via the Services (as described in Section 7), you must first load Funds to your ${domainSmall} Account using one of the approved External Accounts identified via the Services. You may be required to verify that you control the External Account that you use to load Funds to your ${domainSmall} Account. As further described in Section 9, you may be charged fees by the External Account you use to fund your ${domainSmall} Account. ${domainSmall} is not responsible for any External Account fees or for the management and security of any External Account. You are solely responsible for your use of any External Account, and you agree to comply with all Terms and Conditions applicable to any External Account. The timing associated with a load transaction will depend in part upon the performance of third parties responsible for maintaining the applicable External Account, and ${domainSmall} makes no guarantee regarding the amount of time it may take to load Funds into your ${domainSmall} Account. </p>\n    <p>6.2	Transferring Funds to an External Account. Provided that the balance of Funds in your ${domainSmall} Account is greater than any minimum balance requirements needed to satisfy any of your open positions, and subject to the restrictions, you may transfer any amount of Funds, up to the total amount of Funds in your ${domainSmall} Account in excess of such minimum balance requirements, from your ${domainSmall} Account to an External Account, less any fees charged by ${domainSmall} for such transactions (at the time of your request to transfer Funds to an External Account).</p>\n    <p>6.3	Load/Transfer Authorization. When you request that we load Funds into your ${domainSmall} Account from your External Account or request that we transfer Funds to your External Account from your ${domainSmall} Account, you authorize ${domainSmall} to execute such transaction via the Services.</p>\n    <p>6.4	Rejected Transactions. In some cases, an External Account may reject your Funds or may otherwise be unavailable to receive your Funds. You agree that you will not hold ${domainSmall} liable for any damages resulting from such rejected transactions.</p>\n    <h3>7.	Exchange Orders and Trades</h3>\n    <p>This Section applies only when you use the Services to trade Digital Assets for Legal Tender or vice versa, or to trade Digital Assets for another form of Digital Assets. ${domainSmall} does not purchase, sell, or exchange any Digital Assets on its own behalf.</p>\n    <p>7.1	Authorization. When you submit a new order via the Services, you authorize ${domainSmall} to execute a transaction in accordance with such order on a spot basis and charge you any applicable fees (as described in Section 10).</p>\n    <p>7.2	Independent relationship. You acknowledge and agree that: (a) ${domainSmall} is not acting as your broker, intermediary, agent, or advisor or in any fiduciary capacity, and (b) no communication or information provided to you by ${domainSmall} shall be considered or construed as advice.</p>\n    <p>7.3	Trade confirmation. Once the Services execute your trade, a confirmation will be electronically made available via the Services detailing the particulars of the trade. You acknowledge and agree that the failure of the Services to provide such confirmation shall not prejudice or invalidate the terms of such trade.</p>\n    <p>7.4	Trade options. Please refer to the %General_basics%, for information about the terminology used in connection with the trading options made available via the Services. If you do not understand the meaning of any trade option, we strongly encourage you not to utilize any of those options.</p>\n    <p>7.5	Market rates. If you select a market trade, ${domainSmall} will attempt, on a commercially reasonable basis, to execute the trade on or close to the prevailing market exchange rate, as defined via the Services. You acknowledge and agree that the exchange rate information made available via our Services may differ from prevailing exchange rates made available via other sources outside of the Services.</p>\n    <p>7.6	Market volatility. Particularly during periods of high volume, illiquidity, fast movement or volatility in the marketplace for any Digital Assets or Legal Tender, the actual market rate at which a market order or trade is executed may be different from the prevailing rate indicated via the Services at the time of your order or trade. You understand that we are not liable for any such price fluctuations. In the event of a market disruption or Force Majeure event (as defined in Section 24), ${domainSmall} may do one or more of the following: (a) suspend access to the Services; or (b) prevent you from completing any actions via the Services, including closing any open positions. Following any such event, when trading resumes, you acknowledge that prevailing market rates may differ significantly from the rates available prior to such event.</p>\n\n    <h3>8.	Risk Disclosure</h3>\n    <p>8.1	Trading risks. You acknowledge and agree that you shall access and use the Services at your own risk. The risk of loss in trading Digital Asset pairs and Digital Asset and Legal Tender pairs can be substantial. You should, therefore, carefully consider whether such trading is suitable for you your circumstances and financial resources.</p>\n\n    <p>You should be aware of the following points:</p>\n    <p>8.2	You may sustain a total loss of the Funds in your ${domainSmall} Account, and, in some cases, you may incur losses beyond such Funds.</p>\n    <p>8.3	Under certain market conditions, you may find it difficult or impossible to liquidate a position. This can occur, for example, when the market reaches a daily price fluctuation limit or there is insufficient liquidity in the market.</p>\n    <p>8.3	Placing contingent orders, such as \"stop-loss\" or \"stop-limit\" orders, will not necessarily limit your losses to the intended amounts, since market conditions may make it impossible to execute such orders.</p>\n    <p>8.4	All Digital Asset positions involve risk, and a \"spread\" position may not be less risky than an outright \"long\" or \"short\" position.</p>\n    <p>8.5	The use of leverage can work against you as well as for you and can lead to large losses as well as gains. </p>\n\n    <p>ALL OF THE POINTS NOTED ABOVE APPLY TO ALL DIGITAL ASSET PAIR AND DIGITAL ASSET AND LEGAL TENDER PAIR TRADING. THIS BRIEF STATEMENT CANNOT, OF COURSE, DISCLOSE ALL THE RISKS AND OTHER ASPECTS ASSOCIATED WITH THESE TRADES.</p>\n\n    <p>8.6	Internet transmission risks. You acknowledge that there are risks associated with utilizing an Internet-based trading system including, but not limited to, the failure of hardware, software, and Internet connections. You acknowledge that ${domainSmall} shall not be responsible for any communication failures, disruptions, errors, distortions or delays you may experience when trading via the Services, however caused.</p>\n\n    <h3>9.	Digital Asset Terms of Sale</h3>\n    <p>This Section applies only when you use the Services to purchase or sell Digital Assets directly from ${domainSmall}, a service available in limited jurisdictions only.</p>\n\n    <p>9.1	Prices; Availability. All prices reflect the exchange rates applicable to the purchase or sale of Digital Assets using the Legal Tender or alternative form of Digital Assets identified in your purchase order. All Digital Asset sales and purchases by ${domainSmall} are subject to availability, and we reserve the right to discontinue the sale and purchase of Digital Assets without notice.</p>\n    <p>9.2	Purchase Quotes. Prior to completing your purchase or sale of Digital Assets from ${domainSmall}, we will provide notice of the amount of Digital Assets you intend to purchase or sell and the amount of Funds you will be required to pay to ${domainSmall} to receive such Digital Assets or Legal Tender. You agree to comply with any Terms and Conditions provided within such notice to complete your purchase transaction.</p>\n    <p>9.3	Errors. In the event of an error, whether via our Services, in a purchase order confirmation, in processing your purchase, or otherwise, we reserve the right to correct such error and revise your purchase transaction accordingly (including charging the correct price) or to cancel the purchase and refund any amount received. Your sole remedy in the event of an error is to cancel your purchase order and obtain a refund of any amount charged.</p>\n    <p>9.4	Payment Method. Only one valid payment method is Digital Assets. You can pay for one Digital Asset in form of some coin by other Digital Asset in form of another coin according to the common rate, which is defined by ${domainSmall} exchange.</p>\n    <p>9.5	No Returns or Refunds. All sales and purchases of Digital Assets by ${domainSmall} via the Services are final. We do not accept any returns or provide refunds for your purchase of Digital Assets from ${domainSmall}, except as otherwise provided in these Terms.</p>\n\n    <h3>10.	Fees</h3>\n    <p>10.1	Amount of Fees. You agree to pay ${domainSmall} the fees for trades completed via our Services. You agree to pay %percent% fee from all incoming transactions. You agree to pay fee using Binary Options, which is determined by System.</p>\n    <p>10.2	Third-Party Fees. In addition to the Fees, your External Account may impose fees in connection with your use of your designated External Account via the Services. Any fees imposed by your External Account provider will not be reflected on the transaction screens containing information regarding applicable Fees. You are solely responsible for paying any fees imposed by an External Account provider.</p>\n    <p>10.3	Payment of Fees. You authorize us, or our designated payment processor, to charge or deduct your ${domainSmall} Account Funds for any applicable Fees owed in connection with trades you complete via the Services.</p>\n    <p>10.4	Collection-Related Costs. If you fail to pay Fees or any other amounts owed to ${domainSmall} under these Terms and ${domainSmall} refers your account(s) to a third party for collection, then ${domainSmall} will charge you the lesser of an 18% collection fee or the maximum percentage permitted by applicable law, to cover ${domainSmall}’s collection-related costs.</p>\n    <p>10.5	You agree to cover a special fee in the amount of 2.5% by obtaining the Premium Account status.</p>\n\n    <h3>11.	Electronic Notices</h3>\n    <p>11.1	Consent to Electronic Delivery. You agree and consent to receive electronically all communications, agreements, documents, receipts, notices and disclosures (collectively, \"Communications\") that ${domainSmall} provides in connection with your ${domainSmall} Account and/or use of the ${domainSmall} Services. You agree that ${domainSmall} may provide these Communications to you by posting them via the Services, by emailing them to you at the email address you provide, and/or by sending an SMS or text message to a mobile phone number that you provide. Your carrier&lsquo;s normal, messaging, data and other rates and fees may apply to any mobile Communications. You should maintain copies of electronic Communications by printing a paper copy or saving an electronic copy. You may also contact us through support to request additional electronic copies of Communications or, for a fee, paper copies of Communications (as described below).</p>\n    <p>11.2	Hardware and Software Requirements. To access and retain electronic Communications, you will need a computer with an Internet connection that has a current web browser with cookies enabled and 128-bit encryption. You will also need to have a valid email address on file with ${domainSmall} and have sufficient storage space to save past Communications or an installed printer to print them.</p>\n\n    <p>11.3	Withdrawal of Consent. You may withdraw your consent to receive electronic Communications by sending a withdrawal notice to support. If you decline or withdraw consent to receive electronic Communications, ${domainSmall} may suspend or terminate your use of the Services.</p>\n    <p>11.4	Updating Contact Information. It is your responsibility to keep your email address and/or mobile phone number on file with ${domainSmall} up to date so that ${domainSmall} can communicate with you electronically. You understand and agree that if ${domainSmall} sends you an electronic Communication but you do not receive it because your email address or mobile phone number on file is incorrect, out of date, blocked by your service provider, or you are otherwise unable to receive electronic Communications, ${domainSmall} will be deemed to have provided the Communication to you. Please note that if you use a spam filter that blocks or re-routes emails from senders not listed in your email address book, you must add ${domainSmall} to your email address book so that you will be able to receive the Communications we send to you. You can update your email address, mobile phone number or street address at any time by logging into your ${domainSmall} Account or by sending such information to support. If your email address or mobile phone number becomes invalid such that electronic Communications sent to you by ${domainSmall} are returned, ${domainSmall} may deem your account to be inactive, and you may not be able to complete any transaction via our Services until we receive a valid, working email address or mobile phone number from you.</p>\n\n    <h3>12.	Unclaimed Property</h3>\n    <p>If for any reason ${domainSmall} is holding Funds in your ${domainSmall} Account on your behalf, and ${domainSmall} is unable to return your Funds to your designated External Account after a period of inactivity, then ${domainSmall} may report and remit such Funds in accordance with applicable state unclaimed property laws.</p>\n\n    <h3>13.	ACCEPTABLE USE</h3>\n    <p>When accessing or using the Services, you agree that you will not violate any law, contract, intellectual property or other third-party right or commit a tort, and that you are solely responsible for your conduct while using our Services. Without limiting the generality of the foregoing, you agree that you will not:</p>\n\n    <p>• Use our Services in any manner that could interfere with, disrupt, negatively affect or inhibit other users from fully enjoying our Services, or that could damage, disable, overburden or impair the functioning of our Services in any manner;</p>\n    <p>• Use our Services to pay for, support or otherwise engage in any illegal gambling activities; fraud; money-laundering; or terrorist activities; or other illegal activities.</p>\n    <p>• Use any robot, spider, crawler, scraper or other automated means or interface not provided by us to access our Services or to extract data.</p>\n    <p>• Use or attempt to use another user&lsquo;s account without authorization.</p>\n    <p>• Attempt to circumvent any content filtering techniques we employ or attempt to access any service or area of our Services that you are not authorized to access.</p>\n    <p>• Develop any third-party applications that interact with our Services without our prior written consent.</p>\n    <p>• Provide false, inaccurate, or misleading information; and</p>\n    <p>• Encourage or induce any third party to engage in any of the activities prohibited under this Section.</p>\n\n\n    <h3>14.	Feedback</h3>\n    <p>We will own exclusive rights, including all intellectual property rights, to any feedback, suggestions, ideas or other information or materials regarding ${domainSmall} or our Services that you provide, whether by email, posting through our Services or otherwise (\"Feedback\"). Any Feedback you submit is non-confidential and shall become the sole property of ${domainSmall}. We will be entitled to the unrestricted use and dissemination of such Feedback for any purpose, commercial or otherwise, without acknowledgment or compensation to you. You waive any rights you may have to the Feedback (including any copyrights or moral rights). Do not send us Feedback if you expect to be paid or want to continue to own or claim rights in them; your idea might be great, but we may have already had the same or a similar idea and we do not want disputes. We also have the right to disclose your identity to any third party who is claiming that any content posted by you constitutes a violation of their intellectual property rights, or of their right to privacy. We have the right to remove any posting you make on our website if, in our opinion, your post does not comply with the content standards set out in this section.</p>\n\n    <h3>15.	Copyrights and Other Intellectual Property Rights</h3>\n    <p>Unless otherwise indicated by us, all copyright and other intellectual property rights in all content and other materials contained on our website or provided in connection with the Services, including, without limitation, the ${domainSmall} logo and all designs, text, graphics, pictures, information, data, software, sound files, other files and the selection and arrangement thereof (collectively, \"${domainSmall} Materials\") are the proprietary property of ${domainSmall} or our licensors or suppliers and are protected by U.S. and international copyright laws and other intellectual property rights laws.We hereby grant you a limited, nonexclusive and non-sublicensable license to access and use the ${domainSmall} Materials for your personal or internal business use. Such license is subject to these Terms and Conditions and does not permit (a) any resale of the ${domainSmall} Materials; (b) the distribution, public performance or public display of any ${domainSmall} Materials; (c) modifying or otherwise making any derivative uses of the ${domainSmall} Materials, or any portion thereof; or (d) any use of the ${domainSmall} Materials other than for their intended purposes. The license granted under this Section will automatically terminate if we suspend or terminate your access to the Services.</p>\n\n    <h3>16.	Trademarks</h3>\n    <p>\"${domainSmall},\" the ${domainSmall} logo and any other ${domainSmall} product or service names, logos or slogans that may appear on our Services are trademarks of ${domainSmall}, in the United States and in other countries, and may not be copied, imitated or used, in whole or in part, without our prior written permission. You may not use any trademark, product or service name of ${domainSmall} without our prior written permission, including without limitation any metatags or other \"hidden text\" utilizing any trademark, product or service name of ${domainSmall}. In addition, the look and feel of our Services, including all page headers, custom graphics, button icons and scripts, is the service mark, trademark and/or trade dress of ${domainSmall} and may not be copied, imitated or used, in whole or in part, without our prior written permission. All other trademarks, registered trademarks, product names and company names or logos mentioned through our Services are the property of their respective owners. Reference to any products, services, processes or other information, by name, trademark, manufacturer, supplier or otherwise does not constitute or imply endorsement, sponsorship or recommendation by us.</p>\n\n    <h3>17.	Suspension; Termination</h3>\n    <p>In the event of any Force Majeure Event, breach of these Terms and Conditions, or any other event that would make provision of the Services commercially unreasonable for ${domainSmall}, we may, in our discretion and without liability to you, with or without prior notice, suspend your access to all or a portion of our Services. We may terminate your access to the Services in our sole discretion, immediately and without prior notice, and delete or deactivate your ${domainSmall} Account and all related information and files in such account without liability to you, including, for instance, in the event that you breach any term of these Terms. In the event of termination, ${domainSmall} will attempt to return any Funds stored in your ${domainSmall} Account not otherwise owed to ${domainSmall}, unless ${domainSmall} believes you have committed fraud, negligence or other misconduct.</p>\n\n    <h3>18.	Discontinuance of Services</h3>\n    <p>We may, in our sole discretion and without liability to you, with or without prior notice and at any time, modify or discontinue, temporarily or permanently, any portion of our Services.</p>\n\n    <h3>19.	Disclaimer of Warranties</h3>\n    <p>EXCEPT AS EXPRESSLY PROVIDED TO THE CONTRARY IN A WRITING BY US, OUR SERVICES ARE PROVIDED ON AN \"AS IS\" AND \"AS AVAILABLE\" BASIS. WE EXPRESSLY DISCLAIM, AND YOU WAIVE, ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT AS TO OUR SERVICES, INCLUDING THE INFORMATION, CONTENT AND MATERIALS CONTAINED THEREIN. YOU ACKNOWLEDGE THAT INFORMATION YOU STORE OR TRANSFER THROUGH OUR SERVICES MAY BECOME IRRETRIEVABLY LOST OR CORRUPTED OR TEMPORARILY UNAVAILABLE DUE TO A VARIETY OF CAUSES, INCLUDING SOFTWARE FAILURES, PROTOCOL CHANGES BY THIRD PARTY PROVIDERS, INTERNET OUTAGES, FORCE MAJEURE EVENT OR OTHER DISASTERS INCLUDING THIRD PARTY DDOS ATTACKS, SCHEDULED OR UNSCHEDULED MAINTENANCE, OR OTHER CAUSES EITHER WITHIN OR OUTSIDE OUR CONTROL. YOU ARE SOLELY RESPONSIBLE FOR BACKING UP AND MAINTAINING DUPLICATE COPIES OF ANY INFORMATION YOU STORE OR TRANSFER THROUGH OUR SERVICES.</p>\n\n    <p>Some jurisdictions do not allow the disclaimer of implied terms in contracts with consumers, so some or all of the disclaimers in this section may not apply to you.</p>\n\n    <h3>20.	Limitation of Liability</h3>\n    <p>(a) EXCEPT AS OTHERWISE REQUIRED BY LAW, IN NO EVENT SHALL ${domainBig}, OUR DIRECTORS, MEMBERS, EMPLOYEES OR AGENTS BE LIABLE FOR ANY SPECIAL, INDIRECT OR CONSEQUENTIAL DAMAGES, OR ANY OTHER DAMAGES OF ANY KIND, INCLUDING BUT NOT LIMITED TO LOSS OF USE, LOSS OF PROFITS OR LOSS OF DATA, WHETHER IN AN ACTION IN CONTRACT, TORT (INCLUDING BUT NOT LIMITED TO NEGLIGENCE) OR OTHERWISE, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OF OR INABILITY TO USE OUR SERVICES OR THE ${domainBig} MATERIALS, INCLUDING WITHOUT LIMITATION ANY DAMAGES CAUSED BY OR RESULTING FROM RELIANCE BY ANY USER ON ANY INFORMATION OBTAINED FROM ${domainBig}, OR THAT RESULT FROM MISTAKES, OMISSIONS, INTERRUPTIONS, DELETION OF FILES OR EMAIL, ERRORS, DEFECTS, VIRUSES, DELAYS IN OPERATION OR TRANSMISSION OR ANY FAILURE OF PERFORMANCE, WHETHER OR NOT RESULTING FROM A FORCE MAJEURE EVENT, COMMUNICATIONS FAILURE, THEFT, DESTRUCTION OR UNAUTHORIZED ACCESS TO ${domainBig}&lsquo;S RECORDS, PROGRAMS OR SERVICES.</p>\n\n\n\n\n    <p>Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion of liability for incidental or consequential damages. Accordingly, some of the limitations of this section may not apply to you.</p>\n\n<p>(b) TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE AGGREGATE LIABILITY OF ${domainBig} (INCLUDING OUR DIRECTORS, MEMBERS, EMPLOYEES AND AGENTS), WHETHER IN CONTRACT, WARRANTY, TORT (INCLUDING NEGLIGENCE, WHETHER ACTIVE, PASSIVE OR IMPUTED), PRODUCT LIABILITY, STRICT LIABILITY OR OTHER THEORY, ARISING OUT OF OR RELATING TO THE USE OF, OR INABILITY TO USE, ${domainBig} OR TO THESE TERMS AND CONDITIONS EXCEED THE FEES PAID BY YOU TO ${domainBig} DURING THE 12 MONTHS IMMEDIATELY PRECEDING THE DATE OF ANY CLAIM GIVING RISE TO SUCH LIABILITY.</p>\n\n    <h3>21.	Indemnity</h3>\n    <p>You agree to defend, indemnify and hold harmless ${domainSmall} (and each of our officers, directors, members, employees, agents and affiliates) from any claim, demand, action, damage, loss, cost or expense, including without limitation reasonable attorneys’ fees, arising out or relating to (a) your use of, or conduct in connection with, our Services; (b) any Feedback you provide; (c) your violation of these Terms and Conditions; or (d) your violation of any rights of any other person or entity. If you are obligated to indemnify us, we will have the right, in our sole discretion, to control any action or proceeding (at our expense) and determine whether we wish to settle it.</p>\n\n    <h3>22.	Applicable Law; Arbitration</h3>\n    <p>PLEASE READ THE FOLLOWING PARAGRAPH CAREFULLY BECAUSE IT REQUIRES YOU TO ARBITRATE DISPUTES WITH US AND IT LIMITS THE MANNER IN WHICH YOU CAN SEEK RELIEF.</p>\n\n    <p>You and ${domainSmall} agree to arbitrate any dispute arising from these Terms and Conditions of the Services, except for disputes in which either party seeks equitable and other relief for the alleged unlawful use of copyrights, trademarks, trade names, logos, trade secrets or patents.</p>\n\n    <h5>ARBITRATION PREVENTS YOU FROM SUING IN COURT OR FROM HAVING A JURY TRIAL.</h5>\n\n    <p>You and ${domainSmall} agree to notify each other in writing of any dispute within thirty (30) days of when it arises. Notice to ${domainSmall} shall be sent to ${domainSupport}. You and ${domainSmall} further agree: (a) to attempt informal resolution prior to any demand for arbitration; (b) that any arbitration will occur in San Francisco, California; (c) that arbitration will be conducted confidentially by a single arbitrator in accordance with the rules of JAMS; and (d) that the state or federal courts in San Francisco, California have exclusive jurisdiction over any appeals of an arbitration award and over any suit between the parties not subject to arbitration. Other than class procedures and remedies discussed below, the arbitrator has the authority to grant any remedy that would otherwise be available in court. Any dispute between the parties will be governed by these Terms and Conditions and the laws of the State of California and applicable United States law, without giving effect to any conflict of laws principles that may provide for the application of the law of another jurisdiction. Whether the dispute is heard in arbitration or in court, you and ${domainSmall} will not commence against the other a class action, class arbitration or representative action or proceeding.</p>\n\n\n    <h3>23.	Miscellaneous</h3>\n    <p>23.1	Entire Agreement; Order of Precedence. These Terms and Conditions contain the entire agreement and supersede all prior and contemporaneous understandings between the parties regarding the Services. These Terms and Conditions do not alter the terms or conditions of any other electronic or written agreement you may have with ${domainSmall} for the Services or for any other ${domainSmall} product or service or otherwise. In the event of any conflict between these Terms and Conditions and any other agreement you may have with ${domainSmall}, the terms of that other agreement will control only if these Terms and Conditions are specifically identified and declared to be overridden by such other agreement.</p>\n    <p>23.2	Amendment. We reserve the right to make changes or modifications to these Terms and Conditions from time to time, in our sole discretion. The amended Terms and Conditions will be deemed effective immediately upon posting for any new users of the Services. In all other cases, the amended Terms and Conditions will become effective for preexisting users upon the earlier of either: (i) the date users click or press a button to accept such changes, or (ii) continued use of our Services 30 days after ${domainSmall} provides notice of such changes.  Any amended Terms and Conditions will apply prospectively to use of the Services after such changes become effective. If you do not agree to any amended Terms and Conditions, you must discontinue using our Services and contact us to terminate your account.</p>\n    <p>23.3	Waiver. Our failure or delay in exercising any right, power or privilege under these Terms and Conditions shall not operate as a waiver thereof.</p>\n    <p>23.4	Severability. The invalidity or unenforceability of any of these Terms and Conditions shall not affect the validity or enforceability of any other of these Terms and Conditions, all of which shall remain in full force and effect.</p>\n    <p>23.5	Force Majeure Events. ${domainSmall} shall not be liable for (1) any inaccuracy, error, delay in, or omission of (i) any information, or (ii) the transmission or delivery of information; (2) any loss or damage arising from any event beyond ${domainSmall}&lsquo;s reasonable control, including but not limited to flood, extraordinary weather conditions, earthquake, or other act of God, fire, war, insurrection, riot, labor dispute, accident, action of government, communications, power failure, or equipment or software malfunction or any other cause beyond ${domainSmall}&lsquo;s reasonable control (each, a \"Force Majeure Event\").</p>\n    <p>23.6	Assignment. You may not assign or transfer any of your rights or obligations under these Terms and Conditions without prior written consent from ${domainSmall}, including by operation of law or in connection with any change of control. ${domainSmall} may assign or transfer any or all of its rights under these Terms and Conditions, in whole or in part, without obtaining your consent or approval.</p>\n    <p>23.7	Headings. Headings of sections are for convenience only and shall not be used to limit or construe such sections.</p>');
/*!40000 ALTER TABLE `domain_terms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `domain_withdrawal_error`
--

DROP TABLE IF EXISTS `domain_withdrawal_error`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `domain_withdrawal_error` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `domain_name` varchar(255) NOT NULL,
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
-- Table structure for table `internal_history`
--

DROP TABLE IF EXISTS `internal_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `internal_history` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) NOT NULL,
  `second_user_email` varchar(255) NOT NULL,
  `user_domain` varchar(255) NOT NULL,
  `coin_name` varchar(30) NOT NULL,
  `crypto_amount` double NOT NULL,
  `usd_amount` double NOT NULL,
  `address_from` varchar(100) NOT NULL,
  `address_to` varchar(100) NOT NULL,
  `date` timestamp NOT NULL,
  `type` varchar(30) NOT NULL,
  `status` varchar(30) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `internal_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_auth` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `internal_history`
--

LOCK TABLES `internal_history` WRITE;
/*!40000 ALTER TABLE `internal_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `internal_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news_list`
--

DROP TABLE IF EXISTS `news_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news_list` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `news_title` varchar(255) NOT NULL,
  `news_date` timestamp NOT NULL,
  `news_body` mediumtext NOT NULL,
  `news_image` text,
  `news_domain` varchar(255) NOT NULL,
  `news_youtube_link` varchar(255) DEFAULT NULL,
  `staff_email` varchar(255) NOT NULL,
  `staff_id` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `staff_id` (`staff_id`),
  CONSTRAINT `news_list_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `user_auth` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news_list`
--

LOCK TABLES `news_list` WRITE;
/*!40000 ALTER TABLE `news_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `news_list` ENABLE KEYS */;
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
  `get_staff_access_date` timestamp NOT NULL,
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
-- Table structure for table `swap_history`
--

DROP TABLE IF EXISTS `swap_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `swap_history` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) NOT NULL,
  `user_domain` varchar(255) NOT NULL,
  `coin_name_from` varchar(30) NOT NULL,
  `coin_name_to` varchar(30) NOT NULL,
  `crypto_amount_from` double NOT NULL,
  `crypto_amount_to` double NOT NULL,
  `usd_amount_from` double NOT NULL,
  `usd_amount_to` double NOT NULL,
  `date` timestamp NOT NULL,
  `status` varchar(30) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `swap_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_auth` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `swap_history`
--

LOCK TABLES `swap_history` WRITE;
/*!40000 ALTER TABLE `swap_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `swap_history` ENABLE KEYS */;
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
  `date` timestamp NOT NULL,
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
  `date_of_entry` timestamp NOT NULL,
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
  `last_deposit` timestamp NULL DEFAULT NULL,
  `active_error` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_info_for_action_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_auth` (`ID`)
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
  `login_date` timestamp NOT NULL,
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
  `date_of_birth` timestamp NOT NULL,
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
  `action_date` timestamp NOT NULL,
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
  `kyc_status` varchar(50) NOT NULL,
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
  `date` timestamp NOT NULL,
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
-- Table structure for table `user_two_fa_code_list`
--

DROP TABLE IF EXISTS `user_two_fa_code_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_two_fa_code_list` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `generated_code` varchar(20) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_two_fa_code_list`
--

LOCK TABLES `user_two_fa_code_list` WRITE;
/*!40000 ALTER TABLE `user_two_fa_code_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_two_fa_code_list` ENABLE KEYS */;
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
  `enable_date` timestamp NOT NULL,
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

--
-- Table structure for table `withdrawal_history`
--

DROP TABLE IF EXISTS `withdrawal_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `withdrawal_history` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) NOT NULL,
  `user_domain` varchar(255) NOT NULL,
  `coin_name` varchar(30) NOT NULL,
  `crypto_amount` double NOT NULL,
  `usd_amount` double NOT NULL,
  `date` timestamp NOT NULL,
  `address` varchar(80) NOT NULL,
  `status` varchar(30) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `withdrawal_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_auth` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `withdrawal_history`
--

LOCK TABLES `withdrawal_history` WRITE;
/*!40000 ALTER TABLE `withdrawal_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `withdrawal_history` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-06 17:25:56
