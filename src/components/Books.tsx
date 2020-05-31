import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IBookProps, IBook } from '../interfaces/Interfaces';


const Books: React.SFC<IBookProps> = props => {

    const [books, setBooks] = useState<IBook[]>([]);

    const getBooks = async () => {
        let bookList = await (await axios.get('http://localhost:5000/api/v1/books/')).data.data;
        setBooks(bookList);
    }

    useEffect(() => {
        getBooks();
    }, [])

    console.log(books);
    if(books) {
        return (
            <section>
                <div>
                    {
                        books.map(book => (
                            <div>
                             <h3>{book.id}</h3>
                             <h3>{book.name}</h3>
                             <h3>{book.author}</h3>
                             <h3>{book.isFinished}</h3>
                            </div>
                        ))
                    }
                </div>
            </section>
         )
    } else {
        return (
            <h1>hola</h1>
        )
    }
    
}   

export default Books;