# File System aur Disk

Is page mein aap seekhenge ki OS files ko kaise store karta hai (allocation methods, inode, links), disk kaise kaam karta hai, aur disk scheduling algorithms (FCFS, SSTF, SCAN, C-SCAN, LOOK, C-LOOK) ka numerical kaise solve karte hain. Disk scheduling OA mein bahut aata hai.

| Topic | Kitna puchha jaata hai |
|---|---|
| Disk scheduling (SSTF/SCAN/C-SCAN) | ⭐⭐⭐ |
| Hard link vs soft link | ⭐⭐⭐ |
| File allocation methods | ⭐⭐ |
| inode | ⭐⭐ |
| RAID levels | ⭐⭐ |
| HDD vs SSD | ⭐⭐ |

## File aur directory

**File** = disk par named data ka collection. OS files ko ek naam deta hai taaki hum unhe aasani se access kar sakein.

**File attributes**: naam, type, size, owner, permissions, timestamps (banayi/modify/access ka time), location (disk par kahan hai).

**File operations**: create, open, read, write, close, delete, rename, seek (file ke beech jump karna).

**Directory structures** (short):

- **Single-level**: sab files ek hi directory mein. Simple, par naam clash.
- **Two-level**: har user ki apni directory.
- **Tree**: folders ke andar folders (jaisa aaj hum use karte hain).
- **Acyclic graph**: ek file/folder ko kai jagah se share kiya ja sakta hai (links se), par cycle nahi.

## File allocation methods

Disk par file ke blocks kaise rakhein? Teen tareeke:

| Method | Idea | Pros | Cons |
|---|---|---|---|
| Contiguous | File ke saare blocks continuous | Fast sequential + random access | External fragmentation; file badhana mushkil |
| Linked (FAT) | Har block agle block ka pointer rakhta hai | No external fragmentation; file badh sakti hai | Random access slow; pointer kharaab = data gaya |
| Indexed (inode) | Ek index block mein saare block pointers | Random access fast; no external fragmentation | Index block ka overhead |

- **Contiguous**: file ek hi jagah continuous blocks mein. Problem: file badhi to aage jagah na ho.
- **Linked**: har block mein next block ka address. **FAT (File Allocation Table)** isi ka roop hai, jahan saare pointers ek alag table mein rakhte hain. USB drives aksar FAT use karte hain.
- **Indexed**: har file ka ek **index block** hota hai jisme uske saare data blocks ke pointers hote hain. Linux ka **inode** isi par based hai.

## inode <Badge type="danger" text="Most Asked" />

**inode** (index node) ek structure hai jo ek file ki **metadata** store karta hai:

- File type (regular, directory, etc.)
- Permissions (rwx)
- Owner (user id, group id)
- Size
- Timestamps
- Link count (kitne naam is inode ko point karte hain)
- Data blocks ke pointers

**Important**: inode file ka **naam nahi** store karta. Naam **directory entry** mein hota hai, jo naam ko inode number se jodta hai.

```text
Directory entry:  "notes.txt"  ->  inode 1234
inode 1234:       type, perms, owner, size, times, ->  data blocks
```

::: tip Interview mein aise bolo
An inode stores a file's metadata: type, permissions, owner, size, timestamps, link count, and pointers to its data blocks. It does not store the file name; the name lives in the directory entry, which maps a name to an inode number. This separation is what lets multiple names (hard links) point to the same file.
:::

### Hard link vs Soft (symbolic) link <Badge type="danger" text="Most Asked" />

| Point | Hard link | Soft (symbolic) link |
|---|---|---|
| Kya hai | Same inode ka doosra naam | Ek chhoti file jisme target ka path hota hai |
| inode | Same inode share karta hai | Apna alag inode |
| Target delete hone par | Data rehta hai (link count > 0) | Link toot jaata hai (dangling) |
| File systems ke beech | Nahi ja sakta | Ja sakta hai |
| Directory par | Normally allowed nahi | Allowed |

**Soch**: hard link ek hi ghar ki doosri chaabi hai (ghar wahi hai). Soft link ek parchi hai jispar ghar ka address likha hai; ghar gir jaye to parchi bekaar.

::: details Follow-up: Target delete karne par hard link ka data kab jaata hai?
Jab inode ka link count 0 ho jaata hai, matlab koi hard link nahi bacha, tab OS data blocks free karta hai. Isi liye target delete karne par bhi hard link se data accessible rehta hai.
:::

## Free-space management (short)

OS ko pata hona chahiye ki kaunse disk blocks khaali hain:

- **Bitmap**: har block ke liye 1 bit (0 = free, 1 = used). Simple, free block dhoondna aasan.
- **Linked list**: saare free blocks ek chain mein jude hote hain. Space kam leta hai par traverse slow.

## Disk structure

Ek hard disk (HDD) ke parts:

```text
   platter (ghoomti thali)
     |-- track  (ek circle)
     |     |-- sector (track ka chhota arc, smallest unit)
   cylinder = sabhi platters ke same-number track ek saath
```

Data access karne mein 3 time lagte hain:

- **Seek time**: head ko sahi track tak le jaane ka time (sabse bada aur isi ko disk scheduling optimize karta hai).
- **Rotational latency**: platter ghoom ke sahi sector head ke neeche aane ka time.
- **Transfer time**: data actually padhne/likhne ka time.

### HDD vs SSD

| Point | HDD | SSD |
|---|---|---|
| Parts | Moving (platter, head) | No moving parts (flash) |
| Speed | Slow | Bahut tez |
| Seek time | Haan (mechanical) | Nahi (electronic) |
| Durability | Shock se kharaab ho sakti | Zyada tough |
| Cost per GB | Sasta | Mehnga |
| Noise | Thodi | Silent |

## Disk scheduling <Badge type="danger" text="Most Asked" />

Kai read/write requests queue mein wait karte hain. Disk scheduling tay karta hai kis order mein serve karein taaki total **head movement** (seek) kam ho.

**Kaise solve karein**: head position se shuru karo, algorithm ka rule lagao, har step ka movement = `|naya - purana|`, sab add karo.

Verified example. Request queue: **98, 183, 37, 122, 14, 124, 65, 67**. Head start = **53**. Cylinders 0-199.

| Algorithm | Order served | Total head movement |
|---|---|---|
| FCFS | 53 -> 98 -> 183 -> 37 -> 122 -> 14 -> 124 -> 65 -> 67 | 640 |
| SSTF | 53 -> 65 -> 67 -> 37 -> 14 -> 98 -> 122 -> 124 -> 183 | 236 |
| SCAN (towards 199) | 53 -> 65 -> 67 -> 98 -> 122 -> 124 -> 183 -> 199 -> 37 -> 14 | 331 |
| C-SCAN (towards 199) | 53 -> 65 -> 67 -> 98 -> 122 -> 124 -> 183 -> 199 -> 0 -> 14 -> 37 | 382 |
| LOOK (towards 199) | 53 -> 65 -> 67 -> 98 -> 122 -> 124 -> 183 -> 37 -> 14 | 299 |
| C-LOOK (towards 199) | 53 -> 65 -> 67 -> 98 -> 122 -> 124 -> 183 -> 14 -> 37 | 322 |
| SCAN (towards 0) | 53 -> 37 -> 14 -> 0 -> 65 -> 67 -> 98 -> 122 -> 124 -> 183 | 236 |

Har algorithm ka idea:

- **FCFS**: jis order mein aaye usi mein. Fair par bahut head movement.
- **SSTF** (Shortest Seek Time First): hamesha sabse nazdeek wali request pehle. Tez, par door wali requests starve ho sakti hain.
- **SCAN** (elevator): ek taraf (jaise 199) tak jao saari requests serve karte hue, phir end (199) tak jaake wapas mudo. Lift ki tarah.
- **C-SCAN**: SCAN jaisa par 199 pe pahunch ke seedha 0 par jump karo (serve kiye bina), phir dobara upar chalo. Zyada uniform wait deta hai.
- **LOOK**: SCAN jaisa par end tak nahi, sirf **aakhri request** (183) tak jaake mudo.
- **C-LOOK**: C-SCAN jaisa par sirf aakhri request tak, phir sabse chhoti request par jump.

::: warning Common galti: C-SCAN / C-LOOK ka return jump
Kuch books C-SCAN/C-LOOK ke return jump (199 se 0, ya 183 se 14) ko count **nahi** karti. Us convention mein: C-SCAN = 183, C-LOOK = 153. Hamesha bata do ki aap jump count kar rahe ho ya nahi. Upar wali table mein maine jump count kiya hai.
:::

::: tip Interview mein aise bolo
Disk scheduling reorders pending requests to minimise total head movement. FCFS is fair but inefficient; SSTF picks the nearest request but can starve far ones; SCAN and C-SCAN sweep like an elevator for fairer waits; LOOK and C-LOOK are the same but only go as far as the last request instead of the disk edge.
:::

::: details Follow-up: SSTF aur SCAN mein kaunsa starvation deta hai?
SSTF starvation de sakta hai: agar nazdeek nayi requests aati rahein, to door wali kabhi serve nahi hoti. SCAN/C-SCAN mein head regular sweep karta hai, isliye har request ko turn milta hai.
:::

## RAID levels

**RAID** (Redundant Array of Independent Disks) kai disks ko mila kar speed ya safety badhata hai.

| RAID | Technique | Fault tolerance | Min disks |
|---|---|---|---|
| RAID 0 | Striping (data tukdon mein kai disks par) | Koi nahi | 2 |
| RAID 1 | Mirroring (exact copy) | 1 disk fail | 2 |
| RAID 5 | Striping + distributed parity | 1 disk fail | 3 |
| RAID 6 | Striping + double parity | 2 disks fail | 4 |
| RAID 10 | Mirroring + striping | Har mirror se 1 | 4 |

- **RAID 0**: speed max, par koi safety nahi (ek disk gayi to sab gaya).
- **RAID 1**: safety, par storage aadha (dono disks same data).
- **RAID 5**: balance; parity se 1 disk fail sambhal leta hai.
- **RAID 6**: 2 disks tak fail sambhal leta hai (double parity).
- **RAID 10**: speed + safety dono, par mehnga.

## Yaad rakhne layak points

- Allocation: contiguous (fast, external fragmentation), linked/FAT (no external frag, random slow), indexed/inode (random fast).
- inode metadata rakhta hai (perms, owner, size, timestamps, block pointers) par **naam nahi**; naam directory entry mein hota hai.
- Hard link = same inode ka doosra naam (same FS); soft link = path wali chhoti file (target delete = toot jaata hai).
- Disk access time = seek + rotational latency + transfer; seek sabse bada, isko scheduling optimize karti hai.
- Verified example (head 53): FCFS = 640, SSTF = 236, SCAN(up) = 331, C-SCAN(up) = 382, LOOK(up) = 299, C-LOOK(up) = 322, SCAN(down) = 236.
- SSTF starvation de sakta hai; SCAN/C-SCAN fair hote hain (elevator).
- C-SCAN/C-LOOK return jump count karna convention par depend karta hai; interview mein bata do.
- RAID 0 = striping (no safety), RAID 1 = mirroring, RAID 5 = 1 fail, RAID 6 = 2 fail, RAID 10 = mirror + stripe.
- SSD mein moving parts nahi, isliye seek time nahi; HDD sasti par slow.

## Quick Quiz

<Quiz id="os-file-system-disk" title="File System aur Disk Quiz" />
