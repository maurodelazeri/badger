# badger
DEX Price Feeds

### Docker

```
mc config host add minio https://storage.zinnion.com admin Br@sa154

tar -czf badger_docs.tar.gz docs && mc cp badger_docs.tar.gz minio/app && rm badger_docs.tar.gz

ls -t | grep -v node_modules | xargs tar -czf badger.tar.gz &&  mc cp badger.tar.gz minio/app && rm badger.tar.gz
```

### Docs

```
docsify serve docs

http-server docs/
```

### Get ABI Ethereum

https://api.etherscan.io/api?module=contract&action=getabi&address=0x7d86446ddb609ed0f5f8684acf30380a356b2b4c&apikey=JX8PEF335BBDSXWZ9AAC7KTVQ68USIY8X7

### Get ABI Binance Chain

https://api.bscscan.com/api?module=contract&action=getabi&address=0xbeecd2ade82e1ab5e040acdf574f4a677e832092&apikey=CBPK3ZUYFHYANZ9SIF66GGZPB6ZB4X62VW


### Balancer first pools

https://api.etherscan.io/api?module=logs&action=getLogs
&fromBlock=4069113
&toBlock=9569113
&address=0x9424b1412450d0f8fc2255faf6046b98213b76bd
&topic0=0x8ccec77b0cb63ac2cafd0f5de8cdfadab91ce656d262240ba8a6343bccc5f945
&apikey=JX8PEF335BBDSXWZ9AAC7KTVQ68USIY8X7
