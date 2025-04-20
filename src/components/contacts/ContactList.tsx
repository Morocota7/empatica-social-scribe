
import { Contact } from "@/types";
import { mockContacts } from "@/utils/mock-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ContactListProps {
  filter: "all" | "frequent" | "pending";
}

export const ContactList = ({ filter }: ContactListProps) => {
  // Filtrar contactos según el tipo
  const filteredContacts = mockContacts.filter(contact => {
    if (filter === "frequent") {
      // Ejemplo: contactos con más de 5 interacciones en el último mes
      return true; // Implementar lógica real
    } else if (filter === "pending") {
      // Ejemplo: contactos sin respuesta en la última semana
      return true; // Implementar lógica real
    }
    return true;
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Contacto</TableHead>
            <TableHead>Plataformas</TableHead>
            <TableHead>Última Interacción</TableHead>
            <TableHead>Sentimiento</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredContacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback>
                    {contact.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                {contact.name}
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {contact.platforms.map(platform => (
                    <Badge key={platform} variant="outline">
                      {platform}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                {contact.lastInteraction?.toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge variant={
                  contact.sentiment === "positive" ? "default" :
                  contact.sentiment === "negative" ? "destructive" : "secondary"
                }>
                  {contact.sentiment}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge>Activo</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
