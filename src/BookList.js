import React, { Component } from 'react';
import Book from './Book';
import PropTypes from 'prop-types';
import './App.css';


class BookList extends Component {
  
  constructor(props){
    super(props);    
  }

      /*Proptypes For data type and function Error handling.
  */
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired, 
    shelfName: PropTypes.string.isRequired, 
    onhandleChange: PropTypes.func.isRequired
  }  

  onhandleChange = (key, bookshelf) => {
 
    if (this.props.onhandleChange) {
      this.props.onhandleChange(key, bookshelf);
    }
  }      
   
  render() {

    const {books, shelf, shelfName } = this.props;

    return (
              <div className='bookshelf'>
                  <h2 className='bookshelf-title'>{shelfName}</h2>                             
                  <div className='bookshelf-books'>
                      <ol className='books-grid'>            
                          {books.filter(bookshelf => bookshelf.shelf === shelf).map((book) => {
                              return  <Book bookId={book.id} onhandleChange={this.onhandleChange} singlebook={book} shelf={shelf}/>
                          })}
                      </ol>
                  </div>      
              </div>              
            )
  }
}

export default BookList;