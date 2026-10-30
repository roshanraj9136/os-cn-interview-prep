# Network Security

Ye page batata hai ki data ko surakshit kaise rakha jaata hai: encryption, certificates, firewall aur common attacks. Interview mein "symmetric vs asymmetric", "HTTPS/TLS kaise kaam karta hai" aur "SQL injection kya hai" jaise sawaal pakka aate hain.

| Topic | Kitna puchha jaata hai |
|---|---|
| Symmetric vs asymmetric encryption | ⭐⭐⭐ |
| SSL/TLS handshake | ⭐⭐⭐ |
| Hashing vs encryption vs encoding | ⭐⭐ |
| Common attacks (SQLi, XSS, MITM) | ⭐⭐ |
| Digital signature aur certificate | ⭐⭐ |
| Firewall, IDS/IPS, VPN, proxy | ⭐⭐ |
| CIA triad | ⭐ |

## CIA triad

Security ke 3 main goals, inhe CIA triad kehte hain:

| Letter | Matlab | Simple baat |
|---|---|---|
| Confidentiality | Data sirf allowed logon ko dikhe | Encryption se |
| Integrity | Data beech mein badla na gaya ho | Hashing se pata chalta hai |
| Availability | System chalu rahe, jab chahiye mil jaaye | DDoS isi par attack karta hai |

Yaad rakho: C = chhupa ke rakho, I = chhedchhaad na ho, A = hamesha available ho.

## Encryption basics

Encryption matlab data ko aise badal dena ki bina key ke koi padh na sake. Plain text (padhne layak) -> encrypt -> cipher text (bakwaas jaisa) -> key se decrypt -> wapas plain text.

Do tarah ki encryption hoti hai: symmetric aur asymmetric.

### Symmetric vs asymmetric <Badge type="danger" text="Most Asked" />

| Point | Symmetric | Asymmetric |
|---|---|---|
| Keys | Ek hi key (dono taraf same) | Key pair: public + private |
| Speed | Fast | Slow |
| Example | AES, DES | RSA, ECC |
| Key sharing | Problem (key kaise bheje safely?) | Solve ho jaati (public key sabko de sakte ho) |
| Use | Bada data encrypt karna | Key exchange, digital signature |

Samajhne ka tareeka:

- **Symmetric**: ek hi chaabi se taala lock bhi hota hai aur khulta bhi. Problem: chaabi samne wale tak safely kaise pahunchaye?
- **Asymmetric**: do chaabiyan. **Public key** sabko de sakte ho (isse lock hota hai), **private key** sirf aapke paas (isse khulta hai). Jo public key se lock hoga wo sirf private key se khulega.

Real HTTPS mein **dono** use hote hain: asymmetric se safely ek symmetric key set kar lete hain, phir actual data fast symmetric encryption (AES) se encrypt hota hai. Best of both.

::: tip Interview mein aise bolo
Symmetric encryption uses one shared key for both encryption and decryption; it is fast, so it is used for the actual data, but sharing the key safely is hard. Asymmetric encryption uses a public and private key pair; it is slower but solves key exchange and enables digital signatures. HTTPS combines both: it uses asymmetric crypto to agree on a symmetric session key, then encrypts the data with that fast symmetric key.
:::

### Hashing vs encryption vs encoding

Ye teen alag cheezein hain, log confuse karte hain:

| Point | Hashing | Encryption | Encoding |
|---|---|---|---|
| Kaam | Fixed-size fingerprint banana | Chhupana | Format badalna |
| Reversible? | Nahi (one-way) | Haan (key se) | Haan (bina key) |
| Key chahiye? | Nahi | Haan | Nahi |
| Example | SHA-256, bcrypt | AES, RSA | Base64, URL encode |
| Use | Integrity, password store | Secrecy | Data safely bhejna |

Yaad rakho: **hashing wapas nahi ho sakti** (password store karne ke liye, salt ke saath bcrypt/argon2), **encryption key se wapas** ho jaati hai, **encoding security nahi hai** (Base64 koi bhi decode kar le).

::: warning Common galti
"Base64 encryption hai" ekdum galat. Base64 sirf encoding hai, bina kisi key ke koi bhi decode kar sakta hai. Security ke liye kabhi Base64 par mat depend karo.
:::

## Digital signature aur certificate

**Digital signature**: isse pata chalta hai ki message asli bhejne wale se aaya hai aur beech mein badla nahi gaya. Sender message ka hash banata hai, phir use apni **private key** se encrypt karta hai. Receiver sender ki **public key** se check karta hai. Agar match ho gaya, to message asli hai.

**Digital certificate**: ye ek document hai jo kisi website ki public key ko uski identity se jodta hai. Ise ek bharosemand **CA (Certificate Authority)** sign karti hai.

**Chain of trust**: aapka browser kuch root CAs par bharosa karta hai (pehle se install). Website ka certificate kisi CA ne sign kiya, us CA ko root CA ne sign kiya. Browser is chain ko root tak verify karta hai. Agar chain theek hai, to certificate par bharosa.

::: tip Interview mein aise bolo
A digital signature proves who sent a message and that it was not changed. The sender hashes the message and encrypts the hash with their private key; the receiver verifies it using the sender's public key. A digital certificate binds a website's public key to its identity and is signed by a trusted Certificate Authority, so the browser can verify the server through a chain of trust up to a root CA.
:::

## SSL/TLS <Badge type="danger" text="Most Asked" />

SSL/TLS wo protocol hai jo HTTPS ko secure banata hai. SSL purana naam hai, aaj TLS use hota hai (TLS 1.3 latest common). Ye 3 cheezein deta hai: encryption, authentication (sahi server se baat ho rahi hai), aur integrity.

### TLS 1.3 handshake (simplified)

```text
Client                                   Server
  |  --- ClientHello ------------------->  |
  |     (supported ciphers + key share)    |
  |                                         |
  |  <--- ServerHello + certificate ------  |
  |       (chosen cipher + key share)       |
  |       + Finished                        |
  |                                         |
  |  dono same symmetric key bana lete hain |
  |       (ECDHE key exchange)              |
  |                                         |
  |  <==== encrypted application data ====> |
```

Steps simple shabdon mein:

1. **ClientHello**: client apne supported ciphers aur ek key share bhejta hai.
2. **ServerHello**: server cipher choose karta hai, apna key share aur certificate bhejta hai.
3. Dono taraf same **symmetric session key** ban jaati hai (ECDHE math se), bina key ko wire par bheje.
4. Browser certificate ko root CA tak verify karta hai.
5. Ab saara data us fast symmetric key (jaise AES-GCM) se encrypt ho ke jaata hai.

TLS 1.3 mein ye sab **ek round trip** mein ho jaata hai, isliye fast hai.

::: tip Interview mein aise bolo
TLS secures HTTPS by providing encryption, authentication, and integrity. In the TLS 1.3 handshake, the client and server exchange hello messages with their supported ciphers and key shares, and the server sends its certificate. Using ECDHE, both sides derive the same symmetric session key without sending it over the wire. The browser verifies the certificate up to a trusted root CA, and then all data is encrypted with the fast symmetric key.
:::

::: details Follow-up: TLS mein asymmetric aur symmetric dono kyun use hote hain?
Asymmetric crypto key exchange aur server authentication ke liye hai, par ye slow hai. Symmetric (AES) fast hai par pehle key safely share karni padti hai. Isliye TLS asymmetric se ek symmetric session key safely set karta hai, phir asli data symmetric se encrypt karta hai. Dono ka best mil jaata hai.
:::

## Firewall, IDS/IPS, proxy aur VPN

### Firewall types

Firewall ek security guard hai jo rules ke hisaab se traffic allow ya block karta hai.

| Type | Kaam |
|---|---|
| Packet filtering | IP/port (L3/L4) rules par allow/block |
| Stateful inspection | Connection ko yaad rakhta hai, usi ke hisaab se decide |
| Application/proxy (L7) | Actual content dekhta hai (HTTP level) |
| Next-generation (NGFW) | Sab mila ke + deep inspection, IPS |

Ek **WAF (Web Application Firewall)** khaas web apps ko SQL injection aur XSS jaise attacks se bachata hai.

### IDS vs IPS

| Point | IDS | IPS |
|---|---|---|
| Full form | Intrusion Detection System | Intrusion Prevention System |
| Kaam | Attack detect kar ke alert deta hai | Attack detect kar ke block karta hai |
| Position | Traffic ke side par (monitor) | Traffic ke beech mein (inline) |

Yaad rakho: **IDS sirf chillata hai, IPS rok bhi deta hai**.

### Forward vs reverse proxy

| Point | Forward proxy | Reverse proxy |
|---|---|---|
| Kiski taraf se | Client ki taraf se | Server ki taraf se |
| Kahan baithta | Client aur internet ke beech | Internet aur servers ke beech |
| Example | Office ka proxy, content filter | Nginx, load balancer, CDN |

**VPN**: internet par ek **encrypted tunnel** banata hai, jaise aap private network ke andar ho. Public WiFi par bhi data safe rehta hai. Examples: IPsec, SSL/TLS VPN, WireGuard.

## Common attacks

| Attack | Kya hai | Kaise bachein |
|---|---|---|
| DoS / DDoS | Server par itni requests ki wo baith jaaye | Rate limiting, CDN, scrubbing |
| MITM (Man-in-the-Middle) | Beech mein baith ke data padhna/badalna | Encryption (TLS), certificates |
| Phishing | Fake page/mail se password nikalna | User awareness, MFA |
| IP spoofing | Jhoota source IP lagana | Ingress filtering |
| ARP spoofing | Jhooti MAC-IP mapping se traffic churana | Dynamic ARP inspection |
| DNS spoofing / cache poisoning | DNS cache mein galat IP daalna | DNSSEC, cache validation |
| SYN flood | Aadhe-khule connections se queue bharna | SYN cookies, rate limiting |
| SQL injection | Input mein SQL daal ke DB chalana | Parameterized queries, input validation |
| XSS | Input mein JS daal ke dusre users ke browser mein chalana | Output encoding, CSP, validation |

### SQL injection aur XSS (web layer)

Ye do sabse zyada puchhe jaate hain:

- **SQL injection**: attacker form/URL mein aise input deta hai jo SQL query ka hissa ban jaaye, jaise `' OR '1'='1`. Isse wo login bypass kar sakta hai ya poora DB padh sakta hai. **Bachav**: parameterized queries (prepared statements) use karo, input validate karo, kabhi user input ko seedha query mein mat jodo.
- **XSS (Cross-Site Scripting)**: attacker website mein JavaScript inject karta hai jo baaki users ke browser mein chalta hai (cookie churana, fake form). **Bachav**: output encode karo, input sanitize karo, Content Security Policy (CSP) lagao.

::: tip Interview mein aise bolo
SQL injection happens when user input is put directly into a database query, letting an attacker run their own SQL, for example to bypass login or read the whole database. The fix is to use parameterized queries and validate input. XSS happens when an attacker injects JavaScript that runs in other users' browsers; it is prevented by encoding output, sanitizing input, and using a Content Security Policy.
:::

::: warning Common galti
SQL injection aur XSS ko mila mat do. SQLi database ko target karta hai (server side), XSS doosre users ke browser ko target karta hai (client side mein JS chalta hai). Dono alag hain par dono ka ek common root cause hai: user input par bharosa karna.
:::

::: details Follow-up: DoS aur DDoS mein farak kya hai?
DoS ek source se attack karta hai, DDoS (Distributed) hazaaron compromised machines (botnet) se ek saath. DDoS rokna mushkil hai kyunki traffic bahut saare IPs se aata hai; isliye CDN, rate limiting aur traffic scrubbing services use hoti hain.
:::

## Yaad rakhne layak points

- CIA triad: Confidentiality (encryption), Integrity (hashing), Availability (DDoS ispar vaar karta hai).
- Symmetric = ek key, fast, data ke liye; asymmetric = public/private pair, slow, key exchange aur signature ke liye.
- HTTPS dono use karta hai: asymmetric se key set, symmetric (AES) se data.
- Hashing one-way hai (password store), encryption reversible (key se), encoding (Base64) security nahi hai.
- Digital signature private key se banti hai, public key se verify hoti hai.
- Certificate website ki public key ko CA ke signature se jodti hai; browser root CA tak chain verify karta hai.
- TLS 1.3 handshake ek round trip mein symmetric session key bana leta hai (ECDHE).
- IDS detect+alert, IPS detect+block; forward proxy client ke liye, reverse proxy server ke liye; VPN encrypted tunnel.
- SQL injection = parameterized queries se bachao; XSS = output encoding aur input sanitization se.
- DoS ek source, DDoS kai sources (botnet) se.

## Quick Quiz

<Quiz id="cn-security" title="Network Security Quiz" />
