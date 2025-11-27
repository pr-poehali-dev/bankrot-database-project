import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface HeaderProps {
  onExport: (format: "csv" | "excel") => void;
}

const Header = ({ onExport }: HeaderProps) => {
  return (
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
            <Button variant="outline" size="sm" onClick={() => onExport("csv")}>
              <Icon name="Download" size={16} className="mr-2" />
              CSV
            </Button>
            <Button variant="outline" size="sm" onClick={() => onExport("excel")}>
              <Icon name="FileSpreadsheet" size={16} className="mr-2" />
              Excel
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
