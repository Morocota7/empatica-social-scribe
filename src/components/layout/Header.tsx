
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiBell, FiSearch, FiMoon, FiSun } from "react-icons/fi";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Implement actual dark mode toggle functionality if needed
  };

  return (
    <header className="border-b border-gray-200 py-3 px-6 bg-white flex items-center justify-between">
      <div className="relative w-1/3">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="search"
          placeholder="Buscar conversaciones o contactos..."
          className="pl-10 pr-4 py-2 w-full"
        />
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={toggleDarkMode}>
          {darkMode ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
        </Button>
        
        <Button variant="outline" size="icon" className="relative">
          <FiBell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 bg-empatica-accent text-white text-xs h-4 w-4 rounded-full flex items-center justify-center">
            3
          </span>
        </Button>
        
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="Usuario" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-gray-500">admin@empatica.ai</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
