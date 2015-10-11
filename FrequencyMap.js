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

var FrequencyMap = (function() {
	// FIX: Test.
	var addToFrequencyMap = function(frequencyMap, aminoAcid, codon, frequency) {
		if (frequencyMap[aminoAcid] === undefined) {
			frequencyMap[aminoAcid] = {
				frequencies: {},
				sum: 0
			};
		}
		var oldFrequency = frequencyMap[aminoAcid].frequencies[codon];
		if (oldFrequency === undefined) {
			oldFrequency = 0;
		}
		frequencyMap[aminoAcid].frequencies[codon] = oldFrequency + frequency;
		frequencyMap[aminoAcid].sum = frequencyMap[aminoAcid].sum + frequency;
	};

	// FIX: Test.
	var getFrequencies = function(frequencyMap, aminoAcid) {
		return frequencyMap[aminoAcid] === undefined ? {} : frequencyMap[aminoAcid].frequencies;
	};

	// FIX: Test.
	var getFrequency = function(frequencies, codon) {
		return frequencies[codon] === undefined ? 0 : frequencies[codon];
	};

	// FIX: Test.
	var forAllCodons = function(frequencies, f) {
		for (var codon in frequencies) {
			if (frequencies.hasOwnProperty(codon)) {
				f(codon);
			}
		}
	};

	// FIX: Test.
	var findCodon = function(frequencies, p) {
		for (var codon in frequencies) {
			if (frequencies.hasOwnProperty(codon) && p(codon)) {
				return codon;
			}
		}
		return undefined;
	};

	// FIX: Test.
	var getSum = function(frequencyMap, aminoAcid) {
		return frequencyMap[aminoAcid] === undefined ? 0 : frequencyMap[aminoAcid].sum;
	};

	// FIX: Test.
	var normaliseFrequencyMap = function(frequencyMap) {
		// FIX: Deep copy frequency map or better build new map in loops.
		// FIX: Make sure that sum === 1 (not slightly less or slightly more).
		for (var aminoAcid in frequencyMap) {
			if (frequencyMap.hasOwnProperty(aminoAcid)) {
				var sum = frequencyMap[aminoAcid].sum;
				if (sum > 0) {
					var frequencies = frequencyMap[aminoAcid].frequencies;
					for (var codon in frequencies) {
						if (frequencies.hasOwnProperty(codon)) {
							frequencies[codon] /= sum;
						}
					}
				}
			}
		}
		return frequencyMap;
	}

	// FIX: Test.
	var getFrequencyMap = function(frequencies) {
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
		return normaliseFrequencyMap(frequencyMap);
	};

	// FIX: Test.
	var getFrequencyMapFromSequence = function(sequence) {
		var frequencyMap = {};
		var rest = sequence;
		while (rest.length >= 3) {
			var codon = rest.substring(0, 3);
			var aminoAcid = Codon.getAminoAcid(codon);
			addToFrequencyMap(frequencyMap, aminoAcid, codon, 1);
			rest = rest.substring(3);
		}
		return normaliseFrequencyMap(frequencyMap);
	};

	// FIX: Test.
	var printFrequencyMap = function(frequencyMap, printCount) {
		var log = "";
		for (var aminoAcid in frequencyMap) {
			if (frequencyMap.hasOwnProperty(aminoAcid)) {
				log += aminoAcid + "\n";
				var frequencies = frequencyMap[aminoAcid].frequencies;
				var sum = frequencyMap[aminoAcid].sum;
				for (var codon in frequencies) {
					if (frequencies.hasOwnProperty(codon)) {
						var frequency = frequencies[codon];
						if (printCount) {
							log += "  " + codon + ": " + frequency + " (" + (frequency * sum) + ")\n";
						} else {
							log += "  " + codon + ": " + frequency + "\n";
						}
					}
				}
			}
		}
		return log;
	};

	return {
		addToFrequencyMap: addToFrequencyMap,
		getFrequencies: getFrequencies,
		getFrequency: getFrequency,
		forAllCodons: forAllCodons,
		findCodon: findCodon,
		getSum: getSum,
		getFrequencyMap: getFrequencyMap,
		getFrequencyMapFromSequence: getFrequencyMapFromSequence,
		printFrequencyMap: printFrequencyMap,
		private: {
			normaliseFrequencyMap: normaliseFrequencyMap
		}
	};
})();
