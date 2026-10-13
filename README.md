# MoonCast

MoonCast 是 [Syncast](https://github.com/KonnyakuMatcha/Syncast) 的 MoonBit 初级复现。当前版本保留核心链路：

- HTTP 房间信令与长轮询事件流
- WebRTC offer/answer 与 trickle ICE 协商
- STUN 打洞，不配置 TURN，也不接受 relay 候选
- 房主到观众的星型 P2P 屏幕共享
- `getDisplayMedia` 中的画面和来源声音

当前刻意不包含 Syncast 的动态树状转发、带宽压力检测、观看质量档位、语音 mesh、麦克风隔离和连接健康恢复。这些能力适合在当前星型链路稳定后逐步增量实现。

## 架构

- `cmd/main/main.mbt`：MoonBit 客户端状态机，负责房间成员、共享状态、offer/answer、ICE 和控制消息编排。
- `static/bridge.js`：浏览器异步 API 适配层，封装 DOM、fetch、`getDisplayMedia` 和 `RTCPeerConnection`。
- `static/main.js`：MoonBit 编译产物，由构建脚本生成。
- `server.py`：Python 标准库信令服务器，只转发 SDP/ICE，不接触媒体数据。

## 构建

```sh
./scripts/build.sh
```

脚本会执行 `moon fmt`、`moon check`、`moon test`、`moon build --target js`，并把产物复制到 `static/main.js`。

## 运行

```sh
python3 server.py --host 127.0.0.1 --port 8000
```

打开 `http://127.0.0.1:8000/`。房主创建房间后点击“共享屏幕和声音”，观众使用房间码加入。

浏览器要求屏幕捕获运行在安全上下文中。`127.0.0.1` 可以直接使用；局域网或公网访问需要 HTTPS：

```sh
python3 server.py \
  --host 0.0.0.0 --port 8443 \
  --tls-cert cert.pem --tls-key key.pem
```

## P2P 限制

当前使用 Google 公共 STUN 服务器。若浏览器或网络只允许 TURN 中继，连接会失败，这是刻意行为，保证媒体不经过服务器。实际可用性仍取决于 NAT 类型、浏览器策略和 STUN 可达性。
