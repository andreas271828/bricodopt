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

var Bricodopt = (function() {
	// FIX: Tests.
	var normaliseSequence = function(sequence) {
		return sequence.replace(/\s/g, "").toUpperCase();
	};

	var getAminoAcid = function(codon) {
		// https://en.wikipedia.org/wiki/DNA_codon_table
		// FIX: Better format (e.g. compressed format)?
		// FIX: Test.
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

	var getAminoAcids = function(sequence) {
		// FIX: No mutations.
		var ret = "";
		var rest = sequence;
		while (rest.length >= 3) {
			ret = ret.concat(getAminoAcid(rest.substring(0, 3)));
			rest = rest.substring(3);
		}
		return ret;
	};

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

	var getFrequencies = function(frequencyMap, aminoAcid) {
		return frequencyMap[aminoAcid] === undefined ? {} : frequencyMap[aminoAcid].frequencies;
	};

	var getFrequency = function(frequencies, codon) {
		return frequencies[codon] === undefined ? 0 : frequencies[codon];
	};

	var forAllCodons = function(frequencies, f) {
		for (var codon in frequencies) {
			if (frequencies.hasOwnProperty(codon)) {
				f(codon);
			}
		}
	};

	var findCodon = function(frequencies, p) {
		for (var codon in frequencies) {
			if (frequencies.hasOwnProperty(codon) && p(codon)) {
				return codon;
			}
		}
		return undefined;
	};

	var getSum = function(frequencyMap, aminoAcid) {
		return frequencyMap[aminoAcid] === undefined ? 0 : frequencyMap[aminoAcid].sum;
	};

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

	var getFrequencyMap = function(frequencies) {
		var frequencyMap = {};
		var normalised = frequencies.trim().replace(/U/g, "T");
		var items = normalised.split(/\([^)]*\)\s*/);
		items.forEach(function(item) {
			if (item !== "") {
				var data = item.split(/\s+/);
				var codon = data[0];
				var frequency = parseFloat(data[1]);
				var aminoAcid = getAminoAcid(codon);
				addToFrequencyMap(frequencyMap, aminoAcid, codon, frequency);
			}
		});
		return normaliseFrequencyMap(frequencyMap);
	};

	var getFrequencyMapFromSequence = function(sequence) {
		var frequencyMap = {};
		var rest = sequence;
		while (rest.length >= 3) {
			var codon = rest.substring(0, 3);
			var aminoAcid = getAminoAcid(codon);
			addToFrequencyMap(frequencyMap, aminoAcid, codon, 1);
			rest = rest.substring(3);
		}
		return normaliseFrequencyMap(frequencyMap);
	};

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

	var getSequence = function(aminoAcids, sequenceFactory) {
		// FIX: No mutations.
		var ret = "";
		for (var i = 0; i < aminoAcids.length; i++) {
			ret = ret.concat(sequenceFactory.getCodon(aminoAcids.charAt(i)));
		}
		return ret;
	};

	var optimise = function() {
		var sequence1 = document.getElementById("sequence1").value;
		var normalised1 = normaliseSequence(sequence1);
		var aminoAcids = getAminoAcids(normalised1);
		document.getElementById("aminoAcids").value = aminoAcids;
		var frequencies = document.getElementById("frequencies").value;
		if (frequencies !== "") {
			var frequencyMap = getFrequencyMap(frequencies);
			document.getElementById("frequencyMap").value = printFrequencyMap(frequencyMap, false);
			// var sequenceFactory = probabilisticSequenceFactory(frequencyMap);
			var sequenceFactory = deterministicSequenceFactory(frequencyMap);
			var sequence2 = getSequence(aminoAcids, sequenceFactory);
			document.getElementById("sequence2").value = sequence2;
			var frequencyMap2 = getFrequencyMapFromSequence(sequence2);
			document.getElementById("frequencyMap2").value = printFrequencyMap(frequencyMap2, true);
		}
	};

	return {
		optimise: optimise
	};
})();
