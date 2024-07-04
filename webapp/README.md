# What is the webapp?

The webapp is the following things:

1) a reactjs front end generated from webpack. There is no backend. It expects nginx to handle that.
2) xsrf protected to prevent bots from jamming us up.

This is served from nginx, with a very aggressive configuration. We want nginx to take most of the load
of our site. The reason why is its better then we are at most things.

Why fight it?

## How to think about it.

`docker compose up webapp` is your friend.

http://localhost:3000

Changes should dynamically get built at some rate, with cache invalidation on
