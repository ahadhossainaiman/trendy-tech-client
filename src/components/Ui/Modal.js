import React from 'react';

const Modal = ({children,id}) => {
    console.log(id);
    return (
        <div>
        <dialog id={id} className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-red-500 text-white">
                ✕
              </button>
            </form>
            {children}
          </div>
        </dialog>
           
        </div>
    );
};

export default Modal;