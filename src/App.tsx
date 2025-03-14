import "./index.css";
import { ResumeCard } from "@/components/resume/cardex";

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
    stitcher = cv2dddddddddddddddddddddddddddddddd.Stitcher_create()
    (status, stitched) = stitcher.stitch(images)
    if status == cv2.STITCHER_OK:
        return stitched
    else:
        return None
\`\`\`
  `;

// loop 10 times of markdowncontent
const markdownContent1 = `
${markdownContent}
${markdownContent}
${markdownContent}
${markdownContent}
${markdownContent}
${markdownContent}
${markdownContent}
${markdownContent}
${markdownContent}
`;

export function App() {
  return (
    <div className="w-lvw md:w-lvw flex flex-col justify-center gap-y-1 md:gap-y-5 p-2 md:p-10">
      <ResumeCard
        title="1"
        date="测试日期"
        content={markdownContent}
        exContent={markdownContent1}
        tags={["python", "demo"]}
      />

      <ResumeCard
        title="2"
        date="测试日期"
        content={markdownContent}
        exContent={markdownContent}
        tags={["python", "demo"]}
      />

      <ResumeCard
        title="3"
        date="测试日期"
        content={markdownContent}
        exContent={markdownContent1}
        tags={["python", "demo"]}
      />

      <ResumeCard
        title="4"
        date="测试日期"
        content={markdownContent}
        tags={["python", "demo"]}
      />
    </div>
  );
}

export default App;
