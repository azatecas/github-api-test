// import React from 'react';
// import { connect } from 'react-redux';
// import gitImg from '../img/github.png';
// import { fetchIndData } from '../store/actions';

// const UserCard = ({fetchIndData, userInfo, isFetchingInd, login, img}) => {

//     const  handleClick = async (e, login) => {
//         e.preventDefault();
//         e.stopPropagation();
        
//         if(await !userInfo){
//             fetchIndData(userInfo.login);
//         }
//     }


//     return (
//         <div className="user-card" onClick={async (e)=>{ await handleClick(e, login)}}>
//             <div className="card-bg1"/>

//             <div className="card-bg2"/>

//             <div className="card-info-cont">
//                 <img id="profile-img" src={img} alt={login} />
//                 <h3>{login}</h3> 
//                 <img id="logo" src={gitImg} alt="github" />

//             </div>
            
//         </div>
//     )
// }

// const mapStateToProps = state => {
//     return {
//         isFetchingInd: state.isFetchingInd,
//         userInfo: state.userInfo,
//     }
// }

// export default connect(
//     mapStateToProps,
//     {
//         fetchIndData,
//     }
// )(UserCard);