import React, { useCallback, useMemo } from "react";

const Basket = ({
  Products,
  changeStateBasket,
  closeIcon,
  itemsArr,
  setItemsArr,
  overalPrice,
}) => {
  const addItem = (id) => {
    const updatedItemsArr = itemsArr.map((item) =>
      item.id === id ? { ...item, count: item.count + 1 } : { ...item }
    );

    setItemsArr(updatedItemsArr);
  };

  const removeItem = (id) => {
    const updatedItemsArr = itemsArr.map((item) =>
      item.id === id && item.count > 0
        ? { ...item, count: item.count - 1 }
        : { ...item }
    );

    setItemsArr(updatedItemsArr);
  };

  const isBasketEmpty = useMemo(
    () => !itemsArr.find((item) => item.count > 0),
    [itemsArr]
  );

  // useEffect(() => console.log(priceValue), [priceValue]);

  const BasketInner = useCallback(() => {
    if (isBasketEmpty) {
      return (
        <>
          <div className="section__empty">
            <img className="basket__photo" src={Products} alt="" />
            <h2>Корзина пуста</h2>
            <div className="basket__text">
              Ваша корзина пуста, выберите понравившийся товар.
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="basket__products">
            <div className="basket__inner">
              {itemsArr.map((item) => {
                return (
                  item.count > 0 && (
                    <div className="basket__item" key={item.id}>
                      <div className="basket__info">
                        <img className="basket__img" src={item.file} alt="" />
                        <div className="basket__title">{item.title}</div>
                      </div>
                      <div className="basket__inner__item">
                        <div className="basket__price">
                          {item.price}
                          <span className="basket__nominal">₽</span>
                        </div>
                        <div className="change__count">
                          <button onClick={() => removeItem(item.id)}>-</button>
                          <div className="Count">{item.count}</div>
                          <button onClick={() => addItem(item.id)}>+</button>
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
            <div className="basket__total">
              <div className="basket__count">1</div>
              <div className="basket__overalPrice">{overalPrice}</div>
              <button className="basket__submit-price">Оформить заказ</button>
            </div>
          </div>
        </>
      );
    }
  }, [itemsArr, Products]);

  return (
    <>
      <div
        onClick={() => changeStateBasket("false")}
        className="modal-overlay"
      ></div>
      <section className="section__basket">
        <BasketInner />
        <img
          onClick={() => changeStateBasket("false")}
          className="modal__closeBtn basket"
          src={closeIcon}
          alt=""
        />
      </section>
    </>
  );
};

export default Basket;
