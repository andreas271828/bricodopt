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

// FIX: Write different tests for different functions and different asserts for different test cases.
QUnit.test("A", function(assert) {
  assert.equal("1", "2");
  assert.equal("3", "4");
});

QUnit.test("B", function(assert) {
  assert.equal("1", "2");
  assert.equal("3", "4");
});
