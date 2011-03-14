describe("Object Functions", function() {
  var root;
  
  beforeEach(function() {
    root = _w.insert(null, 'education');
    root = _w.insert(root, 'grain');
    root = _w.insert(root, 'cars');
  });
  
  describe("#values", function() {
    it("should get the values for a tree", function() {
      expect(_w.values(root)).toEqual(['cars', 'education', 'grain']);
    });

    it("should handle null trees correctly", function() {
      expect(_w.values(null)).toEqual([]);
    });
  });

  describe("#isEmpty", function() {
    it("should return false for a tree", function() {
      expect(_w.isEmpty(root)).toBeFalsy();
    });

    it("should return true for a null value", function() {
      expect(_w.isEmpty(null)).toBeTruthy();
    });
  });
});