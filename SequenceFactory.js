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

var SequenceFactory = (function() {
	// FIX: Test.
	var probabilisticSequenceFactory = function(frequencyMap) {
		return {
			getCodon: function(aminoAcid) {
				var sel = Math.random();
				var acc = 0;
				var frequencies = getFrequencies(frequencyMap, aminoAcid);
				var selCodon = findCodon(frequencies, function(codon) {
					acc += getFrequency(frequencies, codon);
					return sel < acc;
				});
				return selCodon === undefined ? "???" : selCodon;
			}
		};
	};

	// FIX: Test.
	var deterministicSequenceFactory = function(frequencyMap) {
		var history = {};
		return {
			getCodon: function(aminoAcid) {
				var frequencies = getFrequencies(frequencyMap, aminoAcid);
				var aminoAcidHistory = getFrequencies(history, aminoAcid);
				var newSum = getSum(history, aminoAcid) + 1;
				var minSDist;
				var selCodon;
				forAllCodons(frequencies, function(testCodon) {
					var sDist = 0;
					forAllCodons(frequencies, function(codon) {
						var oldCount = getFrequency(aminoAcidHistory, codon);
						var newCount = codon === testCodon ? oldCount + 1 : oldCount;
						var delta = newCount / newSum - getFrequency(frequencies, codon);
						sDist += Math.pow(delta, 2);
					});
					if (minSDist === undefined || sDist < minSDist) {
						minSDist = sDist;
						selCodon = testCodon;
					}
				});
				if (selCodon !== undefined) {
					addToFrequencyMap(history, aminoAcid, selCodon, 1);
					return selCodon;
				}
				return "???";
			}
		};
	};

	// FIX: Test.
	var getSequence = function(aminoAcids, sequenceFactory) {
		// FIX: No mutations.
		var ret = "";
		for (var i = 0; i < aminoAcids.length; i++) {
			ret = ret.concat(sequenceFactory.getCodon(aminoAcids.charAt(i)));
		}
		return ret;
	};

	return {
		probabilisticSequenceFactory: probabilisticSequenceFactory,
		deterministicSequenceFactory: deterministicSequenceFactory,
		getSequence: getSequence
	};
})();
