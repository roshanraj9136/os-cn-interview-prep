# Baaki Important Topics

Is page mein chhote par important OS topics hain jo interview aur OA dono mein aate hain: cache aur locality, buffering/caching/spooling, polling vs interrupt vs DMA, 32-bit vs 64-bit, virtualization aur containers, aur commonly puchhe jaane wale Linux commands.

| Topic | Kitna puchha jaata hai |
|---|---|
| Locality of reference, cache | ⭐⭐ |
| VM vs Container | ⭐⭐⭐ |
| Linux commands aur permissions | ⭐⭐⭐ |
| Polling vs interrupt vs DMA | ⭐⭐ |
| Buffering vs caching vs spooling | ⭐⭐ |
| 32-bit vs 64-bit | ⭐ |

## Cache memory aur locality of reference

**Cache** ek chhoti, bahut tez memory hai jo CPU aur RAM ke beech hoti hai. Jo data baar-baar chahiye use cache mein rakhte hain taaki slow RAM baar-baar na chhoona pade.

**Cache hit**: chahiye hua data cache mein mil gaya (tez). **Cache miss**: cache mein nahi mila, RAM se laana pada (slow).

Cache kaam karta hai kyunki programs **locality of reference** dikhate hain:

- **Temporal locality** (time): jo data abhi use hua, wo thodi der mein phir use hoga. Example: loop ka counter variable.
- **Spatial locality** (space): jo data use hua, uske aas-paas ka data bhi jaldi use hoga. Example: array ke elements ek ke baad ek.

Isi liye cache ek block (data + uske padosi) ek saath laata hai.

::: tip Interview mein aise bolo
Cache is a small, fast memory between the CPU and RAM that holds frequently used data. It works because programs show locality of reference: temporal locality means recently used data is likely to be used again soon, and spatial locality means nearby data is likely to be used next. A cache hit is fast; a miss forces a slower RAM access.
:::

## Buffering vs Caching vs Spooling

Teeno data ko beech mein kahin rakhte hain, par maqsad alag hai.

| Term | Kya karta hai | Example |
|---|---|---|
| Buffering | Speed ka farak sambhalta hai (producer aur consumer alag speed) | Video streaming buffer, I/O buffer |
| Caching | Baar-baar chahiye data ki copy tez jagah par rakhta hai | CPU cache, browser cache |
| Spooling | Kaam ko queue mein daal ke device ko ek-ek karke deta hai | Print spooler |

- **Buffering**: ek jagah thoda data rok ke rakho taaki dono taraf ki speed match ho jaye.
- **Caching**: purana data copy karke tez jagah rakho taaki dobara mehnga access na karna pade.
- **Spooling**: Simultaneous Peripheral Operations On-Line. Jobs ko disk par queue karo; printer jaise slow device ko ek-ek job dete raho.

::: warning Common galti
Buffer aur cache ek nahi hain. Buffer speed mismatch ke liye hai (data wahan temporary rukta hai). Cache repeated access tez karne ke liye hai (data wahan dobara padhne ke liye rehta hai).
:::

## Polling vs Interrupt vs DMA

CPU devices (keyboard, disk) ke saath kaise baat kare?

| Method | Kaise | CPU ka load |
|---|---|---|
| Polling | CPU baar-baar device se poochta hai "ready ho?" | Zyada (busy waiting) |
| Interrupt | Device ready hone par CPU ko signal bhejta hai | Kam |
| DMA | DMA controller data seedhe memory se/tak move karta hai, CPU ko bus end par batata hai | Sabse kam |

- **Polling**: CPU ka time barbaad hota hai, bina kaam ke poochta rehta hai. Analogy: baar-baar darwaze par jaake dekhna courier aaya ya nahi.
- **Interrupt**: device khud signal deta hai; CPU tab tak doosra kaam kar sakta hai. Analogy: courier doorbell bajata hai.
- **DMA (Direct Memory Access)**: bade data transfers (jaise disk se RAM) ke liye, DMA controller khud data move karta hai; CPU sirf shuru aur ant mein involve hota hai. Isse CPU free rehta hai.

## 32-bit vs 64-bit OS

| Point | 32-bit | 64-bit |
|---|---|---|
| Addressable memory | 2^32 = 4 GB tak | Bahut zyada (practically TBs) |
| Register size | 32 bits | 64 bits |
| Performance | Kam (bade numbers ke liye) | Zyada |
| Software | Sirf 32-bit apps | 32-bit aur 64-bit dono |

Main point: ek **32-bit address 2^32 bytes = 4 GB** tak hi pahunch sakta hai. Isi liye 4 GB se zyada RAM use karne ke liye 64-bit OS chahiye.

## Virtualization

**Virtualization** ek physical machine par kai alag "computers" chalane deta hai. Beech mein ek software layer hoti hai jise **hypervisor** kehte hain.

- **Type 1 (bare-metal)**: hypervisor seedhe hardware par chalta hai (koi host OS nahi). Fast, servers ke liye. Example: VMware ESXi, Xen, Hyper-V.
- **Type 2 (hosted)**: hypervisor ek normal OS ke upar chalta hai (app ki tarah). Easy, desktop ke liye. Example: VirtualBox, VMware Workstation.

### Virtual machine vs Container (Docker) <Badge type="danger" text="Most Asked" />

| Point | Virtual Machine | Container (Docker) |
|---|---|---|
| Kya include karta hai | Pura guest OS | Sirf app + dependencies |
| OS | Har VM ka apna OS | Host OS ka kernel share karte hain |
| Size | Bada (GBs) | Chhota (MBs) |
| Boot time | Slow (minutes) | Tez (seconds) |
| Isolation | Strong (OS level) | Lighter (process level) |
| Isolation layer | Hypervisor | Container engine (Docker) |

**Soch**: VM ek alag poora ghar hai (apni deewar, bijli, paani). Container ek apartment hai jo building ka common infrastructure (kernel) share karta hai par apna kamra alag rakhta hai.

::: tip Interview mein aise bolo
A virtual machine runs a full guest operating system on top of a hypervisor, so it is heavy but strongly isolated. A container shares the host OS kernel and packages only the application and its dependencies, so it is much lighter and starts in seconds. VMs are better for running different OSes; containers are better for packaging and scaling applications.
:::

## Linux commands (interview favourites)

Freshers se aksar basic Linux commands puchhe jaate hain.

| Command | Kya karta hai |
|---|---|
| `ls -l` | Files list, detail (permissions, owner, size) ke saath |
| `cd` | Directory change karo |
| `pwd` | Abhi kaunsi directory mein ho |
| `cp` | File copy |
| `mv` | File move ya rename |
| `rm` | File delete |
| `mkdir` | Nayi directory banao |
| `cat` | File ka content screen par |
| `grep` | File mein text pattern dhoondo |
| `find` | Files dhoondo (naam, size, etc.) |
| `ps` | Chal rahe processes |
| `top` | Live process + CPU/memory usage |
| `kill` | Process ko signal bhejo. Default SIGTERM (15) = "band ho jao"; `kill -9` = SIGKILL, zabardasti band (process ise rok nahi sakta) |
| `chmod` | Permissions badlo |
| `chown` | Owner badlo |
| `df` | Disk space (file system level) |
| `du` | Directory/file ka size |
| `free` | RAM usage |
| `nice` | Process ki priority set karo: -20 (sabse zyada priority) se 19 (sabse kam), default 0 |

### File permissions (chmod)

Linux mein har file ke 3 group permissions hote hain: **owner**, **group**, **others**. Har group ke liye 3 bits: **r** (read=4), **w** (write=2), **x** (execute=1).

```text
-rwxr-xr--
| |  |  |
| |  |  +-- others: r--     = 4       = 4
| |  +----- group:  r-x     = 4+1     = 5
| +-------- owner:  rwx     = 4+2+1   = 7
+---------- type: - = file, d = directory
```

So `-rwxr-xr--` = **754**.

Common values:

- **755** = `rwxr-xr-x`: owner sab kuch, group aur others sirf read + execute. Programs/directories ke liye common.
- **644** = `rw-r--r--`: owner read+write, baaki sirf read. Normal files ke liye common.

**Kaise padhein**: har teen letters ko ek number banao (r=4, w=2, x=1, dash=0), jod do.

::: details Follow-up: 755 aur 644 mein execute kyun?
Programs aur directories ko "enter"/run karne ke liye execute bit chahiye, isliye 755. Normal data files (text, images) ko run nahi karna hota, isliye 644 mein execute nahi hota.
:::

## Yaad rakhne layak points

- Locality: temporal (jo abhi use hua wo phir), spatial (aas-paas ka data). Cache inhi par chalta hai.
- Buffer = speed mismatch; cache = repeated access tez; spooling = jobs ko queue (printer).
- Polling busy-wait karta hai (CPU barbaad); interrupt device signal deta hai; DMA bade transfers CPU ke bina karta hai.
- 32-bit address = 4 GB tak; 4 GB se zyada RAM ke liye 64-bit OS chahiye.
- Type 1 hypervisor hardware par seedhe (ESXi); Type 2 OS ke upar (VirtualBox).
- VM = pura guest OS (bhari, strong isolation); container = host kernel share, sirf app (halka, tez).
- Permissions: r=4, w=2, x=1. 755 = rwxr-xr-x, 644 = rw-r--r--, `-rwxr-xr--` = 754.
- chmod = permissions, chown = owner, ps/top = processes, df/du/free = disk aur memory.

## Quick Quiz

<Quiz id="os-misc-topics" title="Baaki Important Topics Quiz" />
