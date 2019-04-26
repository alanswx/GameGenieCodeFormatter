//var code = "ANTOSA";
//var result = decodeNES("ANTOSA");
//console.log(code);
//console.log(result);
var gg = require("./ggencoder");
console.log("hello");

const csv = require('csv-parser');  
const fs = require('fs');

fs.createReadStream('nes.csv')  
  .pipe(csv())
  .on('data', (row) => {
   if (row["Game"]=="Super Mario Bros.")
   {
      if (row["Effect"].length<=0)
      {  
	console.log("skipping:");
	console.log(row);
      }
      else{
    console.log(row);

    /*split the key into pieces, and create an array */
    var keys = row["Key"].split("+");
    console.log(keys);
    var len;
    var dar=new Array();
    for (var i = 0, len = keys.length; i < len; i++) 
    {
       var key = keys[i].trim();
       console.log(i);
       console.log(key);
       console.log(keys.length);
       var result=gg.gg_decodeNES(key);
    	console.log(result);
//1'b enable, 1'b compare, 000000 , address, compare, replace
//RawCode { value: 243, address: 12344, compare: 65 }
        var data = new Uint32Array(4);
    	data[0]=0;
    	data[1]=result.address;
	data[2]=result.compare;
	data[3]=result.value;
        dar.push(data);
    	console.log(data);
    	for (var j=0;j<data.length;j++)
		console.log(data[j].toString(16).padStart(8,'0'));

    }
    	var dir = "nesgg/" + row["Game"][0]+"/"+  row["Game"];
    	console.log("dir:"+dir);
    	fs.mkdirSync(dir, { recursive: true });
    	var file= dir +"/"+ row["Effect"]+".gg";
    	console.log(dar);
        var outdata = new Uint32Array(4*dar.length);
    	for (var j=0;j<dar.length;j++) 
	{
          console.log(dar[j]);
          outdata[j*4]=dar[j][0];
          outdata[j*4+1]=dar[j][1];
          outdata[j*4+2]=dar[j][2];
          outdata[j*4+3]=dar[j][3];
	}
          console.log(outdata);
    	fs.writeFile( file, outdata, 'binary', function(err){ if (err) console.log('err:'+err)});
   }
  }

  })
  .on('end', () => {
    //console.log('CSV file successfully processed');
  });
