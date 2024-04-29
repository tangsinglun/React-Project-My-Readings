import React, { Component } from 'react';
import './App.css';


class BookStatus extends Component {
  
  constructor(props){
    super(props);    
  }

  onhandleChange = (e, title) => {

    e.preventDefault()

     alert('Book ' + title + ' has been set to ' + e.target.value)

    if (this.props.onhandleChange) {
      this.props.onhandleChange(e.target.value)
    }
  }
  

  render() {

    const {shelf, title} = this.props;

    return (<div className="book-shelf-changer">
                    <select value={shelf} onChange={(e) => this.onhandleChange(e, title)}>
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
            </div>            
    		)
  }
}

export default BookStatus;
