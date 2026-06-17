import { useState, useEffect } from "react";
import StockOutTable from "./StockOutTable";

import {
  saveStockOut,
  getAllStockOut,
  deleteStockOut,
} from "../services/api";

function StockOutForm() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    issueDate: new Date().toISOString().split("T")[0],
    materialName: "",
    quantity: "",
    department: "",
    issuedTo: "",
    purpose: "",
    remarks: "",
  });

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await getAllStockOut();

        setTimeout(() => {
          setRecords(response.data);
        }, 0);
      } catch (error) {
        console.error("Error loading records:", error);
      }
    };

    fetchRecords();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const deleteRecord = async (id) => {
  try {

    await deleteStockOut(id);

    setRecords(
      records.filter(
        (record) => record.id !== id
      )
    );

    alert("Record Deleted");

  } catch (error) {
    console.error(error);
    alert("Delete Failed");
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.materialName ||
      !formData.quantity ||
      !formData.department ||
      !formData.issuedTo ||
      !formData.purpose
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await saveStockOut(formData);

      const response = await getAllStockOut();

      setRecords(response.data);

      alert("Data Saved Successfully");

      setFormData({
        issueDate: new Date().toISOString().split("T")[0],
        materialName: "",
        quantity: "",
        department: "",
        issuedTo: "",
        purpose: "",
        remarks: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error Saving Data");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Issue No</label>
            <input
              type="text"
              className="form-control"
              value="Auto Generated"
              disabled
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>
              Issue Date <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              name="issueDate"
              className="form-control"
              value={formData.issueDate}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>
              Material Name <span className="text-danger">*</span>
            </label>

            <select
              className="form-select"
              name="materialName"
              value={formData.materialName}
              onChange={handleChange}
            >
              <option value="">Select Material</option>
              <option value="A4 Paper">A4 Paper</option>
              <option value="Pen">Pen</option>
              <option value="Printer Cartridge">Printer Cartridge</option>
              <option value="Stapler">Stapler</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label>Available Stock</label>
            <input
              type="text"
              className="form-control"
              value="Available after Stock In Module"
              disabled
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>
              Quantity <span className="text-danger">*</span>
            </label>

            <input
              type="number"
              name="quantity"
              className="form-control"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>
              Department <span className="text-danger">*</span>
            </label>

            <select
              className="form-select"
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label>
              Issued To <span className="text-danger">*</span>
            </label>

            <input
              type="text"
              name="issuedTo"
              className="form-control"
              value={formData.issuedTo}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>
              Purpose <span className="text-danger">*</span>
            </label>

            <select
              className="form-select"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
            >
              <option value="">Select Purpose</option>
              <option value="Office Use">Office Use</option>
              <option value="Project Work">Project Work</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Training">Training</option>
            </select>
          </div>

          <div className="col-md-12 mb-3">
            <label>Remarks (Optional)</label>

            <input
              type="text"
              name="remarks"
              className="form-control"
              value={formData.remarks}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Save Stock Out
        </button>

        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() =>
            setFormData({
              issueDate: new Date().toISOString().split("T")[0],
              materialName: "",
              quantity: "",
              department: "",
              issuedTo: "",
              purpose: "",
              remarks: "",
            })
          }
        >
          Clear
        </button>
      </form>

      <hr />

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Material..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <h6>Total Records: {records.length}</h6>

      <h6 className="mb-3">
        Total Quantity Issued:{" "}
        {records.reduce((sum, item) => sum + Number(item.quantity || 0), 0)}
      </h6>

      <StockOutTable
        records={records.filter((item) =>
          item.materialName?.toLowerCase().includes(search.toLowerCase()),
        )}
        deleteRecord={deleteRecord}
      />
    </>
  );
}

export default StockOutForm;
