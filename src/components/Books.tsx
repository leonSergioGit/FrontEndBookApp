import React, { useState, useEffect, FunctionComponent, MouseEvent } from 'react';
import axios from 'axios';
import { IBook } from '../interfaces/Interfaces';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';


type IBookProps = {
    bookList: IBook[],
    deleteBook: Function
}

const Books: FunctionComponent<IBookProps> = ({ bookList, deleteBook }) => {

    const [selectedBook, setBook] = useState<IBook | any>();
    const [AllBooks, setBooks] = useState<IBook[]>();
    const [isEditing, setIsEditing] = useState<IBook | any>();


    const bookInfo = (book: IBook) => {
        setBook(book);
    }

    const edit = (book: IBook) => {
        setIsEditing(book);
        console.log(isEditing)
    }

    useEffect(() => {
        setBooks(bookList);
    }, [bookList])



    const deleteBooks = (id: string) => {
        deleteBook(id);
    }

    const editBook = (book: IBook) => {
        console.log(book)
    }


    let books; 
    

    if(AllBooks){
        books = AllBooks.map((book, index) => {
            return <div key={index} className="bookContainer">
                    <span className="bookName">{index = index + 1}. {book.name}</span>
                    <span>{book.author}</span>
                    <span>{book.language}</span>
                    <span>{book.isFinished}</span>
                    <span>
                        <button onClick={() => {bookInfo(book)}}>Delete</button>
                        <button onClick={() => {edit(book)}}>Update</button>
                    </span>
                </div>
        })
    }


    return (
        <div className="list">
            <div className="bookContainer bcTitle" >
                <span>Name</span><span>Author</span><span>Language</span><span>Date</span><span></span>
            </div>
            <ModalDelete
                book={selectedBook}
                delBook={deleteBooks}
            />
            <ModalEdit
                book={isEditing}
                editBook={editBook}
            />
            {books}
        </div>
    )


    
}   

export default Books;