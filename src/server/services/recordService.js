const memeoryRecords={
    "example.com":{A: "93.184.216.34"},
    "google.com":{A: "142.250.190.14"},
    "github.com":{A: "140.82.112.3"},
    "www.example.com":{CNAME:"example.com"}
};


async function getRecord(name,type='A'){
     const domainName=name.toLowerCase().trim();
     const recordSet=memeoryRecords[domainName];

     if(!recordSet)  return null;

     const ipData=recordSet[type];
     if(!ipData) return null;

     return{
        name:domainName,
        type,
        data:ipData
     }
}


async function domainExists(name){
    const domainName=name.toLowerCase().trim();
    return !!memeoryRecords[domainName]
}


async function domainRecords(name){
      const domainName=name.toLowerCase().trim();
      return memeoryRecords[domainName] || null;
}


async function  getAllRecords(){
     return memeoryRecords;
}



async function addRecord(name,type,data){
    const domainName=name.toLowerCase().trim();

    if(!memeoryRecords[domainName]) memeoryRecords[domainName]={};

    memeoryRecords[domainName][type]=data;

    return {
        name:domainName,
        type,
        data
    };
}


async function deleteRecord(name,type){
     const domainName=name.toLowerCase().trim();

     if(!memeoryRecords[domainName]) return false;

     delete memeoryRecords[domainName][type];

     if(Object.keys(memeoryRecords[domainName]).length===0){
        delete memeoryRecords[domainName];
     }

     return true;
}


export{
    getRecord,
    getAllRecords,
    addRecord,
    domainExists,
    domainRecords,
    deleteRecord
}