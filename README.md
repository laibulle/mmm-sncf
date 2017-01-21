# Magic Mirror - SNCF API

Display your train journey informations on Magic Mirror.

![alt tag](https://raw.github.com/laibulle/mmm-sncf/master/doc/screen.png)

Get a free API key at this address: http://data.sncf.com/api/fr/register.

```
{
  module: 'MMM-SNCF',
  position: 'top_left',
  config: {
    key: "your-api-key",
    journeys: [
      {
        from: "armentieres",
        to: "lille"
      },
      {
        from: "armentieres",
        to: "hazebrouk"
      }
    ]
  }
}
```
