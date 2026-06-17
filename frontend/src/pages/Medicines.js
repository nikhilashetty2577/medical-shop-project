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

  const initialMedicineData = {
    Fever: [
      {
        name: "Dolo 650",
        mg: "650 mg",
        combination: "Paracetamol IP 650 mg",
        use: "Fever, headache, body pain",
        tabletRate: 2.5,
        sheetRate: 35,
        course: "As advised by doctor"
      },
      {
        name: "Calpol 500",
        mg: "500 mg",
        combination: "Paracetamol 500 mg",
        use: "Fever and pain relief",
        tabletRate: 1.8,
        sheetRate: 25,
        course: "As prescribed"
      }
    ],

    BP: [
      {
        name: "Telmisartan",
        mg: "40 mg",
        combination: "Telmisartan 40 mg",
        use: "High blood pressure",
        tabletRate: 5.5,
        sheetRate: 80,
        course: "Daily as prescribed"
      }
    ],

    Headache: [
      {
        name: "Saridon",
        mg: "Tablet",
        combination: "Paracetamol + Propyphenazone + Caffeine",
        use: "Headache relief",
        tabletRate: 3,
        sheetRate: 40,
        course: "As needed"
      }
    ]
  };

  const [medicineData, setMedicineData] = useState(() => {
    const savedData = localStorage.getItem("medicineData");
    return savedData ? JSON.parse(savedData) : initialMedicineData;
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

  useEffect(() => {
    localStorage.setItem("medicineData", JSON.stringify(medicineData));
  }, [medicineData]);

  const addMedicine = () => {
    if (newMedicine.name === "") {
      alert("Please enter medicine name");
      return;
    }

    setMedicineData({
      ...medicineData,
      [selectedCategory]: [...medicines, newMedicine]
    });

    setNewMedicine({
      name: "",
      mg: "",
      combination: "",
      use: "",
      tabletRate: "",
      sheetRate: "",
      course: ""
    });

    alert("Medicine added successfully");
  };

  const deleteMedicine = (indexToDelete) => {
    const updatedMedicines = medicines.filter(
      (_, index) => index !== indexToDelete
    );

    setMedicineData({
      ...medicineData,
      [selectedCategory]: updatedMedicines
    });
  };

  return (
    <div className="medicines-page">
      <h1>{selectedCategory} Medicines</h1>

      <div className="medicine-details-grid">
        {medicines.map((medicine, index) => (
          <div className="medicine-detail-card" key={index}>
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
              <button
                className="delete-btn"
                onClick={() => deleteMedicine(index)}
              >
                Delete
              </button>
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