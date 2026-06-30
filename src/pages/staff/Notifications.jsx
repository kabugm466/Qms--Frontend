import StaffLayout from "../../components/layout/StaffLayout";

const NOTIFICATIONS = {
  TODAY: [
    { id: 1, icon: "🔔", iconBg: "bg-green-100", iconColor: "text-green-600", title: "New Booking", message: "Amina Wanjiku booked General Consultation for 9:00 AM.", time: "2h ago", unread: true },
    { id: 2, icon: "⏰", iconBg: "bg-yellow-100", iconColor: "text-yellow-600", title: "Queue Reminder", message: "3 clients waiting in your queue.", time: "4h ago", unread: true },
  ],
  YESTERDAY: [
    { id: 3, icon: "🔔", iconBg: "bg-blue-100", iconColor: "text-blue-500", title: "Schedule Updated", message: "Your shift hours were updated by Dr. Kamau.", time: "1d ago", unread: false },
  ],
}

export default function StaffNotifications() {
  return (
    <StaffLayout>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-navy mb-6">Notifications</h1>
        <div className="space-y-6">
          {Object.entries(NOTIFICATIONS).map(([group, items]) => (
            <div key={group}>
              <div className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase mb-2 px-1">{group}</div>
              <div className="card overflow-hidden">
                {items.map((n, i) => (
                  <div key={n.id} className={`flex items-start gap-4 px-5 py-4 ${i < items.length - 1 ? "border-b border-gray-50" : ""} ${n.unread ? "bg-green-50 border-l-4 border-l-green-brand" : ""}`}>
                    <div className={`w-9 h-9 rounded-full ${n.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <span className={`text-base ${n.iconColor}`}>{n.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm mb-0.5 ${n.unread ? "font-semibold text-gray-900" : "font-medium text-gray-800"}`}>{n.title}</div>
                      <div className="text-xs text-gray-500 leading-relaxed">{n.message}</div>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </StaffLayout>
  );
}
