
const web3 = new Web3('https://mainnet.infura.io/v3/48208b15bae6493f921ac3103452c11e'); 


const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_msisdn",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_imsi",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_region",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_owner",
				"type": "string"
			}
		],
		"name": "addNumbers",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_caller",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_receiver",
				"type": "uint256"
			}
		],
		"name": "billingupdate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_caller",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_receiver",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_location",
				"type": "string"
			}
		],
		"name": "call_initiation",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_caller",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_receiver",
				"type": "uint256"
			}
		],
		"name": "call_termination",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endtime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "id",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "msisdn",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "imsi",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "region",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "owner",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "nos",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "msisdn",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "imsi",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "region",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "owner",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "rate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_caller",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_receiver",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_location",
				"type": "string"
			}
		],
		"name": "roaming",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "showNumbers",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "msisdn",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "imsi",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "region",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "owner",
						"type": "string"
					}
				],
				"internalType": "struct call_com.number_list[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "starttime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; 
const contractAddress = '0x0498B7c793D7432Cd9dB27fb02fc9cfdBAfA1Fd3'; 


const contract = new web3.eth.Contract(contractABI, contractAddress);



document.getElementById('initiateCall').addEventListener('click', async () => 
{
    const response = await contract.call_initiation.send(...); 
    document.getElementById('result').textContent = response;
});

// Function to end the call
document.getElementById('endCall').addEventListener('click', async () => {
    const response = await contract.call_termination.send(...);
    document.getElementById('result').textContent = response;
});

// Function to get billing information
document.getElementById('getBilling').addEventListener('click', async () => {
    const response = await contract.billingupdate.call(...); 
    document.getElementById('result').textContent = response;
});
