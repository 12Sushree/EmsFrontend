import { useState } from "react";
import {
  updateEmployeeDesignation,
  updateEmploymentStatus,
} from "../../store/manager/managerAPI";
import Alert from "../common/Alert";
import Select from "../common/Select";
import Input from "../common/Input";
import { useForm } from "react-hook-form";
import Button from "../common/Button";

export default function EmployeeActions({ employee }) {
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, reset } = useForm({
    defaultValues: {
      designation: "",
    },
  });

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "On Leave", label: "On Leave" },
    { value: "Resigned", label: "Resigned" },
    { value: "Terminated", label: "Terminated" },
  ];

  const handleStatusChange = async (status) => {
    try {
      setLoading(true);
      const res = await updateEmploymentStatus(employee.id, {
        employmentStatus: status,
      });

      setAlert({
        type: "success",
        message: res.data.message,
      });
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Update failed!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDesignationChange = async (designation) => {
    try {
      setLoading(true);
      const res = await updateEmployeeDesignation(employee.id, {
        designation,
      });

      setAlert({
        type: "success",
        message: res.data.message,
      });
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Update failed!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mt-4">
      {alert && (
        <div className="card">
          <Alert type={alert.type} message={alert.message} />
        </div>
      )}

      <div className="space-y-3">
        <Select
          options={statusOptions}
          defaultValue={employee.employmentStatus}
          onChange={(e) => handleStatusChange(e.target.value)}
        />

        <Input
          placeholder="Designation"
          {...register("designation")}
          onBlur={(e) => handleDesignationChange(e.target.value)}
        />

        <Button
          disabled={loading}
          className="btn-primary btn-primary-glow w-full"
        >
          {loading ? "Updating..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
