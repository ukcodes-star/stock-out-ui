import StockOutForm from "../components/StockOutForm";

function StockOutPage() {
  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="text-center mb-2">Stock Out</h2>

        <p className="text-center text-muted">
          Issue and track materials from inventory
        </p>

        <StockOutForm />
      </div>
    </div>
  );
}

export default StockOutPage;
