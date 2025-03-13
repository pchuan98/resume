import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import "./index.css";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import MarkdownRenderer from "./components/resume/markdown";

function MyComponent() {
  const markdownContent = `
- 使用 **OpenCV**，结合 **C#/C++** 进行算法定制与优化，解决拼接过程中的性能瓶颈与精度问题。
- **优化拼接流程**，重构图像预处理、特征提取及拼接逻辑，提高拼接速度和结果的平滑性。
- **适配更多图像类型**，扩展算法对不同分辨率、对比度和光照条件图像的兼容性，提升适用范围。
- **重写相机参数估计模块**，改进畸变校正和图像对齐精度，确保拼接结果的一致性与可靠性。
- 独立开发**拼接模块**，实现高内聚、易复用的设计，便于在不同显微镜成像平台中的集成。


\`\`\`python
import cv2
import numpy as np
def stitch_images(images):
    stitcher = cv2.Stitcher_create()
    (status, stitched) = stitcher.stitch(images)
    if status == cv2.STITCHER_OK:
        return stitched
    else:
        return None
\`\`\`
  `;

  return (
    <div className="container mx-auto p-4">
      <MarkdownRenderer content={markdownContent} />
    </div>
  );
}

export function App() {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-wrap justify-center items-center m-10">
        {/* <ExpandableCard /> */}
        {/* <ExpandableCard /> */}

        <Card className="fixed z-50 inset-1/9 ">
          <CardContent className="h-full w-full">
            <div className="h-full w-full flex flex-col ">
              <div className="h-10 flex justify-between">
                <text className="text-1xl font-bold">
                  基于显微镜成像的大图拼接算法设计与优化
                </text>
                <text className="text-1xl font-bold justify-end">
                  1992.12.12
                </text>
              </div>
              <Separator />

              <ScrollArea className="flex-grow flex items-center justify-center h-1/3 m-3">
                {MyComponent()}
              </ScrollArea>
              <Separator className="my-2" />
              <div className="h-8 flex items-center justify-end">
                <Badge variant="outline" className="px-5">
                  Python
                </Badge>
                <Badge variant="outline" className="px-5 mx-1">
                  C#
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="fixed z-50 inset-1/9 invisible">
          <CardContent className="transition-none"></CardContent>
          <CardFooter>
            <div className="flex justify-end">
              <Badge variant="outline" className="bg-red-100 px-5">
                没做完xx
              </Badge>
            </div>
          </CardFooter>
        </Card>

        <Card className=" w-3/4 invisible hover:bg-card/80 transition-all shadow-md hover:shadow-xl hover:scale-105 border transition-all duration-100">
          <CardContent>
            <div className="flex justify-between">
              <text className="text-1xl font-bold">项目名称</text>
              <text className="text-1xl font-bold justify-end">1992.12.12</text>
            </div>
            <Separator className="my-2" />

            <p className="text-gray-600 mb-4">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum
              odio veniam possimus eum modi sapiente ab. Minus perspiciatis
              magnam recusandae? Similique, laboriosam nobis nihil possimus
              facilis in adipisci repellat quo. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Id quos odit natus amet nulla ullam
              velit. Recusandae natus est commodi saepe tempora minus eaque
              mollitia aliquid quam, animi, vitae accusamus.
            </p>

            <p className="text-gray-600 mb-4">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum
              odio veniam possimus eum modi sapiente ab. Minus perspiciatis
              magnam recusandae? Similique, laboriosam nobis nihil possimus
              facilis in adipisci repellat quo. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Id quos odit natus amet nulla ullam
              velit. Recusandae natus est commodi saepe tempora minus eaque
              mollitia aliquid quam, animi, vitae accusamus.
            </p>

            <p className="text-gray-600 mb-4">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum
              odio veniam possimus eum modi sapiente ab. Minus perspiciatis
              magnam recusandae? Similique, laboriosam nobis nihil possimus
              facilis in adipisci repellat quo. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Id quos odit natus amet nulla ullam
              velit. Recusandae natus est commodi saepe tempora minus eaque
              mollitia aliquid quam, animi, vitae accusamus.
            </p>

            <div className="flex justify-end">
              <Badge variant="outline" className="bg-red-100 px-5">
                没做完xx
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
