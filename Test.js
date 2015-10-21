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

QUnit.test("Sequence.normalise", function(assert) {
	var check = function(input, expected) {
		assert.equal(Sequence.normalise(input), expected);
	}

	check("", "");
	check("ATGGTGAGCTAA", "ATGGTGAGCTAA");
	check("ATG GTG AGC TAA", "ATGGTGAGCTAA");
	check("   ATGGTGAGCTAA   ", "ATGGTGAGCTAA");
	check("\tATGGTG\tAGCTAA\t", "ATGGTGAGCTAA");
	check("\nATG GTG\tAGC TAA\n", "ATGGTGAGCTAA");
});

QUnit.test("Sequence.getAminoAcids", function(assert) {
	var check = function(input, expected) {
		assert.equal(Sequence.getAminoAcids(input), expected);
	}

	check("", "");
	check("GCTGCCGCAGCG", "AAAA");
	check("TGTTGC", "CC");
	check("GATGAC", "DD");
	check("GAAGAG", "EE");
	check("TTTTTC", "FF");
	check("GGTGGCGGAGGG", "GGGG");
	check("CATCAC", "HH");
	check("ATTATCATA", "III");
	check("AAAAAG", "KK");
	check("TTATTGCTTCTCCTACTG", "LLLLLL");
	check("ATG", "M");
	check("AATAAC", "NN");
	check("CCTCCCCCACCG", "PPPP");
	check("CAACAG", "QQ");
	check("CGTCGCCGACGGAGAAGG", "RRRRRR");
	check("TCTTCCTCATCGAGTAGC", "SSSSSS");
	check("ACTACCACAACG", "TTTT");
	check("GTTGTCGTAGTG", "VVVV");
	check("TGG", "W");
	check("TATTAC", "YY");
	check("TAATGATAG", "...");
	check("XXX", "?");
	check("XX", "");
	check("XXXX", "?");
	check("AACABCAB", "N?");
});
