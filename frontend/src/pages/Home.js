import { useState } from "react";

function Home() {
  const categories = [
    { title: "Fever", medicines: ["Dolo 650", "Paracetamol", "Calpol"] },
    { title: "BP", medicines: ["Amlodipine", "Telmisartan", "Losartan"] },
    { title: "Motions", medicines: ["ORS", "Loperamide", "Enterogermina"] },
    { title: "Thyroid", medicines: ["Thyronorm", "Eltroxin"] },
    { title: "Orthopedic", medicines: ["Calcium Tablets", "Pain Relief Gel", "Vitamin D3"] },
    { title: "Brain Issues", medicines: ["Citicoline", "Donepezil"] },
    { title: "Migraine", medicines: ["Sumatriptan", "Naproxen"] },
    { title: "Headache", medicines: ["Saridon", "Crocin", "Aspirin"] },
    { title: "ENT", medicines: ["Ear Drops", "Nasal Spray", "Mouth Gel"] },
    { title: "Heart", medicines: ["Ecosprin", "Atorvastatin", "Clopidogrel"] },
    { title: "Lung Care", medicines: ["Asthalin", "Budecort", "Montelukast"] },
    { title: "Skin Care", medicines: ["Cetaphil", "Antifungal Cream", "Moisturizer"] },
    { title: "IV Sets & Fluids", medicines: ["Normal Saline", "RL Fluid", "IV Set"] },
    { title: "Urinary Sets", medicines: ["Urine Bag", "Catheter", "Urobag"] }
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.medicines.some((medicine) =>
      medicine.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="home-container">
      <div className="home-hero">
        <h1>Welcome to Medical Shop</h1>
        <p>Your trusted place for medicines and healthcare products.</p>

        <input
          type="text"
          placeholder="Search medicines..."
          className="search-box"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h2 className="section-title">Medicine Categories</h2>

      <div className="category-grid">
        {filteredCategories.map((category, index) => (
          <div className="category-card" key={index}>
            <h2>{category.title}</h2>

            {category.medicines.map((medicine, i) => (
              <p key={i}>• {medicine}</p>
            ))}

            <button
  onClick={() =>
    window.location.href = `/medicines?category=${category.title}`
  }
>
  View Medicines
</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;