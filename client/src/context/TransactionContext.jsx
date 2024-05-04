import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  console.log("----"+ethereum);
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e, name) => {
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const checkIfWalletIsConnect = async () => {
        try {
        if (!ethereum) return alert("Please install MetaMask.");

        const accounts = await ethereum.request({ method: "eth_accounts" });

        if (accounts.length) {
            setCurrentAccount(accounts[0]);

        } else {
            console.log("No accounts found");
        }
        } catch (error) {
        console.log(error);
        }
    };

    const connectWallet = async () => {
        try {
        if (!ethereum) return alert("Please install MetaMask.");

        const accounts = await ethereum.request({ method: "eth_requestAccounts", });
        console.log("accouts:"+accounts);
        setCurrentAccount(accounts[0]);
        window.location.reload();
        } catch (error) {
        console.log(error);

        throw new Error("No ethereum object");
        }
    };

    const sendTransaction = async () => {
        try {
          if (ethereum) {
            console.log("currentAccount"+currentAccount);
            const { addressTo, amount, keyword, message } = formData;
            const transactionsContract = createEthereumContract();
            console.log("addressTo"+addressTo+"amount"+amount+"keyword"+keyword+"message"+message);
            const parsedAmount = ethers.parseEther(amount);
    
            await ethereum.request({
              method: "eth_sendTransaction",
              params: [{
                from: currentAccount,
                to: addressTo,
                gas: "0x5208",
                value: parsedAmount._hex,
              }],
            });
    
            const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
    
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            console.log(`Success - ${transactionHash.hash}`);
            setIsLoading(false);
    
            const transactionsCount = await transactionsContract.getTransactionCount();
    
            setTransactionCount(transactionsCount.toNumber());
            window.location.reload();
          } else {
            console.log("No ethereum object");
          }
        } catch (error) {
          console.log(error);
    
          throw new Error("No ethereum object");
        }
      };

    useEffect(() => {
        checkIfWalletIsConnect();
    }, []);

    return (
        <TransactionContext.Provider
          value={{
            connectWallet,
            currentAccount,
            sendTransaction,
            handleChange,
            formData,
            isLoading,
          }}
        >
          {children}
        </TransactionContext.Provider>
      );
};