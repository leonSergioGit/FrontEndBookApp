import React, { useState, useEffect, FunctionComponent} from 'react';
import { IBook } from '../interfaces/Interfaces';

type infoProps = {
    books: IBook[]
}

const GeneralInfo: FunctionComponent<infoProps> = ({ books }) => {

    const [japaneseBooks, setJapaneseBooks] = useState(0);
    const [englishBooks, setEnglishBooks] = useState(0);
    const [frenchBooks, setFrenchBooks] = useState(0);
    const [spanishBooks, setSpanishBooks] = useState(0);
    const [finishedBooks, setFinishedBooks] = useState(0);
    const [numberOfBooksPerYear, setNumberOfBooksPerYear] = useState<object[]>();
    const [showStatistics, setShowStatistics] = useState(false);

    useEffect(() => {
        
    }, [])

    useEffect(() => {
        setJapaneseBooks(counterOfBooks('japanese'))
        setSpanishBooks(counterOfBooks('spanish'))
        setEnglishBooks(counterOfBooks('english'))
        setFrenchBooks(counterOfBooks('french'))
        setNumberOfBooksPerYear(booksReadPerYear());
      

    }, [books])


    //Function that returns an array of objects with all the books read per year
    const booksReadPerYear = () : object[] => {
        let years:number[] = yearsList();

        let booksPerYear:object[] = [];


        years.forEach((book, index) => {
            let yearNumberOfBooks:object = {};
            let counter:number = 0;
            books.forEach((bks, indx) => {
                let parsedDate = bks.date.toLocaleString().split("T")[0];
                let parsed2 = parsedDate.split("-");
                if(book.toString() === parsed2[0]){
                    counter++;
                }
            })

            Object.defineProperty(yearNumberOfBooks, `${book}`, {
                value : counter,
                writable : true,
                enumerable : true,
                configurable : true
            })

            booksPerYear.push(yearNumberOfBooks);
        })

        return booksPerYear;
    }

    //Function that returns an array with the number of years books have been read
    const yearsList = () : number[] => {
        let years:number[] = [];

        books.forEach((book, index) => {
            let parsedDate = book.date.toLocaleString().split("T")[0];
            let parsed2 = parsedDate.split("-");
    
            if(!years.includes(parseInt(parsed2[0]))){
                years.push(parseInt(parsed2[0]));
            }
        })

        years.sort((a, b) => a - b);
        return years;
    }




    const counterOfBooks = (language: string) : number => {
        let counter:number = 0;
        switch(language){
            case 'japanese': {
                for(let i = 0; i < books.length; i++){
                    if(books[i].language === 'Japanese'){
                        counter++;
                    }
                }
                return counter;
            }
            case 'english': {
                for(let i = 0; i < books.length; i++){
                    if(books[i].language === 'English'){
                        counter++;
                    }
                }
                return counter;
            }
            case 'spanish': {
                for(let i = 0; i < books.length; i++){
                    if(books[i].language === 'Spanish'){
                        counter++;
                    }
                }
                return counter;
            }
            case 'french': {
                for(let i = 0; i < books.length; i++){
                    if(books[i].language === 'French'){
                        counter++;
                    }
                }
                return counter;
            }
            default: {
                return books.length;
            }
        }
        return 0;
    }

    let yearComponent;

    if(showStatistics && numberOfBooksPerYear) {
        console.log(numberOfBooksPerYear)
        yearComponent = numberOfBooksPerYear?.map((year, index) => {
            console.log(year)
            return <div className="yearContainer">
                <span className="year">{Object.keys(year)}:</span><span className="booksRead">{Object.values(year)} books read</span>
            </div>
        })
    }

    return (
        <div className="generalInfo">
            <div className="generalInfoContainer">
                <div>Japanese Books: {japaneseBooks}</div>
                <div>Spanish Books: {spanishBooks}</div>
                <div>English Books: {englishBooks}</div>
                <div>French Books: {frenchBooks}</div>
                <div>Total Books: {books.length}</div>


            </div>
            <button className='showStatistics' onClick={() => setShowStatistics(!showStatistics)}>Show Statistics per year</button>
            {yearComponent}
        </div>
    )
}

export default GeneralInfo;