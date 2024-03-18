import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import basura from "../assets/delete.svg";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const List = () => {
  const [product, setProduct] = useState("");
  const products = useSelector((state) => state.products); //obtenemos el acceso al estado global con el UseSelector, y guardar en product lo que retorna productAdd
  const dispatch = useDispatch();
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Función para manejar el cambio de estado al seleccionar/deseleccionar un producto
  const checkboxChange = (productName) => {
    selectedProducts.includes(productName)
      ? setSelectedProducts(
          selectedProducts.filter((name) => name !== productName)
        )
      : setSelectedProducts([...selectedProducts, productName]);
  };

  useEffect(() => {
    console.log(products);
  }, [products]);

  const notifyAlreadyInProducts = () =>
    toast.error("El producto ya se encuentra en la lista!");
  const notifyEmptyInProducts = () => toast("Debes ingrear un producto!");

  return (
    <>
      <div className="mainContainer">
        <form
          className="input-group inputAdd "
          onSubmit={(e) => {
            setProduct("");
            e.preventDefault(); //metodo para evitar que se recargue la pagina y capturar el evento del enter

            if (product === "") return notifyEmptyInProducts();

            if (products.some((pr) => pr.name === product))
              return notifyAlreadyInProducts();

            dispatch({
              type: "ADD_PRODUCT",
              payload: { name: product },
            });
          }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Producto"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary btnAdd"
            type="button"
            id="button-addon2"
          >
            Agregar
          </button>
        </form>

        <div className="container">
          <div className="form-check" />

          <ul className="list-unstyled">
            {products.map((p) => (
              <li
                key={p.name}
                className={p.isBought ? "text-decoration-line-through" : ""}
              >
                <span
                  onClick={() => {
                    dispatch({ type: "TOGGLE_BOUGHT", payload: p.name });
                  }}
                >
                  {p.name}
                </span>
                <i
                  class="bi bi-x-circle iconB"
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_PRODUCT",
                      payload: p.name,
                    })
                  }
                ></i>
              </li>
            ))}
          </ul>

          {/* {products.map((p) => (
            <div className="productContainer">
              <input
                className="form-check-input checkBox"
                type="checkbox"
                value=""
                id={`flexCheckDefault-${p.name}`}
                checked={selectedProducts.includes(p.name)}
                onChange={() => checkboxChange(p.name)}
              />
              <label
                className={
                  selectedProducts.includes(p.name)
                    ? "form-check-label checked"
                    : "form-checked-label"
                }
              >
                {p.name}
              </label>
              <i
                class="bi bi-x-circle iconB"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_PRODUCT",
                    payload: p.name,
                  })
                }
              ></i>
              <div>
                <img
                  src={basura}
                  alt=""
                  className="imgBasura"
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_PRODUCT",
                      payload: p.name,
                    })
                  }
                />
              </div>
            </div>
          ))} */}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default List;
