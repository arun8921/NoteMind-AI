import { LayoutDashboard, FileText, Sparkles, Folder, Star, Archive, Trash2 } from "lucide-react";

// Primary workspace nav items shown in the Sidebar.
export const NAV = [
  { icon: LayoutDashboard, label: "Dashboard", page: "dashboard" },
  { icon: FileText, label: "Notes", page: "editor" },
  { icon: Sparkles, label: "AI Chat", page: "ai-chat" },
  { icon: Folder, label: "Folders", page: "dashboard" },
  { icon: Star, label: "Favorites", page: "dashboard" },
  { icon: Archive, label: "Archive", page: "dashboard" },
  { icon: Trash2, label: "Trash", page: "dashboard" },
];
