import axios from 'axios';

const exceptionAction = (err: any) => {
    return {
        type: 'EXCEPTION',
        payload: err
    }
}

export const getBookInfo = () => {
    return (dispatch: any) => {
        axios.get("http://localhost:8080/getBooksInfo", {
            method: 'GET',
            headers: {
              "Content-Type": "application/json"
            }
            })
        .then((res:any) => {
            dispatch({
                type: 'GET_BOOK_INFO',
                payload: res.data
            });
        })
        .catch((err:any) => {
            dispatch(exceptionAction(err));
        })
    }
    
}
  
export const addBookInfo = (data: any) => {
    return (dispatch: any) => {
        axios.post("http://localhost:8080/addBookInfo", data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
        }).then((res:any) => {
            alert("Saved..");
            dispatch({
                type: 'POST_BOOK_INFO',
                payload: res.data
            })
        })
        .catch((err:any) => {
            dispatch(exceptionAction(err));
        })
    }
}

export const updateBookInfo = (data: any) => {
    return (dispatch: any) => {
        axios.put("http://localhost:8080/updateBookInfo", data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
        }).then((res:any) => {
            alert("Updated..");
            dispatch({
                type: 'UPDATE_BOOK_INFO',
                payload: res.data
            })
        })
        .catch((err:any) => {
            dispatch(exceptionAction(err));
        })
    }
}


// const fetchBookDetails = fetch("http://localhost:8080/getBooksInfo")
// .then(res => res.json())