// hook adalah sebuah utility function dengan prinsip react atau modular react function yang dapat digunakan berkali kali pada project lain

//  "creating react custom hooks is much like creating utility functions for react that you can use in various projects in the future. essentially, react custom hooks are recipes that you can share" -> dave gray

import { useState,useEffect } from "react";

// membuat custom hook
const useWindowSize = () => {
    // initial state
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    })


    // membuat sebuah function yang akan berjalan ketika window diload, function akan menjalankan handleResize, event listener ditambahkan pada window sehingga ketika ukuran window berubah akan memanggil kembali handleResize. yg terakhir mereturn function cleanUp untuk mereset event listener pada window untuk menghemat memory 
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }        

        handleResize();

        window.addEventListener(`resize`, handleResize);

        // function dibawah digunakan untuk mereset event listener untuk menghemat memory 
        return () =>  window.removeEventListener(`resize`,handleResize);
    },[])

    return windowSize;
}

export default useWindowSize;