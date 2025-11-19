# Spec Kit Initializr

這是一個用於快速重新配置 Spec Kit 環境的 CLI 工具。它可以幫助您在不同的 AI 助手配置之間快速切換，同時保留您的核心設定（如 constitution.md）。

## 功能特點

*   **自動檢測環境**：自動檢查 Git 工作區狀態，防止意外覆蓋未提交的更改。
*   **多平台支持**：支援 Windows (PowerShell) 和 Linux/macOS (Bash) 腳本類型。
*   **廣泛的 AI 支援**：支援多種 AI 助手配置，包括 Claude, Gemini, Copilot, Cursor Agent, Qwen 等。
*   **智能重置**：
    *   自動移除舊的 `.specify` 配置。
    *   使用 `specify init` 重新初始化。
    *   自動恢復 `.specify/memory/constitution.md` 文件（如果存在）。

## 安裝

使用 npm 全局安裝：

```bash
npm install -g @willh/speckit-initialzr
```

## 使用方法

在您的專案根目錄下運行：

```bash
speckit-initialzr
```

或者如果您沒有全局安裝，也可以使用 npx 運行：

```bash
npx @willh/speckit-initialzr
```

### 操作流程

1.  **選擇腳本類型**：根據您的操作系統選擇 PowerShell 或 Bash。
2.  **選擇 AI 助手**：從列表中選擇您想要使用的 AI 助手（例如 claude, gemini, copilot 等）。
3.  **自動執行**：工具將自動清理舊配置並應用新設定。

## 注意事項

*   運行前請確保您的 Git 工作區是乾淨的（沒有未提交的更改）。
*   此工具依賴於 `specify` CLI，請確保環境中已安裝相關依賴。

## 授權

MIT
