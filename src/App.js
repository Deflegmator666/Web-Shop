import { useEffect, useMemo, useState } from "react";
import "./styles/index2.css";
import addIcon from "./img5/Add-icon.png";
import basket from "./img5/basket.png";
import Products from "./img5/Products.png";
import Modal from "./Companents/Modal";
import closeIcon from "./img5/close-icon.png";
import Basket from "./Companents/Basket";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openBasket, setOpenBasket] = useState(false);
  const [itemsArr, setItemsArr] = useState(
    JSON.parse(localStorage.getItem("pizzaItems")) || []
  );
  const [inputTitle, setInputTitle] = useState("");
  const [inputText, setInputText] = useState("");
  const [inputFile, setInputFile] = useState("");
  const [inputPrice, setInpuPrice] = useState("");

  const overalPrice = useMemo(
    () => itemsArr.reduce((acc, curr) => acc + curr.price * curr.count, 0),
    [itemsArr]
  );

  useEffect(() => {
    localStorage.setItem("pizzaItems", JSON.stringify(itemsArr));
  }, [itemsArr]);

  const handleInputFile = (e) => {
    const file = e.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setInputFile(reader.result.toString());
    };
  };

  const addInBasket = (id) => {
    // const newArray = itemsArr.filter((item) => item.id === id);
    // const updateArray = [...basketArr, ...newArray];
    // setBasketArr(updateArray);
    const updatedItemsArr = itemsArr.map((item) =>
      item.id === id ? { ...item, count: item.count + 1 } : { ...item }
    );
    setItemsArr(updatedItemsArr);
  };

  const createItem = () => {
    if (inputTitle.trim() === "") {
      return;
    } else if (inputText.trim() === "") {
      return;
    } else if (inputFile.trim() === "") {
      return;
    } else if (inputPrice.trim() === "") {
      return;
    } else {
      const ObjectItem = {
        count: 0,
        id: Math.random().toString().substring(2, 8),
        title: inputTitle,
        text: inputText,
        file: inputFile,
        price: inputPrice,
      };

      const newArray = [...itemsArr, ObjectItem];

      setItemsArr(newArray);
      setInputTitle("");
      setInputText("");
      setInputFile("");
      setInpuPrice("");
    }
    changeStateModal("false");
  };

  useEffect(() => {
    console.log(itemsArr);
  }, [itemsArr]);

  const changeStateModal = (state) => {
    switch (state) {
      case "true":
        setIsOpen(true);
        break;
      case "false":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const changeStateBasket = (state) => {
    switch (state) {
      case "true":
        setOpenBasket(true);
        break;
      case "false":
        setOpenBasket(false);
        break;
      default:
        break;
    }
  };

  const changeValue = () => {
    const burgerMenu = document.querySelector(".burger__menu");
    const item = document.querySelector(".nav__item");
    burgerMenu.classList.toggle("active");
    item.classList.toggle("active__Nav");
  };

  return (
    <div className="App">
      <div className="page">
        <header className="header">
          <div className="container">
            <nav className="nav">
              <div className="nav__item">
                <a href="/#">Завтрак</a>
                <a href="/#">Пицца</a>
                <a href="/#">Закуски</a>
                <a href="/#">Кофе</a>
                <a href="/#">Коктейли</a>
              </div>
              <div className="basket">
                <img
                  className="basket__icon"
                  onClick={() => changeStateBasket("true")}
                  src={basket}
                  alt=""
                />
                <div className="count"></div>
                <p>Сумма:</p>
                <div className="sumCount">{overalPrice}</div>
                <p>Р</p>
              </div>
            </nav>
            <div className="burger__menu" onClick={() => changeValue()}>
              <span className="burger__item"></span>
            </div>
          </div>
        </header>
        {isOpen && (
          <Modal
            changeStateModal={changeStateModal}
            inputTitle={inputTitle}
            inputText={inputText}
            inputFile={inputFile}
            inputPrice={inputPrice}
            setInputTitle={setInputTitle}
            setInputText={setInputText}
            setInputFile={setInputFile}
            setInpuPrice={setInpuPrice}
            createItem={createItem}
            handleInputFile={handleInputFile}
            closeIcon={closeIcon}
          />
        )}
        {openBasket && (
          <Basket
            changeStateBasket={changeStateBasket}
            Products={Products}
            closeIcon={closeIcon}
            itemsArr={itemsArr}
            setItemsArr={setItemsArr}
            overalPrice={overalPrice}
          />
        )}
        <main className="main">
          <section className="section">
            <div className="container">
              <div className="content">
                {itemsArr.map((item) => (
                  <div className="content__item" key={item.id}>
                    <div className="content__item__box">
                      <img src={item.file} alt="" className="content__photo" />
                      <h1 className="content__title">{item.title}</h1>
                      <div className="content__text">{item.text}</div>
                    </div>
                    <div className="content__item__inner">
                      <div className="content__item__price">
                        <div className="content__prise">{item.price}</div>
                        <span>Р</span>
                      </div>

                      <button
                        className="content__button"
                        onClick={() => addInBasket(item.id)}
                      >
                        В корзину
                      </button>
                    </div>
                  </div>
                ))}

                <div className="add-content__item">
                  <img
                    onClick={() => changeStateModal("true")}
                    className="add-content__icon"
                    src={addIcon}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="footer">
          <div className="container">
            <div className="text__info">Создатель Lapin_Ivan</div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
