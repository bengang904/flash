SpecialEvents
{
    // Second weekend (should overwrite daily bonuses)
    date_11_22_2013 = IceEnemiesHardcore
    date_11_23_2013 = AllEnemiesHardcore
    date_11_24_2013 = FireEnemiesMoreXP

    // Thanksgiving Week
    date_11_25_2013 = LegendaryIceDungeon
    date_11_26_2013 = LegendaryIceDungeon
    date_11_27_2013 = LegendaryIceDungeon
    date_11_28_2013 = AllEnemiesMoreXP
    date_11_29_2013 = LegendaryFireDungeon
    date_11_30_2013 = LegendaryFireDungeon
    date_12_01_2013 = LegendaryFireDungeon

    //date_06_26_2014 = LegendaryFireDungeon
    //date_04_02_2014 = LegendaryIceDungeon
}

Weekly
{
    //Monday = FireEnemiesEasier
    //Tuesday = LegendaryIceDungeon
    //Wednesday = IceEnemiesEasier
    //Thursday = IceEnemiesHardcore
    Friday =  IceEnemiesMoreXP
    Saturday = FireEnemiesEasier
    Sunday = NormalEnemiesMoreXP
}

Boss
{
	specialDungeon = 25
	element	= "Ice"
}
//** BONUSES PRESETS **

// All enemies award %150 XP (50% more XP)
AllEnemiesMoreXP
{
    xpPercent = 150
    filter = "All"
}

//All non element enemies award %150 XP (50% more XP)
NormalEnemiesMoreXP
{
    xpPercent = 150
    filter = "Normal"
}

//All Fire enemies award %150 XP (50% more XP)
FireEnemiesMoreXP
{
    xpPercent = 150
    filter = "Fire"
}

//All Ice enemies award %150 XP (50% more XP)
IceEnemiesMoreXP
{
    xpPercent = 150
    filter = "Ice"
}

//Difficult dungeon with Fire enemies only
LegendaryFireDungeon
{
	specialDungeon = 32
	element	= "Fire"
}

//Difficult dungeon with Ice enemies only
LegendaryIceDungeon
{
	specialDungeon = 31
	element	= "Ice"
}

//All enemies 2 levels lower than usual (The lower the easier to beat)
AllEnemiesEasier
{
	enemyExtraLevel = -2
	filter = "All"
}

NormalEnemiesEasier
{
    enemyExtraLevel = -2
	filter = "Normal"
}

//Fire enemies 2 levels lower than usual (The lower the easier to beat)
FireEnemiesEasier
{
	enemyExtraLevel = -2
	filter = "Fire"
}

//Ice enemies 2 levels lower than usual (The lower the easier to beat)
IceEnemiesEasier
{
	enemyExtraLevel = -2
	filter = "Ice"
}

//All enemies are 3 levels higher (The higher the harder to beat)
AllEnemiesHardcore
{
	enemyExtraLevel = 3
	filter = "All"
}

NormalEnemiesHardcore
{
	enemyExtraLevel = 3
	filter = "Normal"
}

//Fire enemies are 3 levels higher (The higher the harder to beat)
FireEnemiesHardcore
{
	enemyExtraLevel = 3
	filter = "Fire"
}

//Ice enemies are 2 levels higher (The higher the harder to beat)
IceEnemiesHardcore
{
	enemyExtraLevel = 2
	filter = "Ice"
}