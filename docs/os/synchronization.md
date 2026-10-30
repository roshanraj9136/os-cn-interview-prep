# Process Synchronization

Is page mein aap seekhenge ki jab kai processes ya threads ek saath shared data use karte hain, to galat results kaise aa sakte hain (race condition), aur OS unhe sahi karne ke liye kaunse tools deta hai: locks, semaphores, monitors. Ye topic interviews mein bahut aata hai, khaaskar mutex vs semaphore aur producer-consumer.

| Topic | Kitna puchha jaata hai |
|---|---|
| Race condition | ⭐⭐⭐ |
| Critical section ke 3 requirements | ⭐⭐⭐ |
| Mutex vs Semaphore | ⭐⭐⭐ |
| Producer-Consumer problem | ⭐⭐ |
| Peterson's solution | ⭐⭐ |
| Readers-Writers, Dining Philosophers | ⭐⭐ |
| Monitors | ⭐ |

## Synchronization kyun chahiye?

Jab do threads ek hi shared variable ko ek saath padh/badal rahe hon, to unka order galat ho sakta hai aur data corrupt ho jaata hai. Synchronization ka matlab: inke access ko aise control karna ki ek waqt mein sirf ek hi thread shared data chhue.

Analogy: ek bank account joint hai. Pati aur patni dono ek saath ATM se paise nikaalein to balance galat ho sakta hai. Synchronization matlab ek waqt mein sirf ek hi transaction allow karna.

### Race condition <Badge type="danger" text="Most Asked" />

Race condition tab hoti hai jab final result is baat par depend kar jaaye ki threads kis order mein chale. Classic example: `counter++`.

`counter++` ek hi line lagti hai, par CPU ke liye 3 steps hain:

```text
1. load   : register = counter      (RAM se padho)
2. add    : register = register + 1 (badhao)
3. store  : counter = register      (RAM mein wapas likho)
```

Ab maan lo `counter = 5` hai, aur do threads T1 aur T2 dono `counter++` karte hain. Agar unke steps aise interleave ho jaayein:

| Step | Thread | Kaam | counter | T1 reg | T2 reg |
|---|---|---|---|---|---|
| 1 | T1 | load | 5 | 5 | - |
| 2 | T2 | load | 5 | 5 | 5 |
| 3 | T1 | add | 5 | 6 | 5 |
| 4 | T2 | add | 5 | 6 | 6 |
| 5 | T1 | store | 6 | 6 | 6 |
| 6 | T2 | store | 6 | 6 | 6 |

 Dono ne ++ kiya, final 7 hona chahiye tha, par aaya 6. Ek update kho gayi. Yahi race condition hai.

::: tip Interview mein aise bolo
A race condition happens when two or more threads access shared data at the same time and the final result depends on the exact order in which their operations are interleaved. For example, two threads both doing counter++ can lose an update, because the operation is actually load, add, store, and the OS can switch threads in the middle.
:::

## Critical section aur uske 3 requirements <Badge type="danger" text="Most Asked" />

Critical section = code ka wo hissa jahan shared data access hota hai. Har process ka structure aisa hota hai:

```text
do {
    entry section     // permission lo
       critical section   // shared data use karo
    exit section      // permission chhodo
       remainder section  // baaki kaam
} while (true);
```

Koi bhi sahi solution ke teen requirements hain:

- Mutual exclusion: ek waqt mein ek se zyada process critical section mein nahi ho sakte.
- Progress: agar koi critical section mein nahi hai aur kuch process ghusna chahte hain, to selection bina wajah ke late na ho (jo nahi ghusna chahta wo decision block na kare).
- Bounded waiting: ek process ko hamesha wait na karna pade; usko ek limit ke andar chance milna chahiye (no starvation).

::: warning Common galti
Sirf mutual exclusion kaafi nahi hai. Agar progress ya bounded waiting toot jaaye to solution galat maana jaata hai, kyunki deadlock ya starvation ho sakta hai.
:::

## Peterson's solution

Ye software-only solution hai sirf 2 processes ke liye. Do shared variables: `flag[2]` (kaun ghusna chahta hai) aur `turn` (abhi kiski baari).

```c
// Process i (dusra process j = 1 - i)
flag[i] = true;        // main ghusna chahta hoon
turn = j;              // par pehle doosre ko mauka
while (flag[j] && turn == j)
    ;                  // wait
// --- critical section ---
flag[i] = false;       // nikal gaya
// --- remainder section ---
```

Ye teeno requirements paper par satisfy karta hai. Limitation: modern CPUs instructions ka order badal dete hain (reordering), isliye isko sahi chalaane ke liye memory barriers chahiye. Practice mein hardware instructions ya OS locks use hote hain.

## Hardware help: test-and-set aur compare-and-swap

Modern CPUs atomic instructions dete hain jo load+store ko ek hi uninterruptible step mein kar dete hain:

- test-and-set: ek memory word ki value padho aur usko 1 set kar do, ek hi atomic step mein. Lock banane ke liye use hota hai.
- compare-and-swap (CAS): "agar value expected ke barabar hai to naya value likho", atomic. Lock-free data structures ki base hai.

In atomic instructions par hi mutex aur semaphore bante hain.

## Mutex lock aur spinlock

Mutex (mutual exclusion lock): ek lock jisko `lock()` karke critical section mein ghuste ho aur `unlock()` karke nikalte ho. Important: mutex ka ownership hota hai, yaani jisne lock kiya wahi unlock kare.

Spinlock: ek aisa lock jisme wait karte waqt thread "busy waiting" karta hai, yaani loop mein ghoomta rehta hai jab tak lock na mile (CPU chhodta nahi).

- Busy waiting CPU waste karta hai.
- Spinlock tab theek hai jab lock bahut thodi der ke liye hold hota hai aur multi-core CPU par ho (thread ko sleep/wake karne ka overhead bachta hai).

## Semaphores <Badge type="danger" text="Most Asked" />

Semaphore ek integer counter hai jisko do atomic operations se change karte hain:

- `wait()` (P operation / down): counter ghatao; agar counter 0 se kam ho jaye to process wait kare.
- `signal()` (V operation / up): counter badhao; koi wait kar raha ho to usko jagao.

Do types:

- Counting semaphore: koi bhi non-negative value. Jab aapke paas N identical resources hon (jaise 3 printers), initial value N.
- Binary semaphore: sirf 0 ya 1. Lock jaisa behave karta hai, par iska ownership nahi hota (koi bhi signal kar sakta hai).

### Mutex vs Semaphore

| Point | Mutex | Semaphore |
|---|---|---|
| Kya hai | Lock (mutual exclusion) | Integer counter |
| Values | Locked / unlocked | 0, 1 (binary) ya 0..N (counting) |
| Ownership | Haan, jisne lock kiya wahi unlock kare | Nahi, koi bhi wait/signal kar sakta hai |
| Use | Ek resource ko protect karna | Signalling aur counting identical resources |
| Operations | lock(), unlock() | wait() (P), signal() (V) |

::: tip Interview mein aise bolo
A mutex is a lock with ownership: only the thread that locked it should unlock it, and it is used for mutual exclusion. A semaphore is an integer counter with wait and signal operations and no ownership; it is used for signalling between threads and for counting a number of identical resources. A binary semaphore acts like a lock but, unlike a mutex, has no ownership.
:::

::: warning Common galti
Log kehte hain "binary semaphore = mutex". Nahi. Dono 0/1 ho sakte hain, par mutex ka ownership hota hai (sirf lock karne wala unlock kare), binary semaphore ka nahi.
:::

## Monitors

Monitor ek high-level construct hai (Java ke `synchronized`, C# ke `lock` jaisa). Isme shared data aur uspe kaam karne wale functions ek hi unit mein bandhe hote hain, aur ek waqt mein sirf ek thread monitor ke andar ho sakta hai. Mutual exclusion automatic milti hai.

Condition variables monitor ke andar hote hain, do operations ke saath:

- `wait()`: thread apne aap ko suspend karke monitor chhod deta hai (kisi condition ka intezaar).
- `signal()`: kisi waiting thread ko jagata hai.

Monitors programmer ki galtiyaan kam karte hain, kyunki locking aap ke bajaye compiler/runtime sambhalta hai.

## Classic problem 1: Producer-Consumer (bounded buffer)

Ek buffer (N slots) hai. Producer items daalta hai, consumer nikaalta hai. Rules: buffer full ho to producer ruke, empty ho to consumer ruke, aur buffer ek waqt mein ek hi haath chhue.

Teen semaphores:

- `empty = N` (kitne khaali slots hain)
- `full = 0` (kitne bhare slots hain)
- `mutex = 1` (buffer ki mutual exclusion)

```text
Producer:                 Consumer:
  wait(empty);              wait(full);
  wait(mutex);              wait(mutex);
  // item buffer mein daalo // item buffer se nikaalo
  signal(mutex);            signal(mutex);
  signal(full);             signal(empty);
```

::: warning Common galti
Dono wait() ka order matter karta hai. Agar producer pehle `wait(mutex)` phir `wait(empty)` kare, to buffer full hone par wo mutex pakde hue soya rahega, consumer `wait(mutex)` par atak jaayega -> deadlock. Isliye hamesha pehle counting semaphore (empty/full), phir mutex.
:::

## Classic problem 2: Readers-Writers

Shared data ko kai reader ek saath padh sakte hain (koi dikkat nahi), par writer akela chahiye (writing ke waqt koi reader ya writer na ho).

First readers-writers problem mein readers ko priority di jaati hai: jab tak ek bhi reader padh raha hai, writer ko entry nahi milti. Isse writer starvation ho sakti hai (readers aate rahein to writer kabhi na likh paaye). Solution mein ek `read_count` aur ek mutex use hota hai readers ko count karne ke liye, aur ek `wrt` semaphore writer ke liye.

::: details Follow-up: Readers-writers mein writer starvation kyun hoti hai?
First variant readers ko priority deta hai. Agar naye readers lagaataar aate rahein to `read_count` kabhi 0 nahi hota, aur writer ka wait kabhi khatam nahi hota. Fix: writer-priority variant ya ek fair (third) variant use karo.
:::

## Classic problem 3: Dining Philosophers

5 philosophers ek round table par, beech mein 5 chopsticks. Khaane ke liye har philosopher ko left aur right dono chopstick chahiye.

Deadlock kab: agar sab ek saath apna left chopstick pehle utha lein, to har kisi ke paas ek hai, koi doosra nahi utha paata, sab wait karte rahte hain (circular wait).

Teen common fixes:

- Table par ek waqt mein zyada se zyada 4 philosophers baithne do (phir kam se kam ek dono chopstick le sakega).
- Dono chopsticks ek saath hi utha pane do, ek critical section ke andar (ek-ek karke nahi).
- Asymmetry: odd-numbered philosopher pehle left uthaye, even-numbered pehle right. Isse circular wait toot jaata hai.

::: tip Interview mein aise bolo
In the dining philosophers problem, deadlock happens if every philosopher picks up the left chopstick first, so everyone holds one and waits forever for the other. Common fixes are: allow at most four philosophers at the table, make a philosopher pick up both chopsticks only together inside a critical section, or make odd philosophers pick left first and even philosophers pick right first.
:::

Deadlock ke poore details ke liye dekho [Deadlock](/os/deadlock).

## Yaad rakhne layak points

- Race condition = result thread interleaving order par depend karta hai; classic example counter++.
- Critical section solution ke 3 requirements: mutual exclusion, progress, bounded waiting.
- Peterson's solution 2 processes ke liye software solution hai; modern CPUs par memory barriers chahiye.
- Atomic hardware instructions: test-and-set aur compare-and-swap, inhi par locks bante hain.
- Mutex ownership rakhta hai; semaphore ek counter hai bina ownership ke.
- Counting semaphore N identical resources ke liye, binary semaphore (0/1) lock jaisa.
- Producer-consumer: empty = N, full = 0, mutex = 1; wait() ka galat order deadlock de sakta hai.
- Dining philosophers tab deadlock hota hai jab sab pehle left chopstick uthaayein.

## Quick Quiz

<Quiz id="os-synchronization" title="Process Synchronization Quiz" />
