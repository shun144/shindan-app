import { FormEventHandler, memo, useRef, useState, ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
import Modal from "./Modal";

import { toast } from "@/parts/toast/MyToaster";

type Props = {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  editTitle: string;
  editUrl: string;
  flowId: number;
};

const titleMaxLength = 50;
const urlMaxLength = 15;

const EditModal = ({ isOpenModal, setIsOpenModal, editTitle, editUrl, flowId }: Props) => {
  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <Modal show={isOpenModal} onClose={closeModal}>
        <div>dummy</div>
        {/* <form onSubmit={updateFlow} className="p-6">
          <div className="mt-6">
            <InputLabel htmlFor="editTitle" value={`診断URL名（${urlMaxLength}文字）`} />

            <TextInput id="editTitle" type="text" name="editTitle" value={data.editTitle} onChange={(e) => setData("editTitle", e.target.value)} className="mt-1 block w-11/12 placeholder-slate-300" placeholder="タイトル" required maxLength={titleMaxLength} />
            <InputError message={errors.editTitle} className="mt-2" />
          </div>

          <div className="mt-10">
            <InputLabel htmlFor="editUrl" value={`診断URL名（${urlMaxLength}文字）`} />
            <TextInput id="editUrl" type="text" name="editUrl" value={data.editUrl} onChange={(e) => setData("editUrl", e.target.value)} className="mt-1 block w-11/12 placeholder-slate-300" placeholder="URL" required maxLength={urlMaxLength} />
            <InputError message={errors.editUrl} className="mt-2" />
          </div>

          <div className="mt-12 flex justify-start">
            <button className="bg-indigo-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-indigo-600" disabled={processing}>
              更 新
            </button>
          </div>
        </form> */}
      </Modal>
    </>
  );
};

export default memo(EditModal);
