//var code = "ANTOSA";
//var result = decodeNES("ANTOSA");
//console.log(code);
//console.log(result);

// bring in the ggencoder library that we changed to have node exports
var gg = require("./ggencoder");

const csv = require('csv-parser');  
const fs = require('fs');

// read the csv we created from the master spreadsheet. This 
// is hardcoded to NES for now.
fs.createReadStream('nes.csv')  
  .pipe(csv())
  .on('data', (row) => {

   // temporarily filter just Super Mario Bros. 
   if (true || row["Game"]=="Super Mario Bros." || row["Game"]=="1942")
   {
      // some rows are blank, or just have comments. Usually the Effect field is blank
      if (row["Effect"].length<=0)
      {  
	console.log("skipping:");
	console.log(row);
      }
      else{
    console.log(row);

    /*split the key into pieces, and create an array */
    /* some effects have multiple game genie keys to make them work, separated by + in the spreadsheet */
    var keys = row["Key"].split("+");
    console.log(keys);
    var len;
    // dar is an array of Uint32 arrays 4 bytes large
    var dar=new Array();
    for (var i = 0, len = keys.length; i < len; i++) 
    {
       // we need to trim the space from before and after the + if there were any spaces
       var key = keys[i].trim();
       // decode the key
       var result=gg.gg_decodeNES(key);
    	console.log(result);
        // the result looks like this:
        //RawCode { value: 243, address: 12344, compare: 65 }
        var data = new Uint32Array(4);
        //1'b enable, 1'b compare, 000000 , address, compare, replace
    	data[0]=result.hasCompare?0x0001:0x0000;
    	data[1]=result.address;
	data[2]=result.compare;
	data[3]=result.value;
        dar.push(data);
    }
    // create the directory tree
    var dir = "nesgg/" + row["Game"][0]+"/"+  row["Game"];
    console.log("dir:"+dir);
    fs.mkdirSync(dir, { recursive: true });
    var file= dir +"/"+ row["Effect"]+".gg";
    //console.log(dar);
    var outdata = new Uint32Array(4*dar.length);
    for (var j=0;j<dar.length;j++) 
    {
          //console.log(dar[j]);
          outdata[j*4]=dar[j][0];
          outdata[j*4+1]=dar[j][1];
          outdata[j*4+2]=dar[j][2];
          outdata[j*4+3]=dar[j][3];
    }
    console.log(outdata);
    // make the binary file
    fs.writeFile( file, outdata, 'binary', function(err){ if (err) console.log('err:'+err)});
   }
  }

  })
  .on('end', () => {
    //console.log('CSV file successfully processed');
  });
