# OSI aur TCP/IP Model

Is page par network ke do famous "layered models" seekhenge: OSI (7 layers) aur TCP/IP (4 ya 5 layers). Interview mein ye sabse zyada puchha jaane wala CN topic hai - har layer ka kaam, uske protocols, aur kaun sa protocol kaun si layer par chalta hai.

| Topic | Kitna puchha jaata hai |
|---|---|
| OSI 7 layers aur unka kaam | ⭐⭐⭐ |
| OSI vs TCP/IP | ⭐⭐⭐ |
| Encapsulation / PDU | ⭐⭐ |
| Kaun sa protocol kaun si layer | ⭐⭐⭐ |
| TCP/IP 4 vs 5 layer | ⭐⭐ |

## Layered model kyun?

Network ka kaam bahut bada hai: cable par signal bhejne se le kar browser mein page dikhane tak. Isko ek saath handle karna mushkil hai. Isliye kaam ko layers mein baanta gaya. Har layer apna ek kaam karti hai aur neeche/upar wali layer ko service deti hai.

Socho ek courier parcel bhejna. Aap item pack karte ho (Application), box par address likhte ho (Network), courier company hub se hub tak le jaati hai (Data Link/Physical). Har stage ka apna kaam hai, par mil ke parcel pahunch jaata hai. Ek stage badlo (naya courier) to baaki par farak nahi padta - yahi layering ka fayda hai.

## OSI Model: 7 layers

OSI (Open Systems Interconnection) ek reference model hai. Upar se neeche 7 layers:

| # | Layer | Kaam (simple) | Example protocols | Device | PDU |
|---|---|---|---|---|---|
| 7 | Application | User ke apps ko network service | HTTP, HTTPS, DNS, FTP, SMTP | - | Data |
| 6 | Presentation | Format, encryption, compression | TLS/SSL, JPEG, ASCII | - | Data |
| 5 | Session | Connection start/maintain/close | NetBIOS, RPC | - | Data |
| 4 | Transport | Process-to-process, reliability, ports | TCP, UDP | - | Segment / Datagram |
| 3 | Network | Logical addressing, best path (routing) | IP, ICMP | Router | Packet |
| 2 | Data Link | MAC addressing, framing, error check | Ethernet, Wi-Fi, ARP | Switch, Bridge | Frame |
| 1 | Physical | Bits ko signal mein (voltage, light) | Cables, hubs, RJ45 | Hub, Repeater | Bits |

PDU (Protocol Data Unit) matlab us layer par data ko kya kehte hain: Transport par segment, Network par packet, Data Link par frame, Physical par bits.

### Order yaad kaise rakhein

Niche se upar (Physical -> Application):

> **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way

(Physical, Data Link, Network, Transport, Session, Presentation, Application)

### Har layer thoda detail mein

- **Physical (L1):** 0 aur 1 ko actual signal (bijli, light, radio) mein badalna. Cable, connector, hub yahan.
- **Data Link (L2):** data ko frames mein todna, MAC address laga ke ek hop tak pahunchana, error check (CRC). Switch yahan. [Data Link page](/cn/data-link).
- **Network (L3):** IP address laga ke, poore internet par best path se packet bhejna. Router yahan. [Routing page](/cn/routing).
- **Transport (L4):** ek process se doosri process tak data (port numbers). TCP = reliable, UDP = fast. [TCP aur UDP page](/cn/tcp-udp).
- **Session (L5):** do apps ke beech session start, maintain aur end karna.
- **Presentation (L6):** data ka format set karna - encryption (TLS), compression, character encoding.
- **Application (L7):** jo user seedha dekhta/use karta hai - browser, email client. HTTP, DNS yahan. [Application layer page](/cn/application-layer).

::: tip Interview mein aise bolo
The OSI model splits networking into seven layers, from Physical at the bottom to Application at the top. Each layer has one job and serves the layer above it. For example, the Network layer handles IP addressing and routing, the Transport layer provides process-to-process delivery using ports, and the Data Link layer handles MAC addressing and framing within a single hop. Layering lets us change one layer without affecting the others.
:::

::: warning Common galti
OSI ek reference model hai, real internet TCP/IP par chalta hai. Interview mein OSI concept samajhne ke liye use hota hai, par actual protocols TCP/IP stack follow karte hain.
:::

## Encapsulation aur Decapsulation

Jab data bhejte hain, har layer apna header (aur Data Link apna trailer) jodti hai. Isko **encapsulation** kehte hain. Receiver par ulta hota hai - har layer apna header hatati hai - isko **decapsulation** kehte hain.

```text
Sender side (encapsulation, upar se neeche):

Application   |          DATA            |
Transport     |  TCP-h | DATA |          |   -> Segment
Network       | IP-h | TCP-h | DATA |     ->  Packet
Data Link     |Eth-h| IP-h | TCP-h |DATA|Eth-t| -> Frame
Physical      | 0101010101010101...      |   -> Bits

Receiver side: ulta, har layer apna header hatati hai.
```

Har neeche wali layer upar wali ka poora data (header + payload) apne data ki tarah treat karti hai aur apna header laga deti hai.

::: details Follow-up: Header kaun kaun si layer jodti hai?
Transport TCP/UDP header jodti hai (ports, sequence number). Network IP header jodti hai (source/destination IP). Data Link Ethernet header aur trailer jodti hai (MAC addresses, CRC). Physical sirf bits bhejta hai, header nahi jodta.
:::

## TCP/IP Model

TCP/IP wo asli model hai jispe internet chalta hai. Iske do versions padhaye jaate hain:

- **4-layer (original RFC 1122):** Application, Transport, Internet, Link (Network Access).
- **5-layer (Kurose, Forouzan books):** Application, Transport, Network, Data Link, Physical.

Dono theek hain - bas 4-layer version Session/Presentation ko Application mein mila deta hai, aur Data Link + Physical ko ek "Link" layer mein jod deta hai.

```text
   OSI (7)              TCP/IP 5-layer      TCP/IP 4-layer
---------------------------------------------------------
Application  }
Presentation } ------>  Application  ------>  Application
Session      }
---------------------------------------------------------
Transport    ------->  Transport    ------->  Transport
---------------------------------------------------------
Network      ------->  Network      ------->  Internet
---------------------------------------------------------
Data Link    } ----->  Data Link    } ----->  Link
Physical     } ----->  Physical     }         (Network Access)
```

### OSI vs TCP/IP <Badge type="danger" text="Most Asked" />

| Point | OSI | TCP/IP |
|---|---|---|
| Layers | 7 | 4 (ya 5 version) |
| Type | Reference / theoretical model | Practical, internet ispe chalta hai |
| Developed by | ISO | DARPA (US) |
| Top layers | Application, Presentation, Session alag | Teeno ko Application mein mila diya |
| Approach | Pehle model, phir protocols | Pehle protocols, phir model |
| Use | Concept samajhne ke liye | Real networking |

::: tip Interview mein aise bolo
OSI is a seven-layer reference model used to understand networking concepts, while TCP/IP is the practical four-layer model the internet actually runs on. TCP/IP merges OSI's Application, Presentation, and Session layers into one Application layer, and combines Data Link and Physical into a single Link layer. The five-layer TCP/IP version keeps Data Link and Physical separate, which maps more cleanly to OSI.
:::

## Kaun sa protocol kaun si layer par <Badge type="danger" text="Most Asked" />

Ye table yaad karna zaroori hai - OA aur interview dono mein aata hai.

| Protocol | Layer (OSI) | Kaam |
|---|---|---|
| HTTP, HTTPS | Application (L7) | Web pages |
| DNS | Application (L7) | Naam se IP |
| DHCP | Application (L7) | Auto IP dena |
| FTP | Application (L7) | File transfer |
| SMTP | Application (L7) | Email bhejna |
| TLS/SSL | Presentation (L6) | Encryption |
| TCP, UDP | Transport (L4) | Process-to-process |
| IP | Network (L3) | Logical addressing, routing |
| ICMP | Network (L3) | Error/control messages (ping) |
| ARP | L2-L3 ke beech | IP se MAC nikaalna |
| Ethernet, Wi-Fi | Data Link (L2) | Frames, MAC |

::: warning Common galti
ARP ko log pure L2 ya pure L3 bata dete hain. Sahi: ARP L2 aur L3 ke beech kaam karta hai - ye L3 ka IP address le kar L2 ka MAC address dhoondhta hai. Interview mein "between layer 2 and layer 3" bolna safe hai.
:::

::: details Follow-up: ICMP kaun si layer par hai, TCP/UDP par chalta hai kya?
ICMP network layer (L3) par hai, IP ke saath. Ye TCP ya UDP par nahi chalta - ICMP messages seedhe IP packets ke andar jaate hain. `ping` aur `traceroute` ICMP use karte hain.
:::

## Yaad rakhne layak points

- OSI 7 layers (upar se): Application, Presentation, Session, Transport, Network, Data Link, Physical.
- Niche se mnemonic: "Please Do Not Throw Sausage Pizza Away".
- PDU: Transport = segment, Network = packet, Data Link = frame, Physical = bits.
- Devices: Hub/Repeater = L1, Switch/Bridge = L2, Router = L3.
- Encapsulation = har layer header jodti hai; decapsulation = header hatati hai.
- TCP/IP = 4 layers (RFC 1122) ya 5 layers (textbooks). Dono mention kar dena.
- OSI = reference model; TCP/IP = internet ispe chalta hai.
- ARP L2 aur L3 ke beech; ICMP L3 par.
- TCP/UDP = L4, IP = L3, HTTP/DNS/DHCP/FTP/SMTP = L7.

## Quick Quiz

<Quiz id="cn-osi-tcpip" title="OSI aur TCP/IP Quiz" />
