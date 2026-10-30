# Process aur Thread

Ye OS ka sabse zyada puchha jaane wala topic hai. "Process vs thread" to lagbhag har technical interview mein aata hai. Is page mein aap seekhoge: process kya hai, uska memory layout, PCB, states, context switch, schedulers, `fork()`, zombie/orphan, thread, aur IPC.

Dhyan se padho — yahan ki har table interview mein kaam aayegi.

| Topic | Kitna puchha jaata hai |
|---|---|
| Process vs Thread | ⭐⭐⭐ |
| Process states | ⭐⭐⭐ |
| `fork()` aur child count | ⭐⭐⭐ |
| Zombie aur orphan process | ⭐⭐ |
| Context switch | ⭐⭐ |
| IPC (shared memory vs message passing) | ⭐⭐ |

## Program vs process

**Program** ek file hai disk par — bas instructions ka set, jo kuch kar nahi raha. Jaise recipe ek kitaab mein likhi hai.

**Process** ek program hai jo abhi RAM mein chal raha hai — uska apna memory, CPU state aur resources hain. Jaise aap recipe padh ke sach mein khana bana rahe ho.

Ek hi program se kai process ban sakte hain (jaise Chrome ke kai tabs, har tab ek process).

### Process memory layout

Jab program process banta hai, use RAM mein 4 hisson mein jagah milti hai:

```text
  +------------------+  high address
  |      Stack       |  function calls, local variables (neeche badhta)
  |        |         |
  |        v         |
  |                  |
  |        ^         |
  |        |         |
  |      Heap        |  dynamic memory (malloc / new) (upar badhta)
  +------------------+
  |      Data        |  global aur static variables
  +------------------+
  |      Text        |  program ka code (instructions)
  +------------------+  low address
```

- **Text:** code (instructions). Read-only.
- **Data:** global aur static variables.
- **Heap:** run time par maangi gayi memory (`malloc`, `new`). Upar ki taraf badhta hai.
- **Stack:** function calls, local variables, return address. Neeche ki taraf badhta hai.

Stack aur heap ek doosre ki taraf badhte hain; takkar ho jaaye to stack overflow jaisi dikkat aati hai.

## PCB (Process Control Block)

Har process ka ek **PCB** hota hai — OS ki ek table/record jisme us process ki saari zaroori info hoti hai. Jab CPU ek process se doosre par jaata hai, to OS PCB mein hi state save/restore karta hai.

PCB mein kya hota hai:

- **PID** (process ID)
- **Process state** (ready, running, waiting...)
- **Program counter** (agla instruction ka address)
- **CPU registers** (current values)
- **Memory info** (base/limit, page table)
- **Open files** ki list
- **Scheduling info** (priority, queue pointers)
- **Accounting info** (CPU time use kiya)

::: tip Interview mein aise bolo
A Process Control Block is a data structure the OS keeps for every process. It stores the process ID, its current state, the program counter, CPU registers, memory management information, a list of open files, and scheduling details. On a context switch, the OS saves the running process's state into its PCB and loads the next process's state from its PCB.
:::

## Process states

Ek process apni life mein alag-alag states se guzarta hai. Standard **5-state model**:

```text
    New ----> Ready <-------- Waiting
               |  ^              ^
    (dispatch) |  | (preempt)    | (I/O done)
               v  |              |
            Running ---------------
               |          (I/O / wait)
               v
          Terminated
```

| State | Matlab |
|---|---|
| New | Process ban raha hai |
| Ready | Chalne ko taiyaar, bas CPU ka wait |
| Running | Abhi CPU par chal raha hai |
| Waiting (Blocked) | Kisi event (I/O) ka wait kar raha hai |
| Terminated | Khatam ho gaya |

Transitions:

- **New -> Ready:** admit (memory mil gayi).
- **Ready -> Running:** dispatch (scheduler ne CPU diya).
- **Running -> Ready:** preempt (time slice khatam ya higher priority aaya).
- **Running -> Waiting:** I/O ya event ka wait.
- **Waiting -> Ready:** event poora ho gaya.
- **Running -> Terminated:** kaam khatam ya exit.

**7-state model:** isme 5 ke upar do **suspended** states aati hain — Ready/Suspended aur Waiting(Blocked)/Suspended. Jab RAM kam pad jaaye to medium-term scheduler process ko disk par swap kar deta hai (suspend); baad mein wapas RAM mein laata hai.

## Context switch

**Context switch** matlab CPU ka ek process se doosre process par jaana. OS current process ka state (registers, program counter) uske PCB mein save karta hai, phir next process ka state uske PCB se load karta hai.

Steps:

1. Current process ka state PCB mein save.
2. Us process ko ready/waiting queue mein daalo.
3. Next process chuno (scheduler).
4. Uske PCB se state restore karo.
5. Uska code chalana shuru.

Ye **pure overhead** hai — is dauran koi useful user kaam nahi hota, sirf switching ka cost lagta hai. Isliye bahut zyada context switch (chhota time quantum) performance kharab karta hai.

::: warning Common galti
Context switch aur mode switch (user se kernel mode, jaise system call par) same nahi hain. Mode switch same process ke andar hota hai; context switch alag process par jaana hai. Har system call context switch nahi hoti.
:::

## Schedulers aur dispatcher

Teen tarah ke schedulers hote hain:

| Scheduler | Kaam | Speed |
|---|---|---|
| Long-term (job scheduler) | Kaun se jobs RAM mein aayein (degree of multiprogramming) | Kabhi kabhi chalta hai |
| Short-term (CPU scheduler) | Ready queue se kis process ko CPU dena | Bahut baar, tez |
| Medium-term | Process ko RAM se disk par swap out/in karna | Beech ki speed |

**Dispatcher** wo module hai jo actually CPU ko chune gaye process ko de deta hai (context switch + user mode mein jump). Isme laga time **dispatch latency** kehlata hai.

**CPU-bound vs I/O-bound:** CPU-bound process ko zyada CPU time chahiye (jaise heavy calculation). I/O-bound process zyada I/O wait karta hai (jaise file padhna). Achha mix dono ko busy rakhta hai.

## fork(), exec(), wait(), exit()

`fork()` ek system call hai jo current process ki **copy** bana deta hai (child process). Copy aur original lagbhag same hote hain.

`fork()` ke return values:

- Child process mein: **0**
- Parent process mein: child ka **PID (> 0)**
- Error par: **-1**

```c
#include <stdio.h>
#include <unistd.h>

int main() {
    pid_t pid = fork();
    if (pid < 0) {
        printf("fork failed\n");
    } else if (pid == 0) {
        printf("Main child hoon, PID %d\n", getpid());
    } else {
        printf("Main parent hoon, child ka PID %d\n", pid);
    }
    return 0;
}
```

- `exec()` process ke code ko naye program se **replace** kar deta hai (PID same rehta hai).
- `wait()` parent ko child ke khatam hone tak rukne deta hai.
- `exit()` process ko khatam karta hai.
- **Copy-on-write** se `fork()` sasta hota hai: parent aur child shuru mein same memory pages share karte hain; jab koi likhne jaata hai tabhi copy banti hai. (Detail [Virtual Memory](/os/virtual-memory) page par.)

### "Hello kitni baar print hoga" wala sawaal

`n` consecutive `fork()` calls ke baad total **2^n** processes hote hain (yaani `2^n - 1` naye child).

```c
fork();
fork();
fork();
printf("hi\n");
```

Yahan 3 fork hain, to total `2^3 = 8` processes, aur "hi" **8 baar** print hoga.

| fork() calls | Total processes | Naye children |
|---|---|---|
| 1 | 2 | 1 |
| 2 | 4 | 3 |
| 3 | 8 | 7 |
| n | 2^n | 2^n - 1 |

::: tip Interview mein aise bolo
fork creates a new child process that is almost a copy of the parent. It returns zero in the child, the child's PID in the parent, and minus one on failure. Modern systems use copy-on-write so the two processes share memory pages until one of them writes. After fork, exec is often used to replace the child's program image, while keeping the same PID.
:::

## Zombie, orphan aur daemon

| Term | Kya hai |
|---|---|
| Zombie | Child khatam ho gaya, par parent ne abhi `wait()` nahi kiya. Uska entry process table mein pada reh jaata hai. |
| Orphan | Parent pehle khatam ho gaya, child abhi chal raha hai. Ise init/systemd (PID 1) adopt kar leta hai aur baad mein reap karta hai. |
| Daemon | Background mein chalne wala service process (jaise web server), koi terminal se juda nahi hota. |

::: tip Interview mein aise bolo
A zombie process is one that has finished execution but still has an entry in the process table because its parent has not yet called wait to read its exit status. An orphan process is one whose parent has terminated first; it gets adopted by init or systemd with PID one, which later reaps it. A daemon is a background service process that runs without a controlling terminal.
:::

::: details Follow-up: Zombie process ko kaise hataate hain?
Parent ko `wait()` ya `waitpid()` call karna chahiye taaki child ka exit status padh ke uski entry hat jaaye. Agar parent hi mar jaaye to init/systemd adopt karke reap kar leta hai. Zombie memory nahi khaata, bas process table mein ek slot roke rakhta hai.
:::

## Thread

**Thread** ek process ke andar ka ek execution path hai — "lightweight process". Ek process ke kai thread ho sakte hain jo saath mein alag kaam karte hain, par same process ki memory share karte hain.

Example: ek text editor mein ek thread aapka typing le raha hai, doosra spell-check kar raha hai, teesra auto-save kar raha hai — sab ek saath.

### Thread kya share karta hai, kya apna rakhta hai

| Shared (poore process mein common) | Private (har thread ka apna) |
|---|---|
| Code (text) | Stack |
| Data (globals) | Registers |
| Heap | Program counter |
| Open files | Thread ID |

### Process vs Thread <Badge type="danger" text="Most Asked" />

| | Process | Thread |
|---|---|---|
| Definition | Chalta hua program | Process ke andar ek execution path |
| Memory | Apni alag memory | Process ki memory share karta hai |
| Weight | Heavy (banana mehnga) | Lightweight (banana sasta) |
| Switching | Context switch mehnga | Switch sasta |
| Communication | IPC chahiye (mehnga) | Shared memory se seedhe (aasan) |
| Crash | Ek process crash, doosre safe | Ek thread crash poore process ko gira sakta hai |

::: tip Interview mein aise bolo
A process is an independent program in execution with its own memory space, while a thread is a lightweight unit of execution inside a process. Threads of the same process share the code, data, heap, and open files, but each thread has its own stack, registers, and program counter. Threads are cheaper to create and switch, and they communicate easily through shared memory, but one crashing thread can bring down the whole process.
:::

### Multithreading ke fayde

- **Responsiveness:** ek thread block ho to doosra chalta rehta hai (UI freeze nahi hota).
- **Resource sharing:** threads memory share karte hain, alag se IPC ki zaroorat nahi.
- **Economy:** thread banana/switch karna process se sasta.
- **Scalability:** multi-core par sach mein parallel chal sakte hain.

### User-level vs kernel-level threads

| | User-level threads | Kernel-level threads |
|---|---|---|
| Kaun manage karta hai | Library (user space) | OS kernel |
| Speed | Tez (kernel involve nahi) | Thoda slow |
| Blocking | Ek thread block ho to poora process block (basic case) | Ek block ho to baaki chalte rahein |
| Multi-core | Seedha use nahi kar paata | Kar leta hai |

### Multithreading models

- **Many-to-one:** kai user threads ek kernel thread par. Ek block = sab block.
- **One-to-one:** har user thread ka apna kernel thread. (Windows, Linux yahi use karte hain.)
- **Many-to-many:** kai user threads kai kernel threads par map, flexible.

## Concurrency vs parallelism

- **Concurrency:** kai kaam ek saath "chal rahe dikhte hain", par ek CPU par fast switching se. (Ek chef 3 dishes ke beech switch kar raha hai.)
- **Parallelism:** kai kaam sach mein ek saath, kai CPU/cores par. (3 chef, 3 dishes, same time.)

Parallelism ke liye multi-core hardware chahiye; concurrency ek hi core par bhi ho sakti hai.

## IPC (Inter-Process Communication)

Alag processes ki memory alag hoti hai, to wo seedhe ek doosre ka data nahi padh sakte. IPC wo tareeke hain jinse processes aapas mein data bhejte/share karte hain.

### Shared memory vs message passing

| | Shared memory | Message passing |
|---|---|---|
| Idea | Dono ek common memory region padh/likh sakein | OS ke through message bhejna |
| Speed | Tez (ek baar setup ke baad) | Thoda slow (kernel involve) |
| Synchronization | Programmer ko khud sambhalni padti hai | OS handle kar leta hai |
| Best for | Bahut data, same machine | Alag machines bhi, safe exchange |

### Common IPC mechanisms

- **Pipe:** ek-taraffa data flow. **Anonymous pipe** related processes (parent-child) ke beech; **named pipe / FIFO** unrelated processes ke beech bhi.
- **Message queue:** messages ek queue mein, process padh lete hain.
- **Socket:** network ya same machine ke processes ke beech (TCP/UDP). Alag machines ke liye bhi.
- **Signal:** ek chhota notification (jaise `kill`, Ctrl+C se SIGINT).

::: tip Interview mein aise bolo
Inter-process communication lets separate processes exchange data, since each process has its own memory. The two main approaches are shared memory, where processes read and write a common region and it is fast but the programmer must handle synchronization, and message passing, where the OS delivers messages and handles synchronization but with more overhead. Common mechanisms include pipes, message queues, sockets, and signals.
:::

## Yaad rakhne layak points

- Program = disk par instructions; process = RAM mein chalta program. Memory layout: text, data, heap (upar), stack (neeche).
- PCB mein PID, state, program counter, registers, memory info, open files, scheduling info hoti hai.
- 5 states: New, Ready, Running, Waiting, Terminated. 7-state mein do suspended states add hoti hain.
- Context switch pure overhead hai; context switch != mode switch.
- Schedulers: long-term (admit jobs), short-term (CPU picks from ready queue), medium-term (swap). Dispatcher actual switch karta hai.
- `fork()` return: 0 child mein, child PID parent mein, -1 error. `n` forks -> `2^n` processes. `exec()` image replace karta hai, PID same.
- Zombie = child khatam, parent ne wait nahi kiya. Orphan = parent pehle khatam, init/systemd adopt karta hai.
- Thread share karta hai: code, data, heap, open files. Apna rakhta hai: stack, registers, program counter, thread ID.
- Process independent + mehnga; thread lightweight + memory share, par ek thread crash poore process ko gira sakta hai.
- Concurrency = switching se saath lagna; parallelism = sach mein saath (multi-core).
- IPC: shared memory (fast, khud sync) vs message passing (OS handle). Pipe, message queue, socket, signal.

## Quick Quiz

<Quiz id="os-process-thread" title="Process aur Thread Quiz" />
