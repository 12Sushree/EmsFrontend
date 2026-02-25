import { useState, useEffect } from "react";
import { addEmployee, searchEmployees } from "../../store/manager/managerAPI";
import Alert from "../common/Alert";
import Input from "../common/Input";
import Button from "../common/Button";

function AddEmployeeForm() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [alert, setAlert] = useState(null);
  const [searching, setSearching] = useState(false);
  const [addingId, setAddingId] = useState(null);

  const search = async () => {
    try {
      if (!query.trim()) return;
      setSearching(true);
      const res = await searchEmployees(query);
      setResults(res.data.users);
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Search failed",
      });
    } finally {
      setSearching(false);
    }
  };

  const handleAdd = async (empId) => {
    try {
      setAddingId(empId);
      await addEmployee(empId);
      setAlert({ type: "success", message: "Employee added to your team!" });
      setResults([]);
      setQuery("");
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to add employee",
      });
    } finally {
      setAddingId(null);
    }
  };

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <div className="card mb-6 max-w-lg">
      {alert && (
        <div className="mb-4">
          <Alert type={alert.type} message={alert.message} />
        </div>
      )}

      <div className="space-y-3 mt-3">
        <input
          placeholder="Enter Employee Name or ID"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input"
        />

        <Button
          onClick={search}
          className="btn-success btn-success-glow w-full"
          disabled={searching}
        >
          {searching ? "Searching..." : "Search"}
        </Button>

        {results.length === 0 && !searching && query && (
          <p className="text-sm text-slate-500 text-center">No users found</p>
        )}

        {results.length > 0 && (
          <div className="border rounded p-2 space-y-2">
            {results.map((emp) => (
              <div
                key={emp._id}
                className="flex justify-between items-center p-2 bg-slate-50 rounded"
              >
                <div>
                  <p className="font-medium">{emp.userName}</p>
                  <p className="text-xs text-gray-500">{emp.empId}</p>
                </div>

                <Button
                  disabled={addingId === emp.empId}
                  onClick={() => handleAdd(emp.empId)}
                  className="btn-primary btn-primary-glow w-1/2"
                >
                  {addingId === emp.empId ? "Adding..." : "Add"}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddEmployeeForm;
