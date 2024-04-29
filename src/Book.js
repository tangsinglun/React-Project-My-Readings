import React, { Component } from 'react';
import BookStatus from './BookStatus';
import PropTypes from 'prop-types';
import './App.css';


class Book extends Component {
  
  constructor(props){
    super(props);         
  }

    /*Proptypes For data type and function Error handling.
  */
  static propTypes = {
    singlebook: PropTypes.object.isRequired,
    shelf: PropTypes.string.isRequired, 
    bookId: PropTypes.string.isRequired,  
    onhandleChange: PropTypes.func.isRequired 
  }    

  onhandleChange = (bookshelf) => {
 
   if (this.props.onhandleChange) {
      this.props.onhandleChange(this.props.bookId, bookshelf);
   }
  }    
   

  render() {

    const {singlebook, shelf, bookId} = this.props;

    let urlLink;
    
  /*This statement checks the thumbnail links for the book to avoid "undefined" error. 
  */
    if (typeof singlebook.imageLinks === "undefined") {
      urlLink = "";
    }
    else {
      urlLink = (singlebook.imageLinks.thumbnail === null) ? "" : singlebook.imageLinks.thumbnail;
    }

    var divStyle = {
      width: 128,
      backgroundImage: 'url(' + urlLink + ')',
      height: 193      
    };


    return (
            <li key={bookId}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={divStyle}></div>
                  <BookStatus title={singlebook.title} shelf={shelf} onhandleChange={this.onhandleChange}/>
                </div>
                <div className="book-title">{singlebook.title}</div>
                <div className="book-authors">{singlebook.authors}</div>
              </div>
            </li>                                        
    		)
  }
}

export default Book;
