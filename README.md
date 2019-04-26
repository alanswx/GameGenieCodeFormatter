# GameGenieCodeFormatter
Game Genie Binary Formatter

``
npm start
npm run zip
``

This takes the CSV and turns it into binary files (little endian).

Possible bug: running this JS code on a big endian machine might output files in the wrong endian.

Format: 
```
  00 00 00 00 89 10 00 00 00 00 00 00 5F 00 00 00
  00 00 00 00 8A 10 00 00 00 00 00 00 07 00 00 00 
  00 00 00 00 87 10 00 00 00 00 00 00 04 00 00 00
```
```
  00 00 00 00 : no compare (bit 1 is 1 if compare)
  89 10 00 00 : 0x1089 is the address
  00 00 00 00 : 0x0000 is the compare (not present)
  5F 00 00 00 : 0x005F is the data

  The next bytes are more codes, for multi codes
```

## Useful links

http://games.technoplaza.net/
http://tuxnes.sourceforge.net/gamegenie.html
http://www.wyrmcorp.com/software/uggconv/uggconv.shtml
