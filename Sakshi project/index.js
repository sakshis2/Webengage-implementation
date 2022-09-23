    // loadFileData will contain the resultant data what will come from the csv file after breaking into rows and colums as arrays of arrays.
    let loadFileData = [];

    /*
        importFile is you to fetch the csv file data on click of the
        import button using FileReader object of javascript.

        csv file breaked into line wise and then made a array of is box using delimiter ','
        and stored in the loadFileData;

        loadFileData will look like:-
        loadFileData = [['A','B','C','D','E','F'],['1','2','3','4','5','6'],['7','8','9','10','11','12']];
        where first array of loadFileData is header and rest all is the corresponding value;
    */
    function importFile(event) {
        var filePath = document.getElementById('fileInput');
        var reader = new FileReader();
        reader.onload = function(e){
            var data = e.target.result.split('\n');
            data.forEach(function(row){
                row = row.substr(0,row.length-1); // This is used to remove the end of row sign from string '/r';
                var column = row.split(',');
                loadFileData.push(column);
            })
        }
        if(filePath.value!=='') // if file is not choosed then is will not allow to load the empty file.
        {
            reader.readAsText(filePath.files[0]);
            /*After successfull import we will disable the choose option as well as import button 
                to avoid the duplicate import.
            */
            document.getElementById('fileInput').disabled = true; 
            document.getElementById('buttonImport').disabled = true;
        }else
        alert('Please select a valid file!!!')

    }
    /*
        getDateData function is used to process the date data in proper way.

        if date input is not valid as per the ISO then this function will return empty string.
    */
    function getDateData(dateTime){
        const date = new Date(dateTime);
        let month = date.getMonth().toString();
        let year = date.getFullYear().toString();
        let day = date.getDate().toString();
        if (month.length < 2) 
        month = '0' + month;
        if (day.length < 2) 
        day = '0' + day;
        let d = '`'+year+"-"+month+"-"+day+'`';
        if(month!=="NaN" && year!=="NaN" && day!=="NaN")
        return  d;
        else
        return ' ';
    }
    /*
        processEachRow function is used to process the row data in directed way in question.

        NODE:-- Here, Index 0 to 9 is in the same way as given in CSV sample file.

        This function have two parameters----------
        1. fileData it will have the data of each row.
        2. header, it is to identify either fileData is header or normal data.

        According to the index given in CSV file it will process the data.

    */
    function processEachRow(fileData,header=false){
        fileData[0]=fileData[0].replace('-','_').toLowerCase(); //userId

        fileData[1]=fileData[1].replace(' ','_').toLowerCase(); //first_name

        fileData[2]=fileData[2].replace(' ','_').toLowerCase(); //last_name

        fileData[3]=fileData[3].toLowerCase();       //phone

        if(header){                                        //email
            fileData[4]=fileData[4].split(' ')[0].toLowerCase();
        }else{
            fileData[4]=fileData[4].toLowerCase();
        }

        fileData[5]=fileData[5].toLowerCase();   //gender

        if(header){                                    //age_cataegory
            fileData[6]=fileData[6].toLowerCase(); 
        }else{
            fileData[6]=fileData[6].replace('-','_').toLowerCase();
        }

        if(header){                                 //birthdate
            fileData[7]=fileData[7].replace(' ','').toLowerCase();
        }else{
            fileData[7]=getDateData(fileData[7]);
        }

        if(header){                                    //country
            fileData[8]=fileData[8].split(' ')[0].toLowerCase();
        }else{
            fileData[8]=fileData[8].toLowerCase();
        }

        if(header){                                //registration date
            fileData[9]=(fileData[9].substr(0,3)+'_'+fileData[9].substr(fileData[9].indexOf(' ')+1)).toLowerCase();

        }else{
            fileData[9]=getDateData(fileData[9]);
        }
        
    }
    /*
        ProcessCSV is used to process the whole loadFileData.

        Here, We went through each element of loadFileData as at the first index means it is Header and rest index will have data.

        Here, I used forEach loop of javascript to traverse.
    */
    function processCSV(){
        loadFileData.forEach((row,index)=>index!=0 ? processEachRow(row,false): processEachRow(row,true));
    }

    /*
        downloadFile will envoke on click event of download button, it will first confirm the avaibility of parsed data in loadFileData.
        if yes then it will provoke processCSV();
        
        And the will again traverse through each element for the array loadFileData and join the elements on delimiter ',';

        To download the CSV file will create a anchor tag and then will create and encoded URL of new csvContent data.

        After that we will provoke the anchor tag with click event.
    */
    function downloadFile(){
       
        if(loadFileData.length===0)
        alert('Please select a file to download!!!');
        else{
            processCSV();
            let csvContent = "";

            loadFileData.forEach(function(rowArray) {
                let row = rowArray.join(",");
                csvContent += row + "\r\n";
            });
            var hiddenElement = document.createElement('a');  //Anchor tag created 
            hiddenElement.href = 'data:text,' + encodeURI(csvContent);   //url created of csvContent data and stored in href tag;
            hiddenElement.target = '_blank';  
            
            //provide the name for the CSV file to be downloaded  
            hiddenElement.download = 'TransformedData.csv';  //Download file name
            hiddenElement.click();  //invoked the anchor tag.
            document.getElementById('fileInput').disabled = false; //Enable the file input
            document.getElementById('fileInput').value=''; //Clear the file input
            document.getElementById('buttonImport').disabled = false; //Enable the import button
            loadFileData=[];
        }

    }