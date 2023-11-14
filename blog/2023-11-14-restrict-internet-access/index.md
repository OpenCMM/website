---
slug: restrict-internet-access
title: Quick Way to Restrict Internet Access
authors: yuchi
tags: [dns, cnc, internet, security]
---

When we connect a CNC machine to the our local network, we need to restrict the internet access for security reasons. 

<!--truncate-->

## Why do we restrict internet access?
Three are a number of reasons why we want to restrict internet access:
- to protect the CNC machine from cyber attacks
- to prevent any Windows updates from being installed

First reason is obvious. We don't want to get hacked, but the second one is something we care about more. Software updates can cause problems with the CNC machine. For example, the CNC machine may not be able to boot up after the update.


## How to restrict internet access?
Configuring a firewall is the best way to restrict internet access, but it's not easy to configure a firewall. The quickest way to restrict internet access is to change the DNS server to a non-existent one.  

![DNS server setting](https://github.com/OpenCMM/website/assets/45054071/868cd877-b881-46fc-ad86-8e6454b149c1)

