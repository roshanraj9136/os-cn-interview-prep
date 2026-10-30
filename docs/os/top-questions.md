# OS: Top 60 Interview Questions

Ye page aapke OS interview ki ek-jagah revision list hai. Yahan 60 sabse zyada puchhe jaane wale questions hain, topic ke hisaab se group kiye hue.

Kaise use karein: har question padho, pehle **khud bol ke** answer do (English mein, jaise interview mein bologe), phir box kholo aur apna answer check karo. Har answer ke saath ek chhoti Hinglish line hai (samajhne ke liye) aur us topic ki detail page ka link hai.

::: tip Pro tip
⭐ wale questions sabse zyada puchhe jaate hain. Agar time kam hai to pehle sirf ⭐ wale 15 ratt lo.
:::

## Sabse zyada puchhe jaane wale 15

Ye question numbers pehle dekho: Q1, Q3, Q9, Q10, Q13, Q16, Q19, Q25, Q27, Q33, Q36, Q40, Q46, Q48, Q53.

## Basics

::: details Q1. ⭐ What is an operating system and what does it do?
**Answer:** An operating system is system software that sits between the user and the hardware. It manages the CPU, memory, files, and I/O devices, and gives programs a simple interface to use them. It acts as a resource manager and makes the computer convenient and efficient to use.

**Hinglish mein:** OS ek manager hai jo CPU, RAM, files aur devices ko sambhaalta hai, taaki aapke programs aaram se chal sakein.

Detail: [OS Basics](/os/basics)
:::

::: details Q2. What is the difference between kernel and shell?
**Answer:** The kernel is the core of the OS that directly manages hardware, memory, and processes, and runs in kernel mode. The shell is a program that takes user commands and passes them to the kernel. The shell is the outer interface; the kernel is the inner engine.

**Hinglish mein:** Kernel OS ka dil hai (hardware chalata hai), shell sirf aapke commands lekar kernel tak pahunchata hai.

Detail: [OS Basics](/os/basics)
:::

::: details Q3. ⭐ What is the difference between user mode and kernel mode?
**Answer:** In user mode, normal programs run with limited privileges and cannot touch hardware directly. In kernel mode, the OS runs with full privileges and can access all hardware and memory. A mode bit in the CPU tracks the current mode; a system call switches from user mode to kernel mode. This split protects the system from buggy or malicious programs.

**Hinglish mein:** User mode mein program ko kam power milti hai, kernel mode mein OS ko poori power. Protection ke liye ye alag rakhe jaate hain.

Detail: [OS Basics](/os/basics)
:::

::: details Q4. What is a system call? Give examples.
**Answer:** A system call is the controlled way for a program to ask the OS kernel to do something it cannot do itself, like access a file or create a process. It switches the CPU from user mode to kernel mode through a trap. Examples are fork, exec, wait, exit, open, read, write, and close.

**Hinglish mein:** System call ek request hai jisse program kernel se kaam karwata hai, jaise file kholna ya naya process banana.

Detail: [OS Basics](/os/basics)
:::

::: details Q5. What are the different types of operating systems?
**Answer:** Common types are batch, multiprogramming, time-sharing (multitasking), multiprocessing, distributed, real-time, and mobile or embedded OS. Real-time systems are split into hard real-time, which must meet strict deadlines, and soft real-time, which prefers to but can miss some.

**Hinglish mein:** Batch, time-sharing, multiprocessing, distributed, real-time waghera — alag-alag kaam ke liye alag OS.

Detail: [OS Basics](/os/basics)
:::

::: details Q6. What is the difference between a monolithic kernel and a microkernel?
**Answer:** In a monolithic kernel, all core services like memory, file system, and drivers run together in kernel space, so it is fast but larger. In a microkernel, only the bare minimum runs in kernel space and other services run as user processes, so it is more stable but has more overhead. Linux is monolithic with loadable modules; Minix and QNX are microkernels.

**Hinglish mein:** Monolithic kernel mein sab kuch kernel ke andar (fast), microkernel mein zaroori cheez hi kernel mein (zyada safe, thoda slow).

Detail: [OS Basics](/os/basics)
:::

::: details Q7. What is an interrupt?
**Answer:** An interrupt is a signal to the CPU that an event needs attention, which makes the CPU pause its current work, save its state, and run a handler (ISR). Hardware interrupts come from devices like the keyboard or disk; software interrupts or traps come from programs, for example a system call. After the handler finishes, the CPU resumes what it was doing.

**Hinglish mein:** Interrupt ek signal hai jo CPU ka dhyan khinchta hai; CPU apna kaam rok ke us event ko handle karta hai, phir wapas aa jaata hai.

Detail: [OS Basics](/os/basics)
:::

::: details Q8. What are the steps of the booting process?
**Answer:** On power on, the firmware (BIOS or UEFI) runs POST to check hardware, then finds and loads the bootloader. The bootloader (GRUB or Windows Boot Manager) loads the OS kernel. The kernel initialises hardware and memory, mounts the root file system, and starts the first user process, init or systemd, which has PID 1.

**Hinglish mein:** Power on -> BIOS/UEFI hardware check karta hai -> bootloader kernel load karta hai -> kernel sab setup karke init/systemd start karta hai.

Detail: [OS Basics](/os/basics)
:::

## Process aur Thread

::: details Q9. ⭐ What is the difference between a program and a process?
**Answer:** A program is a passive set of instructions stored on disk. A process is a program in execution, loaded into memory with its own resources like registers, program counter, stack, and heap. One program can create many processes.

**Hinglish mein:** Program disk par pada code hai; process wahi program jab RAM mein chal raha hota hai.

Detail: [Process aur Thread](/os/process-thread)
:::

::: details Q10. ⭐ What is the difference between a process and a thread?
**Answer:** A process is an independent program in execution with its own memory space. A thread is a lightweight unit of execution inside a process; threads of the same process share code, data, heap, and open files, but each thread has its own stack, registers, and program counter. Threads are cheaper to create and switch than processes, but a crash in one thread can bring down the whole process.

**Hinglish mein:** Process ka apna alag memory hota hai; thread process ke andar chhota worker hai jo memory share karta hai, sirf apna stack alag rakhta hai.

Detail: [Process aur Thread](/os/process-thread)
:::

::: details Q11. What does a Process Control Block (PCB) store?
**Answer:** The PCB is the data structure the OS keeps for each process. It stores the process ID, process state, program counter, CPU registers, memory management info, scheduling info like priority, accounting info, and a list of open files. On a context switch, the OS saves the running process's state into its PCB and loads the next one.

**Hinglish mein:** PCB har process ka record hai — PID, state, registers, memory aur open files sab isme store hota hai.

Detail: [Process aur Thread](/os/process-thread)
:::

::: details Q12. What are the states in the 5-state process model?
**Answer:** The five states are New, Ready, Running, Waiting (or Blocked), and Terminated. A process is admitted to Ready, scheduled to Running, may go to Waiting for I/O and back to Ready, and finally ends in Terminated.

**Hinglish mein:** New -> Ready -> Running, beech mein I/O ke liye Waiting, aur last mein Terminated.

Detail: [Process aur Thread](/os/process-thread)
:::

::: details Q13. ⭐ What is a context switch and why is it overhead?
**Answer:** A context switch is when the CPU saves the state of the current process into its PCB and loads the state of another process. It is pure overhead because during the switch no useful user work is done; the CPU is only saving and restoring state. Too many context switches, for example with a very small time quantum, waste CPU time.

**Hinglish mein:** Context switch matlab ek process ki state save karke doosri load karna; is beech kuch useful kaam nahi hota, isliye ye overhead hai.

Detail: [Process aur Thread](/os/process-thread)
:::

::: details Q14. What does fork() return?
**Answer:** fork() creates a new child process by duplicating the parent. It returns 0 in the child, the child's PID (a positive number) in the parent, and -1 if it fails. This lets the same code tell whether it is running as the parent or the child. Modern systems use copy-on-write to make fork cheap.

**Hinglish mein:** fork() child banata hai; child ko 0 milta hai, parent ko child ka PID, fail hone par -1.

Detail: [Process aur Thread](/os/process-thread)
:::

::: details Q15. If a program calls fork() three times in a row, how many processes are there?
**Answer:** Each fork doubles the number of processes, so n consecutive forks give 2^n processes. Three forks give 2^3 = 8 processes in total, which means the original process plus 7 new children. A single printf after the three forks would run 8 times.

**Hinglish mein:** n baar fork -> 2^n processes. Teen fork -> 8 processes (7 naye child).

Detail: [Process aur Thread](/os/process-thread)
:::

::: details Q16. ⭐ What is the difference between a zombie and an orphan process?
**Answer:** A zombie is a child process that has finished but whose parent has not yet called wait(), so its entry stays in the process table. An orphan is a child whose parent ended first; it is adopted by init or systemd (PID 1), which later reaps it. A zombie is a dead process that is not cleaned up; an orphan is a living process that lost its parent.

**Hinglish mein:** Zombie = child khatam ho gaya par parent ne wait() nahi kiya. Orphan = parent pehle khatam ho gaya, child ko init/systemd god le leta hai.

Detail: [Process aur Thread](/os/process-thread)
:::

::: details Q17. What is a daemon process?
**Answer:** A daemon is a background process that runs without a controlling terminal, usually started at boot, and provides a service. Examples include web servers, print spoolers, and cron. In Linux their names often end in "d", like sshd or systemd.

**Hinglish mein:** Daemon ek background service process hai jo chupchaap chalta rehta hai, jaise web server ya print service.

Detail: [Process aur Thread](/os/process-thread)
:::

::: details Q18. What is the difference between concurrency and parallelism?
**Answer:** Concurrency means multiple tasks make progress by taking turns on one or a few CPUs, so they appear to run together. Parallelism means tasks actually run at the exact same time on multiple CPU cores. Concurrency is about dealing with many things at once; parallelism is about doing many things at once.

**Hinglish mein:** Concurrency = tasks baari-baari chal ke saath lagte hain; parallelism = tasks sach mein ek saath alag cores par chalte hain.

Detail: [Process aur Thread](/os/process-thread)
:::


::: details Q19. ⭐ What is the difference between user-level and kernel-level threads?
**Answer:** User-level threads are managed by a library in user space, so they are fast and portable, but if one thread makes a blocking call the whole process blocks and they cannot use multiple cores. Kernel-level threads are managed by the OS, so they can run on multiple cores and one blocking thread does not block the others, but they are heavier to create and switch. Most modern systems use a one-to-one model with kernel threads.

**Hinglish mein:** User-level threads library sambhaalti hai (fast par ek block to sab block); kernel-level threads OS sambhaalta hai (multi-core use kar sakte, thode heavy).

Detail: [Process aur Thread](/os/process-thread)
:::

::: details Q20. What is inter-process communication (IPC) and what are its main methods?
**Answer:** IPC lets separate processes exchange data and coordinate, since each process has its own memory. The two main models are shared memory, where processes read and write a common region (fast, but needs synchronization), and message passing, where processes send and receive messages (easier and safer). Common mechanisms are pipes, named pipes (FIFOs), message queues, sockets, and signals.

**Hinglish mein:** IPC se alag-alag processes data share karte hain — ya shared memory se, ya message passing se (pipes, sockets, signals).

Detail: [Process aur Thread](/os/process-thread)
:::

## CPU Scheduling

::: details Q21. What is the difference between preemptive and non-preemptive scheduling?
**Answer:** In preemptive scheduling the OS can take the CPU away from a running process, for example when a higher-priority process arrives or a time quantum ends. In non-preemptive scheduling a process keeps the CPU until it finishes or voluntarily blocks for I/O. Preemptive gives better response time; non-preemptive is simpler but a long job can hold the CPU.

**Hinglish mein:** Preemptive mein OS CPU chheen sakta hai; non-preemptive mein process khud chhode tabhi CPU milti hai doosre ko.

Detail: [CPU Scheduling](/os/cpu-scheduling)
:::

::: details Q22. How do you calculate turnaround time and waiting time?
**Answer:** Turnaround time is completion time minus arrival time: TAT = CT - AT. Waiting time is turnaround time minus burst time: WT = TAT - BT. Response time is the first time the process gets the CPU minus its arrival time. We usually want to minimise average waiting time and turnaround time.

**Hinglish mein:** TAT = CT - AT, WT = TAT - BT, RT = pehli baar CPU mila us time se AT ghata do.

Detail: [CPU Scheduling](/os/cpu-scheduling)
:::

::: details Q23. What is the convoy effect in FCFS?
**Answer:** The convoy effect happens in First Come First Serve when one long process runs first and many short processes wait behind it, pushing up the average waiting time. For example, with P1 burst 24, P2 burst 3, P3 burst 3 all arriving at time 0, FCFS gives an average waiting time of 17, while running the short jobs first gives only 3.

**Hinglish mein:** FCFS mein ek lamba process aage aa jaaye to chhote sab uske peeche ruk jaate hain — average waiting badh jaati hai.

Detail: [CPU Scheduling](/os/cpu-scheduling)
:::

::: details Q24. Which scheduling algorithm gives the minimum average waiting time?
**Answer:** Shortest Job First (SJF) gives the minimum average waiting time among non-preemptive algorithms when all jobs are available at the same time. Its preemptive version is Shortest Remaining Time First (SRTF). The catch is that both can starve long jobs and need the burst time to be known or estimated in advance, usually by exponential averaging.

**Hinglish mein:** SJF sabse kam average waiting deta hai (jab sab jobs available ho); dikkat ye ki burst time pehle se pata hona chahiye aur lambe jobs starve ho sakte hain.

Detail: [CPU Scheduling](/os/cpu-scheduling)
:::

::: details Q25. ⭐ How do you choose the time quantum in Round Robin?
**Answer:** The time quantum must be balanced. If it is too large, Round Robin behaves like FCFS because each process finishes its whole burst in one turn. If it is too small, the CPU wastes time on too many context switches. A good quantum is usually a bit larger than most CPU bursts, so most processes finish in one or two turns.

**Hinglish mein:** Quantum bada ho to RR FCFS jaisa ban jaata hai; bahut chhota ho to context switches mein time barbaad hota hai. Beech ka rakho.

Detail: [CPU Scheduling](/os/cpu-scheduling)
:::

::: details Q26. What is starvation and how is it solved?
**Answer:** Starvation is when a process waits indefinitely because other processes keep getting the CPU, which commonly happens in priority scheduling when low-priority jobs never run. The fix is aging: slowly increase the priority of a process the longer it waits, so it eventually runs. This guarantees every process gets the CPU in time.

**Hinglish mein:** Starvation = ek process hamesha wait karta reh jaata hai. Fix hai aging: jitna zyada wait, utni priority badha do.

Detail: [CPU Scheduling](/os/cpu-scheduling)
:::

::: details Q27. ⭐ What is the difference between a long-term, short-term, and medium-term scheduler?
**Answer:** The long-term scheduler decides which jobs are admitted into memory and controls the degree of multiprogramming. The short-term scheduler, the CPU scheduler, picks which ready process runs next and runs very often. The medium-term scheduler swaps processes out of and back into memory to manage the load. The dispatcher does the actual context switch chosen by the short-term scheduler.

**Hinglish mein:** Long-term job ko memory mein admit karta hai, short-term ready queue se CPU ke liye process chunta hai, medium-term processes ko swap in/out karta hai.

Detail: [CPU Scheduling](/os/cpu-scheduling)
:::

::: details Q28. What is a multilevel feedback queue?
**Answer:** A multilevel feedback queue uses several ready queues with different priorities and lets processes move between them based on their behaviour. A process that uses too much CPU is pushed to a lower-priority queue, while a process that waits long can be moved up. This favours short and I/O-bound jobs without needing to know burst times in advance, and prevents starvation through aging.

**Hinglish mein:** Kai priority queues hoti hain aur process apne behaviour ke hisaab se upar-neeche move karta hai; isme burst time pehle se jaanne ki zaroorat nahi.

Detail: [CPU Scheduling](/os/cpu-scheduling)
:::


## Synchronization

::: details Q29. What is a race condition?
**Answer:** A race condition happens when two or more threads access shared data at the same time and the final result depends on the order in which they run. A classic example is two threads doing counter++ at once; because that is really load, add, and store, one update can be lost. We fix it by protecting the shared data in a critical section.

**Hinglish mein:** Race condition tab hoti hai jab do threads ek saath shared data badalte hain aur result unke order par depend kar jaata hai, jisse ek update kho sakti hai.

Detail: [Process Synchronization](/os/synchronization)
:::

::: details Q30. What is a critical section and what three requirements must a solution meet?
**Answer:** A critical section is the part of code where a process accesses shared resources, and only one process should be inside it at a time. A correct solution must satisfy three requirements: mutual exclusion (only one inside at a time), progress (if no one is inside, a waiting process can enter without needless delay), and bounded waiting (no process waits forever).

**Hinglish mein:** Critical section wo code hai jahan shared data use hota hai; solution mein chahiye mutual exclusion, progress aur bounded waiting.

Detail: [Process Synchronization](/os/synchronization)
:::

::: details Q31. What is a mutex?
**Answer:** A mutex is a lock used for mutual exclusion: a thread locks it before entering a critical section and unlocks it after leaving. A key property is ownership: only the thread that locked the mutex should unlock it. It makes sure only one thread is in the critical section at a time.

**Hinglish mein:** Mutex ek lock hai; jo thread lock kare wahi unlock kare (ownership), taaki ek time par ek hi thread critical section mein ho.

Detail: [Process Synchronization](/os/synchronization)
:::

::: details Q32. What is a semaphore and what are its two types?
**Answer:** A semaphore is an integer counter with two atomic operations, wait() (P, which decrements) and signal() (V, which increments). A counting semaphore can take any non-negative value and is used to manage a set of identical resources. A binary semaphore only takes 0 or 1 and works like a lock, but unlike a mutex it has no ownership.

**Hinglish mein:** Semaphore ek counter hai jisme wait() ghatata hai aur signal() badhata hai; counting semaphore kai resources count karta hai, binary semaphore 0/1 lock jaisa hai.

Detail: [Process Synchronization](/os/synchronization)
:::

::: details Q33. ⭐ What is the difference between a mutex and a semaphore?
**Answer:** A mutex is a locking mechanism with ownership, meant for mutual exclusion, so only the thread that locked it can unlock it. A semaphore is a signalling mechanism, an integer counter with wait and signal, and has no ownership, so any thread can signal it. Use a mutex to protect a critical section and a counting semaphore to count or signal across threads.

**Hinglish mein:** Mutex ownership wala lock hai (critical section ke liye); semaphore bina ownership ka counter hai (signalling aur counting ke liye).

Detail: [Process Synchronization](/os/synchronization)
:::

::: details Q34. What is a spinlock and when is it useful?
**Answer:** A spinlock is a lock where a thread keeps checking in a loop (busy waiting) until the lock is free, instead of sleeping. This wastes CPU while waiting, but it avoids the cost of putting the thread to sleep and waking it up. It is useful on multiprocessor systems when the lock is held for a very short time.

**Hinglish mein:** Spinlock mein thread loop mein check karta rehta hai jab tak lock na mile; short wait ke liye theek hai, lambe ke liye CPU barbaad.

Detail: [Process Synchronization](/os/synchronization)
:::

::: details Q35. In the producer-consumer problem, why does the order of wait() calls matter?
**Answer:** The bounded-buffer solution uses three semaphores: empty = N, full = 0, and mutex = 1. The producer must do wait(empty) before wait(mutex), and the consumer wait(full) before wait(mutex). If a process does wait(mutex) first and then blocks on wait(empty) or wait(full), it holds the lock while waiting, so no one can make progress and the system deadlocks.

**Hinglish mein:** Producer-consumer mein pehle empty/full ka wait, phir mutex ka. Ulta kiya to mutex pakde-pakde block ho jaoge aur deadlock ho jaayega.

Detail: [Process Synchronization](/os/synchronization)
:::

::: details Q36. ⭐ How does the dining philosophers problem deadlock, and how is it fixed?
**Answer:** Five philosophers share five chopsticks and each needs two to eat. If every philosopher picks up their left chopstick at the same time, everyone holds one and waits forever for the right one, which is a deadlock. Common fixes are to allow at most four philosophers at the table, to make each pick up both chopsticks only together inside a critical section, or to make odd philosophers pick left first and even ones pick right first.

**Hinglish mein:** Agar sab philosophers ek saath left chopstick utha lein to sab right ke liye ruk jaate hain — deadlock. Fix: max 4 baithao, ya dono saath uthao, ya odd/even alag order se uthao.

Detail: [Process Synchronization](/os/synchronization)
:::

::: details Q37. What is the readers-writers problem?
**Answer:** In the readers-writers problem, many readers can read shared data at the same time, but a writer needs exclusive access. The challenge is to coordinate so readers do not block each other while writers still get mutual exclusion. In the first readers-writers solution readers get priority, which can starve writers.

**Hinglish mein:** Readers ek saath padh sakte hain, par writer ko akela access chahiye; pehle solution mein readers ko priority milti hai jisse writer starve ho sakta hai.

Detail: [Process Synchronization](/os/synchronization)
:::

## Deadlock

::: details Q38. What is a deadlock?
**Answer:** A deadlock is a situation where a set of processes are each waiting for a resource that another process in the set is holding, so none of them can ever proceed. A simple analogy is a four-way crossing with no signal where every car waits for the next to move. It needs four conditions to hold at the same time.

**Hinglish mein:** Deadlock tab hota hai jab processes ek doosre ke paas wali resource ke liye ruk jaate hain aur koi aage nahi badhta.

Detail: [Deadlock](/os/deadlock)
:::

::: details Q39. What are the four necessary conditions for deadlock?
**Answer:** The four Coffman conditions are mutual exclusion (a resource is held in a non-sharable mode), hold and wait (a process holds some resources while waiting for others), no preemption (resources cannot be forcibly taken away), and circular wait (a cycle of processes each waiting for the next). All four must hold at the same time; breaking any one prevents deadlock.

**Hinglish mein:** Chaar conditions saath mein chahiye: mutual exclusion, hold and wait, no preemption, aur circular wait. Koi ek tod do to deadlock nahi hoga.

Detail: [Deadlock](/os/deadlock)
:::

::: details Q40. ⭐ What is the difference between deadlock prevention and deadlock avoidance?
**Answer:** Deadlock prevention stops deadlock by designing the system so that at least one of the four conditions can never hold, for example by forcing all resources to be requested at once. Deadlock avoidance allows the conditions but checks each request and only grants it if the system stays in a safe state, using the Banker's algorithm. Prevention is strict and can waste resources; avoidance is more flexible but needs to know each process's maximum needs in advance.

**Hinglish mein:** Prevention mein chaar conditions mein se ek hone hi nahi dete; avoidance mein request tabhi dete hain jab system safe state mein rahe (Banker's algorithm).

Detail: [Deadlock](/os/deadlock)
:::

::: details Q41. In a resource allocation graph, when does a cycle mean deadlock?
**Answer:** If every resource type has only a single instance, then a cycle in the resource allocation graph definitely means a deadlock. If some resource types have multiple instances, a cycle means deadlock is possible but not certain; you then need a detection algorithm to be sure.

**Hinglish mein:** Single-instance resources ke saath cycle = pakka deadlock. Multiple instances ke saath cycle = ho bhi sakta hai, pakka nahi.

Detail: [Deadlock](/os/deadlock)
:::

::: details Q42. What is the Banker's algorithm?
**Answer:** The Banker's algorithm is a deadlock avoidance method. Before granting a resource request, it pretends to grant it and runs a safety check to see if there is at least one sequence in which all processes can finish; if yes, the state is safe and the request is granted, otherwise the process waits. It needs each process to declare its maximum need in advance, just like a bank checks you can repay before giving a loan.

**Hinglish mein:** Banker's algorithm request tabhi deta hai jab ek safe sequence bana rahe jisme sab processes complete ho sakein; har process ka maximum need pehle pata hona chahiye.

Detail: [Deadlock](/os/deadlock)
:::

::: details Q43. What is a safe state?
**Answer:** A system is in a safe state if there exists at least one ordering of the processes, a safe sequence, in which each process can get all the resources it needs, finish, and release them, so that every process completes. A safe state can never lead to deadlock. An unsafe state may or may not deadlock, but the Banker's algorithm refuses to enter it.

**Hinglish mein:** Safe state matlab ek aisa order mojood hai jisme sab processes resources le ke complete ho sakte hain. Safe state kabhi deadlock nahi banta.

Detail: [Deadlock](/os/deadlock)
:::

::: details Q44. How is deadlock handled by recovery, and what is the ostrich approach?
**Answer:** Once deadlock is detected, recovery is done either by terminating processes (one at a time or all deadlocked ones) or by preempting resources and rolling a process back to a safe checkpoint. The ostrich approach means simply ignoring deadlock and pretending it will not happen, which general-purpose OSes like Linux and Windows mostly do because deadlocks are rare and detection is costly; they leave it to programmers to write correct code.

**Hinglish mein:** Recovery mein ya to process maar dete hain ya resource chheen ke rollback karte hain. Ostrich approach matlab deadlock ko ignore kar do — aam OS yahi karte hain.

Detail: [Deadlock](/os/deadlock)
:::


## Memory Management

::: details Q45. What is the difference between a logical and a physical address?
**Answer:** A logical (or virtual) address is generated by the CPU when a program runs, and a physical address is the real location in RAM. The Memory Management Unit (MMU) translates logical addresses to physical ones at run time. This lets each program think it has its own continuous memory while actually being placed anywhere in RAM.

**Hinglish mein:** Logical address CPU banata hai, physical address RAM mein asli jagah hai; MMU dono ke beech translation karta hai.

Detail: [Memory Management](/os/memory-management)
:::

::: details Q46. ⭐ What is the difference between internal and external fragmentation?
**Answer:** Internal fragmentation is wasted space inside an allocated block, when a process is given a fixed-size block larger than it needs, like the leftover in the last page of paging. External fragmentation is free memory split into many small scattered holes that together are enough but individually too small for a request. Paging removes external fragmentation but can have internal fragmentation; segmentation can have external fragmentation.

**Hinglish mein:** Internal = allocate ki hui block ke andar bachi hui jagah. External = khaali memory chhote-chhote tukdon mein bikhri hai jo kaam nahi aati. Paging mein internal, segmentation mein external hoti hai.

Detail: [Memory Management](/os/memory-management)
:::

::: details Q47. What is the difference between first fit, best fit, and worst fit?
**Answer:** These are strategies for placing a process in a free hole. First fit picks the first hole big enough, which is fast. Best fit picks the smallest hole that fits, which saves big holes but leaves tiny unusable leftovers. Worst fit picks the largest hole, trying to keep the leftover usable. In practice first fit is fast and best fit often packs memory best.

**Hinglish mein:** First fit pehla fit hone wala hole leta hai, best fit sabse chhota jo fit ho, worst fit sabse bada. First fit fast hai, best fit aksar sabse achha pack karta hai.

Detail: [Memory Management](/os/memory-management)
:::

::: details Q48. ⭐ What is paging and how does address translation work?
**Answer:** Paging divides logical memory into fixed-size pages and physical memory into equal-size frames, and a page table maps each page to a frame. A logical address splits into a page number and an offset; the page number indexes the page table to get the frame number, and the frame number plus offset gives the physical address. For example, with 4 KB pages, logical address 13000 is page 3, offset 712; if page 3 is in frame 5, the physical address is 5 times 4096 plus 712, which is 21192.

**Hinglish mein:** Paging memory ko fixed pages/frames mein baantta hai; page table se page number se frame milta hai, phir frame aur offset jod ke physical address banta hai.

Detail: [Memory Management](/os/memory-management)
:::

::: details Q49. What is a TLB?
**Answer:** The Translation Lookaside Buffer is a small, fast cache inside the MMU that stores recently used page-table entries. On a TLB hit the frame number is found quickly without going to the page table in memory; on a miss the OS looks up the page table and loads the entry. It speeds up address translation a lot because of locality of reference.

**Hinglish mein:** TLB ek chhota fast cache hai jo recent page-table entries rakhta hai, taaki address translation tez ho.

Detail: [Memory Management](/os/memory-management)
:::

::: details Q50. Why do we need multi-level paging?
**Answer:** A single flat page table can be huge. For a 32-bit address with 4 KB pages there are 2^20, about one million, entries, and with 4-byte entries that is a 4 MB page table per process. Multi-level paging splits the page table into smaller pieces and only keeps the parts that are actually used in memory, saving space.

**Hinglish mein:** Ek single page table bahut badi (4 MB per process) ho jaati hai; multi-level paging use tukdon mein baant ke sirf zaroori hisse memory mein rakhta hai.

Detail: [Memory Management](/os/memory-management)
:::

::: details Q51. What is the difference between paging and segmentation?
**Answer:** Paging divides memory into fixed-size pages, is invisible to the programmer, and causes internal fragmentation but no external fragmentation. Segmentation divides memory into variable-size logical units like code, data, and stack, matches the program's structure, and causes external fragmentation. Some systems combine them as segmentation with paging.

**Hinglish mein:** Paging fixed-size pages banata hai (internal fragmentation), segmentation variable-size logical segments banata hai (external fragmentation).

Detail: [Memory Management](/os/memory-management)
:::

::: details Q52. What is swapping?
**Answer:** Swapping is moving a whole process out of main memory to a backing store on disk and later bringing it back, to free RAM for other processes. It increases the degree of multiprogramming but is slow because of disk I/O. The medium-term scheduler handles swapping.

**Hinglish mein:** Swapping matlab poore process ko RAM se disk par bhejna aur baad mein wapas laana, taaki RAM khaali ho; slow hoti hai kyunki disk I/O lagti hai.

Detail: [Memory Management](/os/memory-management)
:::

## Virtual Memory

::: details Q53. ⭐ What is virtual memory and why is it useful?
**Answer:** Virtual memory is a technique that lets a process use more address space than the physical RAM by keeping only the needed parts in memory and the rest on disk. It uses demand paging to load pages only when they are accessed. This lets large programs run on small RAM, allows more processes at once, and isolates each process's memory.

**Hinglish mein:** Virtual memory se program RAM se zyada memory use kar sakta hai; zaroori pages hi RAM mein aate hain, baaki disk par rehte hain.

Detail: [Virtual Memory](/os/virtual-memory)
:::

::: details Q54. What is demand paging and a page fault?
**Answer:** Demand paging loads a page into memory only when it is first accessed, not in advance. A page fault occurs when a program accesses a page that is not in memory; the valid-invalid bit shows this. The OS then finds the page on disk, loads it into a free frame, updates the page table, and restarts the instruction.

**Hinglish mein:** Demand paging page ko tabhi load karta hai jab use kiya jaaye; agar page RAM mein na ho to page fault aata hai aur OS use disk se laata hai.

Detail: [Virtual Memory](/os/virtual-memory)
:::

::: details Q55. What is Belady's anomaly?
**Answer:** Belady's anomaly is the surprising case where increasing the number of frames causes more page faults instead of fewer. It happens with FIFO page replacement; for example, the string 1 2 3 4 1 2 5 1 2 3 4 5 gives 9 faults with 3 frames but 10 faults with 4 frames. Stack algorithms like LRU and Optimal never show this anomaly.

**Hinglish mein:** Belady's anomaly: frames badhane par bhi page faults badh jaayein, jo FIFO mein hota hai; LRU aur Optimal mein nahi hota.

Detail: [Virtual Memory](/os/virtual-memory)
:::

::: details Q56. How does the LRU page replacement algorithm work?
**Answer:** Least Recently Used replaces the page that has not been used for the longest time, assuming pages used recently will be used again soon. It performs close to optimal but is costly to implement exactly, needing either a counter per entry or a stack of pages. In practice it is approximated with a reference bit and the second-chance or clock algorithm.

**Hinglish mein:** LRU us page ko hatata hai jo sabse der se use nahi hua. Exact implement karna mehenga hai, isliye reference bit aur clock algorithm se approximate karte hain.

Detail: [Virtual Memory](/os/virtual-memory)
:::

::: details Q57. What is thrashing and how is it fixed?
**Answer:** Thrashing is when a system spends more time swapping pages in and out than doing useful work, so CPU utilisation drops sharply. It happens when too many processes have too few frames each and keep page-faulting. Fixes include the working-set model, page-fault-frequency control, reducing the degree of multiprogramming, and adding more RAM.

**Hinglish mein:** Thrashing matlab system kaam se zyada page swapping mein time lagaye aur CPU use gir jaaye; fix: multiprogramming kam karo, working-set use karo, ya RAM badhao.

Detail: [Virtual Memory](/os/virtual-memory)
:::

::: details Q58. What is copy-on-write?
**Answer:** Copy-on-write lets the parent and child after fork() share the same physical pages, marked read-only, instead of copying all memory immediately. A real copy of a page is made only when one of them tries to write to it. This makes fork() fast and saves memory when the child does little before calling exec().

**Hinglish mein:** Copy-on-write mein fork ke baad parent aur child same pages share karte hain; copy tabhi banti hai jab koi write kare, isse fork fast ho jaata hai.

Detail: [Virtual Memory](/os/virtual-memory)
:::

## File System aur Disk

::: details Q59. What is an inode and what does it store?
**Answer:** An inode is a data structure that stores a file's metadata: its type, permissions, owner, size, timestamps, link count, and pointers to the file's data blocks. It does not store the file name; the name lives in the directory entry, which maps the name to an inode number. This is why one file can have several names.

**Hinglish mein:** Inode file ki metadata rakhta hai (permissions, size, owner, data blocks ke pointers), par file ka naam nahi — naam directory entry mein hota hai.

Detail: [File System aur Disk](/os/file-system-disk)
:::

::: details Q60. What is the difference between a hard link and a soft link?
**Answer:** A hard link is another directory entry pointing to the same inode, so it shares the file's data and the file exists as long as any hard link remains; it cannot cross file systems and normally cannot point to a directory. A soft (symbolic) link is a small separate file that just stores a path to the target, so it can cross file systems but breaks if the target is deleted.

**Hinglish mein:** Hard link same inode ko point karta hai (file tab tak zinda jab tak ek link ho); soft link ek chhoti file hai jo path rakhti hai aur target delete hone par toot jaati hai.

Detail: [File System aur Disk](/os/file-system-disk)
:::

::: tip Aage kya karein
Ye 60 questions cover ho gaye? Ab [OS Mock Quiz](/os/quiz) do aur dekho kitne sahi aate hain. Kamzor topic lage to uski detail page dobara padho.
:::
