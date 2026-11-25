

function buildDnsResponse({query,quest,answerData,domainExists,dnsPacket}){

      const response={
        type:"response",
        id:query.id,
        flags:dnsPacket.AUTHORITATIVE_ANSWER | dnsPacket.RECURSION_AVAILABLE,
        questions:query.questions,
        answers:[],
        authorities:[],
        additionals:[]
      };
      

      if(!domainExists){
        response.flags |=dnsPacket.NXDOMAIN;
        return response;
      }

      if(domainExists && !answerData){
        response.authorities.push({
            name:quest.name,
            type:"SOA",
            class:"IN",
            ttl:300,
            data:{
                primary:"nsl.exampe.com",
                admin:"admin.example.com",
                serial:2024001,
                refresh:3600,
                retry:600,
                expire:604800,
                minimum:300
            }
        })
        return response;
      }

      if(answerData && quest.type==='A'){
           response.answers.push({
            name:quest.name,
            type:quest.type,
            class:"IN",
            ttl:300,
            data:answerData
           })
      }
    return response;
}

export default  buildDnsResponse;