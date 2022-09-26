import React from "react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '', // as the user types in a location, updates searchQuery
      location: {},
      error: false,
      errorMessage: '',
    }
  }

  handleInput = (e) => {
    e.preventDefault();
    this.setState({ searchQuery: e.target.value });
    console.log(this.state.searchQuery);
  }

  // async await
  handleSearch = async (e) => {
    // code runs in the try block
    try {
      const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.searchQuery}&format=json`;
      const res = await axios.get(API);
      // you want the res.data
      console.log(res.data[0]); // this represents the actual seattle object we want to render
      this.setState({ location: res.data[0] });
    // if there is an ERROR, code runs in the catch block  
    } catch (error) {
      console.log(error);
      this.setState({ error: true });
      this.setState({ errorMessage: error.message });
    }
  }

  render() {
    return(
      <>
        <input onChange={this.handleInput} placeholder="search for a city"></input>
        <button onClick={this.handleSearch}>Explore!</button>
        {this.state.location.display_name &&
          <>
            <h2>The City is: {this.state.location.display_name}</h2>
            <h2>The lat is: {this.state.location.lat}</h2>
            <h2>The lon is: {this.state.location.lon}</h2>
          </>
        }
        {this.state.error && 
          <h2>Oh no! {this.state.errorMessage}</h2>
        }
      </>
    )
  }
}

export default App;
