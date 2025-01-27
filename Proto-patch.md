Prot-patch




General

- Brand new Annihilation mode added! Players can continue fighting even after their commander is destroyed

- Dynamic alliances gamemode will now correctly break alliances when all other opponents are dead unless "alliance victory" is enabled







Balance:


General

All units now leave the same amount of metal in their wreckage equal to half of their original build cost




<> Commander

<> Base Commander
- `wreckage_health_frac` added and set to 1 (increase from the default 0.5)





Air

- Base Flyer (applies to all air units)
`wreckage_health_frac` increased from 0.7 to 1


- Fabrication Aircraft - EXPERIMENTAL
`max_health` increased from 25 to 100


- Firefly - EXPERIMENTAL
`UNITTYPE_Offense` added
`max_health` increased from 20 to 85
`build_metal_cost` increased from 60 to 100


- Pelican - EXPERIMENTAL
`UNITTYPE_Offense` added


- Icarus
Added `maintain_priority_target` and set it to `false` (the same fix we gave the spark last patch)
`UNITTYPE_Offense` added


- Hornet


- Horsefly - EXPEIMENTAL
removed `AT_Air` 
can now target air units
`splash_damage` increased from 0 to 10
`splash_radius` increased from 0 to 3


- Zeus
`wreckage_health_frac` removed, will now be the same as Base Flyer
`splash_radius` increased from 40 to 50





Structures

- Teleporter 
`max_health` decreased from 9750 to 5000    
`build_metal_cost` increased from 800 to 1000


- Anti-Nuke Launcher
interceptor missile `build_metal_cost` increased from 5000 to 10000













Land

- Base Bot
`wreckage_health_frac` increased from 0.7 to 1

- Base Vehicle
`wreckage_health_frac` increased from 0.7 to 1

- Ares
`wreckage_health_frac` removed, will now be the same as Base Vehicle

- Atlas
`wreckage_health_frac` removed, will now be the same as Base Bot


- Bot Fabricator - EXPERIMENTAL
`energy` use when building decreased from 600 to 525
`metal` use when building decreased from 8 to7

- Stinger - EXPERIMENTAL
removed

- Skitter
`UNITTYPE_Offense` added (will now select with other combat units)

- Colonel
`wreckage_health_frac` removed, will now be the same as Base Bot

- Slammer
`UNITTYPE_Sub` added. Will no longer be ignored by torpedo weapons when submerged

- Locust
`build_metal_cost` increased from 260 to 500
`max_health` increased from 80 to 160
`rate_of_fire` increased from 5 to 10
`surface_and_air` and `underwater` vision increased from 40 to 45


- Gill-E - EXPERIMENTAL
Anti-missile weapon changed from beam to homing. Multiple Gill-Es will no longer try to intercept the same missile



- Stryker - EXPERIMENTAL
`move_speed` decreased from 17 to 15
`max_range` increased from 75 to 80
`WL_Air` added to target layers



- Drifter
`damage` increased from 120 to 125
`initial_velocity` increased from 150 to 200
`target_priorities` updated to
    `Mobile & Advanced`
    `Commander`
    `Mobile - Air`
    `Structure - Wall`
    `Wall`



Sea

 - Base Ship
`wreckage_health_frac` increased from 0.7 to 1

- Typhoon - EXPERIMENTAL
Updated description to reflect it no longer attacks land
`WL_LandHorizontal` target layer removed

- Squall
description updated to reflect new targeting
`build_metal_cost` updated from 90 to 30 to reflect the real metal cost of squalls
`WL_WaterSurface` and `WL_LandHorizontal` target layers removed from the missile weapon
`guard_radius` decreased from 250 to 50
`surface_and_air` and `underwater` view range decreased from 150 to 10
