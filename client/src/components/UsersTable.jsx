import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import utils from "../users/utilsFunctions.js";

const UsersTable = () => {
  const [data, setData] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const handleGetAllUsers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_URL_ADMIN}users`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("unable to fetch table's reservation");
        } else {
          const data = await response.json();
          setData(data);
          setIsDeleting(false);
        }
      } catch (error) {
        const errorDatas = {
          url: `${import.meta.env.VITE_URL_ADMIN}users`,
          message: error.message,
          stackTrace: error.stack,
        };
        await utils.sendErrorDatas(errorDatas);
      }
    };
    handleGetAllUsers();
  }, [isDeleting]);

  const handleDeleteRow = async (id) => {
    try {
      const response = await utils.deleteDatas(id);
      if (!response.ok) {
        throw new Error("unable to delete user");
      } else {
        setIsDeleting(true);
      }
    } catch (error) {
      const errorDatas = {
        url: `${import.meta.env.VITE_URL_ADMIN}users/${id}`,
        message: error.message,
        stackTrace: error.stack,
      };
      await utils.sendErrorDatas(errorDatas);
    }
  };
  const handleChangeRole = async (e, rowid) => {
    const role = {
      id: rowid,
      role: e.target.value,
    };

    try {
      const response = await utils.updateUserRole(role);
      if (!response.ok) {
        throw new Error("unable to update role user");
      } else {
        const data = await response.json();
        setIsDeleting(true);
      }
    } catch (error) {
      const errorDatas = {
        url: `${import.meta.env.VITE_URL_ADMIN}users/role/`,
        message: error.message,
        stackTrace: error.stack,
      };
      await utils.sendErrorDatas(errorDatas);
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
            <th>email confirmed</th>
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
              <td>
                <select
                  value={row.role}
                  name=""
                  id=""
                  onChange={(e) => {
                    if (
                      window.confirm(
                        "do you really want to update this role user ?"
                      )
                    )
                      handleChangeRole(e, row.id);
                  }}
                >
                  <option value={row.role}>{row.role}</option>
                  <option value={row.role !== "admin" ? "admin" : "guest"}>
                    {row.role !== "admin" ? "admin" : "guest"}
                  </option>
                </select>
              </td>
              {row.role === "admin" ? (
                <>
                  <td className="blue-background"></td>
                  <td className="blue-background"></td>
                  <td className="blue-background"></td>
                  <td className="blue-background"></td>
                  <td className="blue-background"></td>
                </>
              ) : (
                <>
                  <td>{!row.phone ? "Empty" : row.phone}</td>
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
                    className={
                      !row.confirmed ? "red-background" : "green-background"
                    }
                  >
                    {row.confirmed ? "YES" : "NOT YET"}
                  </td>
                  <td
                    className="dlt-td"
                    onClick={() => {
                      if (
                        window.confirm(
                          "do you really want to remove this user ?"
                        )
                      )
                        handleDeleteRow(row.id);
                    }}
                  >
                    <span>
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
