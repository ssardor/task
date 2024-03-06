import React, { useEffect, useState } from "react";
import axios from "axios"; 
import md5 from "md5";
import ProductSearch from "./comps/ProductSearch";
import LoadingSpinner from "./comps/LoadingSpinner";
const ProductList = () => {
  const [products, setProducts] = useState([]);//хранение продуктов в state
  const [loading, setLoading] = useState(false);//loader spinner
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 50;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const maxPagesToShow = 5;
  // console.log(products);
  const apiUrl = "https://api.valantis.store:41000/"; // Замените на реальный URL API
  const password = "Valantis"; // Пароль для доступа к API
  // Функция для формирования значения X-Auth в соответствии с указанным шаблоном
  const generateXAuthHeaderValue = (password) => {
    const timestamp = new Date().toISOString().split("T")[0].replace(/-/g, "");
    const authString = `${password}_${timestamp}`;
    return md5(authString);
  };

  // Функция для отправки запроса к API
  const sendRequestToAPI = async (action, params = {}) => {
    const xAuthHeader = generateXAuthHeaderValue(password);
    const requestData = { action, params };

    try {
      const response = await axios.post(apiUrl, requestData, {
        headers: { "X-Auth": xAuthHeader },
      });

      if (response.status === 200) {
        return response.data.result;
      } else {
        console.error("Ошибка при отправке запроса:", response.statusText);
        return null;
      }
    } catch (error) {
      if (error.response) {
        console.error(
          "Ошибка при отправке запроса:",
          error.response.statusText
        );
      } else {
        console.error("Ошибка при отправке запроса:", error.message);
      }
      return null;
    }
  };
  // Пример использования
  useEffect(() => {
    sendRequestToAPI("get_ids", { offset: 1, limit: 1000 }).then((result) => {
      setLoading(true);
      if (result) {
        console.log("Результат запроса:", result);
        sendRequestToAPI("get_items", {
          ids: result,
        }).then((result) => {
          if (result) {
            console.log("Результат запроса:", result);
            setProducts(result);
          } else {
            console.log("Запрос не выполнен.");
          }
        });
      } else {
        console.log("Запрос не выполнен.");
      }
      setLoading(false);
    });
  }, []);
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
//рендер кнопок пагинации
  const renderPaginationButtons = () => {
    const currentPageIndex = currentPage - 1;
    const pages = [];

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
      let startPage = currentPageIndex - halfMaxPagesToShow;
      let endPage = currentPageIndex + halfMaxPagesToShow;

      if (currentPageIndex < halfMaxPagesToShow) {
        startPage = 0;
        endPage = maxPagesToShow - 1;
      } else if (currentPageIndex >= totalPages - halfMaxPagesToShow) {
        startPage = totalPages - maxPagesToShow;
        endPage = totalPages - 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i + 1);
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }
    }

    return (
      <ul className="pagination">
        {pages.map((page, index) => (
          <li
            className={"page-item" + currentPage === page ? "active" : ""}
            key={index}
            onClick={() => handleClick(page)}
          >
            <a className="page-link"> {page}</a>
          </li>
        ))}
      </ul>
    );
  };
  //функция которая создает новый массив uniqueProducts, который содержит только уникальные продукты на основе их ID.
  function filterDuplicateProducts(products) {
    const uniqueProducts = [];
    const uniqueIds = new Set();

    for (const product of products) {
      if (!uniqueIds.has(product.id)) {
        uniqueIds.add(product.id);
        uniqueProducts.push(product);
      }
    }

    return uniqueProducts;
  }
  const uniqueProducts = filterDuplicateProducts(products);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = uniqueProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  //функция которая проверяет на пустоту массива от api 
  function handleEmptyArrayResponse(response) {
    if (Array.isArray(response) && response.length === 0) {
      return { error: "Empty array response from API" };
    }
    return response;
  }
  //поиск бренда,цены и название продукта
  const handleSearch = (query) => {
    setLoading(true);
    Promise.any(query).then(
      sendRequestToAPI("filter", { price: +query }).then((result) => {
        if (result) {
          console.log("Результат запроса:", result);
          sendRequestToAPI("get_items", {
            ids: result,
          }).then((result) => {
            if (result) {
              console.log("Результат запроса:", result);
              const response = handleEmptyArrayResponse(result);
              if (response.error) {
                console.log("Error:", response.error);
              } else {
                console.log("Response:", response);
                setProducts(response);
              }
            } else {
              console.log("Запрос не выполнен.");
            }
          });
        } else {
          console.log("Запрос не выполнен.");
        }
      }),
      sendRequestToAPI("filter", { product: query }).then((result) => {
        if (result) {
          console.log("Результат запроса:", result);
          sendRequestToAPI("get_items", {
            ids: result,
          }).then((result) => {
            if (result) {
              console.log("Результат запроса:", result);
              const response = handleEmptyArrayResponse(result);
              if (response.error) {
                console.log("Error:", response.error);
              } else {
                console.log("Response:", response);
                setProducts(response);
              }
            } else {
              console.log("Запрос не выполнен.");
            }
          });
        } else {
          console.log("Запрос не выполнен.");
        }
      }),
      sendRequestToAPI("filter", { brand: query }).then((result) => {
        if (result) {
          console.log("Результат запроса:", result);
          sendRequestToAPI("get_items", {
            ids: result,
          }).then((result) => {
            if (result) {
              console.log("Результат запроса:", result);
              const response = handleEmptyArrayResponse(result);
              if (response.error) {
                console.log("Error:", response.error);
              } else {
                console.log("Response:", response);
                setProducts(response);
              }
            } else {
              console.log("Запрос не выполнен.");
            }
          });
        } else {
          console.log("Запрос не выполнен.");
        }
      })
    );
    setLoading(false);
  };

  return (
    <div className="bg-author overflow-x-hidden ">
      <div className="row">
        <div className="offset-3 col-8">
          <h1>Product List</h1>
          <div className=" w-25">
            <ProductSearch onSearch={handleSearch} />
          </div>
        </div>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {
            <div className="row mt-5 g-3">
              {currentProducts.map((product) => (
                <div className="card  offset-3 col-6 " key={product.id}>
                  <div className="card-body">
                    <h5 className="card-title">{product.product}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                      {product.id}
                    </h6>
                    <p className="card-text">
                      Brand: {product.brand ? product.brand : "no brand"}
                      <br />
                      Price: {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          }
        </>
      )}
      <div className="d-flex my-3 justify-content-center">
        <div className="">{renderPaginationButtons()}</div>
      </div>
    </div>
  );
};

const App = () => {
  return <ProductList />;
};

export default App;
