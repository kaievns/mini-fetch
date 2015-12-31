# Mini Fetch

`mini-fetch` is a super minimalistic
[fetch](https://developers.google.com/web/updates/2015/03/introduction-to-fetch?hl=en)
interface polyfill in just a few lines of code. When you need to just fetch some
stuff and don't need the whole thing in your code.

__NOTE__: not fully compliant with the standard interface, it is a very basic
`fetch -> then -> catch` implementation.

__NOTE__: falls back to the real deal when a native interface is available

## Usage

The usual

```js
import fetch from `mini-fetch`;

fetch("http://nikolay.rocks").then((xhr)=> {
  // do stuff
});
```

## Copyright & License

All code in this repository is released under the terms of the MIT license

Copyright (C) 2015 Nikolay Nemshilov
