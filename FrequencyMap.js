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

// FIX: Change module to a structure similar to Frequencies, where no variables are mutated.
// FIX: Test all functions.
// FIX: Improve the code of this module further and make it nice and functional and composable.

var FrequencyMap = (function() {
	var addToFrequencyMap = function(frequencyMap, aminoAcid, codon, frequency) {
		frequencyMap[aminoAcid] = Frequencies.add(frequencyMap[aminoAcid], codon, frequency);
	};

	var generateFromSequence = function(sequence) {
		var frequencyMap = {};
		var rest = sequence;
		while (rest.length >= 3) {
			var codon = rest.substring(0, 3);
			var aminoAcid = Codon.getAminoAcid(codon);
			addToFrequencyMap(frequencyMap, aminoAcid, codon, 1);
			rest = rest.substring(3);
		}
		return frequencyMap;
	};

	var getFrequencies = function(frequencyMap, aminoAcid) {
		return frequencyMap[aminoAcid];
	};

	var normalise = function(frequencyMap) {
		var newFrequencyMap = {};

		for (var aminoAcid in frequencyMap) {
			if (frequencyMap.hasOwnProperty(aminoAcid)) {
				newFrequencyMap[aminoAcid] = Frequencies.normalise(frequencyMap[aminoAcid]);
			}
		}

		return newFrequencyMap;
	};

	// Generate normalised frequency map from codon usage tables as found at http://www.kazusa.or.jp/codon/.
	var parse = function(frequencies) {
		var frequencyMap = {};
		var normalised = frequencies.trim().replace(/U/g, "T");
		var items = normalised.split(/\([^)]*\)\s*/);
		items.forEach(function(item) {
			if (item !== "") {
				var data = item.split(/\s+/);
				var codon = data[0];
				var frequency = parseFloat(data[1]);
				var aminoAcid = Codon.getAminoAcid(codon);
				addToFrequencyMap(frequencyMap, aminoAcid, codon, frequency);
			}
		});
		return normalise(frequencyMap);
	};

	var print = function(frequencyMap, relAndAbs) {
		var log = "";
		for (var aminoAcid in frequencyMap) {
			if (frequencyMap.hasOwnProperty(aminoAcid)) {
				log += aminoAcid + "\n";
				var frequencies = frequencyMap[aminoAcid];
				var sum = Frequencies.sum(frequencies);
				Frequencies.forAllCodons(frequencies, function(codon) {
					var frequency = Frequencies.getFrequency(frequencies, codon);
					if (relAndAbs) {
						var relFrequency = frequency / sum;
						log += "  " + codon + ": " + relFrequency + " (" + frequency + ")\n";
					} else {
						log += "  " + codon + ": " + frequency + "\n";
					}
				});
			}
		}
		return log;
	};

	return {
		addToFrequencyMap: addToFrequencyMap,
		generateFromSequence: generateFromSequence,
		getFrequencies: getFrequencies,
		normalise: normalise,
		parse: parse,
		print: print
	};
})();
