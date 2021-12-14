# Sankhya Insert

This package provides a easy way to do a insert in Sankhya


## Installation

```sh
npm install sankhya-helper
```

## Example

The function takes 4 parameters as inputs: Sankhya login, password, table name and a array with data for each column. Must be in the same order displayed in the table.

```sh
const insert = require('sankhya-insert')

const login = 'username'
const password = 'password'

insert(login, password, 'TGFCAB', [49956, '', 'data', 'example'])
```


