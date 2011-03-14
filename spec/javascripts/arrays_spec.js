describe("Array Functions", function() {
  var root;
  
  beforeEach(function() {
    root = _w.insert(null, 'education');
    root = _w.insert(root, 'grain');
    root = _w.insert(root, 'cars');
  });
  
  describe("#first", function() {
    it("should pull out the first element", function() {
      expect(_w.first(root)).toEqual('cars');
    });
    
    it("should bypass an invalid index parameter", function() {
      expect(_w.first(root, 0)).toEqual([]);
    });

    it("should interpret an index parameter", function() {
      expect(_w.first(root, 2)).toEqual(['cars', 'education']);
    });
    
    it("should work well with _.map", function() {
      var second = _w.insert(_w.insert(null, 'elevators'), 'cadillacs');
      expect(_.map([root, second], _w.first)).toEqual(['cars', 'cadillacs']);
    });
  });
  
  describe("#rest", function() {
    it("should pull all but the first node", function() {
      expect(_w.rest(root)).toEqual(['education', 'grain']);
    });
    
    it("should pull all nodes with a 0 index", function() {
      expect(_w.rest(root, 0)).toEqual(['cars', 'education', 'grain']);
    });

    it("should obey an index parameter", function() {
      expect(_w.rest(root, 2)).toEqual(['grain']);
    });

    it("should work well with _.map", function() {
      var second = _w.insert(_w.insert(null, 'elevators'), 'cadillacs');
      expect(_.flatten(_.map([root, second], _w.rest))).toEqual(['education', 'grain', 'elevators']);
    });
  });
  
  describe("#last", function() {
    it("should pull the last element from a tree", function() {
      expect(_w.last(root)).toEqual('grain');
    });
  });
  
  describe("#without", function() {
    it("should remove all requested items", function() {
      expect(_w.without(root, 'cars', 'grain')).toEqual(['education']);
    });
    
    it("should work with objects", function() {
      var socks = { name: 'socks' };
      var second = _w.insert(_w.insert(null, { name: 'pants' }), socks);
      expect(_w.without(second, socks)).toEqual([{ name: 'pants' }]);
    });
  });
  
  describe("#indexOf", function() {
    it("should compute the inorder position of a node", function() {
      expect(_w.indexOf(root, 'education')).toEqual(1);
    });
    
    it("should handle nulls correctly", function() {
      expect(_w.indexOf(root, null)).toEqual(-1);
    });
    
    it("should handle invalid indices", function() {
      expect(_w.indexOf(root, 'revolution')).toEqual(-1);
    });
    
    it("should handle invalid indices", function() {
      _.each(['tblisi', 'baku', 'kyev', 'odesa', 'sochi', 'yerevan'], function(noun) {
        root = _w.insert(root, noun);
      });
      expect(_w.indexOf(root, 'sochi')).toEqual(6);
    });
  });
  
  
  describe("#lastIndexOf", function() {
    it("should compute the inorder position of a node", function() {
      expect(_w.lastIndexOf(root, 'education')).toEqual(1);
    });
    
    it("should handle nulls correctly", function() {
      expect(_w.lastIndexOf(root, null)).toEqual(-1);
    });
    
    it("should handle invalid indices", function() {
      expect(_w.lastIndexOf(root, 'revolution')).toEqual(-1);
    });
  });
});