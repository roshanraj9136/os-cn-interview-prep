# IP Addressing aur Subnetting

IP address matlab har device ka network mein "ghar ka pata". Is page mein aap seekhenge IPv4 kya hota hai, subnet mask aur CIDR kya hai, aur subnetting ke numericals kaise solve karte hain. Subnetting placement online tests mein bahut puchha jaata hai, isliye isko dhyan se padhein.

| Topic | Kitna puchha jaata hai |
|---|---|
| Subnetting numericals (network/broadcast/hosts) | ⭐⭐⭐ |
| Subnet mask aur CIDR | ⭐⭐⭐ |
| Private vs public IP | ⭐⭐ |
| Classful addressing | ⭐⭐ |
| NAT/PAT | ⭐⭐ |
| IPv4 vs IPv6 | ⭐⭐ |

## IP address kya hai

IP address ek number hai jo network par har device ko diya jaata hai, taaki data sahi device tak pahunche. Jaise courier bhejne ke liye aapko ghar ka pura pata chahiye, waise hi packet bhejne ke liye destination ka IP address chahiye.

IPv4 address 32 bits ka hota hai. Isko hum 4 hisson mein likhte hain, har hissa 1 byte (8 bits) ka. Ise "dotted decimal" kehte hain, jaise `192.168.1.10`. Har octet ki value 0 se 255 tak ho sakti hai.

### Decimal se binary kaise banaye

Har octet ko alag se 8-bit binary mein badlo. `192.168.1.10` ko dekhte hain:

```text
192 = 11000000   (128 + 64)
168 = 10101000   (128 + 32 + 8)
  1 = 00000001   (1)
 10 = 00001010   (8 + 2)

192.168.1.10 = 11000000.10101000.00000001.00001010
```

Trick: har octet ke liye ye place values yaad rakho: 128, 64, 32, 16, 8, 4, 2, 1. Jahan tak number mein se value ghata sakte ho, wahan 1 likho.

::: tip Interview mein aise bolo
An IPv4 address is a 32-bit number that uniquely identifies a device on a network. We write it as four octets in dotted decimal, each from 0 to 255, for example 192.168.1.10. It is split into a network part and a host part, which is decided by the subnet mask.
:::

## Network part aur host part

Ek IP address ke do hisse hote hain:

- Network part: batata hai device kaun se network mein hai.
- Host part: us network ke andar kaun sa device hai.

Kaun se bits network ke hain aur kaun se host ke, ye subnet mask decide karta hai.

### Subnet mask

Subnet mask bhi 32 bits ka hota hai. Jahan mask mein 1 hai, wahan network part hai; jahan 0 hai, wahan host part hai. Example: mask `255.255.255.0` matlab pehle 24 bits network, last 8 bits host.

```text
IP   : 192.168.1.10   = 11000000.10101000.00000001.00001010
Mask : 255.255.255.0  = 11111111.11111111.11111111.00000000
                         <------ network ------> <- host ->
```

### CIDR notation

Baar baar mask likhna lamba hai, isliye hum "slash" notation use karte hain. `/24` matlab 24 network bits. To `192.168.1.10/24` ka matlab mask `255.255.255.0`.

| CIDR | Subnet mask | Network bits | Host bits |
|---|---|---|---|
| /8 | 255.0.0.0 | 8 | 24 |
| /16 | 255.255.0.0 | 16 | 16 |
| /24 | 255.255.255.0 | 24 | 8 |
| /27 | 255.255.255.224 | 27 | 5 |

::: tip Interview mein aise bolo
The subnet mask separates the network part from the host part of an IP address. Bits set to 1 are the network part and bits set to 0 are the host part. CIDR notation like /24 simply counts the number of 1 bits in the mask, so /24 equals 255.255.255.0.
:::

## Classful addressing <Badge type="danger" text="Most Asked" />

Pehle IP addresses classes mein baante jaate the, pehle octet ke hisaab se.

| Class | First octet range | Default mask | Default prefix | Usable hosts per network |
|---|---|---|---|---|
| A | 1 - 126 | 255.0.0.0 | /8 | 16,777,214 |
| B | 128 - 191 | 255.255.0.0 | /16 | 65,534 |
| C | 192 - 223 | 255.255.255.0 | /24 | 254 |
| D | 224 - 239 | multicast ke liye | - | - |
| E | 240 - 255 | experimental | - | - |

Note: `0` aur `127` reserved hain (127 loopback ke liye). Class D multicast ke liye aur Class E experimental ke liye hai.

### Classful ne addresses waste kyun kiye

Problem ye thi ki class sizes fixed the. Agar kisi company ko 300 hosts chahiye the, to Class C (254 hosts) kam padta tha, aur Class B (65,534 hosts) dena padta tha, jisme hazaaron addresses waste ho jaate. Isi waste ko theek karne ke liye CIDR (Classless Inter-Domain Routing) aaya, jisme aap koi bhi prefix (/20, /27 etc.) use kar sakte ho, zaroorat ke hisaab se.

::: tip Interview mein aise bolo
In classful addressing, the class was decided by the first octet, giving fixed network sizes: Class A /8, Class B /16, Class C /24. This wasted huge numbers of addresses, for example giving a whole Class B to an organisation that only needed a few hundred hosts. CIDR removed the fixed classes and lets us pick any prefix length, so addresses are used efficiently.
:::

## Special addresses

Har network mein kuch addresses alag kaam ke liye reserved hote hain:

- Network address: host bits sab 0. Ye pura network ko represent karta hai, kisi device ko nahi milta. Example `192.168.1.0/24`.
- Broadcast address: host bits sab 1. Isko bheja data us network ke sab devices ko jaata hai. Example `192.168.1.255/24`.
- Loopback: `127.0.0.0/8` (aam taur par `127.0.0.1`), apne hi machine ko test karne ke liye.
- `0.0.0.0`: "koi bhi/unknown address", ya default route ke liye.
- APIPA (link-local): `169.254.0.0/16`, jab DHCP server na mile to device khud ye address le leta hai.

### Private vs public IP

Public IP internet par unique hota hai. Private IP sirf aapke local network (ghar/office) ke andar chalta hai, aur internet par directly nahi jaata. Private ranges RFC 1918 mein define hain:

| Private range | CIDR | Kahaan milta hai |
|---|---|---|
| 10.0.0.0 - 10.255.255.255 | 10.0.0.0/8 | bade enterprise networks |
| 172.16.0.0 - 172.31.255.255 | 172.16.0.0/12 | medium networks |
| 192.168.0.0 - 192.168.255.255 | 192.168.0.0/16 | ghar ke routers |

Quick check: `10.5.6.7` private, `172.16.0.1` private, `172.31.255.254` private, lekin `172.32.0.1` public (12 range sirf 172.16 se 172.31 tak). `192.168.0.10` private, `8.8.8.8` public (Google DNS).

::: warning Common galti
`172.16.0.0/12` ka matlab sirf 172.16.x.x nahi hai. Ye 172.16.0.0 se 172.31.255.255 tak hai. To `172.20.5.5` bhi private hai, lekin `172.32.0.1` public hai.
:::

## Subnetting <Badge type="danger" text="Most Asked" />

Subnetting matlab ek bade network ko chhote-chhote networks (subnets) mein todna. Fayda: addresses waste kam hote hain, aur har department ka alag broadcast domain ban jaata hai (security aur traffic control behtar).

### Kaise solve karein (block size method)

1. CIDR se mask nikalo.
2. "Changing octet" (jahan mask 255 nahi hai) ka block size nikalo: `block size = 256 - mask value`.
3. Us octet mein block ke multiples likho: 0, block, 2*block, ... Jisme aapka IP girta hai, wahi network ka start.
4. Network address = block ki shuruaat (host bits 0). Broadcast = agle block se theek pehle wala address (host bits 1).
5. Usable hosts = (block ke addresses) - 2 (network aur broadcast chhodke).

### Example 1: 192.168.10.75/27

```text
/27 -> mask 255.255.255.224
changing octet = 4th, mask value = 224
block size = 256 - 224 = 32
blocks in 4th octet: 0, 32, 64, 96, ...
75 lies in 64 - 95  -> network .64, broadcast .95
```

| Cheez | Value |
|---|---|
| Subnet mask | 255.255.255.224 |
| Network address | 192.168.10.64 |
| Broadcast address | 192.168.10.95 |
| Usable host range | 192.168.10.65 - 192.168.10.94 |
| Usable hosts | 30 |

### Example 2: 172.16.45.14/20

Yahan changing octet 3rd hai (/20 matlab third octet mein 4 bits network, 4 bits host).

```text
/20 -> mask 255.255.240.0
changing octet = 3rd, mask value = 240
block size = 256 - 240 = 16
blocks in 3rd octet: 0, 16, 32, 48, ...
45 lies in 32 - 47 -> network 172.16.32.0, broadcast 172.16.47.255
```

| Cheez | Value |
|---|---|
| Subnet mask | 255.255.240.0 |
| Network address | 172.16.32.0 |
| Broadcast address | 172.16.47.255 |
| Usable host range | 172.16.32.1 - 172.16.47.254 |
| Usable hosts | 4094 |

### CIDR cheat table (yaad kar lo)

Usable hosts formula: `2^(host bits) - 2`.

| CIDR | Subnet mask | Block size | Total addresses | Usable hosts |
|---|---|---|---|---|
| /8 | 255.0.0.0 | 256 | 16,777,216 | 16,777,214 |
| /16 | 255.255.0.0 | 256 | 65,536 | 65,534 |
| /20 | 255.255.240.0 | 16 | 4,096 | 4,094 |
| /24 | 255.255.255.0 | 256 | 256 | 254 |
| /25 | 255.255.255.128 | 128 | 128 | 126 |
| /26 | 255.255.255.192 | 64 | 64 | 62 |
| /27 | 255.255.255.224 | 32 | 32 | 30 |
| /28 | 255.255.255.240 | 16 | 16 | 14 |
| /29 | 255.255.255.248 | 8 | 8 | 6 |
| /30 | 255.255.255.252 | 4 | 4 | 2 |

### Ek /24 ko 4 barabar subnets mein baantna

Agar `192.168.1.0/24` ko 4 equal parts mein baantna hai, to 2 bits borrow karo (2^2 = 4 subnets), prefix /24 se /26 ho jaata hai. Block size = 64.

| Subnet | Network | Broadcast | Usable range | Usable hosts |
|---|---|---|---|---|
| 1 | 192.168.1.0/26 | 192.168.1.63 | 192.168.1.1 - 192.168.1.62 | 62 |
| 2 | 192.168.1.64/26 | 192.168.1.127 | 192.168.1.65 - 192.168.1.126 | 62 |
| 3 | 192.168.1.128/26 | 192.168.1.191 | 192.168.1.129 - 192.168.1.190 | 62 |
| 4 | 192.168.1.192/26 | 192.168.1.255 | 192.168.1.193 - 192.168.1.254 | 62 |

### Hosts chahiye -> prefix nikalna

Ulta sawaal: "X hosts chahiye, konsa prefix?" Host bits `h` aise chuno ki `2^h - 2 >= X`.

- 50 hosts chahiye -> `2^6 - 2 = 62 >= 50` -> 6 host bits -> /26.
- 500 hosts chahiye -> `2^9 - 2 = 510 >= 500` -> 9 host bits -> /23.
- 2 hosts chahiye (router-to-router link) -> `2^2 - 2 = 2` -> /30.

### VLSM (Variable Length Subnet Mask)

VLSM matlab har subnet ko uski zaroorat ke hisaab se size dena, sabko same size dene ke bajaye. Rule: hamesha sabse bade requirement se shuru karo.

`192.168.1.0/24` ko baantna hai: LAN-A 100 hosts, LAN-B 50 hosts, LAN-C 20 hosts, aur ek router link 2 hosts.

| Network | Hosts needed | Prefix | Subnet | Usable range | Broadcast |
|---|---|---|---|---|---|
| LAN-A | 100 | /25 (126 usable) | 192.168.1.0/25 | 192.168.1.1 - 192.168.1.126 | 192.168.1.127 |
| LAN-B | 50 | /26 (62 usable) | 192.168.1.128/26 | 192.168.1.129 - 192.168.1.190 | 192.168.1.191 |
| LAN-C | 20 | /27 (30 usable) | 192.168.1.192/27 | 192.168.1.193 - 192.168.1.222 | 192.168.1.223 |
| Router link | 2 | /30 (2 usable) | 192.168.1.224/30 | 192.168.1.225 - 192.168.1.226 | 192.168.1.227 |

Iske baad free space `192.168.1.228` se shuru hoti hai.

::: tip Interview mein aise bolo
Subnetting divides one large network into smaller subnets by borrowing bits from the host part. I use the block size method: block size is 256 minus the mask value in the changing octet, which gives the network and broadcast boundaries. VLSM takes this further by assigning each subnet a prefix that fits its exact host requirement, starting from the largest, so we waste very few addresses.
:::

::: warning Common galti
Usable hosts nikalte waqt 2 addresses ghatana mat bhoolo: network address aur broadcast address kisi host ko assign nahi hote. To /27 mein 32 addresses hain lekin usable sirf 30.
:::

::: details Follow-up: /31 aur /32 kyun special hain?
/31 ke paas sirf 2 addresses hain aur normal rule se 0 usable bachte, lekin RFC 3021 ke hisaab se point-to-point links par /31 ke dono addresses use ho sakte hain. /32 ek single host route hai (ek hi address), loopback ya host-specific route ke liye.
:::

::: details Follow-up: kisi IP ka network address binary se kaise nikalein?
IP aur subnet mask ka bitwise AND karo. Jahan mask mein 1 hai wahan IP ka bit rahega, jahan 0 hai wahan 0 ho jaayega. Result network address hai.
:::

## NAT aur PAT

Ghar/office mein saare devices private IP use karte hain, lekin internet ko public IP chahiye. NAT (Network Address Translation) router par private IP ko public IP mein badal deta hai.

PAT (Port Address Translation, jise NAPT bhi kehte hain) ek hi public IP ke peeche kai devices ko chhupa deta hai, port numbers use karke. Isi liye aapke ghar ke 10 devices ek hi public IP se internet chala paate hain.

```text
Laptop 192.168.1.10:51000 ---+
Phone  192.168.1.11:52000 ---+--> Router --> 203.0.113.5:40001  --> Internet
TV     192.168.1.12:53000 ---+    (NAT/PAT)   (one public IP,
                                                different ports)
```

::: tip Interview mein aise bolo
NAT translates a device's private IP address into the router's public IP address so it can reach the internet. PAT, or port address translation, lets many devices share a single public IP by also mapping each connection to a different port number. This is why an entire home network can use one public IP from the ISP.
:::

## IPv4 vs IPv6

IPv4 addresses 32-bit hain, lagbhag 4.3 billion. Internet par devices itne badh gaye ki ye kam padne lage. IPv6 128-bit hai, jisme practically unlimited addresses hain.

| Feature | IPv4 | IPv6 |
|---|---|---|
| Size | 32 bits | 128 bits |
| Notation | dotted decimal (192.168.1.1) | 8 hex groups (2001:db8::1) |
| Header size | 20 - 60 bytes | fixed 40 bytes |
| Broadcast | haan | nahi (multicast/anycast use hota hai) |
| Address resolution | ARP | NDP |
| Autoconfig | DHCP | SLAAC + DHCPv6 |
| Fragmentation | source ya router | sirf source host |
| Header checksum | haan | nahi |

### IPv6 shortening

IPv6 lamba hota hai, isliye hum do rules se chhota karte hain: (1) har group ke leading zeros hata do, (2) sabse bade all-zero groups ke run ko ek baar `::` se replace karo (`::` sirf ek hi baar aa sakta hai).

```text
2001:0db8:0000:0000:0000:ff00:0042:8329
drop leading zeros -> 2001:db8:0:0:0:ff00:42:8329
replace zero run     -> 2001:db8::ff00:42:8329

Loopback: 0000:0000:0000:0000:0000:0000:0000:0001 -> ::1
```

::: tip Interview mein aise bolo
IPv4 uses 32-bit addresses, which gives about 4.3 billion addresses and is running out. IPv6 uses 128-bit addresses, so the space is effectively unlimited. IPv6 also drops broadcast in favour of multicast and anycast, uses NDP instead of ARP, has a fixed 40-byte header, and does no router fragmentation.
:::

## Yaad rakhne layak points

- IPv4 = 32 bits, 4 octets, har octet 0-255. IPv6 = 128 bits.
- Subnet mask network aur host part alag karta hai; mask mein 1 = network, 0 = host.
- Block size = 256 - (mask value of changing octet). Yahi subnetting ki jaan hai.
- Network address = host bits sab 0; broadcast address = host bits sab 1.
- Usable hosts = `2^(host bits) - 2` (network aur broadcast chhodke).
- Private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. Loopback 127.0.0.0/8, APIPA 169.254.0.0/16.
- Classful waste karta tha; CIDR classless hai aur koi bhi prefix allow karta hai.
- VLSM: har subnet ko uski zaroorat ke hisaab se prefix do, sabse bade se shuru karo.
- NAT private ko public IP mein badalta hai; PAT port use karke kai devices ko ek public IP share karwata hai.
- 192.168.10.75/27 -> network .64, broadcast .95, 30 usable hosts.

## Quick Quiz

<Quiz id="cn-ip-addressing" title="IP Addressing aur Subnetting Quiz" />
