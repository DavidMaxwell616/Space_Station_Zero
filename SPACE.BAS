GOSUB start
sh = 4: clr = 55: men = 20
1 :
SCREEN 13
FOR t = 1 TO 200: r = RND * 320: ry = RND * 170: LINE (r, ry)-(r, ry), 15: NEXT
LINE (0, 170)-(320, 200), 32, BF

LINE (9, 0)-(9, 0), clr: LINE (8, 1)-(9, 1), clr: LINE (7, 2)-(9, 2), clr
LINE (4, 3)-(14, 7), clr, BF: LINE (1, 4)-(3, 4), clr: LINE (0, 5)-(3, 5), clr: LINE (2, 7)-(3, 7), clr
LINE (7, 8)-(9, 9), clr, BF: LINE (9, 10)-(9, 10), clr: LINE (15, 4)-(19, 6), clr, BF: LINE (18, 1)-(19, 9), clr, BF: LINE (19, 0)-(20, 0), clr
LINE (19, 10)-(20, 10), clr: LINE (16, 7)-(16, 7), clr: LINE (5, 4)-(5, 4), 0
DIM shark(200)
GET (0, 0)-(20, 10), shark
PUT (0, 0), shark

LINE (9, 0)-(9, 0), clr: LINE (9, 1)-(10, 1), clr: LINE (11, 2)-(9, 2), clr
LINE (4, 3)-(16, 7), clr, BF: LINE (19, 4)-(15, 4), clr: LINE (20, 5)-(15, 5), clr: LINE (18, 7)-(15, 7), clr
LINE (7, 8)-(9, 9), clr, BF: LINE (7, 10)-(7, 10), clr: LINE (5, 4)-(1, 6), clr, BF: LINE (2, 1)-(1, 9), clr, BF: LINE (1, 0)-(0, 0), clr
LINE (1, 10)-(0, 10), clr: LINE (4, 7)-(4, 7), clr: LINE (15, 4)-(15, 4), 0
DIM sharkii(200)
GET (0, 0)-(20, 10), sharkii
PUT (0, 0), sharkii

LINE (0, 2)-(16, 4), 7, BF
LINE (0, 5)-(16, 5), 15: LINE (1, 1)-(1, 1), 14
LINE (15, 1)-(15, 1), 14
FOR t = 1 TO 16 STEP 2: LINE (t, 3)-(t, 3), 15
LINE (t, 6)-(t, 6), 4
NEXT


DIM ship(200)
GET (0, 0)-(16, 7), ship
PUT (0, 0), ship

LINE (3, 0)-(3, 6), 14: LINE (2, 0)-(2, 2): LINE (4, 0)-(4, 2): LINE (1, 4)-(5, 4): LINE (2, 6)-(2, 9): LINE (4, 6)-(4, 9)
REDIM man(41)
GET (0, 0)-(10, 10), man
RANDOMIZE TIMER
FOR t = 0 TO 20: LINE (0, t)-(20, t), 0: NEXT
shk = 280: shky = 175: oshk = shk: oshky = shky
x = 100: y = 20: c = 0
yv = 1: lx = 5: ly = 5
xv = 0: bv = 1: go = 0
manx = INT(RND * 290): many = 1
FOR h = 1 TO sh: PUT (150 + (h * 27), 5), ship: NEXT
lmx = manx: lmy = many: mv = 1
shkmv = 2
PUT (shk, shky), shark
DO
IF c = 0 THEN PUT (manx, many), man:  c = 1
IF sg = 0 THEN PUT (lx, ly), ship: sg = 1
IF shk = manx THEN PUT (shk, shky), shark: GOTO skip
IF shk > 5 AND manx < shk THEN shkmv = -2: shk = shk + shkmv
IF shk < 280 AND manx > shk THEN shkmv = 2: shk = shk + shkmv
IF shkmv > 0 THEN PUT (shk, shky), sharkii
IF shkmv < 0 THEN PUT (shk, shky), shark
skip:
y = y + yv: yv = yv + .3
IF y < 10 THEN yv = .5
PUT (lx, ly), ship, XOR
PUT (x, y), ship, XOR
lx = x: ly = y
IF POINT(manx + 3, many + 9) = 32 THEN mv = 1
many = many + mv
PUT (lmx, lmy), man
PUT (manx, many), man
IF many > 170 AND many < 180 AND shk < manx + 5 AND shk > manx - 5 THEN GOSUB bite
FOR t = 1 TO 1000: NEXT
IF men = 0 THEN GOTO ENdd
LINE (0, 170)-(320, 200), 32, BF
IF INKEY$ = CHR$(105) AND y > 10 THEN yv = yv - 1
IF INKEY$ = CHR$(106) AND x > 10 THEN xv = xv - 1
IF INKEY$ = CHR$(108) AND x < 290 THEN xv = xv + 1
IF x > 290 THEN x = 10
IF x < 10 THEN x = 290
x = x + xv
IF POINT(x, y + 5) = 32 THEN GOTO crash
IF manx > x - 5 AND manx < x + 25 AND many > y - 10 AND many < y THEN sc = sc + 50: men = men - 1: rsc = rsc + 1: PUT (manx, many), man: many = 1: manx = INT(RND * 300): mv = 1: PUT (manx, many), man
IF INKEY$ = CHR$(32) THEN bd = 1: bx = x: by = y + 3
IF bd = 1 THEN LINE (bx, by)-(bx, by + 3), 14: LINE (bx, by - 5)-(bx, 0), 0: by = by + bv: bv = bv + .5: IF by > shky THEN GOSUB bomb
LOCATE 1, 1: PRINT "score="; sc: LOCATE 2, 1: PRINT "men left :"; men: LOCATE 3, 1: PRINT "men killed"; eat: LOCATE 4, 1: PRINT "men rescued"; rsc
lmx = manx: lmy = many
mv = mv + .05

IF many > 180 THEN men = men - 1: many = 1: eat = eat + 1: mv = 1: manx = INT(RND * 300): PUT (manx, many), man: PUT (manx, many), man
oshk = shk: oshky = shky
LOOP UNTIL INKEY$ = CHR$(27)

crash:
FOR t = 1 TO 200
rx = (x + ((RND * 30) - 10)): ry = y + ((RND * 30) - 10)
LINE (rx, ry)-(rx, ry), 12
NEXT
CLS
sh = sh - 1
IF sh = 0 THEN GOTO ENdd
GOTO 1

bomb:
LINE (bx, 150)-(bx, by), 0
FOR t = 1 TO 200
rx = bx + ((RND * 10) - 5): ry = by + ((RND * 10) - 5)
LINE (rx, ry)-(rx, ry), 12
FOR u = 1 TO 10: NEXT
LINE (rx, ry)-(rx, ry), 32
NEXT
IF bx > shk - 5 AND bx < shk + 20 THEN sc = sc + 100: FOR t = shky TO 185: PUT (shk, t), shark: FOR g = 1 TO 1000: NEXT: PUT (shk, t), shark: NEXT: shk = 290:
bd = 0: bv = 1
LINE (0, 170)-(320, 200), 32, BF
RETURN

bite:
manr = manx + 1
FOR t = 1 TO 200
rx = shk + ((RND * 20) - 10): ry = shky + ((RND * 10) + 5)
LINE (rx, ry)-(rx, ry), 4
NEXT
FOR h = 1 TO 1000
rx = shk + ((RND * 20) - 10): ry = shky + ((RND * 10) + 5)
LINE (rx, ry)-(rx, ry), 32
NEXT
manx = INT(RND * 300): many = 5: mv = 1: PUT (manx, many), man
men = men - 1: eat = eat + 1
LINE (0, 170)-(320, 200), 32, BF
RETURN

start:
CLS : PRINT "****************************** SPACE STATION ZERO ******************************"
PRINT "                     another awesome game produced and created by"
PRINT "*********************** DAVID MAXWELL copyright 10/17/94 ***********************"
PRINT
PRINT "Here's the story:"
PRINT "Space Station Zero is an upper atmospheric experimental laboratory containing"
PRINT "20 of the world leading scientists. One chilly December night, ice developed"
PRINT "in the intake valves of the station's main support system. The station's "
PRINT "fuselage was torn wide open by a oxygen hose that had snapped loose and was"
PRINT "thrashing about. The main bay blew open and spilled all of the scientists out"
PRINT "into the cold night air, thousands of feet above the North Atlantic. Sharks, "
PRINT "intrigued by the falling debris, have gathered to inspect in hope of a free"
PRINT "late night snack. You are Hans Gruber, Captain of the S1-50 Air-to-Air Rescue"
PRINT "Unit Number 30E76 out of Norway. You must catch the falling scientists and "
PRINT "whenever possible, bomb the sharks. If you fail, the world's greatest minds "
PRINT "will be shark bait or forever lost in the icy waters."
PRINT
PRINT "To maneuver the S1-50:"
PRINT "press 'i' to thrust up                   press'j' to go left"
PRINT "press 'l' to go right               press spacebar to drop bombs"
PRINT "Good Luck Captain Gruber, You will need it!!"
PRINT
INPUT "Press enter key to begin"; i$
RETURN

ENdd:
 CLS : PRINT "You rescued "; rsc; " scientists from certain death."
 IF eat > 0 THEN PRINT "Unfortunately "; eat; " perished."
 IF eat > rsc THEN PRINT "You are a disgrace to all Norwegians.   Hang your head in shame. You will be shot at sunrise.": END
IF eat = 0 THEN PRINT "Congratulations! You are an international hero. The future of the world's technology is intact. Drinks on the House!!": END
IF eat < rsc THEN PRINT "Well, you could have done better, but such is the way of mysterious nature, who grants us such brilliant minds, then robs them from us with capricious whim."

