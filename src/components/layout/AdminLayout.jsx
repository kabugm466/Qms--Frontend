import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NAV_ITEMS = [
  { label: "Platform Overview", path: "/admin/overview", icon: "📊" },
  { label: "Institutions",      path: "/admin/institutions", icon: "🌐" },
  { label: "Users",             path: "/admin/users", icon: "👤" },
  { label: "System Settings",   path: "/admin/settings", icon: "⚙️" },
];

export default function AdminLayout({ children }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden font-poppins">
      {/* Sidebar — dark navy matching screenshot */}
      <aside className="w-40 bg-gray-900 flex flex-col flex-shrink-0">
        <div className="px-3 pt-4 pb-3 border-b border-white/10">
          <div className="flex items-center gap-1.5 mb-0.5">
            <div className="w-5 h-5 rounded-full border-2 border-green-brand flex items-center justify-center">
              <span className="text-green-brand text-[9px] font-bold">✓</span>
            </div>
            <span className="text-white font-bold text-xs tracking-wide">JIPANGE</span>
          </div>
          <div className="text-gray-400 text-[10px]">System Admin Portal</div>
        </div>

        <nav className="flex-1 py-3 px-2 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs transition-colors text-left
                  ${active
                    ? "bg-white/10 text-white font-semibold border-l-4 border-green-brand pl-1"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
              >
                <span className="text-sm">{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="px-2 pb-4 border-t border-white/10 pt-3">
          <button
            onClick={() => { logout(); navigate("/login"); }}
            className="w-full flex items-center gap-2 px-2 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-white/10 rounded-lg transition-colors"
          >
            <span>→</span> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 h-12 flex items-center justify-between px-5 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-green-brand flex items-center justify-center">
              <span className="text-green-brand text-xs font-bold">✓</span>
            </div>
            <div>
              <div className="text-navy font-bold text-xs tracking-wide leading-tight">System Admin</div>
            </div>
          </div>

          {/* Group switcher */}
          <div className="flex items-center gap-1 text-xs">
            {["Public Pages","Auth Pages","Client Dashboard","Institution Admin","System Admin"].map((tab) => {
              const isActive = tab === "System Admin";
              return (
                <button
                  key={tab}
                  className={`px-3 py-1.5 rounded-full text-[11px] transition-colors ${
                    isActive ? "bg-navy text-white font-medium" : "text-gray-500 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    if (tab === "Institution Admin") navigate("/institution/overview");
                    if (tab === "Client Dashboard") navigate("/client/dashboard");
                    if (tab === "Public Pages") navigate("/");
                    if (tab === "Auth Pages") navigate("/login");
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-navy rounded-full flex items-center justify-center text-white text-xs font-bold">
              SA
            </div>
            <span className="text-sm text-gray-700 font-medium">Super Admin</span>
            <span className="text-gray-400 text-xs">▾</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-page">
          {children}
        </main>
      </div>
    </div>
  );
}
