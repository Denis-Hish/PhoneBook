1. Закрывать окно по нажатию enter
2. Закрывать окно по нажатию ADD+

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
