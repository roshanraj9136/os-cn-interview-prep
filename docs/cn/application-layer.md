# Application Layer: HTTP, DNS, DHCP

Ye page sabse upar wali layer ke baare mein hai, jahan aapke apps (browser, email, WhatsApp) baat karte hain. Yahan ke protocols (HTTP, DNS, DHCP) interview mein aur OA MCQ mein bahut puchhe jaate hain. Inko theek se samjhoge to aadha CN cover ho gaya.

| Topic | Kitna puchha jaata hai |
|---|---|
| HTTP methods aur status codes | ⭐⭐⭐ |
| DNS resolution steps | ⭐⭐⭐ |
| HTTP vs HTTPS | ⭐⭐⭐ |
| DHCP (DORA) | ⭐⭐ |
| HTTP/1.1 vs HTTP/2 vs HTTP/3 | ⭐⭐ |
| SMTP vs POP3 vs IMAP | ⭐⭐ |
| FTP, SSH vs Telnet | ⭐ |
| WebSocket, REST | ⭐ |

## Application layer ka kaam

Application layer wo layer hai jahan user ke programs network ka use karte hain. Ye khud data bhejti ya receive nahi karti; ye niche wali Transport layer (TCP/UDP) ko data deti hai jo use aage pahunchati hai.

Simple baat: aap browser mein kuch kholte ho, to browser HTTP protocol ki language mein request banata hai. Ye language hi application layer hai.

Yahan ke common protocols aur unke ports yaad rakho (interview mein direct puchha jaata hai):

| Protocol | Kaam | Port | Transport |
|---|---|---|---|
| HTTP | Web pages | 80 | TCP |
| HTTPS | Secure web pages | 443 | TCP |
| DNS | Naam -> IP | 53 | UDP (TCP bade jawab ke liye) |
| DHCP | Auto IP dena | 67 server / 68 client | UDP |
| FTP | File transfer | 20 data / 21 control | TCP |
| SMTP | Mail bhejna | 25 (587 submission) | TCP |
| POP3 | Mail download | 110 | TCP |
| IMAP | Mail sync | 143 | TCP |
| SSH | Secure remote login | 22 | TCP |
| Telnet | Remote login (plain) | 23 | TCP |

## HTTP <Badge type="danger" text="Most Asked" />

HTTP (HyperText Transfer Protocol) wo rule-book hai jisse browser (client) aur web server baat karte hain. Client ek request bhejta hai, server ek response deta hai. Bas itna hi.

HTTP **stateless** hai: server ko yaad nahi rehta ki aap pichhli baar kaun the. Har request apne aap mein poori honi chahiye. State add karne ke liye cookies, sessions aur tokens use hote hain.

### Request aur response ka format

Ek HTTP request aise dikhti hai:

```text
GET /index.html HTTP/1.1
Host: example.com
User-Agent: Chrome
Accept: text/html

(body yahan, GET mein khali)
```

Server ka response:

```text
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024

<html> ... page ka content ... </html>
```

Pehli line sabse important hai: request mein method + path + version, response mein version + status code.

### HTTP methods

| Method | Kaam | Safe? | Idempotent? |
|---|---|---|---|
| GET | Data mangna (read) | Yes | Yes |
| HEAD | Sirf headers mangna | Yes | Yes |
| OPTIONS | Kaun se methods allowed | Yes | Yes |
| POST | Naya data banana | No | No |
| PUT | Poora resource replace | No | Yes |
| PATCH | Thoda sa update | No | No |
| DELETE | Resource hataana | No | Yes |

- **Safe** matlab server ka data change nahi hota (sirf padhte ho).
- **Idempotent** matlab same request 10 baar bhejo to result wahi rahega jo 1 baar bhejne par tha. PUT idempotent hai (wahi value set hoti hai), POST nahi (har baar naya record ban sakta hai).

### GET vs POST

| Point | GET | POST |
|---|---|---|
| Kaam | Data mangna | Data bhejna/banana |
| Data kahan | URL mein (query string) | Request body mein |
| Length limit | URL length ki limit | Bada data bhej sakte ho |
| Cache/bookmark | Ho sakta hai | Nahi |
| Idempotent | Yes | No |
| Sensitive data | Theek nahi (URL mein dikhta hai) | Behtar |

::: warning Common galti
"POST encrypted hota hai, GET nahi" - ye galat hai. Dono plain text mein jaate hain. Security sirf HTTPS (TLS) se aati hai, method se nahi. POST ka data bas URL mein nahi dikhta, isliye logs mein kam leak hota hai, par wire par encrypt nahi hota.
:::

### Status codes

| Class | Matlab | Common examples |
|---|---|---|
| 1xx | Information | 100 Continue |
| 2xx | Success | 200 OK, 201 Created, 204 No Content |
| 3xx | Redirect | 301 Moved Permanently, 302 Found, 304 Not Modified |
| 4xx | Client ki galti | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests |
| 5xx | Server ki galti | 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout |

401 vs 403 confusion yaad rakho: **401 = aap login hi nahi ho (authentication missing)**, **403 = login to ho par aapko permission nahi (authorized nahi)**.

### Statelessness: cookies vs sessions

HTTP stateless hai, par websites ko aapko yaad rakhna padta hai (login, cart). Iske liye:

| Point | Cookie | Session |
|---|---|---|
| Data kahan store | Browser (client) mein | Server mein |
| Client ke paas | Poora data | Sirf ek session ID |
| Security | Kam (user dekh/badal sakta hai) | Zyada (data server par) |
| Example | "theme=dark" | Server par aapka login record |

Aam flow: aap login karte ho, server ek session banata hai aur uski ID ek cookie mein bhejta hai. Agli request mein browser wahi cookie wapas bhejta hai, to server pehchaan leta hai.

::: tip Interview mein aise bolo
HTTP is a stateless, request-response protocol used by browsers and web servers. The client sends a request with a method and a path, and the server replies with a status code and a body. Because it is stateless, the server does not remember previous requests, so we use cookies, sessions, or tokens to maintain state like a logged-in user.
:::

::: details Follow-up: HTTP stateless hone ke fayde kya hain?
Stateless hone se har request alag handle hoti hai, isliye server simple rehta hai aur easily scale hota hai (koi bhi server koi bhi request le sakta hai). Load balancing aur caching bhi aasan ho jaati hai.
:::

### HTTP/1.1 vs HTTP/2 vs HTTP/3

| Point | HTTP/1.1 | HTTP/2 | HTTP/3 |
|---|---|---|---|
| Data format | Text headers | Binary framing | Binary framing |
| Ek connection par | Ek request at a time | Kai streams multiplex | Kai streams multiplex |
| Head-of-line block | Haan (TCP level) | TCP level par abhi bhi | Hataya (QUIC use karta hai) |
| Header compression | Nahi | Haan (HPACK) | Haan (QPACK) |
| Chalta kis par | TCP | TCP | QUIC (UDP ke upar) |
| TLS | Optional | Practically zaroori | Built-in (TLS 1.3) |

**Keep-alive (persistent connection)**: HTTP/1.1 mein ek hi TCP connection par kai requests ja sakti hain, baar-baar connection banane ki zaroorat nahi. Isse speed badhti hai.

::: details Follow-up: HTTP/2 mein head-of-line blocking kyun bacha reh gaya?
HTTP/2 app level par kai streams ek saath bhejta hai, par wo sab ek hi TCP connection par hain. Agar ek TCP packet lost ho jaaye, to TCP saare streams ko rok deta hai jab tak wo packet dobara na aaye. HTTP/3 QUIC use karta hai jisme har stream alag hota hai, isliye ye problem nahi aati.
:::

## HTTP vs HTTPS <Badge type="danger" text="Most Asked" />

HTTPS = HTTP + TLS (encryption). Baaki sab same hai, bas data encrypt ho ke jaata hai.

| Point | HTTP | HTTPS |
|---|---|---|
| Full form | HyperText Transfer Protocol | HTTP Secure |
| Encryption | Nahi (plain text) | Haan (TLS) |
| Port | 80 | 443 |
| Certificate | Nahi chahiye | SSL/TLS certificate chahiye |
| Security | Koi bhi beech mein padh sakta hai | Encrypted, chhedchhaad pata chal jaati hai |

TLS ki poori detail ke liye dekho [Network Security](/cn/security).

::: tip Interview mein aise bolo
HTTPS is HTTP running over TLS on port 443. It encrypts the data between the browser and the server, so a person in the middle cannot read or tamper with it. It also uses a certificate so the browser can verify it is really talking to the right server. Plain HTTP on port 80 sends everything in clear text.
:::

## DNS <Badge type="danger" text="Most Asked" />

DNS (Domain Name System) internet ki phone-book hai. Hum naam yaad rakhte hain (google.com), par computer IP address se baat karta hai. DNS naam ko IP mein badalta hai.

### Hierarchy (naam kaise bata hai)

DNS ek ulta ped (tree) hai:

```text
            . (root)
            |
           com   (TLD: top level domain)
            |
         google   (authoritative domain)
            |
     www.google.com -> 142.250.x.x
```

- **Root servers**: sabse upar, TLD servers ka pata dete hain.
- **TLD servers**: .com, .in, .org jaise top-level domain sambhalte hain.
- **Authoritative server**: us domain ka asli jawab (final IP) deta hai.

### Resolution steps (kaise IP milta hai)

```text
Browser cache  ->  OS cache / hosts file  ->  Recursive resolver
                                                   |
                      root server  ->  TLD server (.com)  ->  authoritative
                                                   |
                      IP wapas resolver ko  ->  OS ko  ->  browser ko
```

Step by step:

1. Browser apni cache dekhta hai.
2. Phir OS ki cache aur hosts file.
3. Nahi mila to **recursive resolver** (ISP ka, ya 8.8.8.8, 1.1.1.1) ko poochhta hai.
4. Resolver root se poochhta hai, root TLD ka pata deta hai.
5. Resolver TLD (.com) se poochhta hai, wo authoritative server ka pata deta hai.
6. Authoritative server asli IP deta hai.
7. IP wapas client tak aata hai aur TTL tak cache ho jaata hai.

### Recursive vs iterative query

| Point | Recursive query | Iterative query |
|---|---|---|
| Kaun se step mein | Client -> resolver | Resolver -> root/TLD/authoritative |
| Jawab | "Mujhe final IP laa ke do" | "Jo pata hai wo batao, aage main dhoond lunga" |
| Kaam kaun karta | Resolver poora kaam karta hai | Resolver khud har jagah jaata hai |

### Record types

| Record | Kaam |
|---|---|
| A | Naam -> IPv4 address |
| AAAA | Naam -> IPv6 address |
| CNAME | Alias (ek naam dusre naam par point) |
| MX | Mail server ka pata |
| NS | Us domain ke name servers |
| TXT | Text info (verification, SPF) |
| PTR | Reverse lookup (IP -> naam) |
| SOA | Zone ki master info |

**Caching aur TTL**: har jawab ke saath ek TTL (time to live) aata hai. Us time tak jawab cache mein rehta hai, dobara poora DNS nahi karna padta. Isse DNS fast aur halka rehta hai.

**Port**: DNS normal queries ke liye **UDP port 53** use karta hai (fast, chhota). Bade jawab aur zone transfer ke liye **TCP port 53**.

::: tip Interview mein aise bolo
DNS translates a human-friendly name like google.com into an IP address that computers use. The browser first checks its cache and the OS cache, then asks a recursive resolver. The resolver queries the root server, then the TLD server for .com, and finally the authoritative server, which returns the IP. The answer is cached for its TTL. DNS normally uses UDP on port 53.
:::

::: warning Common galti
"DNS sirf TCP use karta hai" galat hai, aur "DNS sirf UDP use karta hai" bhi poora sahi nahi. Normal queries UDP 53 par hoti hain, par zone transfer aur bade responses TCP 53 par jaate hain.
:::

::: details Follow-up: client aur resolver ke beech recursive, par resolver aage iterative kyun?
Client simple rehna chahta hai, isliye wo resolver se poora jawab mangta hai (recursive). Resolver dedicated server hai jo step-by-step root, TLD aur authoritative se baat karke IP khud dhoondh leta hai (iterative), aur cache bhi karta hai taaki agli baar fast ho.
:::

## DHCP

DHCP (Dynamic Host Configuration Protocol) naye device ko automatically IP address deta hai. Aapke phone ko WiFi se jurte hi IP mil jaata hai, wo DHCP ki wajah se hai. Varna har device ko manually IP dena padta.

### DORA (DHCP ke 4 steps)

```text
Client                         DHCP Server
  |  --- 1. DISCOVER (broadcast) --->  |
  |  <--- 2. OFFER (IP suggest) -----  |
  |  --- 3. REQUEST (ye wala lunga) -> |
  |  <--- 4. ACK (theek hai, lo) ----  |
```

- **Discover**: client broadcast karta hai "koi DHCP server hai?"
- **Offer**: server ek IP offer karta hai.
- **Request**: client bolta hai "main yahi IP lunga."
- **Acknowledge**: server confirm karta hai.

DHCP in cheezon ko deta hai: **IP address, subnet mask, default gateway, DNS server ka pata, aur lease time**.

**Lease time**: IP hamesha ke liye nahi milta, ek time ke liye lease par milta hai. Lease khatam hone se pehle client use renew karta hai.

**Ports**: server **67**, client **68** (UDP).

::: tip Interview mein aise bolo
DHCP automatically gives a device its IP configuration when it joins a network. It follows four steps called DORA: Discover, Offer, Request, Acknowledge. The server hands out the IP address, subnet mask, default gateway, DNS server, and a lease time. The server uses UDP port 67 and the client uses port 68.
:::

## Email: SMTP vs POP3 vs IMAP

Email ke do kaam hain: mail bhejna (SMTP) aur mail padhna (POP3/IMAP).

| Point | SMTP | POP3 | IMAP |
|---|---|---|---|
| Kaam | Mail bhejna (push) | Mail download | Mail sync (padhna) |
| Port | 25 (587 submission) | 110 | 143 |
| Server par copy | - | Download ke baad hata deta hai | Server par rehti hai |
| Multiple device | - | Theek nahi | Haan, sab sync |

Simple yaad rakho: **SMTP bhejne ke liye, POP3/IMAP padhne ke liye**. IMAP aaj zyada use hota hai kyunki sab devices par same inbox dikhta hai.

## FTP aur SSH vs Telnet

**FTP (File Transfer Protocol)** files bhejne/lene ke liye. Iski khaas baat: ye **do connection** use karta hai, control (port 21) commands ke liye, aur data (port 20) actual file ke liye.

- **Active mode**: server client ko data connection kholta hai.
- **Passive mode**: client server ko data connection kholta hai (firewall ke peechhe behtar).

| Point | Telnet | SSH |
|---|---|---|
| Kaam | Remote machine par login | Remote machine par login |
| Encryption | Nahi (plain text) | Haan (encrypted) |
| Port | 23 | 22 |
| Aaj use | Lagbhag nahi | Standard |

Yaad rakho: **SSH = secure Telnet**. Password plain mein kabhi mat bhejo, isliye Telnet ki jagah SSH use hota hai.

## WebSocket aur REST

**WebSocket**: normal HTTP mein client maangta hai aur server jawab deta hai, ek taraf se shuruat hoti hai. WebSocket ek **do-tarfa (full-duplex) connection** banata hai jo khula rehta hai, jahan server bhi bina maange data bhej sakta hai. Isliye chat, live notifications, online games mein use hota hai.

**REST API**: ek style hai jisme hum resources (jaise `/users/5`) par HTTP methods lagate hain, GET se padho, POST se banao, PUT se update, DELETE se hatao. Stateless hota hai, JSON return karta hai. Aaj ke zyada web APIs REST hi hain.

## Yaad rakhne layak points

- HTTP stateless, request-response protocol hai; state ke liye cookies/sessions/tokens.
- Safe methods (GET, HEAD, OPTIONS) data change nahi karte; idempotent (GET, HEAD, OPTIONS, PUT, DELETE) ko repeat karne se result nahi badalta.
- 401 = login nahi (authentication), 403 = login hai par permission nahi (authorization).
- HTTPS = HTTP over TLS, port 443; HTTP port 80.
- DNS naam ko IP mein badalta hai: browser cache -> OS -> recursive resolver -> root -> TLD -> authoritative; UDP 53 (bade jawab TCP 53).
- Client-resolver query recursive, resolver aage iterative.
- DHCP ke 4 step DORA: Discover, Offer, Request, Acknowledge; deta hai IP, mask, gateway, DNS, lease; ports 67/68.
- SMTP bhejne ke liye (25/587), POP3 (110) aur IMAP (143) padhne ke liye; IMAP sync karta hai.
- SSH (22) = secure Telnet (23); FTP control 21, data 20.
- HTTP/3 QUIC (UDP) par chalta hai aur TCP ka head-of-line blocking hataata hai.

## Quick Quiz

<Quiz id="cn-application-layer" title="Application Layer Quiz" />
