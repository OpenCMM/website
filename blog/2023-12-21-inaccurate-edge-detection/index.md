---
slug: inaccurate-edge-detection
title: Inaccurate Edge Detection
authors: yuchi
tags: [cnc, MTConnect, CMM]
---

We have done some integration tests as we mentioned in the previous blog post. We have faced some issues due to inaccurate data from MTConnect. We will explain the issue and the solution in this blog post.

<!--truncate-->

## Inaccurate Coordinate Timestamp from MTConnect
As we mentioned in the previous blog post, we use MTConnect to get the axis position and combine it with the sensor data to calculate the edge coordinates. However, we found that the timestamp of the coordinate data from MTConnect is not accurate and seems to be delayed by 3000ms to 4000ms. Luckily, the timestamp from MTConnect seems to be delayed by a constant value, so we can fix it by subtracting the constant value from the timestamp. It works with the step height or slope angle measurement, but it doesn't work with the edge measurement.


## Step Height or Slope Angle Measurement
We have tested the step height and slope angle measurement with the new system. The accuracy of these measurements highly depends on the sensor accuracy. It's all about the distance between the sensor and the workpiece, so you don't need the accurate coordinate data from MTConnect. You can just use the sensor data to calculate the step height or slope angle. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/zrbSc18OP-w?si=C6dOWYH0r76gZY42&amp;start=25" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Step measurement result:
| Height | Measured height |
|----------|----------|
|   3.0   |   3.01   |


As you can see in the above video clip, the sensor value changed from -3.0 to 0.01 when the sensor move across the 3mm height step.


Slope angle measurement result:
| Angle | Measured angle |
|----------|----------|
|   45.0   |    44.884   |

## Solution for Edge Measurement
In order to measure the edge, we need to know the exact position of the sensor when the sensor detects the edge. Like the existing touch probe system, we will figure out how to send a skip signal to the machine when the sensor detects the edge. We will expect the following benefits from the new system:

- More accurate edge measurement
- Faster measurement
- Support for older machines

Since you don't have to estimate the coordinates from the sensor timestamp, you can measure the edge more accurately. Also, as soon as the sensor detects the edge, it will move to the next edge, so you can measure the work faster. Finally, you don't need to use MTConnect to get the axis position, so you can use the system with older machines that don't support MTConnect.

## Some Application Ideas
Not just achieving the accurate measurement, it will allow us to do more flexible measurement with the new system. Here are some ideas:
- Measure the workpiece without the CAD file
- Collusion detection

With the loop and if statement, you can measure the workpiece without the CAD file.

## Next Steps
We will work on the following tasks:
- Send a skip signal to the machine when the sensor detects the edge
- Get the measured edge coordinates from a machine

## Final Words
Thank you for reading this blog post. If you have any questions or ideas, please feel free to contact us at [yuchi@opencmm.xyz](mailto:yuchi@opencmm.xyz?subject=OpenCMM%20Inquiry). We are looking forward to hearing from you.