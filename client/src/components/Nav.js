import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
    
    render() {
        const style = {
            listStyleType: 'none',
            backgroundColor: 'lightgray'
        }

        return (
            <nav>
                <ul className="d-flex row justify-content-sm-around">
                    <li style={style}><Link to="/search">Search</Link></li>
                    <li style={style}><Link to="/saved">Saved</Link></li>
                </ul>
            </nav>
        )
    }
}

export default Nav;