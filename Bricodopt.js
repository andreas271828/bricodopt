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
	var optimise = function() {
		var sequence1 = document.getElementById("sequence1").value;
		var normalised1 = Sequence.normalise(sequence1);
		var aminoAcids = Sequence.getAminoAcids(normalised1);
		document.getElementById("aminoAcids").value = aminoAcids;
		var frequencies = document.getElementById("frequencies").value;
		if (frequencies !== "") {
			var frequencyMap = FrequencyMap.getFrequencyMap(frequencies);
			document.getElementById("frequencyMap").value = FrequencyMap.printFrequencyMap(frequencyMap, false);
			// var sequenceFactory = SequenceFactory.probabilisticSequenceFactory(frequencyMap);
			var sequenceFactory = SequenceFactory.deterministicSequenceFactory(frequencyMap);
			var sequence2 = SequenceFactory.getSequence(aminoAcids, sequenceFactory);
			document.getElementById("sequence2").value = sequence2;
			var frequencyMap2 = FrequencyMap.getFrequencyMapFromSequence(sequence2);
			document.getElementById("frequencyMap2").value = FrequencyMap.printFrequencyMap(frequencyMap2, true);
		}
	};

	return {
		optimise: optimise
	};
})();
