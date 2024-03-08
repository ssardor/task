import React from "react";
const Card = ({ currentProducts, renderPaginationButtons }) => {
  return (
    <div>
      <div className="row mt-5 g-3">
        {/* map продуктов*/}
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
      {/* пагинация */}
      <div className="d-flex my-3 justify-content-center">
        <div className="">{renderPaginationButtons()}</div>
      </div>
    </div>
  );
};

export default Card;
