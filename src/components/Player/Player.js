import React, {useState, useRef, useEffect} from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap'
import { FaForward, FaPlay, FaPause, FaBackward } from "react-icons/fa";

const Player = (props) => {
    const audioEl = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(()=> {
        if (isPlaying) {
            audioEl.current.play();
        } else {
            audioEl.current.pause();
        }
    });

    const SkipSong = (forwards = true) => {
        if(forwards) {
            props.setCurrentSongIndex(()=> {
                let temp = props.currentSongIndex;
                temp++;

                if (temp>props.songs.length - 1) {
                    temp = 0;
                }

                return temp;
            });
        } else {
            props.setCurrentSongIndex(()=> {
                let temp = props.currentSongIndex;
                temp--;

                if (temp < 0) {
                    temp = props.songs.length - 1;
                }

                return temp;
            });
        }
    }

    return (
        <Container >
            <Row>
                <Col className="d-flex justify-content-center mt-2 mb-5">
                    <audio src={props.songs[props.currentSongIndex].src}  ref={audioEl}></audio>
                    <Card className="player_container" style={{ width: '18rem' }}>
                        <div className="song_image_container mt-3">
                            <Card.Img className="song_image"  src={props.songs[props.currentSongIndex].image} alt={props.songs[props.currentSongIndex].title} />
                        </div>
                        <Card.Body>
                            <Card.Title className="song_title text-center">{props.songs[props.currentSongIndex].title}</Card.Title>
                            <Card.Title className="song_artist text-center"> {props.songs[props.currentSongIndex].artist}</Card.Title>
                            <div className="song_controls mt-4 mb-4">
                                <button className="fas" onClick={()=> SkipSong(false)}> <FaBackward /> </button>
                                <button className="fas main_button" onClick={()=> setIsPlaying(!isPlaying)}>{isPlaying ? <FaPause/> :<FaPlay/>}</button>
                                <button className="fas" onClick={()=> SkipSong()}><FaForward/></button>
                            </div>
                            <Card.Text className="next_song text-center"><strong>Next Up:</strong> {props.songs[props.nextSongIndex].title} by {props.songs[props.nextSongIndex].artist}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Player
