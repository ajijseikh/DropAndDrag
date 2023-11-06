import React, { useEffect } from 'react';
// import './App.css';
// import "./Preview.css"

// function Preview() {
//   const text = "Write and select the word and underline the words then to convert them into blank space using React.js and Tailwind CSS";

//   const words = text.split(' ');

//   return (
//     <div className="text-underline">
//       {words.map((word, index) => (
//         <span key={index} className={word === 'word' ? 'underline' : 'hidden'}>
//           {word}
//         </span>
//       ))}
//     </div>
//   );
// }

// export default Preview;



const Post = () => {


    useEffect(()=>{
      
    },[])

    const handleMouseUp=()=>{
        
        console.log(`Selected text: ${window.getSelection().toString()}`);
         const data= window.getSelection().toString()
         return data
    }
    console.log(handleMouseUp());
    return (
        <div>
        <div onMouseUp={handleMouseUp}>Text is now good my life good</div>

        <span><button onClick={handleMouseUp}>butt{handleMouseUp}</button></span>
        </div>
        
    );
}

export default Post;
