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

export function App() {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-wrap justify-center items-center m-10">
        {/* <ExpandableCard /> */}
        {/* <ExpandableCard /> */}

        <Card className="fixed z-50 inset-1/9">
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
                <div>
                  ({" "}
                  <>
                    {/* 可以添加更多内容 */}
                    {Array.from({ length: 50 }).map((_, i) => (
                      <p key={i} className="text-gray-600 mb-4">
                        额外内容 {i + 1}: Lorem ipsum, dolor sit amet
                        consectetur adipisicing elit...
                      </p>
                    ))}
                  </>
                  )
                </div>
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

        <Card className="invisible w-3/4  hover:bg-card/80 transition-all shadow-md hover:shadow-xl hover:scale-105 border transition-all duration-100">
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
