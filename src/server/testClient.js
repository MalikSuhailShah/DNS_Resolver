import dgram from "node:dgram"
import dnsPacket from "dns-packet"

const client = dgram.createSocket("udp4")

const query = dnsPacket.encode({
    type: "query",
    id: 1,
    flags: dnsPacket.RECURSION_DESIRED,
    questions: [{
        type: "A",
        name: "github.com"
    }]
})


client.on("message", (msg) => {
    const response = dnsPacket.decode(msg)
    console.log("Got response:", JSON.stringify(response.answers, null, 2))
    client.close()
})




client.send(query, 53530, "127.0.0.1", (err) => {
    if (err) console.error("send error:", err)
    else console.log("query sent, waiting for response...")
})