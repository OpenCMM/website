---
slug: how-to-get-coordinate-data
title: 如何获取坐标数据
authors: yuchi
tags: [MTConnect, sensor, coordinate]
---

一周前，10月6日，我们终于弄清楚了如何从CNC机器中获取坐标数据。可悲的是，我们花了2个月的时间才弄清楚了...

<!--truncate-->

## 为什么我们需要坐标数据？
我们正在建立一个机上CMM系统。
基本上，我们将激光距离传感器放在主轴上，并测量传感器和工件之间的距离。
当您移动传感器时，您可以通过监视传感器数据来检测工件的边缘。
但是，我们需要从CNC机器的工件边缘获得传感器位置。

![Sensor](./sensor.png)

**MTConnect**有助于我们获得传感器位置。

我们花了2个月的时间来弄清楚如何从CNC机器中获得轴位置。
我希望在开始项目之前，我可以对星德协议进行一些研究，因为它知道您需要从第1天开始提取轴心数据。
然后，我会节省很多时间，但我什至不知道这个行业。
如果有人打算构建这样的系统，请先查看mtconnect。

## 我们尝试了什么
回头看真是太愚蠢了，但这是我在找到mtConnect之前尝试过的协议列表：
- I2C
- UART
- MSMQ (Microsoft Message Queuing)
- 数据库

由于CNC具有串行端口，我认为我可以从串行端口获得轴位置。原来是一个接口发送和接收G代码文件的接口。
我们使用逻辑分析仪查看串行端口中发生的事情，但我们找不到任何数据。
然后，我尝试使用MSMQ接收来自CNC计算机的任何数据到计算机，但它也无效。

最后，我尝试使用数据库存储轴数据，但它也不起作用。
幸运的是，在途中，我们发现了一些有用的技巧，例如如何从远程计算机访问CNC计算机。
它不仅可以帮助我更轻松地找出事情，而且还提高了CNC程序员流程的效率。

当我在CNC机器上浏览一些文件夹时，我找到了一个名为“ MTConnect”的文件夹，并对它进行了一些研究。
然后，我发现MTConnect是从CNC机器中获取数据的协议，其默认端口7878是打开的。
我在Ubuntu Server上设置了MTConnect代理，并通过引用文档创建了agent.cfg和devices.xml文件。
然后，我最终可以使用[Metastudio](https://www.metalogi.io/download)（MTConnect Explorer）从CNC机器中找到轴数据。

有关MTConnect的更多信息，请参阅[docs](/zh-cn/docs/tutorial-basics/mtconnect)。


![MetaStudio](https://github.com/OpenCMM/website/assets/45054071/97d2c3fa-fe8e-4f9f-9e6d-4589b8228e1c)