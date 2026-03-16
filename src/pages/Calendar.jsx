import { useSelector } from "react-redux";
import DashboardLayout from "../components/common/DashboardLayout";
import PageHeader from "../components/common/PageHeader";
import TeamLeaveCalendar from "../components/manager/TeamLeaveCalendar";
import LeaveCalendar from "../components/employee/LeaveCalendar";

function Calendar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <DashboardLayout>
      <PageHeader title="Leave Calendar" />

      <main className="mt-8">
        {user?.role === "Manager" ? <TeamLeaveCalendar /> : <LeaveCalendar />}
      </main>
    </DashboardLayout>
  );
}

export default Calendar;
