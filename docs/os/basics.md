# OS Basics

Is page mein OS ki neenv (foundation) hai: OS kya hai, kaam kya karta hai, kitne types hote hain, kernel/shell, user vs kernel mode, system calls, interrupts, aur booting. Ye sab interview ke chote-chote questions aur OA MCQs mein seedhe aate hain.

Pehle ye basics clear kar lo, baaki saare OS topics isi par tike hain.

| Topic | Kitna puchha jaata hai |
|---|---|
| System calls aur user/kernel mode | ⭐⭐⭐ |
| Kernel types (monolithic vs microkernel) | ⭐⭐ |
| Types of OS (multiprogramming vs multitasking) | ⭐⭐ |
| Interrupts | ⭐⭐ |
| Booting process | ⭐ |

## OS kya hai aur kyun chahiye

Operating System ek software hai jo computer ke hardware (CPU, RAM, disk, devices) aur aapke programs ke beech mein baithta hai. Aapka program hardware se seedha baat nahi karta; wo OS se request karta hai, OS hardware se kaam karwata hai.

OS ke do bade goals hain:

- **Convenience** — aapke liye computer aasan banana. Aapko disk ke sector nahi, bas "file open karo" bolna hai.
- **Efficiency** — hardware ka sahi se istemaal, taaki CPU aur memory bekaar na pade.

### OS ke main functions

| Function | Kya karta hai |
|---|---|
| Process management | Process banana, schedule karna, khatam karna |
| Memory management | Kis process ko kitni RAM, kahan milegi |
| File management | Files/folders banana, padhna, likhna, permissions |
| Device / I-O management | Keyboard, disk, printer ko manage karna (drivers) |
| Security aur protection | Ek process doosre ke data ko na chhu paaye |
| User interface | Shell (command line) ya GUI dena |

::: tip Interview mein aise bolo
An operating system acts as an intermediary between the user's programs and the computer hardware. Its main jobs are process management, memory management, file management, and device management, along with security and providing a user interface. The two overall goals are convenience for the user and efficient use of hardware.
:::

## Types of OS

| Type | Idea | Example |
|---|---|---|
| Batch | Similar jobs ko batch bana ke bina user ke chalana | Purane mainframe |
| Multiprogramming | Ek CPU, RAM mein kai programs; CPU idle na rahe | Purane mainframe systems (jaise IBM OS/360) |
| Multitasking / time-sharing | CPU ko time slices mein baant ke, lagta hai sab saath chal rahe | Linux, Windows |
| Multiprocessing | Ek se zyada CPU/cores, sach mein parallel kaam | Aaj ke multi-core PCs |
| Distributed | Kai alag computers milke ek system jaise kaam karein | Clusters, cloud |
| Real-time (RTOS) | Kaam fixed deadline ke andar hona hi chahiye | Car airbag, pacemaker |
| Mobile / embedded | Chhoti device ke liye halka OS | Android, iOS, washing machine |

Real-time ke do flavours: **hard real-time** (deadline miss karna matlab fail, jaise airbag), **soft real-time** (deadline miss ho jaaye to bhi chalega, jaise video streaming thoda ruk gaya).

### Multiprogramming vs multitasking vs multiprocessing vs multithreading

| Term | Kitne programs | Kitne CPU | Core idea |
|---|---|---|---|
| Multiprogramming | Kai | 1 | CPU idle na rahe; ek block ho to doosra chale |
| Multitasking | Kai | 1 | Time slice se switch, sab chalte dikhte hain |
| Multiprocessing | Kai | 2+ | Sach mein ek saath alag CPUs par |
| Multithreading | Ek process ke kai thread | 1 ya zyada | Ek program ke andar parallel kaam |

::: warning Common galti
"Multitasking" aur "multiprocessing" ko same mat samjho. Multitasking ek hi CPU par fast switching hai (parallel jaisa lagta hai). Multiprocessing mein sach mein kai CPU/cores saath chalte hain.
:::

## Kernel aur shell

**Kernel** OS ka core part hai, yaani dil. Ye CPU, memory aur devices ko directly control karta hai aur hamesha RAM mein rehta hai. **Shell** wo layer hai jisse aap OS se baat karte ho (command line jaise bash, ya GUI).

- **User space:** jahan normal programs chalte hain, limited power ke saath.
- **Kernel space:** jahan kernel chalta hai, poori hardware power ke saath.

### Kernel types

| Type | Idea | Pros | Cons | Example |
|---|---|---|---|---|
| Monolithic | Poora OS (drivers, file system) ek bade kernel mein | Fast, kam overhead | Ek bug poore kernel ko gira sakta hai | Linux (loadable modules bhi support karta hai) |
| Microkernel | Kernel mein sirf zaroori cheezein; baaki user space mein | Stable, secure, modular | Message passing se thoda slow | Minix, QNX |
| Hybrid | Dono ka mix | Balance speed aur modularity | Thoda complex | Windows NT, macOS XNU |

::: tip Interview mein aise bolo
The kernel is the core of the operating system that runs in privileged mode and directly manages the CPU, memory, and devices. A monolithic kernel keeps most services, like drivers and the file system, inside the kernel for speed. A microkernel keeps the kernel minimal and runs most services in user space, which is more stable but has messaging overhead. Linux is monolithic, Windows NT and macOS use hybrid kernels.
:::

## User mode vs kernel mode

CPU do modes mein chal sakta hai. Ye ek **mode bit** se decide hota hai (0 = kernel mode, 1 = user mode).

| | User mode | Kernel mode |
|---|---|---|
| Mode bit | 1 | 0 |
| Power | Limited; hardware ko seedha nahi chhoo sakta | Full; sab kuch kar sakta hai |
| Kaun chalta hai | Normal programs | Kernel code |
| Galti hui to | Sirf wo program crash | Poora system crash ho sakta hai |

Ye split **protection** ke liye hai. Agar har program ko full power mili to ek bura/buggy program poore system ko gira sakta hai ya doosron ka data corrupt kar sakta hai. Isliye normal code user mode mein chalta hai; jab hardware-level kaam chahiye, program OS se request karta hai aur control kernel mode mein jaata hai.

## System calls

Aapka program hardware ko seedha nahi chhoo sakta (wo user mode mein hai). Jab usse file padhni ho, memory chahiye, ya process banana ho, to wo OS se request karta hai. Is request ko **system call** kehte hain. Ye user mode se kernel mode mein jaane ka controlled darwaaza hai, jo ek **trap** (software interrupt) ke through hota hai.

```text
Aapka program  (user mode)
     |  printf("hi")
     v
  C library  --> write() system call
     |  trap (software interrupt)
     v
   Kernel  (kernel mode)  --> screen par "hi"
```

### System call categories

| Category | Kaam | Examples |
|---|---|---|
| Process control | Process banana/khatam | `fork`, `exec`, `wait`, `exit` |
| File management | File kholna/padhna | `open`, `read`, `write`, `close` |
| Device management | Device control | `ioctl` |
| Information | Info lena/dena | `getpid` |
| Communication | Process aapas mein baat karein | `pipe`, `socket` |

::: tip Interview mein aise bolo
A system call is the controlled way for a user program to request a service from the kernel, such as creating a process or reading a file. It switches the CPU from user mode to kernel mode through a trap, the kernel does the privileged work, and then control returns to the program. Examples are fork, exec, open, read, write, and close.
:::

::: details Follow-up: Library function aur system call mein kya difference hai?
`printf()` ek library function hai jo aapke code mein chalta hai; andar se wo `write()` system call ko call karta hai jo actually kernel mein jaata hai. Matlab har library call system call nahi hota, par kai library functions system call par depend karte hain.
:::

## Interrupts

**Interrupt** ek signal hai jo CPU ko bolta hai "ruk jao, ek zaroori kaam aa gaya". CPU apna current kaam ka state save karta hai, interrupt ka code (ISR = Interrupt Service Routine) chalata hai, phir wapas apne kaam par aa jaata hai.

| Type | Kahan se aata hai | Example |
|---|---|---|
| Hardware interrupt | Device se (asynchronous) | Keyboard press, disk ready, timer |
| Software interrupt / trap | Program se, jaan-boojh ke | System call |
| Exception | Galti se, run time par | Divide by zero, invalid memory access |

Interrupt aane par kya hota hai:

1. CPU current instruction poora karke apna state (registers, program counter) save karta hai.
2. **Interrupt vector table** se dekhta hai ki is interrupt ke liye kaunsa ISR chalana hai.
3. ISR chalata hai (device ka kaam handle karta hai).
4. Save kiya hua state wapas load karke apna pehla kaam continue karta hai.

**Polling vs interrupt:** Polling mein CPU baar-baar device se poochta rehta hai "ready ho? ready ho?" — isme CPU ka time waste hota hai. Interrupt mein CPU apna kaam karta rehta hai aur device khud signal deta hai jab ready ho — ye efficient hai. (Zyada detail misc-topics page par.)

## Booting process

Jab aap power button dabate ho to computer kaise chaalu hota hai, step by step:

1. **Power on** — current aati hai.
2. **Firmware (BIOS ya UEFI)** chalta hai aur **POST** (Power-On Self-Test) karta hai — hardware check.
3. Firmware **bootloader** dhoondta hai (BIOS systems par MBR se, UEFI/GPT systems par EFI system partition se).
4. **Bootloader** (GRUB ya Windows Boot Manager) kernel ko RAM mein load karta hai.
5. **Kernel** hardware aur memory initialise karta hai, root file system mount karta hai.
6. Kernel pehla user process start karta hai: **init / systemd (PID 1)**, jisse baaki sab start hote hain.

::: tip Interview mein aise bolo
Booting is the process of starting the computer. Firmware like BIOS or UEFI runs first and performs a power-on self-test, then locates and runs the bootloader. The bootloader loads the kernel into memory, the kernel initialises the hardware and mounts the root file system, and finally it starts the first user process, init or systemd with PID 1.
:::

## Yaad rakhne layak points

- OS do goals ke liye: convenience aur efficiency; wo hardware aur programs ke beech ka manager hai.
- Functions: process, memory, file, device management + security + user interface.
- Multiprogramming = CPU busy rakhna; multitasking = time-slice switching; multiprocessing = kai CPU; multithreading = ek process ke kai thread.
- Kernel = OS ka core (privileged); monolithic (Linux), microkernel (Minix, QNX), hybrid (Windows NT, macOS XNU).
- Mode bit: 0 = kernel mode (full power), 1 = user mode (limited). Split protection ke liye hai.
- System call = user se kernel mein jaane ka controlled trap: fork, exec, open, read, write, close.
- Interrupt: hardware (device), software/trap (system call), exception (divide by zero). ISR ko interrupt vector table se dhoondha jaata hai.
- Interrupt > polling, kyunki polling mein CPU time waste hota hai.
- Booting: firmware/POST -> bootloader -> kernel -> init/systemd (PID 1).

## Quick Quiz

<Quiz id="os-basics" title="OS Basics Quiz" />
