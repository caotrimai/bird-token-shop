class BirdShop {
  ADDRESS = '0x5084cA594C1Ef0520643a554623aD88904AbF832'

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
      'name': 'owner',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
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
      'outputs': [{'internalType': 'uint128', 'name': '', 'type': 'uint128'}],
      'stateMutability': 'view',
      'type': 'function',
    },
    {
      'inputs': [],
      'name': 'userSellRatio',
      'outputs': [{'internalType': 'uint128', 'name': '', 'type': 'uint128'}],
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