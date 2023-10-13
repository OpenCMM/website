---
sidebar_position: 1
---

# Connect CNC machines
In order to communicate with CNC machines, you need to connect them to the network.
Typically, CNC machines have a LAN port in the back of the machine or inside the control panel, 
so you can connect them to the network using a LAN cable.

:::caution
Please do at your own risk. We are not responsible for any damage caused by following this tutorial.
:::

If you connect the CNC machine to the network, you can do the following:
- Send G-code files to the CNC machine
- Monitor the status of the CNC machine with MTConnect
- Access the CNC machine from your computer using VNC


## How to connect CNC machines to your computer
If you don't have a long LAN cable or you don't want the machine to be connected to the network, you can connect the machine to your laptop. 

That case your laptop and CNC machine need IPs in the same subnet. You can find the IP address of some CNC machines on the "Setting" menu or something similar. 
If you can't find it, you can use the following method to find the IP address of the CNC machine.

1. Insert a keyboard and mouse into the CNC machine USB port
2. Push windows key on the keyboard
3. Type `cmd` and press enter
4. Type `ipconfig` and press enter

:::tip Tip
Many CNC machines have USB ports on the control panel to send G-code files which can be also used to control the CNC machine with a keyboard and mouse.
:::

### Connect to Ubuntu server
Here is the example of connecting to Ubuntu server. We assume that you have already installed Ubuntu server on your computer.
#### 1. Edit the network configuration file with the following command
```bash
sudo vim /etc/netplan/99_config.yaml
```

If the CNC machine IP address is 168.254.0.1/24, the configuration file should look like this:

```yaml title="/etc/netplan/99_config.yaml"
# This is the network config written by 'subiquity'
network:
  version: 2
  renderer: networkd
  ethernets:
    enp2s0: # ethernet interface on your computer
      dhcp4: false
      addresses: 
        - 169.254.0.60/24 # IP address of the ethernet interface on your computer
      routes:
        - to: default
          via: 192.168.0.19 # IP address of the wifi interface on your computer
      nameservers:
        addresses: [192.168.0.19] # IP address of the wifi interface on your computer

```

:::tip Tip
You can set any IP address you want as long as it is in the same subnet as the CNC machine. For more about `subnet`, please refer to [this](https://www.cloudflare.com/learning/network-layer/what-is-a-subnet/).
:::

:::note Note
A CNC machine can have multiple IP addresses depending on the number of network interfaces. If you can't connect to the CNC machine, try changing the IP address.
:::


#### 2. Apply the configuration
```bash
sudo netplan apply
```

#### 3. Confirm the connection  
You can check the connection by pinging the CNC machine IP address.
```bash
ping 169.254.0.1
```


## Next step
Now you are ready to enjoy the benefits of connecting CNC machines to the network like remote accesss and MTConnect which we will explain in the other sections.