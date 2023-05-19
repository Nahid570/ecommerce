import { useState } from "react";
import useProducts from "../utility/useProducts";
import Pagination from "./Pagination";
import Product from "./Product";
import SearchBar from "./SearchBar";

const Products = () => {
  const { products, searchTerm, authToken, registeredUser } = useProducts();
  const [sorted, setSorted] = useState("asc");
  const authUser = registeredUser?.find((user) => user?.id === authToken);
  const isAdmin = authUser?.isAdmin;

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;
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

  // product sorted logic based on their price
  const sortedItems = currentItems?.sort((a, b) => {
    if (sorted === "asc") {
      return +a.price > +b.price ? 1 : -1;
    } else if (sorted === "desc") {
      return +a.price > +b.price ? -1 : 1;
    }
  });

  const handleSortChange = (e) => {
    setSorted(e.target.value);
  };

  // END => product sorted logic based on their price

  const filteredProducts = sortedItems?.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="px-8 w-[100%] py-4 min-h-[calc(100vh-60px)] bg-gray-200">
        <div className="flex justify-end w-[100%] gap-4 mb-5">
          <div className="block ss:hidden w-[100%]">
            <SearchBar modified={true} />
          </div>
          <select
            value={sorted}
            onChange={handleSortChange}
            className="bg-transparent"
          >
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </select>
        </div>
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
      {filteredProducts.length && (
        <div className="my-5">
          <Pagination paginate={paginate} />
        </div>
      )}
    </>
  );
};

export default Products;
