# google.com type karne par kya hota hai

Ye interview ka sabse famous sawaal hai. Ismein poora CN ek saath test hota hai: DNS, ARP, TCP, TLS, HTTP, routing, sab. Is page mein hum browser mein `google.com` likhne se le ke page dikhne tak ka poora safar step-by-step dekhenge, har step ki layer aur protocol ke saath.

| Topic | Kitna puchha jaata hai |
|---|---|
| Poora flow (DNS -> TCP -> TLS -> HTTP) | ⭐⭐⭐ |
| Kis step par kaun sa protocol/layer | ⭐⭐⭐ |
| Follow-ups (DNS fail, cert trust, 2nd visit fast) | ⭐⭐ |

## 60-second jawab (pehle ye yaad karo)

::: tip Interview mein aise bolo
First the browser parses the URL and checks HSTS to decide on HTTPS. It resolves google.com to an IP using DNS: it checks the browser and OS cache, then asks a recursive resolver, which queries the root, TLD, and authoritative servers. To reach the first router, the host uses ARP for the gateway's MAC. Then it opens a TCP connection with a three-way handshake and performs a TLS handshake for HTTPS. The browser sends an HTTP GET request; the packets are routed across the internet, with NAT at the home router and routers decrementing TTL. Google answers from a nearby CDN edge through a load balancer, returns 200 OK with HTML, and the browser renders the page, fetching CSS, JS, and images, caching what it can.
:::

Ab har step detail mein.

## Step by step poora safar

### 1. URL parsing aur HSTS check (Application layer)

Browser `google.com` ko todta hai: scheme (https), host (google.com), path (/). Agar aap sirf `google.com` likhte ho, browser **HSTS** list check karta hai. HSTS (HTTP Strict Transport Security) ek list hai jahan sites keh chuki hain "mujhse hamesha HTTPS par baat karo". google.com ispar hai, isliye browser seedhe HTTPS (port 443) use karta hai, plain HTTP try hi nahi karta.

### 2. DNS lookup: naam se IP (Application layer, UDP 53)

Browser ko IP chahiye. Ye order mein dhoondta hai:

```text
Browser cache -> OS cache / hosts file -> Recursive resolver
                                               |
          root server -> TLD (.com) server -> authoritative server
                                               |
                   IP wapas resolver -> OS -> browser
```

Agar kahin cache mein mila to turant, varna recursive resolver (jaise 8.8.8.8) root, TLD aur authoritative se poochh ke IP laata hai. DNS normal query UDP port 53 par hoti hai. Detail: [Application Layer](/cn/application-layer).

### 3. ARP: gateway ka MAC dhoondhna (Data Link layer)

Ab IP to mil gaya, par pehla packet aapke **router (default gateway)** ko jaana hai. Us router tak frame bhejne ke liye uska **MAC address** chahiye. Agar MAC cache mein nahi hai, to host ARP request **broadcast** karta hai "192.168.1.1 ka MAC kiske paas hai?", gateway unicast reply deta hai. Yaad rakho: Google door hai, isliye host Google ka MAC nahi, apne **gateway ka MAC** dhoondhta hai. Detail: [Data Link Layer](/cn/data-link).

### 4. TCP 3-way handshake (Transport layer, TCP)

HTTPS TCP par chalta hai, isliye pehle connection banta hai:

```text
Client  --- SYN (seq=x) --------------->  Google server
Client  <-- SYN + ACK (seq=y, ack=x+1) -  Google server
Client  --- ACK (ack=y+1) ------------->  Google server
```

Teen packets ke baad connection ready. (Agar browser HTTP/3 use kar raha hai to TCP ki jagah **QUIC on UDP** chalta hai, jo tezi se connect hota hai.) Detail: [TCP aur UDP](/cn/tcp-udp).

### 5. TLS handshake (Security, port 443)

Ab connection ko encrypt karna hai. TLS 1.3 handshake:

1. ClientHello (ciphers + key share) ->
2. ServerHello + certificate + key share <-
3. Dono same symmetric session key bana lete hain (ECDHE).

Browser Google ke certificate ko root CA tak verify karta hai. Ab saara data encrypted jaayega. Detail: [Network Security](/cn/security).

### 6. HTTP GET request (Application layer)

Encrypted channel ke upar browser asli request bhejta hai:

```text
GET / HTTP/2
Host: google.com
User-Agent: Chrome
Accept: text/html
```

### 7. Internet par routing (Network layer)

Ye request packets internet ke bahut saare routers se ho ke jaate hain:

- **NAT**: aapke home router par private IP (192.168.x.x) public IP mein badal jaata hai.
- Har **router** destination IP par **longest prefix match** karta hai aur **TTL ko 1 kam** karta hai (TTL 0 par packet drop + ICMP Time Exceeded).
- Bade internet par ISPs ke beech **BGP** raasta decide karta hai.
- Important: har hop par **MAC address badalta hai**, par source/destination **IP same rehta hai** (NAT ko chhod ke). Detail: [Routing](/cn/routing).

### 8. Google ki taraf (server side)

- Google **anycast / CDN edge** use karta hai: aapko sabse paas wala Google server milta hai (same IP kai jagah advertise hota hai).
- Request pehle ek **load balancer** par aati hai, jo use kisi khaali web server ko de deta hai.
- Web server page banata/laata hai aur response bhejta hai.

### 9. HTTP response (Application layer)

```text
HTTP/2 200 OK
Content-Type: text/html
Content-Length: ...

<!doctype html> ... page ka HTML ...
```

200 ka matlab sab theek, saath mein HTML aata hai.

### 10. Browser rendering (client side)

Browser HTML ko padh ke:

1. HTML se **DOM** (page ka tree) banata hai.
2. CSS laata hai (styling), JS laata hai (behaviour).
3. Har image, CSS, JS ke liye aur requests bhejta hai (aksar usi connection par, keep-alive/multiplexing).
4. Jo cache ho sakta hai use cache kar leta hai (next time fast).
5. Page screen par draw (render) ho jaata hai.

## Poora flow ek nazar mein

```text
+----------------------------------------------------------+
| 1. URL parse + HSTS -> HTTPS decide                      |
| 2. DNS: cache -> resolver -> root -> TLD -> authoritative|
| 3. ARP: gateway ka MAC (agar LAN ke bahar)               |
| 4. TCP 3-way handshake (SYN, SYN-ACK, ACK)               |
| 5. TLS handshake -> symmetric session key                |
| 6. HTTP GET request                                      |
| 7. Routing: NAT at home router, routers decrement TTL,   |
|    BGP between ISPs (IP same, MAC changes per hop)       |
| 8. Google: anycast CDN edge -> load balancer -> server   |
| 9. HTTP 200 OK + HTML                                    |
| 10. Browser renders: DOM, CSS, JS, more requests, cache  |
+----------------------------------------------------------+
```

## Step, layer, protocol, port ki table

| Step | Layer | Protocol | Port |
|---|---|---|---|
| URL parse + HSTS | Application | - | - |
| DNS lookup | Application | DNS | UDP 53 |
| ARP (gateway MAC) | Data Link | ARP | - |
| TCP handshake | Transport | TCP | server 443 |
| TLS handshake | (Security over TCP) | TLS | 443 |
| HTTP GET | Application | HTTP/HTTPS | 443 |
| Routing across net | Network | IP, BGP, ICMP | - |
| HTTP response | Application | HTTP/HTTPS | 443 |

## Follow-ups

::: details Follow-up: DNS resolve fail ho jaaye to?
Browser ko IP nahi milta, to connection ban hi nahi sakta. Aapko "server not found" / DNS error dikhta hai. Browser doosre DNS record ya resolver try kar sakta hai, par agar sab fail, to page load nahi hoga. Transport aur upar ke saare steps isi par ruke rehte hain.
:::

::: details Follow-up: site sirf HTTP ho (HTTPS nahi) to?
Tab TLS handshake wala step skip ho jaata hai aur connection port 80 par plain HTTP se banta hai. Data encrypt nahi hota, isliye beech wala koi padh sakta hai. Modern browsers aise sites par "Not Secure" dikhate hain aur HSTS wali sites ke liye plain HTTP allow hi nahi karte.
:::

::: details Follow-up: browser certificate par bharosa kaise karta hai?
Browser ke paas pehle se bharosemand root CAs ki list hoti hai. Google ka certificate kisi CA ne sign kiya hota hai, aur us CA ko kisi root CA ne. Browser is chain ko root tak verify karta hai, aur ye bhi check karta hai ki certificate ka naam domain se match karta hai aur expire nahi hua. Sab theek to green lock, varna warning.
:::

::: details Follow-up: dusri baar visit karne par fast kyun hota hai?
Kai cheezein cache ho chuki hoti hain: DNS answer (TTL tak), TCP/TLS connection reuse ya session resumption (TLS 1.3 mein 0-RTT), aur CSS/JS/images browser cache mein. Isliye DNS lookup aur handshake aksar dobara nahi karne padte, aur page jaldi dikh jaata hai.
:::

## Yaad rakhne layak points

- Order yaad rakho: URL/HSTS -> DNS -> ARP (gateway) -> TCP handshake -> TLS -> HTTP GET -> routing -> server -> HTTP response -> render.
- DNS naam ko IP mein badalta hai (UDP 53); browser/OS cache pehle check hote hain.
- Host LAN ke bahar ke liye Google ka nahi, apne gateway ka MAC ARP karta hai.
- TCP 3-way handshake (SYN, SYN-ACK, ACK) ke baad hi data jaata hai; HTTP/3 QUIC/UDP use karta hai.
- TLS handshake ek symmetric session key set karta hai aur certificate verify karta hai.
- Routing mein har hop par MAC badalta hai, IP same rehta hai; router TTL ghataata hai; home router NAT karta hai.
- Google anycast/CDN edge aur load balancer ke peechhe serve karta hai.
- 200 OK + HTML ke baad browser DOM banata hai, CSS/JS/images laata hai, aur cache karta hai.
- Dusri visit fast hoti hai kyunki DNS, connection aur assets cache ya reuse ho jaate hain.

## Quick Quiz

<Quiz id="cn-google-com" title="google.com Flow Quiz" />
