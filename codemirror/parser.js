// This file was generated by lezer-generator. You probably shouldn't edit it.
import {LRParser} from "@lezer/lr"
import {tokenizer, ctxTracker} from "./tokenizer"
export const parser = LRParser.deserialize({
  version: 13,
  states: "9OOQOROOOuORO'#CiOOOP'#Cu'#CuO}ORO'#CjO#aORO'#CjO#hORO'#CjO$tORO'#CjO%OORO'#CjO%kORO'#CrOOOP'#DS'#DSO&OORO'#DSQ&^OROOOOOP,59T,59TO%YORO,59`OOOP-E6s-E6sO&fORO,59UO#hORO,59UO'OORO,59UO'YORO,59UOOOP'#Cv'#CvO'dORO'#CvO'{ORO'#CmO%YORO'#CkO(^OTO'#CmO)jORO'#DUO)RORO'#DUOOOP,59U,59UO!lORO,59UO)qORO'#CmO*SOTO'#CmO*tORO'#CqO+YOQO'#CqO+_ORO'#D`O%YORO'#D`O,[ORO'#D`O,fORO'#ClO-YOTO'#ClO-gOQO'#CnO-}ORO,59UO.UORO'#ClO.gOTO'#ClO.wORO'#DeOOOP,59^,59^OOOP,59n,59nOQORO'#C|Q&^OROOOOOP1G.z1G.zOOOP1G.p1G.pO!lORO1G.pO/YORO1G.pOOOP,59Y,59YO/aOQO,59YOOOP-E6t-E6tO/iOTO,59XOOOP,59V,59VOOOP'#Cw'#CwO/iOTO,59XO0^ORO,59XO0oORO,59YO0wOPO'#CoO0|ORO'#CyO1gORO,59pO1xORO,59pO2SORO,59pO2ZOTO,59XO2ZOTO,59XO2{ORO,59XO3^ORO'#DbO3rOSO'#DbO3}OQO,59]O*tORO,59]O4SORO'#CzO4pORO,59zO5RORO,59zO5]ORO,59zO5dORO,59zO%YORO,59zO5nOTO,59WO5nOTO,59WO6YORO,59WO6kORO1G.pO6|OTO,59WO6|OTO,59WO%YORO,59WO7kORO'#C{O8RORO,5:POOOP,59h,59hOOOP-E6z-E6zOOOP7+$[7+$[O8dORO7+$[O8uORO'#CxO9TOQO1G.tOOOP1G.t1G.tO9]OTO1G.sO0^ORO1G.sOOOP-E6u-E6uOOOP1G.s1G.sO9TOQO1G.tO:QOQO,59ZO:nORO,59eO:VORO,59eOOOP-E6w-E6wO:uORO1G/[O:uORO1G/[O;WORO1G/[O;_OTO1G.sO2{ORO1G.sOOOP1G.v1G.vO<POSO,59|O<POSO,59|O*tORO,59|OOOP1G.w1G.wO<[OQO1G.wO<aORO,59fO%YORO,59fO<xORO,59fOOOP-E6x-E6xO=SORO1G/fO=SORO1G/fO=eORO1G/fO=lORO1G/fO=vORO1G/fO>cOTO1G.rO6YORO1G.rOOOP1G.r1G.rO>pOTO1G.rO%YORO1G.rOOOP,59g,59gOOOP-E6y-E6yOOOO,59d,59dOOOO-E6v-E6vOOOP7+$`7+$`O0^ORO7+$_OOOP7+$_7+$_O?QOQO7+$`OOOP1G.u1G.uO?nORO1G/PO?YORO1G/PO?uORO7+$vO?uORO7+$vO2{ORO7+$_OOOP7+$b7+$bO@WOSO1G/hO*tORO1G/hOOOO1G/h1G/hOOOP7+$c7+$cO@wORO1G/QO@cORO1G/QOAOORO1G/QO%YORO1G/QOAgORO7+%QOAgORO7+%QOAxORO7+%QOBPORO7+%QO6YORO7+$^OOOP7+$^7+$^O%YORO7+$^OOOP<<Gy<<GyOOOP<<Gz<<GzOOOP7+$k7+$kOBZORO7+$kOBoORO<<HbOOOP<<G|<<G|O*tORO7+%SOOOO7+%S7+%SOOOP7+$l7+$lOCQORO7+$lOCfORO7+$lOCmORO7+$lODUORO<<HlODUORO<<HlODgORO<<HlOOOP<<Gx<<GxOOOP<<HV<<HVOOOO<<Hn<<HnOOOP<<HW<<HWODnORO<<HWOESORO<<HWOEZOROAN>WOEZOROAN>WOOOPAN=rAN=rOElOROAN=rOFQOROG23rOOOPG23^G23^",
  stateData: "Fc~OQWOSSOTTOUUOVVOWQOrPOR^Pq^Pt^P!Y^P~Os]Ow[O~OS_OT`OUaOVbOWQOR^Xq^Xt^X!Y^X~OPiOrgOugOyfOzcO{dO|gORxPqxPtxP!YxP~OZkO~P!lOPpOXrOYqOrgOumOzcO{cO|mO!TnOR!SPq!SPt!SP!Y!SP~OPjOrtOutOzcO|tO~O{dO!WvO~P$cO{cO!TnO~P$cOrxOuxOzcO{cO|xO~OgyOR!XPq!XPt!XP!Y!XP~P%YOR{OqvXtvX!YvX~Ot|O!Y|O~OZ!QO~P!lOP!POrtOutOzcO|tO~O{dO!W!RO~P&mO{cO!TnO~P&mOP!TO}!SOrjXujXzjX{jX|jX~Or!VOu!VOzcO{cO|!VO~O}!XO!O!ZORaXZaXqaXtaX{aX!PaX!QaX!YaX!TaX~OZ!`O!P!^O!Q!]ORxXqxXtxX!YxX~O{![O~P)ROr!VOu!bOzcO{cO|!bO~O}!XO!O!dORdXZdXqdXtdX!PdX!QdX!TaX!YdX~OP!fOr!fOu!fOzcO{cO|!fO~O!T!hO~OZ!kO!P!iO!Q!]OR!SXq!SXt!SX!Y!SX~OrgOumOzcO{cO|mO!TnO~OP!mOY!nO~P+vOr!oOu!oOzcO{cO|!oO~O}!XOR`Xq`Xt`X!Y`X~O!O!qO{aX!TaX~P,wO{![O~OrgOugOzcO{dO|gO~OP!PO~P-lOr!sOu!sOzcO{cO|!sO~O!O!uO!P`XZ`X!Q`X~P,wO!P!vOR!XXq!XXt!XX!Y!XX~OP!zO~P-lO}#OO!P!|O~O}!XO!O#QORaaZaaqaataa{aa!Paa!Qaa!Yaa!Taa~OrgOugOzcO{cO|gO~OP#TO}#OO~OP#UO~OP#WOyfORmXqmXtmX!PmX!YmX~P-lO!P!^ORxaqxatxa!Yxa~OZ#ZO!Q!]O~P1gOZ#ZO~P1gO}!XO!O#^ORdaZdaqdatda!Pda!Qda!Taa!Yda~OrgOumOzcO{cO|mO~OP#`Or#`Ou#`OzcO{cO|#`O~O}!XO!O#bO!V!UX~O!V#cO~OP#eOX#gOY#fORnXqnXtnX!PnX!YnX~P+vO!P!iOR!Saq!Sat!Sa!Y!Sa~OZ#jO!Q!]O~P4pOZ#jO~P4pOZ#lO!Q!]O~P4pO}!XO!O#oOR`aq`at`a{aa!Y`a!Taa~OrtOutOzcO{cO|tO~O{![OR^iq^it^i!Y^i~O}!XO!O#rOR`aq`at`a!P`a!Y`aZ`a!Q`a~Og#sORoXqoXtoX!PoX!YoX~P%YO!P!vOR!Xaq!Xat!Xa!Y!Xa~O{![OR^qq^qt^q!Y^q~OP#uOu#uO}lX!PlX~O}#wO!P!|O~O}!XO!O#xORaiZaiqaitai{ai!Pai!Qai!Yai!Tai~O!R#{O~OZ#|O!Q!]ORmaqmatma!Pma!Yma~O{![O~P:VO!P!^ORxiqxitxi!Yxi~OZ$PO~P:uO}!XO!O$QORdiZdiqditdi!Pdi!Qdi!Tai!Ydi~O}!XO!O$TO!V!Ua~O!V$VO~OZ$WO!Q!]ORnaqnatna!Pna!Yna~OP$YOY$ZO~P+vO!P!iOR!Siq!Sit!Si!Y!Si~OZ$]O~P=SOZ$]O!Q!]O~P=SOZ$_O!Q!]O~P=SO}!XOR`iq`it`i!Y`i~O!O$`O{ai!Tai~P>QO!O$bO!P`iZ`i!Q`i~P>QO}$dO!P!|O~OZ$eORmiqmitmi!Pmi!Ymi~O!Q!]O~P?YO!P!^ORxqqxqtxq!Yxq~O}!XO!O$iO!V!Ui~OZ$kORniqnitni!Pni!Yni~O!Q!]O~P@cOZ$mO!Q!]ORniqnitni!Pni!Yni~O!P!iOR!Sqq!Sqt!Sq!Y!Sq~OZ$pO~PAgOZ$pO!Q!]O~PAgOZ$sORmqqmqtmq!Pmq!Ymq~O!P!^ORxyqxytxy!Yxy~OZ$uORnqqnqtnq!Pnq!Ynq~O!Q!]O~PCQOZ$wO!Q!]ORnqqnqtnq!Pnq!Ynq~O!P!iOR!Syq!Syt!Sy!Y!Sy~OZ$yO~PDUOZ$zORnyqnytny!Pny!Yny~O!Q!]O~PDnO!P!iOR!S!Rq!S!Rt!S!R!Y!S!R~OZ$}ORn!Rqn!Rtn!R!Pn!R!Yn!R~O!P!iOR!S!Zq!S!Zt!S!Z!Y!S!Z~O",
  goto: "+k!YPPPPPPPPPPPPP!Z!_!c!l#j$g$z%v&^!_P!_&q&x(U)Q)[)q*e*kPPPPP*qP*wPPPPPPPPP+RP+XPP+hTXO|TYO|WiS_k!QR#W!^SjUVQyWQ!O]S!PabQ!WfQ!mqQ#m!nS#p!q!uQ#s!vQ$Y#fS$a#o#rQ$n$ZT$r$`$bWhS_k!Q^oTV`br!i#gSuUaQ!rvQ!{!RU#S!Z!d!qQ#V!^U#y#Q#^#oV$c#x$Q$`WiS_k!QQjUS!PavQ!z!RR#W!^S!ahiQ!lpQ#[!`S#k!k!mS#}#V#WQ$X#eS$^#l#mQ$f#|S$l$W$YQ$q$_S$v$m$nR${$wSpT`Q!mrQ#_!dQ#e!iQ$R#^Q$Y#gR$h$QQjVSpT`Q!PbQ!mrQ#e!iR$Y#gSRO|R^RdeS_kv!Q!R!Z!^#Q#x`lT`r!d!i#^#g$Q^sUVab!q#o$`fwW]fq!n!u!v#f#r$Z$bY!Uelsw!eZ!en!h#b$T$iQ!YgQ!cmQ!ptQ!txQ#P!Vd#R!Y!c!p!t#P#]#a#n#q$SQ#]!bQ#a!fQ#n!oQ#q!sR$S#`Q!}!TS#v!}#zR#z#TS!_hiW#X!_#Y$O$gS#Y!`!aS$O#Z#[R$g$PQ!jp[#h!j#i$[$o$x$|U#i!k!l!mW$[#j#k#l#mU$o$]$^$_S$x$p$qR$|$yQ!wyR#t!wQ}ZR!y}QZOR!x|QjSS!P_kR!z!QQjTR!P`Q!gnQ#d!hQ$U#bQ$j$TR$t$iRzW",
  nodeNames: "⚠ Register Directive Comment Opcode IOpcode RelOpcode IRelOpcode Prefix Ptr Offset VEXRound Program LabelDefinition InstructionStatement Immediate Expression Relative Memory VEXMask IImmediate IMemory DirectiveStatement FullString SymbolDefinition",
  maxTerm: 56,
  context: ctxTracker,
  skippedNodes: [0],
  repeatNodeCount: 8,
  tokenData: "&y~RiYZ!pqr!urs#Utu#uuv#Pvw#zwx$Sxy$syz$xz{$}{|%U|}%]}!O%U!P!Q#P![!]%b!^!_%g!_!`%u!`!a%{!}#O&W#P#Q&]#Q#R#P#o#p&b#p#q&g#q#r&o#r#s&t~!uO!Y~R!|P!OQzP!_!`#PQ#UO!OQ~#ZTg~Or#Urs#js#O#U#O#P#o#P~#U~#oOg~~#rPO~#U~#zOy~Q$PP!OQvw#P~$XT|~Ow$Swx$hx#O$S#O#P$m#P~$S~$mO|~~$pPO~$S~$xO{~~$}O}~R%UO!WP!OQR%]O!OQzP~%bO!P~~%gOw~Q%lR!OQ!^!_#P!_!`#P!`!a#PQ%xP!_!`#PQ&QQ!OQ!_!`#P!`!a#P~&]O!T~~&bO!V~~&gO!Q~Q&lP!OQ#p#q#P~&tO!R~P&yOzP",
  tokenizers: [tokenizer, 0, 1],
  topRules: {"Program":[0,12]},
  dynamicPrecedences: {"20":1},
  tokenPrec: 0
})
