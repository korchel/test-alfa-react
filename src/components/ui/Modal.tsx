import { DetailedHTMLProps, FC, HTMLAttributes, useEffect } from "react";

import { Cross } from "./icons";

interface Props  extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {
  closeModal: () => void;
}

export const Modal: FC<Props> = ({ closeModal, children }) => {

  useEffect(() => {
    const closeOnEscapePressed = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', closeOnEscapePressed);
    return () => window.removeEventListener('keydown', closeOnEscapePressed);
  }, []);

  return (
    <div
      className='h-screen z-30 fixed inset-0 bg-slate-900/60 backdrop-blur overflow-y-auto
      flex flex-col items-center justify-center'
    > 
      <div
        data-id='modal'
        className='relative rounded-lg h-fit
          flex flex-col
          md:min-w-[500px] 
          p-4 sm:p-6 md:p-8 
          bg-white'
      >
        <button onClick={closeModal} className='absolute text-white -top-1 left-[100%] ml-2'>
          <Cross />
        </button>
        {children}
      </div>
    </div>
  );
};