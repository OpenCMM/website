---
sidebar_position: 4
---

# MTConnect

MTConnect is a protocol to get data from CNC machines. It's a read-only protocol, and you can monitor the status of the CNC machine with MTConnect such as the following:
- Spindle speed
- Feed rate
- Tool number
- Axis position
- Alarm

Many CNC machines support MTConnect (ref. [MTConnect Institute](https://www.mtconnect.org/step-2-supported-devices)), so you can get data from them without any additional hardware.

## C++ agent

In order to get data from the CNC machine, you need to install an MTConnect agent (e.g. [C++ agent](https://github.com/mtconnect/cppagent)) on the CNC machine or a computer connected to the CNC machine.
C++ agent is a good choice because it is open source and easy to use.

They publish a windows build on the [release page](https://github.com/mtconnect/cppagent/releases), but since we use ubuntu server, we need to build it ourselves.
The instructions on the official website are a little bit outdated, so you can use this build script instead.

```bash title="build.sh"
#!/bin/bash

# ref. https://github.com/mtconnect/cppagent/blob/main/.github/workflows/build.yml

sudo apt-get install build-essential python3 python3-pip git cmake ruby rake autoconf
python3 -m pip install conan

source ~/.profile
conan profile detect -f

git clone https://github.com/mtconnect/cppagent.git

cd cppagent
mkdir build

conan create . -pr conan/profiles/gcc --build=missing \
-o cpack=True \
-o cpack_destination=build \
-o cpack_name=dist \
-o cpack_generator=TGZ
```
ref. https://github.com/OpenCMM/opencmm/blob/main/mtconnect/build.sh


## How to use
You need two files: `agent.cfg` and `devices.xml`. You can find them on [the official github repository](https://github.com/mtconnect/cppagent/tree/main/demo/agent).


## MetaStudio
MetaStudio is a free MTConnect explorer. You can use it to monitor the status of the CNC machine. You can download it from [here](https://www.metalogi.io/download). It supports Windows and Mac.
![MetaStudio](https://github.com/OpenCMM/website/assets/45054071/97d2c3fa-fe8e-4f9f-9e6d-4589b8228e1c)


After you download and install it, you can connect to the MTConnect agent by entering the IP address of the server running the MTConnect agent. You can check out the demo by entering the url below.

```
https://demo.metalogi.io
```

![MetaStudio Demo](https://github.com/OpenCMM/website/assets/45054071/73b1cc6b-ec11-4a63-acf0-dbfcbbb83a17)


It can visualize the data from the CNC machine with a time-series graph, pie chart, or even 3D graph. 

![MetaStudio line chart](https://github.com/OpenCMM/website/assets/45054071/80be3650-f830-4c5f-b70f-6f0f84c36537)
![MetaStudio pie chart](https://github.com/OpenCMM/website/assets/45054071/79590844-7a36-4f3b-a73f-54b82594083a)
![MetaStudio 3D graph](https://github.com/OpenCMM/website/assets/45054071/de8392e3-ebdb-427b-86a2-a79ce81fded9)

## Applications using MTConnect
By leveraging MTConnect, you can build a lot of applications. Here are some examples:
- smartphone app to monitor the status of the CNC machine
- digital twin
- on-machine CMM (Coordinate Measuring Machine) 
