import React, { useState } from 'react';

function ProjectForm({ setProjects }) {
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    deadline: '',
    point: '',
    steps: ['']
  });

  const handleAddProject = async () => {
    if (!form.name || !form.deadline || !form.point) {
      alert("Harap lengkapi semua kolom wajib (nama, deadline, poin).");
      return;
    }

    try {
      const res = await fetch("https://projecttracker.putrapanggiljaya.id:3423/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          deadline: form.deadline,
          point: form.point,
          steps: JSON.stringify(form.steps)
        })
      });

      if (!res.ok) throw new Error("Gagal menyimpan project");
      
      // Ambil project terbaru setelah berhasil POST
      const getRes = await fetch("https://projecttracker.putrapanggiljaya.id:3423/projects");
      const projectList = await getRes.json();
      setProjects(projectList);

      // Reset form
      setForm({
        name: '',
        description: '',
        deadline: '',
        point: '',
        steps: ['']
      });
      setFormVisible(false);

    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan project.");
    }
  };

  return (
    <div className="mb-6 bg-white border rounded-lg shadow">
      <button
        className="w-full text-left px-6 py-4 bg-blue-600 text-white font-semibold rounded-t-lg hover:bg-blue-700 transition flex justify-between items-center"
        onClick={() => setFormVisible(prev => !prev)}
      >
        + Tambah Project Baru
        <span className="ml-2">{formVisible ? '▲' : '▼'}</span>
      </button>

      {formVisible && (
        <div className="px-6 py-4 transition-all duration-300 ease-in-out">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Project</label>
            <input
              type="text"
              placeholder="Contoh: Website KelolaKos"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
            <textarea
              placeholder="Deskripsi singkat project..."
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
              <input
                type="date"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={form.deadline}
                onChange={e => setForm({ ...form, deadline: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nilai Poin</label>
              <input
                type="number"
                placeholder="Misal: 50"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={form.point}
                onChange={e => setForm({ ...form, point: e.target.value })}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Checklist Steps</label>
            {form.steps.map((step, idx) => (
              <input
                key={idx}
                className="w-full border border-gray-300 p-2 rounded mb-2 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder={`Langkah ${idx + 1}`}
                value={step}
                onChange={e => {
                  const newSteps = [...form.steps];
                  newSteps[idx] = e.target.value;
                  setForm({ ...form, steps: newSteps });
                }}
              />
            ))}
            <button
              type="button"
              onClick={() => setForm({ ...form, steps: [...form.steps, ''] })}
              className="text-blue-600 hover:underline text-sm mt-1"
            >
              + Tambah Langkah
            </button>
          </div>

          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            onClick={handleAddProject}
          >
            Simpan Project
          </button>
        </div>
      )}
    </div>
  );
}

export default ProjectForm;
