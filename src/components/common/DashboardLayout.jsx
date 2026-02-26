import SideBar from "./SideBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <SideBar />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="container-page">{children}</div>
      </main>
    </div>
  );
}
