import React, { Component } from "react";
import "./Home.css";
<<<<<<< HEAD:src/containers/Home.js
import Search from './Search'
 class Home extends Component {
=======
import Search from './Search';



export default class Home extends Component {
>>>>>>> f00f7def89a7529e68c8b0a3923160909424a33f:client/src/containers/Home.js
    render() {
        return (
          <div>
            <div className="Home">
                <div className="lander">
                   <h1>CYF@Glossary</h1>
                    <Search />

                </div>
                </div>
            </div>
        );
    }
}
export default Home;