---
slug: remote-access-to-cnc
title: マシニングセンタにリモートでアクセス
authors: yuchi
tags: [vnc, remote, vpn]
---

約3週間程前、マシニングセンタに初めてリモートでアクセスすることができました。今回はなぜそれが役立つのか、どのように設定したかについて紹介します。

<!--truncate-->

## なぜリモートアクセスが必要か？
リモートアクセスが必要な理由は以下の通りです。
- 遠隔地からマシンを監視/制御できます
- マシニングセンタでソフトウェアを使用してリモートでプログラムできます
- マシニングセンタの前で長期間立つ必要がなく、机に座ってプログラムすることができます

もちろん、芯出しや掃除をしているときは、マシニングセンタの前にいる必要がありますが、ただプログラミングしているなら、そこにいる必要はありません。
プログラミング中に机でリラックスしてコーヒーを飲むことができます。


## リモートアクセスをセットアップする方法
実は非常に簡単です。 VPNを設定し、VNCを使用してマシニングセンタにアクセスする必要があります。
会社の外部から会社のネットワークにアクセスするには、VPNが必要です。
VNCを使用して、コンピューターからマシニングセンタにアクセスできます。


詳しくは、[docs](/ja/docs/category/tutorial---basics)を参照してください。


## どのように設定したか
実際、リモートアクセスを設定するのに時間がかかりました。一度設定の仕方が分かれば、非常に簡単ですが、初めてだったためやや手間取りました。

まず、10年以上前の2010年くらいに作られた古いマシニングセンタを調べたました。
マシニングセンタにUltravNCをインストールした後、コンピューターからアクセスしようとしましたがうまくいきませんでした。
問題は、ファイアウォールが接続をブロックしていることだと思っていましたが、今でも原因はよくわかっていません。


:::tip ポートが開いてるか調べる方法
[nmap](https://nmap.org/)を使用してファイアウォールが接続をブロックしているかどうかを確認しました。

```bash
nmap -sT -p 5900 <マシニングセンタのIPアドレス>
```
:::

次に、2017年に作られた新しいマシニングセンタを調べました。そのマシンにはすでにVNCがインストールされていたため、あとはVPNをセットアップするだけと思いました。
Ultravncの初期パスワードがわからなかったためリセットしましたが、パスワードはリセットされていませんでした。
ultravnc.iniファイルのパスワードのハッシュは変更していましたが、現在実行中のVNCサーバーの設定を変えることができていなかったのです。

### パスワードを復号化する方法
次のコマンドで[VNCDecrypt](https://github.com/billchaison/VNCDecrypt)でパスワードを復号化することになりました。

```bash
echo -n <password-hash-on-ultravnc.ini> | xxd -r -p | openssl enc \
-des-cbc --nopad \
--nosalt -K e84ad660c4721ae0 \
-iv 0000000000000000 -d \
-provider legacy -provider default | hexdump -Cv
```

このコマンドで初期パスワードが判明し、パスワードを変更せずにパソコンからマシニングセンタにアクセスすることができました。