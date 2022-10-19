import React, { useEffect } from 'react'
import useStorage from '../../Storage/useStorage'
import {ProgressBar} from 'react-bootstrap'

const ProgressB = ({file,setFile,setUrl}) => {
    const { url, progress } = useStorage(file);
    // console.log(progress, url);
    // setUrl(url);

    useEffect(()=> {
        if(url){
            setFile(null);
            setUrl(url);
        }
    }, [url,setFile])

    return (
        <>
        <ProgressBar variant="success" now={progress} label={`${progress}%`} />
        </>
        )
}

export default ProgressB
