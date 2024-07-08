import './SearchBar.scss';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({searchValue, setSearchValue, setPage, isMiddleScreen}) => {
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    const handleSearch = () => {
        if (searchValue === '') {
            navigate('/');
            setPage(1);
        } else {
            navigate(`/?query=${searchValue}`);
            setPage(1);
        }
    };

    return (
        <div className='search-bar'>
            <input 
                type='text'
                placeholder='Search Image...'
                onChange={(e) => {handleChange(e)}}
                value={searchValue}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch();
                }}
            />

            <Button 
                clickFunction={handleSearch} 
                styles={isMiddleScreen ? {width: 'calc(50% - 5px)'} : null}
            >Search</Button>
        </div>
    )
}

export default SearchBar
