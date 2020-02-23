import React from 'react';
import { connect } from 'react-redux';

import { getBookInfo, addBookInfo, updateBookInfo } from '../actions/books';
import Header from './Header';

import '../App.css';
import BookInfoDetails from './BookInfoDetails';

import { Book } from '../models/book'

class Home extends React.Component<any, any> {
    constructor(props: object) {
        super(props);

        this.state = {
            name: "",
            description: "",
            count: 0,
            author: "",
            currentBooks: "",
            searchedItem: "",
            selectedBookInfo: "",
            formValue: ""
        }
    }

    componentDidMount() {
        this.props.getBookInfo();
        this.setState({
            currentBooks: this.props.currentBooks
        })
    }

    /**
     * Validate input Fields
     */

    validateInput = (obj: Book) => {
        if(obj.name && obj.description && obj.count && obj.author )
            return true;
        else
            return false;
    }
 
    /**
     * Search Book handler 
     * return - set state of SearchItem as an array of filtered book object
     */
    searchBookHandler = (event: any) => {
        const value = event.target.value;
        if(!value) {
            this.setState({
                searchedItem: "",
                selectedBookInfo: ""
            })
            return;
        } else {
            const searchedItem = this.props.currentBooks ? this.props.currentBooks.filter((obj: any) => {
                if((obj['name']).toLowerCase().includes(value.toLowerCase())) 
                    return obj
            }): " ";

            this.setState({
                searchedItem: searchedItem
            })
            return;
        }
    }

    /**
     * Will set selected book details to selectedBookInfo state
     */
    bookDetails =(obj: Book) => {
        this.setState({
            selectedBookInfo: obj
        })
    }

    /**
     * Will return list of filtered books
     */
    renderSearchItem = () => {
        return this.state.searchedItem.map((obj: Book, key: number) => {
            return (
                <li key={key}><a href="#" onClick={() => this.bookDetails(obj)}>{obj.name}</a></li>
            )
        });
    }

    /**
     * Add/update book information 
     */
    updateBookHandler =(obj: Book) => {
        if(this.validateInput(obj)) {
            if(obj.$loki) {
                this.props.updateBookInfo(obj);
                this.setState({
                    selectedBookInfo: obj
                })
            } else {
                this.props.addBookInfo(obj);
                this.setState({
                    formValue: {}
                })
                this.setState({
                    name: '',
                    description: "",
                    count: null,
                    author: ""
                })
            }
        } else {
            alert("Please fill all the details..");
        }
        
    }

    /**
     * Will return jsx of specifics book details
     */
    renderBookDetails = () => {
        return (
            <div className="bookInfo-right">
                <BookInfoDetails
                    selectedBookInfo={this.state.selectedBookInfo}
                    updateBookHandler={this.updateBookHandler}
                />
            </div>
        )
    }

    render() {
        return (
        <div className="App">
            <Header />
            <BookInfoDetails addForm={true} selectedBookInfo={this.state.formValue} updateBookHandler={this.updateBookHandler} />
            <br/>
            <h3>Search Book</h3>
            <div>
                <input type="text" name="search" placeholder="Search" onChange={this.searchBookHandler}/>
                { this.state.searchedItem.length>0 ? this.renderSearchItem() : <p/>}
            </div>
            <div>
                {this.state.selectedBookInfo ? this.renderBookDetails() : ""}
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state: any) => {
  return {
    currentBooks: state.bookReducer
  }
}

export default connect(
  mapStateToProps,
  {
    getBookInfo,
    addBookInfo,
    updateBookInfo
  }
)(Home)
