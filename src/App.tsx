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

  const handleAddBooks = (book: IBook) => {
    setBooks([...books, book])
  }

  const handleDeleteBooks = (bookId: string) => {
      setBooks(books.filter(e => e._id != bookId ))
  }

  useEffect(() => {
    getBooks();
  }, [])

  useEffect(() => {
    setBooks(books)
  }, [books])

  return (
    <div className="App">
        <AddBook 
          sendNewBook={handleAddBooks}
        />
        <Books 
          bookList={books}
          deleteBook={handleDeleteBooks}

          />
    </div>
  );
}

export default App;
