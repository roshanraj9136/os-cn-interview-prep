# CN: Top 60 Interview Questions

Ye page CN ke 60 sabse zyada puchhe jaane wale interview questions hai. Har question ek box mein hai. Pehle question padho, khud se bol ke answer dene ki koshish karo, phir box khol ke answer check karo.

Har answer mein: simple English answer (interview mein bolne ke liye), `Hinglish mein:` ek-do line (samajhne ke liye), aur ek detail-page ka link. English answer ko loud bol ke practice karo, kyunki interview English mein hota hai.

## Sabse zyada puchhe jaane wale 15

Agar time kam hai to pehle ye 15 (⭐ wale) karo: Q2, Q8, Q11, Q13, Q15, Q18, Q24, Q31, Q36, Q37, Q41, Q45, Q50, Q54, Q58.

## Basics

::: details Q1. Computer network kya hai?
**Answer:** A computer network is a set of devices (nodes) connected by links so they can share data and resources. Examples are the internet, a home Wi-Fi LAN, and an office network.

**Hinglish mein:** Network matlab kai devices aapas mein jude hue, taaki wo data aur resources (printer, internet) share kar sakein.

Detail: [Network Basics](/cn/basics)
:::

::: details Q2. LAN, MAN aur WAN mein kya difference hai?
**Answer:** ⭐ LAN covers a small area like a home or office and is fast and privately owned. MAN covers a city. WAN covers a large area like a country or the whole world; the internet is the biggest WAN.

**Hinglish mein:** LAN = ek building, MAN = ek city, WAN = pura desh/duniya. Jitna bada area, utna dheere aur mehenga.

Detail: [Network Basics](/cn/basics)
:::

::: details Q3. Client-server aur peer-to-peer model mein kya farak hai?
**Answer:** In client-server, dedicated servers provide services and clients request them, which is easy to manage and secure. In peer-to-peer, every node acts as both client and server, which is cheaper but harder to manage. BitTorrent is peer-to-peer; a website is client-server.

**Hinglish mein:** Client-server mein ek boss server sabko service deta hai. P2P mein sab barabar, har node deta bhi hai aur leta bhi hai.

Detail: [Network Basics](/cn/basics)
:::

::: details Q4. Network topology kya hai, aur kaun kaun si hoti hai?
**Answer:** Topology is the arrangement of nodes and links. Common ones are bus, star, ring, mesh, tree and hybrid. Star is the most common in LANs because one failed cable does not break the whole network.

**Hinglish mein:** Topology matlab devices kis shape mein jude hai. Star sabse common: sab ek central switch se jude hote hai.

Detail: [Network Basics](/cn/basics)
:::

::: details Q5. Full mesh topology mein kitne links chahiye?
**Answer:** A full mesh of n nodes needs n(n-1)/2 links, because every node connects directly to every other node. For 5 nodes that is 5x4/2 = 10 links.

**Hinglish mein:** Full mesh mein har node baaki sabse directly juda hota hai, isliye links = n(n-1)/2. Reliable par bahut mehenga.

Detail: [Network Basics](/cn/basics)
:::

::: details Q6. Simplex, half-duplex aur full-duplex mein kya farak hai?
**Answer:** Simplex is one-way only (keyboard to computer). Half-duplex is two-way but one side at a time (walkie-talkie). Full-duplex is two-way at the same time (phone call). Modern switched Ethernet is full-duplex.

**Hinglish mein:** Simplex = ek taraf. Half-duplex = dono taraf par baari-baari (walkie-talkie). Full-duplex = dono taraf ek saath (phone call).

Detail: [Network Basics](/cn/basics)
:::

::: details Q7. Bandwidth, throughput aur latency mein kya difference hai?
**Answer:** Bandwidth is the maximum capacity of a link. Throughput is the rate actually achieved. Latency is the time for data to travel to the destination. A wide pipe (bandwidth) does not help if latency is high.

**Hinglish mein:** Bandwidth = pipe ki max capacity. Throughput = asli mein kitna mila. Latency = pahunchne mein laga time.

Detail: [Network Basics](/cn/basics)
:::

## OSI aur TCP/IP

::: details Q8. OSI model ki 7 layers kaun si hai?
**Answer:** ⭐ Top to bottom: Application, Presentation, Session, Transport, Network, Data Link, Physical. A common mnemonic is "All People Seem To Need Data Processing". It is a reference model that splits networking into independent layers.

**Hinglish mein:** 7 layers upar se neeche: Application, Presentation, Session, Transport, Network, Data Link, Physical. Yaad rakhne ke liye "All People Seem To Need Data Processing".

Detail: [OSI aur TCP/IP Model](/cn/osi-tcpip)
:::

::: details Q9. OSI aur TCP/IP model mein kya difference hai?
**Answer:** OSI has 7 layers and is a theoretical reference model. TCP/IP is the practical model used by the real internet, with 4 layers (or 5 in many textbooks). TCP/IP combines OSI's top three layers into one Application layer.

**Hinglish mein:** OSI 7-layer theory model hai, TCP/IP 4-layer (ya kitaabon mein 5-layer) practical model jo asli internet use karta hai.

Detail: [OSI aur TCP/IP Model](/cn/osi-tcpip)
:::

::: details Q10. Encapsulation kya hai?
**Answer:** As data moves down the layers, each layer adds its own header (and the data link layer adds a trailer too). Data becomes a segment at Transport, a packet at Network, a frame at Data Link, and bits at Physical. The receiver reverses this, which is decapsulation.

**Hinglish mein:** Neeche jaate waqt har layer apna header lagati hai. Data -> segment -> packet -> frame -> bits. Receiver ulta khol leta hai (decapsulation).

Detail: [OSI aur TCP/IP Model](/cn/osi-tcpip)
:::

::: details Q11. Har layer ka PDU kya kehlata hai?
**Answer:** ⭐ At Transport it is a segment (TCP) or datagram (UDP), at Network a packet, at Data Link a frame, and at Physical bits. The top three layers just deal with data.

**Hinglish mein:** Transport pe segment/datagram, Network pe packet, Data Link pe frame, Physical pe bits. Upar ki teen layers par bas "data".

Detail: [OSI aur TCP/IP Model](/cn/osi-tcpip)
:::

::: details Q12. Router, switch aur hub kaun si layer par kaam karte hai?
**Answer:** A hub and a repeater work at Layer 1 (Physical). A switch and a bridge work at Layer 2 (Data Link) using MAC addresses. A router works at Layer 3 (Network) using IP addresses.

**Hinglish mein:** Hub = L1, switch = L2 (MAC se), router = L3 (IP se). Upar jitna, utna smart device.

Detail: [OSI aur TCP/IP Model](/cn/osi-tcpip)
:::

::: details Q13. ARP kaun si layer par kaam karta hai?
**Answer:** ⭐ ARP maps an IPv4 address to a MAC address on the local network, so it sits between Layer 3 and Layer 2. The request is broadcast and the reply is unicast.

**Hinglish mein:** ARP IP se MAC nikalta hai, isliye L2 aur L3 ke beech ka maana jaata hai. Request broadcast, reply unicast.

Detail: [OSI aur TCP/IP Model](/cn/osi-tcpip)
:::

::: details Q14. HTTP, DNS, TCP, IP aur Ethernet kaun si layer par hai?
**Answer:** HTTP and DNS are Application layer. TCP and UDP are Transport layer. IP and ICMP are Network layer. Ethernet and Wi-Fi are Data Link / Physical.

**Hinglish mein:** HTTP/DNS upar (Application), TCP/UDP Transport, IP/ICMP Network, Ethernet/Wi-Fi neeche (Data Link/Physical).

Detail: [OSI aur TCP/IP Model](/cn/osi-tcpip)
:::

::: details Q15. Transport layer aur network layer ke kaam mein kya farak hai?
**Answer:** ⭐ The network layer delivers packets host to host using IP addresses and routing. The transport layer delivers data process to process using port numbers, and TCP adds reliability on top.

**Hinglish mein:** Network layer host-to-host pahunchati hai (IP se). Transport layer sahi process tak pahunchati hai (port se), aur TCP reliability deta hai.

Detail: [OSI aur TCP/IP Model](/cn/osi-tcpip)
:::

## Data Link

::: details Q16. Data link layer ke main kaam kya hai?
**Answer:** Framing, physical (MAC) addressing, error control, flow control, and media access control. It turns the raw bit stream from the physical layer into reliable frames between two directly connected nodes.

**Hinglish mein:** Data link layer frame banati hai, MAC address lagati hai, error aur flow control karti hai, aur decide karti hai kaun kab bole (access control).

Detail: [Data Link Layer](/cn/data-link)
:::

::: details Q17. MAC address kya hai aur kitne bits ka hota hai?
**Answer:** A MAC address is a 48-bit hardware address burned into the NIC, written as 6 hex pairs. The first 24 bits are the OUI identifying the manufacturer. It is used for delivery within a local network.

**Hinglish mein:** MAC address 48-bit hardware address hota hai, NIC mein fixed. Pehle 24 bits company (OUI) batate hai. Local network ke andar delivery ke liye.

Detail: [Data Link Layer](/cn/data-link)
:::

::: details Q18. MAC address aur IP address mein kya difference hai?
**Answer:** ⭐ A MAC address is a 48-bit physical address fixed in hardware and used within a local network. An IP address is a 32-bit (IPv4) logical address assigned by software and used across networks. MAC is like your Aadhaar number, IP is like your current house address.

**Hinglish mein:** MAC = permanent hardware address (jaise Aadhaar), local use. IP = badalne wala logical address (jaise ghar ka pata), network ke beech routing ke liye.

Detail: [Data Link Layer](/cn/data-link)
:::

::: details Q19. Switch kaise kaam karta hai?
**Answer:** A switch learns the source MAC address on each port into its MAC (CAM) table, then forwards a frame only to the port of the destination MAC. If the destination is unknown, or the frame is a broadcast, it floods it to all other ports.

**Hinglish mein:** Switch har port pe source MAC seekh ke table banata hai. Phir frame sirf sahi port pe bhejta hai. MAC na pata ho to sab ports pe flood karta hai.

Detail: [Data Link Layer](/cn/data-link)
:::

::: details Q20. ARP step by step kaise kaam karta hai?
**Answer:** A host that knows a destination IP but not its MAC broadcasts an ARP request "who has this IP?". The owner replies with its MAC by unicast, and the sender caches it. If the destination is on another network, the host ARPs for the default gateway's MAC instead.

**Hinglish mein:** Host broadcast karta hai "is IP ka MAC kiske paas hai?". Owner apna MAC unicast mein bhejta hai. Doosre network ke liye host gateway ka MAC maangta hai.

Detail: [Data Link Layer](/cn/data-link)
:::

::: details Q21. Collision domain aur broadcast domain mein kya farak hai?
**Answer:** A collision domain is a segment where frames can collide. A broadcast domain is the set of devices that receive each other's broadcasts. A hub is one collision and one broadcast domain. Each switch port is its own collision domain but all share one broadcast domain. Each router interface is a separate broadcast domain.

**Hinglish mein:** Collision domain = jahan frames takra sakte hai. Broadcast domain = jahan tak broadcast pahunchta hai. Switch collision domains todta hai, router broadcast domains todta hai.

Detail: [Data Link Layer](/cn/data-link)
:::

::: details Q22. CSMA/CD aur CSMA/CA mein kya difference hai?
**Answer:** CSMA/CD is used in classic half-duplex Ethernet: detect a collision, send a jam signal, then back off randomly. CSMA/CA is used in Wi-Fi: it tries to avoid collisions with random backoff and ACKs because wireless cannot reliably detect collisions.

**Hinglish mein:** CSMA/CD purane Ethernet mein collision detect karke sambhalta hai. CSMA/CA Wi-Fi mein collision pehle se avoid karne ki koshish karta hai, kyunki wireless mein detect mushkil hai.

Detail: [Data Link Layer](/cn/data-link)
:::

## IP aur Subnetting

::: details Q23. IPv4 address kya hai aur kitne bits ka hota hai?
**Answer:** An IPv4 address is a 32-bit logical address written as four decimal numbers (0-255) separated by dots, for example 192.168.1.10. It has a network part and a host part decided by the subnet mask.

**Hinglish mein:** IPv4 32-bit address hai, 4 decimal numbers (0-255) mein likha jaata hai. Subnet mask batata hai kaun sa hissa network ka hai aur kaun sa host ka.

Detail: [IP Addressing aur Subnetting](/cn/ip-addressing)
:::

::: details Q24. Subnet mask aur CIDR notation kya hai?
**Answer:** ⭐ The subnet mask separates the network bits from the host bits. CIDR notation writes the number of network bits after a slash, so /24 means 255.255.255.0. A /27 has 27 network bits and 5 host bits.

**Hinglish mein:** Subnet mask network aur host bits ko alag karta hai. CIDR mein network bits slash ke baad likhte hai: /24 matlab 255.255.255.0.

Detail: [IP Addressing aur Subnetting](/cn/ip-addressing)
:::

::: details Q25. Private aur public IP mein kya farak hai?
**Answer:** Public IPs are globally unique and routable on the internet. Private IPs (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) are used inside local networks and are not routable on the internet; NAT maps them to a public IP.

**Hinglish mein:** Public IP internet par unique hoti hai. Private IP (10.x, 172.16-31.x, 192.168.x) ghar/office ke andar use hoti hai, internet par nahi jaati; NAT ise public IP mein badalta hai.

Detail: [IP Addressing aur Subnetting](/cn/ip-addressing)
:::

::: details Q26. RFC 1918 private IP ranges kaun si hai?
**Answer:** 10.0.0.0/8, 172.16.0.0 to 172.31.255.255 (172.16.0.0/12), and 192.168.0.0/16. Loopback is 127.0.0.0/8 and APIPA / link-local is 169.254.0.0/16.

**Hinglish mein:** Private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. Loopback 127.x, APIPA 169.254.x.

Detail: [IP Addressing aur Subnetting](/cn/ip-addressing)
:::

::: details Q27. 192.168.10.75/27 ka network aur broadcast address kya hoga?
**Answer:** A /27 mask is 255.255.255.224, block size 256-224 = 32. Blocks are 0, 32, 64, 96, so 75 falls in the 64-95 block. Network = 192.168.10.64, broadcast = 192.168.10.95, usable range 192.168.10.65 to 192.168.10.94, 30 hosts.

**Hinglish mein:** /27 = block size 32. 75 aata hai 64-95 block mein. Network .64, broadcast .95, usable .65 se .94, 30 hosts.

Detail: [IP Addressing aur Subnetting](/cn/ip-addressing)
:::

::: details Q28. /27 subnet mein kitne usable hosts hote hai?
**Answer:** A /27 leaves 5 host bits, so total 2^5 = 32 addresses. Two are reserved (network and broadcast), giving 2^5 - 2 = 30 usable hosts.

**Hinglish mein:** /27 mein 5 host bits bachte hai, 2^5 = 32 addresses. Network aur broadcast ko chhodo to 30 usable hosts.

Detail: [IP Addressing aur Subnetting](/cn/ip-addressing)
:::

::: details Q29. Agar mujhe 50 hosts chahiye to kaun sa prefix lu?
**Answer:** You need host bits h such that 2^h - 2 >= 50. With 6 host bits, 2^6 - 2 = 62 >= 50, so use a /26. A /27 gives only 30, which is too few.

**Hinglish mein:** 2^h - 2 >= 50 chahiye. 6 host bits se 62 milte hai, to /26 lo. /27 se sirf 30 milenge, kam pad jaayenge.

Detail: [IP Addressing aur Subnetting](/cn/ip-addressing)
:::

::: details Q30. Classful addressing mein class A, B, C kya hai?
**Answer:** Class A has first octet 1-126 with default /8, Class B has 128-191 with /16, and Class C has 192-223 with /24. Class D (224-239) is multicast and Class E (240-255) is experimental. Classful addressing wasted addresses, which led to CIDR.

**Hinglish mein:** Class A: 1-126 (/8), Class B: 128-191 (/16), Class C: 192-223 (/24). D multicast, E experimental. Classful bahut address waste karta tha, isliye CIDR aaya.

Detail: [IP Addressing aur Subnetting](/cn/ip-addressing)
:::

::: details Q31. NAT kya hai aur kyun zaroori hai?
**Answer:** ⭐ NAT translates a private source IP and port to the router's public IP and port. PAT (NAPT) lets many devices share one public IP by using different port numbers. It saves scarce IPv4 addresses and hides the internal network.

**Hinglish mein:** NAT private IP:port ko router ki public IP:port mein badalta hai. PAT se kai devices ek hi public IP share kar lete hai. Isse IPv4 address bachte hai.

Detail: [IP Addressing aur Subnetting](/cn/ip-addressing)
:::

::: details Q32. IPv4 aur IPv6 mein kya difference hai?
**Answer:** IPv4 is 32-bit (about 4.3 billion addresses) in dotted decimal. IPv6 is 128-bit in hex, giving a huge address space. IPv6 has no broadcast (uses multicast/anycast), no header checksum, and routers do not fragment packets.

**Hinglish mein:** IPv4 32-bit (address kam pad gaye). IPv6 128-bit (lagbhag unlimited). IPv6 mein broadcast nahi, header checksum nahi, aur router fragment nahi karte.

Detail: [IP Addressing aur Subnetting](/cn/ip-addressing)
:::

## Routing

::: details Q33. Routing kya hai aur routing table mein kya hota hai?
**Answer:** Routing is choosing the path a packet takes across networks. A routing table lists destination prefixes with the next hop, outgoing interface and metric. The router picks the best entry and forwards the packet.

**Hinglish mein:** Routing matlab packet kaun se raaste jaayega. Routing table mein destination prefix, next hop, interface aur metric hote hai. Router best entry chunta hai.

Detail: [Routing](/cn/routing)
:::

::: details Q34. Longest prefix match kya hota hai?
**Answer:** When multiple routing table entries match a destination IP, the router picks the one with the longest (most specific) prefix. For example, 192.168.1.0/24 is preferred over 192.168.0.0/16 for 192.168.1.5.

**Hinglish mein:** Agar kai entries match karein, router sabse lamba (sabse specific) prefix chunta hai. /24 ko /16 par preference milti hai.

Detail: [Routing](/cn/routing)
:::

::: details Q35. Ek packet jab router se guzarta hai to kya badalta hai aur kya nahi?
**Answer:** The source and destination IP addresses stay the same end to end (unless NAT rewrites them). The source and destination MAC addresses change at every hop, and the TTL is decremented by one at each router.

**Hinglish mein:** Har hop par MAC address badalta hai aur TTL ek kam hota hai. Source/destination IP end-to-end same rehti hai (NAT chhod ke).

Detail: [Routing](/cn/routing)
:::

::: details Q36. Distance vector aur link state routing mein kya farak hai?
**Answer:** ⭐ Distance vector (RIP) shares its whole table with neighbours and uses hop count; it converges slowly and can suffer count-to-infinity. Link state (OSPF) floods link information so every router builds the full map and runs Dijkstra; it converges faster and scales better.

**Hinglish mein:** Distance vector (RIP) padosi ko apni poori table batata hai, slow hota hai. Link state (OSPF) sabko links batata hai, har router pura map banake Dijkstra chalata hai, fast hota hai.

Detail: [Routing](/cn/routing)
:::

::: details Q37. RIP, OSPF aur BGP mein kya difference hai?
**Answer:** ⭐ RIP is distance vector with a max of 15 hops, good for small networks. OSPF is link state, used inside large organizations. BGP is a path vector protocol that runs between autonomous systems and is the routing protocol of the internet.

**Hinglish mein:** RIP chhote network ke liye (max 15 hops). OSPF badi organization ke andar. BGP alag-alag ISP/AS ke beech chalta hai, yahi internet ka routing protocol hai.

Detail: [Routing](/cn/routing)
:::

::: details Q38. Ping aur traceroute kaise kaam karte hai?
**Answer:** Ping uses ICMP Echo Request (type 8) and Echo Reply (type 0) to check reachability and measure round-trip time. Traceroute sends packets with TTL 1, 2, 3 and so on; each router that drops a packet sends back an ICMP Time Exceeded, revealing the path hop by hop.

**Hinglish mein:** Ping ICMP echo bhej ke check karta hai device pahunch raha hai ya nahi. Traceroute TTL 1,2,3 badhata jaata hai, har router "Time Exceeded" bhejta hai, isse raasta pata chalta hai.

Detail: [Routing](/cn/routing)
:::

## TCP aur UDP

::: details Q39. Transport layer ka main kaam kya hai?
**Answer:** The transport layer provides process-to-process delivery using port numbers. It multiplexes many application streams over one host and, in the case of TCP, adds reliability, ordering, flow control and congestion control.

**Hinglish mein:** Transport layer sahi process tak data pahunchati hai port number se. TCP iske upar reliability, order, flow aur congestion control bhi deta hai.

Detail: [TCP aur UDP](/cn/tcp-udp)
:::

::: details Q40. Port number kya hai aur ranges kya hai?
**Answer:** A port is a 16-bit number (0-65535) that identifies a process on a host. 0-1023 are well-known ports (HTTP 80, HTTPS 443), 1024-49151 are registered, and 49152-65535 are dynamic/ephemeral. An IP plus a port is a socket.

**Hinglish mein:** Port 16-bit number (0-65535) hai jo host par process ko pehchanta hai. 0-1023 well-known, 1024-49151 registered, baaki ephemeral. IP + port = socket.

Detail: [TCP aur UDP](/cn/tcp-udp)
:::

::: details Q41. TCP aur UDP mein kya difference hai?
**Answer:** ⭐ TCP is connection-oriented and reliable: it uses a handshake, sequence numbers, ACKs, retransmission, in-order delivery, flow control and congestion control. UDP is connectionless and unreliable but fast and low-overhead. Use TCP for web and email, UDP for DNS, video calls and gaming.

**Hinglish mein:** TCP reliable aur connection-oriented hai (handshake, ACK, order). UDP fast aur connectionless, bina guarantee. Web/email TCP, aur DNS/video call/gaming UDP use karte hai.

Detail: [TCP aur UDP](/cn/tcp-udp)
:::

::: details Q42. TCP 3-way handshake kaise hota hai?
**Answer:** The client sends SYN with its initial sequence number, the server replies SYN+ACK, and the client sends a final ACK. Now both sides know each other's starting sequence numbers and the connection is established. For example, SYN seq=1000, SYN-ACK seq=5000 ack=1001, ACK seq=1001 ack=5001.

**Hinglish mein:** Client SYN bhejta hai, server SYN+ACK deta hai, client ACK bhejta hai. Teen step mein dono ke sequence numbers set ho jaate hai aur connection ban jaata hai.

Detail: [TCP aur UDP](/cn/tcp-udp)
:::

::: details Q43. Handshake 3-way hi kyun hota hai, 2-way kyun nahi?
**Answer:** Both sides must agree on each other's initial sequence number. Two messages only confirm one direction. A third message confirms the server's sequence number to the client and prevents old duplicate SYNs from opening stale connections.

**Hinglish mein:** Dono taraf ke sequence number confirm karne padte hai. 2 message se sirf ek direction confirm hoti hai; teesra message doosri direction aur purane duplicate SYN se bachaata hai.

Detail: [TCP aur UDP](/cn/tcp-udp)
:::

::: details Q44. TCP connection kaise band hoti hai aur TIME_WAIT kya hai?
**Answer:** Termination is a 4-way exchange: FIN, ACK, FIN, ACK (the middle two can combine). The side that closes first enters TIME_WAIT for 2 x MSL to make sure the final ACK arrives and old duplicate segments die out.

**Hinglish mein:** Close karne ke liye FIN, ACK, FIN, ACK (4-way). Jo pehle close karta hai wo 2xMSL tak TIME_WAIT mein rukta hai, taaki last ACK pahunch jaaye aur purane packets khatam ho jaayein.

Detail: [TCP aur UDP](/cn/tcp-udp)
:::

::: details Q45. Flow control aur congestion control mein kya farak hai?
**Answer:** ⭐ Flow control stops a fast sender from overflowing a slow receiver, using the receiver window (rwnd). Congestion control stops senders from overflowing the network, using the congestion window (cwnd) with slow start and congestion avoidance. The sender uses the smaller of the two.

**Hinglish mein:** Flow control receiver ko overflow hone se bachaata hai (rwnd). Congestion control network ko jam hone se bachaata hai (cwnd). Sender dono mein se chhota window use karta hai.

Detail: [TCP aur UDP](/cn/tcp-udp)
:::

::: details Q46. TCP congestion control ke phases kya hai?
**Answer:** Slow start doubles cwnd every RTT until it reaches ssthresh. Congestion avoidance then grows cwnd by 1 MSS per RTT. On a timeout, ssthresh becomes cwnd/2 and cwnd resets to 1 MSS. On 3 duplicate ACKs, TCP does fast retransmit, and Reno does fast recovery instead of dropping to 1.

**Hinglish mein:** Slow start mein cwnd har RTT double hota hai ssthresh tak. Phir congestion avoidance mein +1 per RTT. Timeout par ssthresh = cwnd/2 aur cwnd = 1. 3 duplicate ACK par fast retransmit.

Detail: [TCP aur UDP](/cn/tcp-udp)
:::

::: details Q47. TCP server aur client ke socket calls kya hai?
**Answer:** A TCP server calls socket, bind, listen, accept, then recv/send and close. A TCP client calls socket, connect, then send/recv and close. UDP uses sendto/recvfrom with no listen or accept.

**Hinglish mein:** TCP server: socket -> bind -> listen -> accept -> recv/send -> close. TCP client: socket -> connect -> send/recv -> close. UDP mein listen/accept nahi, sendto/recvfrom use hota hai.

Detail: [TCP aur UDP](/cn/tcp-udp)
:::

::: details Q48. UDP kahan use hota hai aur header kitne bytes ka hai?
**Answer:** UDP has an 8-byte header (source port, destination port, length, checksum). It is used where speed matters more than reliability: DNS, DHCP, VoIP, video calls, online games, and QUIC (HTTP/3).

**Hinglish mein:** UDP ka header sirf 8 bytes ka hai. Jahan speed zyada zaroori ho reliability se, wahan use hota hai: DNS, DHCP, VoIP, video call, gaming, QUIC.

Detail: [TCP aur UDP](/cn/tcp-udp)
:::

## Application Layer

::: details Q49. HTTP stateless kyun kaha jaata hai?
**Answer:** HTTP is stateless because the server does not remember anything about previous requests on its own; each request is independent. Cookies, sessions and tokens are added on top to maintain state like a logged-in user.

**Hinglish mein:** HTTP khud se pichhli request yaad nahi rakhta, har request alag hoti hai. State (jaise login) banane ke liye cookies, session aur token lagte hai.

Detail: [Application Layer: HTTP, DNS, DHCP](/cn/application-layer)
:::

::: details Q50. GET aur POST mein kya difference hai?
**Answer:** ⭐ GET requests data and puts parameters in the URL; it is safe and idempotent and can be cached. POST sends data in the body to create or change something; it is not safe, not idempotent, and not cached. Use GET to fetch, POST to submit.

**Hinglish mein:** GET data laata hai, parameters URL mein, safe aur idempotent. POST body mein data bhej ke kuch create/change karta hai, cache nahi hota. Fetch ke liye GET, submit ke liye POST.

Detail: [Application Layer: HTTP, DNS, DHCP](/cn/application-layer)
:::

::: details Q51. HTTP status code classes kya hai?
**Answer:** 1xx is informational, 2xx is success (200 OK, 201 Created, 204 No Content), 3xx is redirect (301 Moved Permanently, 302 Found, 304 Not Modified), 4xx is client error (400, 401, 403, 404, 429), and 5xx is server error (500, 502, 503, 504).

**Hinglish mein:** 1xx info, 2xx success, 3xx redirect, 4xx client ki galti (404 not found), 5xx server ki galti (500). 401 = login nahi, 403 = login hai par allowed nahi.

Detail: [Application Layer: HTTP, DNS, DHCP](/cn/application-layer)
:::

::: details Q52. HTTP/1.1, HTTP/2 aur HTTP/3 mein kya farak hai?
**Answer:** HTTP/1.1 uses persistent text connections but one request at a time per connection, causing head-of-line blocking. HTTP/2 uses binary framing and multiplexes many streams over one TCP connection with header compression. HTTP/3 runs over QUIC on UDP, removing TCP head-of-line blocking and with faster, TLS 1.3 built-in setup.

**Hinglish mein:** HTTP/1.1 ek connection par ek-ek request. HTTP/2 ek TCP connection par kai streams saath mein. HTTP/3 QUIC (UDP) par chalta hai, aur bhi fast.

Detail: [Application Layer: HTTP, DNS, DHCP](/cn/application-layer)
:::

::: details Q53. DNS kya hai aur resolution kaise hota hai?
**Answer:** DNS translates a domain name into an IP address. The resolver checks caches, then queries a root server, then the TLD server (.com), then the authoritative server, and returns the IP, which is cached for its TTL. Client to resolver is a recursive query; resolver to root/TLD/authoritative are iterative queries.

**Hinglish mein:** DNS naam ko IP mein badalta hai. Resolver pehle cache dekhta hai, phir root -> TLD (.com) -> authoritative server se IP laata hai aur TTL tak cache karta hai.

Detail: [Application Layer: HTTP, DNS, DHCP](/cn/application-layer)
:::

::: details Q54. DNS kaun sa port aur protocol use karta hai?
**Answer:** ⭐ DNS uses port 53. Normal queries use UDP 53 because they are small and fast. TCP 53 is used for zone transfers and large responses that do not fit in a single UDP packet.

**Hinglish mein:** DNS port 53 par chalta hai. Normal query UDP 53 (chhoti, fast). Zone transfer aur badi response TCP 53 use karti hai.

Detail: [Application Layer: HTTP, DNS, DHCP](/cn/application-layer)
:::

::: details Q55. DHCP DORA process kya hai?
**Answer:** DORA stands for Discover, Offer, Request, Acknowledge. The client broadcasts Discover, a server sends Offer, the client sends Request, and the server sends Acknowledge. DHCP hands out an IP address, subnet mask, default gateway, DNS server and a lease time. It uses port 67 (server) and 68 (client).

**Hinglish mein:** DORA = Discover, Offer, Request, Acknowledge. Client IP maangta hai aur server IP, subnet mask, gateway, DNS aur lease time deta hai. Ports 67 (server) aur 68 (client).

Detail: [Application Layer: HTTP, DNS, DHCP](/cn/application-layer)
:::

::: details Q56. SMTP, POP3 aur IMAP mein kya difference hai?
**Answer:** SMTP (port 25/587) sends mail. POP3 (port 110) downloads mail and usually deletes it from the server, so it is single-device. IMAP (port 143) keeps mail on the server and syncs across many devices.

**Hinglish mein:** SMTP mail bhejne ke liye. POP3 mail download karke server se hata deta hai (ek device). IMAP mail server par rakhta hai aur sab devices mein sync karta hai.

Detail: [Application Layer: HTTP, DNS, DHCP](/cn/application-layer)
:::

## Security

::: details Q57. CIA triad kya hai?
**Answer:** CIA stands for Confidentiality, Integrity and Availability. Confidentiality keeps data secret, integrity keeps it unchanged, and availability keeps it accessible. These are the three core goals of information security.

**Hinglish mein:** CIA = Confidentiality (data secret rahe), Integrity (data change na ho), Availability (data mil sake). Ye security ke teen main goals hai.

Detail: [Network Security](/cn/security)
:::

::: details Q58. Symmetric aur asymmetric encryption mein kya farak hai?
**Answer:** ⭐ Symmetric encryption uses the same key on both sides (AES); it is fast but has a key-sharing problem. Asymmetric encryption uses a public/private key pair (RSA, ECC); it is slower but solves key exchange and enables digital signatures. TLS uses asymmetric crypto to exchange a fast symmetric key.

**Hinglish mein:** Symmetric mein dono taraf same key (AES), fast par key share karna problem. Asymmetric mein public/private key pair (RSA), slow par key exchange solve karta hai. TLS dono ka mel use karta hai.

Detail: [Network Security](/cn/security)
:::

::: details Q59. Hashing, encryption aur encoding mein kya difference hai?
**Answer:** Hashing (SHA-256) is one-way and used for integrity and password storage with a salt; you cannot reverse it. Encryption is two-way with a key to keep data secret. Encoding (Base64) just changes format for transport and is not secure at all.

**Hinglish mein:** Hashing one-way hai (password store, integrity), wapas nahi aa sakte. Encryption key se do-way, data secret rakhne ke liye. Encoding (Base64) sirf format badalta hai, secure nahi hota.

Detail: [Network Security](/cn/security)
:::

::: details Q60. HTTPS aur TLS handshake kaise kaam karta hai?
**Answer:** HTTPS is HTTP over TLS on port 443. In a TLS 1.3 handshake the client and server exchange supported ciphers and key shares, the server sends its certificate, and both derive the same symmetric session key using ECDHE in one round trip. The browser verifies the certificate chain up to a trusted root CA, then bulk data is encrypted with a fast symmetric cipher like AES-GCM.

**Hinglish mein:** HTTPS = HTTP + TLS (port 443). TLS handshake mein cipher aur key share hote hai, server certificate bhejta hai, dono same symmetric key banate hai. Browser certificate verify karta hai, phir data symmetric key se encrypt hota hai.

Detail: [Network Security](/cn/security)
:::
