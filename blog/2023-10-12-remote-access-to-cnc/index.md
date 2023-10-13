---
slug: remote-access-to-cnc
title: Remote Access to CNC
authors: yuchi
tags: [vnc, remote, vpn]
---

About 3 weeks ago, we figured how to access CNC machines remotely so I'd like to share some thoughts on why it's useful and how we did it.

<!--truncate-->

## Why do we need remote access?
Three are a number of reasons why we need remote access:
- We can monitor/control the machine from a remote location
- We can program using a software on a CNC machine remotely
- We can program while sitting at your desk instead of having to be physically present at the machine and stand for long periods of time

Of course, you have to be in front of a machine when you are centering or cleaning for example, 
but you don't need to be there if you're just programming. You can relax at your desk and drink coffee while programming instead.


## How to setup remote access?
Actually, it's quite simple. You just need to set up a VPN and use VNC to access the CNC machine. 
You need VPN to access your company's network from outside the company. 
You can use VNC to access the CNC machine from your computer.  


If you're interested, please refer to the [docs](/docs/category/tutorial---basics)

## How we firgured out
Actually, it took us a while to figure out how to set up remote access.
Once you know how to do it, it's quite simple, but it's not easy to figure out how to do it.

First, we examined an old CNC machine maybe made in ~2010 so it was more than 10 years old.
After we installed Ultravnc on the CNC machine, we tried to access it from our computer. However, it didn't work.
I assumed that the problem was that the firewall was blocking the connection, but I wasn't sure.  

:::tip How to check if port is open
We checked if the firewall was blocking the connection using [nmap](https://nmap.org/).

```bash
nmap -sT -p 5900 <CNC machine IP address>
```
:::

Then, we looked into a newer one made in ~2017. That machines already had VNC installed, so we thought we just needed to set up a VPN, but things didn't go as planned.
We didn't know the inital password for the VNC and we had to reset it, but the password was not reset.
We confirmed the password hash changed in ultravnc.ini file, but that didn't affect running VNC server.

### How to decrypt the password
We ended up decrypting the password using [VNCDecrypt](https://github.com/billchaison/VNCDecrypt) with the following command:

```bash
echo -n <password-hash-on-ultravnc.ini> | xxd -r -p | openssl enc \
-des-cbc --nopad \
--nosalt -K e84ad660c4721ae0 \
-iv 0000000000000000 -d \
-provider legacy -provider default | hexdump -Cv
```

Suprisingly, this worked and we were able to access the CNC machine from our computer without changing the password.