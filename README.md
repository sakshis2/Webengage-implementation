# Webengage-implementation

Problem statement : Write a javascript code to read sample csv, transform its headers and
values as per the middle layer mapping and create a new csv with updated values.

Sample Data :
https://static-webengage-implementation.s3.amazonaws.com/assignment_assets/sample_users_d
ata.csv

https://static-webengage-implementation.s3.amazonaws.com/assignment_assets/sample_users_d
ata.csv.zip


Middle layer mapping

![image](https://user-images.githubusercontent.com/65385026/191967733-4547c069-9c27-4989-92d0-c660f66fd324.png)


Solution:

To parse the header and data as instructed in the above image, we first needed to read the csv file and to do that I used a javascript object fileReader and, after that we divided the whole file on line basis and made an array of string which contains header string as first element of array and rest are data in same string form.

Then we seprate the each element of array on the basis of delimiter ',' and stored it into an array of array let name it finalArray(2D array).

Then for each element in the finalArray we applied the transformation as instructed in above image, and then again convert this finalArray into string with seprated by ','.

And after that we used encodeURL to convert it into CSV file.




Output

![image](https://user-images.githubusercontent.com/65385026/191976646-db2e30ca-2442-4688-b81b-336567dd614d.png)
