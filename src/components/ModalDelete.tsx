import React, { useState, useEffect, FunctionComponent} from 'react';
import { IBook } from '../interfaces/Interfaces';
import axios from 'axios';

type ModalProps = {
    book: IBook,
    delBook: Function,
    setOpen: Function,
    open: boolean
}

const ModalDelete: FunctionComponent<ModalProps> = ({ book, delBook, open, setOpen }) => {
    
    const [show, setShow] = useState<IBook | null>();
    

    useEffect(() => {
        setShow(book);    
    }, [book])


    const submit = () => {
        axios.delete(`http://localhost:5001/api/v1/books/${book._id}`)
        delBook(book._id);
        setOpen(false)
        
    }

    const cancel = () => {
       setOpen(false)

    }

    if(open) {
        return (
            <div className="modal">
                <h3>Do you wish to delete this book from the database?</h3>
                <button onClick={submit}>Yes</button><button onClick={cancel}>No</button>
            </div>
        )
    } else {
        return <div>

        </div>;
    }


}

export default ModalDelete;

