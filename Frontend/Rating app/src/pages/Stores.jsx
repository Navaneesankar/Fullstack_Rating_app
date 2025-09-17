import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function Stores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    API.get("/stores").then(res => setStores(res.data));
  }, []);

  return (
    <div>
      <h2>Stores</h2>
      {stores.map((s) => (
        <div key={s.id}>
          <strong>{s.name}</strong> - {s.address}{" "}
          <Link to={`/rate/${s.id}`}>Rate</Link>
        </div>
      ))}
    </div>
  );
}
