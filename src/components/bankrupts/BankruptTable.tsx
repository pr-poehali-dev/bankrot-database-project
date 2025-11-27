import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Bankrupt } from "./types";

interface BankruptTableProps {
  filteredData: Bankrupt[];
  selectedBankrupt: Bankrupt | null;
  setSelectedBankrupt: (bankrupt: Bankrupt | null) => void;
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
  getStatusBadge: (status: string) => JSX.Element;
}

const BankruptTable = ({
  filteredData,
  selectedBankrupt,
  setSelectedBankrupt,
  formatCurrency,
  formatDate,
  getStatusBadge,
}: BankruptTableProps) => {
  return (
    <>
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
    </>
  );
};

export default BankruptTable;
