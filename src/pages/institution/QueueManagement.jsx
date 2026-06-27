import { useState } from "react";
import InstitutionLayout from "../../components/layout/InstitutionLayout";

const INITIAL_QUEUES = [
  {
    service: "General Consultation",
    room: "Room 1A",
    nowServing: "Alice Wanjiru",
    waiting: [
      { pos: 1, name: "James M.",  eta: "~10 min" },
      { pos: 2, name: "Grace A.",  eta: "~20 min" },
      { pos: 3, name: "Tom K.",    eta: "~30 min" },
    ],
  },
  {
    service: "Lab Test",
    room: "Lab Block B",
    nowServing: "Mary Njeri",
    waiting: [
      { pos: 1, name: "Peter O.",  eta: "~15 min" },
      { pos: 2, name: "Susan W.",  eta: "~30 min" },
    ],
  },
  {
    service: "Pharmacy Collection",
    room: "Pharmacy",
    nowServing: "David K.",
    waiting: [
      { pos: 1, name: "Faith M.",  eta: "~8 min" },
    ],
  },
];

export default function QueueManagement() {
  const [queues, setQueues] = useState(INITIAL_QUEUES);

  const callNext = (serviceIdx) => {
    setQueues((prev) =>
      prev.map((q, i) => {
        if (i !== serviceIdx) return q;
        const [next, ...rest] = q.waiting;
        return {
          ...q,
          nowServing: next ? next.name : "—",
          waiting: rest.map((w, idx) => ({ ...w, pos: idx + 1 })),
        };
      })
    );
  };

  return (
    <InstitutionLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-navy">Queue Management</h1>
          <div className="flex items-center gap-1.5 text-green-brand text-sm font-medium">
            <span className="w-2 h-2 bg-green-brand rounded-full animate-pulse" />
            Live
          </div>
        </div>

        {/* Kanban columns */}
        <div className="grid grid-cols-3 gap-4">
          {queues.map((q, idx) => (
            <div key={q.service} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Column header */}
              <div className="bg-navy px-4 py-3">
                <div className="text-white font-semibold text-sm">{q.service}</div>
                <div className="text-blue-300 text-xs mt-0.5">{q.room}</div>
              </div>

              {/* Now serving */}
              <div className="p-4 border-b border-gray-100 bg-green-50">
                <div className="text-[10px] font-semibold text-green-700 uppercase tracking-wider mb-1">
                  Now Serving
                </div>
                <div className="text-base font-bold text-gray-900 mb-2">{q.nowServing}</div>
                <button
                  onClick={() => callNext(idx)}
                  className="btn-primary text-xs px-3 py-1.5"
                  disabled={q.waiting.length === 0}
                >
                  Call Next →
                </button>
              </div>

              {/* Waiting list */}
              <div className="p-4">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Waiting ({q.waiting.length})
                </div>
                {q.waiting.length === 0 ? (
                  <div className="text-xs text-gray-400 italic">No one waiting</div>
                ) : (
                  <div className="space-y-2">
                    {q.waiting.map((w) => (
                      <div key={w.pos} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                            {w.pos}
                          </span>
                          <span className="text-sm text-gray-800">{w.name}</span>
                        </div>
                        <span className="text-xs text-gray-400">{w.eta}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </InstitutionLayout>
  );
}
