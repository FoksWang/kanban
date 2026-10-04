# 架构与范围

## 首版业务能力

1. 用户注册、登录和会话恢复。
2. 工作空间（Workspace）的创建、切换与成员入口。
3. 看板（Board）的创建、列表页与基础设置。
4. 列表（List）的创建、编辑、删除与排序。
5. 卡片（Card）的创建、编辑、删除，支持跨列表拖拽。
6. 卡片详情：描述、截止日期、标签、附件和评论（按阶段逐步加入）。

## 前端职责划分

```
src/
  app/           路由、Providers、应用初始化
  features/      按业务域组织的页面、组件、hooks 与请求
  components/    可复用 UI 组件
  stores/        Zustand：仅放客户端 UI 状态
  services/      API client、接口类型与请求封装
  lib/           通用工具、校验 schema、常量
  test/          测试初始化与测试工具
```

## 状态策略

- 服务端数据：TanStack Query 负责缓存、失效和请求状态。
- 客户端 UI 状态：Zustand 用于侧栏开关、当前工作空间等短期状态。
- 表单状态：React Hook Form + Zod；表单提交成功后使对应 Query 失效。
- 拖拽：dnd-kit 仅管理交互过程；落点确认后通过 mutation 持久化并处理失败回滚。

## 关键设计原则

- feature-first：业务代码不按组件类型散落。
- API 层可替换：初期可用 mock server，后续无缝替换为真实后端。
- 组件先可访问：键盘操作、焦点管理和语义标签是验收项。
- 不将服务器数据复制到 Zustand，避免双数据源。
