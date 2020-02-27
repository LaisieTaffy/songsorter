﻿// 2008/7/3 Scripted by K-Factory@migiwa
// 2009/1/27 Modified by K-Factory@migiwa

// *****************************************************************************
str_CenterT = 'Tie!';
str_CenterB = 'Undo last choice';

str_ImgPath = 'img/';

str_AudioPath = 'audio/';
// 0:順番に　1:昔の
var bln_ResultMode = 1;
// 0:テキスト　1:イラスト　2:テキスト＋イラスト
var int_ResultImg = 2;
// イラスト表示時、何位までをイラスト表示にするか。
var int_ResultRank = 3;

// ソート用のテーブルを
// 0:残す　1:消す
var bln_ResultStyle = 0;

// ソート進捗バーの表示
// 0:表示　1:消す
var bln_ProgessBar = 1;

// Maximum number of result rows before being broken off into another table.
var maxRows = 35;

// * タイトル情報（編集可能。最後の行に”,”を付けないようにしてください）
var int_Colspan = 3;
var ary_TitleData = [
  "Team J",
  "Team K3",
  "Team T",
  "Academy",
  "Pajama Drive",
  "Renai Kinshi Jourei",
  "Boku no Taiyou",
  "Dareka no Tame ni",
  "Seishun Girls",
  "Te wo Tsunaginagara",
  "Theater no Megami",
  "Saishuu Bell ga Naru",
  "Saka Agari",
  "Tadaima Renaichuu",
  "Idol no Yoake",
  "Seifuku no Me"

];

// * キャラクター情報（編集可能。最後の行に”,”を付けないようにしてください）
// * 使用フラグ（0にするとソートに入りません）,
//   "タイトルID"（先頭から0, 1, 2...）,
//   {タイトル別参加フラグ}（1を入れると対象タイトルに入ります）,
//   "キャラクター名", "画像（空白の場合、キャラクター名が使用されます）"
//                                      [1,2,3,4,5,6,7,8,9,
var ary_CharacterData = [
  [1, "Shonichi",    [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0], "art/PD.jpg"],
  [1, "Hissatsu Teleport",    [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0], "art/PD.jpg"],
  [1, "Gokigen Naname na Mermaid",    [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0], "art/PD.jpg"],
  [1, "Futari Nori no Jitensha",    [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0], "art/PD.jpg"],
  [1, "Tenshi no Shippo",    [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0], "art/PD.jpg"],
  [1, "Pajama Drive",    [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0], "art/PD.jpg"],
  [1, "Junjou Shugi",    [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0], "art/PD.jpg"],
  [1, "Temodemo no Namida",    [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0], "art/PD.jpg"],
  [1, "Kagami no Naka no Jeanne D'Arc",    [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0], "art/PD.jpg"],
  [1, "Two years later",    [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0], "art/PD.jpg"],
  [1, "Inochi no Tsukaimichi",    [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0], "art/PD.jpg"],
  [1, "Kiss Shite Son Shichatta",    [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0], "art/PD.jpg"],
  [1, "Boku no Sakura",    [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0], "art/PD.jpg"],
  [1, "Wasshoi J!",    [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0], "art/PD.jpg"],
  [1, "Suifu wa Arashi ni Yume wo Miru",    [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0], "art/PD.jpg"],
  [1, "Shiroi Shirt",    [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0], "art/PD.jpg"],

  [1, "Nagai Hikari",    [1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0], "art/RKJ.jpg"],
  [1, "Squall no Aida ni",    [1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0], "art/RKJ.jpg"],
  [1, "JK Nemurihime",    [1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0], "art/RKJ.jpg"],
  [1, "Kimi ni Autabi Koi wo Suru",    [1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0], "art/RKJ.jpg"],
  [1, "Kuroi Tenshi",    [1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0], "art/RKJ.jpg"],
  [1, "Heart Gata Virus",    [1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0], "art/RKJ.jpg"],
  [1, "Renai Kinshi Jourei",    [1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0], "art/RKJ.jpg"],
  [1, "Tsundere!",    [1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0], "art/RKJ.jpg"],
  [1, "Manatsu no Christmas Rose",    [1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0], "art/RKJ.jpg"],
  [1, "Switch",    [1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0], "art/RKJ.jpg"],
  [1, "109",    [1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0], "art/RKJ.jpg"],
  [1, "Hikoukigumo",    [1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0], "art/RKJ.jpg"],
  [1, "Ano Koro no Sneakers",    [1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0], "art/RKJ.jpg"],
  [1, "JKT Sanjou!",    [1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0], "art/RKJ.jpg"],
  [1, "Namida no Shinkokyuu",    [1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0], "art/RKJ.jpg"],
  [1, "Oogoe Diamond",    [1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0], "art/RKJ.jpg"],

  [1, "Dreamin' girls",    [0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0], "art/BnT.jpg"],
  [1, "RUN RUN RUN",    [0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0], "art/BnT.jpg"],
  [1, "Mirai no Kajitsu",    [0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0], "art/BnT.jpg"],
  [1, "Viva! Hurricane",    [0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0], "art/BnT.jpg"],
  [1, "Idol Nante Yobanaide",    [0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0], "art/BnT.jpg"],
  [1, "Boku to Juliet to Jet Coaster",    [0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0], "art/BnT.jpg"],
  [1, "Higurashi no Koi",    [0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0], "art/BnT.jpg"],
  [1, "Itoshisa no defense",    [0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0], "art/BnT.jpg"],
  [1, "Himawari",    [0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0], "art/BnT.jpg"],
  [1, "Takeuchi Senpai",    [0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0], "art/BnT.jpg"],
  [1, "Sonna Konna Wake de",    [0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0], "art/BnT.jpg"],
  [1, "Déja vu",    [0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0], "art/BnT.jpg"],
  [1, "Yuuhi wo miteiru ka?",    [0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0], "art/BnT.jpg"],
  [1, "Lay down",    [0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0], "art/BnT.jpg"],
  [1, "BINGO!",    [0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0], "art/BnT.jpg"],
  [1, "Boku no Taiyou",    [0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0], "art/BnT.jpg"],

  [1, "Tsukimisou",    [1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0], "art/DnT.jpg"],
  [1, "Warning",    [1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0], "art/DnT.jpg"],
  [1, "Tanjoubi no Yoru",    [1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0], "art/DnT.jpg"],
  [1, "Bird",    [1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0], "art/DnT.jpg"],
  [1, "Nage Kiss de Uchi Otose!",    [1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0], "art/DnT.jpg"],
  [1, "Shinkirou",    [1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0], "art/DnT.jpg"],
  [1, "Rider",    [1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0], "art/DnT.jpg"],
  [1, "Seifuku ga Jama wo Suru",    [1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0], "art/DnT.jpg"],
  [1, "Natsu ga Icchatta",    [1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0], "art/DnT.jpg"],
  [1, "Koike",    [1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0], "art/DnT.jpg"],
  [1, "Tsuki no Katachi",    [1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0], "art/DnT.jpg"],
  [1, "Dareka no Tame ni",    [1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0], "art/DnT.jpg"],
  [1, "Medley (Team J)",    [1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0], "art/DnT.jpg"],
  [1, "Medley (Team T)",    [1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0], "art/DnT.jpg"],
  [1, "Namida Uri no Shoujo",    [1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0], "art/DnT.jpg"],

  [1, "Seishun Girls",    [1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0], "art/SG.jpg"],
  [1, "Beach Sandal",    [1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0], "art/SG.jpg"],
  [1, "Kimi ga Hoshi ni Naru Made",    [1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0], "art/SG.jpg"],
  [1, "Blue rose",    [1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0], "art/SG.jpg"],
  [1, "Kinjirareta Futari",    [1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0], "art/SG.jpg"],
  [1, "Ame no Doubutsuen",    [1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0], "art/SG.jpg"],
  [1, "Fushidara na Natsu",    [1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0], "art/SG.jpg"],
  [1, "Don't disturb!",    [1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0], "art/SG.jpg"],
  [1, "Virgin love",    [1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0], "art/SG.jpg"],
  [1, "Hizukehenkousen",    [1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0], "art/SG.jpg"],
  [1, "Boku no Uchiage Hanabi",    [1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0], "art/SG.jpg"],
  [1, "Yakusoku yo",    [1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0], "art/SG.jpg"],
  [1, "Korogaru Ishi ni Nare",    [1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0], "art/SG.jpg"],
  [1, "Cinderella wa Damasarenai",    [1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0], "art/SG.jpg"],

  [1, "Bokura no Kaze",    [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0], "art/TwT.jpg"],
  [1, "Mango No.2",    [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0], "art/TwT.jpg"],
  [1, "Te wo Tsunaginagara",    [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0], "art/TwT.jpg"],
  [1, "Chime wa LOVE SONG",    [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0], "art/TwT.jpg"],
  [1, "Glory days",    [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0], "art/TwT.jpg"],
  [1, "Kono Mune no Barcode",    [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0], "art/TwT.jpg"],
  [1, "Wimbledon e Tsureteitte",    [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0], "art/TwT.jpg"],
  [1, "Ame no Pianist",    [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0], "art/TwT.jpg"],
  [1, "Choco no Yukue",    [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0], "art/TwT.jpg"],
  [1, "Innocence",    [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0], "art/TwT.jpg"],
  [1, "Romance Rocket",    [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0], "art/TwT.jpg"],
  [1, "Koi no Keikou to Taisaku",    [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0], "art/TwT.jpg"],
  [1, "Daisuki",    [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0], "art/TwT.jpg"],
  [1, "Rope no Yuujou",    [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0], "art/TwT.jpg"],
  [1, "Kayoubi no Yoru Suiyobi no Asa",    [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0], "art/TwT.jpg"],
  [1, "Tooku no Ite mo",    [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0], "art/TwT.jpg"],

  [1, "Yuuki no Hammer",    [1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0], "art/TnM.jpg"],
  [1, "Inseki no Kakuritsu",    [1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0], "art/TnM.jpg"],
  [1, "Ai no Stripper",    [1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0], "art/TnM.jpg"],
  [1, "Theater no Megami",    [1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0], "art/TnM.jpg"],
  [1, "Hatsukoi yo, Konnichiwa",    [1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0], "art/TnM.jpg"],
  [1, "Arashi no Yoru ni wa",    [1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0], "art/TnM.jpg"],
  [1, "Candy",    [1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0], "art/TnM.jpg"],
  [1, "Locker Room Boy",    [1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0], "art/TnM.jpg"],
  [1, "Yokaze no Shiwaza",    [1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0], "art/TnM.jpg"],
  [1, "100 meter Conbini",    [1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0], "art/TnM.jpg"],
  [1, "Suki Suki Suki",    [1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0], "art/TnM.jpg"],
  [1, "SAYONARA no KANASHIBARI",    [1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0], "art/TnM.jpg"],
  [1, "Shiokaze no Shoudaijou",    [1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0], "art/TnM.jpg"],
  [1, "Honest Man",    [1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0], "art/TnM.jpg"],
  [1, "Team J Oshi",    [1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0], "art/TnM.jpg"],
  [1, "Bokutachi no Kamihikouki",    [1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0], "art/TnM.jpg"],

  [1, "Mammoth",    [0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "art/SBgN.jpg"],
  [1, "Saishuu Bell ga Naru",    [0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "art/SBgN.jpg"],
  [1, "Boyfriend no Tsukurikata",    [0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "art/SBgN.jpg"],
  [1, "Erai Hito ni Naritakunai",    [0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "art/SBgN.jpg"],
  [1, "Return Match",    [0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "art/SBgN.jpg"],
  [1, "Hatsukoi Dorobou",    [0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "art/SBgN.jpg"],
  [1, "Gomen ne Jewel",    [0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "art/SBgN.jpg"],
  [1, "Oshibe to Meshibe to Yoru no Chouchou",    [0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "art/SBgN.jpg"],
  [1, "18nin Shimai no Uta",    [0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "art/SBgN.jpg"],
  [1, "Stand up",    [0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "art/SBgN.jpg"],
  [1, "Coolgirl",    [0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "art/SBgN.jpg"],
  [1, "Kaiyuugyo no Capacity",    [0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "art/SBgN.jpg"],
  [1, "Ai ni Ikou",    [0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "art/SBgN.jpg"],
  [1, "Shamu Neko",    [0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "art/SBgN.jpg"],
  [1, "Melos no Michi",    [0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "art/SBgN.jpg"],
  [1, "Sasae",    [0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "art/SBgN.jpg"],

  [1, "Tenohira",    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "art/SA.jpg"],
  [1, "Saka Agari",    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "art/SA.jpg"],
  [1, "Hitei no Requiem",    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "art/SA.jpg"],
  [1, "Sono Ase wa Uso wo Tsukanai",    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "art/SA.jpg"],
  [1, "End Roll",    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "art/SA.jpg"],
  [1, "Wagamama na Nagareboshi",    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "art/SA.jpg"],
  [1, "Ai no Iro",    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "art/SA.jpg"],
  [1, "Dakishimeraretara",    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "art/SA.jpg"],
  [1, "Mushi no Ballad",    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "art/SA.jpg"],
  [1, "Furishite Maneshite",    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "art/SA.jpg"],
  [1, "Umi wo Watare!",    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "art/SA.jpg"],
  [1, "Machikado no Party",    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "art/SA.jpg"],
  [1, "Fan Letter",    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "art/SA.jpg"],
  [1, "Fugiri",    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "art/SA.jpg"],
  [1, "Hanpa na Ikemen",    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "art/SA.jpg"],
  [1, "To be continued",    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "art/SA.jpg"],

  [1, "Tadaima Renaichuu",    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "art/TR.jpg"],
  [1, "Kuma no Nuigurumi",    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "art/TR.jpg"],
  [1, "Only today",    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "art/TR.jpg"],
  [1, "7ji 12fun no Hatsukoi",    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "art/TR.jpg"],
  [1, "Haru ga Kuru Made",    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "art/TR.jpg"],
  [1, "Junai no Crescendo",    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "art/TR.jpg"],
  [1, "Faint",    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "art/TR.jpg"],
  [1, "Kikyou",    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "art/TR.jpg"],
  [1, "Darui Kanji",    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "art/TR.jpg"],
  [1, "Mr. Kissman",    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "art/TR.jpg"],
  [1, "Kimi ga Oshiete Kureta",    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "art/TR.jpg"],
  [1, "BINGO!",    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "art/TR.jpg"],
  [1, "Keibetsu Shiteita Aijou",    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "art/TR.jpg"],
  [1, "LOVE CHASE",    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "art/TR.jpg"],
  [1, "Seifuku ga Jama wo Suru",    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "art/TR.jpg"],
  [1, "Nante Suteki na Sekai ni Umareta no Darou",    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "art/TR.jpg"],

  [1, "Idol no Yoake",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "art/InY.jpg"],
  [1, "Minasan mo go Issho ni",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "art/InY.jpg"],
  [1, "Haru Ichiban ga Fuku Koro",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "art/InY.jpg"],
  [1, "Kobushi no Seigi",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "art/InY.jpg"],
  [1, "Zannen Shoujo",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "art/InY.jpg"],
  [1, "Kuchi Utsushi no Chocolate",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "art/InY.jpg"],
  [1, "Kataomoi no Taikakusen",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "art/InY.jpg"],
  [1, "Tengoku Yarou",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "art/InY.jpg"],
  [1, "Itoshiki Natasha",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "art/InY.jpg"],
  [1, "Joshikousei wa Yamerarenai",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "art/InY.jpg"],
  [1, "Suki to Ieba Yokatta",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "art/InY.jpg"],
  [1, "Sobakasu no Kiss",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "art/InY.jpg"],
  [1, "Tanpopo no Kesshin",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "art/InY.jpg"],
  [1, "J Stars",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "art/InY.jpg"],
  [1, "Yokosuka Curve",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "art/InY.jpg"],
  [1, "Arigatou",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "art/InY.jpg"],

  [1, "Koi wo Kataru Shijin ni Narenakute...",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "art/SnM.jpg"],
  [1, "Goukaku Kiss",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "art/SnM.jpg"],
  [1, "Antenna",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "art/SnM.jpg"],
  [1, "Seifuku no Me",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "art/SnM.jpg"],
  [1, "Omoide Ijou",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "art/SnM.jpg"],
  [1, "Ookami to Pride",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "art/SnM.jpg"],
  [1, "Onna no Ko no Dairokkan",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "art/SnM.jpg"],
  [1, "Kareha no Station",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "art/SnM.jpg"],
  [1, "Mangekyou",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "art/SnM.jpg"],
  [1, "Jealousy no Alibi",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "art/SnM.jpg"],
  [1, "Doubt!",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "art/SnM.jpg"],
  [1, "Nakama no Uta",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "art/SnM.jpg"],
  [1, "Mizu no Nai Pool",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "art/SnM.jpg"],
  [1, "Rakuen no Kaidan",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "art/SnM.jpg"],
  [1, "Pinocchio Gun",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "art/SnM.jpg"],
  [1, "Tegami no Koto",    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "art/SnM.jpg"],

];
