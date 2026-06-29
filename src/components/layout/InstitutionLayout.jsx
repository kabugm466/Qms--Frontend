import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NAV_ITEMS = [
  { label: "Dashboard",        path: "/institution/overview",      icon: "⊞" },
  { label: "Appointments",     path: "/institution/appointments",  icon: "📅" },
  { label: "Queue Management", path: "/institution/queue",         icon: "🎟" },
  { label: "Staff Management", path: "/institution/staff",         icon: "👥" },
  { label: "Reports",          path: "/institution/reports",       icon: "📈" },
  { label: "Settings",         path: "/institution/settings",      icon: "⚙️" },
];

export default function InstitutionLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [notifOpen, setNotifOpen] = useState(false);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "DK";

  return (
    <div className="flex h-screen overflow-hidden font-poppins">
      {/* Sidebar */}
      <aside className="w-44 bg-navy flex flex-col flex-shrink-0">
        {/* Institution identity */}
        <div className="px-3 pt-4 pb-3 border-b border-white/10">
          <div className="w-9 h-9 bg-green-brand rounded-lg flex items-center justify-center text-white text-xs font-bold mb-2">
            CGH
          </div>
          <div className="text-white text-xs font-semibold leading-tight">
            {user?.institution || "City General Hospital"}
          </div>
          <div className="text-blue-300 text-[10px] mt-0.5">Institution Admin</div>
          <div className="mt-2">
            <span className="bg-green-brand text-white text-[9px] font-semibold px-2 py-0.5 rounded-full">
              + Active
            </span>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-3 px-2 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-2 px-2 py-2.5 rounded-lg text-xs transition-colors text-left
                  ${active
                    ? "bg-white/10 text-white font-semibold border-l-4 border-green-brand pl-1"
                    : "text-blue-200 hover:bg-white/10 hover:text-white"
                  }`}
              >
                <span className="text-sm">{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-2 pb-4 border-t border-white/10 pt-3 space-y-1">
          <button className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-blue-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            ❓ Help &amp; Support
          </button>
          <button
            onClick={() => { logout(); navigate("/login"); }}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-red-300 hover:text-red-200 hover:bg-white/10 rounded-lg transition-colors"
          >
            <span>→</span> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 h-12 flex items-center justify-between px-5 flex-shrink-0">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/logo.png" alt="JIPANGE" className="h-8 w-auto" />
          </div>

          {/* Group switcher */}
          <div className="flex items-center gap-1">
            {["Public Pages","Auth Pages","Client Dashboard","Institution Admin","System Admin"].map((tab) => {
              const isActive = tab === "Institution Admin";
              return (
                <button
                  key={tab}
                  className={`px-3 py-1.5 rounded-full text-[11px] transition-colors ${
                    isActive ? "bg-navy text-white font-medium" : "text-gray-500 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    if (tab === "System Admin") navigate("/admin/overview");
                    if (tab === "Client Dashboard") navigate("/client/dashboard");
                    if (tab === "Public Pages") navigate("/home");
                    if (tab === "Auth Pages") navigate("/login");
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button
              className="relative p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg"
              onClick={() => setNotifOpen(!notifOpen)}
            >
              🔔
              <span className="absolute -top-0.5 -right-0.5 bg-gold-brand text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                4
              </span>
            </button>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-7 h-7 bg-navy rounded-full flex items-center justify-center text-white text-xs font-bold">
                {initials}
              </div>
              <span className="text-sm text-gray-700 font-medium">
                Dr. Kamau
              </span>
              <span className="text-gray-400 text-xs">▾</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-page">
          {children}
        </main>
      </div>
    </div>
  );
}
