/* eslint-disable react/prop-types */
// import searchIcon from "../assets/search_icon.png";
import useProducts from "../utility/useProducts";

const SearchBar = ({ modified }) => {
  const { searchTerm, setSearchTerm } = useProducts();

  return (
    <div
      className={`border flex justify-between rounded-md border-white p-2 h-[50px] ${modified && 'border-black'}`}
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`outline-none border-none bg-transparent w-[100%] pr-2 ${modified && 'placeholder-black'}`}
        placeholder="Search Products..."
      />
      {/* <button>
        <img src={searchIcon} alt="search_icon" className="w-[100%] h-[100%]" />
      </button> */}
    </div>
  );
};

export default SearchBar;
