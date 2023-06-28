Функциональность:

-  Запись номеров
-  Редактирование номеров
-  Удаление номеров
-  Конвертация (Кнопка "Conver to XML" создаёт два xml файла)

Запись содержит:

-  порядковый номер (В UI)
-  имя контакта
-  номер телефона (В UI отображается с разделением по три цифры: 000 или 000-000-000)
-  на одно имя может быть 3-и номера телефона
-  группа (оттдел)

Валидация:

-  имя контакта (Первая буква с большой буквы, остальные не важно)
-  номер телефона (содержит только цифры)
-  должны быть заполнены поля: имя, первый номер, группа

Сортировка:

-  по имени (по умолчанию в UI отображается список по алфавиту)
-  по номеру
-  по группе

Фильтрация/группировка/поиск:

-  по первым буквам имени
-  по группе
-  по номеру

Структура file1.xml:

<?xml version="1.0" encoding="UTF-8"?>

<YealinkIPPhoneBook>
  <Title>Yealink</Title>
  <Menu Name="All Contacts">
    <Unit Name="Test1" Phone1="001" Phone2="" Phone3="" default_photo="Resource:"/>
  </Menu>
   <Menu Name="Blacklist">
    <Unit Name="Test2" Phone1="002" Phone2="" Phone3="" default_photo="Resource:"/>
  </Menu>
  <Menu Name="SNR - Biuro">
    <Unit Name="Kadry" Phone1="210" Phone2="413676089" Phone3="" default_photo="Resource:"/>
  </Menu>
</YealinkIPPhoneBook>

Структура file2.xml:

<?xml version="1.0" encoding="UTF-8"?>

<root_group> <group display_name="All Contacts" ring="Auto"/> <group display_name="Blacklist" ring="Auto"/> <group display_name="SNR - Biuro" ring="Auto"/> </root_group> <root_contact> <contact display_name="Test1" office_number="001" mobile_number="" other_number="" line="0" ring="Auto" group_id_name="All Contacts"/> <contact display_name="Test2" office_number="002" mobile_number="" other_number="" line="0" ring="Auto" group_id_name="Blacklist"/> <contact display_name="Sekretariat" office_number="200" mobile_number="785980385" other_number="" line="0" ring="Auto" group_id_name="SNR - Biuro"/> </root_contact>

Структура AllContacts: [ { "userName": "Denis", "createdAt": "2023-03-22T19:34:45.558Z", "updatedAt": "2023-03-22T19:34:45.558Z", "phoneNumber1": "555555", "group": "IT department", "phoneNumber2": "123-456-789", "phoneNumber3": "789", "id": "641b5855d1bb4f1280c0de1d" }, { "userName": "Luke Skywalker", "phoneNumber1": "987", "phoneNumber2": "456852", "phoneNumber3": "987654321", "group": "Tatuin", "createdAt": "2023-03-23T12:58:23.451Z", "updatedAt": "2023-03-23T12:58:23.451Z", "id": "641c4ceffe18223e38b224cd" }, { "userName": "Anakin Skywalker", "createdAt": "2023-03-29T07:02:14.221Z", "updatedAt": "2023-03-29T07:02:14.221Z", "phoneNumber1": "+1 234-567-890", "id": "6423e276f6d4da163cb4eb33" }, { "userName": "Leia Organa", "phoneNumber1": "123", "phoneNumber2": "123456", "phoneNumber3": "123456789", "group": "Tatuin", "createdAt": "2023-03-29T08:14:06.336Z", "updatedAt": "2023-03-29T08:14:06.336Z", "id": "6423f34eb5f47222b8d59348" }, { "userName": "Lika Andriichuk", "phoneNumber1": "123-456-789", "phoneNumber2": "555-555-555", "phoneNumber3": "911", "group": "Psychology", "createdAt": "2023-06-15T18:32:17.996Z", "updatedAt": "2023-06-15T18:32:17.996Z", "id": "648b593152c804245c362ecb" }, { "userName": "Kluby Dyr.", "phoneNumber1": "203", "phoneNumber2": "", "phoneNumber3": "", "group": "", "createdAt": "2023-06-19T11:42:37.282Z", "updatedAt": "2023-06-19T11:42:37.282Z", "id": "64903f2dceb6e91e30b63f71" }, { "userName": "SNR Administracja", "phoneNumber1": "403", "phoneNumber2": "404", "phoneNumber3": "", "group": "", "createdAt": "2023-06-22T07:53:19.583Z", "updatedAt": "2023-06-22T07:53:19.583Z", "id": "6493fdefef5dd215dc64149d" }, { "userName": "Dyrektor Wyk.", "phoneNumber1": "211", "phoneNumber2": "", "phoneNumber3": "", "group": "", "createdAt": "2023-06-22T07:54:35.334Z", "updatedAt": "2023-06-22T07:54:35.334Z", "id": "6493fe3bef5dd215dc64149f" }, { "userName": "Kadry", "phoneNumber1": "210", "phoneNumber2": "", "phoneNumber3": "", "group": "", "createdAt": "2023-06-22T07:54:48.258Z", "updatedAt": "2023-06-22T07:54:48.258Z", "id": "6493fe48ef5dd215dc6414a1" }, { "userName": "Księgowość", "phoneNumber1": "208", "phoneNumber2": "", "phoneNumber3": "", "group": "", "createdAt": "2023-06-22T07:55:51.103Z", "updatedAt": "2023-06-22T07:55:51.103Z", "id": "6493fe87ef5dd215dc6414a3" }, { "userName": "Obi-Wan Kenobi", "phoneNumber1": "555", "phoneNumber2": "987", "phoneNumber3": "404", "group": "", "createdAt": "2023-06-23T12:28:27.137Z", "updatedAt": "2023-06-23T12:28:27.137Z", "id": "64958feb6a1764248c59c938" }, { "userName": "NZOZ Hostel Mielczarskiego", "phoneNumber1": "690987788", "phoneNumber2": "", "phoneNumber3": "", "group": "", "createdAt": "2023-06-23T13:34:53.351Z", "updatedAt": "2023-06-23T13:34:53.351Z", "id": "64959f7db4f53723008ff00e" }, { "userName": "Catering Świętokrzyski", "phoneNumber1": "533236636", "phoneNumber2": "305", "phoneNumber3": "600", "group": "", "createdAt": "2023-06-23T13:35:33.110Z", "updatedAt": "2023-06-23T13:35:33.110Z", "id": "64959fa5b4f53723008ff010" } ]
