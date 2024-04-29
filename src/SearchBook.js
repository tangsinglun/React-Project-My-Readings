import React, { Component } from 'react';
import SearchBar from './SearchBar';
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types';
import './App.css';


class SearchBook extends Component {
  
  constructor(props){
    super(props);  
    this.state = {
        query: '',
        needFetch: true
    }; 
    this.overAllResult = [];    
  }

      /*Proptypes For data type and function Error handling.
  */
  static propTypes = {
    books: PropTypes.array.isRequired,
    onhandleAddNew: PropTypes.func.isRequired
  }  

  onhandleChange = (key, bookshelf) => {
      const addedBook = this.addBookShelf(key, bookshelf)
  
      if (this.props.onhandleAddNew) {
        this.props.onhandleAddNew(key, bookshelf, addedBook)
      }
    }   

  onhandleSearch = (event) => { 
    event.preventDefault();

    this.setState(({ 
      query: event.target.value
    	}), () => {      		           
          this.searchBooks(this.state.query) 
      });  
  };

  /*This function fetches the data from the Book Api provided by UDACITY. Search results will then compared with the local 
    Books records and updates the search results if not the same. 
  */
  searchBooks = (query) => {
    BooksAPI.search(query)
    .then((searchResults) => {     
      (typeof searchResults === "undefined") ? this.overAllResult = [] : this.overAllResult = searchResults;
      for (let i=0; i < this.overAllResult.length; i++){
            this.props.books.forEach((book)=>{
                if (book.id === this.overAllResult[i].id){
                    this.overAllResult[i].shelf = book.shelf;
                }
            })            
        } 
      this.forceUpdate();
    })
  }

  addBookShelf = (key, shelf) => {
    let addedBook = this.overAllResult.filter(sb => sb.id === key);
    if (addedBook.length > 0) addedBook[0].shelf = shelf;

    return addedBook;
  }

  render() {
    return ( 
      		<SearchBar searchResults={this.overAllResult} onhandleSearch={this.onhandleSearch} onhandleChange={this.onhandleChange}/>
    		)
  }
}

export default SearchBook;
