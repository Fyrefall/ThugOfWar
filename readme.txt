libs -> libraries used

assets -> images and sounds

To Do:
Change the name of phaser2.js to phaser.js and delete the current phaser.js in the libs folder
Contact art students and potentially ask for the services of a student to draw the sprites

-------------------------Imp 1-------------------------
Basic functionality:
#--Show two rectangles on either side of the field - colour the left in blue and the right in red
#--Add 5 lanes inbetween the rectangles - colour these in white with black borders
#--Add five buttons to the rectangles one of top of the other
Add an event to the button create a new unit when the button is pressed
Add a variable to the group of user units to force the units to the right
#--Add ai spawning in each lane
#--Add a variable to the group of ai units to force them to the left

-------------------------Imp 2-------------------------
Add health to the two main towers
Prevent units from stacking on top of each other
    - I want them to stacked behind each other to better show a crowd
Add slow but constant unit spawning from right team using rng
Prevent red and blue units from crossing over each other - collisions
As red units spawn move them left

-------------------------Imp 3-------------------------
Add units statistics for health, attack, defense, speed
Potentially add a modifier statistic for all attack defense and speed as well but hide it till implemented
Unit fighting
    - how they interact
    - delay between hits
    - may only attack the unit infront of it
    - health bar decreases on hit
    - once health bar has been depleted, the unit is removed from the game
    - blue team will have a better attack than red for the time being
Add a max unit limit

-------------------------Imp 4-------------------------
Add zone victory conditions
    - Most knockouts
    - Highest score
    - Time survived
    - Spawn limit reached (players can spawn a certain amount of active units but perhaps no more that another numbers worth of units for the duration of the zone)
Add more three zones to the map []---o---[]
    Zone 1: Left Pub
    Zone 2: NML
    Zone 3: Right Pub
Add small barricade to replace the towers if the tower exists in a different zone.
Add Pub health bar
Add Victory conditions
-------------------------Imp 5-------------------------
Add unit upgrades
Improve AI spawning
Add second unit type
Add scrolling when zones change
Add a background for the ground and sky
Add sprites for the two units and towers

-------------------------Imp 6-------------------------
???


Lynda
Sidney14
fella2

TO DO
need to update the location of the beer drop around the kegs... maybe tighten it up a bit
the beer falling need a longer time of life and a faster velocity
the units need to be further down the page
beers need to be bigger
need a wound sound for collisions between ai and unit
need sounds for:
keg
player general
ai general
pub
