# Operating System: Roadmap

Ye page aapka starting point hai Operating System (OS) ke liye. Yahan aap samjhoge ki OS hota kya hai, interview mein ye topic kaise aata hai, aur kis order mein kya padhna hai.

OS ek subject hai jo har product aur service company ke interview mein aata hai. Thoda sa consistent padh lo to online test aur technical round dono nikal jaate hain.

## OS kya hai (5 lines mein)

Computer ke paas limited resources hote hain: ek (ya kuch) CPU, thodi si RAM, ek disk, kuch I/O devices. Bahut saare programs ek saath chalna chahte hain. Operating System wo software hai jo in sab programs ko manage karta hai aur decide karta hai ki kis program ko kab CPU milega, kitni memory milegi, aur disk/device ka access kaise hoga.

Soch lijiye OS ek **office manager** hai. Bahut saare employees (programs) kaam karna chahte hain. Manager decide karta hai ki kisko kaunsa room (memory) milega, kaunsa desk (CPU time) milega, aur printer (I/O device) ki baari kiski hai. Manager ke bina sab log aapas mein ladenge aur kaam ruk jaayega.

## Interview mein OS kaise aata hai

- **Online assessment (OA):** MCQs on scheduling, deadlock, paging, memory. Chote numericals (Gantt chart, page faults, Banker's safe state).
- **Technical round:** "Process aur thread mein difference?", "Deadlock kya hai, kaise avoid karein?", "Virtual memory kaise kaam karti hai?" jaise seedhe questions.
- **Small numericals:** average waiting time nikalna, page fault count karna, subnetting jaisa hi par OS side par.

::: tip Interview mein aise bolo
An operating system is the system software that manages hardware resources like the CPU, memory, and I/O devices, and provides services to user programs. It decides which process runs when, allocates memory, and controls access to devices, so that many programs can run safely and efficiently at the same time.
:::

## Roadmap: kya padhna hai

Neeche har topic ka page, usme kya milega, kitna important hai, aur approx time diya hai. Stars: ⭐⭐⭐ bahut zyada puchha jaata hai, ⭐⭐ medium, ⭐ kabhi kabhi.

| Topic (page) | Kya seekhoge | Priority | Approx time |
|---|---|---|---|
| [OS Basics](/os/basics) | OS kya hai, types, kernel, system calls, booting | ⭐⭐ | 1.5 ghante |
| [Process aur Thread](/os/process-thread) | Process, PCB, states, fork, thread, IPC | ⭐⭐⭐ | 2.5 ghante |
| [CPU Scheduling](/os/cpu-scheduling) | FCFS, SJF, RR, priority, numericals | ⭐⭐⭐ | 2.5 ghante |
| [Process Synchronization](/os/synchronization) | Race condition, mutex, semaphore, classic problems | ⭐⭐⭐ | 2.5 ghante |
| [Deadlock](/os/deadlock) | 4 conditions, prevention, Banker's algorithm | ⭐⭐⭐ | 2 ghante |
| [Memory Management](/os/memory-management) | Paging, segmentation, fragmentation, TLB | ⭐⭐⭐ | 2.5 ghante |
| [Virtual Memory](/os/virtual-memory) | Demand paging, page replacement, thrashing | ⭐⭐⭐ | 2 ghante |
| [File System aur Disk](/os/file-system-disk) | inode, links, disk scheduling, RAID | ⭐⭐ | 2 ghante |
| [Baaki Important Topics](/os/misc-topics) | Cache, DMA, virtualization, Linux commands | ⭐⭐ | 1.5 ghante |
| [OS: Top 60 Interview Questions](/os/top-questions) | Ratne/revise karne wale Q&A | ⭐⭐⭐ | revision |
| [OS Mock Quiz](/os/quiz) | 25-question test | ⭐⭐⭐ | 20 minute |

## Sirf 2 ghante hain? Ye 10 topic pehle padho

Agar interview kal hai aur time kam hai, to ye order follow karo. Har ek interview mein bahut puchha jaata hai.

1. [Process vs Thread](/os/process-thread) — sabse common opener.
2. [CPU Scheduling numericals](/os/cpu-scheduling) — Gantt chart + average WT/TAT.
3. [Deadlock ke 4 conditions](/os/deadlock) — aur unhe kaise todte hain.
4. [Banker's algorithm](/os/deadlock) — safe sequence nikalna.
5. [Mutex vs Semaphore](/os/synchronization) — difference MOST asked.
6. [Paging vs Segmentation](/os/memory-management) — fragmentation ke saath.
7. [Page replacement (FIFO, LRU, Optimal)](/os/virtual-memory) — page fault count.
8. [Virtual memory aur thrashing](/os/virtual-memory).
9. [fork(), zombie, orphan](/os/process-thread) — short but asked.
10. [System calls aur user/kernel mode](/os/basics).

## Har page kaise use karein

1. **Padho** — Hinglish explanation + example + table dhyan se padho, jaldbaazi mat karo.
2. **Bol ke practice karo** — har "Interview mein aise bolo" box ko zor se bolo, jaise interviewer ke saamne. 20-30 second mein aana chahiye.
3. **Quick Quiz** — page ke end mein diye 5 MCQ solve karo. Galat ho to wo section dobara padho.

Ek topic ek baar mein khatam karo, phir next par jao. Revision ke liye [Top 60 Questions](/os/top-questions) aur [Mock Quiz](/os/quiz) use karo.
