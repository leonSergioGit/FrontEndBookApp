import React, { useState, useEffect, FunctionComponent, FormEvent } from 'react';
import { IBook } from '../interfaces/Interfaces';
import axios from 'axios';

type ModalProps = {
    book: IBook,
    editBook: Function,
    setOpenEdit: Function,
    openEdit: boolean
}






const ModalEdit:FunctionComponent<ModalProps> = ({ book, editBook, setOpenEdit, openEdit }) => {

        const [show, setShow] = useState<IBook | null>();


        //State of the component
        const [bookName, setBookName] = useState("");
        const [bookAuthor, setBookAuthor] = useState("");
        const [bookLanguage, setBookLanguage] = useState("");
        const [bookIsFinished, setBookIsFinished] = useState("")
        const [date, setDate] = useState<Date>(new Date);
    
    
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
            setBookIsFinished(evt.currentTarget.value)
            console.log(typeof bookIsFinished)
        }

        const handleDate = (evt: FormEvent<HTMLInputElement>) => {
            setDate(new Date(evt.currentTarget.value));
        }


    const submit = async () => {
        let editedBook = await axios.put(`http://localhost:5001/api/v1/books/${book._id}`, {_id: book._id, name: bookName, author: bookAuthor, language: bookLanguage, isFinished: bookIsFinished, date: date})
        editBook(JSON.parse(editedBook.config.data));
        setOpenEdit(false)
    }

    const cancel = () => {
        setOpenEdit(false);
    }

    if(openEdit) {
        return (
            <div className="modal">
                <h3>Do you wish to edit this book from the database?</h3>
                <form>
                    <div><label htmlFor="">Name: </label> <input type="text" onChange={handleName} value={bookName || ""} name="name"/></div>
                    <div><label htmlFor="">Author: </label> <input type="text"  onChange={handleAuthor} value={bookAuthor || ""} name="author"/></div>
                    <div><label htmlFor="">Language </label> <input type="text"  onChange={handleLanguage}  value={bookLanguage || ""}  name="language" /></div>
                    <div><label htmlFor="">Date </label> <input type="date" onChange={handleDate} name="date" /></div>
                    <div>
                        <label htmlFor="">Finished: </label> 
                            <label htmlFor="">Yes </label><input type="radio" name="isFinished" value="true" onChange={handleRadio || ""} />
                            <label htmlFor="">No</label><input type="radio" name="isFinished"  value="false" onChange={handleRadio || ""} />
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