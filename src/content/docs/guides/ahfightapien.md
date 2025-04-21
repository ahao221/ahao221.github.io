---
title: AhFight API
description: AhFight API.
---

## Integration

```xml
<!-- Add reference in project file (.csproj) -->
<Reference Include="AhFight">
  <HintPath>..\..\AhFight\bin\Win64_Shipping_Client\AhFight.dll</HintPath>
  <Private>False</Private>
</Reference>
```

```csharp
using AhFight;
```

## API Overview

### State Checking

| Method | Description |
|------|------|
| `GetAgentState(Agent agent)` | Get current AH state of the agent |
| `IsAgentInState(Agent agent, AhFightState state)` | Check if agent is in specified state |
| `HasAhFightData(Agent agent)` | Check if agent has AH data initialized |

### Data Retrieval

| Method | Description |
|------|------|
| `GetCurrentAhFight(Agent agent)` | Get current AH value of the agent |
| `GetMaxAhFight(Agent agent)` | Get maximum AH value of the agent |
| `GetAhFightRegen(Agent agent)` | Get AH regeneration rate of the agent |
| `GetStateDescription(AhFightState state)` | Get description text of the state |

### Data Modification

| Method | Description |
|------|------|
| `ModifyAhFight(Agent agent, float amount)` | Modify current AH value |
| `ModifyMaxAhFight(Agent agent, float amount)` | Modify maximum AH value |
| `ModifyAhFightRegen(Agent agent, float amount)` | Modify AH regeneration rate |
| `InitializeAhFightData(Agent agent)` | Initialize AH data for an agent |

### UI Interface

| Method | Description |
|------|------|
| `IsDefaultUIEnabled()` | Check if AhFight UI is enabled |
| `GetAhFightView()` | Get AhFightView instance |
| `GetMainAgentAhFightUIValue()` | Player's current AH value (UI display value) |
| `GetMainAgentMaxAhFightUIValue()` | Get Player's maximum AH value (UI display value) |
| `GetMainAgentAhFightStateText()` | Get Player's current AH state text |

## Code Examples

### Basic Usage

```csharp
// Get agent state
AhFightState state = AhFightAPI.GetAgentState(agent);

// Perform actions based on state
if (AhFightAPI.IsAgentInState(agent, AhFightState.Powerless)) {
    // Handle powerless state...
}

// Modify AH value
float newValue = AhFightAPI.ModifyAhFight(agent, -5f); // Decrease by 5
```

### Damage Modification Example

```csharp
public float ModifyDamageBasedOnAhFight(Agent agent, float damage) {
    if (!AhFightAPI.HasAhFightData(agent)) return damage;
    
    switch (AhFightAPI.GetAgentState(agent)) {
        case AhFightState.Normal: return damage;       
        case AhFightState.Weak:   return damage * 0.85f; 
        case AhFightState.Tired:  return damage * 0.7f;  
        case AhFightState.Powerless: return damage * 0.5f;
        default: return damage;
    }
}
```

### State Monitoring Example

```csharp
private AhFightState _lastState;

public void OnTick(Agent agent, float dt) {
    if (!AhFightAPI.HasAhFightData(agent)) return;
    
    AhFightState currentState = AhFightAPI.GetAgentState(agent);
    if (currentState != _lastState) {
        // Handle state change
        OnStateChanged(agent, _lastState, currentState);
        _lastState = currentState;
    }
}
### UI data acquisition (for making UI)

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
## Support and Contact

Discord: https://discord.gg/cjyBzW3jbn 