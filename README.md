# Ideas #

- Use ActivityStreams as our common language (JSON-only)
- have a bunch of encoders/decoders to convert to and from ActivityStreams format
    - For example, `Twitter->ASJSON`, `ASJSON->Plurk`. Now your Plurk client can read Twitter data after it passed through HoneyBadger

## passing data through honeybadger ##

- imaging HoneyBadger listening locally on port 9000

`http://localhost:9000/get?resource=http://api.twitter.com/1/statuses/public_timeline.json&input=twitter&output=plurk`

- HoneyBadger receives the request at /get
    - it makes it's own `GET` to the URL defined in `resource`
    - `Authentication` headers would be proxied to the resource
    - HB gets it's response back from Twitter
    - the response data is converted into ASJSON format from the expected `input` format
    - if an `output` format is specified, the ASJSON data is converted into into the requested format. Otherwise, we use ASJON for the output
    - HoneyBadger responds to the original request with the data in the reqeusted format