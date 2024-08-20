import React, { useState } from "react";
import "./ekle.css";

const Satıs = () => {
  const [barkod, setBarkod] = useState("");
  const [result, setResult] = useState(null); // Initialize as null

  const handleBarkod = (e) => {
    setBarkod(e.target.value);
  };

  const fetchBarkod = async (e) => {
    e.preventDefault();
    const data = {
      barkod: barkod
    };
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3001/satis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "giris": "Bearer " + token,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const resultt = await response.json();
        console.log("Başarılı:", resultt);
        setResult(resultt.message);  // Assuming resultt.message contains the product object
        setBarkod(""); // Clear the input field
      } else {
        console.error("Hata:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="_div">
      <form onSubmit={fetchBarkod}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Barkod
          </label>
          <input
            onChange={handleBarkod}
            value={barkod}
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <button type="submit" className="btn btn-primary">
            Satış
          </button>
        </div>
      </form>
      {result && (
        <div>
          <h1>Ürün Detayları</h1>
          <p><strong>İsim:</strong> {result.isim}</p>
          <p><strong>Barkod:</strong> {result.barkod}</p>
          <p><strong>Fiyat:</strong> {result.fiyat}</p>
          <p><strong>Adet:</strong> {result.adet}</p>
        </div>
      )}
    </div>
  );
};

export default Satıs;
