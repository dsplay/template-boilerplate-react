import React, { Component } from 'react';
import './App.css';

const { duration } = window.dsplay_media || window.media
const { template_var } = window.dsplay_template || window.template;

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>DSPLAY Template</h1>
                <h3>Dynamic Values Examples:</h3>
                <ul>
                    <li>duration: {duration}</li>
                    <li>template_var: {template_var}</li>
                </ul>
            </div>
        );
    }
}

export default App;
