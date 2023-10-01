"use client";

import { IoMdClose } from "react-icons/io";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactElement;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean;
  bgWhite?: boolean;
  big?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  footer,
  disabled,
  bgWhite,
  big,
}) => {
  return isOpen ? (
    <div
      className={` z-50  ${
        disabled ? "pointer-events-none opacity-70 z-50" : ""
      } fixed top-0 left-0 right-0 bottom-0 overflow-y-scroll bg-elife-700 bg-opacity-50 flex items-start justify-center`}
    >
      {/* MODAL */}
      <div
        className={`flex flex-col items-center justify-center md:mt-[10vh] mt-10  ${
          bgWhite ? "bg-elife-400" : "bg-black"
        } h-auto  my-2 md:my-6 py-2 md:py-5 z-50 shadow-xl rounded-md px-2 md:px-4  duration-300 ${
          big ? "2xl:w-1/2 lg:w-3/4 w-full" : "w-full md:w-1/2 xl:w-1/4 "
        }
      `}
      >
        {/* TITLE */}

        <div className="w-full">
          {" "}
          <IoMdClose
            size={24}
            className={`ml-auto cursor-pointer   ${
              bgWhite ? "fill-black" : ""
            }`}
            onClick={() => onClose()}
          ></IoMdClose>
          <div className="flex items-center justify-center w-full border-b border-1 border-eflie-500 pb-2">
            {title}
          </div>{" "}
        </div>

        {body}
        {footer}
      </div>
    </div>
  ) : null;
};

export default Modal;
