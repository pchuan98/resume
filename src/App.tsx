import "./index.css";
import ExpandableCard, { ResumeCard } from "@/components/resume/cardex";

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

const HomePage = () => {
  const cards = [
    {
      id: 1,
      title: "自然风光",
      content:
        "这张卡片展示了美丽的自然风光。点击卡片可以查看更多详细信息和更大的图片。自然风光包括山脉、海洋、森林和其他壮观的自然场景。",
      image: "/api/placeholder/800/400",
    },
    {
      id: 2,
      title: "城市景观",
      content:
        "这张卡片展示了现代城市景观。点击卡片可以查看更多详细信息和更大的图片。城市景观包括摩天大楼、街道、公园和其他城市元素。",
      image: "/api/placeholder/800/400",
    },
    {
      id: 3,
      title: "太空探索",
      content:
        "这张卡片展示了太空探索的内容。点击卡片可以查看更多详细信息和更大的图片。太空探索包括行星、星系、宇宙飞船和其他太空元素。",
      image: "/api/placeholder/800/400",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">卡片展开效果演示</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <ExpandableCard
            key={card.id}
            title={card.title}
            content={card.content}
            image={card.image}
          />
        ))}
      </div>
    </div>
  );
};

export function App() {
  return (
    <div className="w-lvw md:w-lvw flex flex-col justify-center gap-y-1 md:gap-y-5 p-2 md:p-10">
      <HomePage />
      <HomePage />
      <HomePage />
      <HomePage />
      <HomePage />

      <HomePage />

      <ResumeCard
        title="测试标题"
        date="测试日期"
        content={markdownContent}
        exContent={markdownContent1}
        expanded={false}
        tags={["python", "demo"]}
      />

      <ResumeCard
        title="测试标题"
        date="测试日期"
        content={markdownContent}
        exContent={markdownContent}
        expanded={false}
        tags={["python", "demo"]}
      />
    </div>
  );
}

export default App;
