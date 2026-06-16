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
        rate: "₹35",
        course: "As advised by doctor"
      },
      {
        name: "Calpol 500",
        mg: "500 mg",
        combination: "Paracetamol 500 mg",
        use: "Fever and pain relief",
        rate: "₹25",
        course: "As prescribed"
      }
    ],

    BP: [
      {
        name: "Telmisartan",
        mg: "40 mg",
        combination: "Telmisartan 40 mg",
        use: "High blood pressure",
        rate: "₹80",
        course: "Daily as prescribed"
      }
    ],

    Motions: [
      {
        name: "ORS",
        mg: "Sachet",
        combination: "Oral Rehydration Salts",
        use: "Loose motions and dehydration",
        rate: "₹25",
        course: "Mix in water and drink"
      }
    ],

    Thyroid: [
      {
        name: "Thyronorm",
        mg: "50 mcg",
        combination: "Levothyroxine Sodium",
        use: "Thyroid hormone replacement",
        rate: "₹150",
        course: "Daily before food as prescribed"
      }
    ],

    Orthopedic: [
      {
        name: "Calcium Tablet",
        mg: "500 mg",
        combination: "Calcium + Vitamin D3",
        use: "Bone strength",
        rate: "₹120",
        course: "As prescribed"
      }
    ],

    "Brain Issues": [
      {
        name: "Citicoline",
        mg: "500 mg",
        combination: "Citicoline Sodium",
        use: "Brain nerve support",
        rate: "₹180",
        course: "As prescribed"
      }
    ],

    Migraine: [
      {
        name: "Sumatriptan",
        mg: "50 mg",
        combination: "Sumatriptan Succinate",
        use: "Migraine headache",
        rate: "₹100",
        course: "As advised by doctor"
      }
    ],

    Headache: [
      {
        name: "Saridon",
        mg: "Tablet",
        combination: "Paracetamol + Propyphenazone + Caffeine",
        use: "Headache relief",
        rate: "₹40",
        course: "As needed"
      }
    ],

    ENT: [
      {
        name: "Ear Drops",
        mg: "Drops",
        combination: "Antibiotic / Wax softener drops",
        use: "Ear pain or ear wax",
        rate: "₹70",
        course: "As advised"
      }
    ],

    Heart: [
      {
        name: "Ecosprin",
        mg: "75 mg",
        combination: "Aspirin 75 mg",
        use: "Blood thinner for heart patients",
        rate: "₹50",
        course: "Only as prescribed"
      }
    ],

    "Lung Care": [
      {
        name: "Asthalin",
        mg: "Inhaler",
        combination: "Salbutamol",
        use: "Asthma and breathing difficulty",
        rate: "₹160",
        course: "As prescribed"
      }
    ],

    "Skin Care": [
      {
        name: "Antifungal Cream",
        mg: "Cream",
        combination: "Clotrimazole",
        use: "Fungal skin infection",
        rate: "₹85",
        course: "Apply externally"
      }
    ],

    "IV Sets & Fluids": [
      {
        name: "Normal Saline",
        mg: "500 ml",
        combination: "Sodium Chloride 0.9%",
        use: "IV fluid",
        rate: "₹60",
        course: "Hospital/medical use only"
      }
    ],

    "Urinary Sets": [
      {
        name: "Urine Bag",
        mg: "2000 ml",
        combination: "Sterile urine collection bag",
        use: "Urine collection",
        rate: "₹120",
        course: "Medical use"
      }
    ]
  };

  const [medicineData, setMedicineData] = useState(() => {
    const savedData = localStorage.getItem("medicineData");

    if (savedData) {
      return JSON.parse(savedData);
    }

    return initialMedicineData;
  });

  const [newMedicine, setNewMedicine] = useState({
    name: "",
    mg: "",
    combination: "",
    use: "",
    rate: "",
    course: ""
  });

  const medicines = medicineData[selectedCategory] || [];

  useEffect(() => {
    localStorage.setItem(
      "medicineData",
      JSON.stringify(medicineData)
    );
  }, [medicineData]);

  const addMedicine = () => {
    if (newMedicine.name === "") {
      alert("Please enter medicine name");
      return;
    }

    setMedicineData({
      ...medicineData,
      [selectedCategory]: [
        ...medicines,
        newMedicine
      ]
    });

    setNewMedicine({
      name: "",
      mg: "",
      combination: "",
      use: "",
      rate: "",
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
            <p><b>Rate:</b> {medicine.rate}</p>
            <p><b>Course:</b> {medicine.course}</p>

            <button
  onClick={() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
      name: medicine.name,
      rate: medicine.rate
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
            type="text"
            placeholder="Rate"
            value={newMedicine.rate}
            onChange={(e) =>
              setNewMedicine({ ...newMedicine, rate: e.target.value })
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