import React, { useState, useEffect, FunctionComponent, FormEvent } from 'react';
import { IBook } from '../interfaces/Interfaces';
import axios from 'axios';

type ModalProps = {
    book: IBook,
    editBook: Function
}
//NEXT STEPS: SEND EDIT BOOK TO PARENT TO SHOW CHANGES AUTOMATICALLY
              //FIX THE PROBLEM WITH THE BUTTONS


const ModalEdit:FunctionComponent<ModalProps> = ({ book, editBook }) => {

        const [show, setShow] = useState<IBook | null>();


        //State of the component
        const [bookName, setBookName] = useState("");
        const [bookAuthor, setBookAuthor] = useState("");
        const [bookLanguage, setBookLanguage] = useState("");
        const [bookIsFinished, setBookIsFinished] = useState<boolean | string>(); 
    
    
        useEffect(() => {
            setShow(book);
            setBookName(book?.name)
            setBookAuthor(book?.author)
            setBookLanguage(book?.language)
            setBookIsFinished(book?.isFinished)

        }, [book])

        

    
        /************  HANDLE FORM ****************/
        const handleName = (evt: FormEvent<HTMLInputElement>) => {
            setBookName(evt.currentTarget.value);
            console.log(typeof bookIsFinished)
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



    const submit = () => {
        axios.put(`http://localhost:5000/api/v1/books/${book._id}`, { name: bookName, author: bookAuthor, language: bookLanguage, isFinished: bookIsFinished})
        editBook();
        setShow(null);
    }

    const cancel = () => {
        setShow(null);
        console.log("hola")
    }

    if(show) {
        return (
            <div className="modal">
                <h3>Do you wish to edit this book from the database?</h3>
                <form>
                    <div><label htmlFor="">Name: </label> <input type="text" onChange={handleName} value={bookName} name="name"/></div>
                    <div><label htmlFor="">Author: </label> <input type="text"  onChange={handleAuthor} value={bookAuthor} name="author"/></div>
                    <div><label htmlFor="">Language </label> <input type="text"  onChange={handleLanguage}  value={bookLanguage} name="language" /></div>
                    <div>
                        <label htmlFor="">Finished: </label> 
                            <label htmlFor="">Yes </label><input type="radio" name="isFinished" value="true" onChange={handleRadio} checked={bookIsFinished == "true" ? true : false}/>
                            <label htmlFor="">No</label><input type="radio" name="isFinished"  value="false" onChange={handleRadio} checked={bookIsFinished == "false" ? true : false}/>
                    </div>
                </form>
                <button onClick={submit}>Yes</button><button onClick={cancel}>No</button>
            </div>
        )
    } else {
        return <div>

        </div>;
    }
}

export default ModalEdit;