
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download, Upload } from "lucide-react";

export const ContactImportExport = () => {
  const handleExport = () => {
    // Implementar exportación a CSV
    const csvContent = "data:text/csv;charset=utf-8,";
    // Agregar headers y datos...
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "humanizer-contacts.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Contactos exportados correctamente");
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        // Procesar CSV...
        toast.success("Contactos importados correctamente");
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex gap-4 mb-4">
      <Button
        variant="outline"
        onClick={() => document.getElementById("import-csv")?.click()}
        className="flex items-center gap-2"
      >
        <Upload className="h-4 w-4" />
        Importar Contactos
      </Button>
      <input
        type="file"
        id="import-csv"
        accept=".csv"
        className="hidden"
        onChange={handleImport}
      />
      <Button onClick={handleExport} className="flex items-center gap-2">
        <Download className="h-4 w-4" />
        Exportar Contactos
      </Button>
    </div>
  );
};
