import "./App.css";
import React from "react";
import logo from "./img/logo.svg";
import bg from "./img/bg1.svg";
import pill from "./img/pill.svg";
import eth from "./img/ethereum.png";
import pol from "./img/polygon-1140771b39c8269a6d1bc5534371f51d.png";
import bsc from "./img/bnb.df1f7664.png";
import vesi from "./img/vesi.svg";
import { ethers } from "ethers";
import Token from "./components/Token";

function App() {
  const [account, setAccount] = React.useState("");
  const [name, setName] = React.useState("");
  const [symbol, setSymbol] = React.useState("");
  const [supply, setSupply] = React.useState("");
  const [signer, setSigner] = React.useState();
  const [flagContractTracker, setFlagContractTracker] = React.useState();
  const [contract, setContract] = React.useState();
  const [totalToken, setTotalToken] = React.useState(0);
  const [tokenArray] = React.useState([]);

  React.useEffect(() => {
    const contract = new ethers.Contract(contractAddress, abiContract, signer);
    setContract(contract);
    contract
      .allAddresses(account)
      .then((total) => setTotalToken(parseInt(total, 16)));
    console.log(totalToken);
  }, [flagContractTracker]);

  React.useEffect(() => {
    for (let i = 0; i < totalToken; i++) {
      contract.getTokenInfo(i, account).then((token) => tokenArray.push(token));
    }
    console.log(tokenArray);
  }, [totalToken, tokenArray]);

  const contractAddress = "0x64d9366921c7F081CA3F3BdBe77D128A4a7e4e11";
  const abiContract = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "tokenAddress",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "tokenCreated",
      type: "event",
    },
    {
      inputs: [
        { internalType: "string", name: "name", type: "string" },
        { internalType: "string", name: "symbol", type: "string" },
        { internalType: "uint256", name: "totalSupply", type: "uint256" },
      ],
      name: "_deployNewERC20",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "allAddresses",
      outputs: [
        { internalType: "uint256", name: "totalTokens", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "count",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_index", type: "uint256" },
        { internalType: "address", name: "_addr", type: "address" },
      ],
      name: "getTokenInfo",
      outputs: [
        {
          components: [
            { internalType: "string", name: "name", type: "string" },
            { internalType: "string", name: "symbol", type: "string" },
            { internalType: "uint256", name: "supply", type: "uint256" },
            { internalType: "address", name: "tokenAddress", type: "address" },
          ],
          internalType: "struct Factory.UserToken",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  const login = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const account = await signer.getAddress();
    setFlagContractTracker(true);
    setAccount(account);
    setSigner(signer);
  };

  const setTokenName = (event) => {
    setName(event.target.value);
  };

  const setTokenSymbol = (event) => {
    setSymbol(event.target.value);
  };

  const setTokenSupply = (event) => {
    setSupply(event.target.value);
  };

  const createNewToken = async () => {
    await contract._deployNewERC20(name, symbol, supply);
    setFlagContractTracker(!flagContractTracker);
  };

  const refresh = () => {
    setFlagContractTracker(!flagContractTracker);
  }
  return (
    <div className="App">
      <div className="wrapper">
        <header className="header">
          <img className="header__logo" src={logo} alt="" />
          <ul className="header__menu menu">
            <li className="menu__item">
              <a className="active" href="">
                Home
              </a>
            </li>
            <li className="menu__item">
              <a href="">Platform</a>
            </li>
            <li className="menu__item">
              <a href="">FAQ</a>
            </li>
            <li className="menu__item">
              <span className="connect__button" onClick={() => login()}>
                {account === "" ? "Connect Wallet" : account}
              </span>
            </li>
          </ul>
        </header>
        <div className="content">
          <img src={bg} className="content__bg" alt="" />
          <img src={pill} className="content__pill" alt="" />
          <div className="content__title">
            ERC20 Token <br /> Factory
          </div>
          <div className="content__subtitle">
            You can now create your own tokens in a couple of clicks. <br />{" "}
            There is no need to search for a performer anymore.
          </div>
          <button className="content__button">Bilding Now</button>
        </div>
        <div className="platform">
          <div className="platform__title">Network</div>
          <ul className="platform__network network">
            <li className="network__ethereum">
              <img src={eth} width="40" height="40" href="" />
              Ethereum
            </li>
            <li className="network__bsc">
              {" "}
              <img src={bsc} width="50" height="50" href="" />
              Binance Smart Chain
            </li>
            <li className="network__polygon">
              {" "}
              <img src={pol} width="30" height="30" href="" />
              Polygon
            </li>
          </ul>
          <div className="platform__info">
            After clicking the "Create token" button, you will receive an ERC20
            standard token contract verified in the blockchain with all <br />
            additional functions. You will see the addresses of the contracts
            you have created below.
          </div>
          <div className="platform__form">
            <div className="create__token">
              <div className="token__name">Name</div>
              <input
                type="text"
                onChange={setTokenName}
                placeholder="TestToken"
              />
              <div className="token__symbol">Symbol</div>
              <input type="text" placeholder="TTK" onChange={setTokenSymbol} />
              <div className="token__supply">Supply</div>
              <input
                type="text"
                placeholder="100000"
                onChange={setTokenSupply}
              />
            </div>
            <img src={vesi} alt="" />
          </div>
          <div onClick={createNewToken} className="create__button">
            <span>Create token</span>
          </div>
        </div>
        <div className="platform">
          <div className="your__tokens">Your tokens</div>

          <div className="platform__account">
            Account: <span>{account}</span>
          </div>
          <ul className="platform__grid">
            <li className="table__name">Name</li>
            <li className="table__name">Symbol</li>
            <li className="table__name">Supply</li>
            <li className="table__name">Token Address</li>
            {tokenArray.length !== 0
              ? tokenArray.map((token) => (
                  <Token
                    id = {token.tokenAddress}
                    name={token.name}
                    symbol={token.symbol}
                    supply={token.supply.toNumber()}
                    tokenAddress={token.tokenAddress}
                  />
                ))
              : ''}
          </ul>
          <div onClick={refresh} className="create__button">
            <span>Refresh</span>
          </div>
        </div>
        d
      </div>
    </div>
  );
}

export default App;
