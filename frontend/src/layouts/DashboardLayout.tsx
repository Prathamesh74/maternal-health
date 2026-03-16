import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, Users, Activity, FileText } from 'lucide-react';

/**
 * DashboardLayout
 * Includes a sidebar navigation and a top header for the Doctor's interface.
 * Scales fluidly on desktops and collapses smoothly on mobile devices.
 */
export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "doctor";
  const patient = {
    name: "Sita Devi",
    age: 26,
    height: "160 cm",
    weight: "60 kg",
    bloodGroup: "O+",
    trimester: "Second Trimester",
    image: "https://i.pravatar.cc/150?img=5",
  };

  const doctorMenu = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/doctor-dashboard" },
    { label: "Patients", icon: Users, path: "/patients" },
    { label: "Risk Predictions", icon: Activity, path: "#" },
    { label: "Visit Records", icon: FileText, path: "#" },
  ];

  const ashaMenu = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/asha-dashboard" },
    { label: "Assigned Patients", icon: Users, path: "/patients" },
    { label: "Submit Survey", icon: FileText, path: "/patient-survey" },
  ];

  const patientMenu = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/user-dashboard" },
    { label: "My Records", icon: FileText, path: "#" },
    { label: "Health Tips", icon: Activity, path: "#" },
  ];

  let menuItems = doctorMenu;

  if (role === "asha") {
    menuItems = ashaMenu;
  }

  if (role === "patient") {
    menuItems = patientMenu;
  }

  const getHeaderTitle = () => {
    if (role === "doctor") return "Welcome, Dr. Smith";
    if (role === "asha") return "Welcome, Asha Worker";
    if (role === "patient") return `Welcome, ${patient.name}`;
    return "Dashboard";
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50 selection:bg-teal-200">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm hidden md:flex">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-teal-700 tracking-tight flex items-center gap-2">
            <Activity className="w-6 h-6" /> Maternal Health
          </h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => (
            item.path === "#" ? (
              <button
                key={index}
                type="button"
                className="w-full flex items-center justify-start gap-3 px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-xl transition-all font-medium"
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ) : (
              <Link
                key={index}
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-xl transition-all font-medium"
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white px-8 py-5 border-b border-gray-200 flex items-center justify-between shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {getHeaderTitle()}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-3 mr-4">
              <button className="px-4 py-2 bg-teal-50 text-teal-700 rounded-lg text-sm font-medium hover:bg-teal-100 transition-colors">
                Add Patient
              </button>
              <button className="px-4 py-2 bg-teal-50 text-teal-700 rounded-lg text-sm font-medium hover:bg-teal-100 transition-colors">
                Record Visit
              </button>
              <button className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors shadow-sm">
                Run Prediction
              </button>
            </div>
            {role === "patient" && (
              <Link to="/profile">
                <img
                  src={patient.image}
                  alt="profile"
                  className="w-10 h-10 rounded-full border-2 border-teal-200 cursor-pointer"
                />
              </Link>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
