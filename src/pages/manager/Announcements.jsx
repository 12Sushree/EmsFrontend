import CreateAnnouncement from "../../components/manager/CreateAnnouncement";
import AnnouncementList from "../../components/common/AnnouncementList";
import DashboardLayout from "../../components/common/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";

export default function Announcement() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Announcements"
        subtitle="Create and manage team announcements"
      />

      <main className="space-y-8">
        <section className="mt-8">
          <CreateAnnouncement />
        </section>

        <section>
          <AnnouncementList />
        </section>
      </main>
    </DashboardLayout>
  );
}
