
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { AppSettings, ToneSettings } from "@/types";
import { mockToneSettings } from "@/utils/mock-data";

type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  const [settings, setSettings] = useState<AppSettings>({
    tones: mockToneSettings,
    darkMode: false,
    autoRespond: true,
    language: "es",
    notifications: true,
  });

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
