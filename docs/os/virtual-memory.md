# Virtual Memory

Is page mein aap seekhenge ki OS kaise RAM se badi memory ka illusion deta hai: demand paging, page fault, page replacement (FIFO, LRU, Optimal), Belady's anomaly aur thrashing. Page replacement numericals online assessment ke favourites hain.

| Topic | Kitna puchha jaata hai |
|---|---|
| Page replacement (FIFO/LRU/Optimal) | ⭐⭐⭐ |
| Page fault handling | ⭐⭐⭐ |
| Thrashing | ⭐⭐⭐ |
| Demand paging | ⭐⭐ |
| Belady's anomaly | ⭐⭐ |
| Copy-on-write | ⭐⭐ |

## Virtual memory kya hai

**Virtual memory** ek technique hai jisse ek process ko lagta hai ki uske paas poori badi memory hai, chahe RAM usse chhoti ho. Process ka kuch hissa RAM mein hota hai aur baaki disk (swap space) par; jab zaroorat pade tab RAM mein laaya jaata hai.

**Analogy**: aapki study table (RAM) chhoti hai, par almari (disk) badi. Aap sirf wahi kitaab table par rakhte ho jo abhi padhni hai; baaki almari mein. Jab doosri kitaab chahiye, use almari se le aate ho aur table se purani wapas rakh dete ho.

Fayde: programs RAM se bade ho sakte hain, zyada processes ek saath chal sakte hain, aur programmer ko memory manage nahi karni padti.

## Demand paging

**Demand paging** matlab page ko RAM mein tabhi laao jab actually use ho (lazy loading). Program start hone par pura load nahi hota.

Har page table entry mein ek **valid-invalid bit** hota hai:

- **valid (v)**: page RAM mein hai.
- **invalid (i)**: page RAM mein nahi (disk par hai, ya illegal address).

Jab CPU aise page ko access kare jiska bit invalid ho, to **page fault** hota hai.

## Page fault handling <Badge type="danger" text="Most Asked" />

Page fault koi error nahi hai; ye bas signal hai ki page abhi RAM mein nahi hai. OS steps:

```text
1. CPU page access karta hai -> entry invalid -> TRAP (page fault)
2. OS check karta hai: address legal hai?
       nahi -> process ko maar do (segmentation fault)
       haan -> aage
3. Ek free frame dhoondo (nahi mila to page replacement)
4. Disk se page ko us frame mein laao (slow I/O)
5. Page table update: bit = valid, frame number set
6. Faulting instruction ko dobara chalao
```

### EAT with page faults (verified example)

**Kaise solve karein**: EAT = (1 - p) x memory access + p x page-fault service time, jahan p = fault rate.

Memory access = 200 ns, page-fault service time = 8 ms = 8,000,000 ns, p = 0.001 (1 in 1000).

```text
EAT = (1 - 0.001) x 200 + 0.001 x 8,000,000
    = 0.999 x 200 + 0.001 x 8,000,000
    = 199.8 + 8000
    = 8199.8 ns  (about 8.2 microseconds)
```

Normal access 200 ns tha, ab 8199.8 ns -> lagbhag **41x slow**. Matlab 1 in 1000 bhi faults bahut mehnge hote hain. Isi liye page faults kam rakhna zaroori hai.

::: tip Interview mein aise bolo
A page fault occurs when a program accesses a page that is not currently in RAM. The OS traps, finds the page on disk, loads it into a free frame, updates the page table, and restarts the instruction. Because disk access is far slower than RAM, even a small fault rate greatly increases the effective access time.
:::

## Page replacement <Badge type="danger" text="Most Asked" />

Jab ek naya page laana ho par koi free frame na bache, OS kisi purane page ko hataata hai. Kis page ko hataana hai, ye page replacement algorithm tay karta hai. Goal: page faults kam karna.

Humara **teaching reference string** (13 references), 3 frames: `7 0 1 2 0 3 0 4 2 3 0 3 2`. Frames khaali start hote hain; khaali frame bharna bhi ek page fault ginnein.

### FIFO (First In First Out)

Jo page sabse pehle aaya tha wahi sabse pehle nikaalo. Simple, par hamesha achha nahi.

| Step | Page | F1 | F2 | F3 | Result | Replaced |
|---|---|---|---|---|---|---|
| 1 | 7 | 7 | - | - | Fault |  |
| 2 | 0 | 7 | 0 | - | Fault |  |
| 3 | 1 | 7 | 0 | 1 | Fault |  |
| 4 | 2 | 2 | 0 | 1 | Fault | 7 |
| 5 | 0 | 2 | 0 | 1 | Hit |  |
| 6 | 3 | 2 | 3 | 1 | Fault | 0 |
| 7 | 0 | 2 | 3 | 0 | Fault | 1 |
| 8 | 4 | 4 | 3 | 0 | Fault | 2 |
| 9 | 2 | 4 | 2 | 0 | Fault | 3 |
| 10 | 3 | 4 | 2 | 3 | Fault | 0 |
| 11 | 0 | 0 | 2 | 3 | Fault | 4 |
| 12 | 3 | 0 | 2 | 3 | Hit |  |
| 13 | 2 | 0 | 2 | 3 | Hit |  |

**Page faults = 10, Hits = 3, Hit ratio = 3/13 = 0.23**

### LRU (Least Recently Used)

Jo page sabse lambe time se use nahi hua, usse nikaalo. Soch: jo abhi use hua wo aage bhi use hoga.

| Step | Page | F1 | F2 | F3 | Result | Replaced |
|---|---|---|---|---|---|---|
| 1 | 7 | 7 | - | - | Fault |  |
| 2 | 0 | 7 | 0 | - | Fault |  |
| 3 | 1 | 7 | 0 | 1 | Fault |  |
| 4 | 2 | 2 | 0 | 1 | Fault | 7 |
| 5 | 0 | 2 | 0 | 1 | Hit |  |
| 6 | 3 | 2 | 0 | 3 | Fault | 1 |
| 7 | 0 | 2 | 0 | 3 | Hit |  |
| 8 | 4 | 4 | 0 | 3 | Fault | 2 |
| 9 | 2 | 4 | 0 | 2 | Fault | 3 |
| 10 | 3 | 4 | 3 | 2 | Fault | 0 |
| 11 | 0 | 0 | 3 | 2 | Fault | 4 |
| 12 | 3 | 0 | 3 | 2 | Hit |  |
| 13 | 2 | 0 | 3 | 2 | Hit |  |

**Page faults = 9, Hits = 4, Hit ratio = 4/13 = 0.31**

### Optimal (OPT)

Jo page sabse door future mein use hoga (ya kabhi nahi hoga) use nikaalo. Ye theoretically best hai, par future pata hona chahiye, isliye real mein possible nahi. Benchmark ke liye use karte hain.

| Step | Page | F1 | F2 | F3 | Result | Replaced |
|---|---|---|---|---|---|---|
| 1 | 7 | 7 | - | - | Fault |  |
| 2 | 0 | 7 | 0 | - | Fault |  |
| 3 | 1 | 7 | 0 | 1 | Fault |  |
| 4 | 2 | 2 | 0 | 1 | Fault | 7 |
| 5 | 0 | 2 | 0 | 1 | Hit |  |
| 6 | 3 | 2 | 0 | 3 | Fault | 1 |
| 7 | 0 | 2 | 0 | 3 | Hit |  |
| 8 | 4 | 2 | 4 | 3 | Fault | 0 |
| 9 | 2 | 2 | 4 | 3 | Hit |  |
| 10 | 3 | 2 | 4 | 3 | Hit |  |
| 11 | 0 | 2 | 0 | 3 | Fault | 4 |
| 12 | 3 | 2 | 0 | 3 | Hit |  |
| 13 | 2 | 2 | 0 | 3 | Hit |  |

**Page faults = 7, Hits = 6, Hit ratio = 6/13 = 0.46**

Dekho: Optimal (7) < LRU (9) < FIFO (10) page faults. Ye order aksar sach rehta hai.

### Textbook string ke totals

Ek standard textbook string (20 references): `7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1`, 3 frames:

| Algorithm | Page faults |
|---|---|
| FIFO | 15 |
| LRU | 12 |
| Optimal | 9 |

### LRU kaise implement karte hain

- **Counters**: har entry par ek time-stamp; replace karte waqt sabse purana dhoondo.
- **Stack**: use hua page stack ke top par; neeche wala least recently used. Dono exact par mehnge hain.

Isi liye real OS LRU ko **approximate** karte hain:

- **Reference bit**: har access par bit 1 set; OS time-time par 0 karta hai. 0 wala page purana maana jaata hai.
- **Second-chance / Clock**: FIFO jaisa, par nikaalne se pehle reference bit dekho; agar 1 ho to ek "second chance" do (bit 0 karke aage badho).

**LFU** (Least Frequently Used): sabse kam baar use hua page hatao. **MFU**: sabse zyada use hua hatao (soch: jo abhi aaya hai use abhi chahiye hoga). Dono common nahi.

::: tip Interview mein aise bolo
Page replacement decides which page to evict when memory is full. FIFO evicts the oldest-loaded page, LRU evicts the page unused for the longest time, and Optimal evicts the page needed farthest in the future. Optimal gives the fewest faults but needs future knowledge, so real systems approximate LRU using a reference bit with the clock algorithm.
:::

## Belady's anomaly <Badge type="danger" text="Most Asked" />

Normally zyada frames do to page faults kam hone chahiye. Par **FIFO mein kabhi-kabhi zyada frames se zyada page faults** ho jaate hain. Isi ulti baat ko **Belady's anomaly** kehte hain.

Verified string: `1 2 3 4 1 2 5 1 2 3 4 5` with FIFO:

| Frames | FIFO page faults |
|---|---|
| 3 frames | 9 |
| 4 frames | 10 (zyada frames, zyada faults!) |

LRU aur Optimal **stack algorithms** hain; inme ye anomaly nahi hoti. Usi string par LRU: 3 frames = 10, 4 frames = 8 (frames badhe to faults kam, as expected).

::: warning Common galti
"Frames badhao to faults hamesha kam honge" galat hai. FIFO mein Belady's anomaly ke kaaran ulta ho sakta hai. LRU aur Optimal mein nahi hota.
:::

## Thrashing <Badge type="danger" text="Most Asked" />

**Thrashing** tab hota hai jab system itne page faults jhel raha ho ki wo asli kaam karne se zyada time pages ko disk se laane-le jaane mein lagata hai. CPU utilisation gir jaata hai, par system "busy" dikhta hai.

**Cause**: bahut saare processes ek saath, har ek ko apne working set ke liye kaafi frames nahi milte.

**Symptoms**: CPU utilisation low, disk I/O bahut high, system slow.

**Fixes**:

- **Working-set model**: har process ko uske recently-used pages (working set) ke liye kaafi frames do.
- **Page-fault frequency (PFF) control**: fault rate upar jaaye to frames badhao, neeche jaaye to ghatao.
- **Degree of multiprogramming kam karo** (kuch processes suspend/swap out karo).
- **RAM badhao**.

```text
CPU utilisation
   |        ____
   |       /    \   <- thrashing yahan se gir jaata hai
   |      /      \
   |     /        \____
   |____/______________\____ degree of multiprogramming
```

::: details Follow-up: Thrashing aur normal paging mein farq?
Normal demand paging mein kabhi-kabhi fault hota hai aur system aage badhta rehta hai. Thrashing mein faults itne zyada ho jaate hain ki progress ruk sa jaata hai aur CPU ka zyada time swapping mein chala jaata hai.
:::

## Copy-on-write (COW)

`fork()` child banata hai jo parent ki memory ki copy chahta hai. Poori copy banana mehnga hai. **Copy-on-write** trick: shuru mein parent aur child same physical pages share karte hain (read-only mark). Jab koi ek page ko likhne ki koshish kare, tabhi OS us page ki alag copy banata hai.

Isse `fork()` tez ho jaata hai, kyunki sirf badalne wale pages copy hote hain, baaki shared hi rehte hain.

## Page table entry ke bits

| Bit | Matlab |
|---|---|
| Valid / Invalid | Page RAM mein hai ya nahi |
| Dirty / Modified | Page badla gaya hai? Agar haan to replace karte waqt disk par likhna padega |
| Referenced / Accessed | Page haal mein use hua? (LRU approximation ke liye) |
| Protection (r/w/x) | Read / write / execute permission |

**Dirty bit** ka fayda: agar page modify nahi hua (clean), to replace karte waqt use disk par dobara likhne ki zaroorat nahi; bas overwrite kar do. Isse I/O bachta hai.

## Yaad rakhne layak points

- Virtual memory RAM se badi memory ka illusion deta hai: kuch RAM mein, baaki disk par.
- Demand paging = page tabhi laao jab chahiye (valid-invalid bit se pata chalta hai).
- Teaching string (3 frames): FIFO = 10 faults, LRU = 9, Optimal = 7. Order: Optimal < LRU < FIFO.
- Textbook string (20 refs, 3 frames): FIFO = 15, LRU = 12, Optimal = 9.
- EAT with faults: access 200 ns, service 8 ms, p = 0.001 => 8199.8 ns (~41x slow).
- Belady's anomaly sirf FIFO mein: zyada frames se zyada faults (string par 3 frames = 9, 4 frames = 10).
- Thrashing = swapping mein zyada time; CPU utilisation girta hai. Fix: working-set, PFF, multiprogramming kam karo, RAM badhao.
- Copy-on-write fork() ko tez banata hai: write hone par hi page copy hota hai.
- Dirty bit: clean page replace karte waqt disk par likhne ki zaroorat nahi.

## Quick Quiz

<Quiz id="os-virtual-memory" title="Virtual Memory Quiz" />
