import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Bankrupt, mockData } from "@/components/bankrupts/types";
import Header from "@/components/bankrupts/Header";
import StatsCards from "@/components/bankrupts/StatsCards";
import FiltersPanel from "@/components/bankrupts/FiltersPanel";
import BankruptTable from "@/components/bankrupts/BankruptTable";

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
      <Header onExport={handleExport} />

      <div className="container mx-auto px-6 py-6">
        <StatsCards
          filteredData={filteredData}
          activeCount={activeCount}
          totalDebt={totalDebt}
          formatCurrency={formatCurrency}
        />

        <FiltersPanel
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
        />

        <BankruptTable
          filteredData={filteredData}
          selectedBankrupt={selectedBankrupt}
          setSelectedBankrupt={setSelectedBankrupt}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
          getStatusBadge={getStatusBadge}
        />
      </div>
    </div>
  );
};

export default Index;
