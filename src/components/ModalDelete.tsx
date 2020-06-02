import React, { useState, useEffect, FunctionComponent} from 'react';
import { IBook } from '../interfaces/Interfaces';
import axios from 'axios';

type ModalProps = {
    book: IBook,
    delBook: Function
}

const ModalDelete: FunctionComponent<ModalProps> = ({ book, delBook }) => {
    
    const [show, setShow] = useState<IBook | null>();

    useEffect(() => {
        
        setShow(book);
    }, [book])

    const submit = () => {
        axios.delete(`http://localhost:5000/api/v1/books/${book._id}`)
        delBook(book._id);
        setShow(null);
    }

    const cancel = () => {
        setShow(null);
    }

    if(show) {
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

