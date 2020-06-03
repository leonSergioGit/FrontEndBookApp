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

    useEffect(() => {
        setJapaneseBooks(counterOfBooks('japanese'))
        setSpanishBooks(counterOfBooks('spanish'))
        setEnglishBooks(counterOfBooks('english'))
        setFrenchBooks(counterOfBooks('french'))


    }, [books])

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

    return (
        <div>
            {japaneseBooks}
        </div>
    )
}

export default GeneralInfo;