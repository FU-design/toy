# WSL2

WSL2（Windows Subsystem for Linux 2）是微软提供的一个技术，让 Windows 用户可以直接在 Windows 操作系统上运行 Linux 内核和 Linux 应用程序。它是 WSL（Windows Subsystem for Linux）的升级版本，相比于 WSL1，有更高的性能和更好的 Linux 兼容性。

## WSL2 的主要特点

1. **真正的 Linux 内核**：WSL2 使用了微软定制的 Linux 内核，它是一个完整的 Linux 内核运行在 Hyper-V 轻量级虚拟机上，提升了兼容性和性能。
  
2. **更高的文件系统性能**：WSL2 在 I/O 性能上有显著提升，尤其是在处理 Linux 文件系统的任务时，比 WSL1 快得多。

3. **完全支持 Linux 二进制文件**：因为 WSL2 运行的是完整的 Linux 内核，它可以运行绝大多数 Linux 二进制文件，几乎没有兼容性问题。

4. **轻量级虚拟化**：WSL2 使用 Windows 内置的虚拟化技术 Hyper-V，可以更有效地管理系统资源，且启动速度比传统虚拟机快得多。

## WSL2 的常见用途

1. **开发环境**：对于开发者来说，WSL2 提供了一个高效的 Linux 开发环境，无需离开 Windows 系统。它支持大多数 Linux 工具和开发环境，比如 Docker、Node.js、Python、Ruby 等。

2. **命令行工具**：使用 WSL2，可以在 Windows 上方便地运行 Linux 命令行工具，例如 Git、SSH、grep 等。

3. **学习 Linux**：WSL2 是一个学习 Linux 的好工具。用户可以在 Windows 上安装不同的 Linux 发行版（如 Ubuntu、Debian），学习和实验各种 Linux 命令和特性。

## 如何使用 WSL2

使用 WSL2（Windows Subsystem for Linux 2）可以让你在 Windows 系统上运行完整的 Linux 环境，非常适合开发、测试、学习 Linux 等。以下是如何在 Windows 上启用和使用 WSL2 的详细步骤：

### 1. **启用 WSL 功能**

- **步骤**：
     1. 在 Windows 搜索栏中搜索“启用或关闭 Windows 功能”（Turn Windows features on or off）。
     2. 勾选“适用于 Linux 的 Windows 子系统”（Windows Subsystem for Linux）。
     3. 勾选“虚拟机平台”（Virtual Machine Platform），这是 WSL2 运行所需的。
     4. 点击“确定”，并重启电脑以应用更改。

### 2. **安装 WSL2**

- **下载并安装 WSL2 内核**：
     1. 打开 PowerShell，以管理员身份运行。
     2. 输入以下命令来安装或更新 WSL2 内核：

        ```powershell
        wsl --install
        ```

        该命令会安装 WSL、WSL2 内核以及默认的 Ubuntu Linux 发行版。如果已经安装 WSL，但未启用 WSL2，可以执行以下命令指定版本：

        ```powershell
        wsl --set-default-version 2
        ```

     3. **手动指定发行版**（可选）：如果希望安装其他发行版，可以在 Microsoft Store 中搜索并选择合适的 Linux 发行版，如 Debian、Kali Linux 等。

### 3. **设置 Linux 发行版**

- 首次启动 Linux 发行版（例如，Ubuntu）时，需要创建一个用户帐户和密码。
- **更新软件包管理器**：进入 Linux 发行版后，建议执行更新命令：

     ```bash
     sudo apt update && sudo apt upgrade
     ```

### 4. **切换已安装发行版至 WSL2**

- 如果已安装的 Linux 发行版在 WSL1 上运行，可以手动将其切换为 WSL2：

     ```powershell
     wsl --set-version <发行版名称> 2
     ```

     例如，如果安装了 Ubuntu，可以执行：

     ```powershell
     wsl --set-version Ubuntu 2
     ```

### 5. **在 Windows 与 Linux 文件系统间交互**

- **访问 Linux 文件系统**：可以在 Windows 的资源管理器中输入路径 `\\wsl$\Ubuntu`（或你的发行版名称），直接浏览 Linux 文件。
- **访问 Windows 文件系统**：在 WSL2 中，Windows 文件位于 `/mnt/c/` 等目录下。例如，C 盘可通过 `/mnt/c/` 访问。

### 6. **安装常用工具和开发环境**

- 在 WSL2 中安装开发工具与在原生 Linux 环境中相同，以下是一些示例：
  - 安装 Node.js 和 npm：

       ```bash
       sudo apt install nodejs npm
       ```

  - 安装 Python：

       ```bash
       sudo apt install python3 python3-pip
       ```

  - 安装 Git：

       ```bash
       sudo apt install git
       ```

### 7. **使用 Visual Studio Code 与 WSL2 集成**

- 在 Windows 上安装 [Visual Studio Code](https://code.visualstudio.com/)。
- 安装 VS Code 的 **Remote - WSL** 扩展。
- 在终端中，进入 WSL 文件夹后，运行 `code .` 命令，VS Code 会自动连接 WSL 环境，方便直接编辑和调试 Linux 文件。

### 8. **管理 WSL2 设置**

- 查看已安装的发行版列表及其版本：

     ```powershell
     wsl -l -v
     ```

- 设置默认 WSL 版本：

     ```powershell
     wsl --set-default-version 2
     ```

- 关闭特定的 WSL 发行版：

     ```powershell
     wsl --terminate <发行版名称>
     ```

- 关闭所有 WSL 发行版：

     ```powershell
     wsl --shutdown
     ```

### 9. **运行和管理 Linux 服务**

- 可以像在普通 Linux 上一样运行服务和守护进程。例如，启动 MySQL 服务：

     ```bash
     sudo service mysql start
     ```

通过以上步骤，你可以在 Windows 系统中流畅地运行和使用 Linux 的 WSL2 环境，体验到几乎原生的 Linux 功能，同时无需重启或切换系统。
