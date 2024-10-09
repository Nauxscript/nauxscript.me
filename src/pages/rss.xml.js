import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');
  const posts = blog.map((post) => ({
    title: post.data.title,
    pubDate: post.data.createAt,
    link: `/blog/${post.slug}/`,
  }));

  return rss({
    // 输出的 xml 中的`<title>`字段
    title: 'Nauxscript\'s Blog',
    // 输出的 xml 中的`<description>`字段
    description: 'Nauxscript\'s Blog',
    // 从端点上下文获取项目“site”
    site: context.site,
    // 输出的 xml 中的`<item>`数组
    // 有关使用内容集合和 glob 导入的示例，请参阅“生成`items`”部分
    items: posts,
    // (可选) 注入自定义 xml
    customData: `<language>zh-CN</language>`,
  });
}
