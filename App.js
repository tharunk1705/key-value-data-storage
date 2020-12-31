let readLine = require('readline-sync');
let fs = require('fs');
const { exit } = require('process');

let myObj = {};
const printMyObj = () => {
    console.log(myObj);
}

let myFile = `dataStore.json`;

const createStore = () => {
    let createStream = fs.createWriteStream("dataStore.json");
    createStream.end();
}

const updateStorage = () => {
   if(myFile.size > 0){
        let oldData = fs.readFileSync("dataStore.json",'utf-8');
        oldData = JSON.parse(oldData);
        // console.log(oldData);
        myObj = {...oldData, ...myObj};
        fs.writeFileSync("dataStore.json", JSON.stringify(myObj));

    }else{
        fs.writeFileSync("dataStore.json", JSON.stringify(myObj));
    }
}
const createObject = () => {
    let tempObj = {};
    let newKey = readLine.question("Enter the key : ");
    if(newKey.length > 32) {
        console.log("length Exceeded");
        return;
    }

    if(newKey in myObj){
        console.log("Already Exists!");
    }else{
        let newValue = readLine.question("Enter the Value : ");
        tempObj[newKey] = newValue;
    }
    
    return tempObj;
}

const createFun = () => {
    
    if(fs.existsSync("dataStore.json")){
    }else{
        createStore();
    }


    let key = readLine.question("Enter the Key : ");
    if(key.length > 32) {
        console.log("Length Exceeded");
        return;
    }

    if(key in myObj){
        console.log("ALREADY EXIST");
    }else{
        // let value = readLine.question("Enter the Value : ");
        // myObj[key] = value;
        myObj[key] = createObject();
    }

    updateStorage();
    printMyObj();
}

const readFun = () => {
    printMyObj();
}

const deleteFun = () => {
    let keyToDelete = readLine.question("Enter the key of the value to delete : ");
    let newObj = {};
    if(keyToDelete in myObj) {
        for (const key in myObj){
            if( key != keyToDelete){
                newObj[key] = myObj[key];
            }
        }
        myObj = newObj;
        updateStorage();
        printMyObj();
    }else{
        console.log("KEY NOT FOUND");
    }
    
}

function myFunction() {
    console.log(`1.Create 2.Read 3.Delete 4.Exit`);
    let choice = readLine.question("Enter your choice : ");
    // console.log(choice);

    if(choice == 1) {
        createFun();
    }else if(choice == 2){
        readFun();
    }else if(choice == 3){
        deleteFun();
    }else{
        printMyObj();
        console.log("---------------- Exiting Program ----------------")
        exit();
    }
    myFunction();
}
myFunction();
