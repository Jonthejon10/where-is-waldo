import React from 'react'
import '../styles/Home.css'
import {useHistory} from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const Home = () => {
    const history = useHistory();

    return (
        <div className='home-container'>
            <Navbar />
            <div className='level-container'>
                <div className='ps2-level'>
                    <button type='button' onClick={() => history.push("/where-is-waldo/playstation")} />
                    <h2>Playstation 2 level</h2>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Home