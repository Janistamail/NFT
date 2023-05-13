import React, { useEffect, useState } from "react";
// import styles from "./metamask-auth.module.css";

async function connect(onConnected) {
    if (!window.ethereum) {
        alert("Get MetaMask!");
        return;
    }

    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    });

    onConnected(accounts[0]);
}


async function checkIfWalletIsConnected(onConnected) {
    if (window.ethereum) {
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });

        if (accounts.length > 0) {
            const account = accounts[0];
            onConnected(account);
            return;
        }
    }
}


function Connect({ setUserAddress }) {
    return (
        <button onClick={() => connect(setUserAddress)}>
            Connect to MetaMask
        </button>
    );
}


function Address({ userAddress }) {
    return (
        <span >{userAddress.substring(0, 5)}…{userAddress.substring(userAddress.length - 4)}</span>
    );
}



export default function MetaMaskAuth({ onAddressChanged }) {
    const [userAddress, setUserAddress] = useState("");

    useEffect(() => {
        checkIfWalletIsConnected(setUserAddress);
    }, []);

    useEffect(() => {
        onAddressChanged(userAddress);
    }, [userAddress]);

    return userAddress ? (
        <div>
            Connected with <Address userAddress={userAddress} />
        </div>
    ) : (
        <Connect setUserAddress={setUserAddress} />
    );
}