import React, { useState, useEffect, FunctionComponent, MouseEvent } from 'react';
import axios from 'axios';
import { IBook } from '../interfaces/Interfaces';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';


type IBookProps = {
    bookList: IBook[],
    deleteBook: Function,
    handleEdit: Function
}

const Books: FunctionComponent<IBookProps> = ({ bookList, deleteBook, handleEdit }) => {

    const [selectedBook, setBook] = useState<IBook | any>();
    const [AllBooks, setBooks] = useState<IBook[]>();
    const [isEditing, setIsEditing] = useState<IBook | any>();

    const [isActive, setIsActive] = useState(false);

    const [isEditActive, setIsEditActive] = useState(false);


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
        let index;

        bookList.forEach((e, indx) => {
            if(e._id === book._id){
                index = indx;
            }
        })

        handleEdit(book, index);
    }


    let books; 
    

    if(AllBooks){
        books = AllBooks.map((book, index) => {
            let parsedDate = book.date.toLocaleString().split("T")[0];
            console.log(parsedDate)
            return <div key={index} className="bookContainer">
                    <span className="bookName">{index = index + 1}. {book.name}</span>
                    <span>{book.author}</span>
                    <span>{book.language}</span>
                    <span>{book.isFinished}</span>
                    <span>{parsedDate}</span>
                    <span className="editDelete">
                        <button onClick={() => {bookInfo(book); setIsActive(true)}}>Delete</button>
                        <button onClick={() => {edit(book); setIsEditActive(true)}}>Update</button>
                    </span>
                </div>
        })
    }


    return (
        <div className="list">
            <div className="bookContainer bcTitle" >
                <span>Name</span><span>Author</span><span>Language</span><span>Finished</span><span>Date</span><span></span>
            </div>
            <ModalDelete
                book={selectedBook}
                delBook={deleteBooks}
                setOpen={setIsActive}
                open = {isActive}
            />
            <ModalEdit
                book={isEditing}
                editBook={editBook}
                setOpenEdit={setIsEditActive}
                openEdit={isEditActive}
            />
            {books}
        </div>
    )


    
}   

export default Books;