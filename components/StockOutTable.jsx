function StockOutTable({ records, deleteRecord }) {
  return (
    <div>
      <h4 className="mt-4 mb-3">Stock Out Records</h4>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Material</th>
              <th>Qty</th>
              <th>Department</th>
              <th>Issued To</th>
              <th>Purpose</th>
              <th>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center">
                  No Records Found
                </td>
              </tr>
            ) : (
              records.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>

                  <td>{item.issueDate}</td>

                  <td>{item.materialName}</td>

                  <td>{item.quantity}</td>

                  <td>{item.department}</td>

                  <td>{item.issuedTo}</td>

                  <td>{item.purpose}</td>

                  <td>{item.remarks}</td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteRecord(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StockOutTable;
