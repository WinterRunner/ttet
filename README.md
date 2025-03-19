# 实用工具箱

一个基于Web的实用工具集合，提供多种数据处理和转换功能。

## 功能特性

### 1. SVG转图片工具
- 支持SVG文件转换为PNG、JPEG格式
- 提供实时预览功能
- 可自定义输出图片尺寸
- 支持拖拽上传
- 首页按钮呼吸效果，提升可见性
- 转换完成后自动下载

### 2. Excel数据处理工具
#### 2.1 基础功能
- 支持.xlsx和.xls格式的Excel文件
- 支持拖拽上传
- 实时数据预览
- 可视化的列管理
- 处理结果下载

#### 2.2 数据格式统一功能
- 文本格式转换
  - 全部大写
  - 全部小写
  - 首字母大写
- 时间格式统一
  - YYYY-MM-DD
  - YYYY/MM/DD
  - YYYY-MM-DD HH:mm:ss
  - YYYY/MM/DD HH:mm:ss
  - MM-DD-YYYY
  - DD-MM-YYYY
- 数字格式化
  - 转换为整数
  - 保留1-4位小数
- 字符串转换

#### 2.3 重复数据处理
- 重复数据删除
- 重复数据标记
- 支持多列联合判断重复

#### 2.4 界面功能
- 列显示管理
  - 自定义显示/隐藏列
  - 全选/取消全选
  - 显示列统计信息
- 选定列管理
  - 可视化选择处理列
  - 已选择列标签显示
  - 支持点击取消选择
- 处理状态反馈
  - 处理中动画效果
  - 成功/错误提示
  - 处理结果统计

## 使用说明

### SVG转图片工具
1. 点击或拖拽上传SVG文件
2. 在预览区查看效果
3. 选择输出格式（PNG/JPEG）
4. 设置输出尺寸
5. 点击转换按钮
6. 自动下载转换后的图片

### Excel数据处理工具
1. 点击或拖拽上传Excel文件
2. 在预览区查看数据
3. 使用列管理功能选择需要显示的列
4. 选择数据处理选项：
   - 选择需要统一格式的列
   - 选择格式化类型
   - 选择用于判断重复的列
   - 选择重复数据处理方式
5. 点击"开始处理"按钮
6. 查看处理结果
7. 点击"下载处理后的文件"保存结果

## 技术栈
- 纯前端实现，无需后端服务
- 使用原生JavaScript
- SheetJS库用于Excel文件处理
- 响应式设计，支持移动端访问

## 注意事项
- Excel处理工具支持大多数常见的Excel文件格式
- 建议在处理大文件时保持网页标签页活跃
- 处理后的文件会自动添加时间戳以区分原文件
- 所有数据处理均在本地完成，不会上传到服务器

## 更新日志
### 2024-03-19
- 优化了Excel处理工具的用户界面
- 添加了时间格式统一功能
- 增强了数字格式化功能
- 改进了重复数据处理的准确性
- 优化了首页按钮的呼吸动画效果

## 未来计划
- [ ] 添加批量文件处理功能
- [ ] 支持更多图片格式转换
- [ ] 添加数据分析和可视化功能
- [ ] 优化移动端体验
- [ ] 添加更多实用工具

## 维护说明
在添加新功能时，请确保：
1. 更新本README.md文档
2. 在更新日志中记录变更
3. 更新未来计划清单
4. 补充相关使用说明 