# Deadlock

Is page mein aap seekhenge ki deadlock kya hai, uske 4 zaroori conditions, use handle karne ke tarike (prevention, avoidance, detection), aur Banker's algorithm ka pura worked example. Interviews mein 4 conditions aur Banker's algorithm bahut puchhe jaate hain.

| Topic | Kitna puchha jaata hai |
|---|---|
| 4 necessary conditions | ⭐⭐⭐ |
| Banker's algorithm (safe state) | ⭐⭐⭐ |
| Prevention vs Avoidance vs Detection | ⭐⭐ |
| Resource allocation graph | ⭐⭐ |
| Deadlock vs Starvation vs Livelock | ⭐⭐ |

## Deadlock kya hai?

Deadlock tab hota hai jab processes ka ek group aise phas jaaye ki har process kisi aisi cheez ka wait kar raha hai jo doosra process pakde hue hai, aur koi aage nahi badh sakta.

Analogy: ek chauraha (4-way crossing) bina traffic signal ke. Chaaron directions se ek-ek gaadi aa gayi, har gaadi aage badhna chahti hai par uske aage wali gaadi ko rasta chahiye. Koi nahi hilta, sab atak gaye. Yahi deadlock hai.

## 4 necessary conditions (Coffman conditions) <Badge type="danger" text="Most Asked" />

Deadlock hone ke liye ye chaaron conditions ek saath sach honi chahiye. Ek bhi toot jaaye to deadlock nahi ho sakta.

| Condition | Matlab |
|---|---|
| Mutual exclusion | Resource ek waqt mein ek hi process use kar sakta hai (share nahi hota). |
| Hold and wait | Process ek resource pakde hue hai aur doosre ka wait kar raha hai. |
| No preemption | Resource zabardasti chheena nahi ja sakta; process khud chhode. |
| Circular wait | Processes ka ek circle banta hai: P1 -> P2 -> P3 -> P1, har ek agle ka wait kar raha. |

::: tip Interview mein aise bolo
A deadlock needs four conditions to hold at the same time: mutual exclusion, hold and wait, no preemption, and circular wait. If we can ensure even one of these never holds, deadlock cannot occur. This is the idea behind deadlock prevention.
:::

## Resource Allocation Graph (RAG)

RAG ek diagram hai: processes (circle) aur resources (square). Arrow process se resource = request; resource se process = assignment.

```text
   P1 ---> R1 ---> P2
   ^                |
   |                v
   R2 <----------- (P2 holds R2, wants R1)
```

Cycle rule:

- Agar har resource type ka sirf ek instance hai: graph mein cycle ka matlab pakka deadlock.
- Agar kisi resource ke multiple instances hain: cycle hone par deadlock ho sakta hai, par zaroori nahi.

## Deadlock handle karne ke 4 tarike

| Method | Idea | Cost |
|---|---|---|
| Prevention | Chaaron conditions mein se ek ko kabhi hone hi na do | Resource utilisation girta hai |
| Avoidance | Allocation se pehle check karo system "safe state" mein rahega | Max need pehle se chahiye |
| Detection + Recovery | Deadlock hone do, detect karo, phir todo | Detection aur recovery ka overhead |
| Ignore (Ostrich) | Kuch mat karo, maan lo kabhi-kabhi hi hoga | Deadlock aaya to system atak sakta hai |

### 1. Deadlock Prevention

Har condition todne ka ek tarika:

- Mutual exclusion todo: resources ko shareable banao (hamesha possible nahi, jaise printer share nahi hota).
- Hold and wait todo: process shuru mein hi saare resources le le, ya koi bhi pakda ho to naya request na kare. (Utilisation kam, starvation possible.)
- No preemption todo: agar process naya resource nahi le paa raha, to uske current resources chheen lo. (Sirf un resources ke liye jinki state save ho sake.)
- Circular wait todo: saare resources ko ek number do, aur har process badhte number ke order mein hi request kare. (Sabse practical tarika.)

### 2. Deadlock Avoidance (safe state, Banker's)

System kabhi aisi allocation nahi karta jo use "unsafe state" mein daal de.

- Safe state: ek aisa order (safe sequence) exist karta hai jisme har process ko turn-by-turn uski max need tak resources de kar complete karaya ja sakta hai.
- Banker's algorithm deadlock avoidance karta hai. Iske liye har process ki maximum need pehle se pata honi chahiye. (Naam bank se aaya: bank tabhi loan deta hai jab saare customers ko bina diwaliya hue sambhal sake.)

### 3. Detection aur Recovery

- Single-instance resources par wait-for graph banao (RAG ka simplified version); isme cycle = deadlock.
- Multiple-instance par Banker's jaisa detection algorithm chalao.
- Recovery: deadlock wale processes mein se kisi ko kill karo, ya resources preempt karke rollback karo (process ko pehle ke safe point par le jaao).

### 4. Ignore (Ostrich algorithm)

Problem ko ignore karo (shutur-murg ki tarah sar ret mein daal lo). Zyadatar general-purpose OS (Linux, Windows) yahi karte hain, kyunki deadlock itna rare hai aur prevention/avoidance mehnga hai. Deadlock sambhalna programmer ke zimme chhod dete hain.

## Banker's algorithm: pura worked example <Badge type="danger" text="Most Asked" />

Resources: A, B, C. Total instances: A = 10, B = 5, C = 7.

Step 0: Need = Max - Allocation nikaalo.

| Process | Allocation (A B C) | Max (A B C) | Need = Max - Allocation |
|---|---|---|---|
| P0 | 0 1 0 | 7 5 3 | 7 4 3 |
| P1 | 2 0 0 | 3 2 2 | 1 2 2 |
| P2 | 3 0 2 | 9 0 2 | 6 0 0 |
| P3 | 2 1 1 | 2 2 2 | 0 1 1 |
| P4 | 0 0 2 | 4 3 3 | 4 3 1 |

Available = total - sabki allocation ka sum = (3 3 2).

Safety algorithm: Work = Available se shuru karo. P0..P4 ko baar-baar scan karo; jis process ka Need <= Work ho use "chala do", uski Allocation Work mein add kar do (wo complete ho kar resources laut dega). Jab tak koi na koi chal raha ho, repeat.

- P1: Need (1 2 2) <= Work (3 3 2)? Haan -> chala, release (2 0 0) -> Work = (5 3 2)
- P3: Need (0 1 1) <= Work (5 3 2)? Haan -> chala, release (2 1 1) -> Work = (7 4 3)
- P4: Need (4 3 1) <= Work (7 4 3)? Haan -> chala, release (0 0 2) -> Work = (7 4 5)
- P0: Need (7 4 3) <= Work (7 4 5)? Haan -> chala, release (0 1 0) -> Work = (7 5 5)
- P2: Need (6 0 0) <= Work (7 5 5)? Haan -> chala, release (3 0 2) -> Work = (10 5 7)

Saare 5 process chal gaye. System SAFE hai.

Safe sequence = `<P1, P3, P4, P0, P2>`.

(Ek se zyada safe sequence ho sakte hain, jaise `<P1, P3, P4, P2, P0>` bhi valid hai. Dhyaan do: P0 pehle kabhi start nahi ho sakta kyunki Need P0 (7 4 3) > Available (3 3 2).)

### Request example

Ab P1 request karta hai (1 0 2). Kya grant karein?

- Step 1: Request (1 0 2) <= Need P1 (1 2 2)? Haan. (Max se zyada nahi maang raha.)
- Step 2: Request (1 0 2) <= Available (3 3 2)? Haan. (Itne resources hain.)
- Step 3: Pretend grant karo: Available = (3 3 2) - (1 0 2) = (2 3 0). P1 ki Allocation = (3 0 2), Need P1 = (0 2 0). Ab safety check chalao.
- Safety check SAFE deta hai (sequence `<P1, P3, P4, P0, P2>`), isliye request GRANT ho jaati hai.

::: tip Interview mein aise bolo
The Banker's algorithm is a deadlock avoidance scheme. Each process declares its maximum need in advance. Before granting a request, the system pretends to allocate the resources and runs a safety check: if there exists a safe sequence in which every process can finish, the state is safe and the request is granted; otherwise the request is made to wait. It avoids ever entering an unsafe state.
:::

::: warning Common galti
Banker's algorithm deadlock prevention nahi, avoidance hai. Aur ye tabhi chalta hai jab har process ki maximum need pehle se pata ho. Safe state ka matlab deadlock nahi hai; unsafe state ka matlab bhi "pakka deadlock" nahi, bas deadlock ka risk hai.
:::

## Deadlock vs Starvation vs Livelock

| Point | Deadlock | Starvation | Livelock |
|---|---|---|---|
| Kya hota hai | Processes ek doosre ka wait karte hue atak jaate hain | Ek process indefinitely wait karta hai jabki doosre aage badhte rehte hain | Processes state badalte rehte hain par kaam aage nahi badhta |
| States change? | Nahi, sab block | Victim block, baaki chalte | Haan, par bekaar mein |
| Fix | 4 conditions mein se ek todo | Aging | Random backoff / timing badlo |

::: details Follow-up: Deadlock aur starvation mein kya fark hai?
Deadlock mein group ke saare processes atak jaate hain aur koi aage nahi badhta. Starvation mein system aage badh raha hai, par ek particular process ko kabhi resource nahi milta (jaise priority scheduling mein low-priority process). Starvation aging se theek hoti hai.
:::

## Real code mein deadlock se kaise bachein

Asli programs mein programmer ye practices follow karte hain:

- Consistent lock ordering: saare locks ko ek fixed order mein hi acquire karo (circular wait todta hai).
- Timeouts / tryLock: lock na mile to thodi der baad chhod do aur retry karo, taaki anant wait na ho.
- Locks ko kam se kam der hold karo: critical section chhota rakho, nested locks se bacho.

## Yaad rakhne layak points

- Deadlock ke liye 4 conditions ek saath chahiye: mutual exclusion, hold and wait, no preemption, circular wait.
- Single-instance resources par RAG cycle = pakka deadlock; multiple-instance par cycle se deadlock possible, zaroori nahi.
- Prevention = kisi ek condition ko kabhi hone na do; avoidance = safe state check (Banker's); detection = hone do phir todo; ignore = ostrich.
- Banker's algorithm avoidance hai aur har process ki maximum need pehle se maangta hai.
- Safe state = ek safe sequence exist karta hai jisme sab complete ho sakein.
- Is example mein Available (3 3 2), safe sequence `<P1, P3, P4, P0, P2>`, aur P1 ki request (1 0 2) grant ho jaati hai.
- Starvation aging se theek hoti hai; livelock mein processes badalte hain par progress nahi hota.
- Real code mein consistent lock ordering aur timeouts deadlock se bachaate hain.

## Quick Quiz

<Quiz id="os-deadlock" title="Deadlock Quiz" />
