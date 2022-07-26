async function getUserAddress(params) {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum,
      "any"
    );
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    (async function () {
      let userAddress = await signer.getAddress();
      document.getElementById("wallet").innerText =
        "Your wallet is " + userAddress;
    })();

    var walletStatus = { address: "", status: "" };
}

function setWalletStatus(address, status) {
    walletStatus.address = address;
    walletStatus.status = status;
  }
  window.addEventListener('load', (event) => {
    connectWallet()
  });
  async function connectWallet() {
    getUserAddress();
    console.log("connecing the Wallet");
    if (window.ethereum) {
      console.log("ethereum is available");
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const obj = {
          status: "👆🏽 Write a message in the text-field above.",
          address: addressArray[0],
        };
          document.querySelector("#walletButton").innerText = addressArray[0]
        // return obj;
        console.log(obj);
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: "metamask not installed",
      };
    }
  }

  async function getCurrentWalletConnected() {
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
        status: "metamask not installed",
      };
    }
  }

  async function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletStatus(
            accounts[0],
            "👆🏽 Write a message in the text-field above."
          );
        } else {
          setWalletStatus(
            "",
            "🦊 Connect to Metamask using the top right button."
          );
        }
      });
    } else {
      setWalletStatus("", "metamask not installed");
    }
  }