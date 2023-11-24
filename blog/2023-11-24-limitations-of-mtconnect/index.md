---
slug: limitations-of-mtconnect
title: Limitations of MTConnect
authors: yuchi
tags: [cnc, MTConnect, CMM]
---

On November 22, We did some end-to-end tests using a CNC machine and a laser distance sensor. I haven chaged the core measuring system since the last time we tested, so we were able to measure a work for the first time.

However, we found some limitations of MTConnect. 

<!--truncate-->

## Result
Here are some results of the test.

![arc result](https://github.com/OpenCMM/opencmm/assets/45054071/867ecd68-ee59-438c-bb3d-7b875d806744)


![line result](https://github.com/OpenCMM/opencmm/assets/45054071/629d27ee-8353-48f1-adf8-e4fb4c2c08da)

The results shows that the accuracy is not good enough and more importantly, the edge detection is not stable. We need to figure out why the edge detection is not stable. 



## How we measure the workpiece
Before explaining the limitations of MTConnect, I will explain how we measure the workpiece. We measure the workpiece by moving the sensor along the edge of the workpiece. For example, if we want to measure an edge (1.0, 2.5, -24.0) and the measurement length is 0.5mm, the sensor will move from (1.0, 2.0, -24.0) to (1.0, 3.0, -24.0).

Data sources:
- MTConnect to get the axis position
- Sensor to get the distance between the sensor and the workpiece

The system combines the data from the sensor and the axis position with the timestamp. Since we know the feedrate and the exact position at a specific time from MTConnect, we can calculate the sensor position with the timestamp.

![how-to-estimate-edge-coordinates](https://github.com/OpenCMM/opencmm/assets/45054071/a06782c5-e11f-48ae-aa14-8e292f774e0d)

Also, we can tell the coordinates of the edge in the stl file by checking `line number`. `Line number` is the row number of the GCode you're running. Then we add the actual edge coordinates to the database, calculate the length and width of the work using the edge result, and show the result on the web app.

Now, if you look at the result, the results for line id 1 and 3 are brutally wrong. The difference is more than 30.0mm, but the measurement length is 2.5mm for each edge. The difference shouldn't be larger than 50.0mm if it was possible to measure the workpiece.


## What went wrong?
Feedrate and line number data from MTConnect are inconsistent with the coordinate data. 

GCode:
```gcode
G1 X97.5 Y-43.333 F1000.0 ; line 73
G1 X102.5 Y-43.333 F100.0 ; line 74
M30
```


MTConnect data
```
      x  timestamp            y  timestamp        line  timestamp        feedrate  timestamp
-------  -------------  -------  -------------  ------  -------------  ----------  -------------
 99.002  47:19.666429Z  -86.667  47:19.666429Z      73  47:19.666316Z    33.3333   47:19.666429Z
100.575  47:22.331829Z  -69.98   47:22.331829Z      74  47:22.331711Z     1.66667  47:22.331829Z
100.575  47:22.331829Z  -69.98   47:22.331829Z      74  47:22.331711Z     1.66667  47:22.331829Z
100.575  47:22.331829Z  -69.98   47:22.331829Z      74  47:22.331711Z     1.66667  47:22.331829Z
100.458  47:24.890077Z  -43.333  47:24.890077Z       1  47:24.889885Z     0        47:24.890077Z
100.458  47:24.890077Z  -43.333  47:24.890077Z       1  47:24.889885Z     0        47:24.890077Z
```

MTConnect data has a timestamp for each data. 


If you look at the the last two rows of MTCOnnect data, you can see that the line number is 1, but the x coordinate is 100.458 and its timestamp is 47:24.890077Z, which is after the line number timestamp 47:24.889885Z.  

Also, the feedrate is 0, but it should be 1.66667.

## Temporary solution
We haven't figured out why the data is inconsistent yet. Maybe MTConnect adapter problem, or cppagent misconfiguration, or maybe it's just a bug. We will keep investigating it.


The temporary solutions are the following:
- Ignore the feedrate from MTConnect and use the command feedrate instead
- Double-check the line number

Feedrate value is the same as the command feedrate, so we can use the command feedrate from the line number instead of the feedrate from MTConnect.

In addition, we need to note that the line number is not always correct so we need to double-check the line number whether it's consistent with the axis position.


## Next steps
For the next end-to-end test, we will fix this issue and try to measure the workpiece again. We will also experiment the measurement of a step height and the angle of a slope. Unlike the edge detection where the coordinate data accuracy is important, these measurements would greatly depend the sensor precision. Hope our $300 laser triangulation sensor can do the job.

![step.stl](https://github.com/OpenCMM/opencmm/assets/45054071/30df5a7e-0140-4385-87aa-873ba1c4e375)