# Data Link Layer

Is page par Data Link layer (OSI L2) seekhenge: MAC address, switch kaise kaam karta hai, ARP, error detection (CRC), aur flow control (Stop-and-Wait, Go-Back-N, Selective Repeat). Interview mein "MAC vs IP", switch learning, ARP aur CRC numerical bahut common hain.

| Topic | Kitna puchha jaata hai |
|---|---|
| MAC vs IP address | ⭐⭐⭐ |
| ARP step by step | ⭐⭐⭐ |
| Switch kaise kaam karta hai | ⭐⭐ |
| CRC numerical | ⭐⭐⭐ |
| Go-Back-N vs Selective Repeat | ⭐⭐ |
| Collision vs broadcast domain | ⭐⭐ |
| CSMA/CD vs CSMA/CA | ⭐ |

## Data Link layer ka kaam

Data Link layer ek hop (ek link) par data ko reliably pahunchati hai. Iske paanch kaam:

- **Framing:** bits ko frames (chhote blocks) mein todna, start/end mark karna.
- **MAC addressing:** physical address (MAC) laga ke batana ki frame kis device ko dena hai.
- **Error control:** frame mein galti pakadna (CRC se) aur batana.
- **Flow control:** fast sender slow receiver ko data se bhar na de, isko control karna.
- **Access control:** ek shared link par kaun kab bhejega, ye tay karna.

Data Link ki do sublayers hoti hain:

- **LLC (Logical Link Control):** upar wali layer se baat, flow/error control.
- **MAC (Media Access Control):** physical addressing aur shared medium par access.

## MAC address

MAC (Media Access Control) address har NIC (network card) ka ek unique physical address hai, jo manufacturer deta hai.

- Size: **48 bits** = 6 bytes, hex mein likha jaata hai, jaise `00:1A:2B:3C:4D:5E`.
- Pehle 24 bits = OUI (manufacturer ka code), baaki 24 bits = card ka unique number.
- Ye device mein "burned-in" hota hai (par software se change ho sakta hai).

### MAC vs IP address <Badge type="danger" text="Most Asked" />

Analogy: MAC address aapka Aadhaar number jaisa hai (device ke saath fixed). IP address aapke ghar ka address jaisa hai (location badle to badal jaata hai).

| Point | MAC address | IP address |
|---|---|---|
| Layer | L2 Data Link | L3 Network |
| Size | 48 bits (hex) | IPv4 32 bits, IPv6 128 bits |
| Diya kisne | NIC manufacturer (fixed) | Network/DHCP (badalta hai) |
| Scope | Ek local network (hop-to-hop) | Poora internet (end-to-end) |
| Kaam | Ek link par device dhoondhna | Poore network mein location/path |
| Example | `00:1A:2B:3C:4D:5E` | `192.168.1.10` |

::: tip Interview mein aise bolo
A MAC address is a 48-bit physical address burned into the network card by the manufacturer and used for delivery within a single local network, hop to hop. An IP address is a logical address assigned by the network and used for end-to-end delivery across the internet. As a packet travels, the source and destination IP addresses stay the same, but the MAC addresses change at every router.
:::

::: warning Common galti
Log sochte hain packet ke travel mein MAC fixed rehta hai. Sahi: har router hop par source aur destination MAC badal jaate hain, par IP addresses end-to-end same rehte hain (jab tak NAT na ho).
:::

## Switch kaise kaam karta hai

Switch L2 device hai jo MAC address dekh ke frame ko sirf sahi port par bhejta hai. Teen cheezein karta hai:

1. **Learning:** har aane wale frame ka source MAC aur uska port, MAC table (CAM table) mein save karta hai.
2. **Forwarding:** destination MAC table mein hai to sirf us port par bheje.
3. **Flooding:** destination MAC table mein nahi (unknown unicast) ya broadcast hai, to sab ports par bheje (sivaay jahan se aaya).

```text
Switch ports: P1=A, P2=B, P3=C

Step 1: A -> B bhejta hai.
  Switch seekh leta hai: A is on P1.
  B ka MAC table mein nahi -> flood to P2, P3.

Step 2: B -> A reply karta hai.
  Switch seekh leta hai: B is on P2.
  A table mein hai (P1) -> sirf P1 par bheje.
```

::: tip Interview mein aise bolo
A switch learns the source MAC address of every incoming frame and records which port it came from in its MAC table. To forward a frame, it looks up the destination MAC and sends the frame only to that port. If the destination is unknown or the frame is a broadcast, it floods the frame to all ports except the one it arrived on.
:::

## ARP step by step

ARP (Address Resolution Protocol) ek IP address ke liye uska MAC address dhoondhta hai, ussi local network par. Kyunki frame bhejne ke liye destination ka MAC chahiye, par aapke paas sirf IP hota hai.

Maan lo `192.168.1.10` (host A) ko `192.168.1.20` (host B) ko data bhejna hai, same LAN par:

```text
1. A ke paas B ka IP hai, par MAC nahi.
2. A broadcast karta hai:
   "Jiska IP 192.168.1.20 hai, apna MAC batao" (sab ko)
3. Sirf B reply karta hai (unicast):
   "192.168.1.20 ka MAC 00:...:20 hai"
4. A isko ARP cache mein save kar leta hai (kuch time ke liye).
5. Ab A frame bana ke seedhe B ke MAC par bhej deta hai.
```

Do important points:

- ARP **request broadcast** hota hai, **reply unicast** hota hai.
- ARP cache purane entries ko kuch time baad bhool jaata hai (taaki MAC change ho to update ho).

### Destination doosre network par ho to?

Agar destination same LAN par nahi (alag network), to host destination ka MAC nahi dhoondhta. Wo apne **default gateway (router)** ka MAC ARP se dhoondhta hai, aur frame router ko de deta hai. Router aage ka kaam sambhalta hai.

::: tip Interview mein aise bolo
ARP maps a known IP address to its MAC address on the same local network. The host broadcasts an ARP request asking who has that IP, and the owner replies with its MAC via unicast. The result is cached. If the destination is on a different network, the host instead ARPs for its default gateway's MAC and hands the frame to the router.
:::

::: details Follow-up: RARP kya hai, aaj use hota hai?
RARP (Reverse ARP) MAC se IP dhoondhta tha - ARP ka ulta. Ye ab obsolete hai. Aaj DHCP iska kaam karta hai (aur usse zyada: subnet mask, gateway, DNS bhi deta hai).
:::

## Ethernet frame (brief)

Ek Ethernet frame ke main fields: destination MAC, source MAC, type/length, data (payload), aur FCS (CRC for error check).

**MTU (Maximum Transmission Unit)** = ek frame mein jitna data (payload) ja sakta hai, Ethernet par **1500 bytes**. Isse bada data ho to IP usko tod deta hai.

## Collision domain vs Broadcast domain

- **Collision domain:** wo area jahan do devices ek saath bhejein to collision (takkar) ho. Hub mein sab ek hi collision domain mein.
- **Broadcast domain:** wo area jahan ek broadcast sab tak pahunch jaaye.

| Device | Collision domains | Broadcast domains |
|---|---|---|
| Hub | 1 (sab share karte hain) | 1 |
| Switch | Har port alag | 1 (per VLAN) |
| Router | Har interface alag | Har interface alag |

Yaad rakho: switch collision domains todta hai, router broadcast domains todta hai.

## CSMA/CD vs CSMA/CA

Shared medium par kaun kab bheje - ye manage karne ke tareeke:

| Point | CSMA/CD | CSMA/CA |
|---|---|---|
| Full form | Collision Detection | Collision Avoidance |
| Kahan | Purana wired Ethernet (half-duplex) | Wi-Fi (wireless) |
| Idea | Collision ho to pakdo, jam signal bhejo, backoff | Collision pehle se avoid karo, ACK lo |
| Detection | Collision detect kar sakte hain | Wireless mein detect mushkil, isliye avoid |

Note: aaj ka full-duplex switched Ethernet mein collision hoti hi nahi, isliye CSMA/CD ab purana ho gaya hai.

## Error detection

Error detect karne ke tareeke:

- **Parity bit:** ek extra bit jodo taaki 1s ki ginti even (ya odd) rahe. Sirf single-bit error pakad sakta hai.
- **Checksum:** IP/TCP/UDP mein use hota hai, bits ko add kar ke check.
- **CRC (Cyclic Redundancy Check):** Ethernet mein use hota hai, burst errors ke against bahut strong. Ye binary division (mod-2) par based hai.

### CRC numerical kaise solve karein

Recipe:

1. Generator ka degree nikalo (bits - 1). Data ke aage utne **0 jodo**.
2. Us number ko generator se **mod-2 division** karo (XOR, no carry).
3. Jo **remainder** bache wahi CRC hai. Usko original data ke aage lagao -> codeword.
4. Receiver codeword ko generator se divide karta hai. Remainder **0** = no error, non-zero = error.

### Worked example: Data 100100, Generator 1101

Generator 1101 ka degree 3 hai, to data ke aage **3 zeros** jodo: `100100000`. Ab mod-2 division (XOR):

```text
Dividend after appending 3 zeros: 100100000
pos 0: 1001 XOR 1101 = 0100  -> working bits 010000000
pos 1: 1000 XOR 1101 = 0101  -> working bits 001010000
pos 2: 1010 XOR 1101 = 0111  -> working bits 000111000
pos 3: 1110 XOR 1101 = 0011  -> working bits 000001100
pos 5: 1100 XOR 1101 = 0001  -> working bits 000000001
```

Remainder (CRC) = **001**. Transmitted codeword = data + CRC = **100100001**.

Receiver check: `100100001` ko `1101` se divide karo -> remainder = **000** -> no error. Agar koi bit flip ho jaaye (jaise bit 3 flip ho ke `101100001`), to remainder = **110** (non-zero) -> error detected.

### Ek aur example: Data 1101011011, Generator 10011

Generator 10011 ka degree 4, to **4 zeros** jodo: `11010110110000`.

```text
Dividend after appending 4 zeros: 11010110110000
pos 0: 11010 XOR 10011 = 01001  -> working bits 01001110110000
pos 1: 10011 XOR 10011 = 00000  -> working bits 00000010110000
pos 6: 10110 XOR 10011 = 00101  -> working bits 00000000101000
pos 8: 10100 XOR 10011 = 00111  -> working bits 00000000001110
```

Remainder (CRC) = **1110**. Transmitted codeword = **11010110111110**. Receiver divides by `10011` -> remainder `0000` -> no error.

::: tip Interview mein aise bolo
CRC appends a number of zero bits equal to the generator's degree to the data, then divides using modulo-2 (XOR) division. The remainder becomes the CRC, which is sent along with the data. The receiver divides the received codeword by the same generator; a zero remainder means no error, a non-zero remainder means the data was corrupted. CRC is very strong against burst errors, which is why Ethernet uses it.
:::

## Error correction: Hamming code (brief)

Error detection sirf batata hai galti hui. Error **correction** galti ko theek bhi kar deta hai. Hamming code single-bit error correct kar sakta hai.

**Hamming distance:** do codewords mein kitne bits alag hain. Jaise `10101` aur `11100` mein 2 bits alag -> Hamming distance = 2.

**Kitne parity bits chahiye:** `m` data bits ke liye sabse chhota `r` jahan `2^r >= m + r + 1`.

- `m = 4` data bits -> `r = 3` (Hamming(7,4): 4 data + 3 parity = 7 bits).
- `m = 7` data bits -> `r = 4`.

## Flow control

Fast sender slow receiver ko overload na kare - iske liye flow control. Teen tareeke:

### Stop-and-Wait

Sender ek frame bhejta hai, phir ruk kar ACK ka wait karta hai. ACK aaye to agla frame. Simple par slow (window = 1).

**Efficiency example** (upar wala delay example use karke): Tt = 8 ms, Tp = 10 ms.

| Step | Formula | Result |
|---|---|---|
| Efficiency | Tt / (Tt + 2Tp) = 8 / (8 + 20) | 0.2857 = 28.57% |
| a = Tp/Tt | 10 / 8 | 1.25 |
| Window for ~100% use | 1 + 2a = 1 + 2(1.25) | 3.5 -> 4 frames |

Matlab Stop-and-Wait sirf 28.57% link use karta hai. ~100% use ke liye sender ko ek saath lagbhag 4 frames bhejne chahiye (sliding window).

### Sliding window

Sender ek saath kai frames bhej sakta hai (ek "window" ke andar) bina har ek ke ACK ka wait kiye. Isse link zyada use hota hai. Do versions: Go-Back-N aur Selective Repeat.

### Go-Back-N vs Selective Repeat

`m` = sequence number ke bits. Jaise `m = 3` bits -> numbers 0 se 7.

| Point | Go-Back-N | Selective Repeat |
|---|---|---|
| Sender window | `2^m - 1` (m=3 -> 7) | `2^(m-1)` (m=3 -> 4) |
| Receiver window | 1 | Window ke barabar |
| ACK type | Cumulative | Individual (har frame ka) |
| Ek frame kho jaaye | Us frame se aage sab dobara bhejo | Sirf kho hua frame dobara bhejo |
| Out-of-order frames | Receiver phenk deta hai | Receiver buffer mein rakhta hai |
| Complexity | Simple | Zyada (buffering, sorting) |

Yaad: `m = 3` ke liye Go-Back-N window = `2^3 - 1 = 7`, Selective Repeat window = `2^(3-1) = 4`.

::: tip Interview mein aise bolo
Go-Back-N uses a sender window of up to two-to-the-m minus one, with cumulative ACKs; if a frame is lost, the sender retransmits that frame and every frame after it. Selective Repeat uses a window of up to two-to-the-m-minus-one and acknowledges frames individually; the receiver buffers out-of-order frames, so only the lost frame is retransmitted. Selective Repeat is more efficient but more complex because the receiver must buffer and reorder.
:::

::: details Follow-up: Selective Repeat ka window Go-Back-N se aadha kyun?
Agar window poora `2^m` ho jaaye to receiver purane aur naye frames ko alag nahi kar paayega (sequence numbers repeat ho jaate hain). Selective Repeat mein receiver buffer karta hai, isliye safe rehne ke liye window ko `2^(m-1)` tak seemit karte hain.
:::

## VLAN (brief)

VLAN (Virtual LAN) ek physical switch ko kai logical LANs mein baant deta hai. Har VLAN apna alag broadcast domain hota hai. Isse ek hi switch par alag-alag groups (jaise HR aur Finance) alag rakh sakte hain, bina alag hardware ke. Trunk links par `802.1Q` tag frame mein VLAN number daal deta hai.

## Yaad rakhne layak points

- MAC = 48 bits, NIC manufacturer deta hai, hop-to-hop; IP = logical, end-to-end.
- Travel mein MAC har hop par badalta hai, IP end-to-end same (NAT na ho to).
- Switch: source MAC learn karta hai, destination MAC par forward karta hai, unknown/broadcast flood karta hai.
- ARP = IP se MAC (same LAN). Request broadcast, reply unicast. Alag network ho to gateway ka MAC dhoondhta hai.
- MTU = 1500 bytes (Ethernet). CRC Ethernet mein error detect karta hai.
- CRC: generator degree jitne 0 jodo, mod-2 divide karo, remainder = CRC. Receiver par remainder 0 = no error.
- Collision domain: switch todta hai (har port alag). Broadcast domain: router todta hai.
- Stop-and-Wait efficiency = Tt / (Tt + 2Tp); diye example mein 28.57%.
- Go-Back-N window = `2^m - 1`, Selective Repeat window = `2^(m-1)`. m=3 -> 7 aur 4.
- CSMA/CD = wired Ethernet (detect), CSMA/CA = Wi-Fi (avoid).

## Quick Quiz

<Quiz id="cn-data-link" title="Data Link Layer Quiz" />
