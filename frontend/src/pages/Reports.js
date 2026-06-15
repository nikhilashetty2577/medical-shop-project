import { useEffect, useState } from "react";

function Reports() {
  const [reports, setReports] = useState(() => {
    const savedReports = localStorage.getItem("reports");
    return savedReports ? JSON.parse(savedReports) : [];
  });

  const [newReport, setNewReport] = useState({
    type: "Income",
    period: "Weekly",
    title: "",
    amount: "",
    date: ""
  });

  useEffect(() => {
    localStorage.setItem("reports", JSON.stringify(reports));
  }, [reports]);

  const addReport = () => {
    if (
      newReport.title === "" ||
      newReport.amount === "" ||
      newReport.date === ""
    ) {
      alert("Please fill all report details");
      return;
    }

    setReports([
      ...reports,
      {
        id: Date.now(),
        ...newReport
      }
    ]);

    setNewReport({
      type: "Income",
      period: "Weekly",
      title: "",
      amount: "",
      date: ""
    });

    alert("Report added successfully");
  };

  const deleteReport = (id) => {
    setReports(reports.filter((report) => report.id !== id));
  };

  const totalIncome = reports
    .filter((report) => report.type === "Income")
    .reduce((total, report) => total + Number(report.amount), 0);

  const totalExpense = reports
    .filter((report) => report.type === "Expense")
    .reduce((total, report) => total + Number(report.amount), 0);

  const weeklyIncome = reports
    .filter((report) => report.type === "Income" && report.period === "Weekly")
    .reduce((total, report) => total + Number(report.amount), 0);

  const monthlyIncome = reports
    .filter((report) => report.type === "Income" && report.period === "Monthly")
    .reduce((total, report) => total + Number(report.amount), 0);

  const yearlyIncome = reports
    .filter((report) => report.type === "Income" && report.period === "Yearly")
    .reduce((total, report) => total + Number(report.amount), 0);

  return (
    <div className="reports-page">
      <h1>Income & Expense Reports</h1>

      <div className="report-grid">
        <div className="report-card">
          <h2>Total Income</h2>
          <p>₹{totalIncome}</p>
        </div>

        <div className="report-card">
          <h2>Total Expense</h2>
          <p>₹{totalExpense}</p>
        </div>

        <div className="report-card">
          <h2>Profit</h2>
          <p>₹{totalIncome - totalExpense}</p>
        </div>

        <div className="report-card">
          <h2>Weekly Income</h2>
          <p>₹{weeklyIncome}</p>
        </div>

        <div className="report-card">
          <h2>Monthly Income</h2>
          <p>₹{monthlyIncome}</p>
        </div>

        <div className="report-card">
          <h2>Yearly Income</h2>
          <p>₹{yearlyIncome}</p>
        </div>
      </div>

      <div className="report-form">
        <h2>Add Income / Expense</h2>

        <select
          value={newReport.type}
          onChange={(e) =>
            setNewReport({ ...newReport, type: e.target.value })
          }
        >
          <option>Income</option>
          <option>Expense</option>
        </select>

        <select
          value={newReport.period}
          onChange={(e) =>
            setNewReport({ ...newReport, period: e.target.value })
          }
        >
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Yearly</option>
        </select>

        <input
          type="text"
          placeholder="Title ex: Medicine Sales, Rent, Salary"
          value={newReport.title}
          onChange={(e) =>
            setNewReport({ ...newReport, title: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Amount"
          value={newReport.amount}
          onChange={(e) =>
            setNewReport({ ...newReport, amount: e.target.value })
          }
        />

        <input
          type="date"
          value={newReport.date}
          onChange={(e) =>
            setNewReport({ ...newReport, date: e.target.value })
          }
        />

        <button onClick={addReport}>
          Add Report
        </button>
      </div>

      <div className="report-table-box">
        <h2>Report Details</h2>

        {reports.length === 0 ? (
          <p>No report details added yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Period</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.type}</td>
                  <td>{report.period}</td>
                  <td>{report.title}</td>
                  <td>₹{report.amount}</td>
                  <td>{report.date}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteReport(report.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Reports;