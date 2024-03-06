import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import md5 from "md5";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedBrand, setSelectedBrand] = useState("");
//   const [selectedPrice, setSelectedPrice] = useState("");
//   const [selectedName, setSelectedName] = useState("");

//   // Остальной код без изменений...
//   const productsPerPage = 50;
//   const totalPages = Math.ceil(products.length / productsPerPage);
//   const maxPagesToShow = 5;
//   const apiUrl = "https://api.valantis.store:41000/"; // Замените на реальный URL API
//   const password = "Valantis"; // Пароль для доступа к API
//   // Функция для формирования значения X-Auth в соответствии с указанным шаблоном
//   const generateXAuthHeaderValue = (password) => {
//     const timestamp = new Date().toISOString().split("T")[0].replace(/-/g, "");
//     const authString = `${password}_${timestamp}`;
//     return md5(authString);
//   };

//   // Функция для отправки запроса к API
//   const sendRequestToAPI = async (action, params = {}) => {
//     const xAuthHeader = generateXAuthHeaderValue(password);
//     const requestData = { action, params };

//     try {
//       const response = await axios.post(apiUrl, requestData, {
//         headers: { "X-Auth": xAuthHeader },
//       });

//       if (response.status === 200) {
//         return response.data.result;
//       } else {
//         console.error("Ошибка при отправке запроса:", response.statusText);
//         return null;
//       }
//     } catch (error) {
//       if (error.response) {
//         console.error(
//           "Ошибка при отправке запроса:",
//           error.response.statusText
//         );
//       } else {
//         console.error("Ошибка при отправке запроса:", error.message);
//       }
//       return null;
//     }
//   };
//   // Функция для обновления списка продуктов с учетом фильтров
//   const updateProductList = async () => {
//     let filteredProducts = products;

//     if (selectedBrand !== "") {
//       filteredProducts = filteredProducts.filter(
//         (product) => product.brand === selectedBrand
//       );
//     }

//     if (selectedPrice !== "") {
//       filteredProducts = filteredProducts.filter(
//         (product) => product.price === selectedPrice
//       );
//     }

//     if (selectedName !== "") {
//       filteredProducts = filteredProducts.filter(
//         (product) => product.product === selectedName
//       );
//     }

//     setProducts(filteredProducts);
//   };

//   // Пример использования
//   useEffect(() => {
//     sendRequestToAPI("get_ids", { offset: 1, limit: 1000 }).then((result) => {
//       if (result) {
//         console.log("Результат запроса:", result);
//         sendRequestToAPI("get_items", {
//           ids: result,
//         }).then((result) => {
//           if (result) {
//             console.log("Результат запроса:ok");
//             setProducts(result);
//           } else {
//             console.log("Запрос не выполнен.");
//           }
//         });
//       } else {
//         console.log("Запрос не выполнен.");
//       }
//     });
//   }, []);

//   // Функция для обработки изменений в фильтрах
//   useEffect(() => {
//     updateProductList();
//   }, [selectedBrand, selectedPrice, selectedName]);
//   const handleClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const renderPaginationButtons = () => {
//     const currentPageIndex = currentPage - 1;
//     const pages = [];

//     if (totalPages <= maxPagesToShow) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
//       let startPage = currentPageIndex - halfMaxPagesToShow;
//       let endPage = currentPageIndex + halfMaxPagesToShow;

//       if (currentPageIndex < halfMaxPagesToShow) {
//         startPage = 0;
//         endPage = maxPagesToShow - 1;
//       } else if (currentPageIndex >= totalPages - halfMaxPagesToShow) {
//         startPage = totalPages - maxPagesToShow;
//         endPage = totalPages - 1;
//       }

//       for (let i = startPage; i <= endPage; i++) {
//         pages.push(i + 1);
//       }

//       if (endPage < totalPages - 1) {
//         pages.push("...");
//       }
//     }
//     const indexOfLastProduct = currentPage * productsPerPage;
//     const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//     const currentProducts = products.slice(
//       indexOfFirstProduct,
//       indexOfLastProduct
//     );

//     return (
//       <div>
//         <h1>Product List</h1>
//         {/* Добавляем фильтры */}
//         <select onChange={(e) => setSelectedBrand(e.target.value)}>
//           <option value="">All Brands</option>
//           <option value="Brand1">Brand1</option>
//           <option value="Brand2">Brand2</option>
//           {/* Добавьте другие бренды здесь */}
//         </select>
//         <select onChange={(e) => setSelectedPrice(e.target.value)}>
//           <option value="">All Prices</option>
//           <option value="Price1">Price1</option>
//           <option value="Price2">Price2</option>
//           {/* Добавьте другие цены здесь */}
//         </select>
//         <select onChange={(e) => setSelectedName(e.target.value)}>
//           <option value="">All Names</option>
//           <option value="Name1">Name1</option>
//           <option value="Name2">Name2</option>
//           {/* Добавьте другие названия здесь */}
//         </select>
//         {/* Конец фильтров */}

//         <div className="row mt-5 g-3">
//           {currentProducts.map((product) => (
//             <div className="card  offset-4 col-6 " key={product.id}>
//               <div className="card-body">
//                 <h5 className="card-title">{product.product}</h5>
//                 <h6 className="card-subtitle mb-2 text-body-secondary">
//                   {product.id}
//                 </h6>
//                 <p className="card-text">
//                   Brand: {product.brand ? product.brand : "no brand"}
//                   <br />
//                   Price: {product.price}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="d-flex my-3 justify-content-center">
//           <div className="">{renderPaginationButtons()}</div>
//         </div>
//       </div>
//     );
//   };
// };

// const App = () => {
//   return <ProductList />;
// };

// export default App;