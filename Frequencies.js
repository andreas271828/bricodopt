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

// FIX: Improve the code of this module further and make it nice and functional and composable.

var Frequencies = (function() {
	var none = function() {
		return {
			frequencies: {},
			sum: 0
		};
	};

	var add = function(frequencies, codon, frequency) {
		var newFrequencies = {};
		var oldFrequency = 0;
		var oldSum = 0;

		if (frequencies !== undefined) {
			var oldFrequencies = frequencies.frequencies;
			for (var key in oldFrequencies) {
				if (oldFrequencies.hasOwnProperty(key)) {
					if (key === codon) {
						oldFrequency = oldFrequencies[key];
					}
					newFrequencies[key] = oldFrequencies[key];
				}
			}
			oldSum = frequencies.sum;
		}

		newFrequencies[codon] = oldFrequency + frequency;

		return {
			frequencies: newFrequencies,
			sum: oldSum + frequency
		};
	};

	var getFrequency = function(frequencies, codon) {
		var frequency = frequencies === undefined ? undefined : frequencies.frequencies[codon];
		return frequency === undefined ? 0 : frequency;
	};

	var sum = function(frequencies) {
		return frequencies === undefined ? 0 : frequencies.sum;
	};

	var forAllCodons = function(frequencies, f) {
		if (frequencies !== undefined) {
			var codons = frequencies.frequencies;
			for (var codon in codons) {
				if (codons.hasOwnProperty(codon)) {
					f(codon);
				}
			}
		}
	};

	var findCodon = function(frequencies, p) {
		if (frequencies !== undefined) {
			var codons = frequencies.frequencies;
			for (var codon in codons) {
				if (codons.hasOwnProperty(codon) && p(codon)) {
					return codon;
				}
			}
		}
		return undefined;
	};

	var normalise = function(frequencies) {
		var newFrequencies = {};
		var newSum = 0;

		var oldFrequencies = frequencies.frequencies;
		for (var key in oldFrequencies) {
			if (oldFrequencies.hasOwnProperty(key)) {
				newFrequencies[key] = oldFrequencies[key] / frequencies.sum;
				newSum += newFrequencies[key];
			}
		}

		return {
			frequencies: newFrequencies,
			sum: newSum
		};
	};

	return {
		none: none,
		add: add,
		getFrequency: getFrequency,
		sum: sum,
		forAllCodons: forAllCodons,
		findCodon: findCodon,
		normalise: normalise
	};
})();
