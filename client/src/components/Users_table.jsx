import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import utils from "../users/utilsFunctions.js";

const Users_table = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleGetAllUsers = async () => {
      try {
        const response = await utils.fetchAdminDatas("users");
        if (!response.ok) {
          throw new Error("unable to fetch table's reservation");
        } else {
          const data = await response.json();
          console.log(data);
          setData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    handleGetAllUsers();
  }, []);
  const handleDeleteRow = async (id) => {
    try {
      const response = await utils.deleteDatas(id);
      if (!response.ok) {
        throw new Error("unable to delete user");
      } else {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="data">
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>first name</th>
            <th>last name</th>
            <th>email </th>
            <th>role</th>
            <th>phone</th>
            <th>location</th>
            <th>number of bookings</th>
            <th>profits</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.firstname}</td>
              <td>{row.lastname}</td>
              <td>{row.email}</td>
              <td>{row.role}</td>
              <td>{row.phone}</td>
              <td>{!row.location ? "Empty" : row.location}</td>
              <td
                className={
                  !row.reservations_count
                    ? "red-background"
                    : "green-background"
                }
              >
                {!row.reservations_count ? "0" : row.reservations_count}
              </td>
              <td>{!row.profits ? "0" : row.profits}</td>

              <td
                className="dlt-td"
                onClick={() => {
                  if (
                    window.confirm("do you really want to remove this user ?")
                  )
                    handleDeleteRow(row.id);
                }}
              >
                <span>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users_table;
