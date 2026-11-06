InitialConfig
{
	inventory = {"SwordStarter","HPPotionSmall"}
	initialExperience = 0
	initialRecipes = {1}
	potion_limit = 3
	onLoseEnergy = 100
	mixAdvices = 6
	advices = 7
	tutorialOn = true
	clearedLevel = 0
}
Bubblegum
{
	losesForAdvice = 3
	mixAdvices = 5
    advices = 14
    delayAdvice = 1
}
ExperienceBonus
{
	critical = 10
	mix = 5
}
FightConfig
{
	countdown = 0.1
	cooldown = 0.1
}
DungeonConfig
{
	height_fighters = 210
	position_finn = 260
	position_enemy = 430
	steps_to_find_enemy = 2
	layer1_pps = 13
	layer2_pps = 8
	layer3_pps = 2
	mist_pps = 1
	//Nunca tocar!
	lenght_step = 185
	start_lenght_step = 36
	end_lenght_step = 100
	pause_btn_x = 50
	pause_btn_y = 225
}
TimelineConfig
{
	lenght = 500
	x = 350
	y = 230
}
MixConfig
{
	potionModifier = 1
	primaryModifier = 1
	secondaryModifier = 0.4
	secondModMaxPercent = 100
}
Leveling_Finn
{
	maxHPMod = 1.23
	attMod = 1.3
	defMod = 1.15
	luckMod = 1.1
}
Leveling_Enemies
{
	maxHPMod = 1.42
	attMod = 1.3
	defMod = 1.3
	luckMod = 1.45
	xpMod = 1.2
}
Damage
{
	VariableAttackPercentage = "10:10"
	CriticalMultiplier = 2
	CriticalFactor = 0.2
	MinimumCritical = 10
	EvadeFactor = 0.3
	MinimumEvade = 10
	LuckCap = 20
	//Element Modifiers
	// Fire vs:
		// Fire
		FvsF_attack = 0.7
		FvsF_defence = 0.7
		// Ice
		FvsI_attack = 1.75
		FvsI_defence = 1.75
		// Normal
		FvsN_attack = 1
		FvsN_defence = 1
	// Ice vs:
		// Fire
		IvsF_attack = 1.75
		IvsF_defence = 1.75
		// Ice
		IvsI_attack = 0.7
		IvsI_defence = 0.7
		// Normal
		IvsN_attack = 1
		IvsN_defence = 1
	// Normal vs:
		// Fire
		NvsF_attack = 1
		NvsF_defence = 1
		// Ice
		NvsI_attack = 1
		NvsI_defence = 1
		// Normal
		NvsN_attack = 1
		NvsN_defence = 1
}