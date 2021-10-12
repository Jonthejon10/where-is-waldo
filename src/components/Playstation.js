/* eslint-disable no-unused-vars */
import React, {useEffect, useImperativeHandle, useReducer, useState} from 'react'
import Modal from 'react-modal'
import { useHistory } from 'react-router-dom'
import Stopwatch from './Stopwatch'
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
    const [users, setUsers] = useState([])
    
    const [time, setTime] = useState(0)
    const [stopTimer, setStopTimer] = useState(false)

    const [dropdown, setDropdown] = useState(false)

    const [yPos, setYPos] = useState()
    const [xPos, setXPos] = useState()
    
    const [characterSelection, setCharacterSelection] = useState()

    const [characterPosition, setCharacterPosition] = useState([])

    const [modalOpen, setModalOpen] = useState(false)
    const [input, setInput] = useState('')

    useEffect(() => {
        getUsers()
        getCharacterPosition()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getCharacterPosition = async () => {
        const querySnapshot = await getDocs(collection(db, 'data'))
        querySnapshot.forEach((doc) => {
            setCharacterPosition(prevState => ([...prevState,
            {
                name: doc.id,
                xStart: doc.data().xStart,
                xEnd: doc.data().xEnd,
                yStart: doc.data().yStart,
                yEnd: doc.data().yEnd
            }
            ]))
        })
    }

    const ulClick = (e) => {
        setCharacterSelection(e.target.textContent)
    }
    // check for correct click
    const checkForGuess = () => {
        if (characterSelection !== undefined) {
            if (xPos > characterPosition[2].xStart && xPos < characterPosition[2].xEnd && yPos > characterPosition[2].yStart && yPos < characterPosition[2].yEnd && characterSelection === 'Tommy') {
                setCharacters([...characters], characters[0].found = true)
                setDropdown(!dropdown)
            } else if (xPos > characterPosition[1].xStart && xPos < characterPosition[1].xEnd && yPos > characterPosition[1].yStart && yPos < characterPosition[1].yEnd && characterSelection === 'Kratos') {
                setCharacters([...characters], characters[1].found = true)
                setDropdown(!dropdown)
            } else if (xPos > characterPosition[0].xStart && xPos < characterPosition[0].xEnd && yPos > characterPosition[0].yStart && yPos < characterPosition[0].yEnd && characterSelection === 'Dante') {
            setCharacters([...characters], characters[2].found = true)
            setDropdown(!dropdown)
            }
        }
    }

    // click coordinates and dropdown menu
    const handleClick = (e) => {
        setYPos(e.pageY)
        setXPos(e.pageX)

        setDropdown(!dropdown)
    }


    // user name input
    const handleSubmit = (e) => {
        e.preventDefault()

        setUsers(prevState => ([...prevState,
            {
                name: input,
                time: time,
            }
        ]))

        addUser()
        
    }
    

    const checkForGameOver = () => {
        // checks for no characters left
        if (characters.every(x => x.found)) {
            return (
                setStopTimer(true),
                setModalOpen(true)
                )
            }
        }
        
    useEffect(() => {
        checkForGuess()
        checkForGameOver()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [characterSelection])
    
    const getSeconds = `0${(time % 60)}`.slice(-2)  // formatting for time display
    const minutes = `${Math.floor(time / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    
    // database
    const firebaseApp = initializeApp({
        apiKey: "AIzaSyCc6qLSfNbwMDJz_Gw8O1xxrrTD-CfloF0",
        authDomain: "where-is-waldo-48ef7.firebaseapp.com",
        projectId: "where-is-waldo-48ef7",
        storageBucket: "where-is-waldo-48ef7.appspot.com",
        messagingSenderId: "925232073829",
        appId: "1:925232073829:web:79b0d7d714296450818a8c"
    })
    
    const db = getFirestore()

    // get users from database
    const getUsers = async () => {
        const querySnapshot = await getDocs(collection(db, 'users'))
        querySnapshot.forEach((doc) => {
            setUsers(prevState => ([...prevState,
                {
                    name: doc.id,
                    time: doc.data().time,
                }
            ]))
        })
    }


    // add user to database
    const addUser = async () => {
        try {
            await setDoc(doc(db, 'users', input), {
                time: time,
            })
        } catch (error) {
            console.error('Error adding document: ', error)
        }
    }

    const sortedUsers = users.sort((a, b) => parseFloat(a.time) - parseFloat(b.time)); // sorting users by time

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

                    <Stopwatch setTime={setTime} stopTimer={stopTimer} />
                    
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
                        <h2> Your time is {getMinutes}:{getSeconds}</h2>

                        <div className='user-input'>
                            <p> Enter your name below to join the rankings: </p>
                            <input type='text' value={input} onChange={(e) => setInput(e.target.value)}/>
                            <button type='submit' onClick={(e) => handleSubmit(e)}>Submit</button>
                        </div>

                        <h3>Here are our high scores so far:</h3>
                        
                        <div className='modal-highscores'>
                            {
                                sortedUsers.map((user, index) => {
                                    const getUserSeconds = `0${(user.time % 60)}`.slice(-2)
                                    const userMinutes = `${Math.floor(user.time / 60)}`
                                    const getUserMinutes = `0${userMinutes % 60}`.slice(-2)
                                    
                                    return (
                                        <li className='highscores-list' key={index}>
                                            <ul>
                                                <div className='user-highscores'>
                                                <p>{user.name}</p> &nbsp;
                                                <p>{getUserMinutes}:{getUserSeconds}</p>
                                                
                                                </div>
                                            </ul>
                                        </li>
                                    )
                                })
                            }

                        </div>
                        
                </Modal>

                </div>
                
            </div>
        </div>
    )
}

export default Playstation