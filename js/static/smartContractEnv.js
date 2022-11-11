var smartContract = {
    abi: [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "baggageId",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "location",
                    "type": "string"
                }
            ],
            "name": "addBaggageToBoarding",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "baggageId",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "location",
                    "type": "string"
                }
            ],
            "name": "addBaggageToSecurity",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address[]",
                    "name": "officials",
                    "type": "address[]"
                }
            ],
            "name": "assignBaggageOfficial",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "baggageId",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "location",
                    "type": "string"
                }
            ],
            "name": "checkInBaggage",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string[]",
                    "name": "customer_ids",
                    "type": "string[]"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "getBaggage",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "id",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "last_scanned_timestamp",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "location",
                            "type": "string"
                        },
                        {
                            "internalType": "string[]",
                            "name": "locationHistory",
                            "type": "string[]"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "timestampHistory",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "enum BaggageTracker.BaggageStatus",
                            "name": "status",
                            "type": "uint8"
                        }
                    ],
                    "internalType": "struct BaggageTracker.Baggage[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "baggageId",
                    "type": "string"
                }
            ],
            "name": "getBaggageStatus",
            "outputs": [
                {
                    "internalType": "enum BaggageTracker.BaggageStatus",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getCustomers",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "id",
                            "type": "string"
                        },
                        {
                            "internalType": "enum BaggageTracker.CustomerStatus",
                            "name": "status",
                            "type": "uint8"
                        }
                    ],
                    "internalType": "struct BaggageTracker.Customer[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "isBaggageOfficial",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "isBoardingOfficial",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ],
    address: "0x4B546f810501B4628005427A73aE3E8EF23279c7"
}

export default smartContract