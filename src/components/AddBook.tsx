import React, { useState, useEffect, FunctionComponent, MouseEvent, FormEvent } from 'react';
import axios from 'axios';
import { IBook } from '../interfaces/Interfaces';

import '../App.css';



//Props interface
interface SendNewBook {
    sendNewBook: (arg: IBook) => void
}
  


const AddBook: FunctionComponent<SendNewBook> =  ( { sendNewBook } )  => {
 
    //State of the component
    const [bookName, setBookName] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");
    const [bookLanguage, setBookLanguage] = useState("");
    const [bookIsFinished, setBookIsFinished] = useState(false); 
    const [date, setDate] = useState<Date>(new Date);




    /************  HANDLE FORM ****************/
    const handleName = (evt: FormEvent<HTMLInputElement>) => {
        setBookName(evt.currentTarget.value);
    }

    const handleAuthor = (evt: FormEvent<HTMLInputElement>) => {
        setBookAuthor(evt.currentTarget.value);
    }

    const handleLanguage = (evt: FormEvent<HTMLInputElement>) => {
        setBookLanguage(evt.currentTarget.value);
    }

    const handleRadio = (evt: FormEvent<HTMLInputElement>) => {
        setBookIsFinished(evt.currentTarget.value === "true" ? true : false)
    }

    const handleDate = (evt: FormEvent<HTMLInputElement>) => {
        setDate(new Date(evt.currentTarget.value));
    }

    /***********************************************/



    const submit = async (e: MouseEvent) => {
        e.preventDefault();
        let addBook = await axios.post("http://localhost:5001/api/v1/books/", { name: bookName, author: bookAuthor, language: bookLanguage, isFinished: bookIsFinished, date: date});
        console.log(addBook)
        sendNewBook( JSON.parse(addBook.request.response).data);
    }

    return (
        <div className="addBookContainer">
            <h1>Add book to the database</h1>
           <form className="formAdd">
               <div className="inputGrid">
                <label htmlFor="">Name: </label> <input type="text" onChange={handleName} name="name"/>
                <label htmlFor="">Author: </label> <input type="text" onChange={handleAuthor} name="author"/>
                <label htmlFor="">Language: </label> <input type="text" onChange={handleLanguage} name="language" />
                <label htmlFor="">Date </label> <input type="date" onChange={handleDate} name="date" />
                </div>
                <div>
                    <label htmlFor="">Finished: </label> 
                        <label htmlFor="">Yes </label><input type="radio" name="isFinished" value="true" onChange={handleRadio}/>
                        <label htmlFor="">No</label><input type="radio" name="isFinished"  value="false" onChange={handleRadio} checked/>
                </div><br/>
                <button className="submitAdd" onClick={submit}>Submit</button>
           </form>
        </div>
    )
}

export default AddBook; 