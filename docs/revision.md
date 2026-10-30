# Last-day cheat sheet

Interview se pehle 30-40 minute mein poora OS + CN revise karne ke liye. Har section ke saath detail wale page ka link hai. Naya topic aaj mat padho; sirf ye dohrao.

## OS: ek line ke answers

| Topic | Yaad rakhne wali baat |
|---|---|
| OS | Software jo hardware manage karta hai aur programs ko services deta hai ([OS Basics](/os/basics)) |
| Kernel types | Monolithic (Linux), microkernel (Minix, QNX), hybrid (Windows NT, macOS XNU) |
| System call | User mode se kernel mode mein controlled entry (trap). Jaise fork, exec, open, read, write |
| Program vs process | Program disk par file hai; process RAM mein chalta hua program ([Process aur Thread](/os/process-thread)) |
| Process vs thread | Threads share karte hain code, data, heap, open files; apna rakhte hain stack, registers, PC, thread ID |
| Process states | New, Ready, Running, Waiting (Blocked), Terminated |
| PCB | PID, state, program counter, registers, memory info, open files, scheduling info |
| Context switch | Current state PCB mein save, next ka load. Pure overhead |
| fork() | Child mein 0, parent mein child ka PID, error par -1. n forks = 2^n processes |
| Zombie / orphan | Zombie: child khatam, parent ne wait() nahi kiya. Orphan: parent pehle khatam, init/systemd adopt karta hai |
| Scheduling | FCFS (convoy effect), SJF (min avg WT, starvation), SRTF, Priority (aging se starvation fix), Round Robin (time quantum) ([CPU Scheduling](/os/cpu-scheduling)) |
| Critical section | 3 shartein: mutual exclusion, progress, bounded waiting ([Synchronization](/os/synchronization)) |
| Mutex vs semaphore | Mutex = lock with ownership; semaphore = counter (wait/signal), no ownership, signalling ke liye bhi |
| Producer-consumer | empty = N, full = 0, mutex = 1. Pehle wait(empty/full), phir wait(mutex) |
| Deadlock | 4 conditions saath mein: mutual exclusion, hold and wait, no preemption, circular wait ([Deadlock](/os/deadlock)) |
| Deadlock handling | Prevention (ek condition todo), avoidance (Banker's, safe state), detection + recovery, ignore (ostrich) |
| Starvation vs deadlock | Starvation: ek process hamesha wait karta hai, baaki chalte hain. Deadlock: sab ruk jaate hain |
| Fragmentation | Internal: block ke andar bachi jagah (paging). External: chhote-chhote holes (variable partitions, segmentation) ([Memory Management](/os/memory-management)) |
| Paging | Logical page -> physical frame, page table se. TLB = page-table entries ka fast cache |
| Paging vs segmentation | Paging: fixed size, no external fragmentation. Segmentation: variable size, logical units, external fragmentation |
| Virtual memory | Program ka sirf zaroori part RAM mein (demand paging). Page RAM mein na ho to page fault ([Virtual Memory](/os/virtual-memory)) |
| Page replacement | FIFO (Belady's anomaly ho sakti hai), Optimal (best, par future pata hona chahiye), LRU (practical) |
| Thrashing | Paging mein hi time jaata hai, CPU utilisation girta hai. Fix: working set, kam processes, zyada RAM |
| Disk scheduling | SSTF starvation kar sakta hai; SCAN = elevator; C-SCAN zyada uniform wait ([File System aur Disk](/os/file-system-disk)) |
| inode | File ka metadata aur data block pointers. File ka naam inode mein nahi, directory entry mein |
| Hard vs soft link | Hard link = same inode ka doosra naam. Soft link = path wali chhoti file, target delete to toot jaata hai |
| RAID | 0 striping, 1 mirroring, 5 striping + parity (1 disk fail ok), 6 double parity (2 fail ok), 10 mirror + stripe |

## OS formulas

```text
TAT = CT - AT          WT = TAT - BT          RT = first CPU time - AT
Physical address = frame number x page size + offset
EAT with TLB  = h x (t + m) + (1 - h) x (t + 2m)
EAT with page faults = (1 - p) x memory access + p x page-fault time
Banker's: Need = Max - Allocation; safe if every process can finish in some order
n fork() calls -> 2^n processes;  32-bit address -> 4 GB
```

## CN: ek line ke answers

| Topic | Yaad rakhne wali baat |
|---|---|
| OSI (upar se neeche) | Application, Presentation, Session, Transport, Network, Data Link, Physical ([OSI aur TCP/IP](/cn/osi-tcpip)) |
| PDU | Data -> segment (TCP) / datagram (UDP) -> packet -> frame -> bits |
| TCP/IP model | 4 layers (Application, Transport, Internet, Link); kai books 5 layers padhati hain |
| Devices | Hub/repeater L1, switch/bridge L2, router L3 ([Network Basics](/cn/basics)) |
| Domains | Hub: 1 collision + 1 broadcast domain. Switch: har port alag collision domain. Router: har interface alag broadcast domain |
| MAC vs IP | MAC 48-bit, NIC ka physical address, L2. IP 32/128-bit, logical, L3 ([Data Link](/cn/data-link)) |
| ARP | IP se MAC nikalta hai. Request broadcast, reply unicast. Bahar ke network ke liye gateway ka MAC |
| CSMA/CD vs CSMA/CA | CD: wired Ethernet, collision detect. CA: Wi-Fi, collision avoid |
| Error control | Detection: parity, checksum, CRC. Correction: Hamming code |
| Sliding window | Go-Back-N window 2^m - 1, lost frame se aage sab dobara. Selective Repeat window 2^(m-1), sirf lost frame |
| Private IPs | 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. Loopback 127.0.0.0/8. APIPA 169.254.0.0/16 ([IP Addressing](/cn/ip-addressing)) |
| Subnetting | Block size = 256 - mask ka octet. Usable hosts = 2^h - 2 |
| NAT / PAT | Private IP:port ko router ke public IP:port mein badalta hai |
| IPv6 | 128-bit, broadcast nahi (multicast), ARP ki jagah NDP, `::` sirf ek baar |
| Routing | Longest prefix match. Har router TTL 1 kam karta hai ([Routing](/cn/routing)) |
| Hop par kya badalta hai | MAC har hop par badalta hai; source/destination IP same rehta hai (NAT ke bina) |
| RIP / OSPF / BGP | RIP: distance vector, hop count, max 15. OSPF: link state, Dijkstra. BGP: path vector, autonomous systems ke beech |
| ping / traceroute | ping = ICMP echo request/reply. traceroute = TTL 1, 2, 3... aur ICMP Time Exceeded |
| TCP vs UDP | TCP: connection, reliable, ordered, flow + congestion control. UDP: connectionless, fast, no guarantee ([TCP aur UDP](/cn/tcp-udp)) |
| Handshake | SYN -> SYN+ACK -> ACK. Close: FIN, ACK, FIN, ACK; pehle band karne wala TIME_WAIT (2 x MSL) |
| Flow vs congestion | Flow control: receiver ko bachao (rwnd). Congestion control: network ko bachao (cwnd, slow start) |
| Sockets | Server: socket, bind, listen, accept, recv/send, close. Client: socket, connect, send/recv, close |
| HTTP | Stateless. GET, POST, PUT, PATCH, DELETE. 200, 201, 301, 304, 400, 401, 403, 404, 500, 502, 503 ([Application Layer](/cn/application-layer)) |
| HTTP versions | 1.1: keep-alive. 2: multiplexing ek TCP connection par. 3: QUIC (UDP) par |
| HTTPS | HTTP + TLS, port 443. Asymmetric se key exchange/authentication, symmetric se data encryption ([Security](/cn/security)) |
| DNS | Browser cache -> OS -> resolver -> root -> TLD -> authoritative. UDP 53 (bade answers/zone transfer TCP 53) |
| DHCP | DORA: Discover, Offer, Request, Acknowledge. IP, mask, gateway, DNS deta hai |
| Email | SMTP bhejta hai; POP3 download karta hai; IMAP server par sync rakhta hai |
| Crypto | Symmetric (AES): ek key, fast. Asymmetric (RSA/ECC): public + private key. Hashing (SHA-256): one-way |
| Security tools | Firewall rules se traffic rokta hai; VPN encrypted tunnel; reverse proxy servers ke aage baithta hai |

## Port numbers

| Port | Protocol | Port | Protocol |
|---|---|---|---|
| 20, 21 | FTP (data, control) | 110 | POP3 |
| 22 | SSH / SFTP | 123 | NTP |
| 23 | Telnet | 143 | IMAP |
| 25 (587) | SMTP | 161 | SNMP |
| 53 | DNS | 443 | HTTPS |
| 67, 68 | DHCP (server, client) | 3306 | MySQL |
| 80 | HTTP | 3389 | RDP |

## CN formulas aur sizes

```text
Transmission delay = packet size / bandwidth      Propagation delay = distance / speed
Stop-and-Wait efficiency = Tt / (Tt + 2 x Tp) = 1 / (1 + 2a),  a = Tp / Tt
Go-Back-N window <= 2^m - 1        Selective Repeat window <= 2^(m-1)
Full mesh links = n(n-1)/2         Usable hosts = 2^(host bits) - 2
MAC 48 bits | IPv4 32 bits | IPv6 128 bits | port 16 bits (0-65535)
Headers: IPv4 20-60 B | IPv6 40 B | TCP 20-60 B | UDP 8 B | Ethernet MTU 1500 B
```

## google.com: 8 steps mein

1. Browser URL padhta hai, HTTPS use karega.
2. DNS: caches, phir resolver -> root -> .com TLD -> Google ka authoritative server. IP mil gaya.
3. Router (gateway) ka MAC ARP se (agar cache mein nahi).
4. TCP 3-way handshake (ya HTTP/3 ho to QUIC).
5. TLS handshake: certificate verify, session keys bani.
6. HTTP GET request jaata hai. Raste mein NAT, kai routers, BGP.
7. Google ka server (CDN edge / load balancer) 200 OK + HTML bhejta hai.
8. Browser HTML, CSS, JS se page banata hai; baaki files fetch karta hai, cache karta hai.

Poora detail: [google.com type karne par kya hota hai](/cn/google-com)

## Interview se pehle ye 5 answers zor se bolo

1. Process vs thread ([page](/os/process-thread))
2. Deadlock aur uski 4 conditions ([page](/os/deadlock))
3. Paging aur virtual memory ([page](/os/virtual-memory))
4. TCP vs UDP aur 3-way handshake ([page](/cn/tcp-udp))
5. google.com type karne par kya hota hai ([page](/cn/google-com))

Phir ek baar [OS Mock Quiz](/os/quiz) aur [CN Mock Quiz](/cn/quiz) do. All the best!
