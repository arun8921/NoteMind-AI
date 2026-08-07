import { NavigationProvider } from "./context/NavigationContext";
import { AuthProvider } from "./context/AuthContext";
import { useNavigation } from "./hooks/useNavigation";
import { useAuth } from "./hooks/useAuth";
import LandingPage from "./pages/landing/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import EditorPage from "./pages/EditorPage";
import AIChatPage from "./pages/AIChatPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

const PROTECTED_PAGES = ["dashboard", "editor", "ai-chat", "profile", "settings"];

function PageRouter() {
  const { page, navigate } = useNavigation();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="size-full flex items-center justify-center" style={{ background: "#0F172A", color: "#94A3B8" }}>
        Loading…
      </div>
    );
  }

  // Guard: bounce unauthenticated users away from protected pages.
  if (PROTECTED_PAGES.includes(page) && !user) {
    navigate("login");
    return null;
  }

  const pages = {
    landing: <LandingPage />,
    login: <LoginPage />,
    register: <RegisterPage />,
    dashboard: <DashboardPage />,
    editor: <EditorPage />,
    "ai-chat": <AIChatPage />,
    profile: <ProfilePage />,
    settings: <SettingsPage />,
  };

  return (
    <div className="size-full" style={{ fontFamily: "'Inter', sans-serif" }}>
      {pages[page]}
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <AuthProvider>
        <PageRouter />
      </AuthProvider>
    </NavigationProvider>
  );
}
