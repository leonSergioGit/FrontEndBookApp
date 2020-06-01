import React, { useState, useEffect, FunctionComponent } from 'react';
import axios from 'axios';
import { IAppProps, IAppState, IBook } from './interfaces/Interfaces';

import Books from './components/Books';
import AddBook from './components/AddBook';
import './App.css';





const App: FunctionComponent<IAppProps> = props  => {

  
  const [books, setBooks] = useState<IBook[]>([]);


  const getBooks = async () => {
      let bookList = await (await axios.get('http://localhost:5000/api/v1/books/')).data.data;
      setBooks(bookList);
  }

  const handleChild = (book: any) => {
    setBooks([...books, book])
  }

  useEffect(() => {
    getBooks();
    console.log("hola")
  }, [])

  useEffect(() => {
    console.log(books)
    setBooks(books)
  }, [books])

  return (
    <div className="App">
        <AddBook 
          sendNewBook={handleChild}
        />
        <Books bookList={books}/>
    </div>
  );
}

export default App;
