import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

interface Bankrupt {
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

const mockData: Bankrupt[] = [
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

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedBankrupt, setSelectedBankrupt] = useState<Bankrupt | null>(null);

  const filteredData = mockData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.inn.includes(searchQuery) ||
      item.caseNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU");
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      active: { label: "Активное", className: "bg-blue-100 text-blue-800 border-blue-200" },
      completed: { label: "Завершено", className: "bg-green-100 text-green-800 border-green-200" },
      suspended: { label: "Приостановлено", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
    };
    const variant = variants[status] || variants.active;
    return (
      <Badge variant="outline" className={variant.className}>
        {variant.label}
      </Badge>
    );
  };

  const handleExport = (format: "csv" | "excel") => {
    toast.success(`Экспорт в ${format.toUpperCase()} запущен`, {
      description: "Файл будет загружен через несколько секунд",
    });

    const headers = ["Название/ФИО", "ИНН", "Номер дела", "Статус", "Сумма долга", "Дата начала", "Регион"];
    const rows = filteredData.map((item) => [
      item.name,
      item.inn,
      item.caseNumber,
      item.status,
      item.debtAmount.toString(),
      item.startDate,
      item.region,
    ]);

    if (format === "csv") {
      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
      ].join("\n");
      const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `bankrupts_${new Date().getTime()}.csv`;
      link.click();
    }
  };

  const totalDebt = filteredData.reduce((sum, item) => sum + item.debtAmount, 0);
  const activeCount = filteredData.filter((item) => item.status === "active").length;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Icon name="Building2" className="text-primary-foreground" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Реестр Банкротов</h1>
                <p className="text-sm text-muted-foreground">Федеральный ресурс</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleExport("csv")}>
                <Icon name="Download" size={16} className="mr-2" />
                CSV
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleExport("excel")}>
                <Icon name="FileSpreadsheet" size={16} className="mr-2" />
                Excel
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 animate-fade-in">
          <Card className="p-6 border-l-4 border-l-primary hover-scale transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Всего записей</p>
                <p className="text-3xl font-bold text-foreground">{filteredData.length}</p>
                <p className="text-xs text-muted-foreground mt-1">из {mockData.length} в базе</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Icon name="Database" className="text-primary" size={28} />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-blue-500 hover-scale transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Активных дел</p>
                <p className="text-3xl font-bold text-foreground">{activeCount}</p>
                <p className="text-xs text-muted-foreground mt-1">в процессе</p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Icon name="FileText" className="text-blue-500" size={28} />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-destructive hover-scale transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Общая задолженность</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(totalDebt)}</p>
                <p className="text-xs text-muted-foreground mt-1">по фильтрам</p>
              </div>
              <div className="p-3 bg-destructive/10 rounded-lg">
                <Icon name="TrendingUp" className="text-destructive" size={28} />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 animate-fade-in">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Icon name="BarChart3" className="text-primary" size={20} />
              Распределение по статусам
            </h3>
            <div className="space-y-3">
              {["active", "completed", "suspended"].map((status) => {
                const count = mockData.filter((item) => item.status === status).length;
                const percentage = ((count / mockData.length) * 100).toFixed(1);
                const labels: Record<string, { text: string; color: string }> = {
                  active: { text: "Активные", color: "bg-blue-500" },
                  completed: { text: "Завершенные", color: "bg-green-500" },
                  suspended: { text: "Приостановленные", color: "bg-yellow-500" },
                };
                const label = labels[status];
                return (
                  <div key={status} className="space-y-1">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium">{label.text}</span>
                      <span className="text-muted-foreground">{count} ({percentage}%)</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${label.color} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Icon name="PieChart" className="text-primary" size={20} />
              Типы банкротов
            </h3>
            <div className="space-y-3">
              {["legal", "individual"].map((type) => {
                const count = mockData.filter((item) => item.type === type).length;
                const percentage = ((count / mockData.length) * 100).toFixed(1);
                const labels: Record<string, { text: string; color: string }> = {
                  legal: { text: "Юридические лица", color: "bg-primary" },
                  individual: { text: "Физические лица", color: "bg-accent" },
                };
                const label = labels[type];
                return (
                  <div key={type} className="space-y-1">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium">{label.text}</span>
                      <span className="text-muted-foreground">{count} ({percentage}%)</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${label.color} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Средняя задолженность</span>
                <span className="font-semibold">{formatCurrency(mockData.reduce((sum, item) => sum + item.debtAmount, 0) / mockData.length)}</span>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Поиск по названию, ИНН или номеру дела..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Статус дела" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все статусы</SelectItem>
                    <SelectItem value="active">Активное</SelectItem>
                    <SelectItem value="completed">Завершено</SelectItem>
                    <SelectItem value="suspended">Приостановлено</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Тип банкрота" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все типы</SelectItem>
                    <SelectItem value="legal">Юридическое лицо</SelectItem>
                    <SelectItem value="individual">Физическое лицо</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(searchQuery || statusFilter !== "all" || typeFilter !== "all") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                    setTypeFilter("all");
                  }}
                >
                  <Icon name="X" size={16} className="mr-2" />
                  Сбросить
                </Button>
              )}
            </div>
          </div>
        </Card>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название / ФИО</TableHead>
                <TableHead>ИНН</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Задолженность</TableHead>
                <TableHead>Номер дела</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12">
                    <div className="flex flex-col items-center gap-3">
                      <Icon name="Search" className="text-muted-foreground" size={48} />
                      <p className="text-muted-foreground">Нет результатов по заданным критериям</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((item) => (
                  <TableRow key={item.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="font-mono text-sm">{item.inn}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {item.type === "legal" ? "Юр. лицо" : "Физ. лицо"}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-right font-semibold">{formatCurrency(item.debtAmount)}</TableCell>
                    <TableCell className="font-mono text-sm">{item.caseNumber}</TableCell>
                    <TableCell>{formatDate(item.startDate)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedBankrupt(item)}>
                        <Icon name="ChevronRight" size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>

      <Dialog open={!!selectedBankrupt} onOpenChange={() => setSelectedBankrupt(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedBankrupt?.name}</DialogTitle>
            <DialogDescription>Полная информация о деле о банкротстве</DialogDescription>
          </DialogHeader>
          {selectedBankrupt && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">ИНН</p>
                  <p className="font-mono font-semibold">{selectedBankrupt.inn}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Номер дела</p>
                  <p className="font-mono font-semibold">{selectedBankrupt.caseNumber}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Тип</p>
                  <Badge variant="outline">
                    {selectedBankrupt.type === "legal" ? "Юридическое лицо" : "Физическое лицо"}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Статус</p>
                  {getStatusBadge(selectedBankrupt.status)}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="space-y-1 mb-4">
                  <p className="text-sm text-muted-foreground">Размер задолженности</p>
                  <p className="text-3xl font-bold text-destructive">{formatCurrency(selectedBankrupt.debtAmount)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Дата начала процедуры</p>
                    <p className="font-semibold">{formatDate(selectedBankrupt.startDate)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Регион</p>
                    <p className="font-semibold">{selectedBankrupt.region}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Арбитражный управляющий</p>
                  <p className="font-semibold">{selectedBankrupt.arbitrManager}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">
                  <Icon name="FileText" size={16} className="mr-2" />
                  Открыть дело
                </Button>
                <Button variant="outline" className="flex-1">
                  <Icon name="Download" size={16} className="mr-2" />
                  Скачать выписку
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;