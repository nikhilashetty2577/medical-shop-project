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
    name: "Paracetamol",
    mg: "500 mg",
    combination: "Paracetamol 500 mg",
    use: "Fever and pain",
    tabletRate: 2,
    sheetRate: 25,
    course: "As prescribed"
  },
  {
    name: "Calpol 500",
    mg: "500 mg",
    combination: "Paracetamol 500 mg",
    use: "Fever relief",
    tabletRate: 1.8,
    sheetRate: 25,
    course: "As prescribed"
  }
],

BP: [
  {
    name: "Amlodipine",
    mg: "5 mg",
    combination: "Amlodipine",
    use: "Blood pressure",
    tabletRate: 3,
    sheetRate: 35,
    course: "Daily"
  },
  {
    name: "Telmisartan",
    mg: "40 mg",
    combination: "Telmisartan",
    use: "Blood pressure",
    tabletRate: 5.5,
    sheetRate: 80,
    course: "Daily"
  },
  {
    name: "Losartan",
    mg: "50 mg",
    combination: "Losartan Potassium",
    use: "Hypertension",
    tabletRate: 4,
    sheetRate: 55,
    course: "Daily"
  }
],

Motions: [
  {
    name: "ORS",
    mg: "Sachet",
    combination: "Oral Rehydration Salts",
    use: "Dehydration",
    tabletRate: 0,
    sheetRate: 25,
    course: "Mix in water"
  },
  {
    name: "Loperamide",
    mg: "2 mg",
    combination: "Loperamide HCL",
    use: "Loose motions",
    tabletRate: 3,
    sheetRate: 30,
    course: "As prescribed"
  },
  {
    name: "Enterogermina",
    mg: "5 ml",
    combination: "Bacillus Clausii",
    use: "Gut health",
    tabletRate: 0,
    sheetRate: 45,
    course: "As prescribed"
  }
],

Thyroid: [
  {
    name: "Thyronorm",
    mg: "50 mcg",
    combination: "Levothyroxine",
    use: "Hypothyroidism",
    tabletRate: 6,
    sheetRate: 60,
    course: "Before breakfast"
  },
  {
    name: "Eltroxin",
    mg: "50 mcg",
    combination: "Levothyroxine",
    use: "Thyroid disorder",
    tabletRate: 5,
    sheetRate: 55,
    course: "Daily"
  }
],

Orthopedic: [
  {
    name: "Calcium Tablets",
    mg: "500 mg",
    combination: "Calcium + D3",
    use: "Bone strength",
    tabletRate: 4,
    sheetRate: 45,
    course: "Daily"
  },
  {
    name: "Pain Relief Gel",
    mg: "Tube",
    combination: "Diclofenac Gel",
    use: "Joint pain",
    tabletRate: 0,
    sheetRate: 120,
    course: "External use"
  },
  {
    name: "Vitamin D3",
    mg: "60000 IU",
    combination: "Cholecalciferol",
    use: "Vitamin D deficiency",
    tabletRate: 25,
    sheetRate: 250,
    course: "Weekly"
  }
],

"Brain Issues": [
  {
    name: "Citicoline",
    mg: "500 mg",
    combination: "Citicoline Sodium",
    use: "Brain support",
    tabletRate: 18,
    sheetRate: 180,
    course: "As prescribed"
  },
  {
    name: "Donepezil",
    mg: "5 mg",
    combination: "Donepezil",
    use: "Memory disorders",
    tabletRate: 12,
    sheetRate: 120,
    course: "As prescribed"
  }
],

Migraine: [
  {
    name: "Sumatriptan",
    mg: "50 mg",
    combination: "Sumatriptan",
    use: "Migraine",
    tabletRate: 10,
    sheetRate: 100,
    course: "As advised"
  },
  {
    name: "Naproxen",
    mg: "500 mg",
    combination: "Naproxen",
    use: "Migraine pain",
    tabletRate: 8,
    sheetRate: 80,
    course: "As advised"
  }
],

Headache: [
  {
    name: "Saridon",
    mg: "Tablet",
    combination: "Pain Relief",
    use: "Headache",
    tabletRate: 4,
    sheetRate: 40,
    course: "As needed"
  },
  {
    name: "Crocin",
    mg: "500 mg",
    combination: "Paracetamol",
    use: "Headache",
    tabletRate: 3,
    sheetRate: 30,
    course: "As needed"
  },
  {
    name: "Aspirin",
    mg: "75 mg",
    combination: "Aspirin",
    use: "Pain relief",
    tabletRate: 2,
    sheetRate: 20,
    course: "As prescribed"
  }
],

ENT: [
  {
    name: "Ear Drops",
    mg: "Drops",
    combination: "Antibiotic Drops",
    use: "Ear pain",
    tabletRate: 0,
    sheetRate: 70,
    course: "As advised"
  },
  {
    name: "Nasal Spray",
    mg: "Spray",
    combination: "Saline Spray",
    use: "Nasal blockage",
    tabletRate: 0,
    sheetRate: 90,
    course: "As advised"
  },
  {
    name: "Mouth Gel",
    mg: "Gel",
    combination: "Oral Gel",
    use: "Mouth ulcers",
    tabletRate: 0,
    sheetRate: 60,
    course: "External use"
  }
],

Heart: [
  {
    name: "Ecosprin",
    mg: "75 mg",
    combination: "Aspirin",
    use: "Heart protection",
    tabletRate: 5,
    sheetRate: 50,
    course: "Daily"
  },
  {
    name: "Atorvastatin",
    mg: "10 mg",
    combination: "Atorvastatin",
    use: "Cholesterol",
    tabletRate: 6,
    sheetRate: 65,
    course: "Daily"
  },
  {
    name: "Clopidogrel",
    mg: "75 mg",
    combination: "Clopidogrel",
    use: "Blood thinner",
    tabletRate: 8,
    sheetRate: 85,
    course: "Daily"
  }
],

"Lung Care": [
  {
    name: "Asthalin",
    mg: "Inhaler",
    combination: "Salbutamol",
    use: "Asthma",
    tabletRate: 0,
    sheetRate: 160,
    course: "As prescribed"
  },
  {
    name: "Budecort",
    mg: "Inhaler",
    combination: "Budesonide",
    use: "Asthma",
    tabletRate: 0,
    sheetRate: 220,
    course: "As prescribed"
  },
  {
    name: "Montelukast",
    mg: "10 mg",
    combination: "Montelukast",
    use: "Allergy",
    tabletRate: 7,
    sheetRate: 75,
    course: "Daily"
  }
],

"Skin Care": [
  {
    name: "Cetaphil",
    mg: "100 ml",
    combination: "Moisturizer",
    use: "Skin care",
    tabletRate: 0,
    sheetRate: 250,
    course: "External use"
  },
  {
    name: "Antifungal Cream",
    mg: "Cream",
    combination: "Clotrimazole",
    use: "Fungal infection",
    tabletRate: 0,
    sheetRate: 85,
    course: "External use"
  },
  {
    name: "Moisturizer",
    mg: "100 ml",
    combination: "Skin Lotion",
    use: "Dry skin",
    tabletRate: 0,
    sheetRate: 180,
    course: "External use"
  }
],

"IV Sets & Fluids": [
  {
    name: "Normal Saline",
    mg: "500 ml",
    combination: "NaCl 0.9%",
    use: "IV Fluid",
    tabletRate: 0,
    sheetRate: 60,
    course: "Medical use"
  },
  {
    name: "RL Fluid",
    mg: "500 ml",
    combination: "Ringer Lactate",
    use: "IV Fluid",
    tabletRate: 0,
    sheetRate: 75,
    course: "Medical use"
  },
  {
    name: "IV Set",
    mg: "Set",
    combination: "Infusion Set",
    use: "IV Administration",
    tabletRate: 0,
    sheetRate: 35,
    course: "Medical use"
  }
],

"Urinary Sets": [
  {
    name: "Urine Bag",
    mg: "2000 ml",
    combination: "Urine Collection Bag",
    use: "Urine collection",
    tabletRate: 0,
    sheetRate: 120,
    course: "Medical use"
  },
  {
    name: "Catheter",
    mg: "Size 16",
    combination: "Foley Catheter",
    use: "Urinary care",
    tabletRate: 0,
    sheetRate: 150,
    course: "Medical use"
  },
  {
    name: "Urobag",
    mg: "2000 ml",
    combination: "Drainage Bag",
    use: "Urinary collection",
    tabletRate: 0,
    sheetRate: 140,
    course: "Medical use"
  }
]
  };

  const [medicineData, setMedicineData] = useState(initialMedicineData);

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