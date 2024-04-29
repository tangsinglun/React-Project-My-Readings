import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Book from './Book';
import PropTypes from 'prop-types';
import './App.css';


class SearchBar extends Component {
  
  constructor(props){
    super(props);    
  }

  onhandleChange = (key, bookshelf) => {
 
    if (this.props.onhandleChange) {
      this.props.onhandleChange(key, bookshelf)
    }
  }  
  
      /*Proptypes For data type and function Error handling.
  */
  static propTypes = {
    searchResults: PropTypes.array.isRequired,
    onhandleSearch: PropTypes.func.isRequired,
    onhandleChange: PropTypes.func.isRequired
  }    

   
  render() {

    const {searchResults} = this.props;

    return ( 
            <div className="search-books">
                <div className="search-books-bar">
                  <Link to='/' className='close-search'>
                      Close                
                  </Link>
                  <div className="search-books-input-wrapper">
                    {/*
                      NOTES: The search from BooksAPI is limited to a particular set of search terms.
                      You can find these search terms here:
                      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                      you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text" onChange={this.props.onhandleSearch} placeholder="Search by title or author"/>
                  </div>
                </div>
                <div className="search-books-results">
                  <ol className="books-grid">
                      {searchResults.length > 0 && (                                          
                          searchResults.map((onebook) => {
                              return  <Book bookId={onebook.id} onhandleChange={this.onhandleChange} singlebook={onebook} shelf={(typeof onebook.shelf ==="undefined") ? "none" : onebook.shelf}/>
                          })
                       )}                   
                  </ol>
                </div>
            </div>         
    	  	)
  }
}

export default SearchBar;
