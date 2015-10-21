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

var Sequence = (function() {
	var normalise = function(sequence) {
		return sequence.replace(/\s/g, "").toUpperCase();
	};

	var getAminoAcids = function(sequence) {
		// FIX: No mutations?
		var ret = "";
		var rest = sequence;
		while (rest.length >= 3) {
			ret = ret.concat(Codon.getAminoAcid(rest.substring(0, 3)));
			rest = rest.substring(3);
		}
		return ret;
	};

	return {
		normalise: normalise,
		getAminoAcids: getAminoAcids
	};
})();
