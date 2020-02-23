import React from 'react';
import { connect } from 'react-redux';
import {getBookInfo} from '../actions/books';
import Header from './Header';
import { Book } from '../models/book';

class BookList extends React.Component<any, any> {

    /**
     * Will return list of book element
     */
    renderBooksInfo = () => {
        return this.props.currentBooks.map((obj: Book, key:number) => 
        {
            return (
                <tr key={key}>
                    <td>{obj.name}</td>
                    <td>{obj.author}</td>
                    <td>{obj.count}</td>
                </tr>
            );
        })         
    }

    /**
     * Get Total book info Action dispatch
     */
    componentDidMount() {
        this.props.getBookInfo();
    }
 
    render() {
        return (
            <React.Fragment>
                <Header />
                <h3>Book List</h3>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Book Name</th>
                                <th>Author</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.currentBooks && this.props.currentBooks.length > 0 ? 
                            this.renderBooksInfo() : ""
                        }
                        </tbody>
                    </table>
                </div>
           </React.Fragment>
        )
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
      getBookInfo
    }
  )(BookList)