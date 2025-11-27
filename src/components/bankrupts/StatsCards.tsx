import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Bankrupt, mockData } from "./types";

interface StatsCardsProps {
  filteredData: Bankrupt[];
  activeCount: number;
  totalDebt: number;
  formatCurrency: (amount: number) => string;
}

const StatsCards = ({ filteredData, activeCount, totalDebt, formatCurrency }: StatsCardsProps) => {
  return (
    <>
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
    </>
  );
};

export default StatsCards;
