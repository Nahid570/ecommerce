import { useState } from "react";
import useProducts from "../utility/useProducts";
import Pagination from "./Pagination";
import Product from "./Product";

const Products = () => {
  const { products, searchTerm, authToken, registeredUser } = useProducts();

  const authUser = registeredUser?.find((user) => user?.id === authToken);
  const isAdmin = authUser?.isAdmin;

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 1;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const paginate = {
    itemOffset,
    setItemOffset,
    itemsPerPage,
    endOffset,
    currentItems,
    pageCount,
  };

  const filteredProducts = currentItems?.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="px-8 py-4 min-h-[calc(100vh-60px)] bg-gray-200">
        {products?.length ? (
          <div className="grid gap-8 grid-cols-1 ss:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.length === 0 ? (
              <p className="text-2xl text-gray-800 font-bold">
                Oops, No product found 😰
              </p>
            ) : (
              filteredProducts.map((item) => (
                <Product key={item.id} item={item} isAdmin={isAdmin} />
              ))
            )}
          </div>
        ) : (
          <p className="text-2xl text-gray-800 font-bold">Loading...</p>
        )}
      </div>
      <div className="mt-5">
        <Pagination paginate={paginate} />
      </div>
    </>
  );
};

export default Products;
