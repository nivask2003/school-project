import { useEffect, useState } from "react";
import axios from "axios";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    axios.get("/api/getSchools").then((res) => setSchools(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Schools</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {schools.map((school) => (
          <div key={school.id} className="border rounded-lg p-4 shadow">
            <img src={`/schoolImages/${school.image}`} alt={school.name} className="h-40 w-full object-cover"/>
            <h2 className="text-xl font-semibold mt-2">{school.name}</h2>
            <p>{school.address}</p>
            <p>{school.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
