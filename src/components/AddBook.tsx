import React, { useState, useEffect, FunctionComponent, MouseEvent, FormEvent } from 'react';
import axios from 'axios';
import { IBook } from '../interfaces/Interfaces';


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

    /***********************************************/



    const submit = async (e: MouseEvent) => {
        e.preventDefault();
        let addBook = await axios.post("http://localhost:5000/api/v1/books/", { name: bookName, author: bookAuthor, language: bookLanguage, isFinished: bookIsFinished});
        sendNewBook( JSON.parse(addBook.request.response).data);
    }

    return (
        <div>
            <h1>Add book to the database</h1>
           <form>
                <div><label htmlFor="">Name: </label> <input type="text" onChange={handleName} name="name"/></div>
                <div><label htmlFor="">Author: </label> <input type="text" onChange={handleAuthor} name="author"/></div>
                <div><label htmlFor="">Language </label> <input type="text" onChange={handleLanguage} name="language" /></div>
                <div>
                    <label htmlFor="">Finished: </label> 
                        <label htmlFor="">Yes </label><input type="radio" name="isFinished" value="true" onChange={handleRadio}/>
                        <label htmlFor="">No</label><input type="radio" name="isFinished"  value="false" onChange={handleRadio} checked/>
                </div>
                <button onClick={submit}>Submit</button>
           </form>
        </div>
    )
}

export default AddBook; 