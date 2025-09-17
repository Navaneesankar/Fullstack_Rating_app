import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function RateStore() {
  const { id } = useParams();
  const [rating, setRating] = useState(5);

  const submit = async () => {
    await API.post(`/stores/${id}/rate`, { rating: Number(rating) });
    alert("Thanks for rating!");
  };

  return (
    <div>
      <h2>Rate Store</h2>
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <button onClick={submit}>Submit</button>
    </div>
  );
}
