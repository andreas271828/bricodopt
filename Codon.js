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

var Codon = (function() {
	// FIX: Test.
	var getAminoAcid = function(codon) {
		// https://en.wikipedia.org/wiki/DNA_codon_table
		// FIX: Better format (e.g. compressed format)?
		switch (codon) {
			case "GCT":
			case "GCC":
			case "GCA":
			case "GCG":
				return "A";
			case "TGT":
			case "TGC":
				return "C";
			case "GAT":
			case "GAC":
				return "D";
			case "GAA":
			case "GAG":
				return "E";
			case "TTT":
			case "TTC":
				return "F";
			case "GGT":
			case "GGC":
			case "GGA":
			case "GGG":
				return "G";
			case "CAT":
			case "CAC":
				return "H";
			case "ATT":
			case "ATC":
			case "ATA":
				return "I";
			case "AAA":
			case "AAG":
				return "K";
			case "TTA":
			case "TTG":
			case "CTT":
			case "CTC":
			case "CTA":
			case "CTG":
				return "L";
			case "ATG":
				return "M";
			case "AAT":
			case "AAC":
				return "N";
			case "CCT":
			case "CCC":
			case "CCA":
			case "CCG":
				return "P";
			case "CAA":
			case "CAG":
				return "Q";
			case "CGT":
			case "CGC":
			case "CGA":
			case "CGG":
			case "AGA":
			case "AGG":
				return "R";
			case "TCT":
			case "TCC":
			case "TCA":
			case "TCG":
			case "AGT":
			case "AGC":
				return "S";
			case "ACT":
			case "ACC":
			case "ACA":
			case "ACG":
				return "T";
			case "GTT":
			case "GTC":
			case "GTA":
			case "GTG":
				return "V";
			case "TGG":
				return "W";
			case "TAT":
			case "TAC":
				return "Y";
			case "TAA":
			case "TGA":
			case "TAG":
				return ".";
		}
		return "?";
	};

	return {
		getAminoAcid: getAminoAcid
	};
})();
