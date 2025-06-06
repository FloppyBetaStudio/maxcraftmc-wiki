---
title: "MaxCraftMC原版生存服务器游戏规则"
date: 2024-01-01
---

## 服务器特色规则

### MaxCraftMC原版生存服务器规则说明

#### 1. 铁砧系统改进
- **修改说明**：  
  通过数据包修改，移除了铁砧合并物品的限制，取消了等级上限，但保留了经验消耗机制。
  
- **使用方法**：  
  1. 将需要合并的物品放入铁砧  
  2. 点击界面中任意一个物品并移到快捷栏  
  3. 手持物品后重新打开铁砧，将其放回槽位完成合并  

- **保留机制**：  
  - 合并时仍会消耗经验。

---

#### 2. 矿车速度调整
- **修改说明**：  
  通过自定义区块物理引擎，调整了各类轨道支撑方块的速度上限。

- **速度限制**：  
  | 轨道基础方块        | 最大速度 (方块/秒) |  
  |---------------------|------------------|  
  | 蓝冰                | 150             |  
  | 铁块                | 100             |  
  | 磨制安山岩          | 20              |  
  | 磨制闪长岩          | 20              |  
  | 磨制花岗岩          | 20              |

- **特点**：  
  - 支持更高的矿车运行速度。  
  - 提供更多矿车轨道设计可能性。  
  - 保留原版红石兼容性。

---

#### 3. 潜影盒交互优化
- **修改说明**：  
  优化了潜影盒的右键交互逻辑，平衡了便捷性与建筑需求。

- **操作说明**：  
  - **右键**：直接打开潜影盒。  
  - **Shift + 右键**：放置潜影盒方块。

---

#### 4. 盔甲架编辑功能
- **修改说明**：  
  通过数据包实现了全可视化的盔甲架编辑界面。

- **操作步骤**：  
  1. 手持燧石并右键点击目标盔甲架。  
  2. 快捷栏会自动切换为编辑面板。  
  3. 右键选择编辑模式，潜行状态下使用滚轮调整数值。  
  4. 切换出非编辑工具时，快捷栏会自动恢复。

---

#### 5. 经验修补机制优化
- **修改说明**：  
  将经验修补附魔的作用范围扩展到玩家背包内的所有可修复物品。

- **运作逻辑**：  
  - 当玩家手持带有经验修补附魔的装备时触发。  
  - 获取的经验值会自动分配到背包内所有耐久度较低的物品上。

---

#### 6. 禁用特定生物
- **修改说明**：  
  全局禁用了幻翼（Phantom）和蝙蝠（Bat）的自动生成。

---

#### 7. 坐下与站起
- **功能说明**：  
  玩家可以通过交互坐下或站起。

- **操作说明**：  
  - **空手右键点击半砖或楼梯**：坐下。  
  - **按Shift键**：解除坐姿。

---

#### 8. 末影人拾取限制
- **修改说明**：  
  禁用了末影人自动拾取方块的功能，防止其影响玩家建筑和掉落物管理。

- **运作逻辑**：  
  - 末影人将不再自动拾取方块，确保建筑区域的整洁和玩家的构建不受干扰。  

---

#### 9. 单人睡觉跳过夜晚
- **修改说明**：  
  服务器修改了睡觉机制，只需一人睡觉即可跳过夜晚，而非原版要求的至少半数在线玩家睡觉。

---

#### 10. 可提取经验

- **修改说明**：
  玩家可以通过手持空瓶子下蹲右键，将自己的一滴血和一些经验转换成经验瓶。


#### 11. 可举起的载具

- **修改说明**：
  玩家可以通过按住shift+对着载具（船和矿车）长按右键，将其举起。随后可以松手。
  如需将其放下，只需再次按下shift。
