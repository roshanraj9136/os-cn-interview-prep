# TCP aur UDP

Transport layer ka kaam hai data ko sahi program (process) tak pahunchana. Is page mein aap seekhenge ports aur sockets, TCP vs UDP ka farak, 3-way handshake, flow control vs congestion control, aur socket programming ka basic flow. TCP vs UDP aur handshake har interview mein aate hain.

| Topic | Kitna puchha jaata hai |
|---|---|
| TCP vs UDP | ⭐⭐⭐ |
| 3-way handshake | ⭐⭐⭐ |
| Flow control vs congestion control | ⭐⭐ |
| Ports aur sockets | ⭐⭐ |
| Congestion control phases | ⭐⭐ |
| Socket programming flow | ⭐ |

## Transport layer ka kaam

Network layer (IP) packet ko sahi machine tak pahunchata hai. Lekin ek machine par kai programs chal rahe hote hain (browser, WhatsApp, game). Transport layer decide karta hai data kis program ko dena hai. Isko "process-to-process delivery" kehte hain.

### Ports aur sockets

Port number (16-bit, 0 se 65535) batata hai ki data kis program ke liye hai. Jaise building ka pata IP hai, to port flat number hai.

| Port range | Naam | Kaun use karta hai |
|---|---|---|
| 0 - 1023 | well-known | HTTP 80, HTTPS 443, DNS 53, SSH 22 |
| 1024 - 49151 | registered | MySQL 3306, RDP 3389 |
| 49152 - 65535 | dynamic / ephemeral | client ke temporary ports |

Socket = IP address + port number ka combination. Ek pura TCP connection 4 cheezon se pehchana jaata hai: (source IP, source port, destination IP, destination port).

### Multiplexing aur demultiplexing

Multiplexing: bhejne wali side par kai programs ka data ek hi channel par bhejna (port numbers lagakar). Demultiplexing: aane wali side par port number dekh kar data sahi program ko dena.

::: tip Interview mein aise bolo
The transport layer provides process-to-process delivery. While IP delivers a packet to the correct machine, the transport layer uses port numbers to deliver data to the correct application on that machine. A socket is the combination of an IP address and a port, and a TCP connection is identified by the four-tuple of source IP, source port, destination IP, and destination port.
:::

## TCP vs UDP <Badge type="danger" text="Most Asked" />

TCP (Transmission Control Protocol) reliable hai: data sahi order mein, bina khoye pahunchta hai. UDP (User Datagram Protocol) fast hai lekin koi guarantee nahi.

| Feature | TCP | UDP |
|---|---|---|
| Connection | connection-oriented (handshake pehle) | connectionless |
| Reliability | reliable (ACK, retransmit) | no guarantee |
| Order | in-order delivery | order ki guarantee nahi |
| Flow control | haan (rwnd) | nahi |
| Congestion control | haan (cwnd) | nahi |
| Speed | dheema (overhead zyada) | fast (overhead kam) |
| Header size | 20 - 60 bytes | 8 bytes |
| Data style | byte stream | independent datagrams |
| Use cases | web, email, file transfer | DNS, DHCP, VoIP, video, gaming |

Kab kya use karein: jahan har byte zaroori hai (web page, file, email) wahan TCP. Jahan speed zaroori hai aur thoda data khona chalega (live video call, online game, DNS query) wahan UDP.

::: tip Interview mein aise bolo
TCP is connection-oriented and reliable: it uses sequence numbers, acknowledgements, and retransmission to deliver data in order without loss, and it adds flow and congestion control. UDP is connectionless with no delivery or ordering guarantees and very low overhead. We use TCP when every byte matters, like web pages, email, and file transfer, and UDP when speed matters more than perfect delivery, like DNS, video calls, and online games.
:::

::: warning Common galti
"UDP reliable nahi hai" ka matlab ye nahi ki UDP kharab hai. DNS, video call, gaming jaise cases mein UDP hi better hai, kyunki thoda data lose ho jaaye to chalega, lekin delay nahi chahiye.
:::

## TCP header key fields

TCP header mein kuch important fields:

- Source port aur destination port: kis program se, kis program ko.
- Sequence number: is segment ke pehle byte ka number (order aur reassembly ke liye).
- Acknowledgment number: agla expected byte ka number (ACK ke liye).
- Flags: SYN (connection start), ACK (acknowledgment), FIN (connection end), RST (reset/abort).
- Window size: receiver kitna data aur le sakta hai (flow control, rwnd).
- Checksum: error detection ke liye.

## 3-way handshake <Badge type="danger" text="Most Asked" />

TCP connection shuru karne se pehle dono side teen messages exchange karte hain. Isse dono confirm karte hain ki wo sun aur bhej sakte hain.

```text
Client                                   Server
  |                                         |
  |------ SYN  (seq = 1000) --------------->|   "main connect karna chahta hoon"
  |                                         |
  |<----- SYN-ACK (seq=5000, ack=1001) -----|   "theek hai, main bhi ready"
  |                                         |
  |------ ACK  (seq=1001, ack=5001) ------->|   "confirm, chalo shuru"
  |                                         |
  |============ connection ready ===========|
```

Numbers samjho (client ISN = 1000, server ISN = 5000):

- SYN: client seq=1000 bhejta hai.
- SYN-ACK: server seq=5000, ack=1001 (client ke 1000 ka agla byte expect).
- ACK: client seq=1001, ack=5001 (server ke 5000 ka agla byte expect).

SYN aur FIN dono ek-ek sequence number "consume" karte hain, isliye ack 1000 ka 1001 hua.

### 3 kyun, 2 kyun nahi

Sirf 2 messages se dono side ye confirm nahi kar paate ki dono ke send aur receive dono kaam kar rahe hain. Teesra ACK is baat ki pushti karta hai ki client ne server ka reply suna, aur dono ke initial sequence numbers set ho gaye. 2-way se purane duplicate SYN galat connection khol sakte hain.

::: tip Interview mein aise bolo
TCP sets up a connection with a three-way handshake: the client sends SYN, the server replies with SYN-ACK, and the client sends ACK. This exchanges both sides' initial sequence numbers and confirms that each side can both send and receive. Two messages are not enough because the third ACK is what proves the client received the server's sequence number and prevents old duplicate SYNs from opening a stale connection.
:::

## 4-way termination aur TIME_WAIT

Connection band karne ke liye chaar messages lagte hain, kyunki har side ko alag se apni taraf band karni hoti hai (TCP full-duplex hai).

```text
Client                                   Server
  |------ FIN -------------------------->|   client done
  |<----- ACK --------------------------|
  |<----- FIN --------------------------|   server done
  |------ ACK -------------------------->|
  |  (TIME_WAIT: 2 x MSL tak wait)       |
```

Jo side pehle close karti hai wo TIME_WAIT state mein 2 x MSL (Maximum Segment Lifetime) tak rukti hai, taaki pichhle packets network se saaf ho jaayein aur last ACK pakka pahunch jaaye. Beech ke do messages (ACK aur FIN) kabhi kabhi mila diye jaate hain, to 3 messages bhi dikh sakte hain.

::: details Follow-up: TIME_WAIT kyun zaroori hai?
Do reason: (1) agar last ACK kho jaaye to server FIN dobara bhejega, aur TIME_WAIT mein hone se client us FIN ka jawab de sakta hai. (2) Purane duplicate segments network se expire ho jaayein, warna wo nayi connection mein ghus sakte hain.
:::

## Reliability kaise aati hai

TCP reliable isliye hai kyunki:

- Sequence numbers: har byte ko number milta hai, isse order theek aur missing data pata chalta hai.
- ACKs: receiver confirm karta hai kitna data mila.
- Retransmission timeout (RTO): agar time par ACK na mile, sender data dobara bhejta hai.
- Duplicate ACKs: agar receiver ko beech ka segment na mile, wo baar baar same ACK bhejta hai; 3 duplicate ACKs aane par sender fast retransmit karta hai (timeout ka wait kiye bina).

## Flow control vs congestion control

Dono rate ko control karte hain, lekin alag wajah se. Ye interview mein aksar confuse kiya jaata hai.

| Point | Flow control | Congestion control |
|---|---|---|
| Problem | receiver slow hai, overflow na ho | network beech mein congested hai |
| Kaun control karta hai | receiver window (rwnd) | congestion window (cwnd) |
| Kiska bachav | receiver ka buffer | network ke links/routers |
| Mechanism | sliding window, advertised window | slow start, congestion avoidance |

Sender actual mein `min(rwnd, cwnd)` jitna hi bhejta hai.

### Congestion control phases

TCP dheere shuru karta hai aur network ki capacity dhoondhta hai.

- Slow start: cwnd 1 MSS se shuru, har RTT mein double hota hai, jab tak ssthresh (slow start threshold) tak na pahunche.
- Congestion avoidance: ssthresh ke baad cwnd dheere badhta hai, +1 MSS per RTT.
- Timeout par: ssthresh = cwnd/2, cwnd = 1 MSS, dobara slow start (TCP Tahoe aur Reno).
- 3 duplicate ACKs par: fast retransmit; Reno fast recovery karta hai (cwnd = ssthresh = cwnd/2, 1 tak nahi girta).

Worked example (Tahoe style): cwnd 1 se shuru, ssthresh = 16. Jab cwnd = 20 par timeout hota hai -> ssthresh = 10, cwnd = 1.

| RTT round | cwnd (MSS) | ssthresh | Phase |
|---|---|---|---|
| 1 | 1 | 16 | slow start |
| 2 | 2 | 16 | slow start |
| 3 | 4 | 16 | slow start |
| 4 | 8 | 16 | slow start |
| 5 | 16 | 16 | congestion avoidance |
| 6 | 17 | 16 | congestion avoidance |
| 7 | 18 | 16 | congestion avoidance |
| 8 | 19 | 16 | congestion avoidance |
| 9 | 20 | 16 | congestion avoidance -> TIMEOUT |
| 10 | 1 | 10 | slow start |
| 11 | 2 | 10 | slow start |
| 12 | 4 | 10 | slow start |
| 13 | 8 | 10 | slow start |
| 14 | 10 | 10 | congestion avoidance |
| 15 | 11 | 10 | congestion avoidance |

Tahoe vs Reno: Tahoe har loss par cwnd ko 1 tak gira deta hai. Reno 3 duplicate ACKs (timeout nahi) par ssthresh = cwnd/2 karke cwnd = ssthresh set karta hai (fast recovery), to pura 1 tak nahi girta. Aaj Linux ka default CUBIC hai; Google kahin kahin BBR use karta hai.

::: tip Interview mein aise bolo
Flow control protects a slow receiver from being overwhelmed, using the receiver's advertised window, rwnd. Congestion control protects the network itself from overload, using the congestion window, cwnd, through slow start and congestion avoidance. The sender transmits the minimum of rwnd and cwnd. In slow start cwnd doubles each RTT until ssthresh, then it grows linearly; on a timeout ssthresh becomes half of cwnd and cwnd resets to 1 MSS.
:::

::: warning Common galti
Flow control aur congestion control alag hain. Flow control receiver ki speed ke baare mein hai (rwnd), congestion control network ki haalat ke baare mein hai (cwnd). Dono TCP mein saath chalte hain.
:::

## SYN flood

SYN flood ek attack hai jisme attacker kai SYN bhejta hai lekin handshake kabhi complete nahi karta. Server ke half-open connection queue bhar jaate hain aur asli users ko jagah nahi milti. Defences: SYN cookies aur rate limiting. Detail [Network Security](/cn/security) page par.

## Socket programming flow

TCP server aur client fixed order mein system calls karte hain. Yahi call names C aur Python dono mein hain.

```text
Server                         Client
socket()                       socket()
bind()                            |
listen()                          |
accept()  <----- connect ----- connect()
recv()/send() <--- data ---> send()/recv()
close()                        close()
```

UDP mein listen/accept nahi hote; `sendto()` aur `recvfrom()` use hote hain, aur connect optional hai.

Minimal Python TCP server:

```python
import socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(("0.0.0.0", 5000))
s.listen()
conn, addr = s.accept()
data = conn.recv(1024)
conn.send(b"Hello " + data)
conn.close()
s.close()
```

Minimal Python TCP client:

```python
import socket

c = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
c.connect(("127.0.0.1", 5000))
c.send(b"world")
print(c.recv(1024))
c.close()
```

::: tip Interview mein aise bolo
A TCP server calls socket, bind, listen, accept, then recv and send, and finally close. A TCP client calls socket, connect, then send and recv, and close. UDP skips listen and accept and uses sendto and recvfrom instead, because it is connectionless.
:::

## UDP header aur QUIC

UDP ka header sirf 8 bytes ka hai: source port, destination port, length, checksum. Itna chhota header isliye UDP fast aur light hai.

UDP yahan use hota hai: DNS (chhoti queries), DHCP, VoIP, video calls, online games, aur QUIC. QUIC ek modern transport hai jo UDP par banaya gaya hai; HTTP/3 iska use karta hai, isse connection jaldi set hota hai aur TCP ka head-of-line blocking hat jaata hai.

::: tip Interview mein aise bolo
The UDP header is just 8 bytes: source port, destination port, length, and checksum. This small header is why UDP is lightweight and fast. QUIC is a modern transport built on top of UDP that powers HTTP/3; it sets up connections faster and avoids TCP's head-of-line blocking.
:::

## Yaad rakhne layak points

- Transport layer process-to-process delivery deta hai, port numbers se.
- Port 16-bit (0-65535): 0-1023 well-known, 1024-49151 registered, 49152+ ephemeral.
- Socket = IP + port; TCP connection = 4-tuple (src IP, src port, dst IP, dst port).
- TCP: connection-oriented, reliable, in-order, flow + congestion control, 20-60 byte header.
- UDP: connectionless, no guarantee, fast, 8-byte header.
- 3-way handshake: SYN, SYN-ACK, ACK. Teesra ACK zaroori hai pushti aur duplicate SYN rokne ke liye.
- Termination 4-way (FIN, ACK, FIN, ACK); close karne wali side TIME_WAIT mein 2 x MSL tak.
- Flow control = rwnd (receiver bachao); congestion control = cwnd (network bachao); sender min(rwnd, cwnd) bhejta hai.
- Slow start cwnd double karta hai ssthresh tak, phir congestion avoidance +1 per RTT; timeout par ssthresh = cwnd/2, cwnd = 1.
- Server: socket, bind, listen, accept, recv/send, close. Client: socket, connect, send/recv, close.

## Quick Quiz

<Quiz id="cn-tcp-udp" title="TCP aur UDP Quiz" />
