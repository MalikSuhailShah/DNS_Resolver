import dnsPacket from "dns-packet"
import buildDnsResponse from "./responseBuilder.js";
import { getRecord,domainExists } from "../services/recordService.js";



async function handleDnsPacket(msg,rinfo,sendResponse){
     console.log("Got query from", rinfo.address, rinfo.port);
     try{
        const query=dnsPacket.decode(msg);
        const quest=query.questions?.[0];

        if(!quest){
          const response={
            type:"response",
            id:query.id || 0,
            flags:dnsPacket.NXDOMAIN,
            questions:query.questions || [],
            answers:[]
          };
          sendResponse(response);
          return;
        }

        const {name,type}=quest;
        
        const isExists=await domainExists(name);

        const record=isExists ? await getRecord(name,type):null;
        const answerData=record?.data;

        const response=buildDnsResponse({
            query,
            quest,
            answerData,
            domainExists:isExists,
            dnsPacket
        })
        
        sendResponse(response);
     }
     catch(err){
        console.error(`Some error occured ${err}`);
     }
}


export default handleDnsPacket;