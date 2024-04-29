import React from 'react'
import BookList from './BookList';
import SearchBook from './SearchBook';
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class BooksApp extends React.Component {
  
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books : [],
    shelf : ['currentlyReading','read','wantToRead'],
    shelfLongName : ['Currently Reading','Read','Want To Read']
  }

  componentDidMount(){

    if(sessionStorage.getItem('dataFetch') === null) {

      /*Fetch Data from Books API Provided by Udacity. Please Note: Data Only Fetches One Time For each Sessions.*/

      BooksAPI.getAll()
        .then((books) => {
            this.setState(() => ({
              books: books           
            }))
            return books;
        }).then((books) => {
          /*Clone the Books Record For Data Manupulation.*/
          this.cloneBooks = this.cloneBooks();
          /*Data Stored in Session Variables So Data Persists even if The browser Refreshes.*/
          sessionStorage.setItem('localBooks',JSON.stringify(books));
          sessionStorage.setItem('localCloneBooks',JSON.stringify(this.cloneBooks));
          sessionStorage.setItem('dataFetch',true);
        }) 
      } 
      else {
        /*Retrieve Data From the Session Variables.*/
        let sessionBooks = sessionStorage.getItem('localBooks');   
        let sessionCloneBooks = sessionStorage.getItem('localCloneBooks'); 
        this.cloneBooks = JSON.parse(sessionCloneBooks);
        this.setState({ books: JSON.parse(sessionBooks) });         
      }
  }  


  /*This Function updates the books record and renders the screen, mainly for 2 criterias
    1. When User types in the key in the search box.
    2. When the User chooses the book shelf for each book.
  */
  handleSubmit = (key, shelf) => {

    this.cloneBooks = this.updateBookShelf(key, shelf);

    this.setState(({ 
      books: this.cloneBooks
    	}), () => {      		           
        sessionStorage.setItem('localBooks',JSON.stringify(this.cloneBooks));
      }); 
  }  

  /*This Function adds new book from the search result to the book shelf.
  */
  handleAddNew = (key, shelf, addedBook) => {
       
    const checkBook = this.cloneBooks.filter(cb => cb.id === key);

    if (checkBook.length === 0){      
      if (addedBook.length === 1) 
              this.cloneBooks = [...this.cloneBooks, addedBook[0]];
    }
    else {
      this.cloneBooks = this.updateBookShelf(key, shelf);
    }
    
    this.setState(({ 
      books: this.cloneBooks
    	}), () => {      		           
        sessionStorage.setItem('localBooks',JSON.stringify(this.cloneBooks));
      }); 

  }  

  /*This Function updates the book shelf.
  */
  updateBookShelf = (key, shelf) => {
      let tempBooks = [];
      tempBooks = this.cloneBooks.map(cb => {
        if (cb.id === key) {
          cb.shelf = shelf;                      
        }
        return cb;
      });  
      return tempBooks;
  }  

    /*This Function clones the books record for data manupulation.
  */
  cloneBooks = () => {
    let tempBooks = [];
    this.state.books.forEach (book => {
        const singleBook = {...book};
        tempBooks = [...tempBooks, singleBook];
    })
    return tempBooks;
  }

  render() {    

    return (      
      <div className="app">
          <Route exact path='/' render={() => (
                  <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                  <div className="list-books-content">
                    <div>
                      {this.state.shelf.map((shelf, index) => (
                        <BookList onhandleChange={this.handleSubmit} books={this.state.books} shelf={shelf} shelfName={this.state.shelfLongName[index]}/>
                      ))} 
                    </div>
                  </div>
                  <div>
                    <Link
                        to='/searchBook'
                        className='open-search'
                    >Add a book</Link>                    
                  </div>
                </div> 
          )} />  
          <Route path='/searchBook' render={() => (
                <SearchBook onhandleAddNew={this.handleAddNew}  books={this.state.books}/>
          )} />   
      </div>
    )
  }
}

export default BooksApp
