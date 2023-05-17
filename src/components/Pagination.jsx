/* eslint-disable react/prop-types */
import ReactPaginate from "react-paginate";
import useProducts from "../utility/useProducts";
import { useState } from "react";

const Pagination = ({ paginate }) => {
  const { products } = useProducts();
  const [initialPage, setInitialPage] = useState(0);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * paginate.itemsPerPage) % products.length;
    setInitialPage(e.selected);
    paginate.setItemOffset(newOffset);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        onPageChange={handlePageClick}
        pageCount={paginate.pageCount}
        pageRangeDisplayed={5}
        renderOnZeroPageCount={null}
        containerClassName="pagination flex text-xl justify-center"
        previousLabel={initialPage != 0 && "previous"}
        nextLabel={
          initialPage != Math.floor(products.length / paginate.itemsPerPage) &&
          "next"
        }
        activeClassName="active bg-green-500 rounded-xl"
        pageLinkClassName="page-link p-2 text-orange-800 hover:bg-blue-200"
        previousLinkClassName="page-link p-2 text-blue-500 hover:bg-blue-200"
        nextLinkClassName="page-link p-2 text-blue-500 hover:bg-blue-200"
      />
    </>
  );
};

export default Pagination;
