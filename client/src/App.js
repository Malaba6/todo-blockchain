import React, { Component, useState } from "react";
import TodoListContract from "./contracts/TodoList.json";
import getWeb3 from "./getWeb3";
import AppBar from "./components/AppBar";
import Main from "./components/Main";

import "./App.css";

const MyComponent = () => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);   
  };

  return <>
    <input minLength={4} value={input} onChange={e => handleChange(e)} />
  </>
}

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TodoListContract.networks[networkId];
      const instance = new web3.eth.Contract(
        TodoListContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;
    console.log('***** accounts ', accounts, contract)
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <AppBar />
        <Main />
      </div>
    );
  }
}

export default App;
