/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // 这里配置你的项目文件路径
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}