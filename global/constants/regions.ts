export type RegionsNames =
  "Oryol Oblast" |
  "The Republic of Karelia" |
  "The Tyva Republic" |
  "Kursk Oblast" |
  "Volgograd Oblast" |
  "Krasnoyarsk Krai" |
  "Smolensk Oblast" |
  "Altai Krai" |
  "The Republic of Khakassia" |
  "Belgorod Oblast" |
  "The Republic of Crimea" |
  "Yaroslavl Oblast" |
  "Udmurt Republic" |
  "The Republic of Dagestan" |
  "Jewish Autonomous Oblast" |
  "The Komi Republic" |
  "Moscow Oblast" |
  "Altai Republic" |
  "Orenburg Oblast" |
  "Omsk Oblast" |
  "Ryazan Oblast" |
  "The Republic of Adygea" |
  "The Republic of Mordovia" |
  "Magadan Oblast" |
  "The Republic of Bashkortostan" |
  "Leningrad Oblast" |
  "Tomsk Oblast" |
  "The Republic of Buryatia" |
  "Kemerovo Oblast" |
  "Kirov Oblast" |
  "Tver Oblast" |
  "Chelyabinsk Oblast" |
  "Krasnodar Krai" |
  "Kaliningrad Oblast" |
  "Ivanovo Oblast" |
  "Lipetsk Oblast" |
  "The Mari El Republic" |
  "Nizhny Novgorod Oblast" |
  "Saint Petersburg" |
  "Tula Oblast" |
  "Kostroma Oblast" |
  "Penza Oblast" |
  "Pskov Oblast" |
  "Samara Oblast" |
  "Novgorod Oblast" |
  "Tambov Oblast" |
  "The Republic of Kalmykia" |
  "Arkhangelsk Oblast" |
  "Kurgan Oblast" |
  "Vladimir Oblast" |
  "The Sakha (Yakutia) Republic" |
  "Irkutsk Oblast" |
  "Sverdlovsk Oblast" |
  "Vologda Oblast" |
  "Novosibirsk Oblast" |
  "Tyumen Oblast" |
  "Zabaykalsky Krai" |
  "Sakhalin Oblast" |
  "Murmansk Oblast" |
  "The Republic of North Ossetia–Alania" |
  "Ulyanovsk Oblast" |
  "Khabarovsk Krai" |
  "Nenets Autonomous Okrug" |
  "Kamchatka Krai" |
  "Khanty–Mansi Autonomous Okrug – Yugra" |
  "Perm Krai" |
  "Saratov Oblast" |
  "The Kabardino-Balkar Republic" |
  "Voronezh Oblast" |
  "The Karachay–Cherkess Republic" |
  "Amur Oblast" |
  "Bryansk Oblast" |
  "The Chuvash Republic" |
  "Yamalo-Nenets Autonomous Okrug" |
  "Rostov Oblast" |
  "Primorsky Krai" |
  "Sevastopol" |
  "The Republic of Tatarstan" |
  "Kaluga Oblast" |
  "Astrakhan Oblast" |
  "Stavropol Krai" |
  "The Republic of Ingushetia" |
  "Moscow" |
  "The Chechen Republic" |
  "Chukotka Autonomous Okrug"
  | "other";

export const regions: { [key in RegionsNames]: string } = {
  "other": "Другой регион",
  "Moscow Oblast": "Московская область",
  "Moscow": "г. Москва",
  "Leningrad Oblast": "Ленинградская область",
  "Saint Petersburg": "г. Санкт-Петербург",
  "The Republic of Adygea": "Адыгея",
  "Altai Republic": "Алтай",
  "Altai Krai": "Алтайский край",
  "Amur Oblast": "Амурская область",
  "Arkhangelsk Oblast": "Архангельская область",
  "Astrakhan Oblast": "Астраханская область",
  "The Republic of Bashkortostan": "Башкортостан",
  "Belgorod Oblast": "Белгородская область",
  "Bryansk Oblast": "Брянская область",
  "The Republic of Buryatia": "Бурятия",
  "Vladimir Oblast": "Владимирская область",
  "Volgograd Oblast": "Волгоградская область",
  "Vologda Oblast": "Вологодская область",
  "Voronezh Oblast": "Воронежская область",
  "The Republic of Dagestan": "Дагестан",
  "Zabaykalsky Krai": "Забайкальский край",
  "Ivanovo Oblast": "Ивановская область",
  "The Republic of Ingushetia": "Ингушетия",
  "Irkutsk Oblast": "Иркутская область",
  "The Kabardino-Balkar Republic": "Кабардино-Балкарская Республика",
  "Kaliningrad Oblast": "Калининградская область",
  "The Republic of Kalmykia": "Калмыкия",
  "Kaluga Oblast": "Калужская область",
  "Kamchatka Krai": "Камчатский край",
  "The Karachay–Cherkess Republic": "Карачае-Черкесская Республика",
  "The Republic of Karelia": "Карелия",
  "Kemerovo Oblast": "Кемеровская область",
  "Kirov Oblast": "Кировская область",
  "The Komi Republic": "Коми",
  "Kostroma Oblast": "Костромская область",
  "Krasnodar Krai": "Краснодарский край",
  "Krasnoyarsk Krai": "Красноярский край",
  "The Republic of Crimea": "Крым",
  "Kurgan Oblast": "Курганская область",
  "Kursk Oblast": "Курская область",
  "Lipetsk Oblast": "Липецкая область",
  "Magadan Oblast": "Магаданская область",
  "The Mari El Republic": "Марий Эл",
  "The Republic of Mordovia": "Мордовия",
  "Murmansk Oblast": "Мурманская область",
  "Nenets Autonomous Okrug": "Ненецкий автономный округ",
  "Nizhny Novgorod Oblast": "Нижегородская область",
  "Novgorod Oblast": "Новгородская область",
  "Novosibirsk Oblast": "Новосибирская область",
  "Omsk Oblast": "Омская область",
  "Oryol Oblast": "Орёл",
  "Orenburg Oblast": "Оренбургская область",
  "Penza Oblast": "Пензенская область",
  "Perm Krai": "Пермский край",
  "Primorsky Krai": "Приморский край",
  "Pskov Oblast": "Псковская область",
  "Rostov Oblast": "Ростовская область",
  "Ryazan Oblast": "Рязанская область",
  "Samara Oblast": "Самарская область",
  "Saratov Oblast": "Саратовская область",
  "The Sakha (Yakutia) Republic": "Саха (Якутия)",
  "Sakhalin Oblast": "Сахалинская область",
  "Sverdlovsk Oblast": "Свердловская область",
  "Sevastopol": "Севастополь",
  "The Republic of North Ossetia–Alania": "Северная осетия - Алания",
  "Smolensk Oblast": "Смоленская область",
  "Stavropol Krai": "Ставропольский край",
  "Tambov Oblast": "Тамбовская область",
  "The Republic of Tatarstan": "Татарстан",
  "Tver Oblast": "Тверская область",
  "Tomsk Oblast": "Томская область",
  "Tula Oblast": "Тульская область",
  "The Tyva Republic": "Тыва",
  "Tyumen Oblast": "Тюменская область",
  "Udmurt Republic": "Удмуртия",
  "Ulyanovsk Oblast": "Ульяновская область",
  "Khabarovsk Krai": "Хабаровский край",
  "The Republic of Khakassia": "Хакассия",
  "Khanty–Mansi Autonomous Okrug – Yugra": "Ханты-Мансийский автономный округ",
  "Chelyabinsk Oblast": "Челябинская область",
  "The Chechen Republic": "Чеченская Республика",
  "The Chuvash Republic": "Чувашская Республика",
  "Chukotka Autonomous Okrug": "Чукотский автономный округ",
  "Jewish Autonomous Oblast": "Яворский автономный округ",
  "Yamalo-Nenets Autonomous Okrug": "Ямало-Ненецкий автономный округ",
  "Yaroslavl Oblast": "Ярославская область"
};

