// --- MARTIAL ARTS MOVE DICTIONARY ---
const MOVE_DICTIONARY = {
    "punch": { damage: 12, desc: "Z: Water Punch" },
    "kick":  { damage: 25, desc: "X: Crane Kick" },
    "sweep": { damage: 18, desc: "C: Low Sweep Attack" }
};

// --- GAME ENGINE VARIABLES ---
let playerData = {
    currentChapter: 1,
    unlockedMoves: ["punch", "kick", "sweep"],
    customCombo: ["punch", "kick", "sweep"]
};

let comboStep = 0;
let comboTimer = 0.0;
let activeKeys = {};

// --- INITIALIZE KEYBOARD LISTENERS FOR UBUNTU BROWSER ---
window.addEventListener("keydown", (e) => {
    let key = e.key.toLowerCase();
    activeKeys[key] = true;

    // 🦘 1. SPECIAL F-KEY SIDEJUMPS / DODGES (Hold F + tap direction)
    if (activeKeys['f']) {
        if (key === 'w') { console.log("💨 SIDEJUMP: Forward Dodge!"); return; }
        if (key === 's') { console.log("💨 SIDEJUMP: Backward Dodge!"); return; }
        if (key === 'a') { console.log("💨 SIDEJUMP: Left Dodge!"); return; }
        if (key === 'd') { console.log("💨 SIDEJUMP: Right Dodge!"); return; }
    }

    // 🚀 2. SPACEBAR JUMP
    if (e.key === " ") {
        console.log("🦘 LEAP: Jin jumped into the air!");
    }

    // 🥊 3. Z KEY PUNCH (Triggers Custom 3-Hit Combo Chain)
    if (key === 'z') {
        let targetedMoveName = playerData.customCombo[comboStep];
        let moveData = MOVE_DICTIONARY[targetedMoveName];
        console.log(`★ COMBO HIT ${comboStep + 1} // ${moveData.desc} | Power: ${moveData.damage}`);
        
        comboStep++;
        comboTimer = 0.8; // Give player 0.8 seconds to tap Z again
        
        if (comboStep >= 3) {
            comboStep = 0;
            console.log("🔥 FLUID FINISHER! Full custom combo chain landed successfully!");
        }
    }

    // 👟 4. X KEY KICK
    if (key === 'x') {
        console.log(`💥 Executed: ${MOVE_DICTIONARY["kick"].desc} | Damage: ${MOVE_DICTIONARY["kick"].damage}`);
    }

    // 🧹 5. C KEY LOW SWEEP
    if (key === 'c') {
        console.log(`🧹 Executed: ${MOVE_DICTIONARY["sweep"].desc} | Enemy Knocked Down!`);
    }
});

window.addEventListener("keyup", (e) => {
    activeKeys[e.key.toLowerCase()] = false;
});

// --- CORE GAME LOOP HANDLING W,A,S,D MOVEMENT (60 frames per second) ---
function gameLoop() {
    let movementText = "";
    if (activeKeys['w']) movementText += "Forward ";
    if (activeKeys['s']) movementText += "Backward ";
    if (activeKeys['a']) movementText += "Left ";
    if (activeKeys['d']) movementText += "Right ";
    
    if (movementText !== "" && !activeKeys['f']) {
        // This is where we update coordinates. For now, it logs your smooth translation values
        console.log(`🏃‍♂️ Moving Jin: ${movementText}`);
    }

    // Combo Timer Decay
    if (comboTimer > 0) {
        comboTimer -= 1/60;
        if (comboTimer <= 0) {
            comboStep = 0;
            console.log("Stance Reset: Ready for next combo string.");
        }
    }
    requestAnimationFrame(gameLoop);
}
gameLoop(); // Boot up the engine loop
