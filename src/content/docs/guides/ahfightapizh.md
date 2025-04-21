---
title: AhFight API
description: AhFight API.
---

## 引用方式

```xml
<!-- 项目文件(.csproj)中添加引用 -->
<Reference Include="AhFight">
  <HintPath>..\..\AhFight\bin\Win64_Shipping_Client\AhFight.dll</HintPath>
  <Private>False</Private>
</Reference>
```

```csharp
using AhFight;
```

## API 概览

### 状态判断

| 方法 | 描述 |
|------|------|
| `GetAgentState(Agent agent)` | 获取角色当前AH状态 |
| `IsAgentInState(Agent agent, AhFightState state)` | 判断角色是否处于指定状态 |
| `HasAhFightData(Agent agent)` | 检查角色是否已初始化AH数据 |

### 数值获取

| 方法 | 描述 |
|------|------|
| `GetCurrentAhFight(Agent agent)` | 获取角色当前AH值 |
| `GetMaxAhFight(Agent agent)` | 获取角色最大AH值 |
| `GetAhFightRegen(Agent agent)` | 获取角色AH恢复速率 |
| `GetStateDescription(AhFightState state)` | 获取状态描述文本 |

### 数值修改

| 方法 | 描述 |
|------|------|
| `ModifyAhFight(Agent agent, float amount)` | 修改角色当前AH值 |
| `ModifyMaxAhFight(Agent agent, float amount)` | 修改角色最大AH值 |
| `ModifyAhFightRegen(Agent agent, float amount)` | 修改角色AH恢复速率 |
| `InitializeAhFightData(Agent agent)` | 初始化角色的AH数据 |

### UI Interface

| 方法 | 描述 |
|------|------|
| `IsDefaultUIEnabled()` | 检查AhFight UI是否已启用。 |
| `GetAhFightView()` | 获取 AhFightView 实例 |
| `GetMainAgentAhFightUIValue()` | 获取玩家当前的 AH 值（用户界面显示值） |
| `GetMainAgentMaxAhFightUIValue()` | 获取玩家的最大 AH 值（用户界面显示值） |
| `GetMainAgentAhFightStateText()` | 获取玩家当前的 AH 状态文本。 |


## 代码示例

### 基本用法

```csharp
// 获取角色状态
AhFightState state = AhFightAPI.GetAgentState(agent);

// 根据状态执行操作
if (AhFightAPI.IsAgentInState(agent, AhFightState.Powerless)) {
    // 处理无力状态...
}

// 修改AH值
float newValue = AhFightAPI.ModifyAhFight(agent, -5f); // 减少5点
```

### 伤害修改示例

```csharp
public float ModifyDamageBasedOnAhFight(Agent agent, float damage) {
    if (!AhFightAPI.HasAhFightData(agent)) return damage;
    
    switch (AhFightAPI.GetAgentState(agent)) {
        case AhFightState.Normal: return damage;       // 100%
        case AhFightState.Weak:   return damage * 0.85f; // 85%
        case AhFightState.Tired:  return damage * 0.7f;  // 70%
        case AhFightState.Powerless: return damage * 0.5f; // 50%
        default: return damage;
    }
}
```

### 状态监听示例

```csharp
private AhFightState _lastState;

public void OnTick(Agent agent, float dt) {
    if (!AhFightAPI.HasAhFightData(agent)) return;
    
    AhFightState currentState = AhFightAPI.GetAgentState(agent);
    if (currentState != _lastState) {
        // 状态变化处理
        OnStateChanged(agent, _lastState, currentState);
        _lastState = currentState;
    }
}
```
### UI 数据获取（用于制作UI）

```csharp
// Get current player's AH values and state
int currentAhValue = AhFightAPI.GetMainAgentAhFightUIValue();
int maxAhValue = AhFightAPI.GetMainAgentMaxAhFightUIValue();
string stateText = AhFightAPI.GetMainAgentAhFightStateText();

// Check if default UI is enabled
bool isDefaultUIEnabled = AhFightAPI.IsDefaultUIEnabled();

// Directly access the view model
AhFightView view = AhFightAPI.GetAhFightView();
if (view != null) {
    bool isVisible = view.ShowPlayerAhFightStatus;
    // Access more properties...
}
```


## 支持与联系
Discord：https://discord.gg/cjyBzW3jbn