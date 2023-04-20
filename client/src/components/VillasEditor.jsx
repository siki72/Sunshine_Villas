import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tr } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { faPen, faPhone } from "@fortawesome/free-solid-svg-icons";
import VillaEditorForm from "./VillaEditorForm.jsx";

const VillasEditor = () => {
  const data = useSelector((state) => state.threeCards.cards);
  const [editing, setEditing] = useState(false);
  const [villaIdToEdit, setVillaIdToEdit] = useState(null);

  const handleEdit = (id) => {
    setEditing(true);
    setVillaIdToEdit(id);
  };

  return (
    <div className="data">
      {editing && (
        <VillaEditorForm
          id={villaIdToEdit}
          editing={editing}
          setEditing={setEditing}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>max-guests</th>
            <th>area</th>
            <th>price</th>
            <th>infos</th>
            <th>url</th>
            <th>link</th>
            <th>edit</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((villa) => (
            <tr key={villa.id}>
              <td>{villa.id}</td>
              <td>{villa.name}</td>
              <td> {villa.max_guests} </td>
              <td>{villa.area}</td>
              <td>{villa.price}</td>
              <td>{villa.infos?.slice(0, 40) + " ..."}</td>
              <td>{villa.url}</td>
              <td> {villa.link} </td>
              <td className="dlt-td" onClick={() => handleEdit(villa.id)}>
                <span>
                  <FontAwesomeIcon icon={faPen} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VillasEditor;
