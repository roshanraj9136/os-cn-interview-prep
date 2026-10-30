# 7 din ka study plan

Ye plan zero se shuru karne walon ke liye hai. Roz 2-3 ghante. Har din ke end mein checklist tick karo. Aapka progress isi browser mein save rehta hai (kahin bheja nahi jaata).

::: tip Roz ka simple routine
1. **Padho** (60% time): page dhyan se, tables aur diagrams ke saath.
2. **Bolo** (20% time): har "Interview mein aise bolo" box 2-3 baar zor se bolo, bina dekhe.
3. **Test** (20% time): page ka Quick Quiz. 80% se kam aaye to galat wale topics dobara padho.
:::

## Din 1: OS ki neev

Pages: [OS roadmap](/os/), [OS Basics](/os/basics), [Process aur Thread](/os/process-thread)

<Checklist id="day1" :items="['OS roadmap page padha', 'OS Basics padha: kernel, system call, user mode vs kernel mode', 'Process aur Thread padha: PCB, states, context switch', 'Process vs Thread table bina dekhe paper par likhi', 'Zombie aur orphan process ka answer zor se bola', 'fork() wala sawaal solve kiya: 3 fork = kitne process?', 'Dono pages ka Quick Quiz 80% se upar']" />

## Din 2: Scheduling aur Synchronization

Pages: [CPU Scheduling](/os/cpu-scheduling), [Process Synchronization](/os/synchronization)

<Checklist id="day2" :items="['FCFS, SJF, SRTF, Priority, Round Robin ka idea samjha', 'Example B ka Round Robin (quantum 2) paper par khud solve kiya', 'Formulas yaad: TAT = CT - AT, WT = TAT - BT', 'Race condition aur critical section samjha', 'Mutex vs Semaphore table bina dekhe bola', 'Producer-consumer semaphore code ek baar khud likha', 'Dono pages ka Quick Quiz 80% se upar']" />

## Din 3: Deadlock aur Memory

Pages: [Deadlock](/os/deadlock), [Memory Management](/os/memory-management)

<Checklist id="day3" :items="['Deadlock ki 4 conditions bina dekhe boli', 'Prevention vs avoidance vs detection ka fark samjha', 'Banker\'s algorithm ka example paper par khud solve kiya', 'Internal vs external fragmentation table yaad', 'Paging address translation (13000 -> 21192) khud kiya', 'Paging vs Segmentation table bola', 'Dono pages ka Quick Quiz 80% se upar']" />

## Din 4: Virtual Memory, Files aur baaki OS

Pages: [Virtual Memory](/os/virtual-memory), [File System aur Disk](/os/file-system-disk), [Baaki Important Topics](/os/misc-topics)

<Checklist id="day4" :items="['Page fault kya hai aur OS use kaise handle karta hai', 'FIFO, LRU, Optimal ki page-fault table khud banayi', 'Belady\'s anomaly aur thrashing samjhe', 'Disk scheduling (FCFS, SSTF, SCAN) ka example kiya', 'inode, hard link vs soft link samjha', 'Linux commands: ps, top, kill, chmod 755 ka matlab', 'OS Top 60 questions mein se pehle 30 bol ke practice kiye', 'Teeno pages ka Quick Quiz 80% se upar']" />

## Din 5: Networks ki neev

Pages: [CN roadmap](/cn/), [Network Basics](/cn/basics), [OSI aur TCP/IP Model](/cn/osi-tcpip), [Data Link Layer](/cn/data-link)

<Checklist id="day5" :items="['Hub vs Switch vs Router table bola', 'OSI ke 7 layers order mein, har layer ka kaam aur ek protocol', 'OSI vs TCP/IP table yaad', 'Encapsulation: segment, packet, frame, bits', 'MAC vs IP address ka fark', 'ARP kaise kaam karta hai, step by step', 'CRC ka example (100100 / 1101) khud solve kiya', 'Teeno topic pages ka Quick Quiz 80% se upar']" />

## Din 6: IP, Routing, TCP/UDP

Pages: [IP Addressing aur Subnetting](/cn/ip-addressing), [Routing](/cn/routing), [TCP aur UDP](/cn/tcp-udp)

<Checklist id="day6" :items="['Private IP ranges yaad: 10/8, 172.16/12, 192.168/16', '192.168.10.75/27 ka network, broadcast, host range khud nikala', 'NAT kya karta hai, home router example ke saath', 'Packet R1 -> R2 -> R3: kya badalta hai (MAC, TTL), kya nahi (IP)', 'RIP vs OSPF (distance vector vs link state)', 'TCP vs UDP table aur kab kaunsa', '3-way handshake aur 4-way termination diagram banaya', 'Teeno pages ka Quick Quiz 80% se upar']" />

## Din 7: Application layer, Security, Revision

Pages: [Application Layer](/cn/application-layer), [Network Security](/cn/security), [google.com flow](/cn/google-com), [CN Top Questions](/cn/top-questions), [Last-day cheat sheet](/revision)

<Checklist id="day7" :items="['HTTP methods, status codes, HTTP vs HTTPS', 'DNS resolution steps aur DHCP DORA', 'Symmetric vs asymmetric encryption, TLS handshake ka idea', 'google.com wala 60-second answer bina dekhe bola', 'CN Top 60 questions bol ke practice kiye', 'OS Mock Quiz diya (25 questions)', 'CN Mock Quiz diya (25 questions)', 'Last-day cheat sheet padhi']" />

## 14 din ka aaram wala plan (roz 1-1.5 ghante)

| Din | Kya padhna hai |
|---|---|
| 1 | [OS roadmap](/os/), [OS Basics](/os/basics) |
| 2 | [Process aur Thread](/os/process-thread) |
| 3 | [CPU Scheduling](/os/cpu-scheduling) |
| 4 | [Process Synchronization](/os/synchronization) |
| 5 | [Deadlock](/os/deadlock) |
| 6 | [Memory Management](/os/memory-management) |
| 7 | [Virtual Memory](/os/virtual-memory), [OS Mock Quiz](/os/quiz) |
| 8 | [File System aur Disk](/os/file-system-disk), [Baaki Important Topics](/os/misc-topics), [OS Top Questions](/os/top-questions) |
| 9 | [CN roadmap](/cn/), [Network Basics](/cn/basics) |
| 10 | [OSI aur TCP/IP Model](/cn/osi-tcpip), [Data Link Layer](/cn/data-link) |
| 11 | [IP Addressing aur Subnetting](/cn/ip-addressing) |
| 12 | [Routing](/cn/routing), [TCP aur UDP](/cn/tcp-udp) |
| 13 | [Application Layer](/cn/application-layer), [Network Security](/cn/security), [google.com flow](/cn/google-com) |
| 14 | [CN Top Questions](/cn/top-questions), [CN Mock Quiz](/cn/quiz), [Last-day cheat sheet](/revision) |

## Interview se ek din pehle

- Naya topic shuru mat karo. Sirf [Last-day cheat sheet](/revision) aur dono Top Questions pages.
- Dono mock quiz ek baar aur do.
- Ye 5 answers zor se bolo: process vs thread, deadlock, paging/virtual memory, TCP vs UDP, google.com flow.
- Achhi neend lo. Thake hue dimaag se achha answer nahi nikalta.
