import React from 'react';
import UserCont from './UserCont';

const Home = () => {
  let set1 = new Set(["sumit","sumit","amit","anil","anish"]); 
  console.log("yyyyyyyyyyyyyyyyyyyyyyyy", set1);

  [...set1].map(item => {
    console.log(item);

  })

    return(
      <div className="app">
        <UserCont />
      </div>
    )
}

export default Home;