---
slug: how-to-get-coordinate-data
title: How to get coordinate data
authors: yuchi
tags: [mtconnect, sensor, coordinate]
---

A week ago, on October 6th we finally figured out how to get coordinate data from a CNC machine. Sadly, it took us over 2 months to figure it out...

<!--truncate-->

## Why we need coordinate data?
We are building an on-machine CMM system. 
Basically we put a laser distance sensor on the spindle and measure the distance between the sensor and the workpiece.
As you move the sensor, you can detect the edge of the workpiece by monitoring the sensor data.
However, we need to get the sensor position at the edge of the workpiece from the CNC machine.  

![Sensor](./sensor.png)

It was **MTConnect** that helped us get the sensor position.  

We took over 2 months to figure out how to get the axis position from the CNC machine.
I wish I could have had some research on the stardard protocol before I started the project because it knew you need to extract the axis data from day 1.
Then I would have saved a lot of time, but I didn't even know about the industry.
If anyone intend to build a system like this, please check out MTConnect first.  

## What we tried
It's so dumb to look back, but here are the list of protocols I tried before I found MTConnect:
- I2C
- UART
- MSMQ (Microsoft Message Queuing)
- Database

Since the CNC has a serial port, I thought I could get the axis position from the serial port. Turned out to be just a interface to send and receive a G-code file.
We used a logic analyzer to see what was going on in the serial port, but we couldn't find any data.  
Then I tried to use MSMQ to receive any data from the CNC machine to the computer, but it didn't work either.  

Finally, I tried to use a database to store the axis data, but it didn't work either.
Luckily, on the way, we found some useful tricks for exapmple, how to access the CNC machine from a remote computer.
Not just it helps me figure out things easier, but it also improves the efficiency of the process for CNC programmers.

When I was browsing some folders on the CNC machine, I found a folder called "MTConnect" and did some research on it.
Then I found out that MTConnect is a protocol to get data from CNC machines and its default port 7878 was open.
I set up an MTConnect agent on the ubuntu server and created agent.cfg and devices.xml files by referring the docs.
Then I could finally find the axis data from the CNC machine using MetaStudio (MTConnect explorer).

For more about MTConnect, please refer to [docs](/docs/tutorial-basics/mtconnect).
