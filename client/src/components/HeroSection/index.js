import React, {useState} from 'react'
import Video from '../../videos/video.mp4'
import {HeroContainer, HeroBg, VideoBg, HeroContent, HeroH1, HeroP, HeroBtnWrapper, ArrowRight, ArrowForward} from './HeroElements'
import {Button} from '../ButtonElement'

const HeroSection = () => {
    const [hover,setHover] = useState(false)

    const onHover =()=>{
        setHover(!hover)
    }

    return (
        <HeroContainer>
            <HeroBg>
                <VideoBg autoplay loop muted src={Video} type='video/mp4'/>
            </HeroBg>
            <HeroContent>
                <HeroH1>
                    Peer Learning made easy
                </HeroH1>
                <HeroP>
                    Sign up and connect with students from everywhere
                </HeroP>
                <HeroBtnWrapper>
                    <Button to ='signup' onMouseEnter = {onHover} onMouseLeave = {onHover} >
                        Get started{hover ? <ArrowForward/> : <ArrowRight/>}
                    </Button>
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer>
    )
}

export default HeroSection
