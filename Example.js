/********************************************************************
Bricodopt

Copyright (C) 2015 Andreas Huemer

This file is part of Bricodopt.

Bricodopt is free software: you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the
Free Software Foundation, either version 3 of the License, or (at
your option) any later version.

Bricodopt is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
********************************************************************/

var Example = (function() {
	var sequence = "\
ATGGTGAGCAAGGGCGAGGAGCTGTTCACCGGGGTGGTGCCCATCCTGGTCGAGCTGGACGGCGACGTAAACGGCCACAA\
GTTCAGCGTGTCCGGCGAGGGCGAGGGCGATGCCACCTACGGCAAGCTGACCCTGAAGTTCATCTGCACCACCGGCAAGC\
TGCCCGTGCCCTGGCCCACCCTCGTGACCACCTTCGGCTACGGCCTGCAGTGCTTCGCCCGCTACCCCGACCACATGAAG\
CAGCACGACTTCTTCAAGTCCGCCATGCCCGAAGGCTACGTCCAGGAGCGCACCATCTTCTTCAAGGACGACGGCAACTA\
CAAGACCCGCGCCGAGGTGAAGTTCGAGGGCGACACCCTGGTGAACCGCATCGAGCTGAAGGGCATCGACTTCAAGGAGG\
ACGGCAACATCCTGGGGCACAAGCTGGAGTACAACTACAACAGCCACAACGTCTATATCATGGCCGACAAGCAGAAGAAC\
GGCATCAAGGTGAACTTCAAGATCCGCCACAACATCGAGGACGGCAGCGTGCAGCTCGCCGACCACTACCAGCAGAACAC\
CCCCATCGGCGACGGCCCCGTGCTGCTGCCCGACAACCACTACCTGAGCTACCAGTCCGCCCTGAGCAAAGACCCCAACG\
AGAAGCGCGATCACATGGTCCTGCTGGAGTTCGTGACCGCCGCCGGGATCACTCTCGGCATGGACGAGCTGTACAAGTAA\
";

	var frequencies = "\
UUU 33.4(   894)  UCU 17.0(   455)  UAU 24.6(   657)  UGU  7.6(   203)\n\
UUC 17.1(   456)  UCC  2.8(    74)  UAC 10.0(   266)  UGC  1.5(    39)\n\
UUA 77.7(  2078)  UCA 22.0(   588)  UAA  2.9(    78)  UGA  0.1(     3)\n\
UUG  4.3(   114)  UCG  4.0(   107)  UAG  0.4(    12)  UGG 13.5(   361)\n\
\n\
CUU 14.3(   383)  CCU 15.5(   414)  CAU 10.1(   270)  CGU 32.4(   866)\n\
CUC  1.0(    28)  CCC  3.4(    90)  CAC  8.8(   235)  CGC  4.1(   110)\n\
CUA  6.4(   170)  CCA 23.6(   630)  CAA 38.4(  1026)  CGA  3.4(    90)\n\
CUG  3.7(    99)  CCG  2.4(    63)  CAG  4.1(   110)  CGG  0.5(    14)\n\
\n\
AUU 51.4(  1374)  ACU 24.4(   651)  AAU 42.1(  1126)  AGU 16.0(   428)\n\
AUC  8.2(   219)  ACC  5.1(   135)  AAC 17.7(   472)  AGC  5.4(   144)\n\
AUA  6.9(   184)  ACA 32.4(   865)  AAA 69.1(  1847)  AGA  5.3(   143)\n\
AUG 22.3(   596)  ACG  3.9(   103)  AAG  6.2(   167)  AGG  0.9(    23)\n\
\n\
GUU 29.3(   783)  GCU 34.0(   908)  GAU 25.3(   676)  GGU 44.0(  1177)\n\
GUC  2.5(    68)  GCC  5.9(   159)  GAC  9.8(   263)  GGC  6.4(   172)\n\
GUA 26.0(   696)  GCA 20.7(   554)  GAA 41.1(  1098)  GGA  8.6(   229)\n\
GUG  5.6(   149)  GCG  3.3(    88)  GAG  5.7(   152)  GGG  3.7(    99)\
";

	var optimise = function() {
		// FIX: Move to appropriate location.
		document.getElementById("sequence1").value = sequence;
		document.getElementById("frequencies").value = frequencies;
		Bricodopt.optimise();
	};

	return {
		sequence: sequence,
		frequencies: frequencies,
		optimise: optimise
	};
})();
