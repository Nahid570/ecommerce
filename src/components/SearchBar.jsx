/* eslint-disable react/prop-types */
// import searchIcon from "../assets/search_icon.png";
import useProducts from "../utility/useProducts";

const SearchBar = ({ modified }) => {
  const { searchTerm, setSearchTerm } = useProducts();

  return (
    <div
      className={`border flex justify-between rounded-md border-white p-2 h-[50px] ${modified && 'border-white'}`}
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`outline-none border-none bg-transparent w-[100%] pr-2 ${modified && 'placeholder-white text-white'}`}
        placeholder="Search Products..."
      />
    </div>
  );
};

export default SearchBar;
