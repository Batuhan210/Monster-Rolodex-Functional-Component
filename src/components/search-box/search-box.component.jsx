import './search-box.style.css'; 

const SearchBox = ({ className, placeholder, onChangeHandler }) => (
    
        <input
            className={`search-box ${className}`} 
            type="search"                                   /* bu kısımda arama kutumuzu gerçek bir arama kutusuna çeviriyor  */
            placeholder={placeholder}
            onChange= {onChangeHandler}       /* girdimizde her değişiklik olduğunda çalışan bir geri aramadır. */
        />
);
export default SearchBox;