import React, {useState} from 'react'
import HeroSection from '../components/HeroSection'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const Home = () => {

const [isOpen, setisOpen] = useState(false)
const toggle =()=> {
    setisOpen(!isOpen)
}

    return (
        <>
            <Sidebar isOpen = {isOpen} toggle = {toggle}/>
            <Navbar toggle = {toggle}/>
            <HeroSection/>
        </>
    )
}

export default Home
