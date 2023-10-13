---
slug: remote-access-to-cnc
title: 远程访问 CNC
authors: yuchi
tags: [vnc, remote, vpn]
---

大约3周前，我们想出了如何远程访问CNC机器，因此我想分享一些想法，说明为什么它有用以及我们如何做到这一点。

<!--truncate-->

## 为什么我们需要远程访问？
三个是我们需要远程访问的许多原因：
- 我们可以从远程位置监视/控制机器
- 我们可以远程使用CNC计算机上使用软件进行编程
- 我们可以坐在您的桌子上时进行编程

当然，例如，您必须在居中或清洁时就在机器前
但是，如果您只是编程，则不必在那里。您可以在桌子上放松身心，然后在编程时喝咖啡。


##如何设置远程访问？
实际上，这很简单。您只需要设置VPN并使用VNC访问CNC计算机即可。
您需要VPN才能从公司外部访问公司的网络。
您可以使用VNC从计算机访问CNC计算机。

如果您有兴趣，请参考[文档](/zh-cn/docs/category/tutorial---basics)

## 我们如何弄清楚
实际上，我们花了一段时间才弄清楚如何设置远程访问。
一旦您知道该怎么做，它就非常简单，但是弄清楚如何做并不容易。

首先，我们检查了一台旧的CNC机器，可能在2010年〜2010年，因此已经有10年以上的历史了。
在CNC计算机上安装Ultravnc后，我们尝试从计算机访问它。但是，它无效。
我以为问题是防火墙阻止了连接，但我不确定。


:::tip 提示如何检查端口是否打开
我们检查了防火墙是否正在使用[nmap](https://nmap.org/)阻止连接。

```bash
nmap -sT -p 5900 <CNC machine IP address>
```
:::

然后，我们调查了2017年〜2017年制造的一个更新的。这些机器已经安装了VNC，因此我们认为我们只需要设置VPN，但是事情并没有按计划进行。
我们不知道VNC的Inital密码，我们必须将其重置，但是密码不是重置的。
我们确认密码在Ultravnc.ini文件中更改了Hash，但这并不影响运行VNC服务器。

### 如何解密密码
我们最终使用[VNCDecrypt](https://github.com/billchaison/VNCDecrypt)解密密码：

```bash
echo -n <password-hash-on-ultravnc.ini> | xxd -r -p | openssl enc \
-des-cbc --nopad \
--nosalt -K e84ad660c4721ae0 \
-iv 0000000000000000 -d \
-provider legacy -provider default | hexdump -Cv
```

令人惊讶的是，这起作用了，我们能够从计算机访问CNC机器而无需更改密码。