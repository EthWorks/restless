<div align="center">
  <img width="250" src="https://raw.githubusercontent.com/EthWorks/restless/master/logo.png">
  <br>

[![NPM](https://img.shields.io/npm/v/@restless/ethereum.svg)](https://www.npmjs.com/package/@restless/ethereum)
[![CircleCI](https://img.shields.io/circleci/build/github/EthWorks/restless/master.svg)](https://circleci.com/gh/EthWorks/restless/tree/master)
[![License](https://img.shields.io/github/license/Ethworks/restless.svg)](https://github.com/EthWorks/restless/blob/master/UNLICENSE)

</div>

# Restless - Ethereum

Ethereum module for restless. Uses [ethers.js](https://docs.ethers.io/ethers.js/html/index.html). Provides utilities such as:

1. [`asEthAddress`](#asethaddress)
1. [`asBigNumber`](#asbignumber)

## Installation

```
npm install @restless/ethereum
yarn add @restless/ethereum
```

## Sanitizers

### `asEthAddress`

Accepts any string that represents a valid ethereum address. Checks the checksum if present. Returns a normalized representation.

```javascript
asEthAddress('0xA5fE...f213', 'path') // Result.ok(0xA5fE...f213)
asEthAddress('0xa5fe...f213', 'path') // Result.ok(0xA5fE...f213)
asEthAddress('bla bla bla', 'path') // Result.error([{expected: 'ethereum address', path: 'path'}])
asEthAddress(123, 'path') // Result.error([{expected: 'ethereum address', path: 'path'}])
```

### `asBigNumber`

Accepts any string or number that represents an integer. Converts the integer to a [BigNumber](https://docs.ethers.io/ethers.js/html/api-utils.html#big-numbers).

```javascript
asBigNumber('123', 'path') // Result.ok(BigNumber(123))
asBigNumber(456, 'path') // Result.ok(BigNumber(456))
asBigNumber(1.5, 'path') // Result.error([{expected: 'big number', path: 'path'}])
asBigNumber(true, 'path') // Result.error([{expected: 'big number', path: 'path'}])
```

### `asHexBytes`

Accepts any string that encodes binary data of specific length in hex format. The returned string is always lowercased.

```javascript
const sanitizer = asHexBytes(3)

sanitizer('0x12ab56', 'path') // Result.ok('0x12ab56')
sanitizer('0x12AB56', 'path') // Result.ok('0x12ab56')
sanitizer('0x12AB5', 'path') // Result.error([{expected: 'hex string representing 3 bytes', path: 'path'}])
sanitizer(1234, 'path') // Result.error([{expected: 'hex string representing 3 bytes', path: 'path'}])
```

### `asTransactionHash`

Accepts any string that can be a transaction hash.

```javascript
const exampleHash = '0xd04b98f48e8f8bcc15c6ae5ac050801cd6dcfd428fb5f9e65c4e16e7807340fa'

asTransactionHash(exampleHash, 'path') // Result.ok('0xd04b...40fa')
asTransactionHash(exampleHash.toUpperCase(), 'path') // Result.ok('0xd04b...40fa')
sanitizer('0x12AB5', 'path') // Result.error([{expected: 'transaction hash', path: 'path'}])
sanitizer(1234, 'path') // Result.error([{expected: 'transaction hash', path: 'path'}])
```
