import { useContext, useEffect, useState, useRef } from "react";
import BasketContext from "../../context/basket/index";
import { formatNumber } from "../../utils/function";
import "./style.scss";

const Basket = () => {
  const { basketItems, total } = useContext(BasketContext);
  const [basketToogle, setBasketToogle] = useState(true);
  const [basketH, setBasketH] = useState(0);
  const [basketClass, setBasketClass] = useState("");
  const contentRef = useRef();
  useEffect(() => {
    setBasketH(contentRef?.current?.scrollHeight);
    if (basketItems.length) {
      setBasketClass("show");
      setTimeout(() => {
        setBasketClass("");
      }, 300);
    }
  }, [basketItems]);

  return (
    <div className={`basket ${basketClass}`}>
      {basketItems.length && (
        <>
          <div
            className="basket__toogle"
            onClick={() => setBasketToogle(!basketToogle)}
          >
            {basketToogle ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 close"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 open"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            )}
          </div>
          <div
            className="basket__list"
            style={
              basketToogle ? { height: basketH + "px" } : { height: "0px" }
            }
          >
            <div ref={contentRef}>
              {basketItems.length &&
                basketItems.map((basket) => (
                  <div key={basket?.nid} className="basket__item">
                    <p>{basket?.objInfo?.MBS}</p>
                    <p>Kodu: {basket?.original?.C}</p>
                    <p>Maç: {basket?.original?.N}</p>
                    <p>Orn: {basket?.value}</p>
                    <p>MBS: {basket?.objInfo?.MBS}</p>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}

      <div className="basket__total">
        <p>Toplam: {formatNumber(total)}</p>
      </div>
    </div>
  );
};
export default Basket;
