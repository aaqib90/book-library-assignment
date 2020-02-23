const booksReducer = (state = [], action: any) => {
    switch(action.type) {
      case "GET_BOOK_INFO":
        return action.payload;
      case "POST_BOOK_INFO":
        return action.payload;
      case "UPDATE_BOOK_INFO":
        return action.payload
      case "EXCEPTION":
        return action.payload;
      default:
        return state;
    }
  }
  
  export default booksReducer;
  
  