export interface Bankrupt {
  id: number;
  name: string;
  inn: string;
  type: "individual" | "legal";
  status: "active" | "completed" | "suspended";
  debtAmount: number;
  caseNumber: string;
  startDate: string;
  region: string;
  arbitrManager: string;
}

export const mockData: Bankrupt[] = [
  {
    id: 1,
    name: 'ООО "Строительная Компания Монолит"',
    inn: "7728123456",
    type: "legal",
    status: "active",
    debtAmount: 45000000,
    caseNumber: "А40-12345/2024",
    startDate: "2024-03-15",
    region: "Москва",
    arbitrManager: "Иванов Иван Иванович",
  },
  {
    id: 2,
    name: "Петров Алексей Сергеевич",
    inn: "772812345678",
    type: "individual",
    status: "active",
    debtAmount: 3500000,
    caseNumber: "А40-23456/2024",
    startDate: "2024-05-20",
    region: "Московская область",
    arbitrManager: "Смирнова Елена Петровна",
  },
  {
    id: 3,
    name: 'АО "Торговый Дом Альфа"',
    inn: "7728234567",
    type: "legal",
    status: "completed",
    debtAmount: 128000000,
    caseNumber: "А40-34567/2023",
    startDate: "2023-11-10",
    region: "Москва",
    arbitrManager: "Кузнецов Петр Владимирович",
  },
  {
    id: 4,
    name: "Сидорова Мария Ивановна",
    inn: "772823456789",
    type: "individual",
    status: "suspended",
    debtAmount: 1200000,
    caseNumber: "А40-45678/2024",
    startDate: "2024-02-05",
    region: "Санкт-Петербург",
    arbitrManager: "Волков Дмитрий Александрович",
  },
  {
    id: 5,
    name: 'ООО "Производственное предприятие Прогресс"',
    inn: "7728345678",
    type: "legal",
    status: "active",
    debtAmount: 89000000,
    caseNumber: "А40-56789/2024",
    startDate: "2024-06-12",
    region: "Казань",
    arbitrManager: "Николаев Сергей Игоревич",
  },
  {
    id: 6,
    name: "Морозов Владимир Петрович",
    inn: "772834567890",
    type: "individual",
    status: "active",
    debtAmount: 5600000,
    caseNumber: "А40-67890/2024",
    startDate: "2024-07-25",
    region: "Екатеринбург",
    arbitrManager: "Федорова Анна Викторовна",
  },
  {
    id: 7,
    name: 'ЗАО "Логистическая Компания Вектор"',
    inn: "7728456789",
    type: "legal",
    status: "completed",
    debtAmount: 67000000,
    caseNumber: "А40-78901/2023",
    startDate: "2023-09-18",
    region: "Новосибирск",
    arbitrManager: "Соколов Андрей Михайлович",
  },
  {
    id: 8,
    name: "Лебедева Екатерина Алексеевна",
    inn: "772845678901",
    type: "individual",
    status: "active",
    debtAmount: 2800000,
    caseNumber: "А40-89012/2024",
    startDate: "2024-04-30",
    region: "Москва",
    arbitrManager: "Попов Игорь Юрьевич",
  },
];
