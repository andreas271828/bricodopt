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

// FIX: Improve code and test all functions.

var SequenceFactory = (function() {
	var probabilisticSequenceFactory = function(frequencyMap) {
		return {
			getCodon: function(aminoAcid) {
				var sel = Math.random();
				var acc = 0;
				var frequencies = FrequencyMap.getFrequencies(frequencyMap, aminoAcid);
				var selCodon = Frequencies.findCodon(frequencies, function(codon) {
					acc += Frequencies.getFrequency(frequencies, codon);
					return sel < acc;
				});
				return selCodon === undefined ? "???" : selCodon;
			}
		};
	};

	var deterministicSequenceFactory = function(frequencyMap) {
		var history = {};
		return {
			getCodon: function(aminoAcid) {
				var frequencies = FrequencyMap.getFrequencies(frequencyMap, aminoAcid);
				var aminoAcidHistory = FrequencyMap.getFrequencies(history, aminoAcid);
				var newSum = Frequencies.sum(aminoAcidHistory) + 1;
				var minSDist;
				var selCodon;
				Frequencies.forAllCodons(frequencies, function(testCodon) {
					var sDist = 0;
					Frequencies.forAllCodons(frequencies, function(codon) {
						var oldCount = Frequencies.getFrequency(aminoAcidHistory, codon);
						var newCount = codon === testCodon ? oldCount + 1 : oldCount;
						var delta = newCount / newSum - Frequencies.getFrequency(frequencies, codon);
						sDist += Math.pow(delta, 2);
					});
					if (minSDist === undefined || sDist < minSDist) {
						minSDist = sDist;
						selCodon = testCodon;
					}
				});
				if (selCodon !== undefined) {
					FrequencyMap.addToFrequencyMap(history, aminoAcid, selCodon, 1);
					return selCodon;
				}
				return "???";
			}
		};
	};

	var getSequence = function(aminoAcids, sequenceFactory) {
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
