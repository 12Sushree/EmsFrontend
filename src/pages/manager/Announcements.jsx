import SideBar from "../../components/common/SideBar";
import CreateAnnouncement from "../../components/manager/CreateAnnouncement";
import AnnouncementList from "../../components/common/AnnouncementList";

export default function Announcement() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <SideBar />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">
          Announcements
        </h1>

        <CreateAnnouncement />
        <AnnouncementList />
      </main>
    </div>
  );
}
