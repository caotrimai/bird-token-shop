class BirdShop {
  ADDRESS = '0xca2f3074ac82e3d79d2601b3c9afb00876f71854'

  ABI = [
    {
      'inputs': [
        {
          'internalType': 'address',
          'name': 'tokenAddress',
          'type': 'address',
        }], 'stateMutability': 'nonpayable', 'type': 'constructor',
    },
    {
      'inputs': [],
      'name': 'AIRDROP_LOCK_TIME',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function',
    },
    {
      'inputs': [],
      'name': '_token',
      'outputs': [
        {
          'internalType': 'contract IERC20',
          'name': '',
          'type': 'address',
        }],
      'stateMutability': 'view',
      'type': 'function',
    },
    {
      'inputs': [],
      'name': 'airdropAmountRemaining',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function',
    },
    {
      'inputs': [],
      'name': 'airdropAmountUnit',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function',
    },
    {
      'inputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'name': 'airdropDetails',
      'outputs': [
        {
          'internalType': 'uint256',
          'name': '_amount',
          'type': 'uint256',
        },
        {'internalType': 'uint256', 'name': '_lockTime', 'type': 'uint256'},
        {'internalType': 'bool', 'name': '_received', 'type': 'bool'}],
      'stateMutability': 'view',
      'type': 'function',
    },
    {
      'inputs': [
        {
          'internalType': 'address',
          'name': '_address',
          'type': 'address',
        }],
      'name': 'getAirdropDetail',
      'outputs': [
        {
          'internalType': 'uint256',
          'name': 'amount',
          'type': 'uint256',
        },
        {'internalType': 'uint256', 'name': 'lockingTime', 'type': 'uint256'},
        {'internalType': 'bool', 'name': 'received', 'type': 'bool'}],
      'stateMutability': 'view',
      'type': 'function',
    },
    {
      'inputs': [],
      'name': 'getTokenAirdrop',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function',
    },
    {
      'inputs': [],
      'name': 'owner',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function',
    },
    {
      'inputs': [
        {
          'internalType': 'uint256',
          'name': 'amount',
          'type': 'uint256',
        }],
      'name': 'setAirdropAmount',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function',
    },
    {
      'inputs': [],
      'name': 'userBuyBirdToken',
      'outputs': [],
      'stateMutability': 'payable',
      'type': 'function',
    },
    {
      'inputs': [],
      'name': 'userBuyRatio',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function',
    },
    {
      'inputs': [],
      'name': 'userSellRatio',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function',
    },
    {
      'inputs': [
        {
          'internalType': 'uint256',
          'name': 'amount',
          'type': 'uint256',
        }],
      'name': 'userSellToken',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function',
    },
    {
      'inputs': [],
      'name': 'withdrawProfit',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function',
    }]
}

const birdShop = new BirdShop()
export default birdShop