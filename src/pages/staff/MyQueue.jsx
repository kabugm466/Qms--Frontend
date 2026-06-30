import { useState } from "react";
import StaffLayout from "../../components/layout/StaffLayout";
import { useAuth } from "../../context/AuthContext";

// Staff only ever sees their assigned service's queue
const INITIAL_QUEUE = {
  nowServing: { name: "Amina Wanjiku", waitedSince: "9:02 AM" },
  waiting: [
    { id: 1, name: "James M.",  est: "~10 min" },
    { id: 2, name: "Grace A.",  est: "~20 min" },
    { id: 3, name: "Tom K.",    est: "~30 min" },
  ],
};

export default function MyQueue() {
  const { user } = useAuth();
  const canManage = (user?.accessLevel || "Manage Appointments") !== "View Only";

  const [queue, setQueue] = useState(INITIAL_QUEUE);
  const [calledLog, setCalledLog] = useState([
    { name: "Peter O.", time: "8:45 AM" },
    { name: "Susan W.", time: "8:30 AM" },
  ]);

  const callNext = () => {
    if (queue.waiting.length === 0) return;
    const [next, ...rest] = queue.waiting;
    setCalledLog(log => [{ name: queue.nowServing.name, time: new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }) }, ...log]);
    setQueue({
      nowServing: { name: next.name, waitedSince: new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }) },
      waiting: rest,
    });
  };

  const skipCurrent = () => {
    if (queue.waiting.length === 0) return;
    const [next, ...rest] = queue.waiting;
    setQueue({
      nowServing: { name: next.name, waitedSince: new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }) },
      waiting: [...rest, { id: Date.now(), name: queue.nowServing.name, est: "~15 min" }],
    });
  };

  return (
    <StaffLayout>
      <div className="p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-xl font-semibold text-navy">My Queue</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {user?.assignedService || "General Consultation"} · {user?.institution || "City General Hospital"}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-green-600">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Live
          </div>
        </div>

        {!canManage && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2.5 mb-4 text-xs text-yellow-700">
            ⚠ View Only access — contact your Institution Admin to request queue control permissions.
          </div>
        )}

        <div className="grid grid-cols-3 gap-4">
          {/* Now Serving + controls */}
          <div className="col-span-2 card p-5">
            <div className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-2">
              Now Serving
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">{queue.nowServing.name}</div>
              <div className="text-xs text-gray-500">Called at {queue.nowServing.waitedSince}</div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={callNext}
                disabled={!canManage || queue.waiting.length === 0}
                className="btn-primary flex-1 py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Call Next →
              </button>
              <button
                onClick={skipCurrent}
                disabled={!canManage || queue.waiting.length === 0}
                className="btn-secondary px-5 py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Skip
              </button>
            </div>

            {/* Recently called log */}
            <div className="mt-5 pt-4 border-t border-gray-100">
              <div className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-2">
                Recently Called
              </div>
              <div className="space-y-1.5">
                {calledLog.slice(0, 4).map((c, i) => (
                  <div key={i} className="flex items-center justify-between text-xs text-gray-500">
                    <span>{c.name}</span>
                    <span>{c.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Waiting list */}
          <div className="card p-5">
            <div className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-3">
              Waiting ({queue.waiting.length})
            </div>
            <div className="space-y-2">
              {queue.waiting.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-6">Queue is empty</p>
              )}
              {queue.waiting.map((p, i) => (
                <div key={p.id} className="flex items-center justify-between px-3 py-2.5 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-white border border-gray-200 text-[10px] font-semibold text-gray-500 flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-700">{p.name}</span>
                  </div>
                  <span className="text-xs text-gray-400">{p.est}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StaffLayout>
  );
}
