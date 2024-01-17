import React from "react";

const Modal = ({
  inputTitle,
  inputText,
  inputPrice,
  changeStateModal,
  setInputTitle,
  setInputText,
  setInpuPrice,
  createItem,
  handleInputFile,
  closeIcon,
}) => {
  return (
    <>
      <div
        className="modal-overlay"
        onClick={() => changeStateModal("false")}
      ></div>
      <div className="modal">
        <div className="modal__inner">
          <img
            src={closeIcon}
            alt=""
            className="modal__closeBtn"
            onClick={() => changeStateModal("false")}
          />
          <h1>Название товара:</h1>
          <input
            className="modal__input"
            type="text"
            value={inputTitle}
            onChange={(event) => setInputTitle(event.currentTarget.value)}
            required
          />
          <h1>Картинка товара:</h1>
          <p>Размер 292 х 292 пикселя</p>
          <input
            className="modal__input__photo"
            accept="image/png, image/gif, image/jpeg, image/webp"
            type="file"
            name="f"
            onChange={(event) => handleInputFile(event)}
            required
          />
          <h1>Описание товара:</h1>
          <textarea
            className="modal__inner__textarea"
            type="text"
            value={inputText}
            onChange={(event) => setInputText(event.currentTarget.value)}
            required
          ></textarea>
          <h1>Цена товара:</h1>
          <input
            className="modal__input"
            type="number"
            value={inputPrice}
            onChange={(event) => setInpuPrice(event.currentTarget.value)}
            required
          />
          <div className="modal__inner__buttons">
            <button
              className="button__item btn__create"
              onClick={() => createItem()}
              type="submit"
            >
              Создать карточку
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
