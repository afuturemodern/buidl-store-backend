//export const helloWorldContract;

// export const loadCurrentMessage = async () => {

// };

const walletStatus = {address: "", status: ""};

const setWalletStatus = (address, status) => {
    walletStatus.address = address;
    walletStatus.status = status;
}

 const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: "metamask not installed"
    };
  }
};

 const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: "metamask not installed"
    };
  }
};

const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletStatus(accounts[0], "👆🏽 Write a message in the text-field above.");
        } else {
            setWalletStatus("", "🦊 Connect to Metamask using the top right button.");
        
        }
      });
    } else {
        setWalletStatus("", "metamask not installed");
    }
  }


// export const updateMessage = async (message) => {

// };

module.exports = {connectWallet, getCurrentWalletConnected};