# Network Basics

Is page par network ki buniyaadi cheezein seekhenge: network kya hai, uske types (LAN, WAN), topology, devices (hub, switch, router) aur delays. Ye foundation hai - ispe baaki saare CN topics tike hain. Interview mein "Hub vs Switch vs Router" aur delay ka numerical bahut common hai.

| Topic | Kitna puchha jaata hai |
|---|---|
| Hub vs Switch vs Router | ⭐⭐⭐ |
| Network types (LAN/WAN) | ⭐⭐ |
| Delays ka numerical | ⭐⭐ |
| Topology | ⭐⭐ |
| Transmission modes | ⭐ |
| Unicast/multicast/broadcast | ⭐ |

## Network kya hai

Network matlab do ya zyada computing devices jo aapas mein jude hain aur data share karte hain. Jude hone ka matlab wire (cable) ya wireless (Wi-Fi) ho sakta hai.

Do shabd yaad rakho:

- **Node:** network ka koi bhi device - computer, phone, printer, router.
- **Link:** do nodes ke beech ka connection (cable ya wireless).

### Client-server vs Peer-to-peer

Network mein devices aapas mein do tareeke se baat karte hain.

Client-server mein ek central server sabko service deta hai (jaise restaurant ka kitchen, aur sab customers client). Peer-to-peer (P2P) mein har device barabar hai, sab ek doosre ko seedhe data de sakte hain (jaise dost aapas mein files share kar rahe hon).

| Point | Client-Server | Peer-to-Peer (P2P) |
|---|---|---|
| Role | Server deta hai, client leta hai | Sab barabar, dono role |
| Example | Web (browser + web server), email | BitTorrent, blockchain |
| Control | Central, manage karna easy | Distributed, manage karna mushkil |
| Cost | Server mehnga | Sasta, dedicated server nahi |
| Failure | Server down to sab down | Ek node down to baaki chalte rahein |

::: tip Interview mein aise bolo
In a client-server model, a central server provides resources or services and clients request them, like a browser requesting a page from a web server. In peer-to-peer, every node is equal and acts as both client and server, sharing resources directly, like BitTorrent. Client-server is easier to manage and secure; P2P scales cheaply and has no single point of failure.
:::

## Network ke types (size ke hisaab se)

| Type | Full form | Range | Example |
|---|---|---|---|
| PAN | Personal Area Network | Few meters | Bluetooth earbuds, phone hotspot |
| LAN | Local Area Network | Ek building / campus | Office, college lab, ghar ka Wi-Fi |
| MAN | Metropolitan Area Network | Ek sheher | Cable TV network, city-wide Wi-Fi |
| WAN | Wide Area Network | Desh / duniya | The Internet, company ke multiple offices |

### Internet vs Intranet vs Extranet

- **Internet:** poori duniya ka public network. Sabke liye khula.
- **Intranet:** ek organization ka private network, sirf andar ke logon ke liye (company ka internal portal).
- **Extranet:** intranet ka ek hissa jo bahar ke trusted partners ko bhi diya jaata hai (vendor ya supplier ko access dena).

## Topologies

Topology matlab network ke devices kis shape mein jude hain.

### Bus

Ek single main cable, sab devices usse jude. Sasta par cable toote to poora network down.

```text
A --- B --- C --- D      (sab ek hi cable par)
```

### Star

Sab devices ek central device (switch/hub) se jude. Aaj sabse common.

```text
      A
      |
  B---S---C      (S = central switch)
      |
      D
```

### Ring

Har device agle do padosiyon se juda, ek circle banta hai. Data ek direction mein ghoomta hai.

```text
A --- B
|     |
D --- C
```

### Mesh

Har device har doosre device se seedha juda. Bahut reliable par bahut zyada cable.

Full mesh mein `n` nodes ke liye links = `n(n-1)/2`. Jaise 5 nodes -> 5 x 4 / 2 = 10 links.

| Topology | Fayda | Nuksaan |
|---|---|---|
| Bus | Sasta, kam cable | Cable fail = poora down, troubleshoot mushkil |
| Star | Manage aur fix karna easy | Central device fail = sab down |
| Ring | Fair access, kam collision | Ek node/link toote to dikkat |
| Mesh | Bahut reliable, kai raaste | Bahut cable, mehnga |
| Tree | Scalable, hierarchy | Root fail = branch down |
| Hybrid | Flexible, bada network | Design complex |

## Transmission modes

Data ek ya dono direction mein ja sakta hai.

| Mode | Direction | Example |
|---|---|---|
| Simplex | Sirf ek taraf | Keyboard se computer, TV broadcast |
| Half-duplex | Dono taraf, par ek samay ek hi | Walkie-talkie |
| Full-duplex | Dono taraf ek saath | Phone call, modern Ethernet |

## Unicast, Multicast, Broadcast, Anycast

Data kis-kis ko bheja jaata hai, uske types:

- **Unicast:** ek bhejne wala, ek paane wala (one-to-one). Normal browsing.
- **Broadcast:** ek bhejne wala, LAN ke sab devices paayein (one-to-all). ARP request broadcast hota hai.
- **Multicast:** ek bhejne wala, ek group ke members paayein (one-to-many). Live streaming to subscribers.
- **Anycast:** ek address, par sabse paas wale server tak jaata hai. CDN aur DNS root servers isko use karte hain.

::: warning Common galti
IPv6 mein broadcast nahi hota. IPv6 broadcast ki jagah multicast aur anycast use karta hai.
:::

## Network devices

| Device | Layer | Kaam |
|---|---|---|
| NIC | L1/L2 | Network Interface Card - device ko network se jodta hai, MAC address isi mein |
| Repeater | L1 (Physical) | Signal ko dobara strong kar ke aage bhejta hai |
| Hub | L1 (Physical) | Multi-port repeater, aaye hue data ko sab ports par bhej deta hai |
| Bridge | L2 (Data Link) | Do LAN segments ko jodta hai, MAC dekh ke filter karta hai |
| Switch | L2 (Data Link) | Smart bridge, MAC address dekh ke sirf sahi port par bhejta hai |
| Router | L3 (Network) | Alag networks ko jodta hai, IP dekh ke best path chunta hai |
| Gateway | All layers | Do alag-alag protocol wale networks ko jodta hai (translator) |
| Modem | L1 | Digital data ko analog signal mein badalta hai aur wapas (ISP line par) |
| Access Point | L2 | Wireless devices ko wired network se jodta hai (Wi-Fi) |

### Hub vs Switch vs Router <Badge type="danger" text="Most Asked" />

Ye teen sabse zyada puchhe jaate hain. Difference layer aur intelligence ka hai.

| Point | Hub | Switch | Router |
|---|---|---|---|
| Layer | L1 Physical | L2 Data Link | L3 Network |
| Address use | Koi nahi | MAC address | IP address |
| Data kahan bheje | Sab ports (flood) | Sahi port (MAC dekh ke) | Best path (IP dekh ke) |
| Collision domain | Ek (sabke liye same) | Har port alag | Har interface alag |
| Broadcast domain | Ek | Ek (per VLAN) | Har interface alag |
| Intelligence | Dumb | Smart (MAC table) | Smartest (routing table) |

::: tip Interview mein aise bolo
A hub works at the physical layer and simply repeats incoming data to all ports, so it forms a single collision domain. A switch works at the data link layer, learns MAC addresses, and forwards a frame only to the correct port, giving each port its own collision domain. A router works at the network layer, uses IP addresses and a routing table to forward packets between different networks, and separates broadcast domains.
:::

::: details Follow-up: Switch destination MAC nahi jaanta to kya karta hai?
Agar destination MAC switch ki table mein nahi hai (unknown unicast) ya frame broadcast hai, to switch usse saare ports par bhej deta hai (flooding) - sivaay jis port se wo aaya. Jab reply aata hai, switch us MAC ko seekh ke table mein daal leta hai.
:::

## Bandwidth, Throughput, Latency

Ye teen aksar confuse hote hain:

- **Bandwidth:** link ki maximum capacity (jitna data per second ja sakta hai). Jaise pipe ki motai. Unit: bits per second (Mbps, Gbps).
- **Throughput:** actual mein jitna data gaya (bandwidth se hamesha kam ya barabar). Traffic, overhead ke kaaran.
- **Latency:** data ko source se destination tak pahunchne mein laga total time.

::: warning Common galti
Bandwidth "speed" nahi hai. Bandwidth capacity hai (kitna). Latency delay hai (kitna time). Zyada bandwidth hone par bhi agar distance bada ho to latency zyada ho sakti hai.
:::

## Chaar tarah ke delays

Ek packet ko ek point se agle point tak pahunchne mein 4 delays lagte hain:

| Delay | Matlab | Formula |
|---|---|---|
| Transmission | Packet ke saare bits link par daalne ka time | packet size / bandwidth |
| Propagation | Signal ko wire par distance tay karne ka time | distance / signal speed |
| Queuing | Router ki queue mein wait karne ka time | traffic par depend |
| Processing | Router header padhne aur decide karne ka time | chhota, fixed-ish |

### Worked example: transmission aur propagation delay

**Diya hai:** frame 1000 bytes, link 1 Mbps, distance 2000 km, signal speed `2 x 10^8` m/s.

Kaise solve karein: pehle bytes ko bits mein badlo, phir formula lagao.

| Step | Calculation | Result |
|---|---|---|
| Bits nikalo | 1000 bytes x 8 | 8000 bits |
| Transmission delay (Tt) | 8000 / 1,000,000 | 8 ms |
| Propagation delay (Tp) | 2,000,000 m / `2 x 10^8` m/s | 10 ms |

To ek frame ko pahunchne mein kam se kam `Tt + Tp` = 8 + 10 = 18 ms lagega (queuing aur processing chhod ke).

::: tip Interview mein aise bolo
Transmission delay is the time to push all the bits of a packet onto the link, which is packet size divided by bandwidth. Propagation delay is the time for a bit to travel across the link, which is distance divided by signal speed. Transmission delay depends on packet size and bandwidth, while propagation delay depends on distance, not on bandwidth.
:::

### RTT

RTT (Round Trip Time) matlab data ko destination tak jaane aur reply wapas aane ka total time. `ping` command yahi measure karta hai. Mota-moti RTT lagbhag `2 x propagation delay` hota hai (plus processing).

## Yaad rakhne layak points

- Node = device, Link = connection. Network = jude hue nodes jo data share karte hain.
- LAN = ek building, MAN = ek sheher, WAN = desh/duniya (internet WAN hai).
- Full mesh ke links = `n(n-1)/2`.
- Hub = L1 (sab ports par bheje), Switch = L2 (MAC dekh ke sahi port), Router = L3 (IP dekh ke best path).
- Hub = ek collision domain. Switch = har port alag collision domain. Router = har interface alag broadcast domain.
- Transmission delay = size / bandwidth. Propagation delay = distance / speed.
- Propagation delay bandwidth par depend NAHI karta, distance par karta hai.
- Bandwidth = capacity, Throughput = actual rate, Latency = total time.
- IPv6 mein broadcast nahi, multicast/anycast hota hai.

## Quick Quiz

<Quiz id="cn-basics" title="Network Basics Quiz" />
