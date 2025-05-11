import React, { useState } from 'react';
import dayjs from 'dayjs';

function Report({ projects }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const filtered = projects.filter(p => {
    if (!p.done || !p.doneAt) return false;
    if (!from || !to) return true;

    const doneDate = dayjs(p.doneAt);
    const fromDate = dayjs(from);
    const toDate = dayjs(to);

    return doneDate.isSame(fromDate, 'day') || doneDate.isSame(toDate, 'day') ||
      (doneDate.isAfter(fromDate) && doneDate.isBefore(toDate));
  });

  const totalPoint = filtered.reduce((sum, p) => sum + Number(p.point), 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mt-10 border-t pt-6 print:mt-0 print:border-none print:pt-0">
      <div className="flex justify-between items-center mb-4 print:hidden">
        <h2 className="text-xl font-semibold text-gray-800">Laporan Semua Proyek</h2>
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          🖨️ Cetak
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 print:hidden">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dari Tanggal</label>
          <input
            type="date"
            value={from}
            onChange={e => setFrom(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sampai Tanggal</label>
          <input
            type="date"
            value={to}
            onChange={e => setTo(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      {/* Ringkasan */}
      <div className="bg-gray-50 p-4 rounded border print:border-none print:p-0 mb-6">
        <p className="text-gray-700 text-lg">
          <span className="font-semibold">Total Proyek Selesai (dalam rentang tanggal):</span> {filtered.length}
        </p>
        <p className="text-gray-700 text-lg">
          <span className="font-semibold">Total Poin:</span> {totalPoint}
        </p>
      </div>

      {/* Semua proyek */}
      <div className="bg-white p-4 rounded border print:border-none print:p-0">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Daftar Semua Proyek</h3>
        <ul className="space-y-6 text-sm print:text-xs text-gray-800 print:text-black">
          {projects.map(p => (
            <li key={p.id} className="border-b pb-4">
              <div>
                <p className="font-semibold text-base">{p.name}</p>
                <p className="text-gray-600">Deadline: {dayjs(p.deadline).format('DD MMM YYYY')}</p>
                <p className="text-gray-600">Poin: {p.point}</p>
                <p className="text-gray-600">Deskripsi: {p.description || '-'}</p>

                {p.done && p.doneAt ? (
                  <p className="text-green-600 font-medium mt-1">✔️ Selesai pada {dayjs(p.doneAt).format('DD MMM YYYY')}</p>
                ) : (
                  <p className="text-red-600 font-medium mt-1">❌ Belum Selesai</p>
                )}

                {Array.isArray(p.steps) && (
                  <div className="mt-3">
                    <p className="font-semibold mb-1">Checklist:</p>
                    <ul className="space-y-2">
                      {p.steps.map((step, idx) => (
                        <li key={idx} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={step.done}
                            disabled
                            className="mr-2 w-5 h-5 text-blue-600 border-gray-300 rounded"
                          />
                          <span className={step.done ? "text-green-600 font-medium" : "text-gray-700"}>
                            {step.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Report;
