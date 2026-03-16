import React, { useMemo, useState } from "react";

type PatientProfile = {
  name: string;
  age: number;
  height: string;
  weight: string;
  bloodGroup: string;
  trimester: string;
  image: string;
};

const Profile: React.FC = () => {
  const initialPatient = useMemo<PatientProfile>(
    () => ({
      name: "Sita Devi",
      age: 26,
      height: "160 cm",
      weight: "60 kg",
      bloodGroup: "O+",
      trimester: "Second Trimester",
      image: "https://i.pravatar.cc/150?img=5",
    }),
    []
  );

  const [patient, setPatient] = useState<PatientProfile>(initialPatient);
  const [draft, setDraft] = useState<PatientProfile>(initialPatient);
  const [isEditing, setIsEditing] = useState(false);

  const startEdit = () => {
    setDraft(patient);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraft(patient);
    setIsEditing(false);
  };

  const saveEdit = () => {
    setPatient(draft);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={patient.image}
            alt="profile"
            className="w-16 h-16 rounded-full border-2 border-teal-200"
          />
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">{patient.name}</h1>
            <p className="text-sm text-gray-600">Patient Profile</p>
          </div>
        </div>

        {!isEditing ? (
          <button
            onClick={startEdit}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors shadow-sm"
          >
            Edit
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={saveEdit}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors shadow-sm"
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="px-4 py-2 bg-teal-50 text-teal-700 rounded-lg text-sm font-medium hover:bg-teal-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-600">Name</div>
            {!isEditing ? (
              <div className="text-gray-800 font-semibold">{patient.name}</div>
            ) : (
              <input
                value={draft.name}
                onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
                className="w-full border rounded px-3 py-2"
              />
            )}
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-600">Age</div>
            {!isEditing ? (
              <div className="text-gray-800 font-semibold">{patient.age}</div>
            ) : (
              <input
                value={String(draft.age)}
                onChange={(e) =>
                  setDraft((p) => ({
                    ...p,
                    age: Number(e.target.value.replace(/[^\d]/g, "")) || 0,
                  }))
                }
                className="w-full border rounded px-3 py-2"
              />
            )}
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-600">Height</div>
            {!isEditing ? (
              <div className="text-gray-800 font-semibold">{patient.height}</div>
            ) : (
              <input
                value={draft.height}
                onChange={(e) => setDraft((p) => ({ ...p, height: e.target.value }))}
                className="w-full border rounded px-3 py-2"
              />
            )}
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-600">Weight</div>
            {!isEditing ? (
              <div className="text-gray-800 font-semibold">{patient.weight}</div>
            ) : (
              <input
                value={draft.weight}
                onChange={(e) => setDraft((p) => ({ ...p, weight: e.target.value }))}
                className="w-full border rounded px-3 py-2"
              />
            )}
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-600">Blood Group</div>
            {!isEditing ? (
              <div className="text-gray-800 font-semibold">{patient.bloodGroup}</div>
            ) : (
              <input
                value={draft.bloodGroup}
                onChange={(e) => setDraft((p) => ({ ...p, bloodGroup: e.target.value }))}
                className="w-full border rounded px-3 py-2"
              />
            )}
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-600">Pregnancy Trimester</div>
            {!isEditing ? (
              <div className="text-gray-800 font-semibold">{patient.trimester}</div>
            ) : (
              <input
                value={draft.trimester}
                onChange={(e) => setDraft((p) => ({ ...p, trimester: e.target.value }))}
                className="w-full border rounded px-3 py-2"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

