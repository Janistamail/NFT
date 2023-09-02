import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
const devMode = false; //metamask = false

export function web3_check_metamask() {
  if (typeof window !== "undefined") {
    return !window.ethereum ? false : true;
  }
}
export async function navigateLogin() {
  // Check first if the user has the MetaMask installed
  if (devMode) {
    //10 accounts
    const web3 = new Web3(
      new Web3.providers.WebsocketProvider("ws://localhost:7545")
    );
  } else {
    //metamask
    if (web3_check_metamask()) {
      const provider = await detectEthereumProvider();
      if (provider) {
        console.log("ethereum wallet is connected");
      window.web3 = new Web3(provider);
        const web3 = window.web3;
        const connectedWallet = await ethereum
          .request({ method: "eth_requestAccounts" })
          .then(async (connectedWallet) => {
            return connectedWallet[0];
          });
        const data = { web3: web3, connectedWallet: connectedWallet };
        return data;
      } else {
        console.log("no ethereum wallet detected (no provider)");
      }
    }
  }
}
