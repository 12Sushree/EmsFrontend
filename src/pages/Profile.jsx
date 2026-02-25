import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import DashboardLayout from "../components/common/DashboardLayout";
import PageHeader from "../components/common/PageHeader";
import ProfileCard from "../components/common/ProfileCard";

function Profile() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <PageHeader title="My Profile" />

      <div className="bg-white p-6 rounded shadow">
        <ProfileCard />

        <div className="mt-6 flex flex-col sm-flex-row gap-4">
          <Button
            onClick={() => navigate("/update-profile")}
            className="btn-success btn-success-glow flex-1"
          >
            Update Profile
          </Button>

          <Button
            onClick={() => navigate("/change-password")}
            className="btn-danger btn-danger-glow flex-1"
          >
            Change Password
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;
