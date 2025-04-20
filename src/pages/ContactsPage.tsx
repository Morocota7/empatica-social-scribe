
import { ContactsOverview } from "@/components/contacts/ContactsOverview";
import { AppLayout } from "@/components/layout/AppLayout";

const ContactsPage = () => {
  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Gestión de Contactos</h1>
        <ContactsOverview />
      </div>
    </AppLayout>
  );
};

export default ContactsPage;
