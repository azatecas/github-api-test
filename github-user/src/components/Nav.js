import React from 'react';
import { connect } from 'react-redux';


const Nav = () => {
    return(
        <nav>
            <h1>
                This is a nav bar
            </h1>
        </nav>
    )

}

const mapStateToProps = state => {
    return {
        users:state.users,
    }
}

export default connect(
    mapStateToProps,
    {}
)(Nav);