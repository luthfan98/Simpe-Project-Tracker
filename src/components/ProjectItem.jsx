import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

function ProjectItem({ project, setProjects }) {
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [steps, setSteps] = useState(project.steps || []);
  const [editMode, setEditMode] = useState(false); // ✅ Toggle mode edit

  const API_URL = "https://projecttracker.putrapanggiljaya.id:3423/projects";

  useEffect(() => {
    setSteps(project.steps || []);
  }, [project.steps]);

  const showToast = (type, message) => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: 2000
    });
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      showToast('error', 'Gagal mengambil data');
    }
  };

  const updateProject = async (updated) => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updated,
          steps: JSON.stringify(updated.steps)
        })
      });
      await fetchProjects();
      showToast('success', 'Project diperbarui');
    } catch (err) {
      showToast('error', 'Gagal memperbarui project');
    }
  };

  const toggleStep = (idx) => {
    const updatedSteps = [...steps];
    updatedSteps[idx].done = !updatedSteps[idx].done;
    setSteps(updatedSteps);
    updateProject({ ...project, steps: updatedSteps });
  };

  const markAsDone = async () => {
    const result = await Swal.fire({
      title: `Tandai project "${project.name}" sebagai selesai?`,
      text: "Ketik 'selesai' untuk mengkonfirmasi.",
      icon: 'question',
      input: 'text',
      inputPlaceholder: "Ketik 'selesai' di sini",
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Simpan',
      preConfirm: (inputValue) => {
        if (inputValue.trim().toLowerCase() !== 'selesai') {
          Swal.showValidationMessage(`Teks harus persis 'selesai' (huruf kecil)`);
          return false;
        }
      }
    });

    if (result.isConfirmed) {
      updateProject({
        ...project,
        steps,
        done: true,
        doneAt: new Date().toISOString()
      });
    }
  };

  const deleteProject = async () => {
    const result = await Swal.fire({
      title: `Hapus project "${project.name}"?`,
      text: "Tindakan ini tidak dapat dibatalkan.\nKetik 'delete' untuk melanjutkan.",
      icon: 'warning',
      input: 'text',
      inputPlaceholder: "Ketik 'delete' di sini",
      showCancelButton: true,
      confirmButtonColor: '#e3342f',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Hapus',
      preConfirm: (inputValue) => {
        if (inputValue.trim().toLowerCase() !== 'delete') {
          Swal.showValidationMessage(`Teks harus persis 'delete' (huruf kecil)`);
          return false;
        }
      }
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API_URL}?id=${project.id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Respon bukan 200');

        await fetchProjects();
        showToast('success', 'Project berhasil dihapus');
      } catch (err) {
        console.error(err);
        showToast('error', 'Gagal menghapus project');
      }
    }
  };

  const openModal = (field) => {
    setEditField(field);
    setEditValue(project[field]);
  };

  const saveEdit = () => {
    const updated = { ...project, steps };
    if (editField === 'point') updated.point = Number(editValue);
    else if (editField === 'deadline') updated.deadline = editValue;
    else updated[editField] = editValue;

    updateProject(updated);
    setEditField(null);
    setEditValue('');
  };

  return (
    <div
      className={`border rounded-xl p-6 bg-white shadow-md mb-6 transition relative break-avoid cursor-pointer ${
        editMode ? 'border-blue-400 ring-2 ring-blue-300' : 'hover:shadow-lg'
      }`}
      onDoubleClick={() => setEditMode(prev => !prev)}
    >
      {editMode && (
        <p className="text-xs text-blue-500 italic mb-3">Mode edit aktif – klik ✏️ untuk mengubah</p>
      )}

      <div className="flex justify-between items-start">
        <div className="flex-1 pr-4 space-y-2">
          <div className="flex items-center gap-2">
            {editMode && !project.done && (
              <button onClick={() => openModal('name')} className="text-blue-600 text-sm hover:underline">✏️</button>
            )}
            <h3 className="text-2xl font-bold text-gray-900">{project.name}</h3>
          </div>

          <div className="flex items-start gap-2">
            {editMode && !project.done && (
              <button onClick={() => openModal('description')} className="text-blue-600 text-sm hover:underline">✏️</button>
            )}
            <p className="text-gray-800 text-lg">Deskripsi : {project.description}</p>
          </div>

          <div className="flex items-center gap-2">
            {editMode && !project.done && (
              <button onClick={() => openModal('deadline')} className="text-blue-600 text-sm hover:underline">✏️</button>
            )}
            <p className="text-lg text-gray-800">
              Deadline : <span className="font-medium">{dayjs(project.deadline).format('DD MMM YYYY')}</span>
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center justify-end gap-2">
            {editMode && !project.done && (
              <button onClick={() => openModal('point')} className="text-blue-600 text-sm hover:underline">✏️</button>
            )}
            <div>
              <p className="text-xl text-gray-600 font-bold">POIN :</p>
              <p className="text-3xl font-extrabold text-blue-600">{project.point}</p>
            </div>
          </div>

          {project.done && (
            <div className="text-green-600 font-semibold text-sm mt-2">✔️ Selesai</div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <hr />
        <h4 className="mt-6 font-semibold text-gray-800 text-lg mb-3">Alur Pengerjaan :</h4>
        <ul className="space-y-3">
          {steps.map((step, idx) => (
            <li key={idx} className="flex items-center text-lg">
              <input
                type="checkbox"
                className="mr-3 w-5 h-5 text-blue-600 rounded"
                checked={step.done}
                onChange={() => toggleStep(idx)}
                disabled={project.done}
              />
              <span className={step.done ? 'text-green-600 font-medium' : 'text-gray-800'}>
                {step.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {!project.done && (
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={markAsDone}
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition font-medium cursor-pointer"
          >
            Tandai Selesai
          </button>
          <button
            onClick={deleteProject}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition font-medium cursor-pointer"
          >
            🗑️
          </button>
        </div>
      )}

      {project.done && (
        <div className="mt-6 text-green-700 font-medium text-center">
          ✅ Proyek telah ditandai selesai
        </div>
      )}

      {/* Modal Edit */}
      {editField && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-2 capitalize">Edit {editField}</h3>
            {editField === 'description' ? (
              <textarea
                className="w-full border border-gray-300 p-2 rounded"
                rows={3}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            ) : (
              <input
                type={editField === 'point' ? 'number' : editField === 'deadline' ? 'date' : 'text'}
                className="w-full border border-gray-300 p-2 rounded"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            )}
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setEditField(null)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                Batal
              </button>
              <button onClick={saveEdit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectItem;
