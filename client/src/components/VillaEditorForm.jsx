import React, { useRef } from "react";
import { Modal, Label, TextInput, Checkbox, Textarea } from "flowbite-react";
import { useSelector } from "react-redux";
import utils from "../users/utilsFunctions.js";
import { useDispatch } from "react-redux";
import { editVillaData, setCardsData } from "../feature/cards.slice.js";
const VillaEditorForm = ({ id, editing, setEditing }) => {
  const editVillaRef = useRef();
  const dispatch = useDispatch();
  const selectedVilla = useSelector((state) =>
    state.threeCards.cards?.filter((card) => card.id === id)
  );
  const handleEdit = async (e) => {
    e.preventDefault();
    setEditing(true);
    let formData = utils.getFormData(editVillaRef, [
      "name",
      "price",
      "infos",
      "url",
    ]);
    formData.id = id;
    try {
      const response = await utils.editVillas(formData);
      if (!response.ok) {
        throw new Error("cannot edit villas datas");
      } else {
        setEditing(false);
        dispatch(editVillaData([formData, id]));
      }
    } catch (error) {
      const errorDatas = {
        url: `${import.meta.env.VITE_URL_ADMIN}datas/villas`,
        message: error.message,
        stackTrace: error.stack,
      };
      await utils.sendErrorDatas(errorDatas);
    }
  };

  return (
    <div className="form-edit-villa">
      <Modal className="" show={editing} onClose={() => setEditing(false)}>
        <Modal.Header className="" />
        <Modal.Body>
          <form
            ref={editVillaRef}
            className="  space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8  "
            onSubmit={handleEdit}
          >
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Update : {selectedVilla[0].name}
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput
                id="name"
                defaultValue={selectedVilla[0].name}
                required={true}
                name="name"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="price" value="Price" />
              </div>
              <TextInput
                id="price"
                defaultValue={selectedVilla[0].price}
                required={true}
                name="price"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="infos" value="Infos" />
              </div>
              <Textarea
                className="   focus:ring-blue-500
              focus:border-blue-500"
                rows="3
                "
                id="infos"
                defaultValue={selectedVilla[0].infos}
                required={true}
                name="infos"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="url" value="Url img" />
              </div>
              <TextInput
                id="url"
                defaultValue={selectedVilla[0].url}
                required={true}
                name="url"
              />
            </div>
            <div className="flex justify-between"></div>
            <div className="w-full">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default VillaEditorForm;
