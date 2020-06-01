import React, { useState, useEffect, FunctionComponent, MouseEvent } from 'react';
import axios from 'axios';
import { IBook } from '../interfaces/Interfaces';


type IBookProps = {
    bookList: IBook[]
}

const Books: FunctionComponent<IBookProps> = ({ bookList }) => {


    const bookInfo = (id: string) => {
        console.log(id)
    }

    let books = bookList.map((book, index) => {
            return <div key={index} className="bookContainer" onClick={() => {bookInfo(book._id)}}>
                    <span className="bookName">{index = index + 1}. {book.name}</span><span>{book.author}</span><span>{book.language}</span><span>{book.isFinished}</span>
                </div>
        })

    return (
        <div className="list">
            <div className="bookContainer bcTitle" >
                <span>Name</span><span>Author</span><span>Language</span><span>Date</span>
            </div>
            {books}
        </div>
    )
    
}   

export default Books;