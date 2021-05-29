// This file was generated by lezer-generator. You probably shouldn't edit it.
import {Parser} from "lezer"
import {isOpcode, isRegister, isDirective} from "./asmPlugin"
export const parser = Parser.deserialize({
  version: 13,
  states: "%pOQOPOOOOOO'#Cl'#ClOlOPO'#CcOzOQO'#CcO!`OSO'#ChOOOO'#Cq'#CqO!nOPO'#CqQOOOOOOOOO-E6j-E6jOzOQO,58}O!vOSO'#CdO!{OPO'#CfO#ZOPO'#CfO#cOPO'#CrOOOO,58},58}O#nOPO'#CxOOOO,59S,59SOOOO,59],59]OOOO1G.i1G.iOOOO,59O,59OO#ZOPO,59QOOOO'#Cm'#CmO#yOPO'#CuO$ROPO,59QO$WOQO'#CnO$oOPO,59^O$zOSO'#CoO%]OPO,59dO%hOPO1G.lOOOO-E6k-E6kOOOO1G.l1G.lOOOO,59Y,59YOOOO-E6l-E6lOOOO,59Z,59ZOOOO-E6m-E6mOOOO7+$W7+$W",
  stateData: "%s~OPROQPOSSOUTO^UO_UOmVPnVP~OPXOQPOmVXnVX~OR]OZZOgYOh[OmfPnfP~OX_O]_OmlPnlP~OmaOnaO~OXcO~OhdOjYXmYXnYX~OjeOkiP~OjhOmfXnfX~OjjOmlXnlX~OjeOkiX~OknO~ORoOZZOgYOh[OjbXmbXnbX~OjhOmfanfa~OXqO]qOjcXmcXncX~OjjOmlanla~OksO~O^UZho~",
  goto: "!umPPPPPPPnqPqPnPPPx!O!V!]P!c!fPP!lPP!rRUOS]RXRohQQORWQSf[dRmfQi]RpiQk_RrkRVOQ^RRbXQg[RldR`S",
  nodeNames: "⚠ Opcode Prefix Register Directive Program LabelDefinition InstructionStatement Immediate Expression Memory Relative DirectiveStatement FullString SymbolDefinition Comment",
  maxTerm: 33,
  skippedNodes: [0],
  repeatNodeCount: 4,
  tokenData: "!GT~RdYZ!aqr!frsBdstCWtuCcuvChwx#_xyDuyzEd{|!f|}Ei}!O!f!O!PEn!Q!R2u!R![0s!]!^G`!c!}Ge#R#SGe#T#oGe#r#s!f~!fOn~U!i[qr!fwx#_xy0W{|!f}!O!f!O!P0s!Q!R2u!R![0s!c!}5[#R#S5[#T#o5[#r#s!fU#fjXSZQOY#_Zq#_qr%Wru#_uv'lvw'lwx.[xy#_yz#_z{'l{|'l|}#_}!O'l!O!P#_!P!Q'l!Q!^#_!^!_%W!_!`:O!`!a%W!a#O#_#O#P;w#P#Q#_#Q#R'l#R#p#_#p#q'l#q~#_U%_sXSZQOY#_Zq#_qr%Wru#_uv'lvw'lwx#_xy*Qyz#_z{'l{|'l|}#_}!O'l!O!P,`!P!Q'l!Q!R;}!R![,`![!^#_!^!_%W!_!`%W!`!a%W!a!c#_!c!}@X!}#O#_#O#P;w#P#Q#_#Q#R'l#R#S@X#S#T#_#T#o@X#o#p#_#p#q'l#q#r#_#r#s'l#s~#_U'ssXSZQOY#_Zq#_qr%Wru#_uv'lvw'lwx#_xy*Qyz#_z{'l{|'l|}#_}!O'l!O!P,`!P!Q'l!Q!R;}!R![,`![!^#_!^!_%W!_!`:O!`!a%W!a!c#_!c!}@X!}#O#_#O#P;w#P#Q#_#Q#R'l#R#S@X#S#T#_#T#o@X#o#p#_#p#q'l#q#r#_#r#s'l#s~#_U*XqXSZQOY#_Zq#_qr%Wru#_uv'lvw'lwx#_xy*Qyz#_z{'l{|'l|}#_}!O'l!O!P,`!P!Q'l!Q!R;}!R![,`![!^#_!^!_%W!_!`:O!`!a%W!a!c#_!c!}@X!}#O#_#O#P;w#P#Q#_#Q#R'l#R#S@X#S#T#_#T#o@X#o#p#_#p#q'l#q~#_U,gkXSZQOY#_Zq#_qr%Wru#_uv'lvw'lwx.[xy#_yz#_z{'l{|'l|}#_}!O'l!O!P,`!P!Q'l!Q![,`![!^#_!^!_%W!_!`:O!`!a%W!a#O#_#O#P;w#P#Q#_#Q#R'l#R#p#_#p#q'l#q~#_U.c]XSZQqr/[uv!fvw1yyz4Oz{!f{|!f}!O!f!P!Q!f!^!_4Y!_!`6h!`!a6n#Q#R!f#p#q7mU/_]qr!fwx#_xy0W{|!f}!O!f!O!P0s!Q!R2u!R![0s!_!`!f!c!}5[#R#S5[#T#o5[#r#s!fU0ZWwx#_xy0W!O!P0s!Q!R2u!R![0s!c!}5[#R#S5[#T#o5[U0z_XSZQqr/[uv!fvw1yyz4Oz{!f{|!f}!O!f!O!P0s!P!Q!f!Q![0s!^!_4Y!_!`6h!`!a6n#Q#R!f#p#q7mU1|]qr!fvw!fwx#_xy0W{|!f}!O!f!O!P0s!Q!R2u!R![0s!c!}5[#R#S5[#T#o5[#r#s!fU2|`XSZQqr/[uv!fvw1yyz4Oz{!f{|!f}!O!f!O!P0s!P!Q!f!Q![0s!^!_4Y!_!`6h!`!a6n#Q#R!f#l#m8i#p#q7mU4VPXSZQyz4OU4]_qr!fwx#_xy0W{|!f}!O!f!O!P0s!Q!R2u!R![0s!^!_!f!_!`!f!`!a!f!c!}5[#R#S5[#T#o5[#r#s!fU5caXSZQqr/[uv!fvw1yyz4Oz{!f{|!f}!O!f!P!Q!f!Q![5[!^!_4Y!_!`6h!`!a6n!c!}5[#Q#R!f#R#S5[#T#o5[#p#q7mU6kP!_!`!fU6q^qr!fwx#_xy0W{|!f}!O!f!O!P0s!Q!R2u!R![0s!_!`!f!`!a!f!c!}5[#R#S5[#T#o5[#r#s!fU7p]qr!fwx#_xy0W{|!f}!O!f!O!P0s!Q!R2u!R![0s!c!}5[#R#S5[#T#o5[#p#q!f#r#s!fU8lR!Q![8u!c!i8u#T#Z8uU8|`XSZQqr/[uv!fvw1yyz4Oz{!f{|!f}!O!f!P!Q!f!Q![8u!^!_4Y!_!`6h!`!a6n!c!i8u#Q#R!f#T#Z8u#p#q7mU:VjXSZQOY#_Zq#_qr%Wru#_uv'lvw'lwx.[xy#_yz#_z{'l{|'l|}#_}!O'l!O!P#_!P!Q'l!Q!^#_!^!_%W!_!`%W!`!a%W!a#O#_#O#P;w#P#Q#_#Q#R'l#R#p#_#p#q'l#q~#_U;zPO~#_U<UmXSZQOY#_Zq#_qr%Wru#_uv'lvw'lwx.[xy#_yz#_z{'l{|'l|}#_}!O'l!O!P,`!P!Q'l!Q![,`![!^#_!^!_%W!_!`:O!`!a%W!a#O#_#O#P;w#P#Q#_#Q#R'l#R#l#_#l#m>P#m#p#_#p#q'l#q~#_U>WoXSZQOY#_Zq#_qr%Wru#_uv'lvw'lwx.[xy#_yz#_z{'l{|'l|}#_}!O'l!O!P#_!P!Q'l!Q![>P![!^#_!^!_%W!_!`:O!`!a%W!a!c#_!c!i>P!i#O#_#O#P;w#P#Q#_#Q#R'l#R#T#_#T#Z>P#Z#p#_#p#q'l#q~#_U@`pXSZQOY#_Zq#_qr%Wru#_uv'lvw'lwx.[xy#_yz#_z{'l{|'l|}#_}!O'l!O!P#_!P!Q'l!Q![@X![!^#_!^!_%W!_!`:O!`!a%W!a!c#_!c!}@X!}#O#_#O#P;w#P#Q#_#Q#R'l#R#S@X#S#T#_#T#o@X#o#p#_#p#q'l#q~#_~BiU]~OYBdZrBdrsB{s#OBd#O#PCQ#P~Bd~CQO]~~CTPO~Bd~C]Q_~OYCWZ~CW~ChOg~~Ck]X^ChpqCh!c!}Dd#R#SDd#T#oDd#y#zCh$f$gCh#BY#BZCh$IS$I_Ch$I|$JOCh$JT$JUCh$KV$KWCh&FU&FVCh~DiSp~!Q![Dd!c!}Dd#R#SDd#T#oDdVDzWhRwx#_xy0W!O!P0s!Q!R2u!R![0s!c!}5[#R#S5[#T#o5[~EiOk~~EnOj~VEubXSZQqr/[uv!fvw1yyz4Oz{!f{|!f}!O!f!O!P0s!P!Q!f!Q![0s!^!_4Y!_!`6h!`!a6n!c!}F}#Q#R!f#R#SF}#T#oF}#p#q7mPGSSqP!Q![F}!c!}F}#R#SF}#T#oF}~GeOm~VGnlXSZQoPX^IfpqIfqr/[uv!fvw1yyz4Oz{!f{|!f}!O!f!P!Q!f!Q![Ge![!]J_!^!_4Y!_!`Jo!`!a6n!c!}Ge#Q#R!f#R#SGe#T#oGe#p#q7m#y#zIf$f$gIf#BY#BZIf$IS$I_If$I|$JOIf$JT$JUIf$KV$KWIf&FU&FVIfPIi[X^IfpqIf![!]J_!_!`Jd#y#zIf$f$gIf#BY#BZIf$IS$I_If$I|$JOIf$JT$JUIf$KV$KWIf&FU&FVIfPJdOUPPJiQ^POYJdZ~JdVJtS^POYJdZ!_Jd!_!`KQ!`~JdVKVg^POYJdZqJdqrKQrwJdwxLnxy!-Zy{Jd{|KQ|}Jd}!OKQ!O!P!.b!P!QJd!Q!R!1v!R![!.b![!cJd!c!}!6Q!}#RJd#R#S!6Q#S#TJd#T#o!6Q#o#rJd#r#sKQ#s~JdVLwjXS^PZQOYLnZqLnqrNiruLnuv!#Pvw!#Pwx!)uxyLnyzLnz{!#P{|!#P|}Ln}!O!#P!O!PLn!P!Q!#P!Q!^Ln!^!_Ni!_!`!>_!`!aNi!a#OLn#O#P!@Y#P#QLn#Q#R!#P#R#pLn#p#q!#P#q~LnVNrsXS^PZQOYLnZqLnqrNiruLnuv!#Pvw!#PwxLnxy!%gyzLnz{!#P{|!#P|}Ln}!O!#P!O!P!'w!P!Q!#P!Q!R!@h!R![!'w![!^Ln!^!_Ni!_!`Ni!`!aNi!a!cLn!c!}!Dv!}#OLn#O#P!@Y#P#QLn#Q#R!#P#R#S!Dv#S#TLn#T#o!Dv#o#pLn#p#q!#P#q#rLn#r#s!#P#s~LnV!#YsXS^PZQOYLnZqLnqrNiruLnuv!#Pvw!#PwxLnxy!%gyzLnz{!#P{|!#P|}Ln}!O!#P!O!P!'w!P!Q!#P!Q!R!@h!R![!'w![!^Ln!^!_Ni!_!`!>_!`!aNi!a!cLn!c!}!Dv!}#OLn#O#P!@Y#P#QLn#Q#R!#P#R#S!Dv#S#TLn#T#o!Dv#o#pLn#p#q!#P#q#rLn#r#s!#P#s~LnV!%pqXS^PZQOYLnZqLnqrNiruLnuv!#Pvw!#PwxLnxy!%gyzLnz{!#P{|!#P|}Ln}!O!#P!O!P!'w!P!Q!#P!Q!R!@h!R![!'w![!^Ln!^!_Ni!_!`!>_!`!aNi!a!cLn!c!}!Dv!}#OLn#O#P!@Y#P#QLn#Q#R!#P#R#S!Dv#S#TLn#T#o!Dv#o#pLn#p#q!#P#q~LnV!(QkXS^PZQOYLnZqLnqrNiruLnuv!#Pvw!#Pwx!)uxyLnyzLnz{!#P{|!#P|}Ln}!O!#P!O!P!'w!P!Q!#P!Q![!'w![!^Ln!^!_Ni!_!`!>_!`!aNi!a#OLn#O#P!@Y#P#QLn#Q#R!#P#R#pLn#p#q!#P#q~LnV!*OgXS^PZQOYJdZqJdqr!+gruJduvKQvw!0VwyJdyz!3qz{KQ{|KQ|}Jd}!OKQ!O!PJd!P!QKQ!Q!^Jd!^!_!4W!_!`Jo!`!a!8U!a#QJd#Q#RKQ#R#pJd#p#q!9{#q~JdV!+li^POYJdZqJdqrKQrwJdwxLnxy!-Zy{Jd{|KQ|}Jd}!OKQ!O!P!.b!P!QJd!Q!R!1v!R![!.b![!_Jd!_!`KQ!`!cJd!c!}!6Q!}#RJd#R#S!6Q#S#TJd#T#o!6Q#o#rJd#r#sKQ#s~JdV!-``^POYJdZwJdwxLnxy!-Zy!OJd!O!P!.b!P!QJd!Q!R!1v!R![!.b![!cJd!c!}!6Q!}#RJd#R#S!6Q#S#TJd#T#o!6Q#o~JdV!.khXS^PZQOYJdZqJdqr!+gruJduvKQvw!0VwyJdyz!3qz{KQ{|KQ|}Jd}!OKQ!O!P!.b!P!QKQ!Q![!.b![!^Jd!^!_!4W!_!`Jo!`!a!8U!a#QJd#Q#RKQ#R#pJd#p#q!9{#q~JdV!0[h^POYJdZqJdqrKQrvJdvwKQwxLnxy!-Zy{Jd{|KQ|}Jd}!OKQ!O!P!.b!P!QJd!Q!R!1v!R![!.b![!cJd!c!}!6Q!}#RJd#R#S!6Q#S#TJd#T#o!6Q#o#rJd#r#sKQ#s~JdV!2PjXS^PZQOYJdZqJdqr!+gruJduvKQvw!0VwyJdyz!3qz{KQ{|KQ|}Jd}!OKQ!O!P!.b!P!QKQ!Q![!.b![!^Jd!^!_!4W!_!`Jo!`!a!8U!a#QJd#Q#RKQ#R#lJd#l#m!;o#m#pJd#p#q!9{#q~JdV!3zSXS^PZQOYJdZyJdyz!3qz~JdV!4]k^POYJdZqJdqrKQrwJdwxLnxy!-Zy{Jd{|KQ|}Jd}!OKQ!O!P!.b!P!QJd!Q!R!1v!R![!.b![!^Jd!^!_KQ!_!`KQ!`!aKQ!a!cJd!c!}!6Q!}#RJd#R#S!6Q#S#TJd#T#o!6Q#o#rJd#r#sKQ#s~JdV!6ZmXS^PZQOYJdZqJdqr!+gruJduvKQvw!0VwyJdyz!3qz{KQ{|KQ|}Jd}!OKQ!O!PJd!P!QKQ!Q![!6Q![!^Jd!^!_!4W!_!`Jo!`!a!8U!a!cJd!c!}!6Q!}#QJd#Q#RKQ#R#S!6Q#S#TJd#T#o!6Q#o#pJd#p#q!9{#q~JdV!8Zj^POYJdZqJdqrKQrwJdwxLnxy!-Zy{Jd{|KQ|}Jd}!OKQ!O!P!.b!P!QJd!Q!R!1v!R![!.b![!_Jd!_!`KQ!`!aKQ!a!cJd!c!}!6Q!}#RJd#R#S!6Q#S#TJd#T#o!6Q#o#rJd#r#sKQ#s~JdV!:Qi^POYJdZqJdqrKQrwJdwxLnxy!-Zy{Jd{|KQ|}Jd}!OKQ!O!P!.b!P!QJd!Q!R!1v!R![!.b![!cJd!c!}!6Q!}#RJd#R#S!6Q#S#TJd#T#o!6Q#o#pJd#p#qKQ#q#rJd#r#sKQ#s~JdV!;tW^POYJdZ!QJd!Q![!<^![!cJd!c!i!<^!i#TJd#T#Z!<^#Z~JdV!<glXS^PZQOYJdZqJdqr!+gruJduvKQvw!0VwyJdyz!3qz{KQ{|KQ|}Jd}!OKQ!O!PJd!P!QKQ!Q![!<^![!^Jd!^!_!4W!_!`Jo!`!a!8U!a!cJd!c!i!<^!i#QJd#Q#RKQ#R#TJd#T#Z!<^#Z#pJd#p#q!9{#q~JdV!>hjXS^PZQOYLnZqLnqrNiruLnuv!#Pvw!#Pwx!)uxyLnyzLnz{!#P{|!#P|}Ln}!O!#P!O!PLn!P!Q!#P!Q!^Ln!^!_Ni!_!`Ni!`!aNi!a#OLn#O#P!@Y#P#QLn#Q#R!#P#R#pLn#p#q!#P#q~LnV!@_R^POYLnYZ#_Z~LnV!@qmXS^PZQOYLnZqLnqrNiruLnuv!#Pvw!#Pwx!)uxyLnyzLnz{!#P{|!#P|}Ln}!O!#P!O!P!'w!P!Q!#P!Q![!'w![!^Ln!^!_Ni!_!`!>_!`!aNi!a#OLn#O#P!@Y#P#QLn#Q#R!#P#R#lLn#l#m!Bl#m#pLn#p#q!#P#q~LnV!BuoXS^PZQOYLnZqLnqrNiruLnuv!#Pvw!#Pwx!)uxyLnyzLnz{!#P{|!#P|}Ln}!O!#P!O!PLn!P!Q!#P!Q![!Bl![!^Ln!^!_Ni!_!`!>_!`!aNi!a!cLn!c!i!Bl!i#OLn#O#P!@Y#P#QLn#Q#R!#P#R#TLn#T#Z!Bl#Z#pLn#p#q!#P#q~LnV!EPpXS^PZQOYLnZqLnqrNiruLnuv!#Pvw!#Pwx!)uxyLnyzLnz{!#P{|!#P|}Ln}!O!#P!O!PLn!P!Q!#P!Q![!Dv![!^Ln!^!_Ni!_!`!>_!`!aNi!a!cLn!c!}!Dv!}#OLn#O#P!@Y#P#QLn#Q#R!#P#R#S!Dv#S#TLn#T#o!Dv#o#pLn#p#q!#P#q~Ln",
  tokenizers: [0, 1, 2],
  topRules: {"Program":[0,5]},
  specialized: [{term: 31, get: (value, stack) => (isOpcode(value, stack) << 1)},{term: 32, get: (value, stack) => (isRegister(value, stack) << 1)},{term: 33, get: (value, stack) => (isDirective(value, stack) << 1)}],
  tokenPrec: 213
})
