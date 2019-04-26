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
  89 10 00 00 : 0x00001089 is the address
  00 00 00 00 : 0x00000000 is the compare (not present)
  5F 00 00 00 : 0x0000005F is the data

  The next bytes are more codes, for multi codes
```

```
   01 00 00 00 de 37 00 00 02 00 00 00 05 00 00 00
```
```
   01 00 00 00 : compare (bit 1 is 1)
   de 37 00 00 : 0x000037de is the address
   02 00 00 00 : 0x00000002 is the compare
   05 00 00 00 : 0x00000005 is the data
```
## Useful links

http://games.technoplaza.net/
http://tuxnes.sourceforge.net/gamegenie.html
http://www.wyrmcorp.com/software/uggconv/uggconv.shtml
