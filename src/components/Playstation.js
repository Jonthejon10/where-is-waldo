/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import Modal from 'react-modal'
import { useHistory } from 'react-router-dom'
import { initializeApp } from "firebase/app"
import { getFirestore, collection, doc, getDocs, setDoc} from "firebase/firestore"
import '../styles/Playstation.css'

Modal.setAppElement('#root')

const Playstation = () => {
    const history = useHistory();

    const [characters, setCharacters] = useState([
        {
            name: 'Tommy',
            image: 'tommy',
            found: false
        },
        {
            name: 'Kratos',
            image: 'kratos',
            found: false
        },
        {
            name: 'Dante',
            image: 'dante',
            found: false
        }
    ])
    
    const [dropdown, setDropdown] = useState(false)

    const [yPos, setYPos] = useState()
    const [xPos, setXPos] = useState()
    
    const [characterSelection, setCharacterSelection] = useState()

    const ulClick = (e) => {
        setCharacterSelection(e.target.textContent)

    }

    const checkForGuess = () => {
        if (xPos > 1092 && xPos < 1233 && yPos > 1885 && yPos < 2030 && characterSelection === 'Tommy') {
            setCharacters([...characters], characters[0].found = true)
            setDropdown(!dropdown)
        } else if (xPos > 290 && xPos < 427 && yPos > 1887 && yPos < 2033 && characterSelection === 'Kratos') {
            setCharacters([...characters], characters[1].found = true)
            setDropdown(!dropdown)
        } else if (xPos > 391 && xPos < 535 && yPos > 2230 && yPos < 2368 && characterSelection === 'Dante') {
            setCharacters([...characters], characters[2].found = true)
            setDropdown(!dropdown)
        }

    }

    const handleClick = (e) => {
        setYPos(e.pageY)
        setXPos(e.pageX)

        setDropdown(!dropdown)
    }

    const [modalOpen, setModalOpen] = useState(false)

    const checkForGameOver = () => {
        if (characters.every(x => x.found)) {
            return (
                setModalOpen(true)
                )
            }
        }
        
    useEffect(() => {
        checkForGuess()
        checkForGameOver()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [characterSelection])
        
    const firebaseApp = initializeApp({
        apiKey: "AIzaSyCc6qLSfNbwMDJz_Gw8O1xxrrTD-CfloF0",
        authDomain: "where-is-waldo-48ef7.firebaseapp.com",
        projectId: "where-is-waldo-48ef7",
        storageBucket: "where-is-waldo-48ef7.appspot.com",
        messagingSenderId: "925232073829",
        appId: "1:925232073829:web:79b0d7d714296450818a8c"
    })
    
    const db = getFirestore()

    return (
        <div className='playstation-container'>
            
            {dropdown &&
                <div className='dropdown'
                style={{
                    top: `${yPos}px`,
                    left: `${xPos}px`,
                }}
                >
                    <li className='dropdown-list'>
                        <ul onClick={ulClick}>Tommy</ul>
                        <ul onClick={ulClick}>Kratos</ul>
                        <ul onClick={ulClick}>Dante</ul>
                    </li>
                </div>
            }
            <img src={require('../images/ps2.jpg').default} alt='ps2' className='ps2-image' onClick={(e) => handleClick(e)} />

            <div className='playstation-info-container'>
                <div className='sticky-info'>
                    <button className='back-button' onClick={() => history.push("/where-is-waldo/")}></button>
                    {
                        characters.map((char, index) => {
                            let divClass = char.found ? 'found-character-info' : 'character-info'
                            return ( 
                                <div key={index} className={divClass}>
                                    <div className='character-image'>
                                        <img src={require('../images/' + char.name + '.png').default} alt={char.name} />
                                    </div>
                                    <p>{char.name}</p>
                                </div>
                                
                            )
                        })
                    }

                <Modal
                    isOpen={modalOpen}
                    onRequestClose={() => setModalOpen(false)}
                    shouldCloseOnOverlayClick={true}
                    className="modal"
                    overlayClassName="overlay"
                    >
                        <button type='button' onClick={() => setModalOpen(false)} className='modal-close-button'></button>

                        <h1>Congrats ! You found them all !</h1>
                        <h2> Your time is: </h2>

                        <div className='user-input'>
                            <p> Enter your name below to join the rankings: </p>
                            <input type='text'></input>
                            <button type='submit'>Submit</button>
                        </div>

                        <h3>Here are our high scores so far:</h3>
                        
                        <div className='modal-highscores'>
                            

                        </div>
                        
                </Modal>

                </div>
                
            </div>
        </div>
    )
}

export default Playstation