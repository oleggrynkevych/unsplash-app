import './PaginateBar.scss';
import ReactPaginate from 'react-paginate';


export function PaginateBar({ itemsPerPage, total, setPage, page, isMiddleScreen }) {
  const pagesLimit = process.env.REACT_APP_PAGES_LIMIT;

  const pageCount = Math.ceil(total / itemsPerPage);

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel='>'
        previousLabel='<'
        onPageChange={handlePageClick}
        pageRangeDisplayed={isMiddleScreen ? 2 : 5}
        pageCount={pageCount > pagesLimit ? pagesLimit : pageCount}
        marginPagesDisplayed={1}
        className='paginate-bar'
        forcePage={page - 1}
      />
    </>
  );
}

