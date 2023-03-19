import React, { useEffect, useState } from "react";
import { format } from "date-fns";
const Villas_datas = ({ id }) => {
  console.log(id);
  const [data, setData] = useState([]);
  useEffect(() => {
    const body = {
      id,
    };
    const getDatas = async () => {
      const response = await fetch("https://alimissoum.app.3wa.io/admin/data", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json ; charset=UTF-8",
        },
      });
      return response.json().then((data) => {
        console.log(data);
        setData(data);
      });
    };
    getDatas();
  }, [id]);
  return (
    <div className="data">
      <table>
        <thead>
          {data.map((row) => (
            <tr key={row.id}>
              <th>{row.id}</th>
              <th>{row.firstname}</th>
              <th>{row.lastname}</th>
              <th>{row.email}</th>
              <th>{format(new Date(row.start_date), "dd/MM/yyyy")}</th>
              <th>{format(new Date(row.end_date), "dd/MM/yyyy")}</th>
              <th>{row.nights}</th>
              <th>{row.total_price} euros</th>
            </tr>
          ))}
        </thead>
      </table>
    </div>
  );
};

export default Villas_datas;
