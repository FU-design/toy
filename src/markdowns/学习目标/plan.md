#  自动化&代码规范


### **1. 代码规范相关**
#### **代码格式化**
- 工具：**Prettier**
  - 统一代码风格，例如缩进、分号、引号使用等。
  - 配置 `.prettierrc`，结合 IDE 插件实现保存即格式化。

#### **代码检查**
- 工具：**ESLint**
  - 检查代码中潜在的错误和风格问题。
  - 配合 `eslint-config-airbnb` 或 `eslint-config-standard` 使用通用规则。
  - 可结合 `eslint-plugin-vue` 或 `eslint-plugin-react` 处理框架特定问题。

#### **提交规范**
- 工具：**Commitlint**
  - 检查提交消息是否符合规范（如 Angular 提交消息规范）。
  - 搭配 **Husky** 在 `commit-msg` 阶段执行。
- 工具：**lint-staged**
  - 针对 Git 暂存区文件运行 Linter 或格式化工具。

---

### **2. 自动化相关**
#### **代码构建**
- 工具：**Vite/Webpack**
  - 熟悉构建工具的配置和插件使用（如 CSS 预处理器支持、文件压缩、Tree Shaking）。

#### **持续集成/交付（CI/CD）**
- 工具：**GitHub Actions / GitLab CI / Jenkins**
  - 在代码推送、合并时自动执行代码检查、测试和构建。
  - 基本任务：
    - 安装依赖
    - 执行 ESLint 和 Prettier 检查
    - 运行单元测试和构建流程。

---

### **3. 自动化测试**
#### **单元测试**
- 工具：**Vitest / Jest**
  - 针对组件或方法的独立测试。
  - 测试覆盖率是关注的重点。

#### **端到端测试**
- 工具：**Playwright / Cypress**
  - 模拟用户行为，测试应用的整体功能。

---

### **4. 常用配置文件**
- `.eslintrc`: ESLint 配置文件。
- `.prettierrc`: Prettier 配置文件。
- `.husky`: Husky 钩子目录。
- `package.json`: 脚本自动化和工具依赖管理。

---

### **5. 持续学习和优化**
#### **重要的自动化工具和方法**
- **Husky**: 配置 Git Hooks，自动化代码规范检查。
- **TurboRepo** 或 **Lerna**: 管理 monorepo 的多项目构建。
- **Renovate**: 自动更新依赖版本。

#### **社区资源**
- [Airbnb JavaScript 风格指南](https://github.com/airbnb/javascript)
- [Google JavaScript 风格指南](https://google.github.io/styleguide/jsguide.html)
- [前端工程化实践](https://engineering.alibaba.com/)
