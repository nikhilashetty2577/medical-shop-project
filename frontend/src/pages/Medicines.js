import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Medicines() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedCategory = params.get("category") || "Fever";

  const userEmail = localStorage.getItem("userEmail");

  const isAdmin =
    userEmail === "nikhilashetty2577@gmail.com" ||
    userEmail === "vuppala.pavan5@gmail.com";

  const [medicineData, setMedicineData] = useState({});

  const [editingIndex, setEditingIndex] = useState(null);
  const [editingMedicine, setEditingMedicine] = useState({
    name: "",
    mg: "",
    combination: "",
    use: "",
    tabletRate: "",
    sheetRate: "",
    course: ""
  });

  const [newMedicine, setNewMedicine] = useState({
    name: "",
    mg: "",
    combination: "",
    use: "",
    tabletRate: "",
    sheetRate: "",
    course: ""
  });

  const medicines = medicineData[selectedCategory] || [];

  const fetchMedicines = async () => {
    try {
      const response = await fetch("http://127.0.0.1:10000/medicines");
      if (response.ok) {
        const data = await response.json();
        const grouped = {};
        data.forEach(med => {
          const cat = med.category || "Fever";
          if (!grouped[cat]) {
            grouped[cat] = [];
          }
          grouped[cat].push(med);
        });
        setMedicineData(grouped);
      }
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const addMedicine = async () => {
    if (newMedicine.name === "") {
      alert("Please enter medicine name");
      return;
    }

    const payload = {
      ...newMedicine,
      category: selectedCategory,
      tabletRate: Number(newMedicine.tabletRate) || 0,
      sheetRate: Number(newMedicine.sheetRate) || 0
    };

    try {
      const response = await fetch("http://127.0.0.1:10000/medicines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        alert("Medicine added successfully");
        fetchMedicines();
        setNewMedicine({
          name: "",
          mg: "",
          combination: "",
          use: "",
          tabletRate: "",
          sheetRate: "",
          course: ""
        });
      } else {
        alert("Failed to add medicine");
      }
    } catch (error) {
      console.error("Error adding medicine:", error);
      alert("Error adding medicine");
    }
  };

  const saveMedicine = async (indexToUpdate) => {
    if (editingMedicine.name === "") {
      alert("Please enter medicine name");
      return;
    }

    const medicineToUpdate = medicines[indexToUpdate];
    if (!medicineToUpdate || !medicineToUpdate.id) {
      alert("Medicine ID not found");
      return;
    }

    const payload = {
      ...editingMedicine,
      category: selectedCategory,
      tabletRate: Number(editingMedicine.tabletRate) || 0,
      sheetRate: Number(editingMedicine.sheetRate) || 0
    };

    try {
      const response = await fetch(`http://127.0.0.1:10000/medicines/${medicineToUpdate.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        alert("Medicine updated successfully");
        setEditingIndex(null);
        fetchMedicines();
      } else {
        alert("Failed to update medicine");
      }
    } catch (error) {
      console.error("Error updating medicine:", error);
      alert("Error updating medicine");
    }
  };

  const deleteMedicine = async (indexToDelete) => {
    const medicineToDelete = medicines[indexToDelete];
    if (!medicineToDelete || !medicineToDelete.id) {
      alert("Medicine ID not found");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:10000/medicines/${medicineToDelete.id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        alert("Medicine deleted successfully");
        setEditingIndex(null);
        fetchMedicines();
      } else {
        alert("Failed to delete medicine");
      }
    } catch (error) {
      console.error("Error deleting medicine:", error);
      alert("Error deleting medicine");
    }
  };

  return (
    <div className="medicines-page">
      <h1>{selectedCategory} Medicines</h1>

      <div className="medicine-details-grid">
        {medicines.map((medicine, index) => (
          <div className="medicine-detail-card" key={index}>
            {editingIndex === index ? (
              <div className="edit-medicine-form">
                <h2>Edit Medicine</h2>

                <div className="form-group">
                  <label>Medicine Name</label>
                  <input
                    type="text"
                    value={editingMedicine.name}
                    onChange={(e) =>
                      setEditingMedicine({ ...editingMedicine, name: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Power / MG</label>
                  <input
                    type="text"
                    value={editingMedicine.mg}
                    onChange={(e) =>
                      setEditingMedicine({ ...editingMedicine, mg: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Combination</label>
                  <input
                    type="text"
                    value={editingMedicine.combination}
                    onChange={(e) =>
                      setEditingMedicine({ ...editingMedicine, combination: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Used For</label>
                  <input
                    type="text"
                    value={editingMedicine.use}
                    onChange={(e) =>
                      setEditingMedicine({ ...editingMedicine, use: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Tablet Rate (₹)</label>
                  <input
                    type="number"
                    value={editingMedicine.tabletRate}
                    onChange={(e) =>
                      setEditingMedicine({ ...editingMedicine, tabletRate: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Sheet Rate (₹)</label>
                  <input
                    type="number"
                    value={editingMedicine.sheetRate}
                    onChange={(e) =>
                      setEditingMedicine({ ...editingMedicine, sheetRate: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Course</label>
                  <input
                    type="text"
                    value={editingMedicine.course}
                    onChange={(e) =>
                      setEditingMedicine({ ...editingMedicine, course: e.target.value })
                    }
                  />
                </div>

                <div className="edit-actions">
                  <button className="save-btn" onClick={() => saveMedicine(index)}>
                    Save
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setEditingIndex(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2>{medicine.name}</h2>

                <p><b>Power:</b> {medicine.mg}</p>
                <p><b>Combination:</b> {medicine.combination}</p>
                <p><b>Used For:</b> {medicine.use}</p>
                <p><b>Tablet Rate:</b> ₹{medicine.tabletRate}</p>
                <p><b>Sheet Rate:</b> ₹{medicine.sheetRate}</p>
                <p><b>Course:</b> {medicine.course}</p>

                <button
                  onClick={() => {
                    const cart = JSON.parse(localStorage.getItem("cart")) || [];

                    cart.push({
                      name: medicine.name,
                      tabletRate: Number(medicine.tabletRate),
                      sheetRate: Number(medicine.sheetRate),
                      quantity: 1,
                      unit: "Tablets"
                    });

                    localStorage.setItem("cart", JSON.stringify(cart));
                    alert("Medicine added to cart");
                  }}
                >
                  Add to Cart
                </button>

                {isAdmin && (
                  <>
                    <button
                      className="update-btn"
                      onClick={() => {
                        setEditingIndex(index);
                        setEditingMedicine({ ...medicine });
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteMedicine(index)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {isAdmin && (
        <div className="add-medicine-section">
          <h2>Add Medicine to {selectedCategory}</h2>

          <input
            type="text"
            placeholder="Medicine Name"
            value={newMedicine.name}
            onChange={(e) =>
              setNewMedicine({ ...newMedicine, name: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Power / MG"
            value={newMedicine.mg}
            onChange={(e) =>
              setNewMedicine({ ...newMedicine, mg: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Combination"
            value={newMedicine.combination}
            onChange={(e) =>
              setNewMedicine({ ...newMedicine, combination: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Used For"
            value={newMedicine.use}
            onChange={(e) =>
              setNewMedicine({ ...newMedicine, use: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Tablet Rate"
            value={newMedicine.tabletRate}
            onChange={(e) =>
              setNewMedicine({ ...newMedicine, tabletRate: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Sheet Rate"
            value={newMedicine.sheetRate}
            onChange={(e) =>
              setNewMedicine({ ...newMedicine, sheetRate: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Course"
            value={newMedicine.course}
            onChange={(e) =>
              setNewMedicine({ ...newMedicine, course: e.target.value })
            }
          />

          <button onClick={addMedicine}>
            Add Medicine
          </button>
        </div>
      )}
    </div>
  );
}

export default Medicines;