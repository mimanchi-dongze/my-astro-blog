---
title: "SQL从基础到复杂嵌套的实战大汇总"
description: "本文以经典的S-P-J-SPJ数据库为例，详细解选择、投影、连接、除运算及复杂嵌套查询的SQL与关系代数转换全过程。"
publishedAt: "2026-03-25T01:05:47+08:00"
pubDate: "2026-03-25"
heroImage: ""
tags: ["sql", "relational-algebra", "database", "advanced-tutorial"]
---

在数据库的学习与实际开发中，深刻理解“关系代数”是写出高效、精准 SQL 语句的基石。关系代数是一种抽象的查询语言，它通过对关系的运算来表达查询要求。而 SQL 则是集关系代数和关系演算双重特点于一体的标准语言。

今天，我们将通过一篇“大汇总”的博客，将之前零散的操作（选择、投影、各种连接、集合查询、嵌套子查询、分组统计等）融会贯通。我们将结合具体的复杂业务场景，把它们**全部用关系代数和 SQL 语句写一遍**！

## 0. 前置知识点：经典 S-P-J-SPJ 数据库结构

在开始写出复杂的“天书”级 SQL 和公式之前，我们必须先明确我们的数据基座（即关系模式）。我们将采用经典的供应商-零件-工程项目数据库：

1. **供应商表 S (SNO, SNAME, STATUS, CITY)**：包含供应商代码、姓名、状态、所在城市。
2. **零件表 P (PNO, PNAME, COLOR, WEIGHT)**：包含零件代码、零件名、颜色、重量。
3. **工程项目表 J (JNO, JNAME, CITY)**：包含工程代码、工程名、所在城市。
4. **供应情况表 SPJ (SNO, PNO, JNO, QTY)**：表示某供应商供应某种零件给某工程的数量。

*(注：下文所有的查询操作均基于以上四张基本表展开。)*

---

## 1. 基础热身：选择 ($\sigma$) 与投影 ($\pi$)

**操作本质**：选择是从“行”的角度筛选满足条件的元组，投影是从“列”的角度提取指定的属性。

**实战场景**：查找所在城市为“北京”且状态值大于 15 的供应商代码和供应商姓名。
*   **关系代数**：$\pi_{SNO, SNAME}(\sigma_{CITY='北京' \wedge STATUS > 15}(S))$
*   **SQL 语句**：
    ```sql
    SELECT SNO, SNAME 
    FROM S 
    WHERE CITY = '北京' AND STATUS > 15;
    ```

---

## 2. 核心纽带：多表连接查询 ($\bowtie$)

**操作本质**：连接操作是从两个关系的笛卡儿积中选取属性间满足一定条件的元组。当比较条件为“=”时称为等值连接，在等值连接基础上把重复的属性列去掉即为自然连接。

**实战场景**：求供应工程 J1 零件为红色的供应商号码 SNO。
*   **分析**：目标是 SNO（SPJ表），条件是工程 J1（SPJ表）和红色（P表）。这需要 SPJ 和 P 两张表通过 PNO 进行自然连接。
*   **关系代数**：$\pi_{SNO}(\pi_{SNO, PNO}(\sigma_{JNO='J1'}(SPJ)) \bowtie \pi_{PNO}(\sigma_{COLOR='红'}(P)))$
*   **SQL 语句**：
    ```sql
    SELECT SNO 
    FROM SPJ, P 
    WHERE JNO = 'J1' AND SPJ.PNO = P.PNO AND P.COLOR = '红';
    ```

---

## 3. 排除法神器：差集 ($-$) 与 NOT EXISTS

**操作本质**：差集运算 $R - S$ 返回属于 R 而不属于 S 的所有元组。在 SQL 中，通常使用 `NOT IN` 或 `NOT EXISTS` 谓词（带有 EXISTS 谓词的子查询不返回数据，只产生逻辑真值或假值）来实现。

**实战场景**：求没有使用天津供应商生产的红色零件的工程项目代码 JNO。
*   **分析**：先找出所有工程，再减去（差运算）那些使用了天津供应商提供的红色零件的工程。
*   **关系代数**：$\pi_{JNO}(J) - \pi_{JNO}(\pi_{SNO}(\sigma_{CITY='天津'}(S)) \bowtie \pi_{SNO, PNO, JNO}(SPJ) \bowtie \pi_{PNO}(\sigma_{COLOR='红'}(P)))$
*   **SQL 语句**（利用相关嵌套查询）：
    ```sql
    SELECT JNO 
    FROM J 
    WHERE NOT EXISTS (
        SELECT * 
        FROM SPJ, S, P 
        WHERE SPJ.JNO = J.JNO 
          AND SPJ.SNO = S.SNO 
          AND SPJ.PNO = P.PNO 
          AND S.CITY = '天津' 
          AND P.COLOR = '红'
    );
    ```

---

## 4. 终极Boss：除运算 ($\div$) 与 双重 NOT EXISTS

**操作本质**：除运算适合处理自然语言中带有“全部”、“所有”、“至少包含”字眼的查询。SQL 中没有直接的除号，需要利用代表存在量词的 `EXISTS` 进行逻辑蕴涵的转换（即“不存在这样的情况：条件A发生，且条件B没发生”）。

**实战场景**：求至少用了供应商 S1 所供应的全部零件的工程项目代码 JNO。
*   **分析**：用 SPJ 表中的（工程号，零件号）去“除以”供应商 S1 供应的（零件号）。
*   **关系代数**：$\pi_{JNO, PNO}(SPJ) \div \pi_{PNO}(\sigma_{SNO='S1'}(SPJ))$
*   **SQL 语句**：逻辑转换为“不存在这样一个零件，它由S1供应，且工程 J 没有使用它”。
    ```sql
    SELECT DISTINCT JNO 
    FROM SPJ SPJX 
    WHERE NOT EXISTS (
        SELECT * 
        FROM SPJ SPJY 
        WHERE SNO = 'S1' 
          AND NOT EXISTS (
              SELECT * 
              FROM SPJ SPJZ 
              WHERE SPJZ.PNO = SPJY.PNO 
                AND SPJZ.JNO = SPJX.JNO
          )
    );
    ```

---

## 5. 超越关系代数：分组、聚合与模糊排序的超级联合

*(注：标准关系代数没有专门的排序和分组聚集操作符号，而在 SQL 中这是数据分析的绝对主力。因此下面这一段主要展示 SQL 的强大综合能力。)*

**操作本质**：利用 `GROUP BY` 按列分组，利用 `HAVING` 筛选分组（注意不能用 WHERE），利用聚集函数（如 SUM, COUNT）进行统计，利用 `LIKE` 进行字符串模糊匹配，利用 `ORDER BY` 排序最终结果。

**实战复杂场景**：
我们想要查找：**工程名以“厂”字结尾（比如弹簧厂、造船厂）的工程中，其使用的各种零件的总数量超过 500 的工程名、以及对应的零件总数，并按总数量从大到小降序排列。**

*   **逻辑拆解**：
    1. `JOIN`: 连接工程表 J 和供应表 SPJ 以获取工程名和数量。
    2. `WHERE ... LIKE`: 用 `%厂` 过滤以“厂”结尾的工程。
    3. `GROUP BY`: 按照工程名进行分组。
    4. `HAVING`: 对分组后的结果用 `SUM(QTY) > 500` 进行筛选。
    5. `ORDER BY`: 用 `DESC` 降序排列。

*   **全家桶 SQL 语句**：
    ```sql
    SELECT J.JNAME, SUM(SPJ.QTY) AS 总数量
    FROM SPJ 
    JOIN J ON SPJ.JNO = J.JNO
    WHERE J.JNAME LIKE '%厂'
    GROUP BY J.JNAME
    HAVING SUM(SPJ.QTY) > 500
    ORDER BY SUM(SPJ.QTY) DESC;
    ```

## 总结

从最基础的 $\sigma$ 和 $\pi$，到复杂烧脑的 $\div$ 与 `双重 NOT EXISTS`，再到现代业务报表必不可少的 `GROUP BY` 和 `HAVING`，SQL 将严谨的数学逻辑完美封装在了接近英语语法的陈述句中。

掌握了关系代数，你就拥有了 SQL 的“内功心法”；熟练使用各类谓词和子句，你就掌握了数据的“百变招式”。希望这篇大汇总能帮你彻底打通数据库查询的任督二脉！