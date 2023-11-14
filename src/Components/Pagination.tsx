import { useDispatch, useSelector } from "react-redux";
import * as types from "../Redux/actionTypes";
import { BsFillSkipForwardBtnFill,BsFillSkipBackwardBtnFill } from 'react-icons/bs';

//import { HiChevronLeft,  } from "react-icons";

const Pagination = () => {
  const { page } = useSelector((store: any) => store);
  const dispatch = useDispatch();
  const handleChangePage = (newPage: number) => {
    dispatch({ type: types.CHANGE_PAGE, payload: newPage });
  };

  return (
    <div className="flex justify-center items-center p-4">
      <button
        className="flex text-white m-5 bg-teal-700   py-1 px-3  hover:bg-blue-600 rounded"
        disabled={page === 0}
        style={{ cursor: page === 0 ? "no-drop" : "pointer", borderRadius:"5rem" }}
        onClick={() => {
          handleChangePage(page-1);
        }}
      >
        <BsFillSkipBackwardBtnFill fontSize={"3rem"}  style={{paddingLeft:"1rem", paddingRight:"1rem"}}/>
      </button>
      <div style={{padding:"1rem", backgroundColor:"teal", color:"white"}}>{page}</div>
      <button
        className="flex text-white m-2 bg-teal-700  py-1 px-3 focus:outline-none  rounded"
        disabled={page === 9}
        style={{ cursor: page === 9 ? "no-drop" : "pointer", borderRadius:"5rem" }}
        onClick={() => {
          handleChangePage(page + 1);
        }}
      >
        <BsFillSkipForwardBtnFill fontSize={"3rem"} style={{paddingLeft:"1rem", paddingRight:"1rem"}}/>
      </button>
    </div>
  );
};

export default Pagination;
