import dotenv from "dotenv"
dotenv.config()
import dgram from "node:dgram"
import dnsPacket from "dns-packet"
import handleDnsPacket from "./packetHandler.js"


const PORT=process.env.PORT || 53530;
const HOST=process.env.HOST || `0.0.0.0`;




const server=dgram.createSocket("udp4");



server.on("error",(error)=>{
    console.error(`DNS server error ${error}`);
    server.close();
})



server.on("message",async(msg,rinfo)=>{
    console.log("Got query from", rinfo.address, rinfo.port);

    await handleDnsPacket(msg,rinfo,(response)=>{
        const buf=dnsPacket.encode(response);
        server.send(buf,rinfo.port,rinfo.address);
    })
})



server.bind(PORT, HOST, () => {
  console.log(`DNS server listening on ${HOST}:${PORT}`);
});
