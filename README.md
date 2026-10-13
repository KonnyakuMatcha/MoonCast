# MoonCast · MoonBit 纯 P2P 屏幕共享

MoonCast 是参加 [2026 MoonBit 黑客松](https://moonbitlang.github.io/Hackathon2026/) 的作品。它把 Syncast 的核心直播体验压缩成一个可运行、可验证的 MoonBit 浏览器应用：房主共享屏幕和来源声音，观众通过 WebRTC 直接接收，媒体数据不经过服务器。

项目目标不是复刻 Syncast 的全部工程能力，而是先验证一条清晰的 MoonBit + WebRTC 路径：**用 MoonBit 管理客户端状态与协商流程，用浏览器原生能力完成 P2P 传输**。

## 项目亮点

- **MoonBit 承担客户端主逻辑**：房间状态、成员列表、共享状态、offer/answer、trickle ICE、控制消息和 UI 状态更新都在 `cmd/main/main.mbt` 中编排。
- **纯 P2P 媒体链路**：信令服务器只转发 SDP/ICE，不接收、存储或转发画面与声音。
- **STUN 打洞，拒绝 TURN**：默认使用公共 STUN，本地与远端 relay 候选都会被过滤；无法直连时宁可失败，也不悄悄回退到服务器中继。
- **画面与来源声音同传**：通过 `getDisplayMedia` 捕获屏幕视频和标签页/窗口/系统来源音频，满足基础“一起看”场景。
- **初级但完整**：从创建房间、加入房间、开始共享、媒体协商到成员离开，整条链路可以实际运行。

## 当前范围

### 已实现

- 房间创建与 6 位房间码加入
- HTTP 长轮询事件流
- 房主到观众的星型 P2P 连接
- WebRTC offer/answer 协商
- Trickle ICE 候选交换
- ICE 候选早到缓存
- 屏幕视频与来源音频共享
- 房主开始/停止共享、观众接收/释放
- 成员加入、离开与连接状态展示

### 暂不实现

这些能力来自 Syncast 的后续工程化需求，适合在当前基础链路稳定后增量开发：

- 动态树状转发与中继节点选择
- 带宽压力检测和观看质量档位
- 语音 mesh 与独立麦克风
- 音频隔离和回声治理
- 连接健康监控、自动恢复与拓扑重建
- TURN、SFU 或服务器媒体中继

明确不做服务器媒体中继是当前版本的产品边界，也是演示“纯 P2P”的必要条件。

## 技术架构

```text
MoonBit 客户端状态机
        |
        | FFI / event callback
        v
浏览器 API 适配层
        |
        | getDisplayMedia + RTCPeerConnection
        v
观众浏览器 <----- P2P 媒体流 ----- 房主浏览器
        ^
        | SDP / ICE 控制消息
        |
Python 信令服务器
```

### 代码结构

| 路径 | 说明 |
|---|---|
| `cmd/main/main.mbt` | MoonBit 主逻辑：房间、成员、共享、协商与 UI 状态 |
| `static/bridge.js` | 浏览器异步 API 适配层：DOM、fetch、媒体捕获与 WebRTC |
| `static/main.js` | MoonBit 编译产物，由构建脚本生成 |
| `static/index.html` | 演示页面 |
| `static/styles.css` | 页面样式 |
| `server.py` | Python 标准库信令服务器 |
| `scripts/build.sh` | 格式化、检查、测试、编译和产物复制 |

### 为什么需要 JS 桥接层

浏览器将 `getDisplayMedia`、`RTCPeerConnection`、fetch 和 DOM 事件都建模为异步 JavaScript API。MoonBit 目前负责确定性的客户端状态机与协商决策；`bridge.js` 只做薄适配，把这些异步 API 和回调翻译给 MoonBit。这样的边界让核心流程保持在 MoonBit 中，同时不重复造浏览器 API 绑定。

## 快速开始

### 1. 构建

要求本机可运行 `moon`：

```sh
./scripts/build.sh
```

脚本会依次执行：

```text
moon fmt
moon check
moon test
moon build --target js
```

并把编译产物复制到 `static/main.js`。

### 2. 启动服务

本地演示：

```sh
python3 server.py --host 127.0.0.1 --port 8000
```

打开：

```text
http://127.0.0.1:8000/
```

### 3. 演示流程

1. 在第一个浏览器窗口输入昵称，点击 **创建房间**。
2. 复制页面显示的 6 位房间码。
3. 在第二个浏览器窗口或另一台设备输入昵称和房间码，点击 **加入房间**。
4. 房主点击 **共享屏幕和声音**。
5. 在浏览器选择器中选择标签页、窗口或整屏，并按需勾选共享声音。
6. 观众端自动开始播放房主画面和来源声音。
7. 点击 **停止共享** 或 **离开** 验证资源释放。

### 4. 网络与安全上下文

浏览器要求屏幕捕获运行在安全上下文中。`127.0.0.1` 可以直接使用；局域网或公网演示需要 HTTPS：

```sh
python3 server.py \
  --host 0.0.0.0 --port 8443 \
  --tls-cert cert.pem \
  --tls-key key.pem
```

若使用自签证书，需要先在演示设备上信任该证书。

## 验证方式

### 静态检查

```sh
moon check
```

### 单元测试入口

```sh
moon test
```

当前测试入口为空，后续应优先为 MoonBit 状态机补充成员加入/离开、协商消息分发和共享状态迁移测试。

### 端到端冒烟

使用两个真实浏览器页面执行“创建房间 → 加入房间 → 开始共享 → 观众收到两条媒体轨道”。重点确认：

- 观众端 `video.srcObject` 收到视频与音频轨道
- 双方 WebRTC connection state 进入 `connected`
- 停止共享后媒体轨道和 PeerConnection 被释放
- 信令页面显示成员连接状态

本仓库开发过程中已用 Chromium 双页面完成上述链路验证。

## P2P 边界与已知限制

- 默认 STUN 服务器为 `stun:stun.l.google.com:19302`，实际可用性取决于网络环境。
- 对称 NAT 等场景可能无法完成打洞；项目不会回退 TURN。
- 整屏系统声音是否可用由浏览器和操作系统决定。
- 共享系统声音可能包含远端播放声音，当前版本不做音频隔离，演示时建议使用耳机。
- 房间数据保存在信令服务器内存中，服务重启后房间消失。
- 当前版本面向黑客松演示，尚未包含生产级鉴权、限流和部署配置。

## 后续路线

1. **状态机测试**：为 MoonBit 客户端核心补充可自动化测试。
2. **连接恢复**：处理 ICE 断连、renegotiation 和成员重连。
3. **语音轨道**：增加独立麦克风与静音控制。
4. **质量选择**：增加发送参数与接收端观看档位。
5. **浅层树状转发**：在保持纯 P2P 的前提下降低房主上行压力。

## 致谢

项目参考并精简复现了 [Syncast](https://github.com/KonnyakuMatcha/Syncast) 的核心思路。Syncast 提供了更完整的直播协作、健康恢复和拓扑调度设计；MoonCast 将其中最适合黑客松验证的基础 P2P 链路用 MoonBit 重新实现。
