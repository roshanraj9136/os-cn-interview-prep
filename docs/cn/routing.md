# Routing

Routing matlab ye decide karna ki packet ko destination tak pahunchane ke liye kaun se raste bheja jaaye. Is page mein aap seekhenge routing table kya hota hai, longest prefix match, packet ek hop se doosre hop tak kaise jaata hai, aur routing protocols (RIP, OSPF, BGP). Dijkstra aur distance-vector interview mein common hain.

| Topic | Kitna puchha jaata hai |
|---|---|
| Distance vector vs link state | ⭐⭐⭐ |
| Packet ka safar (MAC vs IP kya change hota hai) | ⭐⭐⭐ |
| Longest prefix match | ⭐⭐ |
| Dijkstra / OSPF | ⭐⭐ |
| ICMP, ping, traceroute | ⭐⭐ |

## Routing kya hai

Router ek L3 (Network layer) device hai jo alag-alag networks ko jodta hai. Jab packet aata hai, router apni routing table dekh kar decide karta hai packet kis next device (next hop) ko bhejna hai.

Analogy: aap courier bhejte ho. Har sorting center (router) address dekh kar packet ko agle sahi center ki taraf bhej deta hai, bina pura raasta jaane. Bas agla kadam pata hota hai.

### Sample routing table

| Destination | Prefix | Next hop | Interface | Metric |
|---|---|---|---|---|
| 192.168.1.0 | /24 | directly connected | eth0 | 0 |
| 10.0.0.0 | /8 | 192.168.1.2 | eth0 | 10 |
| 172.16.5.0 | /24 | 192.168.1.3 | eth0 | 20 |
| 0.0.0.0 | /0 | 192.168.1.1 | eth0 | 1 |

Har row batati hai: is destination network ke liye packet kis next hop ko, kis interface se bhejna hai. Metric cost hai (jitna kam, utna accha).

::: tip Interview mein aise bolo
Routing is the process of selecting a path for a packet across networks. A router keeps a routing table of destination networks, each with a next hop and outgoing interface. For every packet, it looks up the destination IP in this table and forwards the packet to the best matching next hop.
:::

### Longest prefix match

Agar ek destination ke liye table mein ek se zyada entry match karti ho, to router sabse lambe prefix wali entry choose karta hai, kyunki wo sabse specific (sahi) match hai.

```text
Destination IP: 192.168.1.130

Table entries that match:
  0.0.0.0/0        -> default (matches everything)
  192.168.0.0/16   -> matches
  192.168.1.128/25 -> matches, and it is the longest (/25)

Winner: 192.168.1.128/25  (most specific)
```

::: tip Interview mein aise bolo
When multiple routes match a destination, the router uses longest prefix match: it picks the route with the longest matching prefix because that is the most specific. For example, 192.168.1.128/25 wins over 192.168.0.0/16 and the default route 0.0.0.0/0.
:::

## Default gateway aur default route

Default gateway wo router hai jisko aapka device tab packet bhejta hai jab destination apne local network mein nahi hai. Ghar mein ye aapka Wi-Fi router hota hai.

Default route `0.0.0.0/0` hai. Iska matlab "baaki sab kuch", yaani jab koi aur specific route match na kare, to packet default gateway ko chala jaata hai.

::: details Follow-up: device kaise jaane destination local hai ya door?
Device destination IP ko apne subnet mask se AND karta hai aur apne network address se compare karta hai. Same network -> seedha ARP karke bhej do. Alag network -> default gateway ke MAC ke liye ARP karke, gateway ko bhej do.
:::

## Packet ka safar: PC1 se PC2 <Badge type="danger" text="Most Asked" />

Ye bahut puchha jaata hai: packet jab kai routers se guzarta hai, to kya change hota hai aur kya same rehta hai.

```text
PC1 --- R1 --- R2 --- R3 --- PC2
(src IP = PC1, dst IP = PC2 : ye end-to-end same rehte hain)

Hop:        PC1->R1     R1->R2      R2->R3      R3->PC2
Src MAC:    PC1         R1          R2          R3
Dst MAC:    R1          R2          R3          PC2
Src IP:     PC1         PC1         PC1         PC1   (same)
Dst IP:     PC2         PC2         PC2         PC2   (same)
TTL:        64          63          62          61   (ghatta hai)
```

Yaad rakho:

- Source aur destination IP address end-to-end same rehte hain (jab tak NAT na ho).
- Source aur destination MAC address har hop par badalte hain (kyunki MAC sirf agle device tak ka hota hai).
- Har router TTL ko 1 se ghatata hai. TTL 0 ho gaya to packet drop ho jaata hai aur sender ko ICMP Time Exceeded bhejta hai.

::: tip Interview mein aise bolo
As a packet travels from source to destination, the source and destination IP addresses stay the same end to end, unless NAT rewrites them. But the source and destination MAC addresses change at every hop, because a MAC address only identifies the next device on the local link. Each router also decrements the TTL by one, and if TTL reaches zero the packet is dropped and an ICMP Time Exceeded message is returned.
:::

::: warning Common galti
Log sochte hain MAC address end tak same rehta hai. Galat. MAC sirf ek link (ek hop) ke liye hota hai, isliye har router par source/destination MAC naya ho jaata hai. IP address hi end-to-end constant rehta hai.
:::

## Static vs dynamic routing

| Point | Static routing | Dynamic routing |
|---|---|---|
| Kaise set hota hai | admin manually likhta hai | protocol khud seekhta hai |
| Badlaav par | admin ko haath se update karna | khud adjust ho jaata hai |
| Overhead | koi nahi | CPU/bandwidth use hota hai |
| Scale | chhote networks | bade networks |
| Example | `route add` command | RIP, OSPF, BGP |

Static routing chhote, kam badalne wale networks ke liye theek hai. Dynamic routing bade networks mein, jahan links badalte rehte hain.

## Dynamic routing protocols <Badge type="danger" text="Most Asked" />

Do main families hain: distance vector aur link state.

### Distance vector (RIP)

Har router sirf apne padosi (neighbour) routers ko apni poori routing table batata hai. "Rumour-based": router ko pura map nahi pata, bas padosi se suni hui doori pata hoti hai.

- RIP distance vector protocol hai, Bellman-Ford algorithm par based.
- Metric = hop count (kitne routers beech mein). Max 15 hops; 16 ka matlab "unreachable".
- Problem: count-to-infinity. Jab ek link down ho, galat info routers ke beech ghoomti rehti hai aur metric dheere dheere badhti rehti hai.
- Fixes: split horizon (jis neighbour se route seekha usi ko wapas na batao), route poisoning / poison reverse (down route ko metric 16 bhej do), hold-down timers (thodi der update accept na karo).

### Link state (OSPF)

Har router poore network ka map (topology) seekhta hai LSAs (Link State Advertisements) se, phir khud shortest path nikalta hai.

- OSPF link state protocol hai, Dijkstra algorithm use karta hai.
- Har router ke paas pura map hota hai, isliye fast converge karta hai (jaldi settle hota hai).
- Areas support karta hai (bade networks ko hisson mein baantna).

### Distance vector vs link state

| Point | Distance vector (RIP) | Link state (OSPF) |
|---|---|---|
| Kya share karta hai | poori table, sirf padosi ko | link info, sab tak (flooding) |
| Knowledge | sirf padosi se suni doori | pura network map |
| Algorithm | Bellman-Ford | Dijkstra |
| Metric | hop count | cost (bandwidth based) |
| Convergence | dheemi | tez |
| Problem | count-to-infinity | zyada CPU/memory |

### Dijkstra example (OSPF jaisa)

Dijkstra source se har node tak ka sabse sasta raasta nikalta hai. Links aur cost:
A-B = 4, A-C = 2, B-C = 1, B-D = 5, C-D = 8, C-E = 10, D-E = 2. Source = A.

Nodes is order mein finalise hote hain: A (0), C (2), B (3), D (8), E (10).

| Destination | Shortest cost from A | Path | Next hop from A |
|---|---|---|---|
| B | 3 | A -> C -> B | C |
| C | 2 | A -> C | C |
| D | 8 | A -> C -> B -> D | C |
| E | 10 | A -> C -> B -> D -> E | C |

Dhyan do: direct link A-B ka cost 4 hai, lekin A -> C -> B ka cost sirf 3. Isliye A, B ke liye traffic C ke through bhejta hai, direct nahi.

::: tip Interview mein aise bolo
Distance vector protocols like RIP share their whole routing table with neighbours and use hop count with the Bellman-Ford algorithm, but they suffer from the count-to-infinity problem. Link state protocols like OSPF flood link information so every router builds the full network map and runs Dijkstra's shortest path algorithm, which converges much faster. OSPF scales better, so large enterprise networks usually prefer it.
:::

::: details Follow-up: count-to-infinity problem exactly kya hai?
Jab ek network down ho jaaye, ek router apne padosi se purana (galat) route sun leta hai aur sochta hai doosra raasta hai. Dono ek doosre se baar baar seekh kar metric 1-1 karke badhate rehte hain, infinity (RIP mein 16) tak. Split horizon aur route poisoning isi ko rokte hain.
:::

### Path vector (BGP) aur AS

BGP (Border Gateway Protocol) path vector protocol hai. Ye internet ka routing protocol hai, jo alag-alag organisations ke networks ko jodta hai.

Autonomous System (AS) matlab ek organisation (jaise ek ISP) ke control mein aane wale networks ka group, jiska ek AS number hota hai. BGP inhi AS ke beech route karta hai aur pura AS path track karta hai (loop rokne ke liye).

- Interior Gateway Protocol (IGP): ek hi AS ke andar chalta hai. Example: RIP, OSPF.
- Exterior Gateway Protocol (EGP): alag-alag AS ke beech chalta hai. Example: BGP.

::: tip Interview mein aise bolo
BGP is a path vector protocol and it is the routing protocol of the internet. It runs between autonomous systems, which are networks under a single administrative control, and exchanges the full AS path to each destination. Protocols like RIP and OSPF are interior gateway protocols used inside one AS, while BGP is the exterior gateway protocol used between them.
:::

## ICMP, ping aur traceroute

ICMP (Internet Control Message Protocol) network layer par error aur diagnostic messages bhejta hai. Ye data nahi bhejta, bas "status" batata hai (jaise destination unreachable, time exceeded).

### ping

ping check karta hai ki koi host reachable hai ya nahi. Ye ICMP Echo Request (type 8) bhejta hai aur host ICMP Echo Reply (type 0) wapas bhejta hai. Round-trip time (RTT) bhi dikhata hai.

### traceroute

traceroute raaste ke saare routers dikhata hai. Trick: ye packets bhejta hai badhte hue TTL ke saath (pehle TTL 1, phir 2, phir 3...).

```text
TTL = 1 -> R1 drops it, sends ICMP Time Exceeded -> R1 ka pata chala
TTL = 2 -> R2 drops it, sends ICMP Time Exceeded -> R2 ka pata chala
TTL = 3 -> R3 drops it, sends ICMP Time Exceeded -> R3 ka pata chala
... jab tak destination tak na pahunch jaaye
```

Note: Windows `tracert` ICMP echo use karta hai; Linux `traceroute` default mein UDP probes bhejta hai.

::: tip Interview mein aise bolo
ICMP carries error and diagnostic messages for IP, not user data. Ping uses ICMP Echo Request and Echo Reply to check if a host is reachable and to measure round-trip time. Traceroute sends packets with increasing TTL values, so each router along the path drops one packet and replies with ICMP Time Exceeded, which reveals the full route hop by hop.
:::

## Yaad rakhne layak points

- Router L3 device hai; routing table dekh kar next hop decide karta hai.
- Ek se zyada route match ho to longest prefix match jeetta hai (sabse specific).
- Default route `0.0.0.0/0` default gateway ki taraf jaata hai.
- IP address end-to-end same; MAC address har hop par badalta hai; TTL har router par 1 ghatta hai.
- Static routing manual, dynamic routing (RIP/OSPF/BGP) khud seekhta hai.
- RIP = distance vector, Bellman-Ford, hop count, max 15 hops, count-to-infinity problem.
- OSPF = link state, Dijkstra, pura map, fast convergence.
- BGP = path vector, internet ka protocol, AS ke beech chalta hai.
- IGP (RIP, OSPF) ek AS ke andar; EGP (BGP) AS ke beech.
- ping = ICMP echo; traceroute = badhte TTL + ICMP Time Exceeded.

## Quick Quiz

<Quiz id="cn-routing" title="Routing Quiz" />
