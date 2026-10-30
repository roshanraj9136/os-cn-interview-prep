# CPU Scheduling

Is page mein aap seekhenge ki OS kaise decide karta hai ki ready processes mein se kaunsa process ab CPU chalaega. Ye topic interviews aur online tests mein bahut zyada aata hai, khaaskar Gantt chart wale numericals. Yahan har algorithm, formula aur do pure worked examples milenge.

| Topic | Kitna puchha jaata hai |
|---|---|
| FCFS, SJF, SRTF | ⭐⭐⭐ |
| Round Robin | ⭐⭐⭐ |
| WT / TAT / RT formulas aur numericals | ⭐⭐⭐ |
| Preemptive vs Non-preemptive | ⭐⭐ |
| Priority scheduling + starvation/aging | ⭐⭐ |
| Multilevel Queue / Feedback Queue | ⭐ |

## Scheduling kyun chahiye?

Ek single CPU ek waqt mein sirf ek process chala sakta hai. Lekin RAM mein kai processes "ready" pade hote hain. CPU scheduler (short-term scheduler) decide karta hai ki inme se kaunsa process agla chance paega.

Analogy: ek hi billing counter (CPU) hai aur line mein kai customers (processes) khade hain. Scheduler wo rule hai jo tay karta hai kaun pehle bill karega.

### CPU burst aur I/O burst

Har process do tarah ka kaam baari-baari karta hai:

- CPU burst: process ko calculation ke liye CPU chahiye.
- I/O burst: process disk ya network ka wait karta hai (CPU free ho jaata hai).

Scheduler sirf CPU burst ke time matter karta hai. Jab process I/O ke liye wait karta hai, CPU kisi aur process ko de diya jaata hai.

### Preemptive vs Non-preemptive <Badge type="danger" text="Most Asked" />

- Non-preemptive: ek baar CPU mila to process khud se chhodne tak (complete hone ya I/O ke liye block hone tak) chalta rahega. Beech mein chheena nahi jaata.
- Preemptive: OS beech mein hi CPU chheen sakta hai (jaise koi zyada important process aa gaya, ya time slice khatam ho gaya).

| Point | Non-preemptive | Preemptive |
|---|---|---|
| CPU chheena jaata hai? | Nahi | Haan |
| Kab switch hota hai | Process khud chhode ya complete ho | Kabhi bhi (interrupt, time quantum, higher priority) |
| Context switch | Kam | Zyada |
| Response time | Kharaab ho sakta hai | Behtar |
| Examples | FCFS, non-preemptive SJF, non-preemptive Priority | SRTF, Round Robin, preemptive Priority |

::: tip Interview mein aise bolo
In non-preemptive scheduling, once a process gets the CPU it keeps it until it finishes or blocks for I/O. In preemptive scheduling, the OS can take the CPU back in the middle, for example when a higher-priority process arrives or the time quantum expires. Preemptive scheduling gives better response time but causes more context switches.
:::

## Scheduling criteria aur formulas <Badge type="danger" text="Most Asked" />

Pehle kuch terms samajh lo (har numerical mein yahi chahiye):

- AT = Arrival Time: process ready queue mein kab aaya.
- BT = Burst Time: process ko CPU kitni der chahiye.
- CT = Completion Time: process kab khatam hua.
- TAT = Turnaround Time = CT - AT (aane se khatam hone tak total time).
- WT = Waiting Time = TAT - BT (sirf line mein wait kiya gaya time).
- RT = Response Time = pehli baar CPU mila - AT (pehle response tak ka wait).

Kya kam/zyada chahiye:

| Criteria | Kya karna hai | Kyun |
|---|---|---|
| CPU utilisation | Maximise | CPU khaali na baithe |
| Throughput | Maximise | Zyada processes per unit time |
| Turnaround time | Minimise | Jaldi kaam khatam |
| Waiting time | Minimise | Kam wait |
| Response time | Minimise | Interactive systems jaldi reply de |

::: warning Common galti
Waiting time aur response time alag hain. Waiting time = poora wait (TAT - BT). Response time = sirf pehli baar CPU milne tak ka wait. Round Robin jaise algorithms mein ye dono bahut alag hote hain.
:::

## Numerical kaise solve karein

Har scheduling numerical ka ek hi recipe hai:

1. Gantt chart banao (kaun kab chala, time line par).
2. Gantt chart se har process ka CT (completion time) nikalo.
3. TAT = CT - AT.
4. WT = TAT - BT.
5. RT = pehli baar CPU mila - AT.
6. Average = sabka sum / number of processes.

Tie-break rule (jab do process barabar ho): jo pehle aaya wo jeeta; dono saath aaye to chhota process number jeeta.

## FCFS (First Come First Serve)

Idea: jo pehle aaya, usko pehle CPU. Simple queue, non-preemptive.

Analogy: railway ticket counter ki line. Jo pehle aaya, uska ticket pehle.

Pros: simple, fair (koi starve nahi hota).
Cons: convoy effect. Ek lamba process aage lag jaye to peeche ke chhote process bahut wait karte hain.

::: info Convoy effect
Jaise highway par ek slow truck ke peeche saari choti gaadiyaan phas jaati hain, waise hi FCFS mein ek bada BT wala process aage ho to chhote processes uske peeche atak jaate hain. Average waiting time badh jaata hai.
:::

## SJF (Shortest Job First)

Idea: jiska burst time sabse chhota hai, usko pehle CPU do. Non-preemptive.

SJF non-preemptive algorithms mein sabse kam average waiting time deta hai (jab saare jobs ek saath available ho). Lekin do problems hain:

- Starvation: lambe jobs ko chance hi nahi milta agar chhote aate rahein.
- Burst time pehle se pata nahi hota. Isliye estimate karte hain exponential averaging se: next estimate `tau(n+1) = alpha * actual(n) + (1 - alpha) * tau(n)`, yaani pichhle actual aur pichhle estimate ka weighted average.

## SRTF (Shortest Remaining Time First)

Idea: SJF ka preemptive version. Har naye arrival par dekho kis process ka remaining burst time sabse chhota hai, usko chalao. Agar naya process aane se chhota ban jaye to current process ko preempt kar do.

Pros: average waiting time aur bhi kam.
Cons: lambe jobs aur zyada starve ho sakte hain, context switch bhi zyada.

## Priority Scheduling

Idea: har process ko ek priority number. Jiski priority sabse zyada (convention: chhota number = zyada priority), usko CPU. Preemptive aur non-preemptive dono versions hote hain.

- Problem: starvation. Low-priority process hamesha wait karta reh sakta hai.
- Fix: aging. Jo process jitna zyada wait kare, uski priority dheere-dheere badha do, taaki ek din usko bhi chance mile.

::: tip Interview mein aise bolo
Priority scheduling picks the process with the highest priority first. Its main problem is starvation: a low-priority process may wait forever. The standard fix is aging, where a process's priority is gradually raised the longer it waits, so eventually it runs.
:::

## Round Robin (RR) <Badge type="danger" text="Most Asked" />

Idea: har process ko ek fixed time slice (time quantum) milta hai. Quantum khatam hote hi process ko preempt karke ready queue ke end mein bhej dete hain, aur agla process chalate hain. Time-sharing systems ke liye best.

Analogy: ek chef (CPU) har order ko 5-5 minute deta hai, phir agla order, taaki koi bhi grahak zyada der tak bina attention ke na rahe.

Time quantum chunna important hai:

- Quantum bahut bada -> RR FCFS jaisa ho jaata hai.
- Quantum bahut chhota -> har baar context switch, overhead bahut zyada.
- Rule of thumb: quantum itna ho ki zyadatar CPU bursts ek hi slice mein complete ho jaayein (typically 80% bursts quantum se chhote).

::: warning Common galti
RR mein jab ek process arrive karta hai aur usi waqt dusra preempt hota hai, to naya arrive hua process ready queue mein pehle lagta hai, preempted process baad mein. Is site ke numericals isi rule se solve kiye gaye hain.
:::

## Multilevel Queue aur Multilevel Feedback Queue

- Multilevel Queue: ready queue ko kai alag queues mein baant dete hain (jaise system processes, interactive, batch), har queue ka apna algorithm. Ek process hamesha ek hi queue mein rehta hai. Problem: lower queue starve ho sakti hai.
- Multilevel Feedback Queue (MLFQ): isme process ek queue se dusri mein move kar sakta hai apne behaviour ke hisaab se. CPU-hog process neeche jaata hai, chhoti bursts wala upar rehta hai. Aging se neeche wale upar aa sakte hain (no starvation). Ye sabse flexible hai, par tune karna mushkil.

## Worked Example A: saare time 0 par aaye

Processes: P1 BT 24, P2 BT 3, P3 BT 3. Sab AT 0. Isse convoy effect saaf dikhta hai.

### FCFS (order P1, P2, P3)

```text
|  P1  |  P2  |  P3  |
Time: 0 -> 24 -> 27 -> 30
```

| Process | AT | BT | CT | TAT = CT - AT | WT = TAT - BT | RT |
|---|---|---|---|---|---|---|
| P1 | 0 | 24 | 24 | 24 | 0 | 0 |
| P2 | 0 | 3 | 27 | 27 | 24 | 24 |
| P3 | 0 | 3 | 30 | 30 | 27 | 27 |

Average TAT = 81/3 = 27.00, Average WT = 51/3 = 17.00, Average RT = 51/3 = 17.00.

### SJF

```text
|  P2  |  P3  |  P1  |
Time: 0 -> 3 -> 6 -> 30
```

| Process | AT | BT | CT | TAT = CT - AT | WT = TAT - BT | RT |
|---|---|---|---|---|---|---|
| P1 | 0 | 24 | 30 | 30 | 6 | 6 |
| P2 | 0 | 3 | 3 | 3 | 0 | 0 |
| P3 | 0 | 3 | 6 | 6 | 3 | 3 |

Average TAT = 39/3 = 13.00, Average WT = 9/3 = 3.00, Average RT = 9/3 = 3.00.

Dekho: sirf order badalne se average WT 17 se 3 ho gaya. Yahi SJF ki power hai, aur FCFS ka convoy effect.

### Round Robin, time quantum = 4

```text
|  P1  |  P2  |  P3  |  P1  |  P1  |  P1  |  P1  |  P1  |
Time: 0 -> 4 -> 7 -> 10 -> 14 -> 18 -> 22 -> 26 -> 30
```

Ready-queue trace:

- t=4: P1 ran 4, remaining 20; ready queue `[P2, P3, P1]`
- t=7: P2 ran 3, remaining 0; ready queue `[P3, P1]`
- t=10: P3 ran 3, remaining 0; ready queue `[P1]`
- t=14: P1 ran 4, remaining 16; ready queue `[P1]`
- t=18: P1 ran 4, remaining 12; ready queue `[P1]`
- t=22: P1 ran 4, remaining 8; ready queue `[P1]`
- t=26: P1 ran 4, remaining 4; ready queue `[P1]`
- t=30: P1 ran 4, remaining 0; ready queue `[]`

| Process | AT | BT | CT | TAT = CT - AT | WT = TAT - BT | RT |
|---|---|---|---|---|---|---|
| P1 | 0 | 24 | 30 | 30 | 6 | 0 |
| P2 | 0 | 3 | 7 | 7 | 4 | 4 |
| P3 | 0 | 3 | 10 | 10 | 7 | 7 |

Average TAT = 47/3 = 15.67, Average WT = 17/3 = 5.67, Average RT = 11/3 = 3.67.

## Worked Example B: alag-alag arrival times

| Process | AT | BT | Priority |
|---|---|---|---|
| P1 | 0 | 5 | 3 |
| P2 | 1 | 3 | 1 |
| P3 | 2 | 1 | 4 |
| P4 | 3 | 2 | 2 |

Priority convention: chhota number = zyada priority (P2 sabse important).

### FCFS

```text
|  P1  |  P2  |  P3  |  P4  |
Time: 0 -> 5 -> 8 -> 9 -> 11
```

| Process | AT | BT | CT | TAT | WT | RT |
|---|---|---|---|---|---|---|
| P1 | 0 | 5 | 5 | 5 | 0 | 0 |
| P2 | 1 | 3 | 8 | 7 | 4 | 4 |
| P3 | 2 | 1 | 9 | 7 | 6 | 6 |
| P4 | 3 | 2 | 11 | 8 | 6 | 6 |

Average TAT = 27/4 = 6.75, Average WT = 16/4 = 4.00, Average RT = 16/4 = 4.00.

### SJF (non-preemptive)

t=0 par sirf P1 ready hai, to P1 chalta hai 0-5. 5 par P2 (3), P3 (1), P4 (2) ready hain -> chhota BT wala P3.

```text
|  P1  |  P3  |  P4  |  P2  |
Time: 0 -> 5 -> 6 -> 8 -> 11
```

| Process | AT | BT | CT | TAT | WT | RT |
|---|---|---|---|---|---|---|
| P1 | 0 | 5 | 5 | 5 | 0 | 0 |
| P2 | 1 | 3 | 11 | 10 | 7 | 7 |
| P3 | 2 | 1 | 6 | 4 | 3 | 3 |
| P4 | 3 | 2 | 8 | 5 | 3 | 3 |

Average TAT = 24/4 = 6.00, Average WT = 13/4 = 3.25, Average RT = 13/4 = 3.25.

### SRTF (preemptive SJF)

Har arrival par remaining time check hota hai, isliye P1 beech mein preempt hota hai.

```text
|  P1  |  P2  |  P3  |  P2  |  P4  |  P1  |
Time: 0 -> 1 -> 2 -> 3 -> 5 -> 7 -> 11
```

| Process | AT | BT | CT | TAT | WT | RT |
|---|---|---|---|---|---|---|
| P1 | 0 | 5 | 11 | 11 | 6 | 0 |
| P2 | 1 | 3 | 5 | 4 | 1 | 0 |
| P3 | 2 | 1 | 3 | 1 | 0 | 0 |
| P4 | 3 | 2 | 7 | 4 | 2 | 2 |

Average TAT = 20/4 = 5.00, Average WT = 9/4 = 2.25, Average RT = 2/4 = 0.50.

### Round Robin, time quantum = 2

```text
|  P1  |  P2  |  P3  |  P1  |  P4  |  P2  |  P1  |
Time: 0 -> 2 -> 4 -> 5 -> 7 -> 9 -> 10 -> 11
```

Ready-queue trace:

- t=2: P1 ran 2, remaining 3; ready queue `[P2, P3, P1]`
- t=4: P2 ran 2, remaining 1; ready queue `[P3, P1, P4, P2]`
- t=5: P3 ran 1, remaining 0; ready queue `[P1, P4, P2]`
- t=7: P1 ran 2, remaining 1; ready queue `[P4, P2, P1]`
- t=9: P4 ran 2, remaining 0; ready queue `[P2, P1]`
- t=10: P2 ran 1, remaining 0; ready queue `[P1]`
- t=11: P1 ran 1, remaining 0; ready queue `[]`

| Process | AT | BT | CT | TAT | WT | RT |
|---|---|---|---|---|---|---|
| P1 | 0 | 5 | 11 | 11 | 6 | 0 |
| P2 | 1 | 3 | 10 | 9 | 6 | 1 |
| P3 | 2 | 1 | 5 | 3 | 2 | 2 |
| P4 | 3 | 2 | 9 | 6 | 4 | 4 |

Average TAT = 29/4 = 7.25, Average WT = 18/4 = 4.50, Average RT = 7/4 = 1.75.

### Priority (non-preemptive)

t=0 par sirf P1, wo pura chalta hai. Phir P2 (prio 1) > P4 (prio 2) > P3 (prio 4).

```text
|  P1  |  P2  |  P4  |  P3  |
Time: 0 -> 5 -> 8 -> 10 -> 11
```

| Process | AT | BT | Priority | CT | TAT | WT | RT |
|---|---|---|---|---|---|---|---|
| P1 | 0 | 5 | 3 | 5 | 5 | 0 | 0 |
| P2 | 1 | 3 | 1 | 8 | 7 | 4 | 4 |
| P3 | 2 | 1 | 4 | 11 | 9 | 8 | 8 |
| P4 | 3 | 2 | 2 | 10 | 7 | 5 | 5 |

Average TAT = 28/4 = 7.00, Average WT = 17/4 = 4.25, Average RT = 17/4 = 4.25.

### Priority (preemptive)

```text
|  P1  |  P2  |  P4  |  P1  |  P3  |
Time: 0 -> 1 -> 4 -> 6 -> 10 -> 11
```

| Process | AT | BT | Priority | CT | TAT | WT | RT |
|---|---|---|---|---|---|---|---|
| P1 | 0 | 5 | 3 | 10 | 10 | 5 | 0 |
| P2 | 1 | 3 | 1 | 4 | 3 | 0 | 0 |
| P3 | 2 | 1 | 4 | 11 | 9 | 8 | 8 |
| P4 | 3 | 2 | 2 | 6 | 3 | 1 | 1 |

Average TAT = 25/4 = 6.25, Average WT = 14/4 = 3.50, Average RT = 9/4 = 2.25.

## Saare algorithms ka comparison

| Algorithm | Preemptive? | Starvation possible? | Best for |
|---|---|---|---|
| FCFS | Nahi | Nahi | Simple batch, order matter nahi karta |
| SJF | Nahi | Haan (lambe jobs) | Minimum average WT jab sab saath aayein |
| SRTF | Haan | Haan (lambe jobs) | Minimum average WT with arrivals |
| Priority | Dono | Haan (low priority) | Important tasks pehle |
| Round Robin | Haan | Nahi | Time-sharing, interactive systems |
| Multilevel Feedback Queue | Haan | Nahi (aging ke saath) | General-purpose OS, mixed workload |

::: details Follow-up: Kaunsa algorithm minimum average waiting time deta hai?
SJF (aur arrivals ke saath uska preemptive version SRTF) minimum average waiting time deta hai, jab saare jobs available ho. Dikkat ye hai ki burst time pehle se pata nahi hota, isliye estimate karna padta hai.
:::

::: details Follow-up: Round Robin mein time quantum bada ya chhota rakhein?
Agar quantum bahut bada hai to RR FCFS jaisa behave karega. Bahut chhota rakha to har baar context switch hoga aur overhead badh jaayega. Balance aisa ki zyadatar CPU bursts ek quantum mein complete ho jaayein.
:::

::: tip Interview mein aise bolo
The CPU scheduler picks a process from the ready queue to run next. FCFS is simple but suffers from the convoy effect. SJF gives the minimum average waiting time but can starve long jobs and needs burst-time estimates. Round Robin uses a fixed time quantum and is ideal for time-sharing systems. Real operating systems use preemptive, priority-based scheduling built on multilevel feedback queue ideas.
:::

## Yaad rakhne layak points

- TAT = CT - AT, WT = TAT - BT, RT = first CPU time - AT.
- FCFS non-preemptive, simple, lekin convoy effect deta hai.
- SJF/SRTF minimum average waiting time, par starvation aur burst-time estimate ki problem.
- Priority scheduling mein starvation hoti hai; fix = aging.
- Round Robin preemptive hai, time quantum par depend karta hai; bada quantum = FCFS, chhota quantum = zyada context switch.
- Non-preemptive mein CPU chheena nahi jaata; preemptive mein jaata hai.
- Multilevel Feedback Queue sabse flexible, process queues ke beech move kar sakta hai.
- Modern OS preemptive, priority-based scheduling use karte hain (multilevel feedback queue ke ideas ke saath).

## Quick Quiz

<Quiz id="os-cpu-scheduling" title="CPU Scheduling Quiz" />
