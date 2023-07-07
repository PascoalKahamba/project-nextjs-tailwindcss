import React from "react";
import useGlobalContext from "../hooks/useGlobalContext";
import Button from "./button";

interface ModalProps {
  typeModal: string;
}

const Modal = ({ typeModal }: ModalProps) => {
  const {
    global: { modal, setModal },
  } = useGlobalContext();
  return (
    <section className="fixed w-full h-full flex justify-center items-center z-[1000]">
      <div className=" p-3 rounded-lg bg-slate-200 text-black flex flex-col gap-3 mb-40">
        <p className="text-[16px]">
          Você tem certeza que deseja terminar a sessão?
        </p>
        <div className=" flex gap-3 self-end">
          <Button name="sair" />
          <Button name="cancelar" />
        </div>
      </div>
    </section>
  );
};

export default Modal;
