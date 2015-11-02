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

QUnit.test("Frequencies", function(assert) {
	var checkFrequency = function(frequencies, codon, expected) {
		assert.equal(Frequencies.getFrequency(frequencies, codon), expected);
	};

	var checkSum = function(frequencies, expected) {
		assert.equal(Frequencies.sum(frequencies), expected);
	};

	var frequencies0 = Frequencies.none();
	var frequencies1 = Frequencies.add(frequencies0, "ATG", 5);
	var frequencies2 = Frequencies.add(undefined, "GTG", 7);
	var frequencies3 = Frequencies.add(frequencies1, "GTG", 7);
	var frequencies4 = Frequencies.add(frequencies3, "ATG", 3);

	checkFrequency(frequencies0, "ATG", 0);
	checkSum(frequencies0, 0);

	checkFrequency(frequencies1, "ATG", 5);
	checkFrequency(frequencies1, "GTG", 0);
	checkSum(frequencies1, 5);

	checkFrequency(frequencies2, "ATG", 0);
	checkFrequency(frequencies2, "GTG", 7);
	checkSum(frequencies2, 7);

	checkFrequency(frequencies3, "ATG", 5);
	checkFrequency(frequencies3, "GTG", 7);
	checkSum(frequencies3, 12);

	checkFrequency(frequencies4, "ATG", 8);
	checkFrequency(frequencies4, "GTG", 7);
	checkSum(frequencies4, 15);

	checkFrequency(undefined, "ATG", 0);
	checkSum(undefined, 0);
});

QUnit.test("Frequencies.forAllCodons", function(assert) {
	var frequencies = Frequencies.add(Frequencies.add(Frequencies.none(), "ATG", 5), "GTG", 7);
	var count = 0;
	Frequencies.forAllCodons(frequencies, function(codon) {
		count++;
	});
	assert.equal(count, 2);
});

QUnit.test("Frequencies.findCodon", function(assert) {
	var check = function(frequencies, p, expected) {
		assert.equal(Frequencies.findCodon(frequencies, p), expected);
	};

	var frequencies = Frequencies.add(Frequencies.add(Frequencies.none(), "ATG", 5), "GTG", 7);

	check(frequencies, function(codon) {
		return codon === "ATG";
	}, "ATG");
	check(frequencies, function(codon) {
		return codon === "GTG";
	}, "GTG");
	check(frequencies, function(codon) {
		return codon === "TAA";
	}, undefined);
});

QUnit.test("Frequencies.normalise", function(assert) {
	var checkFrequency = function(frequencies, codon, expected) {
		assert.equal(Frequencies.getFrequency(frequencies, codon), expected);
	};

	var checkSum = function(frequencies, expected) {
		assert.equal(Frequencies.sum(frequencies), expected);
	};

	var frequencies = Frequencies.add(Frequencies.add(Frequencies.none(), "ATG", 5), "GTG", 7);
	var normalised = Frequencies.normalise(frequencies);
	checkFrequency(normalised, "ATG", 5/12);
	checkFrequency(normalised, "GTG", 7/12);
	checkSum(normalised, 1);

	checkSum(Frequencies.normalise(Frequencies.none()), 0);
});

QUnit.test("Sequence.normalise", function(assert) {
	var check = function(input, expected) {
		assert.equal(Sequence.normalise(input), expected);
	};

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
	};

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

var randomAminoAcids = function() {
	var aminoAcids = "";
	var length = Math.floor(Math.random() * 200);
	var options = "ACDEFGHIKLMNPQRSTVWY.";
	var optionsCount = options.length;
	for (var i = 0; i < length; i++) {
		var sel = Math.floor(Math.random() * optionsCount);
		aminoAcids = aminoAcids.concat(options.charAt(sel));
	}
	return aminoAcids;
};

QUnit.test("SequenceFactory.probabilisticSequenceFactory", function(assert) {
	var check = function(aminoAcids, sequenceFactory) {
		var optimised = SequenceFactory.getSequence(aminoAcids, sequenceFactory);
		assert.equal(Sequence.getAminoAcids(optimised), aminoAcids);
	};

	var frequencyMap = FrequencyMap.parse(Example.frequencies);
	var sequenceFactory = SequenceFactory.probabilisticSequenceFactory(frequencyMap);

	check("", sequenceFactory);
	for (var i = 0; i < 50; i++) {
		check(randomAminoAcids(), sequenceFactory);
	}
});

QUnit.test("SequenceFactory.deterministicSequenceFactory", function(assert) {
	var check = function(aminoAcids, sequenceFactory) {
		var optimised = SequenceFactory.getSequence(aminoAcids, sequenceFactory);
		assert.equal(Sequence.getAminoAcids(optimised), aminoAcids);
	};

	var frequencyMap = FrequencyMap.parse(Example.frequencies);
	var sequenceFactory = SequenceFactory.deterministicSequenceFactory(frequencyMap);

	check("", sequenceFactory);
	for (var i = 0; i < 50; i++) {
		check(randomAminoAcids(), sequenceFactory);
	}
});
